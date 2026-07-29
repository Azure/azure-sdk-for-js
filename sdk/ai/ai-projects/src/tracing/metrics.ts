// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { metrics } from "@opentelemetry/api";
import type { Histogram } from "@opentelemetry/api";
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

let operationDurationHistogram: Histogram | undefined;
let tokenUsageHistogram: Histogram | undefined;

/**
 * Lazily initializes OTel metrics histograms on first use.
 */
function ensureMetrics(): void {
  if (operationDurationHistogram) return;
  const meter = metrics.getMeter("@azure/ai-projects");

  operationDurationHistogram = meter.createHistogram(GEN_AI_CLIENT_OPERATION_DURATION, {
    description: "Duration of GenAI operations",
    unit: "s",
  });

  tokenUsageHistogram = meter.createHistogram(GEN_AI_CLIENT_TOKEN_USAGE, {
    description: "Token usage for GenAI operations",
    unit: "{token}",
  });
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
