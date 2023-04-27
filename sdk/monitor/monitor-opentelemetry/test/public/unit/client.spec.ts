// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { AzureMonitorOpenTelemetryClient } from "../../../src/client";

describe("AzureMonitorOpenTelemetryClient", () => {
  it("constructor", () => {
    const client = new AzureMonitorOpenTelemetryClient();
    assert.notStrictEqual(client, true);
    // TODO: Add tests
  });
});
