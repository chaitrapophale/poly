import type {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ILocalAudioTrack,
  IRemoteAudioTrack,
  ConnectionState
} from 'agora-rtc-sdk-ng';
import { pcmAudioBridge } from './pcmAudioBridge';

export interface AgoraTokenBackendResponse {
  token: string | null;
  channel_name: string;
  uid: number;
  app_id: string | null;
  status: string;
  message: string;
}

export interface AgoraSessionCallbacks {
  onStateChange?: (state: ConnectionState | 'connecting' | 'connected' | 'listening' | 'speaking' | 'interrupted' | 'ended' | 'error') => void;
  onRemoteAudioTrack?: (track: IRemoteAudioTrack) => void;
  onError?: (err: string) => void;
  onTranscriptTurn?: (turn: { speaker: string; text: string; language?: string }) => void;
}

class AgoraService {
  private client: IAgoraRTCClient | null = null;
  private localMicTrack: IMicrophoneAudioTrack | null = null;
  private localAiTrack: ILocalAudioTrack | null = null;
  private isJoined: boolean = false;

  public async fetchToken(channelName: string): Promise<AgoraTokenBackendResponse> {
    try {
      const res = await fetch('http://localhost:8000/api/v1/agora/rtc-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel_name: channelName, role: 1 })
      });
      if (!res.ok) {
        throw new Error(`Backend returned status ${res.status}`);
      }
      return await res.json();
    } catch (err: any) {
      console.warn('Failed to fetch Agora RTC token from backend:', err?.message || err);
      return {
        token: null,
        channel_name: channelName,
        uid: 0,
        app_id: process.env.NEXT_PUBLIC_AGORA_APP_ID || (import.meta as any).env?.VITE_AGORA_APP_ID || null,
        status: 'BACKEND_OFFLINE',
        message: 'Could not reach backend token endpoint.'
      };
    }
  }

  public async startSession(
    channelName: string,
    callbacks?: AgoraSessionCallbacks
  ): Promise<boolean> {
    try {
      callbacks?.onStateChange?.('connecting');

      const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;

      // 1. Fetch token from FastAPI backend
      const tokenResult = await this.fetchToken(channelName);
      const appId = tokenResult.app_id || process.env.NEXT_PUBLIC_AGORA_APP_ID || (import.meta as any).env?.VITE_AGORA_APP_ID;

      if (!appId) {
        console.warn('AGORA_APP_ID is not configured in backend or frontend env.');
        callbacks?.onError?.('AGORA_APP_ID missing. Please configure AGORA_APP_ID in .env file.');
        callbacks?.onStateChange?.('listening');
        return false;
      }

      // 2. Initialize RTC client
      this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

      this.client.on('connection-state-change', (curState) => {
        console.log('Agora Connection State:', curState);
        if (curState === 'CONNECTED') {
          callbacks?.onStateChange?.('connected');
        } else if (curState === 'DISCONNECTED') {
          callbacks?.onStateChange?.('ended');
        }
      });

      this.client.on('user-published', async (user, mediaType) => {
        await this.client?.subscribe(user, mediaType);
        if (mediaType === 'audio') {
          const remoteTrack = user.audioTrack;
          remoteTrack?.play();
          if (remoteTrack) {
            callbacks?.onRemoteAudioTrack?.(remoteTrack);
          }
        }
      });

      // 3. Join Channel (safely handle unconfigured/invalid AGORA_APP_ID vendor key)
      try {
        const uid = await this.client.join(appId, channelName, tokenResult.token || null, null);
        this.isJoined = true;
        console.log(`Successfully joined Agora Channel '${channelName}' with UID: ${uid}`);

        // 4. Create local microphone audio track
        this.localMicTrack = await AgoraRTC.createMicrophoneAudioTrack({
          encoderConfig: 'speech_standard',
          AEC: true,
          ANS: true,
          AGC: true
        });

        // 5. Create custom AI audio publication track if PCM stream available
        const mediaTrack = pcmAudioBridge.getMediaStreamTrack();
        if (mediaTrack) {
          this.localAiTrack = AgoraRTC.createCustomAudioTrack({ mediaStreamTrack: mediaTrack });
          await this.client.publish([this.localMicTrack, this.localAiTrack]);
        } else {
          await this.client.publish([this.localMicTrack]);
        }
      } catch (joinErr: any) {
        console.warn('Agora WebRTC channel join running in local fallback mode (No valid AGORA_APP_ID):', joinErr?.message || joinErr);
      }

      callbacks?.onStateChange?.('listening');
      return true;

    } catch (err: any) {
      const errMsg = typeof err === 'string' ? err : err?.message || 'Failed to start Agora session';
      console.error('Error in Agora startSession:', err);
      callbacks?.onError?.(errMsg);
      callbacks?.onStateChange?.('listening');
      return false;
    }
  }

  public async stopSession(): Promise<void> {
    try {
      if (this.localMicTrack) {
        this.localMicTrack.stop();
        this.localMicTrack.close();
        this.localMicTrack = null;
      }
      if (this.localAiTrack) {
        this.localAiTrack.stop();
        this.localAiTrack.close();
        this.localAiTrack = null;
      }
      if (this.client && this.isJoined) {
        await this.client.leave();
        this.client.removeAllListeners();
        this.client = null;
        this.isJoined = false;
      }
      pcmAudioBridge.stopAll();
      console.log('Agora WebRTC session stopped cleanly.');
    } catch (err) {
      console.error('Error stopping Agora session:', err);
    }
  }
}

export const agoraService = new AgoraService();
