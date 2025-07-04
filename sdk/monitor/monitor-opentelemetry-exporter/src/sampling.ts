// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Link, Attributes, SpanKind, Context } from "@opentelemetry/api";
import { TraceFlags, trace } from "@opentelemetry/api";
import type { Sampler, SamplingResult } from "@opentelemetry/sdk-trace-base";
import { SamplingDecision } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorSampleRate } from "./utils/constants/applicationinsights.js";

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
    let isSampledIn = false;
    attributes = attributes || {};

    // Try to get the parent sampling result first
    const parentSpan = trace.getSpan(context);
    const parentSpanContext = parentSpan?.spanContext();

    if (
      parentSpanContext &&
      trace.isSpanContextValid(parentSpanContext) &&
      !parentSpanContext.isRemote
    ) {
      // If the parent span is valid and not remote, we can use its sample rate
      const parentSampleRate = Number((parentSpan as any).attributes?.[AzureMonitorSampleRate]);
      if (!isNaN(parentSampleRate)) {
        this._sampleRate = Number(parentSampleRate);
      }
      if ((parentSpanContext.traceFlags & TraceFlags.SAMPLED) === TraceFlags.SAMPLED) {
        isSampledIn = true;
      } else {
        isSampledIn = false;
      }
    } else {
      // If no parent sampling result, we use the local sampling logic
      if (this._sampleRate === 100) {
        isSampledIn = true;
      } else if (this._sampleRate === 0) {
        isSampledIn = false;
      } else {
        isSampledIn = this._getSamplingHashCode(traceId) < this._sampleRate;
      }
    }
    // Only send the sample rate if it's not 100
    if (this._sampleRate !== 100) {
      // Add sample rate as span attribute
      attributes[AzureMonitorSampleRate] = this._sampleRate;
    }

    return isSampledIn
      ? { decision: SamplingDecision.RECORD_AND_SAMPLED, attributes: attributes }
      : { decision: SamplingDecision.NOT_RECORD, attributes: attributes };
  }

  /**
   * Return Sampler description
   */
  public toString(): string {
    return `ApplicationInsightsSampler{${this.samplingRatio}}`;
  }

  private _getSamplingHashCode(input: string): number {
    const csharpMin = -2147483648;
    const csharpMax = 2147483647;
    let hash = 5381;

    if (!input) {
      return 0;
    }

    while (input.length < 8) {
      input = input + input;
    }

    for (let i = 0; i < input.length; i++) {
      // JS doesn't respond to integer overflow by wrapping around. Simulate it with bitwise operators ( | 0)
      hash = ((((hash << 5) + hash) | 0) + input.charCodeAt(i)) | 0;
    }

    hash = hash <= csharpMin ? csharpMax : Math.abs(hash);
    return (hash / csharpMax) * 100;
  }
}
