// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { mergeHistograms, summarize, mergeAttemptEvidence } from "./stats.mjs";

function utcMilliseconds(value) {
  const parsed = Date.parse(value);
  assert.ok(Number.isFinite(parsed), "Missing or invalid UTC timestamp");
  assert.equal(new Date(parsed).toISOString(), value);
  return parsed;
}

function validateResults(rows, expected) {
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
      for (const field of [
        "provenance",
        "repetition",
        "fixture_sha256",
        "config_target",
        "config_concurrency",
        "configuration_sha256",
        "environment",
      ]) {
        assert.deepEqual(row[field], cell[field], `Mismatched ${field}`);
      }
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
    let previousUtcEnd = utcMilliseconds(measurements[0].measurement_started_at_utc);
    for (const [index, row] of measurements.entries()) {
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
      ru_sum: measurements.reduce((total, row) => total + row.ru_sum, 0),
      attempt_evidence: attempts,
      measurement_started_at_utc: measurements[0].measurement_started_at_utc,
      measurement_ended_at_utc: measurements.at(-1).interval_ended_at_utc,
    };
  });
}

async function fetchReport(container, runId, expected) {
  const { resources } = await container.items
    .query({
      query: "SELECT * FROM c WHERE c.run_id = @run",
      parameters: [{ name: "@run", value: runId }],
    })
    .fetchAll();
  return validateResults(resources, expected);
}

export { validateResults, fetchReport };
