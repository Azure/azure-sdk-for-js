// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

let _genAITracingEnabled = false;

/**
 * Enable GenAI tracing for Azure AI Projects agent operations
 * and response generation.
 */
export function enableGenAITracing(): void {
  _genAITracingEnabled = true;
}

/**
 * Disable GenAI tracing for Azure AI Projects agent operations
 * and response generation.
 */
export function disableGenAITracing(): void {
  _genAITracingEnabled = false;
}

/**
 * Returns true if GenAI tracing is enabled via the programmatic toggle
 * or the AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING environment variable.
 */
export function isGenAITracingEnabled(): boolean {
  if (_genAITracingEnabled) {
    return true;
  }
  try {
    return process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING === "true";
  } catch {
    // process.env may not exist in browser environments
    return false;
  }
}

/**
 * Returns true if content recording is enabled via the
 * OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT environment variable.
 *
 * When disabled, no user-specific content is captured — only generic IDs and types.
 * No message content, no tool call details (function names, arguments, return values),
 * no system instructions, no descriptions.
 */
export function isContentRecordingEnabled(): boolean {
  try {
    return process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT === "true";
  } catch {
    return false;
  }
}
