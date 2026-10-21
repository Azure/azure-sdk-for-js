// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AIProjectClient,
  VoiceAgentConnectionError,
  VoiceAgentProtocolError,
} from "@azure/ai-projects";
import { SDK_VERSION } from "$internal/constants.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  accessToken,
  deferred,
  endpoint,
  sessionClosed,
  sessionStarted,
  TestCredential,
  MockWebSocketFactory,
} from "../utils/mockTransport.js";
import { runVoiceAgentLiveBrowser } from "../../../../samples-dev/agents/agentVoiceLiveBrowser.js";

class MockNativeLiveWebSocket extends EventTarget {
  public static readonly CONNECTING = 0;
  public static readonly OPEN = 1;
  public static readonly CLOSING = 2;
  public static readonly CLOSED = 3;
  public static readonly instances: MockNativeLiveWebSocket[] = [];
  public static created = deferred<MockNativeLiveWebSocket>();
  public static autoStart = true;
  public static autoFinalize = true;
  public static suppressCloseEvent = false;

  public readonly url: string;
  public readonly protocols: string | string[] | undefined;
  public readonly sentMessages: string[] = [];
  public readonly closing = deferred<void>();
  public binaryType: BinaryType = "blob";
  public readyState = MockNativeLiveWebSocket.CONNECTING;

  public constructor(url: string | URL, protocols?: string | string[]) {
    super();
    this.url = String(url);
    this.protocols = protocols;
    MockNativeLiveWebSocket.instances.push(this);
    MockNativeLiveWebSocket.created.resolve(this);
    queueMicrotask(() => {
      if (this.readyState !== MockNativeLiveWebSocket.CONNECTING) return;
      this.readyState = MockNativeLiveWebSocket.OPEN;
      this.dispatchEvent(new Event("open"));
      if (MockNativeLiveWebSocket.autoStart) {
        this.receive(JSON.stringify(sessionStarted()));
      }
    });
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    this.sentMessages.push(String(data));
    const event: { type: string } = JSON.parse(String(data));
    if (MockNativeLiveWebSocket.autoFinalize && event.type === "session.close") {
      this.receive(new Blob([JSON.stringify(sessionClosed())]));
    }
  }

  public close(code = 1000, reason = ""): void {
    if (this.readyState === MockNativeLiveWebSocket.CLOSED) return;
    this.readyState = MockNativeLiveWebSocket.CLOSING;
    this.closing.resolve();
    if (!MockNativeLiveWebSocket.suppressCloseEvent) {
      queueMicrotask(() => this.finishClose(code, reason));
    }
  }

  public finishClose(code = 1000, reason = "Offline browser closed."): void {
    this.readyState = MockNativeLiveWebSocket.CLOSED;
    this.dispatchEvent(new CloseEvent("close", { code, reason, wasClean: code === 1000 }));
  }

  public receive(data: string | ArrayBuffer | Blob): void {
    this.dispatchEvent(new MessageEvent("message", { data }));
  }
}

function createClient(credential = new TestCredential(), closeTimeoutInMs = 1000): AIProjectClient {
  return new AIProjectClient(endpoint, credential, {
    userAgentOptions: { userAgentPrefix: "offline-browser-prefix" },
    liveOptions: { closeTimeoutInMs },
  });
}

function getSocket(): MockNativeLiveWebSocket {
  expect(MockNativeLiveWebSocket.instances).toHaveLength(1);
  return MockNativeLiveWebSocket.instances[0];
}

