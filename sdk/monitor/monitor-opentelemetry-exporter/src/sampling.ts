// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Link, Attributes, SpanKind, Context } from "@opentelemetry/api";
import { Sampler, SamplingDecision, SamplingResult } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorSampleRate } from "./utils/constants/applicationinsights";

/**
 * ApplicationInsightsSampler is responsible for the following:
 * Implements same trace id hashing algorithm so that traces are sampled the same across multiple nodes
 * Adds item count to span attribute if span is sampled (needed for ingestion service)
 * @param samplingRatio - 0 to 1 value.
 */
export class ApplicationInsightsSampler implements Sampler {
  private readonly _sampleRate: number;
  private readonly _samplingRatio: number;

  constructor(samplingRatio: number = 1) {
    this._samplingRatio = samplingRatio;
    if (this._samplingRatio > 1) {
      throw new Error("Wrong sampling rate, data will not be sampled out");
    }
    this._sampleRate = Math.round(this._samplingRatio * 100);
  }

  /**
   * Checks whether span needs to be created and tracked.
   *
   * @param context Parent Context which may contain a span.
   * @param traceId of the span to be created. It can be different from the
   *     traceId in the {@link SpanContext}. Typically in situations when the
   *     span to be created starts a new trace.
   * @param spanName of the span to be created.
   * @param spanKind of the span to be created.
   * @param attributes Initial set of SpanAttributes for the Span being constructed.
   * @param links Collection of links that will be associated with the Span to
   *     be created. Typically useful for batch operations.
   * @returns a {@link SamplingResult}.
   */
  public shouldSample(
    // @ts-ignore
    context: Context,
    traceId: string,
    // @ts-ignore
    spanName: string,
    // @ts-ignore
    spanKind: SpanKind,
    attributes: Attributes,
    // @ts-ignore
    links: Link[]
  ): SamplingResult {
    let isSampledIn = false;
    if (this._sampleRate == 100) {
      isSampledIn = true;
    } else if (this._sampleRate == 0) {
      isSampledIn = false;
    } else {
      isSampledIn = this._getSamplingHashCode(traceId) < this._sampleRate;
    }
    // Add sample rate as span attribute
    attributes = attributes || {};
    attributes[AzureMonitorSampleRate] = this._sampleRate;
    return isSampledIn
      ? { decision: SamplingDecision.RECORD_AND_SAMPLED, attributes: attributes }
      : { decision: SamplingDecision.NOT_RECORD, attributes: attributes };
  }

  /**
   * Return Sampler description
   */
  public toString(): string {
    return `ApplicationInsightsSampler{${this._samplingRatio}}`;
  }

  private _getSamplingHashCode(input: string): number {
    var csharpMin = -2147483648;
    var csharpMax = 2147483647;
    var hash = 5381;

    if (!input) {
      return 0;
    }

    while (input.length < 8) {
      input = input + input;
    }

    for (var i = 0; i < input.length; i++) {
      // JS doesn't respond to integer overflow by wrapping around. Simulate it with bitwise operators ( | 0)
      hash = ((((hash << 5) + hash) | 0) + input.charCodeAt(i)) | 0;
    }

    hash = hash <= csharpMin ? csharpMax : Math.abs(hash);
    return (hash / csharpMax) * 100;
  }
}
