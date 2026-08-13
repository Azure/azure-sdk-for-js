// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AIProjectClient, VoiceAgentProtocolError } from "@azure/ai-projects";
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

  it("moves upgrade headers into browser-compatible query parameters", async () => {
    const connection = await createClient().realtime.connect("browser-agent", {
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
    expect(url.searchParams.get("authorization")).toBe("Bearer browser-test-token");
    expect(url.searchParams.get("h-foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(url.searchParams.get("h-x-ms-voice-structured-inputs")).toBe(
      JSON.stringify({ customer: "Ada" }),
    );
    expect(url.searchParams.has("user-agent")).toBe(false);
    expect(socket.protocols).toEqual(["realtime"]);

    await connection.close();
  });

  it("sends client events and deserializes Blob server events", async () => {
    const connection = await createClient().realtime.connect("browser-agent");
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

  it("fails the iterator on malformed server data", async () => {
    const connection = await createClient().realtime.connect("browser-agent");
    const nextEvent = connection[Symbol.asyncIterator]().next();

    getSocket().receive("not-json");

    await expect(nextEvent).rejects.toBeInstanceOf(VoiceAgentProtocolError);
    await expect(connection.closed).resolves.toMatchObject({ code: 1002, wasClean: false });
  });

  it("finishes closing when the browser socket does not emit close", async () => {
    vi.useFakeTimers();
    const connection = await createClient().realtime.connect("browser-agent");
    MockBrowserWebSocket.suppressCloseEvent = true;

    const closePromise = connection.close();
    await vi.advanceTimersByTimeAsync(5_000);

    await expect(closePromise).resolves.toBeUndefined();
    expect(connection.state).toBe("disconnected");
  });
});

function createClient(): AIProjectClient {
  return new AIProjectClient(
    "https://example.services.ai.azure.com/api/projects/browser-project",
    new BrowserTestCredential(),
  );
}

function getSocket(): MockBrowserWebSocket {
  expect(MockBrowserWebSocket.instances).toHaveLength(1);
  return MockBrowserWebSocket.instances[0];
}