describe("AIProjectClient browser native Live transport", () => {
  beforeEach(() => {
    MockNativeLiveWebSocket.instances.length = 0;
    MockNativeLiveWebSocket.created = deferred<MockNativeLiveWebSocket>();
    MockNativeLiveWebSocket.autoStart = true;
    MockNativeLiveWebSocket.autoFinalize = true;
    MockNativeLiveWebSocket.suppressCloseEvent = false;
    vi.stubGlobal("WebSocket", MockNativeLiveWebSocket);
  });

  afterEach(() => {
    for (const socket of MockNativeLiveWebSocket.instances) {
      if (socket.readyState !== MockNativeLiveWebSocket.CLOSED) socket.finishClose();
    }
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("uses browser bearer subprotocol authentication without Realtime negotiation or URL credentials", async () => {
    const connection = await createClient().beta.voiceAgents.live.connect("browser /?#%", {
      store: false,
      agentVersionOverride: "version + /&=",
      structuredInputs: { customer: "Ada & Bob", nested: { values: [null, 0] } },
      query: { custom: "value + /?&=#", enabled: false, count: 0, omitted: undefined },
    });
    const socket = getSocket();
    const url = new URL(socket.url);
    expect(url.protocol).toBe("wss:");
    expect(url.pathname).toBe(
      `/api/projects/live-project/agents/${encodeURIComponent("browser /?#%")}/endpoint/protocols/voice/live/sessions`,
    );
    expect(socket.protocols).toEqual([`authorization.bearer.${accessToken.token}`]);
    expect(socket.binaryType).toBe("arraybuffer");
    expect(url.searchParams.get("api-version")).toBe("v1");
    expect(url.searchParams.getAll("x-ms-client-sdk")).toEqual([
      `azsdk-js-ai-projects/${SDK_VERSION}`,
    ]);
    expect(url.searchParams.getAll("foundry_features")).toEqual(["VoiceAgents=V1Preview"]);
    expect(url.searchParams.get("client-request-id")).toBeTruthy();
    expect(url.searchParams.get("store")).toBe("false");
    expect(url.searchParams.get("x-agent-version-override")).toBe("version + /&=");
    expect(url.searchParams.getAll("structured_inputs")).toEqual([
      '{"customer":"Ada & Bob","nested":{"values":[null,0]}}',
    ]);
    expect(url.searchParams.get("custom")).toBe("value + /?&=#");
    expect(url.searchParams.get("enabled")).toBe("false");
    expect(url.searchParams.get("count")).toBe("0");
    for (const name of [
      "omitted",
      "authorization",
      "api-key",
      "transport",
      "agent_session_id",
      "structured_input",
      "h-x-ms-voice-structured-inputs",
      "user-agent",
      "h-user-agent",
      "h-x-ms-client-sdk",
    ]) {
      expect(url.searchParams.has(name)).toBe(false);
    }
    expect(url.username).toBe("");
    expect(url.password).toBe("");
    expect(socket.url).not.toContain(accessToken.token);
    expect(socket.url).not.toContain("offline-browser-prefix");
    expect(socket.sentMessages).toEqual([]);
    await connection.close();
  });

  it("does not resolve connect on WebSocket open or send a client session.start", async () => {
    MockNativeLiveWebSocket.autoStart = false;
    const pending = createClient().beta.voiceAgents.live.connect("browser-agent");
    const settled = vi.fn();
    void pending.then(settled, settled);
    const socket = await MockNativeLiveWebSocket.created.promise;
    await Promise.resolve();
    expect(socket.readyState).toBe(MockNativeLiveWebSocket.OPEN);
    expect(settled).not.toHaveBeenCalled();
    expect(socket.sentMessages).toEqual([]);
    socket.receive(new Blob([JSON.stringify(sessionStarted())]));
    const connection = await pending;
    expect(connection.session).toMatchObject(sessionStarted().session);
    expect(connection.state).toBe("connected");
    expect(socket.sentMessages).toEqual([]);
    await connection.close();
  });

  it("snapshots nested structured inputs and query values before loading the transport or authenticating", async () => {
    const credential = new TestCredential();
    const token = deferred<typeof accessToken>();
    vi.spyOn(credential, "getToken").mockReturnValueOnce(token.promise);
    const structuredInputs = { customer: { name: "Ada" } };
    const query = { custom: "original" };
    const options = { structuredInputs, query };
    const pending = createClient(credential).beta.voiceAgents.live.connect(
      "browser-agent",
      options,
    );
    structuredInputs.customer.name = "changed";
    options.structuredInputs = { customer: { name: "replacement" } };
    query.custom = "changed";
    token.resolve(accessToken);
    const connection = await pending;
    const url = new URL(getSocket().url);
    expect(url.searchParams.getAll("structured_inputs")).toEqual(['{"customer":{"name":"Ada"}}']);
    expect(url.searchParams.has("structured_input")).toBe(false);
    expect(url.searchParams.get("custom")).toBe("original");
    await connection.close();
  });

  it.each(["structured_input", "STRUCTURED_INPUTS", "AUTHORIZATION", "transport", "H-private"])(
    "rejects reserved browser query parameter %s before authentication or WebSocket creation",
    async (name) => {
      const credential = new TestCredential();
      const getToken = vi.spyOn(credential, "getToken");
      await expect(
        createClient(credential).beta.voiceAgents.live.connect("browser-agent", {
          query: { [name]: "untrusted" },
        }),
      ).rejects.toThrow(TypeError);
      expect(getToken).not.toHaveBeenCalled();
      expect(MockNativeLiveWebSocket.instances).toEqual([]);
    },
  );

  it("sends only native audio and context commands with null delegation IDs intact", async () => {
    const connection = await createClient().beta.voiceAgents.live.connect("browser-agent");
    await connection.sendAudio(new Uint8Array([1, 2, 3]), { eventId: "audio-1" });
    await connection.muteInputAudio();
    await connection.unmuteInputAudio();
    await connection.appendInstructions("Be concise.");
    await connection.appendThinking("Waiting for a lookup.", { delegationId: "delegation-1" });
    await connection.appendCommentary("The lookup is ready.", { delegationId: null });
    expect(getSocket().sentMessages.map((data) => JSON.parse(data))).toEqual([
      { type: "session.input_audio.append", event_id: "audio-1", audio: "AQID" },
      { type: "session.input_audio.mute" },
      { type: "session.input_audio.unmute" },
      { type: "session.instructions.append", delegation_id: null, content: "Be concise." },
      {
        type: "session.thinking.append",
        delegation_id: "delegation-1",
        content: "Waiting for a lookup.",
      },
      { type: "session.commentary.append", delegation_id: null, content: "The lookup is ready." },
    ]);
    await connection.close();
    expect(JSON.parse(getSocket().sentMessages.at(-1)!)).toEqual({ type: "session.close" });
  });

  it("preserves Blob, ArrayBuffer, and string arrival order and native base64 audio", async () => {
    const connection = await createClient().beta.voiceAgents.live.connect("browser-agent");
    const socket = getSocket();
    const iterator = connection[Symbol.asyncIterator]();
    await iterator.next();
    const listener = vi.fn();
    connection.on("session.output_audio.delta", listener);
    const next = iterator.next();
    const audio = { type: "session.output_audio.delta", delta: "AQID" };
    const rawEvent = { type: "future.live.event", data: { values: [null, false, 42] } };
    const transcript = {
      type: "session.output_transcript.delta",
      event_id: "transcript-1",
      delta: "Hello",
      start_ms: 0,
      end_ms: 20,
    };
    socket.receive(new Blob([JSON.stringify(audio)]));
    socket.receive(new TextEncoder().encode(JSON.stringify(rawEvent)).buffer);
    socket.receive(JSON.stringify(transcript));
    const received = [
      (await next).value,
      (await iterator.next()).value,
      (await iterator.next()).value,
    ];
    expect(received).toMatchObject([
      audio,
      { type: "unknown", eventType: rawEvent.type, rawEvent },
      transcript,
    ]);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ delta: "AQID" }));
    expect(connection.state).toBe("connected");
    await connection.close();
    expect((await iterator.next()).value).toMatchObject(sessionClosed());
    expect((await iterator.next()).done).toBe(true);
  });

  it("retains the startup service error through the actual browser transport", async () => {
    MockNativeLiveWebSocket.autoStart = false;
    const pending = createClient().beta.voiceAgents.live.connect("browser-agent");
    const rejected = expect(pending).rejects.toBeInstanceOf(VoiceAgentConnectionError);
    const socket = await MockNativeLiveWebSocket.created.promise;
    const event = {
      type: "error",
      event_id: "startup-error-1",
      error: {
        type: "invalid_request_error",
        code: "invalid_agent",
        message: "Cannot start this agent.",
      },
    };
    socket.receive(new Blob([JSON.stringify(event)]));
    await rejected;
    await expect(pending).rejects.toMatchObject({
      message: event.error.message,
      code: "connectionFailed",
      cause: event,
    });
    expect(socket.sentMessages).toEqual([]);
  });

  it("rejects malformed native audio and fails pending iterator reads", async () => {
    const connection = await createClient().beta.voiceAgents.live.connect("browser-agent");
    const iterator = connection[Symbol.asyncIterator]();
    await iterator.next();
    const pending = iterator.next();
    const rejected = expect(pending).rejects.toBeInstanceOf(VoiceAgentProtocolError);
    getSocket().receive(new Blob(['{"type":"session.output_audio.delta","delta":42}']));
    await rejected;
    await expect(connection.closed).resolves.toMatchObject({
      code: 1002,
      wasClean: false,
      error: expect.any(VoiceAgentProtocolError),
    });
    await connection.dispose();
  });

  it("waits for a native terminal Blob and the actual socket close notification", async () => {
    MockNativeLiveWebSocket.autoFinalize = false;
    MockNativeLiveWebSocket.suppressCloseEvent = true;
    const connection = await createClient().beta.voiceAgents.live.connect("browser-agent");
    const socket = getSocket();
    const pending = connection.close();
    const settled = vi.fn();
    void pending.then(settled, settled);
    expect(socket.sentMessages.map((data) => JSON.parse(data))).toEqual([
      { type: "session.close" },
    ]);
    expect(connection.state).toBe("closing");
    expect(settled).not.toHaveBeenCalled();
    socket.receive(new Blob([JSON.stringify(sessionClosed())]));
    await socket.closing.promise;
    expect(settled).not.toHaveBeenCalled();
    socket.finishClose(1000, "Browser finalization complete.");
    await pending;
    await expect(connection.closed).resolves.toMatchObject({
      code: 1000,
      wasClean: true,
      sessionClosed: sessionClosed(),
    });
  });

  it("times out gracefully when Foundry never finalizes the browser session", async () => {
    MockNativeLiveWebSocket.autoFinalize = false;
    const connection = await createClient(new TestCredential(), 50).beta.voiceAgents.live.connect(
      "browser-agent",
    );
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    const pending = connection.close();
    const outcome = pending.then(
      () => ({ error: undefined }),
      (error: unknown) => ({ error }),
    );
    await vi.advanceTimersByTimeAsync(50);
    expect((await outcome).error).toBeInstanceOf(VoiceAgentConnectionError);
    await expect(connection.closed).resolves.toMatchObject({
      wasClean: false,
      sessionClosed: undefined,
      error: expect.objectContaining({ code: "connectionClosed" }),
    });
    expect(connection.state).toBe("disconnected");
    expect(getSocket().readyState).toBe(MockNativeLiveWebSocket.CLOSED);
  });
});

