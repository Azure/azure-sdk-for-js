import * as assert from "assert";
import { CosmosClient, DocumentBase } from "../../";
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

  // TODO: disabled tests need to get fixed or deleted
  describe("Validate client request timeout", function() {
    it("nativeApi Client Should throw exception", async function() {
      const connectionPolicy = new DocumentBase.ConnectionPolicy();
      // making timeout 5 ms to make sure it will throw
      // (create database request takes 10ms-15ms to finish on emulator)
      connectionPolicy.RequestTimeout = 1;
      const failFailClient = new CosmosClient({ endpoint, auth: { masterKey }, connectionPolicy });
      // create database
      try {
        await failFailClient.databases.create({ id: "client test database" });
        assert.fail("Must throw when trying to connect to database");
      } catch (err) {
        assert.equal(err.code, "ECONNRESET", "client should throw exception");
      }
    });
  });
});
