// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach, vi } from "vitest";
import { overwriteOpenAIClient } from "../../../src/overwriteOpenAIClient.js";
import { enableGenAITracing, disableGenAITracing } from "../../../src/tracing/configuration.js";
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
  GEN_AI_REQUEST_MODEL,
  GEN_AI_REQUEST_TEMPERATURE,
  GEN_AI_REQUEST_TOP_P,
  GEN_AI_WORKFLOW_ACTION_EVENT,
  GEN_AI_EVENT_CONTENT,
  ERROR_TYPE,
  OperationName,
} from "../../../src/tracing/constants.js";

// ---- Span recorder via vi.mock ----
// Using vi.mock ensures all importers of tracingClient (including production
// code resolved through Vite's dependency pre-bundling) get the same mock,
// avoiding flaky failures from module identity mismatches.

interface RecordedEvent {
  name: string;
  options?: { attributes?: Record<string, unknown> };
}

interface RecordedSpan {
  name: string;
  attributes: Record<string, unknown>;
  events: RecordedEvent[];
  statusInfo?: { status: string; error?: unknown };
  ended: boolean;
  setAttribute(key: string, value: unknown): void;
  setStatus(status: { status: string; error?: unknown }): void;
  end(): void;
  addEvent(name: string, options?: { attributes?: Record<string, unknown> }): void;
}

function createMockSpan(name: string): RecordedSpan {
  const span: RecordedSpan = {
    name,
    attributes: {},
    events: [],
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
    addEvent(eventName: string, options?: { attributes?: Record<string, unknown> }) {
      span.events.push({ name: eventName, options });
    },
  };
  return span;
}

let recordedSpans: RecordedSpan[] = [];

vi.mock("../../../src/tracing/tracingClient.js", () => ({
  tracingClient: {
    withSpan: async (
      name: string,
      options: unknown,
      callback: (...args: any[]) => any,
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
    },
    startSpan: (name: string, _options: unknown) => {
      const span = createMockSpan(name);
      recordedSpans.push(span);
      return { span, tracingContext: {} };
    },
  },
}))

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
  enableGenAITracing({ experimental: true, contentRecording: true });
}

function disableContentRecording(): void {
  enableGenAITracing({ experimental: true, contentRecording: false });
}

// ---- Tests ----

