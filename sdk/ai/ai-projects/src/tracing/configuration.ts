// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

let _genAITracingEnabled = false;
let _experimentalAcknowledged = false;
let _contentRecordingEnabled = false;
let _traceContextPropagationEnabled = true;

/**
 * Enable GenAI tracing for Azure AI Projects agent operations
 * and response generation.
 *
 * This is a process-wide setting that affects all AIProjectClient instances
 * in the current process. Each call resets **all** options: any option not
 * explicitly provided is resolved from its environment variable, or falls
 * back to its default value. Previously set values are not preserved.
 *
 * @param options - Optional configuration.
 * Options include:
 * - `contentRecording` - Whether to capture message content in traces.
 *   Content includes chat messages, function call names, arguments, and return values.
 *   When set to `true` or `false`, that value is used directly.
 *   When omitted, the `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` environment
 *   variable is checked (accepts `"true"` case-insensitive or `"1"`). Defaults to `false`.
 *   This value is only evaluated when enableGenAITracing() is called.
 * - `traceContextPropagation` - Whether to inject W3C trace context headers
 *   (`traceparent`, `tracestate`) into outgoing OpenAI requests.
 *   When set to `true` or `false`, that value is used directly.
 *   When omitted, the `AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION` environment
 *   variable is checked (accepts `"true"` case-insensitive or `"1"`). Defaults to `true`.
 * - `experimental` - Enable experimental GenAI tracing features that are
 *   in preview and may change or be removed in future releases without notice.
 *   When set to `true`, tracing is enabled regardless of the value of the
 *   `AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING` environment variable.
 *   When omitted, the environment variable must also be set to `"true"` (case-insensitive) or `"1"`
 *   to enable experimental GenAI tracing features currently in preview.
 */
export function enableGenAITracing(options?: { contentRecording?: boolean; traceContextPropagation?: boolean; experimental?: boolean }): void {
  _genAITracingEnabled = true;
  _experimentalAcknowledged = false;
  _contentRecordingEnabled = false;
  _traceContextPropagationEnabled = true;
  if (options?.experimental !== undefined) {
    _experimentalAcknowledged = options.experimental;
  } else {
    try {
      const envVal = process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
      if (envVal && (envVal.toLowerCase() === "true" || envVal === "1")) {
        _experimentalAcknowledged = true;
      }
    } catch {
      // process.env may not exist in browser environments
    }
  }
  if (options?.contentRecording !== undefined) {
    _contentRecordingEnabled = options.contentRecording;
  } else {
    try {
      const envVal = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
      _contentRecordingEnabled = !!envVal && (envVal.toLowerCase() === "true" || envVal === "1");
    } catch {
      _contentRecordingEnabled = false;
    }
  }
  if (options?.traceContextPropagation !== undefined) {
    _traceContextPropagationEnabled = options.traceContextPropagation;
  } else {
    try {
      const envVal = process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION;
      if (envVal && (envVal.toLowerCase() === "false" || envVal === "0")) {
        _traceContextPropagationEnabled = false;
      }
    } catch {
      // process.env may not exist in browser environments
    }
  }
}

/**
 * Disable GenAI tracing for Azure AI Projects agent operations
 * and response generation.
 *
 * This is a process-wide setting that affects all AIProjectClient instances
 * in the current process.
 */
export function disableGenAITracing(): void {
  _genAITracingEnabled = false;
  _experimentalAcknowledged = false;
  _contentRecordingEnabled = false;
  _traceContextPropagationEnabled = true;
}

/**
 * Returns true if GenAI tracing is enabled.
 */
export function isGenAITracingEnabled(): boolean {
  return _genAITracingEnabled;
}

/**
 * Returns true if GenAI tracing should be applied.
 *
 * Currently all GenAI traces are experimental, so this requires both
 * tracing to be enabled and the experimental flag to be acknowledged.
 */
export function isGenAITracingApplied(): boolean {
  return _genAITracingEnabled && _experimentalAcknowledged;
}

/**
 * Returns true if content recording is enabled.
 *
 * The value is determined when enableGenAITracing() is called, either from the
 * `contentRecording` option or from the `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT`
 * environment variable (accepts `"true"` case-insensitive or `"1"`).
 *
 * When disabled, no user-specific content is captured — only structural trace
 * data (operation names, token counts, model info) is recorded.
 */
export function isContentRecordingEnabled(): boolean {
  return _contentRecordingEnabled;
}

/**
 * Returns true if trace context propagation is enabled.
 *
 * When enabled, W3C trace context headers (`traceparent`, `tracestate`) are
 * injected into outgoing OpenAI requests. Defaults to `true`.
 *
 * Privacy-conscious clients can disable this to prevent trace identifiers
 * from being sent to external services.
 */
export function isTraceContextPropagationEnabled(): boolean {
  return _traceContextPropagationEnabled;
}
