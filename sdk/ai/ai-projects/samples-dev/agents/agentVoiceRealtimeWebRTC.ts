// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Run this function from a browser application's user gesture with an authenticated project client,
 * an existing WebRTC-enabled managed voice agent, and an audio element. Abort the signal to hang up.
 * Use a browser-compatible TokenCredential when constructing the project client; do not embed secrets.
 *
 * @summary Negotiates managed voice-agent WebRTC audio using SDK WebSocket signaling.
 * @azsdk-weight 100
 */

import type { AIProjectClient, VoiceAgentConnection } from "@azure/ai-projects";

export async function main(
  project: AIProjectClient,
  agentName: string,
  remoteAudio: HTMLAudioElement,
  signal: AbortSignal,
): Promise<void> {
  signal.throwIfAborted();
  const peerConnection = new RTCPeerConnection();
  const dataChannel = peerConnection.createDataChannel("voice-live-events");
  let microphone: MediaStream | undefined;
  let connection: VoiceAgentConnection | undefined;
  const stopSignaling = (): void => {
    void connection?.dispose().catch(() => {
      console.error("Could not close voice-agent signaling.");
    });
  };
  remoteAudio.autoplay = true;
  peerConnection.ontrack = (event) => {
    remoteAudio.srcObject = event.streams[0] ?? new MediaStream([event.track]);
  };

  try {
    microphone = await navigator.mediaDevices.getUserMedia({ audio: true });
    signal.throwIfAborted();
    for (const track of microphone.getTracks()) {
      peerConnection.addTrack(track, microphone);
    }
    connection = await project.beta.voiceAgents.realtime.connect(agentName, {
      transport: "webrtc",
      abortSignal: signal,
    });
    signal.addEventListener("abort", stopSignaling, { once: true });
    signal.throwIfAborted();

    await peerConnection.setLocalDescription(await peerConnection.createOffer());
    await waitForIceGathering(peerConnection, signal);
    const sdpOffer = peerConnection.localDescription?.sdp;
    if (!sdpOffer) {
      throw new Error("The peer connection did not produce an SDP offer.");
    }
    // The gathered local description includes ICE candidates; createOffer()'s result may not.
    await connection.sendEvent(
      { type: "rtc.call.sdp.create", sdp_offer: sdpOffer },
      { abortSignal: signal },
    );

    // Do not break after the answer: exiting the iterator closes signaling.
    for await (const event of connection) {
      switch (event.type) {
        case "rtc.call.sdp.created":
          await peerConnection.setRemoteDescription({ type: "answer", sdp: event.sdp_answer });
          break;
        case "session.created":
          console.log("Voice-agent session created.");
          break;
        case "rtc.call.error":
        case "error":
          throw new Error(`Voice-agent signaling failed (${event.type}).`);
      }
    }
  } finally {
    signal.removeEventListener("abort", stopSignaling);
    dataChannel.close();
    peerConnection.close();
    microphone?.getTracks().forEach((track) => track.stop());
    remoteAudio.srcObject = null;
    await connection?.dispose();
  }
}

async function waitForIceGathering(
  peerConnection: RTCPeerConnection,
  signal: AbortSignal,
): Promise<void> {
  signal.throwIfAborted();
  if (peerConnection.iceGatheringState === "complete") {
    return;
  }
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("ICE gathering timed out."));
    }, 30_000);
    const onStateChange = (): void => {
      if (peerConnection.iceGatheringState === "complete") {
        cleanup();
        resolve();
      }
    };
    const onAbort = (): void => {
      cleanup();
      reject(new Error("ICE gathering was cancelled."));
    };
    function cleanup(): void {
      clearTimeout(timeout);
      peerConnection.removeEventListener("icegatheringstatechange", onStateChange);
      signal.removeEventListener("abort", onAbort);
    }
    peerConnection.addEventListener("icegatheringstatechange", onStateChange);
    signal.addEventListener("abort", onAbort, { once: true });
    onStateChange();
  });
}
