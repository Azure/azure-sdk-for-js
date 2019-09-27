// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { CosmosClient } from "../../dist-esm";
import { endpoint, masterKey } from "../common/_testConfig";
import { getTestDatabase } from "../common/TestHelpers";
import https from "https";

describe("Validate SSL verification check for emulator", function() {
  it("should throw exception", async function() {
    try {
      const client = new CosmosClient({ endpoint, key: masterKey });
      // create database
      await getTestDatabase("ssl verification", client);
    } catch (err) {
      // connecting to emulator should throw SSL verification error,
      assert.equal(err.code, "DEPTH_ZERO_SELF_SIGNED_CERT", "client should throw exception");
    }
  });

  it("disable ssl check via agent", async function() {
    const client = new CosmosClient({
      endpoint,
      key: masterKey,
      agent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    // create database
    await getTestDatabase("ssl verification", client);
  });
});
