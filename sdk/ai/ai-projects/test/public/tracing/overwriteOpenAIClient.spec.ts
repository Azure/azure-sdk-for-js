// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { overwriteOpenAIClient } from "../../../src/overwriteOpenAIClient.js";
import { enableGenAITracing, disableGenAITracing } from "../../../src/tracing/configuration.js";
import { tracingClient } from "../../../src/tracing/tracingClient.js";
import {
  GEN_AI_OPERATION_NAME,
  GEN_AI_PROVIDER_NAME,
  AZ_NAMESPACE,
  AZ_NAMESPACE_VALUE,
  AGENTS_PROVIDER,
  SERVER_ADDRESS,
  GEN_AI_AGENT_NAME,
  GEN_AI_CONVERSATION_ID,
  GEN_AI_INPUT_MESSAGES,
  GEN_AI_OUTPUT_MESSAGES,
  GEN_AI_RESPONSE_MODEL,
  GEN_AI_RESPONSE_ID,
  GEN_AI_USAGE_INPUT_TOKENS,
  GEN_AI_USAGE_OUTPUT_TOKENS,
  GEN_AI_SYSTEM_MESSAGE,
  ERROR_TYPE,
  OperationName,
} from "../../../src/tracing/constants.js";

// ---- Span recorder via direct object patching ----
// Both this file and overwriteOpenAIClient.ts import the same `tracingClient`
// singleton, so replacing its methods here is visible to the production code.

interface RecordedSpan {
  name: string;
  attributes: Record<string, unknown>;
  statusInfo?: { status: string; error?: unknown };
  ended: boolean;
  setAttribute(key: string, value: unknown): void;
  setStatus(status: { status: string; error?: unknown }): void;
  end(): void;
}

function createMockSpan(name: string): RecordedSpan {
  const span: RecordedSpan = {
    name,
    attributes: {},
    statusInfo: undefined,
    ended: false,
    setAttribute(key: string, value: unknown) {
      span.attributes[key] = value;
    },
    setStatus(status: { status: string; error?: unknown }) {
      span.statusInfo = status;
    },
    end() {
      span.ended = true;
    },
  };
  return span;
}

let recordedSpans: RecordedSpan[] = [];
const originalWithSpan = tracingClient.withSpan;
const originalStartSpan = tracingClient.startSpan;

function installMockTracing(): void {
  (tracingClient as any).withSpan = async (
    name: string,
    options: unknown,
    callback: Function,
  ) => {
    const span = createMockSpan(name);
    recordedSpans.push(span);
    try {
      const result = await callback(options, span);
      span.setStatus({ status: "success" });
      return result;
    } catch (error) {
      span.setStatus({ status: "error", error });
      throw error;
    } finally {
      span.end();
    }
  };

  (tracingClient as any).startSpan = (name: string, _options: unknown) => {
    const span = createMockSpan(name);
    recordedSpans.push(span);
    return { span, tracingContext: {} };
  };
}

function uninstallMockTracing(): void {
  (tracingClient as any).withSpan = originalWithSpan;
  (tracingClient as any).startSpan = originalStartSpan;
}

// ---- Mock OpenAI client factory ----

function createMockNonStreamingResponse(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "resp_test123",
    model: "gpt-4.1",
    status: "completed",
    output: [
      {
        type: "message",
        role: "assistant",
        content: [{ text: "Test response" }],
        status: "completed",
      },
    ],
    usage: { input_tokens: 10, output_tokens: 20 },
    output_text: "Test response",
    ...overrides,
  };
}

function createMockFunctionCallResponse(): Record<string, unknown> {
  return {
    id: "resp_fc123",
    model: "gpt-4.1",
    status: "completed",
    output: [
      {
        type: "function_call",
        call_id: "call_abc",
        name: "get_weather",
        arguments: '{"location":"Seattle"}',
      },
    ],
    usage: { input_tokens: 15, output_tokens: 25 },
  };
}

