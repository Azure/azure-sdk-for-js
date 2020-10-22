// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { ComputationClient } from "../src";
import { DefaultAzureCredential } from "@azure/identity";

describe("ComputeClient", () => {
  it("can be constructed", () => {
    // normally this would come from an environment variable
    const endpoint = "http://example.azconfig.io";
    const client = new ComputationClient(endpoint, new DefaultAzureCredential(), {});
    assert.exists(client);
  });
});
