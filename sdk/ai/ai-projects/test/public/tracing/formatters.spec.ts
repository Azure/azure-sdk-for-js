// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { formatInputMessages, formatOutputMessages } from "../../../src/tracing/formatters.js";

// Save and restore env vars around each test
let savedContentEnv: string | undefined;

function enableContentRecording(): void {
  process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "true";
}

function disableContentRecording(): void {
  process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "false";
}

describe("formatInputMessages", () => {
  beforeEach(() => {
    savedContentEnv = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
  });

  afterEach(() => {
    if (savedContentEnv === undefined) {
      delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    } else {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = savedContentEnv;
    }
  });

  it("returns undefined for null/undefined body", () => {
    assert.isUndefined(formatInputMessages(null as any));
    assert.isUndefined(formatInputMessages(undefined as any));
  });

  it("returns undefined when input is missing and no conversation", () => {
    assert.isUndefined(formatInputMessages({}));
  });

  // --- String input ---

  it("formats string input with content recording enabled", () => {
    enableContentRecording();
    const result = formatInputMessages({ input: "Hello world" });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].role, "user");
    assert.lengthOf(parsed[0].parts, 1);
    assert.equal(parsed[0].parts[0].type, "text");
    assert.equal(parsed[0].parts[0].content, "Hello world");
  });

  it("formats string input with content recording disabled", () => {
    disableContentRecording();
    const result = formatInputMessages({ input: "Hello world" });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].role, "user");
    assert.lengthOf(parsed[0].parts, 1);
    assert.equal(parsed[0].parts[0].type, "text");
    assert.notProperty(parsed[0].parts[0], "content");
  });

  // --- Conversation-only input ---

  it("formats conversation-only input (no input field)", () => {
    disableContentRecording();
    const result = formatInputMessages({ conversation: "conv_123" });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].role, "user");
    assert.deepEqual(parsed[0].parts, [{ type: "text" }]);
  });

  // --- Array input: regular items ---

  it("formats array of string items with content enabled", () => {
    enableContentRecording();
    const result = formatInputMessages({ input: ["one", "two"] });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 2);
    assert.equal(parsed[0].parts[0].content, "one");
    assert.equal(parsed[1].parts[0].content, "two");
  });

  // --- Array input: function_call_output ---

  it("formats function_call_output as tool_call_response with content enabled", () => {
    enableContentRecording();
    const result = formatInputMessages({
      input: [
        {
          type: "function_call_output",
          call_id: "call_abc",
          output: '{"temperature":"70°F"}',
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].role, "tool");
    assert.lengthOf(parsed[0].parts, 1);
    assert.equal(parsed[0].parts[0].type, "tool_call_response");
    assert.equal(parsed[0].parts[0].id, "call_abc");
    assert.deepEqual(parsed[0].parts[0].result, { temperature: "70°F" });
  });

  it("formats function_call_output without content when recording disabled", () => {
    disableContentRecording();
    const result = formatInputMessages({
      input: [
        {
          type: "function_call_output",
          call_id: "call_abc",
          output: '{"temperature":"70°F"}',
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].role, "tool");
    assert.equal(parsed[0].parts[0].type, "tool_call_response");
    assert.equal(parsed[0].parts[0].id, "call_abc");
    assert.notProperty(parsed[0].parts[0], "result");
  });

  // --- Array input: multiple tool outputs grouped ---

  it("groups multiple function_call_outputs under one tool message", () => {
    enableContentRecording();
    const result = formatInputMessages({
      input: [
        { type: "function_call_output", call_id: "call_1", output: '"result1"' },
        { type: "function_call_output", call_id: "call_2", output: '"result2"' },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1, "should be grouped into one message");
    assert.equal(parsed[0].role, "tool");
    assert.lengthOf(parsed[0].parts, 2);
    assert.equal(parsed[0].parts[0].id, "call_1");
    assert.equal(parsed[0].parts[1].id, "call_2");
  });

  // --- Array input: non-function *_output types ---

  it("formats computer_call_output as nested tool_call_output", () => {
    enableContentRecording();
    const result = formatInputMessages({
      input: [
        {
          type: "computer_call_output",
          call_id: "call_comp",
          output: { type: "screenshot", image_url: "data:...", status: "done" },
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].role, "tool");
    assert.equal(parsed[0].parts[0].type, "tool_call_output");
    assert.equal(parsed[0].parts[0].content.type, "computer_call_output");
    assert.equal(parsed[0].parts[0].content.id, "call_comp");
    // image_url should be stripped from computer_call_output
    assert.notProperty(parsed[0].parts[0].content.output, "image_url");
  });

  it("formats non-function output without content when recording disabled", () => {
    disableContentRecording();
    const result = formatInputMessages({
      input: [
        {
          type: "computer_call_output",
          call_id: "call_comp",
          output: { type: "screenshot", image_url: "data:..." },
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].type, "tool_call_output");
    assert.equal(parsed[0].parts[0].content.type, "computer_call_output");
    assert.equal(parsed[0].parts[0].content.id, "call_comp");
    // No output details when content recording is off
    assert.notProperty(parsed[0].parts[0].content, "output");
  });

  // --- Skipped items ---

  it("skips function_call and message items in input", () => {
    enableContentRecording();
    const result = formatInputMessages({
      input: [
        { type: "function_call", call_id: "call_1", name: "get_weather", arguments: "{}" },
        { type: "message", role: "assistant", content: "hi" },
        { type: "function_call_output", call_id: "call_1", output: '"result"' },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1, "function_call and message should be skipped");
    assert.equal(parsed[0].role, "tool");
    assert.equal(parsed[0].parts[0].type, "tool_call_response");
  });
});

describe("formatOutputMessages", () => {
  beforeEach(() => {
    savedContentEnv = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
  });

  afterEach(() => {
    if (savedContentEnv === undefined) {
      delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    } else {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = savedContentEnv;
    }
  });

  it("returns undefined for null/undefined response", () => {
    assert.isUndefined(formatOutputMessages(null as any));
    assert.isUndefined(formatOutputMessages(undefined as any));
  });

  it("returns undefined when output is not an array", () => {
    assert.isUndefined(formatOutputMessages({ output: "not an array" }));
    assert.isUndefined(formatOutputMessages({}));
  });

  // --- Message output ---

  it("formats message output with content enabled", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "message",
          role: "assistant",
          content: [{ text: "Hello!" }],
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].role, "assistant");
    assert.equal(parsed[0].parts[0].type, "text");
    assert.equal(parsed[0].parts[0].content, "Hello!");
    assert.equal(parsed[0].finish_reason, "completed");
  });

  it("formats message output without content when recording disabled", () => {
    disableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "message",
          role: "assistant",
          content: [{ text: "Hello!" }],
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].parts[0].type, "text");
    assert.notProperty(parsed[0].parts[0], "content");
    assert.equal(parsed[0].finish_reason, "completed");
  });

  // --- function_call output (simple format) ---

  it("formats function_call output with content enabled", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "function_call",
          call_id: "call_abc",
          name: "get_weather",
          arguments: '{"location":"Seattle"}',
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].role, "assistant");
    assert.lengthOf(parsed[0].parts, 1);
    assert.equal(parsed[0].parts[0].type, "tool_call");
    assert.equal(parsed[0].parts[0].id, "call_abc");
    assert.equal(parsed[0].parts[0].name, "get_weather");
    assert.equal(parsed[0].parts[0].arguments, '{"location":"Seattle"}');
  });

  it("formats function_call output without content when recording disabled", () => {
    disableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "function_call",
          call_id: "call_abc",
          name: "get_weather",
          arguments: '{"location":"Seattle"}',
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].type, "tool_call");
    assert.equal(parsed[0].parts[0].id, "call_abc");
    assert.notProperty(parsed[0].parts[0], "name");
    assert.notProperty(parsed[0].parts[0], "arguments");
  });

  // --- Non-function tool call output (nested format) ---

  it("formats web_search_call output with nested content", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "web_search_call",
          call_id: "ws_123",
          action: "search",
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].role, "assistant");
    assert.equal(parsed[0].parts[0].type, "tool_call");
    assert.equal(parsed[0].parts[0].content.type, "web_search_call");
    assert.equal(parsed[0].parts[0].content.id, "ws_123");
    assert.equal(parsed[0].parts[0].content.action, "search");
    assert.equal(parsed[0].parts[0].content.status, "completed");
  });

  it("formats web_search_call without details when content recording disabled", () => {
    disableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "web_search_call",
          call_id: "ws_123",
          action: "search",
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].type, "tool_call");
    assert.equal(parsed[0].parts[0].content.type, "web_search_call");
    assert.equal(parsed[0].parts[0].content.id, "ws_123");
    // No action/status when content recording is off
    assert.notProperty(parsed[0].parts[0].content, "action");
    assert.notProperty(parsed[0].parts[0].content, "status");
  });

  it("formats code_interpreter_call output with nested content", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "code_interpreter_call",
          call_id: "ci_456",
          code: "print(42)",
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].content.type, "code_interpreter_call");
    assert.equal(parsed[0].parts[0].content.code, "print(42)");
    assert.equal(parsed[0].parts[0].content.status, "completed");
  });

  it("formats file_search_call output with nested content", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "file_search_call",
          call_id: "fs_789",
          queries: ["What is the price?"],
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].content.type, "file_search_call");
    assert.deepEqual(parsed[0].parts[0].content.queries, ["What is the price?"]);
  });

  it("formats mcp_call output with nested content", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "mcp_call",
          call_id: "mcp_1",
          name: "list_tools",
          arguments: "{}",
          server_label: "api-specs",
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].content.type, "mcp_call");
    assert.equal(parsed[0].parts[0].content.name, "list_tools");
    assert.equal(parsed[0].parts[0].content.server_label, "api-specs");
  });

  // --- Grouping: tool calls grouped into single assistant message ---

  it("groups multiple tool calls into one assistant message", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        { type: "function_call", call_id: "c1", name: "fn1", arguments: "{}" },
        { type: "function_call", call_id: "c2", name: "fn2", arguments: "{}" },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1, "should be grouped into one message");
    assert.equal(parsed[0].role, "assistant");
    assert.lengthOf(parsed[0].parts, 2);
    assert.equal(parsed[0].parts[0].id, "c1");
    assert.equal(parsed[0].parts[1].id, "c2");
  });

  it("groups mixed function_call and non-function tool calls into one message", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        { type: "function_call", call_id: "c1", name: "fn1", arguments: "{}" },
        { type: "web_search_call", call_id: "ws1", action: "search", status: "completed" },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1, "all tool calls grouped into one assistant message");
    assert.lengthOf(parsed[0].parts, 2);
    assert.equal(parsed[0].parts[0].type, "tool_call");
    assert.equal(parsed[0].parts[0].id, "c1");
    assert.equal(parsed[0].parts[1].type, "tool_call");
    assert.equal(parsed[0].parts[1].content.type, "web_search_call");
  });

  // --- Tool calls ordered before text messages ---

  it("orders tool calls before text messages", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "message",
          role: "assistant",
          content: [{ text: "Here's the result" }],
          status: "completed",
        },
        { type: "function_call", call_id: "c1", name: "fn1", arguments: "{}" },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 2);
    // Tool calls first
    assert.equal(parsed[0].role, "assistant");
    assert.equal(parsed[0].parts[0].type, "tool_call");
    // Then text message
    assert.equal(parsed[1].role, "assistant");
    assert.equal(parsed[1].parts[0].type, "text");
    assert.property(parsed[1], "finish_reason");
  });

  // --- Unrecognized items are skipped ---

  it("skips unrecognized output item types", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        { type: "unknown_type", data: "something" },
        {
          type: "message",
          role: "assistant",
          content: [{ text: "Hi" }],
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].parts[0].content, "Hi");
  });
});
