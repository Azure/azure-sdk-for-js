// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceAgentLiveConnection, VoiceAgentLiveEvent } from "@azure/ai-projects";
import { delay } from "@azure/core-util";

const bytesPerSecond = 48_000;
const frameBytes = 4800;
const speechPeakThreshold = 256;

/** Rejects containers and incomplete samples: Live expects raw mono PCM16LE at 24 kHz. */
export function validateLivePcmInput(input: Uint8Array): void {
  const header = String.fromCharCode(...input.subarray(0, 4));
  if (!input.length || input.length % 2 || header === "RIFF" || header === "RIFX") {
    throw new Error("Input must be raw mono PCM16LE at 24 kHz, not a WAV container.");
  }
}

/** Keeps the 24 kHz PCM timeline advancing while the user is not speaking. */
export async function streamLiveSilence(
  connection: VoiceAgentLiveConnection,
  abortSignal?: AbortSignal,
): Promise<void> {
  const silence = new Uint8Array(frameBytes);
  while (connection.state === "connected" && !abortSignal?.aborted) {
    const started = Date.now();
    await connection.sendAudio(silence, { abortSignal });
    await delay(Math.max(0, 100 - (Date.now() - started)), { abortSignal });
  }
}

/**
 * Live has no speech-finished event. This sample uses one second of speech/transcript inactivity,
 * ignoring silent and very-low-level PCM. A long pause can still divide an utterance.
 */
export class LiveSpeechActivity {
  private heardSpeech = false;
  private receivedTranscript = false;
  private lastActivity = 0;

  /** Starts observing a new sample request, without counting a previous greeting as its reply. */
  public reset(): void {
    this.heardSpeech = false;
    this.receivedTranscript = false;
    this.lastActivity = 0;
  }

  /** Observes output and returns decoded PCM when this is an audio event. */
  public observe(event: VoiceAgentLiveEvent): Uint8Array | undefined {
    if (event.type === "session.output_transcript.delta" && event.delta.trim()) {
      this.receivedTranscript = true;
      this.lastActivity = Date.now();
    }
    if (event.type !== "session.output_audio.delta") return undefined;
    const bytes = Uint8Array.from(atob(event.delta), (character) => character.charCodeAt(0));
    if (bytes.length % 2) throw new Error("The service returned incomplete PCM16 audio.");
    const pcm = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    for (let offset = 0; offset < bytes.length; offset += 2) {
      if (Math.abs(pcm.getInt16(offset, true)) > speechPeakThreshold) {
        this.heardSpeech = true;
        this.lastActivity = Date.now();
        break;
      }
    }
    return bytes;
  }

  /** Waits for spoken output and its quiet period; a timeout is a failure, not completion. */
  public async waitForSpeech(
    abortSignal: AbortSignal,
    ready: () => boolean = () => true,
    timeoutInMs = 30_000,
  ): Promise<void> {
    const deadline = Date.now() + timeoutInMs;
    while (
      !ready() ||
      !this.heardSpeech ||
      !this.receivedTranscript ||
      Date.now() - this.lastActivity < 1000
    ) {
      if (Date.now() >= deadline) {
        throw new Error("Timed out waiting for GPT Live spoken output to finish.");
      }
      await delay(25, { abortSignal });
    }
    abortSignal.throwIfAborted();
  }
}

/** Runs a sample with concurrent event reception, paced input, and reliable session cleanup. */
export async function runLiveAudioSession(
  connection: VoiceAgentLiveConnection,
  onEvent: (event: VoiceAgentLiveEvent) => void | Promise<void>,
  operation: (abortSignal: AbortSignal, inputComplete: () => boolean) => Promise<void>,
  inputPcm?: Uint8Array,
): Promise<void> {
  const stop = new AbortController();
  let inputSent = inputPcm === undefined;
  const receive = (async () => {
    for await (const event of connection) {
      if (event.type === "error" || event.type === "transport.failed") {
        throw new Error(`Live service error ${event.error.code}: ${event.error.message}`);
      }
      if (
        event.type === "response.event" &&
        ["error", "response.failed", "response.incomplete"].includes(String(event.event.type))
      ) {
        throw new Error(`The Responses delegation returned ${String(event.event.type)}.`);
      }
      await onEvent(event);
    }
    throw new Error("The Live connection closed before the sample completed.");
  })();
  const send = (async () => {
    if (inputPcm) {
      validateLivePcmInput(inputPcm);
      for (let offset = 0; offset < inputPcm.length; offset += frameBytes) {
        const chunk = inputPcm.subarray(offset, offset + frameBytes);
        const started = Date.now();
        await connection.sendAudio(chunk, { abortSignal: stop.signal });
        await delay(Math.max(0, (chunk.length / bytesPerSecond) * 1000 - (Date.now() - started)), {
          abortSignal: stop.signal,
        });
      }
      inputSent = true;
    }
    await streamLiveSilence(connection, stop.signal);
    throw new Error("The Live input stream stopped before the sample completed.");
  })();
  const work = Promise.resolve().then(() => operation(stop.signal, () => inputSent));
  try {
    await Promise.race([receive, send, work]);
  } finally {
    stop.abort();
    try {
      await connection.close();
    } finally {
      await Promise.allSettled([receive, send, work]);
    }
  }
}
