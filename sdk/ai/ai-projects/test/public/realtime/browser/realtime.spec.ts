// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AIProjectClient, VoiceAgentProtocolError } from "@azure/ai-projects";
import { SDK_VERSION } from "$internal/constants.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

class BrowserTestCredential implements TokenCredential {
  public async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken> {
    return { token: "browser-test-token", expiresOnTimestamp: Date.now() + 60_000 };
  }
}

class MockBrowserWebSocket extends EventTarget {
  public static readonly CONNECTING = 0;
  public static readonly OPEN = 1;
  public static readonly CLOSING = 2;
  public static readonly CLOSED = 3;
  public static readonly instances: MockBrowserWebSocket[] = [];
  public static suppressCloseEvent = false;

  public readonly url: string;
  public readonly protocols: string | string[] | undefined;
  public readonly sentMessages: string[] = [];
  public binaryType: BinaryType = "blob";
  public readyState = MockBrowserWebSocket.CONNECTING;

  public constructor(url: string | URL, protocols?: string | string[]) {
    super();
    this.url = String(url);
    this.protocols = protocols;
    MockBrowserWebSocket.instances.push(this);
    queueMicrotask(() => {
      if (this.readyState === MockBrowserWebSocket.CONNECTING) {
        this.readyState = MockBrowserWebSocket.OPEN;
        this.dispatchEvent(new Event("open"));
      }
    });
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    this.sentMessages.push(String(data));
  }

  public close(code = 1000, reason = ""): void {
    if (this.readyState === MockBrowserWebSocket.CLOSED) {
      return;
    }
    this.readyState = MockBrowserWebSocket.CLOSING;
    if (MockBrowserWebSocket.suppressCloseEvent) {
      return;
    }
    queueMicrotask(() => {
      this.readyState = MockBrowserWebSocket.CLOSED;
      this.dispatchEvent(new CloseEvent("close", { code, reason, wasClean: code === 1000 }));
    });
  }

  public receive(data: string | ArrayBuffer | Blob): void {
    this.dispatchEvent(new MessageEvent("message", { data }));
  }
}

