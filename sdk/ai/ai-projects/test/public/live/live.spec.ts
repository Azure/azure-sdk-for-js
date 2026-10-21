// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AIProjectClient,
  VoiceAgentAuthenticationError,
  VoiceAgentConnectionError,
  VoiceAgentLiveClient,
  VoiceAgentProtocolError,
} from "@azure/ai-projects";
import type {
  AIProjectClientOptionalParams,
  KnownApiVersions,
  LiveServerEventLiveErrorEvent,
  VoiceAgentConnectionState,
  VoiceAgentLiveClientEvent,
  VoiceAgentLiveConnection,
} from "@azure/ai-projects";
import { SDK_VERSION } from "$internal/constants.js";
import {
  deserializeVoiceAgentLiveEvent,
  serializeVoiceAgentLiveEvent,
} from "$internal/live/voiceAgentLiveClient.js";
import { afterEach, assert, describe, expect, it, vi } from "vitest";
import {
  accessToken,
  createSession,
  deferred,
  endpoint,
  MockWebSocketFactory,
  sessionClosed,
  sessionStarted,
  TestCredential,
} from "./utils/mockTransport.js";

const factories: MockWebSocketFactory[] = [];

function createFactory(): MockWebSocketFactory {
  const factory = new MockWebSocketFactory();
  factories.push(factory);
  return factory;
}

function createClient(
  factory: MockWebSocketFactory,
  credential = new TestCredential(),
  options: AIProjectClientOptionalParams = {},
): AIProjectClient {
  return new AIProjectClient(endpoint, credential, {
    ...options,
    liveOptions: { ...options.liveOptions, webSocketFactory: factory },
  });
}

async function connect(factory = createFactory()): Promise<VoiceAgentLiveConnection> {
  return createClient(factory).beta.voiceAgents.live.connect("live-agent");
}

