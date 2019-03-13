import assert from "assert";
import { Agent } from "http";
import { CosmosClient } from "../..";
import { endpoint, masterKey } from "../common/_testConfig";
import { getTestDatabase } from "../common/TestHelpers";

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);

  describe("Validate client request timeout", function() {
    it("nativeApi Client Should throw exception", async function() {
      // making timeout 1 ms to make sure it will throw
      // (create database request takes 10ms-15ms to finish on emulator)
      const client = new CosmosClient({ endpoint, auth: { masterKey }, connectionPolicy: { requestTimeout: 1 } });
      // create database
      try {
        await getTestDatabase("request timeout", client);
        assert.fail("Must throw when trying to connect to database");
      } catch (err) {
        assert.equal(err.name, "TimeoutError", "client should throw exception");
      }
    });
  });

  describe("Constructor", function() {
    it("Should work with a non-class based Connection Policy", function() {
      const client = new CosmosClient({
        endpoint: "https://faaaaaake.com",
        auth: { masterKey: "" },
        connectionPolicy: {
          requestTimeout: 10000
        }
      });
      assert.ok(client !== undefined, "client shouldn't be undefined if it succeeded");
    });

    it("Accepts node Agent", function() {
      const client = new CosmosClient({
        endpoint: "https://faaaaaake.com",
        auth: { masterKey: "" },
        agent: new Agent()
      });
      assert.ok(client !== undefined, "client shouldn't be undefined if it succeeded");
    });
  });
});
