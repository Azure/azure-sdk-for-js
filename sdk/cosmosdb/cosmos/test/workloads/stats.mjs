// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
const MAX_BUCKETS = 16384;

function mergeHistograms(histograms) {
  const merged = new Map();
  for (const histogram of histograms) {
    assert.ok(Array.isArray(histogram));
    const seen = new Set();
    for (const [microseconds, count] of histogram) {
      assert.ok(Number.isSafeInteger(microseconds) && microseconds >= 1);
      assert.ok(Number.isSafeInteger(count) && count > 0);
      assert.ok(!seen.has(microseconds), "Duplicate histogram bucket");
      seen.add(microseconds);
      const total = (merged.get(microseconds) || 0) + count;
      assert.ok(Number.isSafeInteger(total), "Histogram count overflow");
      merged.set(microseconds, total);
    }
  }
  return [...merged].sort((a, b) => a[0] - b[0]);
}

function summarize(histogram) {
  const sorted = mergeHistograms([histogram]);
  const count = sorted.reduce((total, [, n]) => total + n, 0);
  assert.ok(Number.isSafeInteger(count), "Histogram count overflow");
  if (!count) {
    return { count: 0, min_ms: null, max_ms: null, mean_ms: null, p50_ms: null, p99_ms: null };
  }
  function percentile(percent) {
    const rank = Math.ceil((count * percent) / 100);
    let accumulated = 0;
    for (const [us, n] of sorted) {
      accumulated += n;
      if (accumulated >= rank) return us / 1000;
    }
    throw new Error("Invalid histogram rank");
  }
  return {
    count,
    min_ms: sorted[0][0] / 1000,
    max_ms: sorted[sorted.length - 1][0] / 1000,
    mean_ms: sorted.reduce((sum, [us, n]) => sum + us * n, 0) / count / 1000,
    p50_ms: percentile(50),
    p99_ms: percentile(99),
  };
}

class Stats {
  constructor(startSeconds) {
    this.start = startSeconds;
    this.last = startSeconds;
    this.interval = 0;
    this.first = null;
    this.reset();
  }

  reset() {
    this.histogram = new Map();
    this.errors = [];
    this.ru = 0;
    this.observed429 = 0;
    this.transportVerified = 0;
  }

  success(durationNs, evidence) {
    const us = Math.max(1, Number(durationNs / 1000n));
    assert.ok(Number.isSafeInteger(us));
    assert.ok(
      this.histogram.has(us) || this.histogram.size < MAX_BUCKETS,
      "Latency histogram capacity exceeded",
    );
    this.histogram.set(us, (this.histogram.get(us) || 0) + 1);
    this.ru += evidence.requestCharge;
    this.observed429 += evidence.observed429;
    this.transportVerified += Number(evidence.transportVerified);
    this.first ??= { outcome: "success", duration_ms: Number(durationNs) / 1e6 };
  }

  failure(durationNs, error) {
    assert.ok(this.errors.length < 50, "Error detail capacity exceeded");
    this.errors.push({ ...error, duration_ms: Number(durationNs) / 1e6 });
    this.first ??= { outcome: "failure", duration_ms: Number(durationNs) / 1e6 };
  }

  drain(nowSeconds) {
    if (!this.histogram.size && !this.errors.length) return null;
    assert.ok(nowSeconds > this.last);
    const result = {
      interval_number: ++this.interval,
      interval_duration_seconds: nowSeconds - this.last,
      elapsed_seconds: nowSeconds - this.start,
      histogram_us: [...this.histogram],
      errors: this.errors.length,
      error_details: this.errors,
      ru_sum: this.ru,
      observed_429: this.observed429,
      transport_verified_count: this.transportVerified,
      first_operation: this.first,
    };
    this.last = nowSeconds;
    this.reset();
    return result;
  }
}

export { Stats, summarize, mergeHistograms, MAX_BUCKETS };