afterEach(() => {
  for (const factory of factories.splice(0)) {
    for (const transport of factory.transports) {
      transport.disconnect(1000, "Offline test cleanup.", true);
    }
  }
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("VoiceAgentLiveClient connection", () => {
  it.each([
    { store: false, transport: "webrtc" },
    { store: false, agentSessionId: "realtime-session-id" },
  ])("rejects Realtime-only options supplied by JavaScript callers", async (options) => {
    const factory = createFactory();
    const client = createClient(factory).beta.voiceAgents.live;
    await expect(client.connect("live-agent", options)).rejects.toThrow(
      /Realtime transport or agentSessionId/,
    );
    expect(factory.transport.connectOptions).toBeUndefined();
  });

  it.each(["project", "standalone"])(
    "waits for native session.started with the %s client without sending startup commands",
    async (kind) => {
      const factory = createFactory();
      factory.transport.autoStart = false;
      const credential = new TestCredential();
      const client =
        kind === "standalone"
          ? new VoiceAgentLiveClient(endpoint, credential, { webSocketFactory: factory })
          : createClient(factory, credential).beta.voiceAgents.live;
      const settled = vi.fn();
      const pending = client.connect("live-agent");
      void pending.then(settled, settled);
      await factory.transport.connecting.promise;

      expect(settled).not.toHaveBeenCalled();
      expect(factory.transport.sentMessages).toEqual([]);
      expect(factory.transport.connectOptions?.protocols).toEqual([]);
      factory.transport.receive(sessionStarted());
      const connection = await pending;
      expect(connection.state).toBe("connected");
      expect(connection.session).toMatchObject(createSession());
      expect(credential.requestedScopes).toBe("https://ai.azure.com/.default");
      expect(factory.transport.sentMessages).toEqual([]);
      await connection.close();
    },
  );

  it("inherits the resolved project endpoint, API version, scopes, and user-agent prefix", async () => {
    const factory = createFactory();
    const credential = new TestCredential();
    const client = createClient(factory, credential, {
      endpoint: "https://override.example.test/api/projects/other-project",
      apiVersion: "v1" as KnownApiVersions,
      credentials: { scopes: ["https://project.example.test/.default"] },
      userAgentOptions: { userAgentPrefix: "project-prefix" },
    });
    expect(client.beta.voiceAgents.live).toBeInstanceOf(VoiceAgentLiveClient);
    expect(client.beta.voiceAgents.live).toBe(client.beta.voiceAgents.live);
    const connection = await client.beta.voiceAgents.live.connect("live-agent");
    const options = factory.transport.connectOptions;
    assert.ok(options);
    expect(new URL(options.url).host).toBe("override.example.test");
    expect(new URL(options.url).pathname).toContain("/api/projects/other-project/");
    expect(new URL(options.url).searchParams.get("api-version")).toBe("v1");
    expect(credential.requestedScopes).toEqual(["https://project.example.test/.default"]);
    expect(options.headers["user-agent"]).toContain("project-prefix");
    expect(options.headers["user-agent"]).toContain(`azsdk-js-ai-projects/${SDK_VERSION}`);
    expect(options.headers["authorization"]).toBe(`Bearer ${accessToken.token}`);
    expect(options.protocols).toEqual([]);
    expect(options.url).not.toContain(accessToken.token);
    await connection.close();
  });

  it("lets Live-specific defaults override project options without borrowing Realtime defaults", async () => {
    const factory = createFactory();
    const credential = new TestCredential();
    const connection = await createClient(factory, credential, {
      credentials: { scopes: ["https://project.example.test/.default"] },
      userAgentOptions: { userAgentPrefix: "project-prefix" },
      realtimeOptions: {
        apiVersion: "realtime-only",
        userAgentPrefix: "realtime-prefix",
        credentialScopes: "https://realtime.example.test/.default",
      },
      liveOptions: {
        apiVersion: "live-version",
        credentialScopes: ["https://live.example.test/.default"],
        userAgentPrefix: "live-prefix",
        connectionTimeoutInMs: 1234,
      },
    }).beta.voiceAgents.live.connect("live-agent", { connectionTimeoutInMs: 4321 });
    const options = factory.transport.connectOptions;
    assert.ok(options);
    expect(new URL(options.url).searchParams.get("api-version")).toBe("live-version");
    expect(options.connectionTimeoutInMs).toBe(4321);
    expect(credential.requestedScopes).toEqual(["https://live.example.test/.default"]);
    expect(options.headers["user-agent"]).toContain("live-prefix");
    expect(options.headers["user-agent"]).not.toMatch(/project-prefix|realtime-prefix/);
    expect(options.headers["foundry-features"]).toBe("VoiceAgents=V1Preview");
    expect(options.headers["x-ms-client-request-id"]).toBeTruthy();
    expect(options.headers["x-ms-client-sdk"]).toBe(`azsdk-js-ai-projects/${SDK_VERSION}`);
    await connection.close();
  });

  it("uses the Live client's connection timeout when no per-connection override is supplied", async () => {
    const factory = createFactory();
    const connection = await createClient(factory, new TestCredential(), {
      liveOptions: { connectionTimeoutInMs: 1234 },
    }).beta.voiceAgents.live.connect("live-agent");
    expect(factory.transport.connectOptions?.connectionTimeoutInMs).toBe(1234);
    await connection.close();
  });

  it("escapes the agent path and sends one canonical structured_inputs query value", async () => {
    const factory = createFactory();
    const client = new VoiceAgentLiveClient(
      `${endpoint}///?keep=original&replace=old&replace=duplicate&remove=old`,
      new TestCredential(),
      { webSocketFactory: factory },
    );
    const structuredInputs = { customer: "Ada & Bob", nested: { values: [null, true, "日本語"] } };
    const connection = await client.connect("agent /?#%日本語", {
      store: false,
      agentVersionOverride: "version + /&=",
      structuredInputs,
      query: { replace: "space + /?&=#", remove: undefined, enabled: false, count: 0 },
    });
    const options = factory.transport.connectOptions;
    assert.ok(options);
    const url = new URL(options.url);
    expect(url.protocol).toBe("wss:");
    expect(url.pathname).toBe(
      `/api/projects/live-project/agents/${encodeURIComponent("agent /?#%日本語")}/endpoint/protocols/voice/live/sessions`,
    );
    expect(url.searchParams.get("keep")).toBe("original");
    expect(url.searchParams.getAll("replace")).toEqual(["space + /?&=#"]);
    expect(url.searchParams.has("remove")).toBe(false);
    expect(url.searchParams.get("enabled")).toBe("false");
    expect(url.searchParams.get("count")).toBe("0");
    expect(url.searchParams.get("store")).toBe("false");
    expect(url.searchParams.get("x-agent-version-override")).toBe("version + /&=");
    expect(url.searchParams.getAll("structured_inputs")).toEqual([
      JSON.stringify(structuredInputs),
    ]);
    for (const name of [
      "authorization",
      "api-key",
      "structured_input",
      "agent_session_id",
      "transport",
    ]) {
      expect(url.searchParams.has(name)).toBe(false);
    }
    expect(options.headers).not.toHaveProperty("x-ms-voice-structured-inputs");
    expect(url.username).toBe("");
    expect(url.password).toBe("");
    expect(options.url).not.toContain(accessToken.token);
    await connection.close();
  });

  it("snapshots nested structured inputs and query values before acquiring a token", async () => {
    const factory = createFactory();
    const credential = new TestCredential();
    const token = deferred<typeof accessToken>();
    vi.spyOn(credential, "getToken").mockReturnValueOnce(token.promise);
    const client = createClient(factory, credential).beta.voiceAgents.live;
    const structuredInputs = { customer: { name: "Ada" } };
    const query = { custom: "original" };
    const options = { structuredInputs, query };
    const pending = client.connect("live-agent", options);

    structuredInputs.customer.name = "changed";
    options.structuredInputs = { customer: { name: "replacement" } };
    query.custom = "changed";
    token.resolve(accessToken);
    const first = await pending;
    const url = new URL(factory.transport.connectOptions!.url);
    expect(url.searchParams.getAll("structured_inputs")).toEqual(['{"customer":{"name":"Ada"}}']);
    expect(url.searchParams.get("custom")).toBe("original");
    await first.close();

    const second = await client.connect("live-agent");
    const secondUrl = new URL(factory.transport.connectOptions!.url);
    expect(secondUrl.searchParams.has("structured_inputs")).toBe(false);
    expect(secondUrl.searchParams.has("custom")).toBe(false);
    expect(factory.transports).toHaveLength(2);
    await second.close();
  });

  it("accepts a null-prototype query record", async () => {
    const factory = createFactory();
    const query: Record<string, string> = Object.create(null);
    query.custom = "safe value";
    const connection = await createClient(factory).beta.voiceAgents.live.connect("live-agent", {
      query,
    });
    expect(new URL(factory.transport.connectOptions!.url).searchParams.get("custom")).toBe(
      "safe value",
    );
    await connection.close();
  });

  it.each([
    "api-version",
    "AUTHORIZATION",
    "api-key",
    "agent_session_id",
    "transport",
    "store",
    "x-agent-version-override",
    "X-MS-CLIENT-SDK",
    "foundry_features",
    "foundry-features",
    "client-request-id",
    "x-ms-client-request-id",
    "structured_input",
    "STRUCTURED_INPUTS",
    "x-ms-voice-structured-inputs",
    "H-custom",
  ])(
    "rejects reserved query parameter %s before authentication or transport creation",
    async (name) => {
      const factory = createFactory();
      const credential = new TestCredential();
      const getToken = vi.spyOn(credential, "getToken");
      const create = vi.spyOn(factory, "create");
      await expect(
        createClient(factory, credential).beta.voiceAgents.live.connect("live-agent", {
          query: { [name]: "untrusted" },
        }),
      ).rejects.toThrow(TypeError);
      expect(getToken).not.toHaveBeenCalled();
      expect(create).not.toHaveBeenCalled();
    },
  );

  it.each([NaN, Infinity, -Infinity])("rejects nonfinite query number %s", async (value) => {
    const factory = createFactory();
    const credential = new TestCredential();
    const getToken = vi.spyOn(credential, "getToken");
    await expect(
      createClient(factory, credential).beta.voiceAgents.live.connect("live-agent", {
        query: { custom: value },
      }),
    ).rejects.toThrow(TypeError);
    expect(getToken).not.toHaveBeenCalled();
  });

  it.each(["circular", "bigint"])(
    "rejects %s structured inputs before authentication",
    async (kind) => {
      const factory = createFactory();
      const credential = new TestCredential();
      const getToken = vi.spyOn(credential, "getToken");
      const structuredInputs: Record<string, unknown> = {};
      structuredInputs.value = kind === "circular" ? structuredInputs : 1n;
      await expect(
        createClient(factory, credential).beta.voiceAgents.live.connect("live-agent", {
          structuredInputs,
        }),
      ).rejects.toThrow(TypeError);
      expect(getToken).not.toHaveBeenCalled();
      expect(factory.transport.connectOptions).toBeUndefined();
    },
  );

  it.each([
    "http://example.test/project",
    "ws://example.test/project",
    "wss://example.test/project",
  ])("rejects the non-HTTPS endpoint %s before obtaining credentials", async (address) => {
    const factory = createFactory();
    const credential = new TestCredential();
    const getToken = vi.spyOn(credential, "getToken");
    const client = new VoiceAgentLiveClient(address, credential, { webSocketFactory: factory });
    await expect(client.connect("live-agent")).rejects.toThrow(TypeError);
    expect(getToken).not.toHaveBeenCalled();
  });

  it("accepts a scheme-less secure endpoint", async () => {
    const factory = createFactory();
    const connection = await new VoiceAgentLiveClient(
      "example.test/api/projects/live-project",
      new TestCredential(),
      { webSocketFactory: factory },
    ).connect("live-agent");
    expect(new URL(factory.transport.connectOptions!.url).protocol).toBe("wss:");
    await connection.close();
  });

  it.each(["", "  "])("rejects empty endpoint and agent names %j", async (value) => {
    expect(() => new VoiceAgentLiveClient(value, new TestCredential())).toThrow(TypeError);
    const factory = createFactory();
    await expect(createClient(factory).beta.voiceAgents.live.connect(value)).rejects.toThrow(
      TypeError,
    );
    expect(factory.transport.connectOptions).toBeUndefined();
  });

  it.each([0, -1, NaN, Infinity])("rejects invalid timeout value %s", async (value) => {
    for (const name of [
      "connectionTimeoutInMs",
      "sessionTimeoutInMs",
      "closeTimeoutInMs",
    ] as const) {
      expect(
        () => new VoiceAgentLiveClient(endpoint, new TestCredential(), { [name]: value }),
      ).toThrow(RangeError);
    }
    const factory = createFactory();
    for (const name of ["connectionTimeoutInMs", "sessionTimeoutInMs"] as const) {
      await expect(
        createClient(factory).beta.voiceAgents.live.connect("live-agent", { [name]: value }),
      ).rejects.toThrow(RangeError);
    }
    expect(factory.transport.connectOptions).toBeUndefined();
  });

  it.each(["rejected", "null", "empty"])(
    "reports %s token acquisition as authentication failure",
    async (kind) => {
      const factory = createFactory();
      const credential = new TestCredential();
      const getToken = vi.spyOn(credential, "getToken");
      const cause = new Error("Offline credential failure.");
      if (kind === "rejected") getToken.mockRejectedValueOnce(cause);
      else getToken.mockResolvedValueOnce(kind === "null" ? null : { ...accessToken, token: "" });
      const pending = createClient(factory, credential).beta.voiceAgents.live.connect("live-agent");
      await expect(pending).rejects.toBeInstanceOf(VoiceAgentAuthenticationError);
      await expect(pending).rejects.toMatchObject({
        code: "authenticationFailed",
        ...(kind === "rejected" ? { cause } : {}),
      });
      expect(factory.transport.connectOptions).toBeUndefined();
    },
  );

  it("honors a pre-aborted connection without opening the socket", async () => {
    const factory = createFactory();
    const abort = new AbortController();
    abort.abort();
    await expect(
      createClient(factory).beta.voiceAgents.live.connect("live-agent", {
        abortSignal: abort.signal,
      }),
    ).rejects.toMatchObject({ name: "VoiceAgentConnectionError", code: "operationCancelled" });
    expect(factory.transport.connectOptions).toBeUndefined();
  });

  it("propagates cancellation to token acquisition and does not authenticate a socket afterward", async () => {
    const factory = createFactory();
    const credential = new TestCredential();
    const token = deferred<typeof accessToken>();
    const getToken = vi.spyOn(credential, "getToken").mockReturnValueOnce(token.promise);
    const abort = new AbortController();
    const pending = createClient(factory, credential).beta.voiceAgents.live.connect("live-agent", {
      abortSignal: abort.signal,
    });
    const rejected = expect(pending).rejects.toMatchObject({
      name: "VoiceAgentConnectionError",
      code: "operationCancelled",
    });
    expect(getToken).toHaveBeenCalledWith("https://ai.azure.com/.default", {
      abortSignal: abort.signal,
    });
    abort.abort();
    token.resolve(accessToken);
    await rejected;
    expect(factory.transport.connectOptions).toBeUndefined();
  });

  it("cancels while waiting for session.started and removes its abort listener", async () => {
    const factory = createFactory();
    factory.transport.autoStart = false;
    const abort = new AbortController();
    const remove = vi.spyOn(abort.signal, "removeEventListener");
    const pending = createClient(factory).beta.voiceAgents.live.connect("live-agent", {
      abortSignal: abort.signal,
    });
    const rejected = expect(pending).rejects.toMatchObject({ code: "operationCancelled" });
    await factory.transport.connecting.promise;
    abort.abort();
    await rejected;
    expect(factory.transport.closeCalls.length).toBeGreaterThan(0);
    expect(remove).toHaveBeenCalledWith("abort", expect.any(Function));
  });

  it("times out awaiting session.started, not merely WebSocket open", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    const factory = createFactory();
    factory.transport.autoStart = false;
    const pending = createClient(factory, new TestCredential(), {
      liveOptions: { sessionTimeoutInMs: 500 },
    }).beta.voiceAgents.live.connect("live-agent", { sessionTimeoutInMs: 50 });
    const rejected = expect(pending).rejects.toMatchObject({
      name: "VoiceAgentConnectionError",
      code: "connectionFailed",
      message: expect.stringContaining("session.started"),
    });
    await factory.transport.connecting.promise;
    await vi.advanceTimersByTimeAsync(50);
    await rejected;
    expect(factory.transport.closeCalls.length).toBeGreaterThan(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("wraps transport startup failures in the public connection error", async () => {
    const factory = createFactory();
    const cause = new Error("Offline handshake rejected.");
    factory.transport.connectError = cause;
    const pending = connect(factory);
    await expect(pending).rejects.toBeInstanceOf(VoiceAgentConnectionError);
    await expect(pending).rejects.toMatchObject({ cause, code: "connectionFailed" });
  });

  it("cleans up a timed-out startup even if the transport rejects later", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    const factory = createFactory();
    const handshake = deferred<void>();
    factory.transport.autoStart = false;
    factory.transport.connectResult = handshake.promise;
    const pending = createClient(factory).beta.voiceAgents.live.connect("live-agent", {
      sessionTimeoutInMs: 10,
    });
    const rejected = expect(pending).rejects.toBeInstanceOf(VoiceAgentConnectionError);
    await factory.transport.connecting.promise;
    await vi.advanceTimersByTimeAsync(10);
    await rejected;
    handshake.reject(new Error("Late offline handshake failure."));
    await Promise.resolve();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("retains the structured service error when startup fails", async () => {
    const factory = createFactory();
    factory.transport.autoStart = false;
    const serviceError: LiveServerEventLiveErrorEvent = {
      type: "error",
      event_id: "startup-error-1",
      client_event_id: "command-1",
      error: {
        type: "invalid_request_error",
        code: "invalid_agent",
        message: "The saved agent cannot start.",
        param: "agent",
        client_event_id: "command-1",
      },
    };
    const pending = connect(factory);
    const rejected = expect(pending).rejects.toBeInstanceOf(VoiceAgentConnectionError);
    await factory.transport.connecting.promise;
    factory.transport.receive(serviceError);
    await rejected;
    await expect(pending).rejects.toMatchObject({
      message: serviceError.error.message,
      code: "connectionFailed",
      cause: serviceError,
    });
    expect(factory.transport.sentMessages).toEqual([]);
  });

  it.each([false, true])(
    "rejects a socket close before session.started (clean: %s)",
    async (clean) => {
      const factory = createFactory();
      factory.transport.autoStart = false;
      const pending = connect(factory);
      const rejected = expect(pending).rejects.toMatchObject({
        name: "VoiceAgentConnectionError",
        code: "connectionClosed",
      });
      await factory.transport.connecting.promise;
      factory.transport.disconnect(clean ? 1000 : 1006, "Closed before startup.", clean);
      await rejected;
    },
  );
});

describe("VoiceAgentLiveClient native commands", () => {
  it("serializes only delegation settings and preserves arbitrary tool schemas", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const parameters = {
      type: "object",
      properties: { city: { type: "string", examples: ["Seattle"] } },
      required: ["city"],
      additionalProperties: false,
    };
    await connection.configureSession(
      {
        delegation: {
          type: "responses",
          responses: {
            instructions: "Use the lookup tool.",
            parallel_tool_calls: false,
            tools: [{ type: "function", name: "lookup", parameters, strict: true }],
          },
        },
      },
      { eventId: "update-1" },
    );
    expect(JSON.parse(factory.transport.sentMessages[0])).toEqual({
      type: "session.update",
      event_id: "update-1",
      session: {
        delegation: {
          type: "responses",
          responses: {
            instructions: "Use the lookup tool.",
            parallel_tool_calls: false,
            tools: [{ type: "function", name: "lookup", parameters, strict: true }],
          },
        },
      },
    });
    await connection.close();
  });

  it("base64 encodes raw audio views and ArrayBuffers without Realtime buffer commands", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const backing = new Uint8Array([99, 1, 2, 3, 99]);
    await connection.sendAudio(backing.subarray(1, 4), { eventId: "audio-view" });
    await connection.sendAudio(new Uint8Array([4, 5, 6]).buffer, { eventId: "audio-buffer" });
    await connection.muteInputAudio({ eventId: "mute-1" });
    await connection.unmuteInputAudio({ eventId: "unmute-1" });
    expect(factory.transport.sentMessages.map((data) => JSON.parse(data))).toEqual([
      { type: "session.input_audio.append", event_id: "audio-view", audio: "AQID" },
      { type: "session.input_audio.append", event_id: "audio-buffer", audio: "BAUG" },
      { type: "session.input_audio.mute", event_id: "mute-1" },
      { type: "session.input_audio.unmute", event_id: "unmute-1" },
    ]);
    await connection.close();
  });

  it("retains null delegation IDs and correlates client-owned append commands", async () => {
    const factory = createFactory();
    factory.transport.session = createSession({ delegation: { type: "client" } });
    const connection = await connect(factory);
    await connection.appendInstructions("Be concise.", { eventId: "instructions-1" });
    await connection.appendThinking("A lookup is pending.", {
      delegationId: "delegation-1",
      eventId: "thinking-1",
    });
    await connection.appendCommentary("The answer is ready.", {
      delegationId: null,
      eventId: "commentary-1",
    });
    expect(factory.transport.sentMessages.map((data) => JSON.parse(data))).toEqual([
      {
        type: "session.instructions.append",
        event_id: "instructions-1",
        delegation_id: null,
        content: "Be concise.",
      },
      {
        type: "session.thinking.append",
        event_id: "thinking-1",
        delegation_id: "delegation-1",
        content: "A lookup is pending.",
      },
      {
        type: "session.commentary.append",
        event_id: "commentary-1",
        delegation_id: null,
        content: "The answer is ready.",
      },
    ]);
    await connection.close();
  });

  it("preserves nested Responses items and continues a tool result by default", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const item = {
      type: "message",
      role: "user",
      content: [
        { type: "input_text", text: "Lookup Seattle", extra: { values: [null, false, 0] } },
      ],
    };
    await connection.sendResponseItem(item, { eventId: "item-1" });
    await connection.sendToolOutput("call-1", '{"temperature":18}', { eventId: "tool-1" });
    await connection.sendToolOutput("call-2", "deferred", { createResponse: false });
    await connection.requestResponse({ eventId: "response-2" });
    expect(factory.transport.sentMessages.map((data) => JSON.parse(data))).toEqual([
      { type: "response.item.create", event_id: "item-1", item },
      {
        type: "response.item.create",
        event_id: "tool-1",
        item: { type: "function_call_output", call_id: "call-1", output: '{"temperature":18}' },
      },
      { type: "response.create" },
      {
        type: "response.item.create",
        item: { type: "function_call_output", call_id: "call-2", output: "deferred" },
      },
      { type: "response.create", event_id: "response-2" },
    ]);
    await connection.close();
  });

  it.each(["item", "tool", "response"])(
    "rejects the Responses-only %s helper in client delegation mode",
    async (method) => {
      const factory = createFactory();
      factory.transport.session = createSession({ delegation: { type: "client" } });
      const connection = await connect(factory);
      const operation =
        method === "item"
          ? connection.sendResponseItem({ type: "message", role: "user", content: [] })
          : method === "tool"
            ? connection.sendToolOutput("call-1", "not a Responses delegation")
            : connection.requestResponse();
      await expect(operation).rejects.toBeInstanceOf(VoiceAgentProtocolError);
      expect(factory.transport.sentMessages).toEqual([]);
      await connection.close();
    },
  );

  it("send and sendEvent use the same native serializer", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    await connection.send({
      type: "session.thinking.append",
      event_id: "direct-1",
      delegation_id: null,
      content: "Native command.",
    });
    await connection.sendEvent({ type: "session.input_audio.mute", event_id: "direct-2" });
    expect(factory.transport.sentMessages.map((data) => JSON.parse(data))).toEqual([
      {
        type: "session.thinking.append",
        event_id: "direct-1",
        delegation_id: null,
        content: "Native command.",
      },
      { type: "session.input_audio.mute", event_id: "direct-2" },
    ]);
    await connection.close();
  });

  it.each(["session.start", "response.cancel", "input_audio_buffer.commit", "future.command"])(
    "rejects the unsupported %s command without sending or disconnecting",
    async (type) => {
      const factory = createFactory();
      const connection = await connect(factory);
      await expect(
        // @ts-expect-error Exercise runtime validation for JavaScript callers.
        connection.send({ type }),
      ).rejects.toBeInstanceOf(VoiceAgentProtocolError);
      expect(factory.transport.sentMessages).toEqual([]);
      expect(connection.state).toBe("connected");
      await connection.close();
    },
  );

  it("does not send an already-cancelled append", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const abort = new AbortController();
    abort.abort();
    await expect(
      connection.appendCommentary("Do not send.", { abortSignal: abort.signal }),
    ).rejects.toMatchObject({ name: "VoiceAgentConnectionError", code: "operationCancelled" });
    expect(factory.transport.sentMessages).toEqual([]);
    await connection.close();
  });

  it("preserves send failures and distinguishes a mid-send abort", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const cause = new Error("Offline write failed.");
    factory.transport.sendError = cause;
    await expect(connection.muteInputAudio()).rejects.toMatchObject({
      name: "VoiceAgentConnectionError",
      code: "sendFailed",
      cause,
    });
    factory.transport.sendError = undefined;
    const writing = deferred<void>();
    factory.transport.sendResult = writing.promise;
    const abort = new AbortController();
    const pending = connection.appendThinking("Pending write.", { abortSignal: abort.signal });
    const rejected = expect(pending).rejects.toMatchObject({ code: "operationCancelled" });
    abort.abort();
    writing.reject(new Error("Offline write interrupted."));
    await rejected;
    expect(connection.state).toBe("connected");
    factory.transport.sendResult = undefined;
    await connection.close();
  });
});

