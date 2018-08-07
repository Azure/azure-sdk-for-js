import * as assert from "assert";
import { CosmosClient, DocumentBase } from "../..";
import { endpoint, masterKey } from "../common/_testConfig";
import { getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });

  // TODO: disabled tests need to get fixed or deleted
  describe("Validate client request timeout", function() {
    it("nativeApi Client Should throw exception", async function() {
      const connectionPolicy = new DocumentBase.ConnectionPolicy();
      // making timeout 5 ms to make sure it will throw
      // (create database request takes 10ms-15ms to finish on emulator)
      connectionPolicy.RequestTimeout = 1;
      const client = new CosmosClient({ endpoint, auth: { masterKey }, connectionPolicy });
      // create database
      try {
        await getTestDatabase("request timeout", client);
        assert.fail("Must throw when trying to connect to database");
      } catch (err) {
        assert.equal(err.code, "ECONNRESET", "client should throw exception");
      }
    });
  });
});
