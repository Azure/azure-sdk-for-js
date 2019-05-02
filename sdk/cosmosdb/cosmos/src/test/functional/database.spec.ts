import assert from "assert";
import { CosmosClient, DatabaseDefinition } from "../..";
import { endpoint, masterKey } from "../common/_testConfig";
import { addEntropy, removeAllDatabases } from "../common/TestHelpers";

const client = new CosmosClient({ endpoint, auth: { masterKey } });

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });

  describe("Validate Database CRUD", async function() {
    const databaseCRUDTest = async function() {
      // read databases
      const { result: databases } = await client.databases.readAll().toArray();
      assert.equal(databases.constructor, Array, "Value should be an array");

      // create a database
      const beforeCreateDatabasesCount = databases.length;
      const databaseDefinition = { id: "database test database" };
      const { body: db } = await client.databases.create(databaseDefinition);
      assert.equal(db.id, databaseDefinition.id);

      // read databases after creation
      const { result: databases2 } = await client.databases.readAll().toArray();
      assert.equal(databases2.length, beforeCreateDatabasesCount + 1, "create should increase the number of databases");
      // query databases
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: databaseDefinition.id
          }
        ]
      };
      const { result: results } = await client.databases.query(querySpec).toArray();
      assert(results.length > 0, "number of results for the query should be > 0");

      // delete database
      await client.database(db.id).delete();
      try {
        // read database after deletion
        await client.database(db.id).read();
        assert.fail("Read database on non-existent database should fail");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    };

    it("nativeApi Should do database CRUD operations successfully name based", async function() {
      await databaseCRUDTest();
    });

    describe("databases.createIfNotExists", function() {
      it("should handle does not exist", async function() {
        const def: DatabaseDefinition = { id: addEntropy("does not exist") };
        const { database } = await client.databases.createIfNotExists(def);
        const { body: readDef } = await database.read();
        assert.equal(def.id, readDef.id);
      });

      it("should handle does exist", async function() {
        const def: DatabaseDefinition = { id: addEntropy("does  exist") };
        // Set up
        await client.databases.create(def);

        // Now call createIfNotExists on existing db
        const { database } = await client.databases.createIfNotExists(def);
        const { body: readDef } = await database.read();
        assert.equal(def.id, readDef.id);
      });
    });
  });

  // TODO: These are unit tests, not e2e tests like above, so maybe should seperate these.
  describe("Validate Id validation", function() {
    it("nativeApi Should fail on ends with a space", async function() {
      // Id shoudn't end with a space.
      try {
        await client.databases.create({ id: "id_ends_with_space " });
        assert.fail("Must throw if id ends with a space");
      } catch (err) {
        assert.equal("Id ends with a space.", err.message);
      }
    });

    it("nativeAPI Should fail on contains '/'", async function() {
      // Id shoudn't contain "/".
      try {
        await client.databases.create({ id: "id_with_illegal/_char" });
        assert.fail("Must throw if id has illegal characters");
      } catch (err) {
        assert.equal("Id contains illegal chars.", err.message);
      }
    });

    it("nativeAPI Should fail on contains '\\'", async function() {
      // Id shoudn't contain "\\".
      try {
        await client.databases.create({ id: "id_with_illegal\\_char" });
        assert.fail("Must throw if id contains illegal characters");
      } catch (err) {
        assert.equal("Id contains illegal chars.", err.message);
      }
    });

    it("nativeAPI Should fail on contains '?'", async function() {
      // Id shoudn't contain "?".
      try {
        await client.databases.create({ id: "id_with_illegal?_?char" });
        assert.fail("Must throw if id contains illegal characters");
      } catch (err) {
        assert.equal("Id contains illegal chars.", err.message);
      }
    });

    it("nativeAPI should fail on contains '#'", async function() {
      // Id shoudn't contain "#".
      try {
        await client.databases.create({ id: "id_with_illegal#_char" });
        assert.fail("Must throw if id contains illegal characters");
      } catch (err) {
        assert.equal("Id contains illegal chars.", err.message);
      }
    });
  });
});
