// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Link, Attributes, SpanKind, Context, diag } from "@opentelemetry/api";
import { Sampler, SamplingDecision, SamplingResult } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorSampleRate } from "./utils/constants/applicationinsights";

export class ApplicationInsightsSampler implements Sampler {
  private readonly _samplingPercentage: number;

  constructor(samplingRate: number = 1) {
    if (samplingRate > 1) {
      diag.warn("Wrong sampling rate, data will not be sampled out");
      samplingRate = 1;
    }
    this._samplingPercentage = Math.round(samplingRate * 100);
  }

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
    if (this._samplingPercentage == 100) {
      isSampledIn = true;
    } else if (this._samplingPercentage == 0) {
      isSampledIn = false;
    } else {
      if (!traceId) {
        isSampledIn = Math.random() * 100 < this._samplingPercentage;
      } else {
        isSampledIn = this._getSamplingHashCode(traceId) < this._samplingPercentage;
      }
    }
    // Add sample rate as span attribute
    attributes = attributes || {};
    attributes[AzureMonitorSampleRate] = this._samplingPercentage;
    return isSampledIn
      ? { decision: SamplingDecision.RECORD_AND_SAMPLED, attributes: attributes }
      : { decision: SamplingDecision.NOT_RECORD, attributes: attributes };
  }

  public toString(): string {
    return "ApplicationInsightsSampler";
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
