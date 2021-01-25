// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { QuantumJobClient } from "../../src";

describe("Quantum Job Client tests", function() {
  it("can create the client object successfully", () => {
    const obj: QuantumJobClient = new QuantumJobClient(
      "sample-subscription-id",
      "sample-resource-group-name",
      "sample-workspace-name"
    );
    assert.notEqual(obj, null);
  });
});
