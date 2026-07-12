// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AttributeValue, Context } from "@opentelemetry/api";
import { trace } from "@opentelemetry/api";
import type { ReadableSpan, Span, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { MetricHandler } from "../metrics/index.js";
import { Logger } from "../shared/logging/index.js";
import {
  GEN_AI_OPERATION_INVOKE_AGENT,
  GEN_AI_OPERATION_NAME,
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
    // The Span returned by trace.getSpan may be a non-recording span or a
    // foreign implementation that does not expose `attributes`. Only proceed
    // when the parent looks like a ReadableSpan with readable attributes.
    const parentAttributes = (parentSpan as Partial<ReadableSpan>).attributes;
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
    // Only check the four target attributes defined by the spec rather than
    // scanning every key on the span.
    for (const { target } of MAIN_AGENT_ONEND_MAPPING) {
      if (attributes[target] !== undefined) {
        return;
      }
    }
    // The processor runs before BatchSpanProcessor, so mutating the span's
    // attributes map here is observed by the exporter. Assigning into
    // `attributes` directly avoids depending on the ReadableSpan also being a
    // writable Span (and on `setAttribute` being a no-op once the span has
    // ended).
    const writableAttributes = attributes as Record<string, AttributeValue | undefined>;
    for (const { target, source } of MAIN_AGENT_ONEND_MAPPING) {
      const value = attributes[source];
      if (value !== undefined) {
        writableAttributes[target] = value;
      }
    }
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
