// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentLiveClient } from "@azure/ai-projects";
import type { VoiceAgentLiveEvent } from "@azure/ai-projects";
import { delay } from "@azure/core-util";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  LiveSpeechActivity,
  runLiveAudioSession,
  streamLiveSilence,
  validateLivePcmInput,
} from "../../../samples-dev/agents/utils/liveAudio.js";
import { endpoint, MockWebSocketFactory, TestCredential } from "./utils/mockTransport.js";

const factories: MockWebSocketFactory[] = [];

async function connect(): Promise<{
  factory: MockWebSocketFactory;
  connection: Awaited<ReturnType<VoiceAgentLiveClient["connect"]>>;
}> {
  const factory = new MockWebSocketFactory();
  factories.push(factory);
  const connection = await new VoiceAgentLiveClient(endpoint, new TestCredential(), {
    webSocketFactory: factory,
  }).connect("sample-agent");
  return { factory, connection };
}

function audio(...samples: number[]): VoiceAgentLiveEvent {
  const bytes = new Uint8Array(samples.length * 2);
  const pcm = new DataView(bytes.buffer);
  samples.forEach((sample, index) => pcm.setInt16(index * 2, sample, true));
  return {
    type: "session.output_audio.delta",
    delta: btoa(String.fromCharCode(...bytes)),
  };
}

const transcript: VoiceAgentLiveEvent = {
  type: "session.output_transcript.delta",
  event_id: "caption-1",
  delta: "A complete spoken answer.",
  start_ms: 0,
  end_ms: 100,
};

