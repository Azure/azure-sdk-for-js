// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { openSync, writeFileSync, fsyncSync, closeSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import {
  summarize,
  aggregateIntervals,
  MAX_BUFFERED_INTERVALS,
  MAX_BUFFERED_BUCKETS,
  MAX_ARTIFACT_BYTES,
  MAX_RESULT_BYTES,
} from "./stats.mjs";
import { sha256 } from "./common.mjs";
import { validateIntervalResults } from "./report.mjs";
import { validateReadProfiles } from "./profiling.mjs";

function encodeResult(document) {
  const bytes = Buffer.from(`${JSON.stringify(document)}\n`);
  assert.ok(bytes.length - 1 <= MAX_RESULT_BYTES, "Result document exceeds the UTF-8 size limit");
  return bytes;
}

function appendDurably(filename, bytes, flag) {
  const fd = openSync(filename, flag, 0o600);
  try {
    writeFileSync(fd, bytes);
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
}

class Reporter {
  constructor(container, identity, logfile) {
    assert.equal(identity.reporting_format, "aggregate_v1");
    assert.ok(
      typeof logfile === "string" && path.isAbsolute(logfile),
      "A local result path is required",
    );
    assert.match(identity.workload_id, /^[A-Za-z0-9-]+$/);
    this.container = container;
    this.identity = identity;
    this.logfile = logfile;
    this.artifactFile = path.join(path.dirname(logfile), `${identity.workload_id}.intervals.jsonl`);
    this.intervals = 0;
    this.profileOperations = 0;
    this.buckets = 0;
    this.artifactBytes = 0;
    this.artifactHash = createHash("sha256");
    this.failed = false;
    this.aborted = false;
    this.completing = false;
    this.writes = [];
  }

  async write(record) {
    assert.ok(!this.failed, "Earlier reporting failed");
    const document = { ...this.identity, ...record };
    const bytes = encodeResult(document);
    try {
      const response = await this.container.items.create(document);
      assert.ok(!this.failed, "Reporting deadline expired");
      assert.equal(response.statusCode, 201, "Result record was not created");
      assert.ok(
        Number.isFinite(response.requestCharge) && response.requestCharge >= 0,
        "Missing reporting request charge",
      );
      this.writes.push({
        id: document.id,
        record_type: document.record_type,
        request_charge: response.requestCharge,
        utf8_bytes: bytes.length - 1,
      });
      appendDurably(this.logfile, bytes, this.writes.length === 1 ? "wx" : "a");
      return response.requestCharge;
    } catch (error) {
      this.failed = true;
      throw error;
    }
  }

  async interval(snapshot) {
    assert.ok(!this.failed && !this.completing, "Reporting is failed or already completing");
    try {
      assert.equal(snapshot.interval_number, this.intervals + 1);
      assert.equal(snapshot.errors, snapshot.error_details.length);
      const profileOperations = validateReadProfiles(
        snapshot,
        this.identity.config_backend,
        this.identity.profiling_mode,
        this.profileOperations,
      );
      assert.ok(this.intervals < MAX_BUFFERED_INTERVALS, "Deferred interval capacity exceeded");
      const buckets = this.buckets + snapshot.histogram_us.length;
      assert.ok(buckets <= MAX_BUFFERED_BUCKETS, "Deferred histogram capacity exceeded");
      const intervalId = `${this.identity.process_id}-${snapshot.interval_number}`;
      const document = {
        ...snapshot,
        ...this.identity,
        ...summarize(snapshot.histogram_us),
        operation: "ReadItem",
        record_type: "measurement",
        id: `${intervalId}-measurement`,
        interval_id: intervalId,
      };
      const bytes = Buffer.from(`${JSON.stringify(document)}\n`);
      assert.ok(
        this.artifactBytes + bytes.length <= MAX_ARTIFACT_BYTES,
        "Interval artifact capacity exceeded",
      );
      appendDurably(this.artifactFile, bytes, this.intervals === 0 ? "wx" : "a");
      this.artifactHash.update(bytes);
      this.artifactBytes += bytes.length;
      this.buckets = buckets;
      this.intervals++;
      this.profileOperations = profileOperations;
    } catch (error) {
      this.failed = true;
      throw error;
    }
  }

  async complete(valid) {
    assert.ok(
      !this.failed && !this.completing,
      "Reporting failure or duplicate completion prevents completion",
    );
    this.completing = true;
    try {
      assert.ok(this.intervals > 0, "Missing interval artifact prevents completion");
      assert.equal(
        statSync(this.artifactFile).size,
        this.artifactBytes,
        "Interval artifact length changed",
      );
      const bytes = readFileSync(this.artifactFile);
      assert.equal(bytes.length, this.artifactBytes, "Interval artifact length changed");
      const digest = this.artifactHash.digest("hex");
      assert.equal(sha256(bytes), digest, "Interval artifact changed");
      const rows = bytes.toString("utf8").trimEnd().split("\n").map(JSON.parse);
      assert.equal(rows.length, this.intervals);
      const aggregate = aggregateIntervals(rows, this.identity.config_backend);
      const artifact = {
        filename: path.basename(this.artifactFile),
        sha256: digest,
        bytes: bytes.length,
        interval_count: this.intervals,
      };
      const usable =
        valid && aggregate.count > 0 && aggregate.errors === 0 && aggregate.observed_429 === 0;
      const completion = {
        id: `${this.identity.process_id}-completion`,
        record_type: "completion",
        interval_count: this.intervals,
        summary_count: 1,
        total_count: aggregate.count,
        total_errors: aggregate.errors,
        observed_429: aggregate.observed_429,
        attempt_evidence: aggregate.attempt_evidence,
        interval_artifact: artifact,
        completed_at_utc: new Date().toISOString(),
        valid: usable,
      };
      if (usable) {
        validateIntervalResults(
          [...rows, { ...this.identity, ...completion, summary_count: this.intervals }],
          [this.identity],
        );
      }
      const measurement = {
        ...aggregate,
        id: `${this.identity.process_id}-measurement`,
        operation: "ReadItem",
        record_type: "measurement",
        interval_artifact: artifact,
      };
      encodeResult({ ...this.identity, ...measurement });
      encodeResult({
        ...this.identity,
        ...completion,
        measurement_write_ru: Number.MAX_VALUE,
      });
      const charge = await this.write(measurement);
      const completedValid = usable && !this.aborted;
      await this.write({
        ...completion,
        completed_at_utc: new Date().toISOString(),
        measurement_write_ru: charge,
        valid: completedValid,
      });
      return completedValid && !this.aborted;
    } catch (error) {
      this.failed = true;
      throw error;
    }
  }
}

export { Reporter };
