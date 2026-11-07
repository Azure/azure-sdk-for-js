// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { appendFileSync } from "node:fs";
import { summarize } from "./stats.mjs";

class Reporter {
  constructor(container, identity, logfile) {
    this.container = container;
    this.identity = identity;
    this.logfile = logfile;
    this.intervals = 0;
    this.count = 0;
    this.errors = 0;
    this.throttled = 0;
    this.failed = false;
  }

  async write(record) {
    assert.ok(!this.failed, "Earlier reporting failed");
    const document = { ...this.identity, ...record };
    try {
      const response = await this.container.items.create(document);
      assert.ok(!this.failed, "Reporting deadline expired");
      assert.equal(response.statusCode, 201, "Result record was not created");
      if (this.logfile) appendFileSync(this.logfile, `${JSON.stringify(document)}\n`);
    } catch (error) {
      this.failed = true;
      throw error;
    }
  }

  async interval(snapshot) {
    assert.ok(!this.failed, "Earlier reporting failed");
    assert.equal(snapshot.interval_number, this.intervals + 1);
    assert.equal(snapshot.errors, snapshot.error_details.length);
    const statistics = summarize(snapshot.histogram_us);
    const { error_details: details, ...measurement } = snapshot;
    const intervalId = `${this.identity.process_id}-${snapshot.interval_number}`;
    await this.write({
      ...measurement,
      ...statistics,
      operation: "ReadItem",
      record_type: "measurement",
      id: `${intervalId}-measurement`,
      interval_id: intervalId,
    });
    for (let index = 0; index < details.length; index++) {
      await this.write({
        ...details[index],
        operation: "ReadItem",
        record_type: "error",
        id: `${intervalId}-error-${index}`,
        interval_id: intervalId,
      });
    }
    this.intervals++;
    this.count += statistics.count;
    this.errors += snapshot.errors;
    this.throttled += snapshot.observed_429;
  }

  async complete(valid) {
    assert.ok(!this.failed, "Reporting failure prevents completion");
    const usable = valid && this.count > 0 && this.errors === 0 && this.throttled === 0;
    await this.write({
      id: `${this.identity.process_id}-completion`,
      record_type: "completion",
      interval_count: this.intervals,
      summary_count: this.intervals,
      total_count: this.count,
      total_errors: this.errors,
      observed_429: this.throttled,
      valid: usable,
    });
    return usable;
  }
}

export { Reporter };