function createMockOpenAIClient(mockResponse: Record<string, unknown>): any {
  return {
    responses: {
      create: async (..._args: unknown[]) => mockResponse,
    },
  };
}

function createMockStreamingOpenAIClient(events: Array<Record<string, unknown>>): any {
  return {
    responses: {
      create: async (..._args: unknown[]) => {
        return {
          [Symbol.asyncIterator]() {
            let index = 0;
            return {
              async next() {
                if (index < events.length) {
                  return { value: events[index++], done: false };
                }
                return { value: undefined, done: true };
              },
            };
          },
        };
      },
    },
  };
}

function getSpanByName(name: string): RecordedSpan | undefined {
  return recordedSpans.find((s) => s.name === name);
}

// ---- Env helpers ----

let savedContentEnv: string | undefined;
let savedTracingEnv: string | undefined;

function enableContentRecording(): void {
  process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "true";
}

function disableContentRecording(): void {
  process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "false";
}

// ---- Tests ----

describe("overwriteOpenAIClient - tracing integration", () => {
  beforeEach(() => {
    savedContentEnv = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    savedTracingEnv = process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    recordedSpans = [];
    installMockTracing();
    enableGenAITracing();
  });

  afterEach(() => {
    uninstallMockTracing();
    disableGenAITracing();

    if (savedContentEnv === undefined) {
      delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    } else {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = savedContentEnv;
    }
    if (savedTracingEnv === undefined) {
      delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    } else {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = savedTracingEnv;
    }
  });

  // ---- Non-streaming chat (model) ----

  it("creates chat span with correct attributes for model call", async () => {
    enableContentRecording();
    const endpoint = "https://test.services.ai.azure.com";
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, endpoint);

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: "What is 2+2?",
    });

    const span = getSpanByName("chat gpt-4.1");
    assert.isDefined(span, "Expected a span named 'chat gpt-4.1'");

    const attrs = span!.attributes;
    assert.equal(attrs[GEN_AI_OPERATION_NAME], OperationName.CHAT);
    assert.equal(attrs[AZ_NAMESPACE], AZ_NAMESPACE_VALUE);
    assert.equal(attrs[GEN_AI_PROVIDER_NAME], AGENTS_PROVIDER);
    assert.equal(attrs[SERVER_ADDRESS], "test.services.ai.azure.com");
    assert.equal(attrs[GEN_AI_RESPONSE_MODEL], "gpt-4.1");
    assert.equal(attrs[GEN_AI_RESPONSE_ID], "resp_test123");
    assert.equal(attrs[GEN_AI_USAGE_INPUT_TOKENS], 10);
    assert.equal(attrs[GEN_AI_USAGE_OUTPUT_TOKENS], 20);
  });

  it("includes input and output messages with content recording on", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: "What is 2+2?",
    });

    const span = getSpanByName("chat gpt-4.1")!;
    const inputMsg = JSON.parse(span.attributes[GEN_AI_INPUT_MESSAGES] as string);
    assert.equal(inputMsg[0].role, "user");
    assert.equal(inputMsg[0].parts[0].content, "What is 2+2?");

    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);
    assert.equal(outputMsg[0].role, "assistant");
    assert.equal(outputMsg[0].parts[0].content, "Test response");
    assert.equal(outputMsg[0].finish_reason, "completed");
  });

  it("omits content from messages when content recording is off", async () => {
    disableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: "What is 2+2?",
    });

    const span = getSpanByName("chat gpt-4.1")!;
    const inputMsg = JSON.parse(span.attributes[GEN_AI_INPUT_MESSAGES] as string);
    assert.equal(inputMsg[0].parts[0].type, "text");
    assert.notProperty(inputMsg[0].parts[0], "content");

    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);
    assert.equal(outputMsg[0].parts[0].type, "text");
    assert.notProperty(outputMsg[0].parts[0], "content");
  });

  it("sets system_instructions for chat (non-agent) calls with content on", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: "Hello",
      instructions: "Be helpful",
    });

    const span = getSpanByName("chat gpt-4.1")!;
    const instructions = JSON.parse(span.attributes[GEN_AI_SYSTEM_MESSAGE] as string);
    assert.equal(instructions[0].content, "Be helpful");
  });

  it("does not set system_instructions when content recording is off", async () => {
    disableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: "Hello",
      instructions: "Be helpful",
    });

    const span = getSpanByName("chat gpt-4.1")!;
    assert.notProperty(span.attributes, GEN_AI_SYSTEM_MESSAGE);
  });

  // ---- Non-streaming invoke_agent ----

  it("creates invoke_agent span for agent calls", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create(
      { input: "Hello agent" },
      { body: { agent: { name: "MyAgent", type: "agent_reference" } } },
    );

    const span = getSpanByName("invoke_agent MyAgent");
    assert.isDefined(span, "Expected a span named 'invoke_agent MyAgent'");
    assert.equal(span!.attributes[GEN_AI_OPERATION_NAME], OperationName.INVOKE_AGENT);
    assert.equal(span!.attributes[GEN_AI_AGENT_NAME], "MyAgent");
  });

  it("does not set system_instructions for invoke_agent spans", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create(
      { input: "Hello", instructions: "Be helpful" },
      { body: { agent: { name: "MyAgent", type: "agent_reference" } } },
    );

    const span = getSpanByName("invoke_agent MyAgent")!;
    assert.notProperty(span.attributes, GEN_AI_SYSTEM_MESSAGE);
  });

  it("sets conversation.id when provided", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create(
      { input: "Hello", conversation: "conv_xyz" },
      { body: { agent: { name: "MyAgent", type: "agent_reference" } } },
    );

    const span = getSpanByName("invoke_agent MyAgent")!;
    assert.equal(span.attributes[GEN_AI_CONVERSATION_ID], "conv_xyz");
  });

  // ---- Function call tool output ----

  it("formats function_call output in gen_ai.output.messages", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient(createMockFunctionCallResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: "What's the weather?",
      tools: [{ type: "function", name: "get_weather" }],
    });

    const span = getSpanByName("chat gpt-4.1")!;
    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);
    assert.equal(outputMsg[0].role, "assistant");
    assert.equal(outputMsg[0].parts[0].type, "tool_call");
    assert.equal(outputMsg[0].parts[0].id, "call_abc");
    assert.equal(outputMsg[0].parts[0].name, "get_weather");
  });

  // ---- Function call tool response input ----

  it("formats function_call_output in gen_ai.input.messages", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: [
        { type: "function_call", call_id: "call_abc", name: "get_weather", arguments: "{}" },
        {
          type: "function_call_output",
          call_id: "call_abc",
          output: '{"temperature":"70°F"}',
        },
      ],
    });

    const span = getSpanByName("chat gpt-4.1")!;
    const inputMsg = JSON.parse(span.attributes[GEN_AI_INPUT_MESSAGES] as string);
    assert.lengthOf(inputMsg, 1, "function_call skipped, only tool_call_response");
    assert.equal(inputMsg[0].role, "tool");
    assert.equal(inputMsg[0].parts[0].type, "tool_call_response");
    assert.equal(inputMsg[0].parts[0].id, "call_abc");
    assert.deepEqual(inputMsg[0].parts[0].result, { temperature: "70°F" });
  });

  // ---- Non-function tool call output (nested format) ----

  it("formats web_search_call in output as nested tool_call", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient({
      id: "resp_ws",
      model: "gpt-4.1",
      status: "completed",
      output: [
        {
          type: "web_search_call",
          call_id: "ws_123",
          action: "search",
          status: "completed",
        },
        {
          type: "message",
          role: "assistant",
          content: [{ text: "Search results" }],
          status: "completed",
        },
      ],
      usage: { input_tokens: 10, output_tokens: 20 },
    });
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create(
      { input: "Search the web" },
      { body: { agent: { name: "WebAgent", type: "agent_reference" } } },
    );

    const span = getSpanByName("invoke_agent WebAgent")!;
    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);
    // Tool calls first, then text message
    assert.equal(outputMsg[0].parts[0].type, "tool_call");
    assert.equal(outputMsg[0].parts[0].content.type, "web_search_call");
    assert.equal(outputMsg[0].parts[0].content.id, "ws_123");
    assert.equal(outputMsg[0].parts[0].content.action, "search");
    // Text message second
    assert.equal(outputMsg[1].role, "assistant");
    assert.equal(outputMsg[1].parts[0].type, "text");
  });

  // ---- Streaming ----

  it("creates span for streaming responses", async () => {
    enableContentRecording();
    const events = [
      { type: "response.output_text.delta", delta: "Test" },
      { type: "response.output_text.delta", delta: " response" },
      {
        type: "response.completed",
        response: createMockNonStreamingResponse(),
      },
    ];
    const mockClient = createMockStreamingOpenAIClient(events);
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const stream = await mockClient.responses.create({
      model: "gpt-4.1",
      input: "Count to 3",
      stream: true,
    });

    // Consume the stream
    for await (const _event of stream as AsyncIterable<unknown>) {
      // consume
    }

    const span = getSpanByName("chat gpt-4.1");
    assert.isDefined(span, "Expected a span named 'chat gpt-4.1'");
    assert.equal(span!.attributes[GEN_AI_RESPONSE_MODEL], "gpt-4.1");
    assert.equal(span!.attributes[GEN_AI_RESPONSE_ID], "resp_test123");
    assert.equal(span!.attributes[GEN_AI_USAGE_INPUT_TOKENS], 10);
    assert.equal(span!.attributes[GEN_AI_USAGE_OUTPUT_TOKENS], 20);
  });

  it("creates invoke_agent span for streaming agent calls", async () => {
    enableContentRecording();
    const events = [
      { type: "response.output_text.delta", delta: "Hi" },
      {
        type: "response.completed",
        response: createMockNonStreamingResponse(),
      },
    ];
    const mockClient = createMockStreamingOpenAIClient(events);
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const stream = await mockClient.responses.create(
      { input: "Hello", stream: true },
      { body: { agent: { name: "StreamAgent", type: "agent_reference" } } },
    );

    for await (const _event of stream as AsyncIterable<unknown>) {
      // consume
    }

    const span = getSpanByName("invoke_agent StreamAgent");
    assert.isDefined(span, "Expected a span named 'invoke_agent StreamAgent'");
    assert.equal(span!.attributes[GEN_AI_OPERATION_NAME], OperationName.INVOKE_AGENT);
    assert.equal(span!.attributes[GEN_AI_AGENT_NAME], "StreamAgent");
  });

  // ---- Error handling ----

  it("sets error attributes when call fails", async () => {
    enableContentRecording();
    const mockClient = {
      responses: {
        create: async () => {
          throw new TypeError("API failure");
        },
      },
    };
    overwriteOpenAIClient(mockClient as any, "https://test.azure.com");

    try {
      await mockClient.responses.create({
        model: "gpt-4.1",
        input: "Will fail",
      } as any);
    } catch {
      // expected
    }

    const span = getSpanByName("chat gpt-4.1");
    assert.isDefined(span, "Expected a span even on error");
    assert.equal(span!.attributes[ERROR_TYPE], "TypeError");
  });

  // ---- Tracing disabled ----

  it("does not create spans when tracing is disabled", async () => {
    disableGenAITracing();
    delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;

    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: "Hello",
    });

    assert.lengthOf(recordedSpans, 0, "No spans should be created when tracing is disabled");
  });
});
