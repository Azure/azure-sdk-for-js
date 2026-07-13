// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { Attributes } from "@opentelemetry/api";
import { context, trace, ROOT_CONTEXT, SpanKind, TraceFlags } from "@opentelemetry/api";
import type {
  ReadableSpan,
  Sampler,
  SamplingResult,
  SpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { SamplingDecision } from "@opentelemetry/sdk-trace-base";
import {
  ApplicationInsightsSampler,
  AzureMonitorSamplingSpanProcessor,
  createAzureMonitorSampler,
  RateLimitedSampler,
} from "../../src/index.js";
import { AzureMonitorSampleRate } from "../../src/utils/constants/applicationinsights.js";

function makeSpan(traceId: string, spanId: string, attributes: Attributes = {}): any {
  return {
    name: "span",
    kind: SpanKind.INTERNAL,
    links: [],
    attributes,
    spanContext: () => ({
      traceId,
      spanId,
      traceFlags: TraceFlags.SAMPLED,
      isRemote: false,
    }),
  };
}

class RecordingProcessor implements SpanProcessor {
  public started: ReadableSpan[] = [];
  public ended: ReadableSpan[] = [];
  public flushed = 0;
  public didShutdown = false;

  onStart(span: any): void {
    this.started.push(span);
  }
  onEnd(span: ReadableSpan): void {
    this.ended.push(span);
  }
  forceFlush(): Promise<void> {
    this.flushed++;
    return Promise.resolve();
  }
  shutdown(): Promise<void> {
    this.didShutdown = true;
    return Promise.resolve();
  }
}

describe("createAzureMonitorSampler", () => {
  it("returns a RateLimitedSampler when tracesPerSecond > 0", () => {
    const sampler = createAzureMonitorSampler({ tracesPerSecond: 5 });
    assert.instanceOf(sampler, RateLimitedSampler);
  });

  it("returns an ApplicationInsightsSampler when tracesPerSecond is 0", () => {
    const sampler = createAzureMonitorSampler({ tracesPerSecond: 0, samplingRatio: 0.3 });
    assert.instanceOf(sampler, ApplicationInsightsSampler);
    assert.equal(sampler.toString(), "ApplicationInsightsSampler{0.3}");
  });

  it("defaults to a 100% ApplicationInsightsSampler when no options are provided", () => {
    const sampler = createAzureMonitorSampler();
    assert.instanceOf(sampler, ApplicationInsightsSampler);
    assert.equal(sampler.toString(), "ApplicationInsightsSampler{1}");
  });
});

describe("AzureMonitorSamplingSpanProcessor", () => {
  it("forwards every span to the delegate at 100% sampling", () => {
    const delegate = new RecordingProcessor();
    const processor = new AzureMonitorSamplingSpanProcessor(
      delegate,
      new ApplicationInsightsSampler(1),
    );
    const span = makeSpan("1234567890abcdef1234567890abcdef", "1234567890abcdef");

    processor.onStart(span, ROOT_CONTEXT);
    processor.onEnd(span);

    assert.equal(delegate.ended.length, 1);
    // No sampling applied => original span forwarded unchanged (no proxy).
    assert.strictEqual(delegate.ended[0], span);
    assert.isUndefined(delegate.ended[0].attributes[AzureMonitorSampleRate]);
  });

  it("drops spans that are sampled out and never forwards them", () => {
    const delegate = new RecordingProcessor();
    const processor = new AzureMonitorSamplingSpanProcessor(
      delegate,
      new ApplicationInsightsSampler(0),
    );
    const span = makeSpan("1234567890abcdef1234567890abcdef", "1234567890abcdef");

    processor.onStart(span, ROOT_CONTEXT);
    processor.onEnd(span);

    assert.equal(delegate.ended.length, 0);
  });

  it("stamps the sample rate on a proxy without mutating the original span", () => {
    const delegate = new RecordingProcessor();
    const processor = new AzureMonitorSamplingSpanProcessor(
      delegate,
      new ApplicationInsightsSampler(0.5),
    );
    // Trace id "a" hashes below 50 => sampled in at 50%.
    const originalAttributes: Attributes = { existing: "value" };
    const span = makeSpan("a", "1234567890abcdef", originalAttributes);

    processor.onStart(span, ROOT_CONTEXT);
    processor.onEnd(span);

    assert.equal(delegate.ended.length, 1);
    const forwarded = delegate.ended[0];
    // Forwarded span carries the sample rate for ingestion item counting...
    assert.equal(forwarded.attributes[AzureMonitorSampleRate], 50);
    assert.equal(forwarded.attributes["existing"], "value");
    assert.equal(forwarded.spanContext().traceId, "a");
    // ...but the original span (shared with other exporters) is untouched.
    assert.isUndefined(originalAttributes[AzureMonitorSampleRate]);
    assert.notStrictEqual(forwarded, span);
  });

  it("lets a child span inherit the sampling decision of its in-process parent", () => {
    let calls = 0;
    const toggleSampler: Sampler = {
      shouldSample(): SamplingResult {
        calls++;
        // Parent (first fresh decision) => in; any further fresh decision => out.
        return {
          decision: calls === 1 ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD,
          attributes: {},
        };
      },
    };
    const delegate = new RecordingProcessor();
    const processor = new AzureMonitorSamplingSpanProcessor(delegate, toggleSampler);

    const parent = makeSpan("parenttrace", "parentspan00000");
    processor.onStart(parent, ROOT_CONTEXT);
    const childContext = trace.setSpan(ROOT_CONTEXT, parent);
    const child = makeSpan("childtrace0", "childspan000000");
    processor.onStart(child, childContext);

    processor.onEnd(child);
    processor.onEnd(parent);

    // Sampler consulted only once (for the parent); the child inherited.
    assert.equal(calls, 1);
    assert.equal(delegate.ended.length, 2);
  });

  it("makes an independent decision for a root span with no tracked parent", () => {
    let calls = 0;
    const toggleSampler: Sampler = {
      shouldSample(): SamplingResult {
        calls++;
        return {
          decision: calls === 1 ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD,
          attributes: {},
        };
      },
    };
    const delegate = new RecordingProcessor();
    const processor = new AzureMonitorSamplingSpanProcessor(delegate, toggleSampler);

    const first = makeSpan("firsttrace0", "firstspan000000");
    processor.onStart(first, ROOT_CONTEXT);
    const second = makeSpan("secondtrace", "secondspan00000");
    processor.onStart(second, ROOT_CONTEXT);

    processor.onEnd(first);
    processor.onEnd(second);

    assert.equal(calls, 2);
    // first sampled in, second sampled out.
    assert.equal(delegate.ended.length, 1);
    assert.equal(delegate.ended[0].spanContext().spanId, "firstspan000000");
  });

  it("delegates forceFlush and shutdown", async () => {
    const delegate = new RecordingProcessor();
    const processor = new AzureMonitorSamplingSpanProcessor(
      delegate,
      new ApplicationInsightsSampler(1),
    );

    await processor.forceFlush();
    await processor.shutdown();

    assert.equal(delegate.flushed, 1);
    assert.isTrue(delegate.didShutdown);
  });

  it("forwards the original span when the sampler leaves the sample rate at 100", () => {
    const delegate = new RecordingProcessor();
    // context.active() is ROOT here; ensures no accidental parent lookup issues.
    const processor = new AzureMonitorSamplingSpanProcessor(
      delegate,
      new ApplicationInsightsSampler(1),
    );
    const span = makeSpan("1234567890abcdef1234567890abcdef", "1234567890abcdef");

    processor.onStart(span, context.active());
    processor.onEnd(span);

    assert.strictEqual(delegate.ended[0], span);
  });
});
