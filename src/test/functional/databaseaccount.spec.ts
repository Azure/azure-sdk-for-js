import * as assert from "assert";
import { CosmosClient } from "../../";
import testConfig from "./../common/_testConfig";
import { removeAllDatabases } from "./../common/TestHelpers";

const endpoint = testConfig.host;
const masterKey = testConfig.masterKey;
const client = new CosmosClient({ endpoint, auth: { masterKey } });

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  // remove all databases from the endpoint before each test
  beforeEach(async function() {
    this.timeout(10000);
    try {
      await removeAllDatabases(client);
    } catch (err) {
      throw err;
    }
  });

  describe("validate database account functionality", function() {
    const databaseAccountTest = async function() {
      try {
        const { body: databaseAccount, headers } = await client.getDatabaseAccount();
        assert.equal(databaseAccount.DatabasesLink, "/dbs/");
        assert.equal(databaseAccount.MediaLink, "/media/");
        assert.equal(databaseAccount.MaxMediaStorageUsageInMB, headers["x-ms-max-media-storage-usage-mb"]); // TODO: should use constants here
        assert.equal(databaseAccount.CurrentMediaStorageUsageInMB, headers["x-ms-media-storage-usage-mb"]);
        assert(databaseAccount.ConsistencyPolicy !== undefined);
      } catch (err) {
        throw err;
      }
    };

    it("nativeApi Should get database account successfully name based", async function() {
      try {
        await databaseAccountTest();
      } catch (err) {
        throw err;
      }
    });
  });
});
