// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { AzureMonitorOpenTelemetryClient } from "../../../src/client";
import { AzureMonitorOpenTelemetryConfig } from "../../../src/shared";

describe("AzureMonitorOpenTelemetryClient", () => {
  it("constructor", () => {
    let config = new AzureMonitorOpenTelemetryConfig();
    config.azureMonitorExporterConfig = {
      connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
    };
    const client = new AzureMonitorOpenTelemetryClient(config);
    assert.notStrictEqual(client, true);
    // TODO: Add tests
  });
});
