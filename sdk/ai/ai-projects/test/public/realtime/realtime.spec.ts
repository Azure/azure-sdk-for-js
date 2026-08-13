// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  AIProjectClient,
  KnownApiVersions,
  VoiceAgentConnectionError,
  VoiceAgentConnectionState,
  VoiceAgentProtocolError,
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
import { assert, describe, expect, it } from "vitest";

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
    expect(() => deserializeVoiceAgentServerEvent('{"type":"future.event"}')).toThrow(
      /Unsupported server event type/,
    );
  });

  it("inherits project connection options and exposes one realtime client", async () => {
    const factory = new MockWebSocketFactory();
    const credential = new TestCredential();
    const client = new AIProjectClient("https://unused.example", credential, {
      endpoint: "https://example.services.ai.azure.com/api/projects/shared-project",
      apiVersion: KnownApiVersions.v1,
      credentials: { scopes: ["https://example.test/.default"] },
      userAgentOptions: { userAgentPrefix: "custom-prefix" },
      realtimeOptions: { webSocketFactory: factory },
    });

    assert.ok(client.agents);
    assert.ok(client.agentEndpointConversations);
    assert.ok(client.voiceAgentWebSocket);

    const connection = await client.realtime.connect("support-agent");
    const connectOptions = factory.transport.connectOptions;
    assert.ok(connectOptions);
    const url = new URL(connectOptions.url);
    assert.equal(
      url.pathname,
      "/api/projects/shared-project/agents/support-agent/endpoint/protocols/voice",
    );
    assert.equal(url.searchParams.get("api-version"), "v1");
    assert.deepEqual(credential.requestedScopes, ["https://example.test/.default"]);
    assert.match(connectOptions.headers["user-agent"], /^custom-prefix /);

    await connection.close();
  });

  it("builds the authenticated upgrade request and reports states", async () => {
    const factory = new MockWebSocketFactory();
    const states: VoiceAgentConnectionState[] = [];
    const connection = await createClient(factory).realtime.connect("support-agent", {
      agentSessionId: "session-1",
      store: false,
      agentVersionOverride: "2",
      structuredInputs: { customer: "Ada" },
      onConnectionStateChange: (state) => states.push(state),
    });

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
    assert.deepEqual(states, [
      VoiceAgentConnectionState.Connecting,
      VoiceAgentConnectionState.Connected,
    ]);

    await connection.close();
    assert.equal((await connection.closed).code, 1000);
    assert.equal(connection.state, VoiceAgentConnectionState.Disconnected);
  });

  it("sends text, audio, session settings, and tool outputs", async () => {
    const factory = new MockWebSocketFactory();
    const connection = await createClient(factory).realtime.connect("support-agent");

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
    const connection = await createClient(streamFactory).realtime.connect("support-agent");
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
      await createClient(protocolFactory).realtime.connect("support-agent");
    const protocolRead = protocolConnection[Symbol.asyncIterator]().next();
    protocolFactory.transport.receiveRaw("not-json");
    await expect(protocolRead).rejects.toBeInstanceOf(VoiceAgentProtocolError);
    assert.equal((await protocolConnection.closed).code, 1002);

    const closeFactory = new MockWebSocketFactory();
    const closeConnection = await createClient(closeFactory).realtime.connect("support-agent");
    const closeRead = closeConnection[Symbol.asyncIterator]().next();
    closeFactory.transport.disconnect(1011, "service failure");
    await expect(closeRead).rejects.toBeInstanceOf(VoiceAgentConnectionError);
    assert.equal((await closeConnection.closed).wasClean, false);
  });

  it("honors a pre-cancelled connection attempt", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      createClient(new MockWebSocketFactory()).realtime.connect("support-agent", {
        abortSignal: controller.signal,
      }),
    ).rejects.toMatchObject({ code: "operationCancelled" });
  });
});
