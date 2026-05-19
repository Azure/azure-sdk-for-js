// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as nodeModule from "node:module";
import {
  GEN_AI_CLIENT_OPERATION_DURATION,
  GEN_AI_CLIENT_TOKEN_USAGE,
  GEN_AI_OPERATION_NAME,
  GEN_AI_RESPONSE_MODEL,
  GEN_AI_PROVIDER_NAME,
  AGENTS_PROVIDER,
  SERVER_ADDRESS,
  SERVER_PORT,
  ERROR_TYPE,
} from "./constants.js";

/**
 * Minimal subset of the OpenTelemetry Histogram interface we need.
 * Avoids a hard dependency on `@opentelemetry/api`.
 */
interface Histogram {
  record(value: number, attributes?: Record<string, string | number>): void;
}

let _metricsResolved = false;
let operationDurationHistogram: Histogram | undefined;
let tokenUsageHistogram: Histogram | undefined;

/**
 * Lazily initializes OTel metrics histograms on first use.
 * Uses the same synchronous require pattern as tracingClient.ts so that
 * histograms are guaranteed to be available by the first recording call.
 */
function ensureMetrics(): void {
  if (_metricsResolved) return;
  _metricsResolved = true;
  try {
    let _require: ((id: string) => unknown) | undefined;
    if (typeof require === "function") {
      _require = require;
    } else if (typeof import.meta.url === "string") {
      _require = nodeModule.createRequire(import.meta.url);
    }
    if (!_require) {
      return;
    }
    const otelApi = _require("@opentelemetry/api") as typeof import("@opentelemetry/api");
    const meter = otelApi.metrics.getMeter("@azure/ai-projects");

    operationDurationHistogram = meter.createHistogram(GEN_AI_CLIENT_OPERATION_DURATION, {
      description: "Duration of GenAI operations",
      unit: "s",
    });

    tokenUsageHistogram = meter.createHistogram(GEN_AI_CLIENT_TOKEN_USAGE, {
      description: "Token usage for GenAI operations",
      unit: "{token}",
    });
  } catch {
    // @opentelemetry/api not available — metrics disabled
  }
}

interface MetricDimensions {
  operationName: string;
  serverAddress?: string;
  serverPort?: number;
  responseModel?: string;
  errorType?: string;
}

function buildCommonAttributes(dimensions: MetricDimensions): Record<string, string | number> {
  const attrs: Record<string, string | number> = {
    [GEN_AI_OPERATION_NAME]: dimensions.operationName,
    [GEN_AI_PROVIDER_NAME]: AGENTS_PROVIDER,
  };
  if (dimensions.serverAddress) {
    attrs[SERVER_ADDRESS] = dimensions.serverAddress;
  }
  if (dimensions.serverPort && dimensions.serverPort !== 443) {
    attrs[SERVER_PORT] = dimensions.serverPort;
  }
  if (dimensions.responseModel) {
    attrs[GEN_AI_RESPONSE_MODEL] = dimensions.responseModel;
  }
  if (dimensions.errorType) {
    attrs[ERROR_TYPE] = dimensions.errorType;
  }
  return attrs;
}

/**
 * Records the operation duration metric.
 * @param durationSeconds - Duration of the operation in seconds.
 * @param dimensions - Metric dimensions.
 */
export function recordOperationDuration(
  durationSeconds: number,
  dimensions: MetricDimensions,
): void {
  ensureMetrics();
  if (!operationDurationHistogram) return;
  operationDurationHistogram.record(durationSeconds, buildCommonAttributes(dimensions));
}

/**
 * Records token usage metrics (input and output as separate recordings).
 * @param inputTokens - Number of input tokens, or undefined if not available.
 * @param outputTokens - Number of output tokens, or undefined if not available.
 * @param dimensions - Metric dimensions.
 */
export function recordTokenUsage(
  inputTokens: number | undefined,
  outputTokens: number | undefined,
  dimensions: MetricDimensions,
): void {
  ensureMetrics();
  if (!tokenUsageHistogram) return;

  const baseAttrs = buildCommonAttributes(dimensions);

  if (inputTokens !== undefined) {
    tokenUsageHistogram.record(inputTokens, {
      ...baseAttrs,
      "gen_ai.token.type": "input",
    });
  }
  if (outputTokens !== undefined) {
    tokenUsageHistogram.record(outputTokens, {
      ...baseAttrs,
      "gen_ai.token.type": "output",
    });
  }
}
