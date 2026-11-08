// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import {
  mergeHistograms,
  summarize,
  mergeAttemptEvidence,
  aggregateIntervals,
  MAX_ARTIFACT_BYTES,
  MAX_BUFFERED_INTERVALS,
} from "./stats.mjs";
import { sha256 } from "./common.mjs";
import { validateReadProfiles } from "./profiling.mjs";

function utcMilliseconds(value) {
  const parsed = Date.parse(value);
  assert.ok(Number.isFinite(parsed), "Missing or invalid UTC timestamp");
  assert.equal(new Date(parsed).toISOString(), value);
  return parsed;
}

function validateIntervalResults(rows, expected) {
  assert.equal(new Set(rows.map((row) => row.id)).size, rows.length, "Duplicate result IDs");
  assert.ok(
    rows.every((row) => expected.some((cell) => cell.workload_id === row.workload_id)),
    "Unexpected workload",
  );
  return expected.map((cell) => {
    const selected = rows.filter((row) => row.workload_id === cell.workload_id);
    assert.ok(
      selected.every(
        (row) =>
          row.process_id === cell.process_id &&
          row.partition_key === cell.process_id &&
          row.config_backend === cell.config_backend &&
          row.run_id === cell.run_id,
      ),
    );
    for (const row of selected) {
      for (const [field, value] of Object.entries(cell)) {
        assert.deepEqual(row[field], value, `Mismatched ${field}`);
      }
      assert.equal(row.reporting_format, cell.reporting_format, "Mismatched reporting_format");
    }
    const completed = selected.filter((row) => row.record_type === "completion");
    const measurements = selected
      .filter((row) => row.record_type === "measurement")
      .sort((a, b) => a.interval_number - b.interval_number);
    const errors = selected.filter((row) => row.record_type === "error");
    assert.equal(selected.length, completed.length + measurements.length + errors.length);
    assert.equal(completed.length, 1, "Missing or duplicate completion");
    const completion = completed[0];
    utcMilliseconds(completion.completed_at_utc);
    assert.equal(completion.valid, true, "Sequence is not a usable comparison");
    assert.ok(measurements.length > 0);
    assert.equal(completion.interval_count, measurements.length);
    assert.equal(completion.summary_count, measurements.length);
    let intervalEnd = 0;
    let profileOperations = 0;
    let previousUtcEnd = utcMilliseconds(measurements[0].measurement_started_at_utc);
    for (const [index, row] of measurements.entries()) {
      profileOperations = validateReadProfiles(
        row,
        cell.config_backend,
        cell.profiling_mode,
        profileOperations,
      );
      assert.equal(row.operation, "ReadItem");
      assert.equal(row.interval_number, index + 1);
      assert.equal(row.interval_id, `${cell.process_id}-${index + 1}`);
      assert.ok(
        Number.isFinite(row.interval_duration_seconds) && row.interval_duration_seconds > 0,
      );
      intervalEnd += row.interval_duration_seconds;
      assert.ok(Math.abs(row.elapsed_seconds - intervalEnd) < 1e-6, "Reporting interval gap");
      assert.equal(row.measurement_started_at_utc, measurements[0].measurement_started_at_utc);
      assert.equal(utcMilliseconds(row.interval_started_at_utc), previousUtcEnd);
      const utcEnd = utcMilliseconds(row.interval_ended_at_utc);
      assert.ok(Math.abs(utcEnd - previousUtcEnd - row.interval_duration_seconds * 1000) <= 2);
      previousUtcEnd = utcEnd;
      assert.deepEqual(row.first_operation, measurements[0].first_operation);
      assert.equal(row.first_operation.outcome, "success");
      assert.ok(
        Number.isFinite(row.first_operation.duration_ms) && row.first_operation.duration_ms >= 0,
      );
      assert.ok(Number.isFinite(row.ru_sum) && row.ru_sum >= 0);
      assert.equal(row.count, summarize(row.histogram_us).count);
      assert.equal(row.errors, 0);
      assert.equal(row.observed_429, 0);
      assert.equal(row.transport_verified_count, cell.config_backend === "rust" ? row.count : 0);
      const evidence = mergeAttemptEvidence([row.attempt_evidence], cell.config_backend);
      assert.equal(
        evidence.groups
          .filter((group) => group.status_code === 429)
          .reduce((total, group) => total + group.count, 0),
        row.observed_429,
      );
      if (cell.config_backend === "rust") {
        assert.ok(
          evidence.groups
            .filter(
              (group) =>
                group.pipeline === "data_plane" &&
                group.transport === "gateway_v2" &&
                group.status_code === 200,
            )
            .reduce((total, group) => total + group.count, 0) >= row.count,
        );
      }
    }
    const summary = summarize(mergeHistograms(measurements.map((row) => row.histogram_us)));
    assert.ok(summary.count > 0);
    assert.equal(completion.total_count, summary.count);
    assert.equal(completion.total_errors, 0);
    assert.equal(completion.observed_429, 0);
    assert.equal(errors.length, 0);
    const attempts = mergeAttemptEvidence(
      measurements.map((row) => row.attempt_evidence),
      cell.config_backend,
    );
    assert.deepEqual(completion.attempt_evidence, attempts);
    const elapsed = measurements.reduce((total, row) => total + row.interval_duration_seconds, 0);
    return {
      workload_id: cell.workload_id,
      backend: cell.config_backend,
      repetition: cell.repetition,
      ...summary,
      interval_seconds: elapsed,
      completions_per_second: summary.count / elapsed,
      first_operation: measurements[0].first_operation,
      reporting_mode: cell.reporting_mode,
      ...(cell.profiling_mode !== undefined ? { profiling_mode: cell.profiling_mode } : {}),
      ru_sum: measurements.reduce((total, row) => total + row.ru_sum, 0),
      attempt_evidence: attempts,
      measurement_started_at_utc: measurements[0].measurement_started_at_utc,
      measurement_ended_at_utc: measurements.at(-1).interval_ended_at_utc,
    };
  });
}

