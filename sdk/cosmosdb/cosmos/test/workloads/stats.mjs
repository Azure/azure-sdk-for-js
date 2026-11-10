// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
const MAX_BUCKETS = 16384;
const MAX_ATTEMPT_GROUPS = 128;
const MAX_BUFFERED_INTERVALS = 256;
const MAX_BUFFERED_BUCKETS = MAX_BUFFERED_INTERVALS * MAX_BUCKETS;
const MAX_ARTIFACT_BYTES = 64 * 1024 * 1024;
const MAX_RESULT_BYTES = 2_000_000;

function aggregateIntervals(rows, backend) {
  assert.ok(rows.length > 0 && rows.length <= MAX_BUFFERED_INTERVALS);
  assert.ok(
    rows.reduce((total, row) => total + row.histogram_us.length, 0) <= MAX_BUFFERED_BUCKETS,
    "Deferred histogram capacity exceeded",
  );
  const histogram = mergeHistograms(rows.map((row) => row.histogram_us));
  const sum = (field) =>
    rows.reduce((total, row) => {
      assert.ok(Number.isFinite(row[field]) && row[field] >= 0, `Invalid ${field}`);
      const value = total + row[field];
      assert.ok(Number.isFinite(value), `${field} overflow`);
      return value;
    }, 0);
  for (const row of rows) assert.equal(row.errors, row.error_details.length);
  const attempts = rows.map((row) => row.attempt_evidence).filter((value) => value !== null);
  return {
    histogram_us: histogram,
    ...summarize(histogram),
    interval_count: rows.length,
    interval_duration_seconds: sum("interval_duration_seconds"),
    elapsed_seconds: rows.at(-1).elapsed_seconds,
    measurement_started_at_utc: rows[0].measurement_started_at_utc,
    interval_started_at_utc: rows[0].interval_started_at_utc,
    interval_ended_at_utc: rows.at(-1).interval_ended_at_utc,
    first_operation: rows[0].first_operation,
    errors: sum("errors"),
    error_details: rows.flatMap((row) =>
      row.error_details.map((error) => ({ ...error, interval_number: row.interval_number })),
    ),
    observed_429: sum("observed_429"),
    transport_verified_count: sum("transport_verified_count"),
    ru_sum: sum("ru_sum"),
    attempt_evidence: attempts.length ? mergeAttemptEvidence(attempts, backend) : null,
  };
}

class IntervalBuffer {
  constructor(maximumIntervals) {
    assert.ok(
      Number.isSafeInteger(maximumIntervals) &&
        maximumIntervals > 0 &&
        maximumIntervals <= MAX_BUFFERED_INTERVALS,
      "Deferred interval capacity exceeded",
    );
    this.maximumIntervals = maximumIntervals;
    this.snapshots = [];
    this.buckets = 0;
  }

  add(snapshot) {
    if (!snapshot) return;
    assert.ok(this.snapshots.length < this.maximumIntervals, "Deferred interval capacity exceeded");
    const buckets = this.buckets + snapshot.histogram_us.length;
    assert.ok(buckets <= MAX_BUFFERED_BUCKETS, "Deferred histogram capacity exceeded");
    this.snapshots.push(snapshot);
    this.buckets = buckets;
  }

  *drain() {
    for (let index = 0; index < this.snapshots.length; index++) {
      const snapshot = this.snapshots[index];
      this.snapshots[index] = null;
      yield snapshot;
    }
    this.snapshots = [];
    this.buckets = 0;
  }
}

function mergeAttemptGroups(lists) {
  const merged = new Map();
  for (const groups of lists) {
    addAttemptGroups(merged, groups);
  }
  return [...merged.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, group]) => group);
}

