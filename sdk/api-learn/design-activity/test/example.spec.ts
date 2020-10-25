// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { ComputationClient } from "../src";
import { DefaultAzureCredential } from "@azure/identity";

describe("ComputeClient", () => {
  it("can be constructed", async () => {
    // normally this would come from an environment variable
    const endpoint = "http://example.azconfig.io";
    const client = new ComputationClient(endpoint, new DefaultAzureCredential(), {});
    const computeNode = await client.createComputeNodeAsync({
      userName: "Chris",
      name: "node1",
      kind: "WindowsComputeNode"
    });
    console.log(computeNode);
    assert.exists(client);
  });
});
