// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { CosmosClient } from "../../dist-esm";
import { endpoint, masterKey } from "../common/_testConfig";
import { removeAllDatabases } from "../common/TestHelpers";

const client = new CosmosClient({ endpoint, key: masterKey });

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  });

  describe("validate database account functionality", function() {
    it("nativeApi Should get database account successfully name based", async function() {
      const { resource: databaseAccount, headers } = await client.getDatabaseAccount();
      assert.equal(databaseAccount.DatabasesLink, "/dbs/");
      assert.equal(databaseAccount.MediaLink, "/media/");
      assert.equal(
        databaseAccount.MaxMediaStorageUsageInMB,
        headers["x-ms-max-media-storage-usage-mb"]
      ); // TODO: should use constants here
      assert.equal(
        databaseAccount.CurrentMediaStorageUsageInMB,
        headers["x-ms-media-storage-usage-mb"]
      );
      assert(databaseAccount.ConsistencyPolicy !== undefined);
    });
  });
});