describe("AIProjectClient browser realtime", () => {
  beforeEach(() => {
    MockBrowserWebSocket.instances.length = 0;
    MockBrowserWebSocket.suppressCloseEvent = false;
    vi.stubGlobal("WebSocket", MockBrowserWebSocket);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("sends bearer auth as a WebSocket subprotocol and other headers as query parameters", async () => {
    const connection = await createClient().beta.voiceAgents.realtime.connect("browser-agent", {
      agentSessionId: "session-1",
      store: false,
      structuredInputs: { customer: "Ada" },
    });
    const socket = getSocket();
    const url = new URL(socket.url);

    expect(url.protocol).toBe("wss:");
    expect(url.pathname).toBe(
      "/api/projects/browser-project/agents/browser-agent/endpoint/protocols/voice",
    );
    expect(url.searchParams.get("api-version")).toBe("v1");
    expect(url.searchParams.get("agent_session_id")).toBe("session-1");
    expect(url.searchParams.get("store")).toBe("false");
    expect(url.searchParams.has("authorization")).toBe(false);
    expect(url.searchParams.get("x-ms-client-sdk")).toBe(`azsdk-js-ai-projects/${SDK_VERSION}`);
    expect(url.searchParams.get("foundry_features")).toBe("VoiceAgents=V1Preview");
    expect(socket.url).toContain("foundry_features=VoiceAgents=V1Preview");
    expect(url.searchParams.get("h-x-ms-voice-structured-inputs")).toBe(
      JSON.stringify({ customer: "Ada" }),
    );
    expect(url.searchParams.has("user-agent")).toBe(false);
    expect(url.searchParams.get("h-user-agent")).toBe(`azsdk-js-ai-projects/${SDK_VERSION}`);
    expect(socket.protocols).toEqual(["realtime", "authorization.bearer.browser-test-token"]);

    await connection.close();
  });

  it("prefixes the user-agent query parameter with a custom userAgentPrefix", async () => {
    const connection =
      await createClient("custom-prefix").beta.voiceAgents.realtime.connect("browser-agent");
    const url = new URL(getSocket().url);

    expect(url.searchParams.has("user-agent")).toBe(false);
    expect(url.searchParams.get("h-user-agent")).toBe(
      `custom-prefix azsdk-js-ai-projects/${SDK_VERSION}`,
    );

    await connection.close();
  });

  it("sends client events and deserializes Blob server events", async () => {
    const connection = await createClient().beta.voiceAgents.realtime.connect("browser-agent");
    const socket = getSocket();
    const iterator = connection[Symbol.asyncIterator]();

    await connection.sendText("Hello from a browser");
    expect(socket.sentMessages.map((message) => JSON.parse(message).type)).toEqual([
      "conversation.item.create",
      "response.create",
    ]);

    socket.receive(
      new Blob([
        JSON.stringify({
          event_id: "text-1",
          type: "response.output_text.delta",
          response_id: "response-1",
          item_id: "item-1",
          output_index: 0,
          content_index: 0,
          delta: "Hello",
        }),
      ]),
    );

    const event = await iterator.next();
    expect(event.value?.type).toBe("response.output_text.delta");
    if (event.value?.type === "response.output_text.delta") {
      expect(event.value.delta).toBe("Hello");
    }

    await connection.close();
    expect((await iterator.next()).done).toBe(true);
  });

  it("uses authenticated WebRTC signaling and keeps delivering events after the answer", async () => {
    const connection = await createClient().beta.voiceAgents.realtime.connect("browser-agent", {
      transport: "webrtc",
    });
    const socket = getSocket();
    const url = new URL(socket.url);
    expect(url.searchParams.get("transport")).toBe("webrtc");
    expect(url.searchParams.get("foundry_features")).toBe("VoiceAgents=V1Preview");
    expect(url.searchParams.get("api-version")).toBe("v1");
    expect(socket.url).not.toContain("browser-test-token");
    expect(socket.protocols).toEqual(["realtime", "authorization.bearer.browser-test-token"]);

    const offer = { type: "rtc.call.sdp.create", sdp_offer: "test-sdp-offer" } as const;
    await connection.sendEvent(offer);
    expect(socket.sentMessages.map((message) => JSON.parse(message))).toEqual([offer]);
    const iterator = connection[Symbol.asyncIterator]();
    const incoming = [
      {
        type: "session.created",
        event_id: "session-1",
        conversation_id: "conversation-1",
        session: { type: "realtime" },
      },
      {
        type: "rtc.call.sdp.created",
        event_id: "answer-1",
        rtc_call_id: "rtc-1",
        sdp_answer: "test-sdp-answer",
      },
      {
        type: "rtc.call.error",
        operation: "rtc.call.sdp.create",
        rtc_call_id: "rtc-1",
        error: { type: "server_error", message: "Call failed." },
      },
      {
        type: "error",
        event_id: "error-1",
        error: { type: "server_error", code: "service_error", message: "Service failed." },
      },
    ];
    for (const event of incoming) {
      socket.receive(new Blob([JSON.stringify(event)]));
    }
    for (const expected of incoming) {
      expect((await iterator.next()).value).toMatchObject(expected);
      expect(connection.state).toBe("connected");
      expect(socket.readyState).toBe(MockBrowserWebSocket.OPEN);
    }
    await connection.dispose();
    await expect(connection.closed).resolves.toMatchObject({ code: 1000, wasClean: true });
    expect((await iterator.next()).done).toBe(true);
  });

  it("fails the iterator on malformed server data", async () => {
    const connection = await createClient().beta.voiceAgents.realtime.connect("browser-agent");
    const nextEvent = connection[Symbol.asyncIterator]().next();

    getSocket().receive("not-json");

    await expect(nextEvent).rejects.toBeInstanceOf(VoiceAgentProtocolError);
    await expect(connection.closed).resolves.toMatchObject({ code: 1002, wasClean: false });
  });

  it.each([true, false])(
    "preserves unknown Blob events and continues receiving and sending (unknown first: %s)",
    async (unknownFirst) => {
      const connection = await createClient().beta.voiceAgents.realtime.connect("browser-agent");
      const socket = getSocket();
      const iterator = connection[Symbol.asyncIterator]();
      const closed = vi.fn();
      void connection.closed.then(closed);
      const close = vi.spyOn(socket, "close");
      const text = {
        event_id: "text-1",
        type: "response.output_text.delta",
        response_id: "response-1",
        item_id: "item-1",
        output_index: 0,
        content_index: 0,
        delta: "Hello",
      };
      const rawEvent = { type: "unknown", payload: { values: [null, true, 42] } };
      const audio = {
        ...text,
        event_id: "audio-1",
        type: "response.output_audio.delta",
        delta: "AQID",
      };
      const incoming = unknownFirst ? [rawEvent, text, audio] : [text, rawEvent, audio];
      for (const event of incoming) {
        socket.receive(new Blob([JSON.stringify(event)]));
      }
      const unknownEvent = { type: "unknown", eventType: "unknown", rawEvent };
      const audioEvent = { ...audio, delta: new Uint8Array([1, 2, 3]) };
      const received = [await iterator.next(), await iterator.next(), await iterator.next()];
      expect(received.map((result) => result.value)).toEqual(
        unknownFirst ? [unknownEvent, text, audioEvent] : [text, unknownEvent, audioEvent],
      );
      expect(connection.state).toBe("connected");
      expect(socket.readyState).toBe(MockBrowserWebSocket.OPEN);
      expect(close).not.toHaveBeenCalled();
      expect(closed).not.toHaveBeenCalled();

      await connection.sendText("Continue", { createResponse: false });
      expect(JSON.parse(socket.sentMessages[0]).item.content[0].text).toBe("Continue");
      expect(closed).not.toHaveBeenCalled();
      await connection.close();
      await expect(connection.closed).resolves.toMatchObject({ code: 1000, wasClean: true });
      expect(closed).toHaveBeenCalledOnce();
      expect((await iterator.next()).done).toBe(true);
    },
  );

  it("finishes closing when the browser socket does not emit close", async () => {
    vi.useFakeTimers();
    const connection = await createClient().beta.voiceAgents.realtime.connect("browser-agent");
    MockBrowserWebSocket.suppressCloseEvent = true;

    const closePromise = connection.close();
    await vi.advanceTimersByTimeAsync(5_000);

    await expect(closePromise).resolves.toBeUndefined();
    expect(connection.state).toBe("disconnected");
  });

  it("reports wasClean: true for a normal client-initiated close", async () => {
    const connection = await createClient().beta.voiceAgents.realtime.connect("browser-agent");
    const socket = getSocket();
    // Receive a Blob message right before closing so the transport's internal message chain has
    // a real pending continuation (an async Blob->ArrayBuffer conversion), widening the gap
    // between the native "close" event firing and onClose actually being invoked.
    socket.receive(
      new Blob([
        JSON.stringify({
          event_id: "text-1",
          type: "response.output_text.delta",
          response_id: "response-1",
          item_id: "item-1",
          output_index: 0,
          content_index: 0,
          delta: "Hello",
        }),
      ]),
    );

    await connection.close();

    await expect(connection.closed).resolves.toMatchObject({
      code: 1000,
      wasClean: true,
    });
  });
});

function createClient(userAgentPrefix?: string): AIProjectClient {
  return new AIProjectClient(
    "https://example.services.ai.azure.com/api/projects/browser-project",
    new BrowserTestCredential(),
    userAgentPrefix ? { userAgentOptions: { userAgentPrefix } } : undefined,
  );
}

function getSocket(): MockBrowserWebSocket {
  expect(MockBrowserWebSocket.instances).toHaveLength(1);
  return MockBrowserWebSocket.instances[0];
}