class SampleAudioBuffer {
  public readonly duration: number;
  private readonly samples: Float32Array;
  public constructor(length: number, rate: number) {
    this.samples = new Float32Array(length);
    this.duration = SampleAudioContext.bufferDuration ?? length / rate;
  }
  public getChannelData(): Float32Array {
    return this.samples;
  }
}

class SampleAudioSource {
  public buffer?: SampleAudioBuffer;
  public onended: (() => void) | null = null;
  public connect(): void {}
  public start(): void {}
}

class SampleAudioContext {
  public static instances: SampleAudioContext[] = [];
  public static bufferDuration?: number;
  public readonly sources: SampleAudioSource[] = [];
  public readonly destination = {};
  public readonly resume = vi.fn(async (): Promise<void> => {});
  public readonly close = vi.fn(async (): Promise<void> => {});
  private readonly started = Date.now();
  public constructor() {
    SampleAudioContext.instances.push(this);
  }
  public get currentTime(): number {
    return (Date.now() - this.started) / 1000;
  }
  public createBuffer(_channels: number, length: number, rate: number): SampleAudioBuffer {
    return new SampleAudioBuffer(length, rate);
  }
  public createBufferSource(): SampleAudioSource {
    const source = new SampleAudioSource();
    this.sources.push(source);
    return source;
  }
}

