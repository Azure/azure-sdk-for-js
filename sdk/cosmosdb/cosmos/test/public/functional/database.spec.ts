// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DatabaseDefinition, Database, DatabaseRequest } from "@azure/cosmos";
import { CosmosClient } from "@azure/cosmos";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import {
  addEntropy,
  removeAllDatabases,
  getTestDatabase,
  assertThrowsAsync,
  testForDiagnostics,
} from "../common/TestHelpers.js";
import { describe, it, assert, beforeEach, beforeAll } from "vitest";

const client = new CosmosClient({
  endpoint,
  key: masterKey,
  connectionPolicy: { enableBackgroundEndpointRefreshing: false },
});

describe("NodeJS CRUD Tests", { timeout: 10000 }, () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  describe("Validate Database CRUD", async () => {
    const databaseCRUDTest = async function (): Promise<void> {
      // read databases

      const { resources: databases } = await testForDiagnostics(
        async () => {
          return client.databases.readAll().fetchAll();
        },
        {
          locationEndpointsContacted: 1,
          // metadataCallCount: 2,
          retryCount: 0,
        },
      );

      assert.equal(databases.constructor, Array, "Value should be an array");

      // create a database
      const beforeCreateDatabasesCount = databases.length;
      const databaseDefinition = { id: "database test database", throughput: 400 };
      // const { resource: db } = await client.databases.create(databaseDefinition);
      const { resource: db } = await testForDiagnostics(
        async () => {
          return client.databases.create(databaseDefinition);
        },
        {
          locationEndpointsContacted: 1,
          // metadataCallCount: 2,
          retryCount: 0,
        },
      );
      assert.equal(db.id, databaseDefinition.id);

      // read databases after creation
      const { resources: databases2 } = await client.databases.readAll().fetchAll();
      assert.equal(
        databases2.length,
        beforeCreateDatabasesCount + 1,
        "create should increase the number of databases",
      );
      // query databases
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: databaseDefinition.id,
          },
        ],
      };
      // const { resources: results } = await client.databases.query(querySpec).fetchAll();
      const { resources: results } = await testForDiagnostics(
        async () => {
          return client.databases.query(querySpec).fetchAll();
        },
        {
          locationEndpointsContacted: 1,
          // metadataCallCount: 2,
          retryCount: 0,
        },
      );
      assert(results.length > 0, "number of results for the query should be > 0");

      // delete database
      // await client.database(db.id).delete();
      await testForDiagnostics(
        async () => {
          return client.database(db.id).delete();
        },
        {
          locationEndpointsContacted: 1,
          // metadataCallCount: 2,
          retryCount: 0,
        },
      );
      try {
        // read database after deletion

        await testForDiagnostics(
          async () => {
            return client.database(db.id).read();
          },
          {
            locationEndpointsContacted: 1,
            // metadataCallCount: 2,
            retryCount: 0,
          },
        );
        assert.fail("Read database on non-existent database should fail");
      } catch (err: any) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    };

    it("nativeApi Should do database CRUD operations successfully name based", async () => {
      await databaseCRUDTest();
    });

    describe("databases.createIfNotExists", () => {
      it("should handle does not exist", async () => {
        const def: DatabaseDefinition = { id: addEntropy("does not exist") };
        const { database } = await client.databases.createIfNotExists(def);
        const { resource: readDef } = await database.read();
        assert.equal(def.id, readDef.id);
      });

      it("should handle does exist", async () => {
        const def: DatabaseDefinition = { id: addEntropy("does  exist") };
        // Set up
        await client.databases.create(def);

        // Now call createIfNotExists on existing db
        const { database } = await client.databases.createIfNotExists(def);
        const { resource: readDef } = await database.read();
        assert.equal(def.id, readDef.id);
      });
    });
  });

  // TODO: These are unit tests, not e2e tests like above, so maybe should separate these.
  describe("Validate Id validation", () => {
    it("nativeApi Should fail on ends with a space", async () => {
      // Id shouldn't end with a space.
      try {
        await client.databases.create({ id: "id_ends_with_space " });
        assert.fail("Must throw if id ends with a space");
      } catch (err: any) {
        assert.equal("Id ends with a space.", err.message);
      }
    });

    it("nativeAPI Should fail on contains '/'", async () => {
      // Id shouldn't contain "/".
      try {
        await client.databases.create({ id: "id_with_illegal/_char" });
        assert.fail("Must throw if id has illegal characters");
      } catch (err: any) {
        assert.equal("Id contains illegal chars.", err.message);
      }
    });

    it("nativeAPI Should fail on contains '\\'", async () => {
      // Id shouldn't contain "\\".
      try {
        await client.databases.create({ id: "id_with_illegal\\_char" });
        assert.fail("Must throw if id contains illegal characters");
      } catch (err: any) {
        assert.equal("Id contains illegal chars.", err.message);
      }
    });

    it("nativeAPI Should fail on contains '?'", async () => {
      // Id shouldn't contain "?".
      try {
        await client.databases.create({ id: "id_with_illegal?_?char" });
        assert.fail("Must throw if id contains illegal characters");
      } catch (err: any) {
        assert.equal("Id contains illegal chars.", err.message);
      }
    });

    it("nativeAPI should fail on contains '#'", async () => {
      // Id shouldn't contain "#".
      try {
        await client.databases.create({ id: "id_with_illegal#_char" });
        assert.fail("Must throw if id contains illegal characters");
      } catch (err: any) {
        assert.equal("Id contains illegal chars.", err.message);
      }
    });
  });
});

describe("database.readOffer", () => {
  describe("without offer", async () => {
    let offerlessDatabase: Database;

    beforeAll(async () => {
      offerlessDatabase = await getTestDatabase("has offer db1");
    });

    it("returns undefined resource", async () => {
      const offer: any = await offerlessDatabase.readOffer();
      assert.equal(offer.resource, undefined);
    });
  });
  describe("has offer", () => {
    let offerDatabase: Database;

    beforeAll(async () => {
      offerDatabase = await getTestDatabase("has offer db2", undefined, { throughput: 500 });
    });

    it("returns offer", async () => {
      const offer: any = await offerDatabase.readOffer();
      assert.equal(offer.resource.offerVersion, "V2");
    });
  });
});

describe("database.create", () => {
  it("uses autoscale", async () => {
    const maxThroughput = 50000;
    const databaseRequest: DatabaseRequest = {
      maxThroughput,
    };
    const database = await getTestDatabase("autoscale db", undefined, databaseRequest);
    const { resource: offer } = await database.readOffer();
    const settings = offer.content.offerAutopilotSettings;
    assert.equal(settings.maxThroughput, maxThroughput);
  });
  it("throws with maxThroughput and throughput", () => {
    const databaseRequest: DatabaseRequest = {
      throughput: 400,
      maxThroughput: 4000,
    };
    assertThrowsAsync(() => getTestDatabase("autoscale db", undefined, databaseRequest));
  });
});
