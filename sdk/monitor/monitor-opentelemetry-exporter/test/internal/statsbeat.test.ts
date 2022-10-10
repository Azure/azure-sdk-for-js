// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
// determine if I need to include sinon as a dependency for AzureMonitor
// import * as sinon from "sinon";
import { ExportResult } from "@opentelemetry/core";
import { AzureMonitorBaseExporter } from "../../src/export/base";
import { TelemetryItem as Envelope } from "../../src/generated";

describe("#AzureMonitorStatsbeat", () => {
  class TestExporter extends AzureMonitorBaseExporter {
    private thisAsAny: any;
    constructor() {
      super({
        connectionString: `instrumentationkey=foo-ikey`,
      });
      this.thisAsAny = this;
    }

    getTelemetryProcesors() {
      return this.thisAsAny._telemetryProcessors;
    }

    async exportEnvelopesPrivate(payload: Envelope[]): Promise<ExportResult> {
      return this.thisAsAny._exportEnvelopes(payload);
    }
  }

  // Example test
  it("should pass the options to the exporter", () => {
    const exporter = new TestExporter();
    assert.ok(exporter["_options"], "WHATEVER");
    assert.equal(false, true);
  });
});

// Test _computeMetadata

// Test statsbeatMetrics is created

// Test non_EU connection string (reference distro)

// Test EU connection string (reference distro)

// Test shortHost (reference distro)

// Test the resourceProvider propterty (reference distro)

// Create a base exporter here (this will initialize a StatsbeatExporter) within this test each of the counts
// Make sure to test that the output covers multiple statusCodes/exceptionTypes

// Test statsbeat shutdown after 3 failed attempts
