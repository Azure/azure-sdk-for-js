// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { useAzureMonitor } from "../../../src/index";
import { InternalConfig } from "../../../src/shared/config";

describe("Main functions", () => {
  it("useAzureMonitor", () => {
    let config = new InternalConfig();
    config.azureMonitorExporterConfig = {
      connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
    };
    useAzureMonitor(config);
    assert.ok(true);
  });
});
