'use client';

/**
 * PCM Audio Bridge for Poly Voice Agent
 * Handles:
 * 1. Microphone capture -> 16kHz 16-bit Mono PCM ArrayBuffer
 * 2. 24kHz PCM ArrayBuffer playback -> Speaker & Agora Custom Audio Track
 * 3. Immediate audio queue cancellation on barge-in / interruption
 */

export class PCMAudioBridge {
  private audioCtx: AudioContext | null = null;
  private micStream: MediaStream | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private destinationNode: MediaStreamAudioDestinationNode | null = null;
  private activeSources: AudioBufferSourceNode[] = [];
  private nextStartTime: number = 0;

  public async startMicCapture(onPCMChunk: (pcmBuffer: ArrayBuffer) => void): Promise<boolean> {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtx({ sampleRate: 16000 });

      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000
        }
      });

      const source = this.audioCtx.createMediaStreamSource(this.micStream);
      // Create ScriptProcessorNode with buffer size 4096 (approx 250ms chunks)
      this.scriptProcessor = this.audioCtx.createScriptProcessor(4096, 1, 1);

      this.scriptProcessor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = this.float32ToPCM16(inputData);
        onPCMChunk(pcm16.buffer as ArrayBuffer);
      };

      source.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioCtx.destination);
      console.log('Microphone 16kHz PCM capture started.');
      return true;
    } catch (err) {
      console.error('Error starting microphone capture:', err);
      return false;
    }
  }

  public playPCMChunk24kHz(pcmBuffer: ArrayBuffer) {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtx({ sampleRate: 24000 });
    }

    try {
      const float32Data = this.pcm16ToFloat32(new Int16Array(pcmBuffer));
      const audioBuffer = this.audioCtx.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data);

      const source = this.audioCtx.createBufferSource();
      source.buffer = audioBuffer;

      // Setup destination node for Agora custom audio track if created
      if (this.destinationNode) {
        source.connect(this.destinationNode);
      }
      source.connect(this.audioCtx.destination);

      const currentTime = this.audioCtx.currentTime;
      const startTime = Math.max(currentTime, this.nextStartTime);
      source.start(startTime);
      this.nextStartTime = startTime + audioBuffer.duration;

      this.activeSources.push(source);
      source.onended = () => {
        const idx = this.activeSources.indexOf(source);
        if (idx !== -1) this.activeSources.splice(idx, 1);
      };
    } catch (err) {
      console.error('Error playing 24kHz PCM chunk:', err);
    }
  }

  public interruptPlayback() {
    console.log('Interruption detected: Yielding Poly voice audio queue.');
    for (const source of this.activeSources) {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {}
    }
    this.activeSources = [];
    if (this.audioCtx) {
      this.nextStartTime = this.audioCtx.currentTime;
    }
  }

  public getMediaStreamTrack(): MediaStreamTrack | null {
    if (!this.audioCtx) return null;
    if (!this.destinationNode) {
      this.destinationNode = this.audioCtx.createMediaStreamDestination();
    }
    return this.destinationNode.stream.getAudioTracks()[0] || null;
  }

  public stopAll() {
    this.interruptPlayback();
    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((t) => t.stop());
      this.micStream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }

  private float32ToPCM16(float32Array: Float32Array): Int16Array {
    const pcm16 = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return pcm16;
  }

  private pcm16ToFloat32(int16Array: Int16Array): Float32Array {
    const float32 = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32[i] = int16Array[i] / 32768.0;
    }
    return float32;
  }
}

export const pcmAudioBridge = new PCMAudioBridge();
