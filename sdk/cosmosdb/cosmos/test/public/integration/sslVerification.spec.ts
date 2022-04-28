// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { CosmosClient } from "../../../src";
import { getTestDatabase } from "../common/TestHelpers";
import https from "https";

const endpoint = "https://localhost:8081";
const masterKey =
  "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

describe("Validate SSL verification check for emulator #nosignoff", function () {
  it("should throw exception", async function () {
    try {
      const client = new CosmosClient({
        endpoint,
        key: masterKey,
        connectionPolicy: { enableBackgroundEndpointRefreshing: false },
      });
      // create database
      await getTestDatabase("ssl verification", client);
    } catch (err: any) {
      // connecting to emulator should throw SSL verification error,
      assert.equal(err.code, "DEPTH_ZERO_SELF_SIGNED_CERT", "client should throw exception");
    }
  });

  it("disable ssl check via agent", async function () {
    const client = new CosmosClient({
      endpoint,
      key: masterKey,
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });

    // create database
    await getTestDatabase("ssl verification", client);
  });
});