describe("VoiceAgentLiveClient native protocol", () => {
  it("rejects malformed UTF-8 binary JSON rather than replacing corrupted bytes", () => {
    const before = new TextEncoder().encode('{"type":"future.live.event","message":"');
    const after = new TextEncoder().encode('"}');
    const bytes = new Uint8Array([...before, 0xc3, 0x28, ...after]);
    expect(() => deserializeVoiceAgentLiveEvent(bytes.buffer)).toThrow(/invalid Live JSON/);
  });

  it.each([
    "not-json",
    "null",
    "[]",
    "{}",
    '{"type":""}',
    '{"type":42}',
    '{"type":"info","code":"test","message":"missing event id"}',
    '{"type":"session.started","event_id":"e","session":{}}',
    '{"type":"session.output_audio.delta","delta":[1,2,3]}',
    '{"type":"session.input_audio.append","audio":null}',
    '{"type":"response.event","event_id":"e","event":[]}',
    '{"type":"error","event_id":"e","error":{"type":"invalid_request_error"}}',
    '{"type":"session.delegation.created","event_id":"e","offset_ms":0,"delegation":{}}',
    '{"type":"session.input_transcript.delta","event_id":"e","delta":"text","start_ms":0}',
  ])("rejects malformed native data %s", (raw) => {
    expect(() => deserializeVoiceAgentLiveEvent(raw)).toThrow(VoiceAgentProtocolError);
  });

  it.each(["future.live.event", "unknown", "toString", "__proto__"])(
    "preserves unknown discriminator %s and arbitrary nested fields",
    (type) => {
      const rawEvent = { type, nested: { values: [null, false, 0, { text: "未来" }] } };
      expect(deserializeVoiceAgentLiveEvent(JSON.stringify(rawEvent))).toEqual({
        type: "unknown",
        eventType: type,
        rawEvent,
      });
    },
  );

  it("decodes binary JSON but leaves Live output audio as base64 text", () => {
    const rawEvent = {
      type: "session.output_audio.delta",
      delta: "AQID",
      start_ms: 0,
      end_ms: 20,
    };
    const data = new TextEncoder().encode(JSON.stringify(rawEvent)).buffer;
    const event = deserializeVoiceAgentLiveEvent(data);
    expect(event).toEqual(rawEvent);
    assert.ok(event.type === "session.output_audio.delta");
    expect(event.delta).toBe("AQID");
    expect(typeof event.delta).toBe("string");
    expect(
      deserializeVoiceAgentLiveEvent('{"type":"session.input_audio.append","audio":"BAUG"}'),
    ).toEqual({ type: "session.input_audio.append", audio: "BAUG" });
  });

  it("preserves the complete delegated Responses payload without interpreting it as Realtime", () => {
    const event = {
      type: "response.event",
      event_id: "delegated-1",
      delegation_id: "delegation-1",
      event: {
        type: "response.output_item.done",
        response_id: "response-1",
        item: {
          type: "function_call",
          name: "lookup",
          call_id: "call-1",
          arguments: '{"city":"Seattle"}',
          custom: { values: [false, null, 0] },
        },
      },
    };
    expect(deserializeVoiceAgentLiveEvent(JSON.stringify(event))).toMatchObject(event);
  });

  it.each([
    { type: "session.input_audio.append", audio: new Uint8Array([1]) },
    { type: "session.commentary.append", content: "text" },
    { type: "session.thinking.append", content: false, delegation_id: null },
    { type: "session.instructions.append", content: "text", delegation_id: 1 },
    { type: "session.update", session: [] },
    { type: "response.item.create", item: null },
  ])("rejects malformed outbound $type", (event) => {
    expect(() =>
      serializeVoiceAgentLiveEvent(event as unknown as VoiceAgentLiveClientEvent),
    ).toThrow(VoiceAgentProtocolError);
  });

  it("wraps a circular arbitrary response item as a protocol error", () => {
    const item: Record<string, unknown> = { type: "message" };
    item.circular = item;
    expect(() => serializeVoiceAgentLiveEvent({ type: "response.item.create", item })).toThrow(
      VoiceAgentProtocolError,
    );
  });
});

