// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { DefaultAzureCredential } from "@azure/identity";
import { ComputationClient } from "../src";

describe("ComputationClient", () => {
  it("can instantiate", () => {
    const client = new ComputationClient(
      "https://example.computation.azure.com",
      new DefaultAzureCredential()
    );
    assert.exists(client);
  });
});
