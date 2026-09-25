// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  AIProjectClient,
  KnownVoiceAgentConnectionState,
  VoiceAgentConnectionError,
  VoiceAgentProtocolError,
} from "@azure/ai-projects";
import type {
  KnownApiVersions,
  RealtimeServerEventResponseAudioDelta,
  RealtimeServerEventResponseTextDelta,
  VoiceAgentConnection,
  VoiceAgentConnectionState,
  VoiceAgentRealtimeEvent,
  VoiceAgentServerEvent,
  VoiceAgentUnknownEvent,
} from "@azure/ai-projects";
import type {
  VoiceAgentWebSocketConnectOptions,
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "$internal/realtime/webSocketTransportLike.js";
import {
  deserializeVoiceAgentServerEvent,
  serializeVoiceAgentClientEvent,
} from "$internal/realtime/protocol.js";
import { SDK_VERSION } from "$internal/constants.js";
import { assert, describe, expect, expectTypeOf, it, vi } from "vitest";

class TestCredential implements TokenCredential {
  public requestedScopes?: string | string[];

  public async getToken(
    scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken> {
    this.requestedScopes = scopes;
    return { token: "test-token", expiresOnTimestamp: Date.now() + 60_000 };
  }
}

class MockWebSocketTransport implements VoiceAgentWebSocketTransport {
  public handlers?: VoiceAgentWebSocketHandlers;
  public connectOptions?: VoiceAgentWebSocketConnectOptions;
  public readonly sentMessages: string[] = [];

  public setHandlers(handlers: VoiceAgentWebSocketHandlers): void {
    this.handlers = handlers;
  }

  public async connect(options: VoiceAgentWebSocketConnectOptions): Promise<void> {
    this.connectOptions = options;
    if (options.abortSignal?.aborted) {
      throw new Error("cancelled");
    }
  }

  public async send(data: string, abortSignal?: AbortSignalLike): Promise<void> {
    if (abortSignal?.aborted) {
      throw new Error("cancelled");
    }
    this.sentMessages.push(data);
  }

  public async close(code: number, reason: string): Promise<void> {
    this.handlers?.onClose(code, reason, code === 1000);
  }

  public receive(event: unknown): void {
    this.handlers?.onMessage(JSON.stringify(event));
  }

  public receiveRaw(data: string): void {
    this.handlers?.onMessage(data);
  }

  public disconnect(code: number, reason: string): void {
    this.handlers?.onClose(code, reason, false);
  }
}

class MockWebSocketFactory implements VoiceAgentWebSocketFactory {
  public readonly transport = new MockWebSocketTransport();

  public create(): VoiceAgentWebSocketTransport {
    return this.transport;
  }
}

function createClient(
  factory: MockWebSocketFactory,
  credential = new TestCredential(),
): AIProjectClient {
  return new AIProjectClient(
    "https://example.services.ai.azure.com/api/projects/example-project",
    credential,
    { realtimeOptions: { webSocketFactory: factory } },
  );
}

describe("AIProjectClient realtime", () => {
  it("uses generated session serializers for discriminated settings", () => {
    const message = serializeVoiceAgentClientEvent({
      type: "session.update",
      session: {
        type: "realtime",
        output_modalities: ["text", "audio"],
        audio: {
          input: {
            turn_detection: {
              type: "azure_semantic_vad_multilingual",
              prefix_padding_ms: 200,
              silence_duration_ms: 500,
              speech_duration_ms: 100,
              end_of_utterance_detection: {
                model: "semantic_detection_v1_multilingual",
                timeout_ms: 800,
              },
            },
          },
        },
      },
    });

    const parsed = JSON.parse(message);
    assert.equal(parsed.session.audio.input.turn_detection.prefix_padding_ms, 200);
    assert.equal(parsed.session.audio.input.turn_detection.silence_duration_ms, 500);
    assert.equal(parsed.session.audio.input.turn_detection.speech_duration_ms, 100);
    assert.equal(
      parsed.session.audio.input.turn_detection.end_of_utterance_detection.timeout_ms,
      800,
    );
  });

  it("deserializes audio and rejects malformed server events", () => {
    const event = deserializeVoiceAgentServerEvent(
      JSON.stringify({
        event_id: "event-1",
        type: "response.output_audio.delta",
        response_id: "response-1",
        item_id: "item-1",
        output_index: 0,
        content_index: 0,
        delta: "AQID",
      }),
    );

    assert.equal(event.type, "response.output_audio.delta");
    if (event.type === "response.output_audio.delta") {
      assert.deepEqual(event.delta, new Uint8Array([1, 2, 3]));
    }

    const responseDone = deserializeVoiceAgentServerEvent(
      JSON.stringify({
        event_id: "event-2",
        type: "response.done",
        response: {
          id: "response-1",
          object: "realtime.response",
          status: "completed",
          conversation_id: "conversation-1",
          output_modalities: ["audio"],
          audio: {
            output: {
              voice: "en-US-AvaNeural",
              voice_type: "azure-standard",
              voice_locale: "en-US",
              format: { type: "audio/pcm", rate: 24000 },
            },
          },
          output: [],
        },
      }),
    );
    assert.equal(responseDone.type, "response.done");
    if (responseDone.type === "response.done") {
      assert.equal(responseDone.response.conversation_id, "conversation-1");
      assert.deepEqual(responseDone.response.output_modalities, ["audio"]);
      assert.equal(responseDone.response.audio?.output?.voice_type, "azure-standard");
      assert.deepEqual(responseDone.response.audio?.output?.format, {
        type: "audio/pcm",
        rate: 24000,
      });
    }

    expect(() => deserializeVoiceAgentServerEvent("not-json")).toThrow(VoiceAgentProtocolError);
  });

  it("serializes and deserializes the WebRTC call-signaling events", () => {
    const offer = serializeVoiceAgentClientEvent({
      type: "rtc.call.sdp.create",
      sdp_offer: "v=0 offer",
      session: {
        type: "realtime",
        audio: {
          input: {
            turn_detection: {
              type: "azure_semantic_vad_multilingual",
              prefix_padding_ms: 200,
              silence_duration_ms: 500,
              speech_duration_ms: 100,
              end_of_utterance_detection: {
                model: "semantic_detection_v1_multilingual",
                timeout_ms: 800,
              },
            },
          },
        },
      },
    });
    const parsedOffer = JSON.parse(offer);
    assert.equal(parsedOffer.type, "rtc.call.sdp.create");
    assert.equal(parsedOffer.sdp_offer, "v=0 offer");
    // The `session` field shares the same discriminated-union settings as `session.update`, and
    // protocol.ts special-cases `rtc.call.sdp.create` to run it through the same normalization.
    assert.equal(parsedOffer.session.audio.input.turn_detection.prefix_padding_ms, 200);
    assert.equal(
      parsedOffer.session.audio.input.turn_detection.end_of_utterance_detection.timeout_ms,
      800,
    );

    const sdpCreated = deserializeVoiceAgentServerEvent(
      JSON.stringify({
        type: "rtc.call.sdp.created",
        event_id: "rtc-event-1",
        rtc_call_id: "call-1",
        sdp_answer: "v=0 answer",
      }),
    );
    assert.equal(sdpCreated.type, "rtc.call.sdp.created");
    if (sdpCreated.type === "rtc.call.sdp.created") {
      assert.equal(sdpCreated.rtc_call_id, "call-1");
      assert.equal(sdpCreated.sdp_answer, "v=0 answer");
    }
    expect(() =>
      deserializeVoiceAgentServerEvent(
        JSON.stringify({ type: "rtc.call.sdp.created", event_id: "rtc-event-1" }),
      ),
    ).toThrow('required "rtc_call_id"');

    // `rtc.call.error` is the one server event where `event_id` is genuinely optional (see
    // `optionalEventIdServerEvents` in protocol.ts), so this also exercises that special case.
    const rtcError = deserializeVoiceAgentServerEvent(
      JSON.stringify({
        type: "rtc.call.error",
        operation: "rtc.call.sdp.create",
        rtc_call_id: "call-1",
        error: { type: "invalid_request_error", code: "invalid_sdp", message: "Malformed offer." },
      }),
    );
    assert.equal(rtcError.type, "rtc.call.error");
    if (rtcError.type === "rtc.call.error") {
      assert.equal(rtcError.event_id, undefined);
      assert.equal(rtcError.operation, "rtc.call.sdp.create");
      assert.equal(rtcError.rtc_call_id, "call-1");
      assert.deepEqual(rtcError.error, {
        type: "invalid_request_error",
        code: "invalid_sdp",
        message: "Malformed offer.",
      });
    }
    // The generated deserializer dereferences the nested `error` object unconditionally (the same
    // pattern used by the plain `error` event's deserializer), so an entirely absent `error` key
    // throws before the friendlier `VoiceAgentProtocolError` required-field check ever runs.
    expect(() =>
      deserializeVoiceAgentServerEvent(JSON.stringify({ type: "rtc.call.error" })),
    ).toThrow();
  });

  it.each(["future.event", "unknown", "constructor", "toString", "__proto__"])(
    "preserves the complete unknown %s event without known-schema validation",
    (type) => {
      const rawEvent = {
        type,
        delta: "AQID",
        nested: { enabled: true, values: [null, 42, "text", { type: "session.created" }] },
        session: { audio: null, future_setting: ["unmodified"] },
        eventType: "a payload field",
        rawEvent: { type: "another payload field" },
      };
      const json = JSON.stringify(rawEvent);
      for (const data of [json, new TextEncoder().encode(json).buffer]) {
        const event = deserializeVoiceAgentServerEvent(data);
        expect(event).toEqual({ type: "unknown", eventType: type, rawEvent });
        if (event.type === "unknown") {
          expectTypeOf(event).toEqualTypeOf<VoiceAgentUnknownEvent>();
          expect(event.rawEvent).not.toHaveProperty("event_id");
          expect(event.rawEvent["delta"]).toBe("AQID");
        }
      }

      expect(deserializeVoiceAgentServerEvent(JSON.stringify({ type, event_id: null }))).toEqual({
        type: "unknown",
        eventType: type,
        rawEvent: { type, event_id: null },
      });
    },
  );

  it.each([
    ["not-json", "invalid JSON"],
    ["null", "without a type discriminator"],
    ["[]", "without a type discriminator"],
    ['"future.event"', "without a type discriminator"],
    ["{}", "without a type discriminator"],
    ['{"type":null}', "invalid event type discriminator"],
    ['{"type":42}', "invalid event type discriminator"],
    ['{"type":{}}', "invalid event type discriminator"],
    ['{"type":"response.output_text.delta"}', 'required "event_id"'],
    ['{"type":"response.output_text.delta","event_id":"text-1"}', 'required "delta"'],
  ])("retains protocol failures for %s", async (data, message) => {
    expect(() => deserializeVoiceAgentServerEvent(data)).toThrow(VoiceAgentProtocolError);
    expect(() => deserializeVoiceAgentServerEvent(data)).toThrow(message);

    const factory = new MockWebSocketFactory();
    const connection = await createClient(factory).beta.voiceAgents.realtime.connect("agent");
    const next = connection[Symbol.asyncIterator]().next();
    factory.transport.receiveRaw(data);
    await expect(next).rejects.toThrow(VoiceAgentProtocolError);
    await expect(connection.closed).resolves.toMatchObject({ code: 1002, wasClean: false });
    expect(connection.state).toBe("disconnected");
  });

  it("does not reinterpret a malformed known event as an unknown event", async () => {
    const factory = new MockWebSocketFactory();
    const connection = await createClient(factory).beta.voiceAgents.realtime.connect("agent");
    const next = connection[Symbol.asyncIterator]().next();
    factory.transport.receive({ type: "session.created", event_id: "session-1" });
    await expect(next).rejects.toBeInstanceOf(VoiceAgentProtocolError);
    await expect(connection.closed).resolves.toMatchObject({ code: 1002, wasClean: false });
  });

  it.each(["session.created", "session.updated"])(
    "still normalizes known %s session settings",
    (type) => {
      const event = deserializeVoiceAgentServerEvent(
        JSON.stringify({
          type,
          event_id: "session-1",
          session: {
            type: "realtime",
            audio: {
              input: {
                turn_detection: {
                  type: "azure_semantic_vad",
                  prefix_padding_ms: 200,
                  end_of_utterance_detection: {
                    model: "semantic_detection_v1",
                    timeout_ms: 800,
                    extra: "not in known schema",
                  },
                },
              },
            },
          },
        }),
      );
      assert.ok(event.type === "session.created" || event.type === "session.updated");
      expect(event.session.audio?.input?.turn_detection).toMatchObject({
        type: "azure_semantic_vad",
        prefix_padding_ms: 200,
        end_of_utterance_detection: { model: "semantic_detection_v1", timeout_ms: 800 },
      });
      expect(event.session.audio?.input?.turn_detection).not.toHaveProperty(
        "end_of_utterance_detection.extra",
      );
    },
  );

  it("preserves known-event narrowing in the public realtime event union", () => {
    expectTypeOf<VoiceAgentConnection>().toExtend<AsyncIterable<VoiceAgentRealtimeEvent>>();
    const checkEvent = (event: VoiceAgentRealtimeEvent): void => {
      switch (event.type) {
        case "unknown":
          expectTypeOf(event).toEqualTypeOf<VoiceAgentUnknownEvent>();
          expectTypeOf(event.eventType).toEqualTypeOf<string>();
          break;
        case "response.output_text.delta":
          expectTypeOf(event).toEqualTypeOf<RealtimeServerEventResponseTextDelta>();
          expectTypeOf(event.delta).toEqualTypeOf<string>();
          break;
        case "response.output_audio.delta":
          expectTypeOf(event).toEqualTypeOf<RealtimeServerEventResponseAudioDelta>();
          expectTypeOf(event.delta).toEqualTypeOf<Uint8Array>();
          break;
      }
      if (event.type !== "unknown") {
        expectTypeOf(event).toEqualTypeOf<VoiceAgentServerEvent>();
      }
    };
    checkEvent(deserializeVoiceAgentServerEvent('{"type":"future.event"}'));
  });

  it.each([true, false])(
    "keeps event order and the connection open (unknown first: %s)",
    async (unknownFirst) => {
      const factory = new MockWebSocketFactory();
      const states: VoiceAgentConnectionState[] = [];
      const connection = await createClient(factory).beta.voiceAgents.realtime.connect("agent", {
        onConnectionStateChange: (state) => states.push(state),
      });
      const closed = vi.fn();
      void connection.closed.then(closed);
      const close = vi.spyOn(factory.transport, "close");
      const iterator = connection[Symbol.asyncIterator]();
      const text = {
        type: "response.output_text.delta",
        event_id: "text-1",
        response_id: "response-1",
        item_id: "item-1",
        output_index: 0,
        content_index: 0,
        delta: "Hello",
      };
      const rawEvent = { type: "future.event", data: [null, { value: 1 }] };
      const audio = {
        ...text,
        type: "response.output_audio.delta",
        event_id: "audio-1",
        delta: "AQID",
      };
      const incoming = unknownFirst ? [rawEvent, text, audio] : [text, rawEvent, audio];
      const expected = {
        unknown: { type: "unknown", eventType: "future.event", rawEvent },
        audio: { ...audio, delta: new Uint8Array([1, 2, 3]) },
      };
      const next = iterator.next();
      for (const event of incoming) {
        factory.transport.receive(event);
      }
      const received = [await next, await iterator.next(), await iterator.next()];
      expect(received.map((result) => result.value)).toEqual(
        unknownFirst
          ? [expected.unknown, text, expected.audio]
          : [text, expected.unknown, expected.audio],
      );
      expect(connection.state).toBe("connected");
      expect(states).toEqual(["connecting", "connected"]);
      expect(closed).not.toHaveBeenCalled();
      expect(close).not.toHaveBeenCalled();

      await connection.sendText("Continue", { createResponse: false });
      expect(JSON.parse(factory.transport.sentMessages[0]).item.content[0].text).toBe("Continue");
      expect(closed).not.toHaveBeenCalled();

      await connection.close();
      expect(closed).toHaveBeenCalledOnce();
      await expect(connection.closed).resolves.toMatchObject({ code: 1000, wasClean: true });
      expect((await iterator.next()).done).toBe(true);
    },
  );

  it("keeps service errors and unsupported outbound events distinct from the fallback", async () => {
    const factory = new MockWebSocketFactory();
    const connection = await createClient(factory).beta.voiceAgents.realtime.connect("agent");
    const iterator = connection[Symbol.asyncIterator]();
    const serviceError = {
      type: "error",
      event_id: "error-1",
      error: { type: "invalid_request_error", code: "invalid_value", message: "Invalid input." },
    };
    factory.transport.receive(serviceError);
    expect((await iterator.next()).value).toMatchObject(serviceError);
    expect(connection.state).toBe("connected");

    await expect(
      // @ts-expect-error Verify the runtime guard for callers without TypeScript.
      connection.sendEvent({ type: "future.event" }),
    ).rejects.toThrow("Unsupported client event type: future.event");
    expect(factory.transport.sentMessages).toHaveLength(0);
    expect(connection.state).toBe("connected");
    await connection.close();
  });

  it("inherits project connection options and exposes one realtime client", async () => {
    const factory = new MockWebSocketFactory();
    const credential = new TestCredential();
    const client = new AIProjectClient("https://unused.example", credential, {
      endpoint: "https://example.services.ai.azure.com/api/projects/shared-project",
      apiVersion: "v1" as KnownApiVersions,
      credentials: { scopes: ["https://example.test/.default"] },
      userAgentOptions: { userAgentPrefix: "custom-prefix" },
      realtimeOptions: { webSocketFactory: factory },
    });

    assert.ok(client.agents);
    assert.ok(client.beta.voiceAgents.conversations);

    const connection = await client.beta.voiceAgents.realtime.connect("support-agent");
    const connectOptions = factory.transport.connectOptions;
    assert.ok(connectOptions);
    const url = new URL(connectOptions.url);
    assert.equal(
      url.pathname,
      "/api/projects/shared-project/agents/support-agent/endpoint/protocols/voice",
    );
    assert.equal(url.searchParams.get("api-version"), "v1");
    assert.deepEqual(credential.requestedScopes, ["https://example.test/.default"]);
    assert.equal(url.searchParams.get("x-ms-client-sdk"), `azsdk-js-ai-projects/${SDK_VERSION}`);
    assert.equal(connectOptions.headers["x-ms-client-sdk"], `azsdk-js-ai-projects/${SDK_VERSION}`);
    assert.equal(
      connectOptions.headers["user-agent"],
      `custom-prefix azsdk-js-ai-projects/${SDK_VERSION}`,
    );

    await connection.close();
  });

  it("builds the authenticated upgrade request and reports states", async () => {
    const factory = new MockWebSocketFactory();
    const states: VoiceAgentConnectionState[] = [];
    const connection = await createClient(factory).beta.voiceAgents.realtime.connect(
      "support-agent",
      {
        agentSessionId: "session-1",
        store: false,
        agentVersionOverride: "2",
        structuredInputs: { customer: "Ada" },
        onConnectionStateChange: (state) => states.push(state),
      },
    );

    const connectOptions = factory.transport.connectOptions;
    assert.ok(connectOptions);
    const url = new URL(connectOptions.url);
    assert.equal(url.searchParams.get("agent_session_id"), "session-1");
    assert.equal(url.searchParams.get("store"), "false");
    assert.equal(url.searchParams.get("x-agent-version-override"), "2");
    assert.deepEqual(connectOptions.protocols, ["realtime"]);
    assert.equal(connectOptions.headers.authorization, "Bearer test-token");
    assert.equal(connectOptions.headers["foundry-features"], "VoiceAgents=V1Preview");
    assert.equal(connectOptions.headers["x-ms-voice-structured-inputs"], '{"customer":"Ada"}');
    assert.equal(url.searchParams.get("x-ms-client-sdk"), `azsdk-js-ai-projects/${SDK_VERSION}`);
    assert.equal(connectOptions.headers["x-ms-client-sdk"], `azsdk-js-ai-projects/${SDK_VERSION}`);
    assert.equal(connectOptions.headers["user-agent"], `azsdk-js-ai-projects/${SDK_VERSION}`);
    assert.deepEqual(states, [
      KnownVoiceAgentConnectionState.Connecting,
      KnownVoiceAgentConnectionState.Connected,
    ]);

    await connection.close();
    assert.equal((await connection.closed).code, 1000);
    assert.equal(connection.state, KnownVoiceAgentConnectionState.Disconnected);
  });

  it.each([
    [undefined, null],
    ["websocket", "websocket"],
    ["webrtc", "webrtc"],
  ] as const)(
    "sets the connect-time transport query parameter (transport: %s)",
    async (transport, expectedQueryValue) => {
      const factory = new MockWebSocketFactory();
      const connection = await createClient(factory).beta.voiceAgents.realtime.connect(
        "support-agent",
        transport === undefined ? {} : { transport },
      );

      const connectOptions = factory.transport.connectOptions;
      assert.ok(connectOptions);
      const url = new URL(connectOptions.url);
      assert.equal(url.searchParams.get("transport"), expectedQueryValue);

      await connection.close();
    },
  );

  it("sends text, audio, session settings, and tool outputs", async () => {
    const factory = new MockWebSocketFactory();
    const connection =
      await createClient(factory).beta.voiceAgents.realtime.connect("support-agent");

    await connection.configureSession({
      type: "realtime",
      output_modalities: ["text", "audio"],
    });
    await connection.sendText("Hello");
    await connection.sendAudio(new Uint8Array([1, 2, 3]));
    await connection.commitAudio();
    await connection.sendToolOutput("call-1", '{"temperature":72}');

    const messages = factory.transport.sentMessages.map((message) => JSON.parse(message));
    assert.deepEqual(
      messages.map((message) => message.type),
      [
        "session.update",
        "conversation.item.create",
        "response.create",
        "input_audio_buffer.append",
        "input_audio_buffer.commit",
        "conversation.item.create",
        "response.create",
      ],
    );
    assert.equal(messages[1].item.content[0].text, "Hello");
    assert.equal(messages[3].audio, "AQID");
    assert.equal(messages[5].item.call_id, "call-1");

    await connection.close();
  });

  it("streams events and surfaces protocol and transport failures", async () => {
    const streamFactory = new MockWebSocketFactory();
    const connection =
      await createClient(streamFactory).beta.voiceAgents.realtime.connect("support-agent");
    const iterator = connection[Symbol.asyncIterator]();

    streamFactory.transport.receive({
      event_id: "text-1",
      type: "response.output_text.delta",
      response_id: "response-1",
      item_id: "item-1",
      output_index: 0,
      content_index: 0,
      delta: "Hello",
    });
    assert.equal((await iterator.next()).value?.type, "response.output_text.delta");
    await connection.close();
    assert.equal((await iterator.next()).done, true);

    const protocolFactory = new MockWebSocketFactory();
    const protocolConnection =
      await createClient(protocolFactory).beta.voiceAgents.realtime.connect("support-agent");
    const protocolRead = protocolConnection[Symbol.asyncIterator]().next();
    protocolFactory.transport.receiveRaw("not-json");
    await expect(protocolRead).rejects.toBeInstanceOf(VoiceAgentProtocolError);
    assert.equal((await protocolConnection.closed).code, 1002);

    const closeFactory = new MockWebSocketFactory();
    const closeConnection =
      await createClient(closeFactory).beta.voiceAgents.realtime.connect("support-agent");
    const closeRead = closeConnection[Symbol.asyncIterator]().next();
    closeFactory.transport.disconnect(1011, "service failure");
    await expect(closeRead).rejects.toBeInstanceOf(VoiceAgentConnectionError);
    assert.equal((await closeConnection.closed).wasClean, false);
  });

  it("honors a pre-cancelled connection attempt", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      createClient(new MockWebSocketFactory()).beta.voiceAgents.realtime.connect("support-agent", {
        abortSignal: controller.signal,
      }),
    ).rejects.toMatchObject({ code: "operationCancelled" });
  });
});