describe("VoiceAgentLiveClient event consumers", () => {
  it("delivers the startup event, binary audio, future events, and updated snapshots in order", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const iterator = connection[Symbol.asyncIterator]();
    expect((await iterator.next()).value).toMatchObject(sessionStarted());
    const next = iterator.next();
    const audio = { type: "session.output_audio.delta", delta: "AQID" };
    factory.transport.receiveRaw(new TextEncoder().encode(JSON.stringify(audio)).buffer);
    const rawEvent = { type: "future.live.event", payload: { nested: [null, 1] } };
    factory.transport.receive(rawEvent);
    const session = createSession({ instructions: "Updated backend instructions." });
    factory.transport.receive({ type: "session.updated", event_id: "updated-1", session });
    expect((await next).value).toMatchObject(audio);
    expect((await iterator.next()).value).toEqual({
      type: "unknown",
      eventType: rawEvent.type,
      rawEvent,
    });
    expect((await iterator.next()).value).toMatchObject({ type: "session.updated", session });
    expect(connection.session).toMatchObject(session);
    await connection.close();
    expect((await iterator.next()).value).toMatchObject(sessionClosed(factory.transport.session));
    expect((await iterator.next()).done).toBe(true);
  });

  it("removes a once listener using its original callback", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const handler = vi.fn();
    connection.once("session.output_audio.delta", handler);
    connection.off("session.output_audio.delta", handler);
    factory.transport.receive({ type: "session.output_audio.delta", delta: "AQIDAA==" });
    expect(handler).not.toHaveBeenCalled();
    await connection.close();
  });

  it("supports typed on/off/once listeners, reentrancy, and listener exceptions", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const audio = vi.fn();
    const removed = vi.fn();
    const afterThrow = vi.fn();
    const once = vi.fn(() =>
      factory.transport.receive({ type: "session.output_audio.delta", delta: "BAUG" }),
    );
    expect(connection.on("session.output_audio.delta", audio)).toBe(connection);
    connection.on("session.output_audio.delta", removed).off("session.output_audio.delta", removed);
    connection.once("session.output_audio.delta", once);
    connection.on("session.output_audio.delta", () => {
      throw new Error("Offline listener failure.");
    });
    connection.on("session.output_audio.delta", afterThrow);
    expect(() =>
      factory.transport.receive({ type: "session.output_audio.delta", delta: "AQID" }),
    ).not.toThrow();
    expect(audio.mock.calls.map(([event]) => event.delta)).toEqual(["AQID", "BAUG"]);
    expect(removed).not.toHaveBeenCalled();
    expect(once).toHaveBeenCalledOnce();
    expect(afterThrow).toHaveBeenCalledTimes(2);
    expect(connection.state).toBe("connected");
    await connection.close();
  });

  it("delivers the same native event to both the iterator and listeners", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const listener = vi.fn();
    connection.on("session.output_audio.delta", listener);
    const iterator = connection[Symbol.asyncIterator]();
    await iterator.next();
    const pending = iterator.next();
    factory.transport.receive({ type: "session.output_audio.delta", delta: "AQID" });
    const event = (await pending).value;
    expect(listener).toHaveBeenCalledWith(event);
    await connection.close();
  });

  it("permits only one event iterator", async () => {
    const connection = await connect();
    const iterator = connection[Symbol.asyncIterator]();
    await iterator.next();
    await expect(connection[Symbol.asyncIterator]().next()).rejects.toMatchObject({
      name: "VoiceAgentConnectionError",
      code: "invalidState",
    });
    await connection.close();
  });

  it("gracefully closes the native session when iteration exits early", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    for await (const event of connection) {
      expect(event.type).toBe("session.started");
      break;
    }
    expect(factory.transport.sentMessages.map((data) => JSON.parse(data))).toEqual([
      { type: "session.close" },
    ]);
    await expect(connection.closed).resolves.toMatchObject({ sessionClosed: sessionClosed() });
    expect(connection.state).toBe("disconnected");
  });

  it("emits post-startup service errors without disconnecting", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const listener = vi.fn();
    connection.on("error", listener);
    const event: LiveServerEventLiveErrorEvent = {
      type: "error",
      event_id: "command-error-1",
      client_event_id: "command-1",
      error: {
        type: "invalid_request_error",
        code: "unknown_parameter",
        message: "The command parameter is invalid.",
        param: "session.invalid",
        client_event_id: "command-1",
      },
    };
    factory.transport.receive(event);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining(event));
    expect(connection.state).toBe("connected");
    await connection.appendInstructions("Still connected.");
    await connection.close();
  });

  it("reports cumulative usage events without summing or changing them", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const listener = vi.fn();
    connection.on("session.usage.updated", listener);
    for (const seconds of [1.5, 2]) {
      factory.transport.receive({
        type: "session.usage.updated",
        event_id: `usage-${seconds}`,
        usage: { seconds },
        context_window: { usage_ratio: 0.25 },
      });
    }
    expect(listener.mock.calls.map(([event]) => event.usage.seconds)).toEqual([1.5, 2]);
    await connection.close();
  });

  it("does not overflow an unused iterator queue for listener-only consumers", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const listener = vi.fn();
    connection.on("session.output_audio.delta", listener);
    for (let index = 0; index < 10_050; index++) {
      factory.transport.receive({ type: "session.output_audio.delta", delta: "AQID" });
    }
    expect(listener).toHaveBeenCalledTimes(10_050);
    expect(connection.state).toBe("connected");
    expect(factory.transport.closeCalls).toEqual([]);
    await connection.close();
  });

  it("bounds a stalled iterator queue and preserves buffered events before its terminal error", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const iterator = connection[Symbol.asyncIterator]();
    await iterator.next();
    for (let index = 0; index < 10_001; index++) {
      factory.transport.receive({ type: "session.output_audio.delta", delta: "AQID" });
    }
    const closed = await connection.closed;
    expect(closed.error).toBeInstanceOf(VoiceAgentConnectionError);
    expect(closed.error?.cause).toMatchObject({ message: expect.stringContaining("capacity") });
    expect(connection.state).toBe("disconnected");
    for (let index = 0; index < 10_000; index++) {
      expect((await iterator.next()).value).toMatchObject({
        type: "session.output_audio.delta",
        delta: "AQID",
      });
    }
    await expect(iterator.next()).rejects.toBe(closed.error);
  });
});