describe("overwriteOpenAIClient - tracing integration", () => {
  beforeEach(() => {
    savedContentEnv = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    savedTracingEnv = process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    recordedSpans = [];
    // { experimental: true } enables tracing without requiring the env var.
    enableGenAITracing({ experimental: true });
  });

  afterEach(() => {
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
        create: async (_body?: any) => {
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

  // ---- Agent detection via agent_reference ----

  it("detects agent via body.agent_reference", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create(
      { input: "Hello" },
      { body: { agent_reference: { name: "RefAgent", type: "agent_reference" } } },
    );

    const span = getSpanByName("invoke_agent RefAgent");
    assert.isDefined(span, "Expected a span named 'invoke_agent RefAgent'");
    assert.equal(span!.attributes[GEN_AI_OPERATION_NAME], OperationName.INVOKE_AGENT);
    assert.equal(span!.attributes[GEN_AI_AGENT_NAME], "RefAgent");
  });

  // ---- Conversation tracing ----

  it("creates create_conversation span when conversations.create is called", async () => {
    enableContentRecording();
    const mockConversation = { id: "conv_abc123" };
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    (mockClient as any).conversations = {
      create: async () => mockConversation,
    };
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const result = await (mockClient as any).conversations.create({}) as Record<string, unknown>;

    assert.equal(result.id, "conv_abc123");
    const span = getSpanByName(OperationName.CREATE_CONVERSATION);
    assert.isDefined(span, "Expected a create_conversation span");
    assert.equal(span!.attributes[GEN_AI_OPERATION_NAME], OperationName.CREATE_CONVERSATION);
    assert.equal(span!.attributes[GEN_AI_CONVERSATION_ID], "conv_abc123");
    assert.equal(span!.attributes[AZ_NAMESPACE], AZ_NAMESPACE_VALUE);
    assert.equal(span!.attributes[GEN_AI_PROVIDER_NAME], AGENTS_PROVIDER);
  });

  // ---- Workflow action events (non-streaming) ----

  it("emits workflow action events for non-streaming response with content ON", async () => {
    enableContentRecording();
    const mockClient = createMockOpenAIClient({
      id: "resp_wf1",
      model: "gpt-4.1",
      status: "completed",
      output: [
        {
          type: "workflow_action",
          action_id: "action_1",
          previous_action_id: null,
          status: "completed",
        },
        {
          type: "workflow_action",
          action_id: "action_2",
          previous_action_id: "action_1",
          status: "completed",
        },
        {
          type: "message",
          role: "assistant",
          content: [{ text: "Done" }],
          status: "completed",
        },
      ],
      usage: { input_tokens: 10, output_tokens: 20 },
    });
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create(
      { input: "Start workflow" },
      { body: { agent: { name: "WorkflowAgent", type: "agent_reference" } } },
    );

    const span = getSpanByName("invoke_agent WorkflowAgent")!;
    assert.isDefined(span);

    const actionEvents = span.events.filter((e) => e.name === GEN_AI_WORKFLOW_ACTION_EVENT);
    assert.lengthOf(actionEvents, 2, "should have 2 workflow action events");

    const event1Content = JSON.parse(
      actionEvents[0]!.options!.attributes![GEN_AI_EVENT_CONTENT] as string,
    );
    assert.equal(event1Content[0].parts[0].content.status, "completed");
    assert.equal(event1Content[0].parts[0].content.action_id, "action_1");

    const event2Content = JSON.parse(
      actionEvents[1]!.options!.attributes![GEN_AI_EVENT_CONTENT] as string,
    );
    assert.equal(event2Content[0].parts[0].content.action_id, "action_2");
    assert.equal(event2Content[0].parts[0].content.previous_action_id, "action_1");
  });

  it("workflow action events: strips action_id/previous_action_id when content OFF (privacy)", async () => {
    disableContentRecording();
    const mockClient = createMockOpenAIClient({
      id: "resp_wf2",
      model: "gpt-4.1",
      status: "completed",
      output: [
        {
          type: "workflow_action",
          action_id: "action_1",
          previous_action_id: null,
          status: "completed",
        },
      ],
      usage: { input_tokens: 10, output_tokens: 20 },
    });
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create(
      { input: "Start workflow" },
      { body: { agent: { name: "WorkflowAgent", type: "agent_reference" } } },
    );

    const span = getSpanByName("invoke_agent WorkflowAgent")!;
    const actionEvents = span.events.filter((e) => e.name === GEN_AI_WORKFLOW_ACTION_EVENT);
    assert.lengthOf(actionEvents, 1);

    const eventContent = JSON.parse(
      actionEvents[0]!.options!.attributes![GEN_AI_EVENT_CONTENT] as string,
    );
    assert.equal(eventContent[0].parts[0].content.status, "completed");
    assert.notProperty(
      eventContent[0].parts[0].content,
      "action_id",
      "action_id must not leak when content recording is off",
    );
    assert.notProperty(
      eventContent[0].parts[0].content,
      "previous_action_id",
      "previous_action_id must not leak when content recording is off",
    );
  });

  // ---- Workflow action events (streaming) ----

  it("emits workflow action events for streaming response with content ON", async () => {
    enableContentRecording();
    const events = [
      {
        type: "response.output_item.done",
        item: {
          type: "workflow_action",
          action_id: "action_s1",
          previous_action_id: null,
          status: "completed",
        },
      },
      {
        type: "response.output_item.done",
        item: {
          type: "workflow_action",
          action_id: "action_s2",
          previous_action_id: "action_s1",
          status: "completed",
        },
      },
      {
        type: "response.completed",
        response: createMockNonStreamingResponse(),
      },
    ];
    const mockClient = createMockStreamingOpenAIClient(events);
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const stream = await mockClient.responses.create(
      { input: "Start workflow", stream: true },
      { body: { agent: { name: "StreamWF", type: "agent_reference" } } },
    );

    for await (const _event of stream as AsyncIterable<unknown>) {
      // consume
    }

    const span = getSpanByName("invoke_agent StreamWF")!;
    assert.isDefined(span);

    const actionEvents = span.events.filter((e) => e.name === GEN_AI_WORKFLOW_ACTION_EVENT);
    assert.lengthOf(actionEvents, 2, "should have 2 workflow action events from stream");

    const event1Content = JSON.parse(
      actionEvents[0]!.options!.attributes![GEN_AI_EVENT_CONTENT] as string,
    );
    assert.equal(event1Content[0].parts[0].content.action_id, "action_s1");
  });

  it("streaming workflow events: strips action_id when content OFF (privacy)", async () => {
    disableContentRecording();
    const events = [
      {
        type: "response.output_item.done",
        item: {
          type: "workflow_action",
          action_id: "action_s1",
          status: "completed",
        },
      },
      {
        type: "response.completed",
        response: createMockNonStreamingResponse(),
      },
    ];
    const mockClient = createMockStreamingOpenAIClient(events);
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const stream = await mockClient.responses.create(
      { input: "Start workflow", stream: true },
      { body: { agent: { name: "StreamWF", type: "agent_reference" } } },
    );

    for await (const _event of stream as AsyncIterable<unknown>) {
      // consume
    }

    const span = getSpanByName("invoke_agent StreamWF")!;
    const actionEvents = span.events.filter((e) => e.name === GEN_AI_WORKFLOW_ACTION_EVENT);
    assert.lengthOf(actionEvents, 1);

    const eventContent = JSON.parse(
      actionEvents[0]!.options!.attributes![GEN_AI_EVENT_CONTENT] as string,
    );
    assert.equal(eventContent[0].parts[0].content.status, "completed");
    assert.notProperty(eventContent[0].parts[0].content, "action_id");
  });

  // ---- Streaming with content OFF (comprehensive privacy) ----

  it("streaming: no user content in span when content recording OFF", async () => {
    disableContentRecording();
    const events = [
      { type: "response.output_text.delta", delta: "Secret response" },
      {
        type: "response.completed",
        response: {
          ...createMockNonStreamingResponse(),
          output: [
            {
              type: "message",
              role: "assistant",
              content: [{ text: "Secret response" }],
              status: "completed",
            },
          ],
        },
      },
    ];
    const mockClient = createMockStreamingOpenAIClient(events);
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const stream = await mockClient.responses.create({
      model: "gpt-4.1",
      input: "Secret question",
      stream: true,
      instructions: "Secret system prompt",
      temperature: 0.7,
      top_p: 0.9,
    });

    for await (const _event of stream as AsyncIterable<unknown>) {
      // consume
    }

    const span = getSpanByName("chat gpt-4.1")!;
    assert.isDefined(span);

    // Input messages: structure only, no content
    const inputMsg = JSON.parse(span.attributes[GEN_AI_INPUT_MESSAGES] as string);
    assert.equal(inputMsg[0].role, "user");
    assert.notProperty(inputMsg[0].parts[0], "content",
      "user input must not leak in streaming when content OFF");

    // Output messages: structure only, no content
    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);
    assert.notProperty(outputMsg[0].parts[0], "content",
      "assistant output must not leak in streaming when content OFF");

    // No system instructions
    assert.notProperty(span.attributes, GEN_AI_SYSTEM_MESSAGE,
      "system instructions must not appear when content OFF");

    // No model parameters
    assert.notProperty(span.attributes, GEN_AI_REQUEST_MODEL);
    assert.notProperty(span.attributes, GEN_AI_REQUEST_TEMPERATURE);
    assert.notProperty(span.attributes, GEN_AI_REQUEST_TOP_P);

    // Metadata attributes are still present
    assert.equal(span.attributes[GEN_AI_RESPONSE_MODEL], "gpt-4.1");
    assert.equal(span.attributes[GEN_AI_USAGE_INPUT_TOKENS], 10);
    assert.equal(span.attributes[GEN_AI_USAGE_OUTPUT_TOKENS], 20);
  });

  // ---- Non-streaming function call with content OFF (privacy) ----

  it("function_call output: only id visible when content OFF", async () => {
    disableContentRecording();
    const mockClient = createMockOpenAIClient(createMockFunctionCallResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: "What's the weather?",
      tools: [{ type: "function", name: "get_weather" }],
    });

    const span = getSpanByName("chat gpt-4.1")!;
    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);
    assert.equal(outputMsg[0].parts[0].type, "tool_call");
    assert.equal(outputMsg[0].parts[0].id, "call_abc");
    assert.notProperty(outputMsg[0].parts[0], "name",
      "function name must not leak when content OFF");
    assert.notProperty(outputMsg[0].parts[0], "arguments",
      "function arguments must not leak when content OFF");
  });

  it("function_call_output input: only id visible when content OFF", async () => {
    disableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: [
        { type: "function_call", call_id: "call_abc", name: "get_weather", arguments: "{}" },
        {
          type: "function_call_output",
          call_id: "call_abc",
          output: '{"temperature":"70°F","conditions":"sunny"}',
        },
      ],
    });

    const span = getSpanByName("chat gpt-4.1")!;
    const inputMsg = JSON.parse(span.attributes[GEN_AI_INPUT_MESSAGES] as string);
    assert.equal(inputMsg[0].parts[0].type, "tool_call_response");
    assert.equal(inputMsg[0].parts[0].id, "call_abc");
    assert.notProperty(inputMsg[0].parts[0], "result",
      "function output result must not leak when content OFF");
  });

  // ---- Non-function tool call with content OFF (privacy) ----

  it("web_search_call: only type and id visible when content OFF", async () => {
    disableContentRecording();
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
          content: [{ text: "Search results about sensitive topic" }],
          status: "completed",
        },
      ],
      usage: { input_tokens: 10, output_tokens: 20 },
    });
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create(
      { input: "Search for sensitive data" },
      { body: { agent: { name: "WebAgent", type: "agent_reference" } } },
    );

    const span = getSpanByName("invoke_agent WebAgent")!;
    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);

    // Tool call: type and id only
    assert.equal(outputMsg[0].parts[0].type, "tool_call");
    assert.equal(outputMsg[0].parts[0].content.type, "web_search_call");
    assert.equal(outputMsg[0].parts[0].content.id, "ws_123");
    assert.notProperty(outputMsg[0].parts[0].content, "action",
      "web search action must not leak when content OFF");
    assert.notProperty(outputMsg[0].parts[0].content, "status");

    // Message: no text content
    assert.notProperty(outputMsg[1].parts[0], "content",
      "assistant text must not leak when content OFF");
  });

  // ---- Non-streaming with multiple tool types + content OFF (comprehensive privacy) ----

  it("comprehensive privacy: no user content leaks from mixed tool call response", async () => {
    disableContentRecording();
    const mockClient = createMockOpenAIClient({
      id: "resp_multi",
      model: "gpt-4.1",
      status: "completed",
      output: [
        { type: "function_call", call_id: "fc_1", name: "secret_fn", arguments: '{"secret":"data"}' },
        { type: "code_interpreter_call", call_id: "ci_1", code: "import os; os.environ", status: "completed" },
        { type: "file_search_call", call_id: "fs_1", queries: ["password"], results: [{ text: "hunter2" }], status: "completed" },
        {
          type: "message",
          role: "assistant",
          content: [{ text: "Here is your sensitive data" }],
          status: "completed",
        },
      ],
      usage: { input_tokens: 10, output_tokens: 20 },
    });
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: "Give me sensitive information",
      instructions: "You have access to all secrets",
      temperature: 0.5,
    });

    const span = getSpanByName("chat gpt-4.1")!;

    // Serialize the entire span for a comprehensive check
    const allAttrValues = Object.values(span.attributes)
      .map((v) => String(v))
      .join(" ");

    // None of these user-specific strings should appear anywhere in span attributes
    assert.notInclude(allAttrValues, "secret_fn", "function name leaked");
    assert.notInclude(allAttrValues, '"secret":"data"', "function arguments leaked");
    assert.notInclude(allAttrValues, "import os", "code interpreter code leaked");
    assert.notInclude(allAttrValues, "password", "file search query leaked");
    assert.notInclude(allAttrValues, "hunter2", "file search result leaked");
    assert.notInclude(allAttrValues, "sensitive data", "assistant message leaked");
    assert.notInclude(allAttrValues, "sensitive information", "user input leaked");
    assert.notInclude(allAttrValues, "access to all secrets", "system instructions leaked");

    // Metadata is still present
    assert.equal(span.attributes[GEN_AI_RESPONSE_MODEL], "gpt-4.1");
    assert.equal(span.attributes[GEN_AI_RESPONSE_ID], "resp_multi");
  });

  // ---- Streaming with tool calls (content ON) ----

  it("streaming: captures function_call and web_search_call in output with content ON", async () => {
    enableContentRecording();
    const events = [
      { type: "response.output_text.delta", delta: "Looking up..." },
      {
        type: "response.completed",
        response: {
          id: "resp_stream_tools",
          model: "gpt-4.1",
          status: "completed",
          output: [
            {
              type: "function_call",
              call_id: "fc_s1",
              name: "get_weather",
              arguments: '{"city":"Seattle"}',
            },
            {
              type: "web_search_call",
              call_id: "ws_s1",
              action: "search",
              status: "completed",
            },
            {
              type: "message",
              role: "assistant",
              content: [{ text: "Here are the results" }],
              status: "completed",
            },
          ],
          usage: { input_tokens: 15, output_tokens: 30 },
        },
      },
    ];
    const mockClient = createMockStreamingOpenAIClient(events);
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const stream = await mockClient.responses.create(
      { input: "Weather and news", stream: true },
      { body: { agent: { name: "ToolAgent", type: "agent_reference" } } },
    );

    for await (const _event of stream as AsyncIterable<unknown>) {
      // consume
    }

    const span = getSpanByName("invoke_agent ToolAgent")!;
    assert.isDefined(span, "Expected a span for streaming tool call response");

    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);
    // Tool calls grouped first
    assert.equal(outputMsg[0].role, "assistant");
    assert.equal(outputMsg[0].parts[0].type, "tool_call");
    assert.equal(outputMsg[0].parts[0].id, "fc_s1");
    assert.equal(outputMsg[0].parts[0].name, "get_weather");
    assert.equal(outputMsg[0].parts[1].type, "tool_call");
    assert.equal(outputMsg[0].parts[1].content.type, "web_search_call");
    assert.equal(outputMsg[0].parts[1].content.action, "search");
    // Then text message
    assert.equal(outputMsg[1].parts[0].content, "Here are the results");
  });

  // ---- Streaming with tool calls (content OFF) ----

  it("streaming: tool call details stripped when content OFF", async () => {
    disableContentRecording();
    const events = [
      {
        type: "response.completed",
        response: {
          id: "resp_stream_tools_off",
          model: "gpt-4.1",
          status: "completed",
          output: [
            {
              type: "function_call",
              call_id: "fc_s2",
              name: "secret_function",
              arguments: '{"secret":"payload"}',
            },
            {
              type: "code_interpreter_call",
              call_id: "ci_s1",
              code: "import secrets; secrets.token_hex()",
              outputs: [{ type: "logs", data: "abc123" }],
              status: "completed",
            },
            {
              type: "message",
              role: "assistant",
              content: [{ text: "Secret answer" }],
              status: "completed",
            },
          ],
          usage: { input_tokens: 10, output_tokens: 20 },
        },
      },
    ];
    const mockClient = createMockStreamingOpenAIClient(events);
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const stream = await mockClient.responses.create({
      model: "gpt-4.1",
      input: "Secret streaming question",
      stream: true,
    });

    for await (const _event of stream as AsyncIterable<unknown>) {
      // consume
    }

    const span = getSpanByName("chat gpt-4.1")!;
    assert.isDefined(span, "Expected a span for streaming tool call with content OFF");

    // Serialize all attributes for a sweep check
    const allValues = Object.values(span.attributes).map((v) => String(v)).join(" ");
    assert.notInclude(allValues, "secret_function", "function name leaked in stream");
    assert.notInclude(allValues, "secret", "function arguments leaked in stream");
    assert.notInclude(allValues, "import secrets", "code interpreter code leaked in stream");
    assert.notInclude(allValues, "abc123", "code interpreter output leaked in stream");
    assert.notInclude(allValues, "Secret answer", "message content leaked in stream");

    // Tool call IDs and types are still present
    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);
    assert.equal(outputMsg[0].parts[0].type, "tool_call");
    assert.equal(outputMsg[0].parts[0].id, "fc_s2");
    assert.notProperty(outputMsg[0].parts[0], "name");
    assert.equal(outputMsg[0].parts[1].type, "tool_call");
    assert.equal(outputMsg[0].parts[1].content.type, "code_interpreter_call");
    assert.equal(outputMsg[0].parts[1].content.id, "ci_s1");
    assert.notProperty(outputMsg[0].parts[1].content, "code");
  });

  // ---- Streaming with function_call_output input + content OFF ----

  it("streaming: function_call_output input stripped when content OFF", async () => {
    disableContentRecording();
    const events = [
      {
        type: "response.completed",
        response: createMockNonStreamingResponse(),
      },
    ];
    const mockClient = createMockStreamingOpenAIClient(events);
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const stream = await mockClient.responses.create({
      model: "gpt-4.1",
      input: [
        { type: "function_call", call_id: "call_s1", name: "get_data", arguments: "{}" },
        {
          type: "function_call_output",
          call_id: "call_s1",
          output: '{"sensitive":"data"}',
        },
      ],
      stream: true,
    });

    for await (const _event of stream as AsyncIterable<unknown>) {
      // consume
    }

    const span = getSpanByName("chat gpt-4.1")!;
    assert.isDefined(span);

    const inputMsg = JSON.parse(span.attributes[GEN_AI_INPUT_MESSAGES] as string);
    assert.equal(inputMsg[0].parts[0].type, "tool_call_response");
    assert.equal(inputMsg[0].parts[0].id, "call_s1");
    assert.notProperty(inputMsg[0].parts[0], "result",
      "function output must not leak in streaming when content OFF");
  });

  // ---- Error handling with content OFF ----

  it("sets error attributes when call fails with content OFF", async () => {
    disableContentRecording();
    const mockClient = {
      responses: {
        create: async (_body?: any) => {
          throw new RangeError("API rate limit exceeded");
        },
      },
    };
    overwriteOpenAIClient(mockClient as any, "https://test.azure.com");

    try {
      await mockClient.responses.create({
        model: "gpt-4.1",
        input: "Secret question that should not leak",
        instructions: "Secret system prompt",
      } as any);
    } catch {
      // expected
    }

    const span = getSpanByName("chat gpt-4.1");
    assert.isDefined(span, "Expected a span even on error with content OFF");
    assert.equal(span!.attributes[ERROR_TYPE], "RangeError");

    // No user content should leak even on error
    const allValues = Object.values(span!.attributes).map((v) => String(v)).join(" ");
    assert.notInclude(allValues, "Secret question", "user input leaked on error");
    assert.notInclude(allValues, "Secret system prompt", "instructions leaked on error");
  });

  // ---- conversation.id with content OFF ----

  it("sets conversation.id when provided with content OFF", async () => {
    disableContentRecording();
    const mockClient = createMockOpenAIClient(createMockNonStreamingResponse());
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create(
      { input: "Hello", conversation: "conv_private" },
      { body: { agent: { name: "MyAgent", type: "agent_reference" } } },
    );

    const span = getSpanByName("invoke_agent MyAgent")!;
    assert.isDefined(span);
    assert.equal(span.attributes[GEN_AI_CONVERSATION_ID], "conv_private");

    // But no message content
    const inputMsg = JSON.parse(span.attributes[GEN_AI_INPUT_MESSAGES] as string);
    assert.notProperty(inputMsg[0].parts[0], "content",
      "input content must not leak when content OFF");
  });

  // ---- Streaming with mixed tool types + comprehensive privacy ----

  it("streaming comprehensive privacy: no user content leaks from mixed tool response", async () => {
    disableContentRecording();
    const events = [
      {
        type: "response.completed",
        response: {
          id: "resp_stream_multi",
          model: "gpt-4.1",
          status: "completed",
          output: [
            { type: "function_call", call_id: "fc_m1", name: "private_fn", arguments: '{"api_key":"sk-123"}' },
            { type: "mcp_call", call_id: "mcp_m1", name: "db_query", arguments: '{"sql":"SELECT * FROM users"}', server_label: "prod-db", status: "completed" },
            { type: "file_search_call", call_id: "fs_m1", queries: ["SSN"], results: [{ text: "123-45-6789" }], status: "completed" },
            { type: "image_generation_call", call_id: "ig_m1", prompt: "user's face photo", quality: "hd", result: "base64data", status: "completed" },
            {
              type: "message",
              role: "assistant",
              content: [{ text: "Here is all the private data you requested" }],
              status: "completed",
            },
          ],
          usage: { input_tokens: 50, output_tokens: 100 },
        },
      },
    ];
    const mockClient = createMockStreamingOpenAIClient(events);
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    const stream = await mockClient.responses.create({
      model: "gpt-4.1",
      input: "Give me all private data",
      instructions: "You have full database access",
      stream: true,
    });

    for await (const _event of stream as AsyncIterable<unknown>) {
      // consume
    }

    const span = getSpanByName("chat gpt-4.1")!;
    assert.isDefined(span);

    const allValues = Object.values(span.attributes).map((v) => String(v)).join(" ");

    // No user-specific content should appear
    assert.notInclude(allValues, "private_fn", "function name leaked");
    assert.notInclude(allValues, "sk-123", "API key leaked");
    assert.notInclude(allValues, "db_query", "MCP tool name leaked");
    assert.notInclude(allValues, "SELECT", "SQL query leaked");
    assert.notInclude(allValues, "prod-db", "server label leaked");
    assert.notInclude(allValues, "SSN", "file search query leaked");
    assert.notInclude(allValues, "123-45-6789", "SSN result leaked");
    assert.notInclude(allValues, "user's face", "image prompt leaked");
    assert.notInclude(allValues, "base64data", "image result leaked");
    assert.notInclude(allValues, "private data you requested", "message content leaked");
    assert.notInclude(allValues, "Give me all private data", "user input leaked");
    assert.notInclude(allValues, "full database access", "system instructions leaked");

    // Safe metadata is still present
    assert.equal(span.attributes[GEN_AI_RESPONSE_MODEL], "gpt-4.1");
    assert.equal(span.attributes[GEN_AI_RESPONSE_ID], "resp_stream_multi");
    assert.equal(span.attributes[GEN_AI_USAGE_INPUT_TOKENS], 50);
    assert.equal(span.attributes[GEN_AI_USAGE_OUTPUT_TOKENS], 100);
  });

  // ---- Unknown tool type: no data leaked when content OFF ----

  it("unknown tool types: no user data leaked with content OFF", async () => {
    disableContentRecording();
    const mockClient = createMockOpenAIClient({
      id: "resp_unknown",
      model: "gpt-4.1",
      status: "completed",
      output: [
        {
          type: "unsupported_test_call",
          call_id: "ut_1",
          name: "unsupported_op",
          arguments: '{"key":"secret_state"}',
          input: "private_input_data",
          output: "private_result",
          server_label: "test-server",
          status: "completed",
        },
        {
          type: "message",
          role: "assistant",
          content: [{ text: "Unsupported result" }],
          status: "completed",
        },
      ],
      usage: { input_tokens: 5, output_tokens: 10 },
    });
    overwriteOpenAIClient(mockClient, "https://test.azure.com");

    await mockClient.responses.create({
      model: "gpt-4.1",
      input: [
        {
          type: "unsupported_test_call_output",
          call_id: "ut_prev",
          output: "secret_tool_output",
          result: "secret_tool_result",
        },
      ],
    });

    const span = getSpanByName("chat gpt-4.1")!;
    assert.isDefined(span);

    const allValues = Object.values(span.attributes).map((v) => String(v)).join(" ");

    // Output side: no sensitive details from unknown tool
    assert.notInclude(allValues, "unsupported_op", "unknown tool name leaked in output");
    assert.notInclude(allValues, "secret_state", "unknown tool arguments leaked in output");
    assert.notInclude(allValues, "private_input_data", "unknown tool input leaked in output");
    assert.notInclude(allValues, "private_result", "unknown tool output leaked in output");
    assert.notInclude(allValues, "test-server", "unknown tool server_label leaked in output");
    assert.notInclude(allValues, "Unsupported result", "message content leaked");

    // Input side: no sensitive details from unknown tool output
    assert.notInclude(allValues, "secret_tool_output", "unknown tool output leaked in input");
    assert.notInclude(allValues, "secret_tool_result", "unknown tool result leaked in input");

    // Safe metadata is still present
    const outputMsg = JSON.parse(span.attributes[GEN_AI_OUTPUT_MESSAGES] as string);
    assert.equal(outputMsg[0].parts[0].type, "tool_call");
    assert.equal(outputMsg[0].parts[0].content.type, "unsupported_test_call");
    assert.equal(outputMsg[0].parts[0].content.id, "ut_1");

    const inputMsg = JSON.parse(span.attributes[GEN_AI_INPUT_MESSAGES] as string);
    assert.equal(inputMsg[0].parts[0].content.type, "unsupported_test_call_output");
    assert.equal(inputMsg[0].parts[0].content.id, "ut_prev");
  });
});
