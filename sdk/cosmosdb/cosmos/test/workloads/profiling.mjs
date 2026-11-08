// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";

const MAX_PROFILE_READS = 100000;
const wrapperFields = [
  "nativeCallStartMs",
  "nativeCallEndMs",
  "decodedAtMs",
  "parsedAtMs",
  "responseReadyAtMs",
  "adapterEndMs",
];
const nativeFields = [
  "dispatchMs",
  "resolveContainerMs",
  "driverOperationMs",
  "responsePreparationMs",
  "completionMs",
  "elapsedMs",
];
const wrapperKeys = new Set([...wrapperFields, "native"]);
const nativeStageFields = nativeFields.slice(0, -1);

function nonnegative(value) {
  assert.ok(Number.isFinite(value) && value >= 0, "Invalid profiling duration");
  return value;
}

function copyRustProfile(value, successful) {
  if (!successful && value === undefined) return undefined;
  assert.ok(value && typeof value === "object", "Missing Rust read profile");
  assert.ok(Object.keys(value).every((key) => wrapperKeys.has(key)));
  const copy = {};
  let previous = 0;
  for (const field of wrapperFields) {
    if (value[field] === undefined && !successful) continue;
    const time = nonnegative(value[field]);
    assert.ok(time >= previous, "Non-monotonic wrapper profile");
    copy[field] = time;
    previous = time;
  }
  if (successful || value.native !== undefined) {
    assert.equal(Object.keys(value.native ?? {}).length, nativeFields.length);
    copy.native = {};
    for (const field of nativeFields) copy.native[field] = nonnegative(value.native[field]);
    const total = nativeStageFields.reduce((sum, field) => sum + copy.native[field], 0);
    assert.ok(Math.abs(total - copy.native.elapsedMs) < 1e-6, "Native stages do not reconcile");
  }
  return copy;
}

function validateReadProfiles(snapshot, backend, mode, previousOperation = 0) {
  assert.ok(
    mode === undefined || mode === "none" || mode === "stages_v1",
    "Unknown profiling mode",
  );
  if (mode !== "stages_v1") {
    assert.equal(snapshot.read_profiles, undefined, "Unprofiled run contains read profiles");
    return previousOperation;
  }
  const profiles = snapshot.read_profiles;
  assert.ok(Array.isArray(profiles), "Missing per-read profiles");
  let operation = previousOperation;
  const histogram = new Map();
  let failures = 0;
  let previousStart = -Infinity;
  for (const profile of profiles) {
    assert.deepEqual(
      Object.keys(profile).sort(),
      [
        "operation",
        "started_seconds",
        "public_ms",
        "duration_us",
        "validation_ms",
        "statistics_ms",
        "outcome",
        ...(backend === "rust" && profile.rust !== undefined ? ["rust"] : []),
      ].sort(),
    );
    assert.equal(profile.operation, ++operation, "Profiling operation gap");
    assert.ok(operation <= MAX_PROFILE_READS, "Read profiling capacity exceeded");
    for (const field of ["started_seconds", "public_ms", "validation_ms", "statistics_ms"]) {
      nonnegative(profile[field]);
    }
    assert.ok(profile.started_seconds >= previousStart);
    assert.ok(
      profile.started_seconds >=
        snapshot.elapsed_seconds - snapshot.interval_duration_seconds - 1e-6,
    );
    assert.ok(profile.started_seconds <= snapshot.elapsed_seconds + 1e-6);
    assert.ok(
      profile.started_seconds + profile.public_ms / 1000 <= snapshot.elapsed_seconds + 1e-6,
    );
    previousStart = profile.started_seconds;
    assert.ok(Number.isSafeInteger(profile.duration_us) && profile.duration_us >= 1);
    assert.ok(Math.abs(profile.public_ms * 1000 - profile.duration_us) < 1.00001);
    assert.ok(["success", "failure"].includes(profile.outcome));
    if (profile.outcome === "success") {
      histogram.set(profile.duration_us, (histogram.get(profile.duration_us) ?? 0) + 1);
    } else failures++;
    if (backend === "rust") {
      const rust = copyRustProfile(profile.rust, profile.outcome === "success");
      if (rust?.adapterEndMs !== undefined) {
        assert.ok(
          rust.adapterEndMs <= profile.public_ms + 0.01,
          "Wrapper exceeds the public read span",
        );
      }
      if (rust?.native) {
        assert.ok(
          rust.native.elapsedMs <= rust.nativeCallEndMs - rust.nativeCallStartMs + 0.01,
          "Native elapsed time exceeds the JS native-await span",
        );
      }
    } else assert.equal(profile.rust, undefined);
  }
  assert.equal(failures, snapshot.errors);
  assert.deepEqual(
    [...histogram].sort((a, b) => a[0] - b[0]),
    [...snapshot.histogram_us].sort((a, b) => a[0] - b[0]),
    "Per-read profiles differ from the latency histogram",
  );
  return operation;
}

export { MAX_PROFILE_READS, copyRustProfile, validateReadProfiles };
