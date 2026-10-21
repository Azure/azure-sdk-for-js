// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Streams a real PCM file to GPT Live in a browser and plays its audio response.
 * @azsdk-weight 100
 */

import { AIProjectClient } from "@azure/ai-projects";
import type { VoiceAgentLiveClientOptions } from "@azure/ai-projects";
import type { TokenCredential } from "@azure/core-auth";
import {
  LiveSpeechActivity,
  runLiveAudioSession,
  validateLivePcmInput,
} from "./utils/liveAudio.js";

/**
 * Run in a browser bundle against an existing Live agent.
 * Pass a browser TokenCredential, for example InteractiveBrowserCredential configured for a
 * public-client app registration. Never embed a service key or client secret in the page.
 * Direct-browser Live authentication is not confirmed on the tested service; deployments without
 * it require an authenticated backend relay supplied through liveOptions.webSocketFactory.
 * The input URL must serve raw mono PCM16LE at 24 kHz, not a WAV container.
 */
export async function runVoiceAgentLiveBrowser(
  endpoint: string,
  agentName: string,
  credential: TokenCredential,
  inputPcmUrl: string,
  liveOptions: VoiceAgentLiveClientOptions = {},
): Promise<void> {
  const response = await fetch(inputPcmUrl);
  if (!response.ok) throw new Error(`Cannot load PCM input (${response.status}).`);
  const input = new Uint8Array(await response.arrayBuffer());
  validateLivePcmInput(input);
  const project = new AIProjectClient(endpoint, credential, { liveOptions });
  const audio = new AudioContext({ sampleRate: 24000 });
  try {
    await audio.resume();
    const connection = await project.beta.voiceAgents.live.connect(agentName, { store: false });
    const format = connection.session.audio?.format;
    if (format?.type !== "audio/pcm" || !("rate" in format) || format.rate !== 24000) {
      await connection.close();
      throw new Error("This browser sample requires a Live agent configured for 24 kHz PCM audio.");
    }
    const speech = new LiveSpeechActivity();
    let nextPlaybackTime = audio.currentTime;
    let playback = Promise.resolve();
    await runLiveAudioSession(
      connection,
      (event) => {
        const bytes = speech.observe(event);
        if (bytes?.length) {
          const pcm = new DataView(bytes.buffer);
          const buffer = audio.createBuffer(1, bytes.length / 2, 24000);
          if (
            Math.max(nextPlaybackTime, audio.currentTime) + buffer.duration - audio.currentTime >
            60
          ) {
            throw new Error("GPT Live browser audio playback backlog exceeded 60 seconds.");
          }
          const samples = buffer.getChannelData(0);
          for (let i = 0; i < samples.length; i++) samples[i] = pcm.getInt16(i * 2, true) / 32768;
          const source = audio.createBufferSource();
          source.buffer = buffer;
          source.connect(audio.destination);
          playback = new Promise<void>((resolve) => {
            source.onended = () => resolve();
          });
          nextPlaybackTime = Math.max(nextPlaybackTime, audio.currentTime);
          source.start(nextPlaybackTime);
          nextPlaybackTime += buffer.duration;
        } else if (event.type === "session.output_transcript.delta") {
          console.log(event.delta);
        }
      },
      (signal, inputComplete) =>
        speech.waitForSpeech(signal, inputComplete, (input.length / 48000) * 1000 + 30_000),
      input,
    );
    let playbackTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        playback,
        new Promise<never>((_resolve, reject) => {
          playbackTimeout = setTimeout(
            () => reject(new Error("Timed out waiting for the browser's queued audio playback.")),
            Math.max(0, (nextPlaybackTime - audio.currentTime) * 1000) + 5000,
          );
        }),
      ]);
    } finally {
      clearTimeout(playbackTimeout);
    }
  } finally {
    await audio.close();
  }
}
