// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Link, Attributes, SpanKind, Context } from "@opentelemetry/api";
import type { Sampler, SamplingResult } from "@opentelemetry/sdk-trace-base";
import { SamplingDecision } from "@opentelemetry/sdk-trace-base";
import { shouldSample } from "./samplingUtils.js";

/**
 * ApplicationInsightsSampler is responsible for the following:
 * Implements same trace id hashing algorithm so that traces are sampled the same across multiple nodes
 * Adds item count to span attribute if span is sampled (needed for ingestion service)
 * @param samplingRatio - 0 to 1 value.
 */
export class ApplicationInsightsSampler implements Sampler {
  private _sampleRate: number;
  private readonly samplingRatio: number;

  /**
   * Initializes a new instance of the ApplicationInsightsSampler class.
   * @param samplingRatio - Value in the range [0,1], 1 meaning all data will sampled and 0 all Tracing data will be sampled out.
   */
  constructor(samplingRatio: number = 1) {
    this.samplingRatio = samplingRatio;
    if (this.samplingRatio > 1 || this.samplingRatio < 0 || !Number.isFinite(this.samplingRatio)) {
      throw new Error("Wrong sampling rate, data will not be sampled out");
    }
    this._sampleRate = Math.round(this.samplingRatio * 100);
  }

  /**
   * Checks whether span needs to be created and tracked.
   *
   * @param context - Parent Context which may contain a span.
   * @param traceId - traceif of the span to be created. It can be different from the
   *     traceId in the {@link SpanContext}. Typically in situations when the
   *     span to be created starts a new trace.
   * @param spanName - Name of the span to be created.
   * @param spanKind - Kind of the span to be created.
   * @param attributes - Initial set of SpanAttributes for the Span being constructed.
   * @param links - Collection of links that will be associated with the Span to
   *     be created. Typically useful for batch operations.
   * @returns a {@link SamplingResult}.
   */
  public shouldSample(
    context: Context,
    traceId: string,
    // @ts-expect-error unused argument
    spanName: string,
    // @ts-expect-error unused argument
    spanKind: SpanKind,
    attributes: Attributes,
    // @ts-expect-error unused argument
    links: Link[],
  ): SamplingResult {
    return shouldSample(this._sampleRate, context, traceId, attributes)
      ? { decision: SamplingDecision.RECORD_AND_SAMPLED, attributes: attributes }
      : { decision: SamplingDecision.NOT_RECORD, attributes: attributes };
  }

  /**
   * Return Sampler description
   */
  public toString(): string {
    return `ApplicationInsightsSampler{${this.samplingRatio}}`;
  }
}