afterEach(() => {
  for (const factory of factories.splice(0)) factory.transport.disconnect(1000, "Cleanup.", true);
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("GPT Live sample audio helpers", () => {
  it.each([new Uint8Array(), new Uint8Array(3), Uint8Array.from([82, 73, 70, 70])])(
    "rejects empty, partial, and WAV-container PCM input",
    (input) => {
      expect(() => validateLivePcmInput(input)).toThrow(/raw mono PCM16LE/);
    },
  );

  it("accepts raw PCM16 input without claiming it can infer its sample rate", () => {
    expect(() => validateLivePcmInput(new Uint8Array(4800))).not.toThrow();
  });

  it("counts PCM above the quiet threshold as speech", async () => {
    vi.useFakeTimers();
    const speech = new LiveSpeechActivity();
    speech.observe(audio(257, -257));
    speech.observe(transcript);
    const pending = speech.waitForSpeech(new AbortController().signal);
    await vi.advanceTimersByTimeAsync(1000);
    await pending;
  });

  it("does not mistake silent or very-low-level output for a spoken reply", async () => {
    vi.useFakeTimers();
    const speech = new LiveSpeechActivity();
    const signal = new AbortController().signal;
    speech.observe(transcript);
    speech.observe(audio(0, 256, -256));
    const failure = expect(speech.waitForSpeech(signal, () => true, 1100)).rejects.toThrow(
      /Timed out waiting for GPT Live spoken output/,
    );
    await vi.advanceTimersByTimeAsync(1100);
    await failure;
  });

  it("waits for audible output, transcripts, readiness, and one full quiet period", async () => {
    vi.useFakeTimers();
    const speech = new LiveSpeechActivity();
    const signal = new AbortController().signal;
    let ready = false;
    speech.observe(audio(1000, -1000));
    speech.observe(transcript);
    let finished = false;
    const pending = speech
      .waitForSpeech(signal, () => ready)
      .then(() => {
        finished = true;
        return undefined;
      });
    await vi.advanceTimersByTimeAsync(900);
    speech.observe(audio(0, 0));
    speech.observe({ ...transcript, delta: "One more phrase." });
    ready = true;
    await vi.advanceTimersByTimeAsync(975);
    expect(finished).toBe(false);
    await vi.advanceTimersByTimeAsync(25);
    await pending;
    expect(finished).toBe(true);
  });

  it("does not count a previous greeting as the next request's answer", async () => {
    vi.useFakeTimers();
    const speech = new LiveSpeechActivity();
    speech.observe(audio(1000));
    speech.observe(transcript);
    speech.reset();
    const failure = expect(
      speech.waitForSpeech(new AbortController().signal, () => true, 100),
    ).rejects.toThrow(/Timed out/);
    await vi.advanceTimersByTimeAsync(100);
    await failure;
  });

  it("rejects malformed base64 and incomplete output samples", () => {
    const speech = new LiveSpeechActivity();
    expect(() => speech.observe({ type: "session.output_audio.delta", delta: "!" })).toThrow();
    expect(() => speech.observe({ type: "session.output_audio.delta", delta: "AA==" })).toThrow(
      /incomplete PCM16/,
    );
  });

  it("paces silence from frame start rather than adding send latency to every frame", async () => {
    const { connection } = await connect();
    vi.useFakeTimers();
    const times: number[] = [];
    const sendAudio = connection.sendAudio.bind(connection);
    vi.spyOn(connection, "sendAudio").mockImplementation(async (bytes, options) => {
      times.push(Date.now());
      await delay(40, { abortSignal: options?.abortSignal });
      await sendAudio(bytes, options);
    });
    const stop = new AbortController();
    const pending = streamLiveSilence(connection, stop.signal);
    const cancelled = expect(pending).rejects.toThrow(/aborted/i);
    await vi.advanceTimersByTimeAsync(250);
    expect(times.map((time) => time - times[0])).toEqual([0, 100, 200]);
    stop.abort();
    await cancelled;
    await connection.close();
  });

  it("closes the session and stops the input pump after the operation completes", async () => {
    const { connection, factory } = await connect();
    await runLiveAudioSession(
      connection,
      () => {},
      async () => {},
    );
    expect(connection.state).toBe("disconnected");
    expect(factory.transport.closeCalls).not.toHaveLength(0);
    expect(factory.transport.sentMessages.map((value) => JSON.parse(value).type)).toContain(
      "session.close",
    );
  });

  it("closes the session after a synchronous operation error", async () => {
    const { connection } = await connect();
    await expect(
      runLiveAudioSession(
        connection,
        () => {},
        () => {
          throw new Error("Sample operation failed.");
        },
      ),
    ).rejects.toThrow("Sample operation failed.");
    expect(connection.state).toBe("disconnected");
  });

  it("fails on an early clean disconnect instead of claiming sample success", async () => {
    const { connection, factory } = await connect();
    const speech = new LiveSpeechActivity();
    const pending = runLiveAudioSession(
      connection,
      (event) => {
        speech.observe(event);
      },
      (signal) => speech.waitForSpeech(signal),
    );
    const failure = expect(pending).rejects.toThrow(/closed before the sample completed/);
    factory.transport.disconnect(1000, "Session ended before output.", true);
    await failure;
  });

  it("surfaces native transport failures and cleans up", async () => {
    const { connection, factory } = await connect();
    const speech = new LiveSpeechActivity();
    const pending = runLiveAudioSession(
      connection,
      (event) => {
        speech.observe(event);
      },
      (signal) => speech.waitForSpeech(signal),
    );
    const failure = expect(pending).rejects.toThrow("Live service error transport_error: Failed.");
    factory.transport.receive({
      type: "transport.failed",
      event_id: "transport-1",
      session_id: connection.session.id,
      error: { type: "transport_error", code: "transport_error", message: "Failed." },
    });
    await failure;
    expect(connection.state).toBe("disconnected");
  });

  it("rejects invalid input while still closing the supplied session", async () => {
    const { connection } = await connect();
    const speech = new LiveSpeechActivity();
    await expect(
      runLiveAudioSession(
        connection,
        () => {},
        (signal) => speech.waitForSpeech(signal),
        new Uint8Array(3),
      ),
    ).rejects.toThrow(/raw mono PCM16LE/);
    expect(connection.state).toBe("disconnected");
  });
});
