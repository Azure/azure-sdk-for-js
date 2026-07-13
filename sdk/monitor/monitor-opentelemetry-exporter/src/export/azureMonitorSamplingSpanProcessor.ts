// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Attributes, Context } from "@opentelemetry/api";
import { ROOT_CONTEXT, trace } from "@opentelemetry/api";
import type { ReadableSpan, Sampler, Span, SpanProcessor } from "@opentelemetry/sdk-trace-base";
import { SamplingDecision } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorSampleRate } from "../utils/constants/applicationinsights.js";
import { RateLimitedSampler } from "../sampling/rateLimitedSampler.js";
import { ApplicationInsightsSampler } from "../sampling/percentageSampler.js";

/**
 * Options used to build an Azure Monitor scoped sampler.
 */
export interface AzureMonitorSamplerOptions {
  /**
   * The maximum number of traces to sample per second. When greater than 0 a
   * {@link RateLimitedSampler} is used.
   */
  tracesPerSecond?: number;
  /**
   * Value in the range [0, 1] used by the {@link ApplicationInsightsSampler}
   * when {@link tracesPerSecond} is not set. Defaults to 1 (100%).
   */
  samplingRatio?: number;
}

/**
 * Creates the sampler that Azure Monitor should use for its own export
 * pipeline. A {@link RateLimitedSampler} is used by default whenever
 * `tracesPerSecond` is a positive number, otherwise an
 * {@link ApplicationInsightsSampler} is used with the provided `samplingRatio`.
 */
export function createAzureMonitorSampler(options: AzureMonitorSamplerOptions = {}): Sampler {
  if (options.tracesPerSecond !== undefined && options.tracesPerSecond > 0) {
    return new RateLimitedSampler(options.tracesPerSecond);
  }
  return new ApplicationInsightsSampler(options.samplingRatio ?? 1);
}

type SamplingDecisionRecord = {
  sampledIn: boolean;
  sampleRate: number;
};

/**
 * Returns a read-only view of `span` whose `attributes` include the Azure
 * Monitor sample rate. The original span is left untouched so that other
 * exporters (e.g. A365) sharing the same span are unaffected.
 */
function withSampleRate(span: ReadableSpan, sampleRate: number): ReadableSpan {
  const attributes: Attributes = { ...span.attributes, [AzureMonitorSampleRate]: sampleRate };
  return new Proxy(span, {
    get(target: ReadableSpan, prop: string | symbol): unknown {
      if (prop === "attributes") {
        return attributes;
      }
      const value = (target as unknown as Record<string | symbol, unknown>)[prop];
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}

/**
 * A {@link SpanProcessor} that applies a {@link Sampler} to the spans it
 * forwards to a delegate processor. Because it is inserted only in front of the
 * Azure Monitor export pipeline, the sampling decision is scoped to Azure
 * Monitor: spans that are sampled out are simply not forwarded to the delegate,
 * while every other span processor (and therefore every other exporter) still
 * receives 100% of the spans.
 *
 * The decision is taken in {@link onStart} — this preserves the timing used by
 * the {@link RateLimitedSampler} (spans start at their natural rate) and lets a
 * child span inherit the decision of its in-process parent, keeping whole
 * traces together. The decision is then applied in {@link onEnd}: sampled-out
 * spans are dropped and sampled-in spans get the `microsoft.sample_rate`
 * attribute (for ingestion item counting) via a non-mutating proxy.
 */
export class AzureMonitorSamplingSpanProcessor implements SpanProcessor {
  private readonly _delegate: SpanProcessor;
  private readonly _sampler: Sampler;
  private readonly _decisions = new WeakMap<object, SamplingDecisionRecord>();

  /**
   * @param delegate - The processor that receives the sampled-in spans (e.g. a BatchSpanProcessor wrapping the Azure Monitor trace exporter).
   * @param sampler - The sampler used to decide which spans are exported to Azure Monitor.
   */
  constructor(delegate: SpanProcessor, sampler: Sampler) {
    this._delegate = delegate;
    this._sampler = sampler;
  }

  onStart(span: Span, parentContext: Context): void {
    let decision: SamplingDecisionRecord;
    const parentSpan = trace.getSpan(parentContext);
    const inherited = parentSpan ? this._decisions.get(parentSpan) : undefined;
    if (inherited) {
      decision = inherited;
    } else {
      // Use ROOT_CONTEXT so the sampler makes an independent decision based on
      // the trace id: parent correlation is handled here via the WeakMap so it
      // is not confused by the (always 100%) global sampler trace flags.
      const result = this._sampler.shouldSample(
        ROOT_CONTEXT,
        span.spanContext().traceId,
        span.name,
        span.kind,
        {},
        span.links ?? [],
      );
      const rateAttribute = result.attributes?.[AzureMonitorSampleRate];
      decision = {
        sampledIn: result.decision === SamplingDecision.RECORD_AND_SAMPLED,
        sampleRate: rateAttribute === undefined ? 100 : Number(rateAttribute),
      };
    }
    this._decisions.set(span, decision);
    this._delegate.onStart(span, parentContext);
  }

  onEnd(span: ReadableSpan): void {
    const decision = this._decisions.get(span);
    this._decisions.delete(span);

    if (decision && !decision.sampledIn) {
      // Sampled out of the Azure Monitor pipeline only.
      return;
    }

    if (
      decision &&
      decision.sampleRate !== 100 &&
      span.attributes[AzureMonitorSampleRate] === undefined
    ) {
      this._delegate.onEnd(withSampleRate(span, decision.sampleRate));
    } else {
      this._delegate.onEnd(span);
    }
  }

  forceFlush(): Promise<void> {
    return this._delegate.forceFlush();
  }

  shutdown(): Promise<void> {
    return this._delegate.shutdown();
  }
}
