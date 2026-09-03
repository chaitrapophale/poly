# POLY — Agora Real-Time Voice Architecture

## Overview & Component Selection

POLY uses **Agora RTC Web SDK v4.x (`agora-rtc-sdk-ng`)** for browser WebRTC audio streaming, coupled with a Python FastAPI token gateway using **`agora-token-builder`**.

### 1. Selected SDKs & Package Versions
- **Frontend SDK**: `agora-rtc-sdk-ng` (Official Agora Web RTC SDK v4.x)
  - *Rationale*: Current official Agora SDK supporting low-latency WebRTC audio streaming, dynamic permission checks, background noise suppression integration, and dual-publisher channel handoffs.
- **Backend Service**: `agora-token-builder` (v1.0.0) & Python FastAPI
  - *Rationale*: Generates dynamic, secure Agora RTC tokens (`RtcTokenBuilder.buildTokenWithUid`) with configurable privilege expiration.

---

## 2. Caller & Voice Flow

```
[Caller Browser] 
       │
       ├─► Request Token: POST http://localhost:8000/api/v1/agora/rtc-token
       │     └─► Returns: { token, channel_name, app_id, status }
       │
       ├─► AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
       ├─► client.join(app_id, channel_name, token, uid)
       ├─► AgoraRTC.createMicrophoneAudioTrack()
       └─► client.publish([microphoneAudioTrack])
```

---

## 3. Human Handoff Voice Architecture

```
[Caller] (Publisher in Channel "session-8042")
    ▲
    │ Agora Real-Time RTC Channel ("session-8042")
    ▼
[Human Support Agent] (Joins Channel "session-8042" as Publisher)
```

1. **Trigger**: When caller asks for human or confidence score drops below threshold, case status switches to `WAITING_FOR_HUMAN`.
2. **Handoff Intercept**: Support Agent clicks **Accept Handoff** in `live_escalation_detail`.
3. **Channel Join**: Agent joins the **same channel** (`session-8042`) using a dynamic token generated for their agent UID.
4. **Sub-50ms Handoff**: Agent and caller speak directly over the Agora WebRTC channel while context and transcript remain live on screen.

---

## 4. Environment Configuration

```env
# Required in backend/.env
AGORA_APP_ID=your_agora_app_id
AGORA_APP_CERTIFICATE=your_agora_app_certificate
```

### Missing Credentials Behavior
If `AGORA_APP_ID` or `AGORA_APP_CERTIFICATE` is absent:
- The backend returns `"status": "MISSING_CREDENTIALS"` with a clear warning.
- The Poly frontend seamlessly enters **Agora Testing Mode**, updating call states and audio meters while indicating that real RTC connection requires `AGORA_APP_ID` in `.env`.
