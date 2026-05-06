// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "@opentelemetry/api";
import { trace } from "@opentelemetry/api";
import type { ReadableSpan, Span, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { MetricHandler } from "../metrics/index.js";
import { Logger } from "../shared/logging/index.js";
import {
  GEN_AI_OPERATION_INVOKE_AGENT,
  GEN_AI_OPERATION_NAME,
  MAIN_AGENT_ATTRIBUTE_PREFIX,
  MAIN_AGENT_ONEND_MAPPING,
  MAIN_AGENT_ONSTART_MAPPING,
} from "../utils/genaiAttributes.js";

/**
 * Azure Monitor Span Processor.
 * @internal
 */
export class AzureMonitorSpanProcessor implements SpanProcessor {
  private readonly _metricHandler: MetricHandler;

  constructor(metricHandler: MetricHandler) {
    this._metricHandler = metricHandler;
  }

  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  onStart(span: Span, parentContext: Context): void {
    try {
      this._propagateMainAgentAttributesFromParent(span, parentContext);
    } catch (error) {
      Logger.getInstance().warn("Error while propagating main agent attributes onStart", error);
    }
    this._metricHandler.markSpanAsProcessed(span);
  }

  onEnd(span: ReadableSpan): void {
    try {
      this._applyInvokeAgentMainAgentFallback(span);
    } catch (error) {
      Logger.getInstance().warn("Error while applying main agent fallback onEnd", error);
    }
    try {
      this._metricHandler.recordSpan(span);
    } catch (error) {
      Logger.getInstance().warn("Error while recording span", error);
    }
  }

  private _propagateMainAgentAttributesFromParent(span: Span, parentContext: Context): void {
    const parentSpan = trace.getSpan(parentContext);
    if (!parentSpan) {
      return;
    }
    // Active spans returned by trace.getSpan are SDK Span instances which
    // expose the `attributes` accessor used by ReadableSpan. Cast to read.
    const parentAttributes = (parentSpan as unknown as ReadableSpan).attributes;
    if (!parentAttributes) {
      return;
    }
    for (const { target, primary, fallback } of MAIN_AGENT_ONSTART_MAPPING) {
      const primaryValue = parentAttributes[primary];
      if (primaryValue !== undefined) {
        span.setAttribute(target, primaryValue);
        continue;
      }
      const fallbackValue = parentAttributes[fallback];
      if (fallbackValue !== undefined) {
        span.setAttribute(target, fallbackValue);
      }
    }
  }

  private _applyInvokeAgentMainAgentFallback(span: ReadableSpan): void {
    const attributes = span.attributes;
    if (!attributes || attributes[GEN_AI_OPERATION_NAME] !== GEN_AI_OPERATION_INVOKE_AGENT) {
      return;
    }
    for (const key of Object.keys(attributes)) {
      if (key.startsWith(MAIN_AGENT_ATTRIBUTE_PREFIX)) {
        return;
      }
    }
    // Mutate the underlying Span; this processor runs before BatchSpanProcessor
    // so the exporter observes these attributes.
    const writableSpan = span as unknown as Span;
    for (const { target, source } of MAIN_AGENT_ONEND_MAPPING) {
      const value = attributes[source];
      if (value !== undefined) {
        writableSpan.setAttribute(target, value);
      }
    }
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
