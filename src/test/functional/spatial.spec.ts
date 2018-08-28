import assert from "assert";
import { Database, DocumentBase } from "../..";
import { createOrUpsertItem, getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });

  describe("Validate spatial index", function() {
    const spatialIndexTest = async function(isUpsertTest: boolean) {
      try {
        // create database
        const database: Database = await getTestDatabase("validate spatial index");

        // create container using an indexing policy with spatial index.
        const indexingPolicy = {
          includedPaths: [
            {
              path: '/"Location"/?',
              indexes: [
                {
                  kind: DocumentBase.IndexKind.Spatial,
                  dataType: DocumentBase.DataType.Point
                }
              ]
            },
            {
              path: "/"
            }
          ]
        };
        const entropy = Math.floor(Math.random() * 10000);
        const { body: containerDef } = await database.containers.create({
          id: `sample container${entropy}`,
          indexingPolicy
        });
        const container = database.container(containerDef.id);

        const location1 = {
          id: "location1",
          Location: {
            type: "Point",
            coordinates: [20.0, 20.0]
          }
        };
        await createOrUpsertItem(container, location1, undefined, isUpsertTest);
        const location2 = {
          id: "location2",
          Location: {
            type: "Point",
            coordinates: [100.0, 100.0]
          }
        };
        await createOrUpsertItem(container, location2, undefined, isUpsertTest);
        const query =
          "SELECT * FROM root WHERE (ST_DISTANCE(root.Location, {type: 'Point', coordinates: [20.1, 20]}) < 20000) ";
        const { result: results } = await container.items.query(query).toArray();
        assert.equal(1, results.length);
        assert.equal("location1", results[0].id);
      } catch (err) {
        throw err;
      }
    };

    it("nativeApi Should support spatial index name based", async function() {
      try {
        await spatialIndexTest(false);
      } catch (err) {
        throw err;
      }
    });

    it("nativeApi Should support spatial index name based with upsert", async function() {
      try {
        await spatialIndexTest(true);
      } catch (err) {
        throw err;
      }
    });
  });
});
