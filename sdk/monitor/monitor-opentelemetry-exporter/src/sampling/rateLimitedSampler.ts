// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Link, Attributes, SpanKind, Context } from "@opentelemetry/api";
import type { Sampler, SamplingResult } from "@opentelemetry/sdk-trace-base";
import { SamplingDecision } from "@opentelemetry/sdk-trace-base";
import { roundDownToNearest, shouldSample } from "./samplingUtils.js";

type RateLimitedSamplerState = {
  effectiveWindowCount: number;
  effectiveWindowNanos: number;
  lastNanoTime: number;
};

/**
 * RateLimitedSampler is responsible for the following:
 * - Implements a rate-limiting sampling strategy based on a specified number of requests per second.
 * - Dynamically adjusts the sampling rate based on the time elapsed since the last sample.
 * - Provides a sampling rate that can be used to determine whether a span should be recorded.
 * @param requestsPerSecond -
 */
export class RateLimitedSampler implements Sampler {
  private readonly nanoTimeSupplier: () => number;
  private readonly inverseAdaptationTimeNanos: number;
  private readonly targetSpansPerNanosecondLimit: number;
  private state: RateLimitedSamplerState;
  private readonly roundToNearest: boolean;
  private readonly tracesPerSecond: number;

  /**
   * Initializes a new instance of the RateLimitedSampler class.
   * @param tracesPerSecond - The maximum number of traces to sample per second.
   * @throws Error if tracesPerSecond is negative.
   */
  constructor(tracesPerSecond: number) {
    this.tracesPerSecond = tracesPerSecond;
    if (this.tracesPerSecond < 0.0) {
      throw new Error("Limit for sampled traces per second must be nonnegative");
    }
    const adaptationTimeSeconds = 0.1;
    this.nanoTimeSupplier = () => Number(process.hrtime.bigint());
    this.inverseAdaptationTimeNanos = 1e-9 / adaptationTimeSeconds;
    this.targetSpansPerNanosecondLimit = 1e-9 * this.tracesPerSecond;
    const now = this.nanoTimeSupplier();
    this.state = {
      effectiveWindowCount: 0,
      effectiveWindowNanos: 0,
      lastNanoTime: now,
    };
    this.roundToNearest = true;
  }

  /**
   * Updates the state of the sampler based on the current time.
   * This method calculates the effective window count and nanos based on the time elapsed since the last sample.
   * @param oldState - The previous state of the sampler.
   * @param currentNanoTime - The current time in nanoseconds.
   * @returns The updated state of the sampler.
   */
  private updateState(
    oldState: RateLimitedSamplerState,
    currentNanoTime: number,
  ): RateLimitedSamplerState {
    if (currentNanoTime <= oldState.lastNanoTime) {
      return {
        effectiveWindowCount: oldState.effectiveWindowCount + 1,
        effectiveWindowNanos: oldState.effectiveWindowNanos,
        lastNanoTime: oldState.lastNanoTime,
      };
    }
    const nanoTimeDelta = currentNanoTime - oldState.lastNanoTime;
    const decayFactor = Math.exp(-nanoTimeDelta * this.inverseAdaptationTimeNanos);
    const currentEffectiveWindowCount = oldState.effectiveWindowCount * decayFactor + 1;
    const currentEffectiveWindowNanos = oldState.effectiveWindowNanos * decayFactor + nanoTimeDelta;
    return {
      effectiveWindowCount: currentEffectiveWindowCount,
      effectiveWindowNanos: currentEffectiveWindowNanos,
      lastNanoTime: currentNanoTime,
    };
  }

  /**
   * Gets the current sample rate based on the effective window count and nanos.
   * This method calculates the sampling probability and returns it as a percentage.
   * If `roundToNearest` is true, it rounds down the sampling percentage to the nearest whole number.
   * @returns The current sample rate as a percentage.
   */
  public getSampleRate(): number {
    const currentNanoTime = this.nanoTimeSupplier();
    this.state = this.updateState(this.state, currentNanoTime);

    const samplingProbability =
      (this.state.effectiveWindowNanos * this.targetSpansPerNanosecondLimit) /
      this.state.effectiveWindowCount;
    let samplingPercentage = 100 * Math.min(samplingProbability, 1);

    if (this.roundToNearest) {
      samplingPercentage = roundDownToNearest(samplingPercentage);
    }
    return samplingPercentage;
  }

  /**
   * Checks whether span needs to be created and tracked.
   *
   * @param context - Parent Context which may contain a span.
   * @param traceId - traceId of the span to be created. It can be different from the
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
    const sampleRate = this.getSampleRate();
    return shouldSample(sampleRate, context, traceId, attributes)
      ? { decision: SamplingDecision.RECORD_AND_SAMPLED, attributes: attributes }
      : { decision: SamplingDecision.NOT_RECORD, attributes: attributes };
  }

  /**
   * Return Sampler description
   */
  public toString(): string {
    return `RateLimitedSampler{${this.tracesPerSecond}}`;
  }
}
