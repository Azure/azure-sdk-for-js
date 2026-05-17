// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isContentRecordingEnabled } from "./configuration.js";

/**
 * Formats input messages from a responses.create() body for span attributes.
 * When content recording is disabled, content fields are omitted.
 */
export function formatInputMessages(body: Record<string, unknown>): string | undefined {
  if (!body) return undefined;
  const contentEnabled = isContentRecordingEnabled();

  const messages: Array<Record<string, unknown>> = [];

  // Input items (the "input" field in responses.create)
  const input = body.input;
  if (typeof input === "string") {
    const parts: Array<Record<string, unknown>> = contentEnabled
      ? [{ type: "text", content: input }]
      : [{ type: "text" }];
    messages.push({ role: "user", parts });
  } else if (Array.isArray(input)) {
    const toolOutputParts: Array<Record<string, unknown>> = [];
    const userItems: Array<Record<string, unknown>> = [];

    for (const item of input) {
      if (typeof item === "string") {
        const parts: Array<Record<string, unknown>> = contentEnabled
          ? [{ type: "text", content: item }]
          : [{ type: "text" }];
        userItems.push({ role: "user", parts });
      } else if (item && typeof item === "object") {
        const itemType = item.type as string;

        if (itemType === "function_call_output") {
          // Simple format for function_call_output
          const part: Record<string, unknown> = { type: "tool_call_response" };
          if (item.call_id) part.id = item.call_id;
          if (contentEnabled && item.output) {
            try {
              part.result = JSON.parse(item.output as string);
            } catch {
              part.result = item.output;
            }
          }
          toolOutputParts.push(part);
        } else if (itemType && itemType.endsWith("_output")) {
          // Nested format for other *_output types (e.g. computer_call_output)
          const contentObj = buildToolOutputContent(item, itemType, contentEnabled);
          toolOutputParts.push({ type: "tool_call_output", content: contentObj });
        } else if (itemType === "function_call" || itemType === "message") {
          // Skip - previous response output, not user input
        } else {
          // Regular input item
          const msg: Record<string, unknown> = { role: (item.role as string) ?? "user" };
          const parts: Array<Record<string, unknown>> = [];
          if (item.content !== undefined) {
            parts.push(contentEnabled ? { type: "text", content: item.content } : { type: "text" });
          }
          if (parts.length > 0) msg.parts = parts;
          messages.push(msg);
        }
      }
    }

    // Group all tool output parts under one tool message
    if (toolOutputParts.length > 0) {
      messages.push({ role: "tool", parts: toolOutputParts });
    } else {
      messages.push(...userItems);
    }
  } else if (input == null && body.conversation) {
    // When using a conversation, input is in the conversation items, not the body.
    // Emit a minimal user message to match Python behavior.
    messages.push({ role: "user", parts: [{ type: "text" }] });
  }

  return messages.length > 0 ? JSON.stringify(messages) : undefined;
}

/**
 * Formats output messages from a responses.create() result for span attributes.
 * When content recording is disabled, only IDs and types are included.
 */
export function formatOutputMessages(response: Record<string, unknown>): string | undefined {
  if (!response) return undefined;
  const contentEnabled = isContentRecordingEnabled();

  const output = response.output;
  if (!Array.isArray(output)) return undefined;

  const textMessages: Array<Record<string, unknown>> = [];
  const toolCallParts: Array<Record<string, unknown>> = [];

  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const itemType = item.type as string;

    if (itemType === "message") {
      const parts: Array<Record<string, unknown>> = [];
      if (Array.isArray(item.content)) {
        for (const part of item.content) {
          if (contentEnabled && part?.text !== undefined) {
            parts.push({ type: "text", content: part.text });
          } else {
            parts.push({ type: "text" });
          }
        }
      }
      const msg: Record<string, unknown> = { role: (item.role as string) ?? "assistant" };
      if (parts.length > 0) msg.parts = parts;
      if (item.status) msg.finish_reason = item.status;
      textMessages.push(msg);
    } else if (itemType === "function_call") {
      // Simple format for function_call
      const part: Record<string, unknown> = { type: "tool_call" };
      if (item.call_id) part.id = item.call_id;
      if (contentEnabled) {
        if (item.name) part.name = item.name;
        if (item.arguments) part.arguments = item.arguments;
      }
      toolCallParts.push(part);
    } else if (isNonFunctionToolCallType(itemType)) {
      // Nested format for other tool call types (e.g. web_search_call, mcp_call)
      const contentObj = buildToolCallContent(item, itemType, contentEnabled);
      toolCallParts.push({ type: "tool_call", content: contentObj });
    }
  }

  // Tool calls grouped first, then text messages (matches C#/Python ordering)
  const messages: Array<Record<string, unknown>> = [];
  if (toolCallParts.length > 0) {
    messages.push({ role: "assistant", parts: toolCallParts });
  }
  messages.push(...textMessages);

  return messages.length > 0 ? JSON.stringify(messages) : undefined;
}