describe("VoiceAgentLiveClient finalization", () => {
  it("waits for both session.closed and socket closure and rejects sends while closing", async () => {
    const factory = createFactory();
    factory.transport.autoFinalize = false;
    factory.transport.autoClose = false;
    const states: [VoiceAgentConnectionState, VoiceAgentConnectionState][] = [];
    const connection = await createClient(factory).beta.voiceAgents.live.connect("live-agent", {
      onConnectionStateChange: (state, previous) => states.push([state, previous]),
    });
    const pending = connection.close(1000, "Finished offline.");
    const settled = vi.fn();
    void pending.then(settled, settled);
    expect(connection.state).toBe("closing");
    await expect(connection.muteInputAudio()).rejects.toMatchObject({ code: "invalidState" });
    expect(factory.transport.sentMessages.map((data) => JSON.parse(data))).toEqual([
      { type: "session.close" },
    ]);
    const terminal = sessionClosed(createSession({ instructions: "Final snapshot." }));
    factory.transport.receive(terminal);
    await Promise.resolve();
    expect(settled).not.toHaveBeenCalled();
    factory.transport.disconnect(1000, "Finished offline.", true);
    await pending;
    await expect(connection.closed).resolves.toMatchObject({
      code: 1000,
      reason: "Finished offline.",
      wasClean: true,
      sessionClosed: terminal,
    });
    expect(connection.session).toMatchObject(terminal.session);
    expect(states).toEqual([
      ["connecting", "disconnected"],
      ["connected", "connecting"],
      ["closing", "connected"],
      ["disconnected", "closing"],
    ]);
  });

  it("makes close/dispose idempotent and sends session.close only once", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const closing = connection.close();
    expect(connection.close()).toBe(closing);
    expect(connection.dispose()).toBe(closing);
    await closing;
    await connection.close();
    await connection.dispose();
    expect(factory.transport.sentMessages.map((data) => JSON.parse(data))).toEqual([
      { type: "session.close" },
    ]);
    await expect(connection.sendEvent({ type: "session.input_audio.mute" })).rejects.toMatchObject({
      name: "VoiceAgentConnectionError",
      code: "invalidState",
    });
  });

  it("retains a server-initiated finalization event and drains it before iteration finishes", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const iterator = connection[Symbol.asyncIterator]();
    await iterator.next();
    const next = iterator.next();
    const terminal = { ...sessionClosed(), reason: "expired" as const };
    factory.transport.receive(terminal);
    expect((await next).value).toMatchObject(terminal);
    await expect(connection.closed).resolves.toMatchObject({
      sessionClosed: terminal,
      error: undefined,
    });
    expect((await iterator.next()).done).toBe(true);
    expect(factory.transport.sentMessages).toEqual([]);
    await connection.close();
  });

  it("rejects graceful close when the socket closes normally without finalization", async () => {
    const factory = createFactory();
    factory.transport.autoFinalize = false;
    const connection = await connect(factory);
    const pending = connection.close();
    const rejected = expect(pending).rejects.toThrow("without session.closed");
    factory.transport.disconnect(1000, "Peer closed without finalization.", true);
    await rejected;
    await expect(connection.closed).resolves.toMatchObject({ sessionClosed: undefined });
  });

  it.each([false, true])(
    "times out an incomplete close (received session.closed: %s)",
    async (finalized) => {
      vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
      const factory = createFactory();
      factory.transport.autoFinalize = finalized;
      factory.transport.autoClose = !finalized;
      const connection = await createClient(factory, new TestCredential(), {
        liveOptions: { closeTimeoutInMs: 50 },
      }).beta.voiceAgents.live.connect("live-agent");
      const pending = connection.close();
      const outcome = pending.then(
        () => ({ error: undefined }),
        (error: unknown) => ({ error }),
      );
      await vi.advanceTimersByTimeAsync(50);
      expect((await outcome).error).toBeInstanceOf(VoiceAgentConnectionError);
      await expect(connection.closed).resolves.toMatchObject({
        wasClean: false,
        error: expect.objectContaining({ code: "connectionClosed" }),
        sessionClosed: finalized ? expect.objectContaining(sessionClosed()) : undefined,
      });
      expect(connection.state).toBe("disconnected");
      expect(factory.transport.closeCalls.length).toBeGreaterThan(0);
      expect(vi.getTimerCount()).toBe(0);
    },
  );

  it("fails a pending iterator on malformed service data and closes the transport", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const iterator = connection[Symbol.asyncIterator]();
    await iterator.next();
    const next = iterator.next();
    const rejected = expect(next).rejects.toBeInstanceOf(VoiceAgentProtocolError);
    factory.transport.receiveRaw("not-json");
    await rejected;
    await expect(connection.closed).resolves.toMatchObject({
      code: 1002,
      wasClean: false,
      error: expect.any(VoiceAgentProtocolError),
    });
    expect(factory.transport.closeCalls).toContainEqual({
      code: 1002,
      reason: "Invalid Live event.",
    });
    await connection.close();
  });

  it("preserves unexpected close details and fails outstanding event reads", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const iterator = connection[Symbol.asyncIterator]();
    await iterator.next();
    const pending = iterator.next();
    const rejected = expect(pending).rejects.toMatchObject({
      name: "VoiceAgentConnectionError",
      code: "connectionClosed",
      closeCode: 1011,
    });
    factory.transport.disconnect(1011, "Upstream unavailable.");
    await rejected;
    await expect(connection.closed).resolves.toMatchObject({
      code: 1011,
      reason: "Upstream unavailable.",
      wasClean: false,
      sessionClosed: undefined,
    });
  });

  it("preserves transport errors and handles failures during finalization without unhandled rejections", async () => {
    const factory = createFactory();
    const connection = await connect(factory);
    const cause = new Error("Offline socket failure.");
    factory.transport.handlers?.onError(cause);
    await expect(connection.closed).resolves.toMatchObject({
      code: 1006,
      error: expect.objectContaining({ name: "VoiceAgentConnectionError", cause }),
    });
    await connection.dispose();

    const closingFactory = createFactory();
    const closing = await connect(closingFactory);
    const closeCause = new Error("Offline close failure.");
    closingFactory.transport.closeError = closeCause;
    await expect(closing.close()).rejects.toBeInstanceOf(VoiceAgentConnectionError);
    await expect(closing.closed).resolves.toMatchObject({
      error: expect.objectContaining({ cause: closeCause }),
    });
  });
});
