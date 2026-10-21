// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentLiveClient } from "@azure/ai-projects";
import { afterEach, describe, expect, it, vi } from "vitest";
import { runVoiceAgentLiveFunctions } from "../../../../samples-dev/agents/utils/liveFunctions.js";
import { endpoint, MockWebSocketFactory, TestCredential } from "../utils/mockTransport.js";

const factories: MockWebSocketFactory[] = [];
let sequence = 0;

async function connect(): Promise<{
  factory: MockWebSocketFactory;
  connection: Awaited<ReturnType<VoiceAgentLiveClient["connect"]>>;
}> {
  const factory = new MockWebSocketFactory();
  factories.push(factory);
  const connection = await new VoiceAgentLiveClient(endpoint, new TestCredential(), {
    webSocketFactory: factory,
  }).connect("sample-functions");
  vi.useFakeTimers();
  vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  return { factory, connection };
}

function backend(
  factory: MockWebSocketFactory,
  type: string,
  fields: Record<string, unknown>,
): void {
  factory.transport.receive({
    type: "response.event",
    event_id: `backend-${sequence++}`,
    delegation_id: "delegation-1",
    event: { type, ...fields },
  });
}

function call(factory: MockWebSocketFactory, argumentsValue = "{}"): void {
  backend(factory, "response.output_item.done", {
    item: {
      type: "function_call",
      name: "get_current_time",
      call_id: "call-1",
      arguments: argumentsValue,
    },
  });
}

function messages(factory: MockWebSocketFactory): Record<string, unknown>[] {
  return factory.transport.sentMessages.map((value) => JSON.parse(value));
}

afterEach(() => {
  for (const factory of factories.splice(0)) factory.transport.disconnect(1000, "Cleanup.", true);
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("GPT Live function sample", () => {
  it("deduplicates completed function calls and response continuations, and waits for spoken output", async () => {
    const { connection, factory } = await connect();
    const pending = runVoiceAgentLiveFunctions(connection);
    await vi.advanceTimersByTimeAsync(0);
    call(factory);
    call(factory);
    await vi.advanceTimersByTimeAsync(0);
    expect(messages(factory).filter((event) => event.type === "response.item.create")).toHaveLength(
      1,
    );
    backend(factory, "response.completed", { response: { id: "response-1", status: "completed" } });
    backend(factory, "response.completed", { response: { id: "response-1", status: "completed" } });
    await vi.advanceTimersByTimeAsync(0);
    const items = messages(factory).filter((event) => event.type === "response.item.create");
    expect(items).toHaveLength(2);
    expect(items[1].item).toMatchObject({ type: "function_call_output", call_id: "call-1" });
    expect(messages(factory).filter((event) => event.type === "response.create")).toHaveLength(2);
    expect(connection.state).toBe("connected");
    backend(factory, "response.completed", { response: { id: "response-2", status: "completed" } });
    factory.transport.receive({ type: "session.output_audio.delta", delta: "6APoAw==" });
    factory.transport.receive({
      type: "session.output_transcript.delta",
      event_id: "caption-final",
      delta: "The current UTC time is noon.",
      start_ms: 0,
      end_ms: 100,
    });
    await vi.advanceTimersByTimeAsync(1000);
    await pending;
    expect(connection.state).toBe("disconnected");
  });

  it.each(["response.failed", "response.incomplete", "error"])(
    "surfaces the nested %s failure instead of waiting for a fixed success timer",
    async (type) => {
      const { connection, factory } = await connect();
      const failure = expect(runVoiceAgentLiveFunctions(connection)).rejects.toThrow(type);
      backend(factory, type, { error: { code: "backend_failure", message: "Failed." } });
      await vi.advanceTimersByTimeAsync(0);
      await failure;
      expect(connection.state).toBe("disconnected");
    },
  );

  it.each(["not json", "[]", "null", '{"unexpected":true}'])(
    "rejects malformed or schema-invalid tool arguments %s",
    async (argumentsValue) => {
      const { connection, factory } = await connect();
      const failure = expect(runVoiceAgentLiveFunctions(connection)).rejects.toThrow();
      call(factory, argumentsValue);
      await vi.advanceTimersByTimeAsync(0);
      await failure;
      expect(connection.state).toBe("disconnected");
      expect(
        messages(factory).filter((event) => event.type === "response.item.create"),
      ).toHaveLength(1);
    },
  );

  it("fails when the backend completes without requesting the advertised function", async () => {
    const { connection, factory } = await connect();
    const failure = expect(runVoiceAgentLiveFunctions(connection)).rejects.toThrow(
      "The backend did not request get_current_time.",
    );
    backend(factory, "response.completed", { response: { id: "response-1", status: "completed" } });
    await vi.advanceTimersByTimeAsync(0);
    await failure;
  });

  it("rejects a completed envelope carrying a failed status", async () => {
    const { connection, factory } = await connect();
    const failure = expect(runVoiceAgentLiveFunctions(connection)).rejects.toThrow(
      /did not complete successfully/,
    );
    backend(factory, "response.completed", { response: { id: "response-1", status: "failed" } });
    await vi.advanceTimersByTimeAsync(0);
    await failure;
  });

  it("does not count a completed tool invocation without a spoken final reply as success", async () => {
    const { connection, factory } = await connect();
    const failure = expect(runVoiceAgentLiveFunctions(connection)).rejects.toThrow(
      /Timed out waiting for GPT Live spoken output/,
    );
    call(factory);
    backend(factory, "response.completed", { response: { id: "response-1", status: "completed" } });
    backend(factory, "response.completed", { response: { id: "response-2", status: "completed" } });
    await vi.advanceTimersByTimeAsync(60_000);
    await failure;
    expect(connection.state).toBe("disconnected");
  });
});
