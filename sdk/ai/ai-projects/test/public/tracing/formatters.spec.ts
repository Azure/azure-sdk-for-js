// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  formatInputMessages as _formatInputMessages,
  formatOutputMessages as _formatOutputMessages,
} from "../../../src/tracing/formatters.js";

// Track content recording state for tests
let _contentRecording = false;

function enableContentRecording(): void {
  _contentRecording = true;
}

function disableContentRecording(): void {
  _contentRecording = false;
}

// Wrappers that pass the current content recording state
function formatInputMessages(body: Record<string, unknown>): string | undefined {
  return _formatInputMessages(body, _contentRecording);
}

function formatOutputMessages(response: Record<string, unknown>): string | undefined {
  return _formatOutputMessages(response, _contentRecording);
}

describe("formatInputMessages", () => {
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

  // --- Content-OFF privacy tests for all non-function tool call types ---

  it("code_interpreter_call: strips code/outputs/status when content OFF", () => {
    disableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "code_interpreter_call",
          call_id: "ci_456",
          code: "print(42)",
          outputs: [{ type: "logs", data: "42" }],
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].type, "tool_call");
    assert.equal(parsed[0].parts[0].content.type, "code_interpreter_call");
    assert.equal(parsed[0].parts[0].content.id, "ci_456");
    assert.notProperty(parsed[0].parts[0].content, "code", "code is user-specific content");
    assert.notProperty(parsed[0].parts[0].content, "outputs", "outputs are user-specific content");
    assert.notProperty(parsed[0].parts[0].content, "status");
  });

  it("file_search_call: strips queries/results/status when content OFF", () => {
    disableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "file_search_call",
          call_id: "fs_789",
          queries: ["What is the price?"],
          results: [{ file_id: "file_1", text: "The price is $10" }],
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].content.type, "file_search_call");
    assert.equal(parsed[0].parts[0].content.id, "fs_789");
    assert.notProperty(parsed[0].parts[0].content, "queries", "queries are user-specific content");
    assert.notProperty(parsed[0].parts[0].content, "results", "results are user-specific content");
    assert.notProperty(parsed[0].parts[0].content, "status");
  });

  it("mcp_call: strips name/arguments/server_label/status when content OFF", () => {
    disableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "mcp_call",
          call_id: "mcp_1",
          name: "list_tools",
          arguments: '{"filter":"all"}',
          server_label: "api-specs",
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].content.type, "mcp_call");
    assert.equal(parsed[0].parts[0].content.id, "mcp_1");
    assert.notProperty(parsed[0].parts[0].content, "name", "tool name is content-gated");
    assert.notProperty(parsed[0].parts[0].content, "arguments", "arguments are user-specific");
    assert.notProperty(parsed[0].parts[0].content, "server_label");
    assert.notProperty(parsed[0].parts[0].content, "status");
  });

  it("image_generation_call: includes prompt/quality/size/style/status when ON, strips when OFF", () => {
    enableContentRecording();
    const resultOn = formatOutputMessages({
      output: [
        {
          type: "image_generation_call",
          call_id: "ig_1",
          prompt: "A sunset over mountains",
          quality: "hd",
          size: "1024x1024",
          style: "vivid",
          result: "data:image/png;base64,ABC",
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.prompt, "A sunset over mountains");
    assert.equal(parsedOn[0].parts[0].content.quality, "hd");
    assert.equal(parsedOn[0].parts[0].content.size, "1024x1024");
    assert.equal(parsedOn[0].parts[0].content.style, "vivid");
    assert.notProperty(
      parsedOn[0].parts[0].content,
      "result",
      "binary result excluded even when ON",
    );

    disableContentRecording();
    const resultOff = formatOutputMessages({
      output: [
        {
          type: "image_generation_call",
          call_id: "ig_1",
          prompt: "A sunset over mountains",
          quality: "hd",
          size: "1024x1024",
          style: "vivid",
          result: "data:image/png;base64,ABC",
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "image_generation_call");
    assert.equal(parsedOff[0].parts[0].content.id, "ig_1");
    assert.notProperty(parsedOff[0].parts[0].content, "prompt");
    assert.notProperty(parsedOff[0].parts[0].content, "quality");
    assert.notProperty(parsedOff[0].parts[0].content, "size");
    assert.notProperty(parsedOff[0].parts[0].content, "style");
  });

  it("azure_ai_search_call: includes input/results/status when ON, strips when OFF", () => {
    enableContentRecording();
    const resultOn = formatOutputMessages({
      output: [
        {
          type: "azure_ai_search_call",
          call_id: "ais_1",
          input: "enterprise data query",
          results: [{ score: 0.95, content: "doc text" }],
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.input, "enterprise data query");
    assert.deepEqual(parsedOn[0].parts[0].content.results, [{ score: 0.95, content: "doc text" }]);

    disableContentRecording();
    const resultOff = formatOutputMessages({
      output: [
        {
          type: "azure_ai_search_call",
          call_id: "ais_1",
          input: "enterprise data query",
          results: [{ score: 0.95, content: "doc text" }],
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "azure_ai_search_call");
    assert.notProperty(parsedOff[0].parts[0].content, "input");
    assert.notProperty(parsedOff[0].parts[0].content, "results");
  });

  it("shell_call: includes command/output/status when ON, strips when OFF", () => {
    enableContentRecording();
    const resultOn = formatOutputMessages({
      output: [
        {
          type: "shell_call",
          call_id: "sh_1",
          command: "ls -la /home/user",
          output: "total 42\ndrwxr-xr-x ...",
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.command, "ls -la /home/user");
    assert.equal(parsedOn[0].parts[0].content.output, "total 42\ndrwxr-xr-x ...");

    disableContentRecording();
    const resultOff = formatOutputMessages({
      output: [
        {
          type: "shell_call",
          call_id: "sh_1",
          command: "ls -la /home/user",
          output: "total 42\ndrwxr-xr-x ...",
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "shell_call");
    assert.notProperty(parsedOff[0].parts[0].content, "command");
    assert.notProperty(parsedOff[0].parts[0].content, "output");
  });

  it("apply_patch_call: includes patch/status when ON, strips when OFF", () => {
    enableContentRecording();
    const resultOn = formatOutputMessages({
      output: [
        {
          type: "apply_patch_call",
          call_id: "ap_1",
          patch: "--- a/file.txt\n+++ b/file.txt\n@@ -1 +1 @@\n-old\n+new",
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.include(parsedOn[0].parts[0].content.patch, "--- a/file.txt");

    disableContentRecording();
    const resultOff = formatOutputMessages({
      output: [
        {
          type: "apply_patch_call",
          call_id: "ap_1",
          patch: "--- a/file.txt\n+++ b/file.txt\n@@ -1 +1 @@\n-old\n+new",
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "apply_patch_call");
    assert.notProperty(parsedOff[0].parts[0].content, "patch");
  });

  it("custom_tool_call: includes name/arguments/status when ON, strips when OFF", () => {
    enableContentRecording();
    const resultOn = formatOutputMessages({
      output: [
        {
          type: "custom_tool_call",
          call_id: "ct_1",
          name: "my_tool",
          arguments: '{"key":"value"}',
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.name, "my_tool");
    assert.equal(parsedOn[0].parts[0].content.arguments, '{"key":"value"}');

    disableContentRecording();
    const resultOff = formatOutputMessages({
      output: [
        {
          type: "custom_tool_call",
          call_id: "ct_1",
          name: "my_tool",
          arguments: '{"key":"value"}',
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.notProperty(parsedOff[0].parts[0].content, "name");
    assert.notProperty(parsedOff[0].parts[0].content, "arguments");
  });

  it("local_shell_call: includes command/output/status when ON, strips when OFF", () => {
    enableContentRecording();
    const resultOn = formatOutputMessages({
      output: [
        {
          type: "local_shell_call",
          call_id: "lsh_1",
          command: "cat /etc/passwd",
          output: "root:x:0:0:...",
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.type, "local_shell_call");
    assert.equal(parsedOn[0].parts[0].content.command, "cat /etc/passwd");
    assert.equal(parsedOn[0].parts[0].content.output, "root:x:0:0:...");
    assert.equal(parsedOn[0].parts[0].content.status, "completed");

    disableContentRecording();
    const resultOff = formatOutputMessages({
      output: [
        {
          type: "local_shell_call",
          call_id: "lsh_1",
          command: "cat /etc/passwd",
          output: "root:x:0:0:...",
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "local_shell_call");
    assert.equal(parsedOff[0].parts[0].content.id, "lsh_1");
    assert.notProperty(parsedOff[0].parts[0].content, "command");
    assert.notProperty(parsedOff[0].parts[0].content, "output");
    assert.notProperty(parsedOff[0].parts[0].content, "status");
  });

  it("computer_call: includes action/status when ON, strips when OFF", () => {
    enableContentRecording();
    const resultOn = formatOutputMessages({
      output: [
        {
          type: "computer_call",
          call_id: "comp_1",
          action: "click",
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.type, "computer_call");
    assert.equal(parsedOn[0].parts[0].content.action, "click");
    assert.equal(parsedOn[0].parts[0].content.status, "completed");

    disableContentRecording();
    const resultOff = formatOutputMessages({
      output: [
        {
          type: "computer_call",
          call_id: "comp_1",
          action: "click",
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "computer_call");
    assert.equal(parsedOff[0].parts[0].content.id, "comp_1");
    assert.notProperty(parsedOff[0].parts[0].content, "action");
    assert.notProperty(parsedOff[0].parts[0].content, "status");
  });

  it("unknown_new_call type: uses default props, strips when content OFF", () => {
    enableContentRecording();
    const resultOn = formatOutputMessages({
      output: [
        {
          type: "future_fancy_call",
          call_id: "ff_1",
          name: "fancy_op",
          arguments: "{}",
          input: "query",
          output: "result",
          query: "search term",
          server_label: "my-server",
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.type, "future_fancy_call");
    assert.equal(parsedOn[0].parts[0].content.name, "fancy_op");
    assert.equal(parsedOn[0].parts[0].content.status, "completed");

    disableContentRecording();
    const resultOff = formatOutputMessages({
      output: [
        {
          type: "future_fancy_call",
          call_id: "ff_1",
          name: "fancy_op",
          arguments: "{}",
          input: "query",
          output: "result",
          query: "search term",
          server_label: "my-server",
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "future_fancy_call");
    assert.equal(parsedOff[0].parts[0].content.id, "ff_1");
    assert.notProperty(parsedOff[0].parts[0].content, "name");
    assert.notProperty(parsedOff[0].parts[0].content, "arguments");
    assert.notProperty(parsedOff[0].parts[0].content, "input");
    assert.notProperty(parsedOff[0].parts[0].content, "output");
    assert.notProperty(parsedOff[0].parts[0].content, "query");
    assert.notProperty(parsedOff[0].parts[0].content, "server_label");
    assert.notProperty(parsedOff[0].parts[0].content, "status");
  });
});

// ---- Input tool output privacy tests ----

describe("formatInputMessages - tool output privacy", () => {
  it("computer_call_output: always strips image_url even when content ON", () => {
    enableContentRecording();
    const result = formatInputMessages({
      input: [
        {
          type: "computer_call_output",
          call_id: "comp_1",
          output: { type: "screenshot", image_url: "data:image/png;base64,HUGE", status: "done" },
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].content.type, "computer_call_output");
    assert.notProperty(
      parsed[0].parts[0].content.output,
      "image_url",
      "binary image data must never be included",
    );
    assert.equal(parsed[0].parts[0].content.output.status, "done");
  });

  it("shell_call_output: strips output/status when content OFF", () => {
    enableContentRecording();
    const resultOn = formatInputMessages({
      input: [
        {
          type: "shell_call_output",
          call_id: "sh_out_1",
          output: "command output text",
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.output, "command output text");

    disableContentRecording();
    const resultOff = formatInputMessages({
      input: [
        {
          type: "shell_call_output",
          call_id: "sh_out_1",
          output: "command output text",
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "shell_call_output");
    assert.equal(parsedOff[0].parts[0].content.id, "sh_out_1");
    assert.notProperty(parsedOff[0].parts[0].content, "output", "output must not leak");
    assert.notProperty(parsedOff[0].parts[0].content, "status");
  });

  it("local_shell_call_output: strips output/status when content OFF", () => {
    enableContentRecording();
    const resultOn = formatInputMessages({
      input: [
        {
          type: "local_shell_call_output",
          call_id: "lsh_out_1",
          output: "local command output",
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.output, "local command output");
    assert.equal(parsedOn[0].parts[0].content.status, "completed");

    disableContentRecording();
    const resultOff = formatInputMessages({
      input: [
        {
          type: "local_shell_call_output",
          call_id: "lsh_out_1",
          output: "local command output",
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "local_shell_call_output");
    assert.equal(parsedOff[0].parts[0].content.id, "lsh_out_1");
    assert.notProperty(parsedOff[0].parts[0].content, "output", "output must not leak");
    assert.notProperty(parsedOff[0].parts[0].content, "status");
  });

  it("apply_patch_call_output: strips output/status when content OFF", () => {
    enableContentRecording();
    const resultOn = formatInputMessages({
      input: [
        {
          type: "apply_patch_call_output",
          call_id: "ap_out_1",
          output: "patch applied successfully",
          status: "completed",
        },
      ],
    });
    const parsedOn = JSON.parse(resultOn!);
    assert.equal(parsedOn[0].parts[0].content.output, "patch applied successfully");

    disableContentRecording();
    const resultOff = formatInputMessages({
      input: [
        {
          type: "apply_patch_call_output",
          call_id: "ap_out_1",
          output: "patch applied successfully",
          status: "completed",
        },
      ],
    });
    const parsedOff = JSON.parse(resultOff!);
    assert.equal(parsedOff[0].parts[0].content.type, "apply_patch_call_output");
    assert.equal(parsedOff[0].parts[0].content.id, "ap_out_1");
    assert.notProperty(parsedOff[0].parts[0].content, "output", "output must not leak");
    assert.notProperty(parsedOff[0].parts[0].content, "status");
  });

  it("generic *_output type: strips output/result when content OFF", () => {
    disableContentRecording();
    const result = formatInputMessages({
      input: [
        {
          type: "custom_tool_call_output",
          call_id: "cto_1",
          output: "sensitive result data",
          result: "more sensitive data",
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].content.type, "custom_tool_call_output");
    assert.equal(parsed[0].parts[0].content.id, "cto_1");
    assert.notProperty(parsed[0].parts[0].content, "output");
    assert.notProperty(parsed[0].parts[0].content, "result");
    assert.notProperty(parsed[0].parts[0].content, "status");
  });

  it("unknown *_output type: only type and id visible when content OFF", () => {
    disableContentRecording();
    const result = formatInputMessages({
      input: [
        {
          type: "unsupported_test_call_output",
          call_id: "uto_1",
          output: "secret tool state",
          result: "private bits",
          data: "extra sensitive field",
          status: "completed",
        },
      ],
    });
    const parsed = JSON.parse(result!);
    assert.equal(parsed[0].parts[0].content.type, "unsupported_test_call_output");
    assert.equal(parsed[0].parts[0].content.id, "uto_1");
    assert.notProperty(parsed[0].parts[0].content, "output");
    assert.notProperty(parsed[0].parts[0].content, "result");
    assert.notProperty(parsed[0].parts[0].content, "data");
    assert.notProperty(parsed[0].parts[0].content, "status");
  });

  it("output type without _call suffix is silently dropped", () => {
    enableContentRecording();
    const result = formatOutputMessages({
      output: [
        {
          type: "mystery_widget",
          id: "mw_1",
          data: "should not appear",
        },
      ],
    });
    // mystery_widget doesn't match function_call, message, or *_call pattern
    assert.isUndefined(result, "items without _call suffix should be silently dropped");
  });
});
