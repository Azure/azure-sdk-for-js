import assert from "assert";
import { CosmosClient } from "../..";
import { endpoint, masterKey } from "../common/_testConfig";
import { removeAllDatabases } from "../common/TestHelpers";

const client = new CosmosClient({ endpoint, auth: { masterKey } });

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    this.timeout(process.env.MOCHA_TIMEOUT || 10000);
    await removeAllDatabases();
  });

  describe("validate database account functionality", function() {
    const databaseAccountTest = async function() {
      const { body: databaseAccount, headers } = await client.getDatabaseAccount();
      assert.equal(databaseAccount.DatabasesLink, "/dbs/");
      assert.equal(databaseAccount.MediaLink, "/media/");
      assert.equal(databaseAccount.MaxMediaStorageUsageInMB, headers["x-ms-max-media-storage-usage-mb"]); // TODO: should use constants here
      assert.equal(databaseAccount.CurrentMediaStorageUsageInMB, headers["x-ms-media-storage-usage-mb"]);
      assert(databaseAccount.ConsistencyPolicy !== undefined);
    };

    it("nativeApi Should get database account successfully name based", async function() {
      await databaseAccountTest();
    });
  });
});