function addAttemptGroups(merged, groups) {
  assert.ok(Array.isArray(groups));
  for (const group of groups) {
    assert.ok(["metadata", "data_plane", "unknown"].includes(group.pipeline));
    assert.ok(["gateway", "gateway_v2", "unknown"].includes(group.transport));
    for (const field of ["status_code", "sub_status_code"]) {
      assert.ok(group[field] === null || (Number.isSafeInteger(group[field]) && group[field] >= 0));
    }
    assert.ok(group.status_code === null || group.status_code <= 599);
    assert.ok(Number.isSafeInteger(group.count) && group.count > 0);
    const key = JSON.stringify([
      group.pipeline,
      group.transport,
      group.status_code,
      group.sub_status_code,
    ]);
    assert.ok(
      merged.has(key) || merged.size < MAX_ATTEMPT_GROUPS,
      "Attempt evidence capacity exceeded",
    );
    const existing = merged.get(key);
    const total = (existing?.count ?? 0) + group.count;
    assert.ok(Number.isSafeInteger(total), "Attempt count overflow");
    if (existing) {
      existing.count = total;
    } else {
      merged.set(key, {
        pipeline: group.pipeline,
        transport: group.transport,
        status_code: group.status_code,
        sub_status_code: group.sub_status_code,
        count: total,
      });
    }
  }
}

function validateAttemptEvidence(record, backend) {
  const population = backend === "rust" ? "rust_retained_requests" : "javascript_failed_attempts";
  assert.ok(["rust", "javascript"].includes(backend));
  assert.equal(record?.population, population, "Attempt populations must not be mixed");
  assert.equal(record.coverage, "partial");
  assert.ok(Array.isArray(record.groups));
  for (const group of record.groups) {
    if (backend === "javascript") {
      assert.equal(group.pipeline, "unknown");
      assert.equal(group.transport, "unknown");
    } else {
      assert.notEqual(group.pipeline, "unknown");
      assert.notEqual(group.transport, "unknown");
    }
  }
  return population;
}

function mergeAttemptEvidence(records, backend) {
  assert.ok(records.length > 0);
  const population = validateAttemptEvidence(records[0], backend);
  for (const record of records.slice(1)) validateAttemptEvidence(record, backend);
  return {
    population,
    coverage: "partial",
    groups: mergeAttemptGroups(records.map((record) => record.groups)),
  };
}

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
  constructor(startSeconds, startUtcMs = Date.now()) {
    assert.ok(Number.isFinite(startSeconds) && Number.isFinite(startUtcMs));
    this.start = startSeconds;
    this.startUtcMs = startUtcMs;
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
    this.attemptPopulation = null;
    this.attemptGroups = new Map();
  }

  success(durationNs, evidence) {
    const us = Math.max(1, Number(durationNs / 1000n));
    assert.ok(Number.isSafeInteger(us));
    assert.ok(
      this.histogram.has(us) || this.histogram.size < MAX_BUCKETS,
      "Latency histogram capacity exceeded",
    );
    const population = validateAttemptEvidence(
      evidence.attemptEvidence,
      evidence.transportVerified ? "rust" : "javascript",
    );
    assert.ok(this.attemptPopulation === null || this.attemptPopulation === population);
    addAttemptGroups(this.attemptGroups, evidence.attemptEvidence.groups);
    this.histogram.set(us, (this.histogram.get(us) || 0) + 1);
    this.ru += evidence.requestCharge;
    this.observed429 += evidence.observed429;
    this.transportVerified += Number(evidence.transportVerified);
    this.attemptPopulation = population;
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
      measurement_started_at_utc: new Date(this.startUtcMs).toISOString(),
      interval_started_at_utc: new Date(
        this.startUtcMs + (this.last - this.start) * 1000,
      ).toISOString(),
      interval_ended_at_utc: new Date(
        this.startUtcMs + (nowSeconds - this.start) * 1000,
      ).toISOString(),
      histogram_us: [...this.histogram],
      errors: this.errors.length,
      error_details: this.errors,
      ru_sum: this.ru,
      observed_429: this.observed429,
      transport_verified_count: this.transportVerified,
      attempt_evidence:
        this.attemptPopulation === null
          ? null
          : {
              population: this.attemptPopulation,
              coverage: "partial",
              groups: [...this.attemptGroups.values()],
            },
      first_operation: this.first,
    };
    this.last = nowSeconds;
    this.reset();
    return result;
  }
}

export {
  Stats,
  summarize,
  mergeHistograms,
  mergeAttemptGroups,
  mergeAttemptEvidence,
  MAX_BUCKETS,
  MAX_ATTEMPT_GROUPS,
  IntervalBuffer,
  MAX_BUFFERED_INTERVALS,
  MAX_BUFFERED_BUCKETS,
  MAX_ARTIFACT_BYTES,
  MAX_RESULT_BYTES,
  aggregateIntervals,
};