function validateResults(rows, expected, artifactDirectory) {
  assert.equal(new Set(rows.map((row) => row.id)).size, rows.length, "Duplicate result IDs");
  assert.ok(
    rows.every((row) => expected.some((cell) => cell.workload_id === row.workload_id)),
    "Unexpected workload",
  );
  return expected.map((cell) => {
    const selected = rows.filter((row) => row.workload_id === cell.workload_id);
    if (cell.reporting_format === undefined) return validateIntervalResults(selected, [cell])[0];
    assert.equal(cell.reporting_format, "aggregate_v1", "Unsupported reporting format");
    assert.equal(selected.length, 2, "Expected one aggregate measurement and one completion");
    const measurements = selected.filter((row) => row.record_type === "measurement");
    const completions = selected.filter((row) => row.record_type === "completion");
    assert.equal(measurements.length, 1);
    assert.equal(completions.length, 1);
    const measurement = measurements[0];
    const completion = completions[0];
    for (const row of selected) {
      for (const [field, value] of Object.entries(cell)) {
        assert.deepEqual(row[field], value, `Mismatched ${field}`);
      }
    }
    assert.equal(measurement.id, `${cell.process_id}-measurement`);
    assert.equal(completion.id, `${cell.process_id}-completion`);
    assert.equal(measurement.operation, "ReadItem");
    assert.equal(
      measurement.interval_number,
      undefined,
      "Aggregate cannot masquerade as an interval",
    );
    assert.equal(completion.summary_count, 1);
    assert.equal(completion.valid, true, "Sequence is not a usable comparison");
    assert.ok(
      Number.isFinite(completion.measurement_write_ru) && completion.measurement_write_ru >= 0,
    );
    const artifact = measurement.interval_artifact;
    assert.deepEqual(completion.interval_artifact, artifact);
    assert.equal(artifact.filename, `${cell.workload_id}.intervals.jsonl`);
    assert.match(cell.workload_id, /^[A-Za-z0-9-]+$/);
    assert.match(artifact.sha256, /^[a-f0-9]{64}$/);
    assert.ok(
      Number.isSafeInteger(artifact.bytes) &&
        artifact.bytes > 0 &&
        artifact.bytes <= MAX_ARTIFACT_BYTES,
    );
    assert.ok(
      Number.isSafeInteger(artifact.interval_count) &&
        artifact.interval_count > 0 &&
        artifact.interval_count <= MAX_BUFFERED_INTERVALS,
    );
    assert.equal(completion.interval_count, artifact.interval_count);
    assert.ok(typeof artifactDirectory === "string", "Interval artifact directory is required");
    const filename = path.join(artifactDirectory, artifact.filename);
    assert.equal(statSync(filename).size, artifact.bytes, "Interval artifact length changed");
    const bytes = readFileSync(filename);
    assert.equal(bytes.length, artifact.bytes, "Interval artifact length changed");
    assert.equal(sha256(bytes), artifact.sha256, "Interval artifact hash changed");
    const intervals = bytes.toString("utf8").trimEnd().split("\n").map(JSON.parse);
    assert.equal(intervals.length, artifact.interval_count);
    const aggregate = aggregateIntervals(intervals, cell.config_backend);
    for (const [field, value] of Object.entries(aggregate)) {
      assert.deepEqual(
        measurement[field],
        value,
        `Aggregate differs from interval artifact: ${field}`,
      );
    }
    const summary = validateIntervalResults(
      [...intervals, { ...completion, summary_count: intervals.length }],
      [cell],
    )[0];
    return {
      ...summary,
      reporting_format: cell.reporting_format,
      interval_artifact: artifact,
      measurement_write_ru: completion.measurement_write_ru,
    };
  });
}

async function fetchReport(container, runId, expected, artifactDirectory) {
  const { resources } = await container.items
    .query({
      query: "SELECT * FROM c WHERE c.run_id = @run",
      parameters: [{ name: "@run", value: runId }],
    })
    .fetchAll();
  return validateResults(resources, expected, artifactDirectory);
}

export { validateResults, validateIntervalResults, fetchReport };
