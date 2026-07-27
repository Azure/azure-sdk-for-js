// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Options for configuring GenAI tracing on a specific AIProjectClient instance.
 *
 * Pass these under the `tracingOptions` key of AIProjectClientOptionalParams
 * to enable GenAI tracing when the client is instantiated. Each client instance
 * maintains its own independent tracing configuration.
 */
export interface GenAITracingOptions {
  /**
   * Acknowledge that GenAI tracing features are experimental and may change
   * or be removed in future releases without notice.
   * When set to `true`, tracing is enabled.
   * When omitted, the `AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING` environment variable
   * is checked (accepts `"true"` case-insensitive or `"1"`). Defaults to `false`.
   */
  experimental?: boolean;
  /**
   * Whether to capture message content in traces.
   * Content includes chat messages, function call names, arguments, and return values.
   * When set to `true` or `false`, that value is used directly.
   * When omitted, the `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` environment
   * variable is checked (accepts `"true"` case-insensitive or `"1"`). Defaults to `false`.
   */
  contentRecording?: boolean;
  /**
   * Whether to inject W3C trace context headers (`traceparent`, `tracestate`)
   * into outgoing OpenAI requests.
   * When set to `true` or `false`, that value is used directly.
   * When omitted, the `AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION` environment
   * variable is checked (accepts `"true"` case-insensitive or `"1"`). Defaults to `true`.
   */
  traceContextPropagation?: boolean;
}

/**
 * Resolved tracing configuration for a specific client instance.
 * @internal
 */
export interface ResolvedTracingConfig {
  /** Whether tracing is enabled. */
  enabled: boolean;
  /** Whether to record content (messages, tool calls, etc.). */
  contentRecording: boolean;
  /** Whether to inject W3C trace context headers. */
  traceContextPropagation: boolean;
}

/**
 * Resolves tracing options into a frozen config object for the client instance.
 * For each setting not explicitly provided, the corresponding environment variable
 * is checked. If the env var is also not set, the default value is used.
 *
 * - `enabled`: defaults to `false`. Env var: `AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED`
 *   is not used for enabled — passing `tracingOptions` (even `{}`) enables tracing.
 *   Env var `AZURE_TRACING_GEN_AI_ENABLE` (accepts `"true"` or `"1"`) enables tracing
 *   when `tracingOptions` is not provided.
 * - `contentRecording`: defaults to `false`. Env var: `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT`
 * - `traceContextPropagation`: defaults to `true`. Env var: `AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION`
 * @internal
 */
export function resolveTracingConfig(options?: GenAITracingOptions): ResolvedTracingConfig {
  // Determine if tracing is enabled — requires experimental acknowledgment
  let experimental: boolean;
  if (options?.experimental !== undefined) {
    experimental = options.experimental;
  } else {
    try {
      const envVal = process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
      experimental = !!envVal && (envVal.toLowerCase() === "true" || envVal === "1");
    } catch {
      experimental = false;
    }
  }

  const enabled = options !== undefined && experimental;

  if (!enabled) {
    return { enabled: false, contentRecording: false, traceContextPropagation: true };
  }

  // Resolve contentRecording
  let contentRecording = false;
  if (options?.contentRecording !== undefined) {
    contentRecording = options.contentRecording;
  } else {
    try {
      const envVal = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
      contentRecording = !!envVal && (envVal.toLowerCase() === "true" || envVal === "1");
    } catch {
      contentRecording = false;
    }
  }

  // Resolve traceContextPropagation
  let traceContextPropagation = true;
  if (options?.traceContextPropagation !== undefined) {
    traceContextPropagation = options.traceContextPropagation;
  } else {
    try {
      const envVal = process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION;
      if (envVal && (envVal.toLowerCase() === "false" || envVal === "0")) {
        traceContextPropagation = false;
      }
    } catch {
      // process.env may not exist in browser environments
    }
  }

  return { enabled, contentRecording, traceContextPropagation };
}
