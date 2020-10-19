// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { ConfigurationClient } from "../src";
import { DefaultAzureCredential } from "@azure/identity";

describe("ConfigurationClient", () => {
  it("can be constructed", () => {
    // normally this would come from an environment variable
    const endpoint = "http://example.azconfig.io";
    const client = new ConfigurationClient(endpoint, new DefaultAzureCredential());
    assert.exists(client);
  });
});

describe("functionality tests", () => {
  const endpoint = "http://example.azconfig.io";
  const client = new ConfigurationClient(endpoint, new DefaultAzureCredential());

  it("can retrieve values", async () => {
    const result = await client.getConfigurationSetting("bestColor");
    assert.equal(result.value, "<your favorite color>");
  });
});