// ---- Tool type detection ----

/**
 * Checks if a type represents a non-function tool call (e.g. web_search_call, mcp_call).
 * Uses pattern matching to handle future tool types automatically.
 */
function isNonFunctionToolCallType(type: unknown): boolean {
  if (typeof type !== "string") return false;
  if (type === "function_call") return false;
  if (type.endsWith("_output")) return false;
  return type.includes("_call") || type.startsWith("mcp_");
}

// ---- Tool call content builders ----
// For non-function tool types, content is nested: {"type":"tool_call","content":{"type":"web_search_call",...}}
// type and id are always included (safe metadata). Details are content-gated.

function buildToolCallContent(
  item: Record<string, unknown>,
  type: string,
  contentEnabled: boolean,
): Record<string, unknown> {
  const content: Record<string, unknown> = { type };
  const callId = (item.call_id ?? item.id) as string | undefined;
  if (callId) content.id = callId;

  if (contentEnabled) {
    copyProps(content, item, getToolCallDetailProps(type));
  }

  return content;
}

function buildToolOutputContent(
  item: Record<string, unknown>,
  type: string,
  contentEnabled: boolean,
): Record<string, unknown> {
  const content: Record<string, unknown> = { type };
  const callId = (item.call_id ?? item.id) as string | undefined;
  if (callId) content.id = callId;

  if (contentEnabled) {
    const props = getToolOutputDetailProps(type);
    for (const prop of props) {
      if (
        prop === "output" &&
        type === "computer_call_output" &&
        item.output &&
        typeof item.output === "object"
      ) {
        // Strip binary data (image_url) from computer call output
        const filtered: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(item.output as Record<string, unknown>)) {
          if (key !== "image_url") {
            filtered[key] = value;
          }
        }
        content.output = filtered;
      } else if (item[prop] !== undefined) {
        content[prop] = item[prop];
      }
    }
  }

  return content;
}

function copyProps(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  props: string[],
): void {
  for (const prop of props) {
    if (source[prop] !== undefined) {
      target[prop] = source[prop];
    }
  }
}

// ---- Content-gated detail properties per tool type ----
// These match C#'s WriteToolSpecificDetails / WriteToolOutputSpecificDetails.
// Binary data (images, screenshots) is never included.

function getToolCallDetailProps(type: string): string[] {
  switch (type) {
    case "file_search_call":
      return ["queries", "results", "status"];
    case "code_interpreter_call":
      return ["code", "outputs", "status"];
    case "web_search_call":
      return ["action", "status"];
    case "computer_call":
      return ["action", "status"];
    case "image_generation_call":
      return ["prompt", "quality", "size", "style", "status"]; // excludes result (binary)
    case "mcp_call":
      return ["name", "arguments", "server_label", "status"];
    case "azure_ai_search_call":
      return ["input", "results", "status"];
    case "local_shell_call":
    case "shell_call":
      return ["command", "output", "status"];
    case "apply_patch_call":
      return ["patch", "status"];
    case "custom_tool_call":
      return ["name", "arguments", "status"];
    default:
      return ["name", "arguments", "server_label", "input", "output", "query", "status"];
  }
}

function getToolOutputDetailProps(type: string): string[] {
  switch (type) {
    case "computer_call_output":
      return ["output", "status"]; // output is filtered to exclude image_url
    case "local_shell_call_output":
    case "shell_call_output":
    case "apply_patch_call_output":
    case "custom_tool_call_output":
      return ["output", "status"];
    default:
      return ["output", "result", "status"];
  }
}