describe("GPT Live browser audio sample", () => {
  const factories: MockWebSocketFactory[] = [];

  afterEach(() => {
    for (const factory of factories.splice(0)) factory.transport.disconnect(1000, "Cleanup.", true);
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    SampleAudioContext.instances = [];
    SampleAudioContext.bufferDuration = undefined;
  });

  async function run(): Promise<{
    factory: MockWebSocketFactory;
    pending: Promise<void>;
  }> {
    const factory = new MockWebSocketFactory();
    factories.push(factory);
    vi.useFakeTimers();
    vi.stubGlobal("AudioContext", SampleAudioContext);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(new Uint8Array(4800))),
    );
    const pending = runVoiceAgentLiveBrowser(
      endpoint,
      "browser-sample",
      new TestCredential(),
      "https://example.test/input.pcm",
      { webSocketFactory: factory },
    );
    await factory.transport.connecting.promise;
    await vi.advanceTimersByTimeAsync(0);
    return { factory, pending };
  }

  function output(factory: MockWebSocketFactory): void {
    factory.transport.receive({ type: "session.output_audio.delta", delta: "6APoAw==" });
    factory.transport.receive({
      type: "session.output_transcript.delta",
      event_id: "sample-caption",
      delta: "A complete spoken reply.",
      start_ms: 0,
      end_ms: 100,
    });
  }

  it("drains queued playback before closing the audio context", async () => {
    const { factory, pending } = await run();
    output(factory);
    await vi.advanceTimersByTimeAsync(1000);
    const context = SampleAudioContext.instances[0];
    expect(context.sources).toHaveLength(1);
    expect(context.close).not.toHaveBeenCalled();
    context.sources[0].onended?.();
    await pending;
    expect(context.close).toHaveBeenCalledOnce();
  });

  it("rejects an excessive playback backlog and closes the audio context", async () => {
    SampleAudioContext.bufferDuration = 61;
    const { factory, pending } = await run();
    const failure = expect(pending).rejects.toThrow(/playback backlog exceeded 60 seconds/);
    output(factory);
    await vi.advanceTimersByTimeAsync(0);
    await failure;
    expect(SampleAudioContext.instances[0].close).toHaveBeenCalledOnce();
  });
});
