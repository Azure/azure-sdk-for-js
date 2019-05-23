import assert from "assert";
import { Constants, PartitionKind } from "../../dist-esm";
import { ContainerDefinition, Database } from "../../dist-esm/client";
import { ContainerRequest } from "../../dist-esm/client/Container/ContainerRequest";
import { DataType, Index, IndexedPath, IndexingMode, IndexingPolicy, IndexKind } from "../../dist-esm/documents";
import { getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

describe("Containers", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });

  describe("Container CRUD", function() {
    const containerCRUDTest = async function(partitionKey?: string) {
      // create database
      const database = await getTestDatabase("Validate Container CRUD");

      // create a container
      const containerDefinition: ContainerRequest = {
        id: "sample container",
        indexingPolicy: { indexingMode: IndexingMode.consistent },
        throughput: 400
      };

      if (partitionKey) {
        containerDefinition.partitionKey = { paths: [partitionKey], kind: PartitionKind.Hash };
      }

      const { resource: containerDef } = await database.containers.create(containerDefinition);
      const container = database.container(containerDef.id);
      assert.equal(containerDefinition.id, containerDef.id);
      assert.equal("consistent", containerDef.indexingPolicy.indexingMode);
      if (containerDef.partitionKey) {
        assert.equal(containerDef.partitionKey.kind, containerDefinition.partitionKey.kind);
        assert.deepEqual(containerDef.partitionKey.paths, containerDefinition.partitionKey.paths);
      }
      // read containers after creation
      const { resources: containers } = await database.containers.readAll().fetchAll();

      assert.equal(containers.length, 1, "create should increase the number of containers");
      // query containers
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: containerDefinition.id
          }
        ]
      };
      const { resources: results } = await database.containers.query(querySpec).fetchAll();
      assert(results.length > 0, "number of results for the query should be > 0");

      const { resources: ranges } = await container.readPartitionKeyRanges().fetchAll();
      assert(ranges.length > 0, "container should have at least 1 partition");

      // Replacing indexing policy is allowed.
      containerDef.indexingPolicy.indexingMode = IndexingMode.lazy;
      const { resource: replacedContainer } = await container.replace(containerDef);
      assert.equal("lazy", replacedContainer.indexingPolicy.indexingMode);

      // Replacing partition key is not allowed.
      try {
        containerDef.partitionKey = { paths: ["/key"], kind: PartitionKind.Hash };
        await container.replace(containerDef);
        assert.fail("Replacing paritionkey must throw");
      } catch (err) {
        const badRequestErrorCode = 400;
        assert.equal(err.code, badRequestErrorCode, "response should return error code " + badRequestErrorCode);
      } finally {
        containerDef.partitionKey = containerDefinition.partitionKey; // Resume partition key
      }
      // Replacing id is not allowed.
      try {
        containerDef.id = "try_to_replace_id";
        await container.replace(containerDef);
        assert.fail("Replacing container id must throw");
      } catch (err) {
        const notFoundErrorCode = 400;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }

      // read container
      containerDef.id = containerDefinition.id; // Resume Id.
      const { resource: readcontainer } = await container.read();
      assert.equal(containerDefinition.id, readcontainer.id);

      // delete container
      await container.delete();

      // read container after deletion
      try {
        await container.read();
        assert.fail("Must fail to read container after delete");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    };

    it("Default partition key", async function() {
      await containerCRUDTest();
    });

    it("Custom partition key", async function() {
      await containerCRUDTest("/id");
    });

    it("Bad partition key definition", async function() {
      // create database
      const database = await getTestDatabase("container CRUD bad partition key");

      // create a container
      const badPartitionKeyDefinition: any = {
        paths: "/id", // This is invalid. Must be an array.
        kind: PartitionKind.Hash
      };

      const containerDefinition: ContainerDefinition = {
        id: "sample container",
        indexingPolicy: { indexingMode: IndexingMode.consistent },
        partitionKey: badPartitionKeyDefinition // This is invalid, forced using type coersion
      };

      try {
        await database.containers.create(containerDefinition);
      } catch (err) {
        assert.equal(err.code, 400);
      }
    });
  });

  describe("Indexing policy", function() {
    it("Create container with correct indexing policy", async function() {
      // create database
      const database = await getTestDatabase("container test database");

      // create container
      const { resource: containerDef } = await database.containers.create({ id: "container test container" });
      const container = database.container(containerDef.id);

      assert.equal(
        containerDef.indexingPolicy.indexingMode,
        IndexingMode.consistent,
        "default indexing mode should be consistent"
      );
      await container.delete();

      const lazyContainerDefinition: ContainerDefinition = {
        id: "lazy container",
        indexingPolicy: { indexingMode: IndexingMode.lazy }
      };

      const { resource: lazyContainerDef } = await database.containers.create(lazyContainerDefinition);
      const lazyContainer = database.container(lazyContainerDef.id);

      assert.equal(lazyContainerDef.indexingPolicy.indexingMode, IndexingMode.lazy, "indexing mode should be lazy");

      await lazyContainer.delete();

      const uniqueKeysContainerDefinition: ContainerDefinition = {
        id: "uniqueKeysContainer",
        uniqueKeyPolicy: { uniqueKeys: [{ paths: ["/foo"] }] }
      };

      const { resource: uniqueKeysContainerDef } = await database.containers.create(uniqueKeysContainerDefinition);
      const uniqueKeysContainer = database.container(uniqueKeysContainerDef.id);

      assert.equal(uniqueKeysContainerDef.uniqueKeyPolicy.uniqueKeys[0].paths, "/foo");

      await uniqueKeysContainer.delete();

      const consistentcontainerDefinition: ContainerDefinition = {
        id: "lazy container",
        indexingPolicy: { indexingMode: "consistent" } // tests the type flexibility
      };
      const { resource: consistentContainerDef } = await database.containers.create(consistentcontainerDefinition);
      const consistentContainer = database.container(consistentContainerDef.id);
      assert.equal(
        containerDef.indexingPolicy.indexingMode,
        IndexingMode.consistent,
        "indexing mode should be consistent"
      );
      await consistentContainer.delete();

      const containerDefinition: ContainerDefinition = {
        id: "containerWithIndexingPolicy",
        indexingPolicy: {
          automatic: true,
          indexingMode: IndexingMode.consistent,
          includedPaths: [
            {
              path: "/*"
            }
          ],
          excludedPaths: [
            {
              path: '/"systemMetadata"/*'
            }
          ]
        }
      };

      const { resource: containerWithIndexingPolicyDef } = await database.containers.create(containerDefinition);

      // Two included paths.
      assert.equal(
        1,
        containerWithIndexingPolicyDef.indexingPolicy.includedPaths.length,
        "Unexpected includedPaths length"
      );
      // The first included path is what we created.
      assert.equal("/*", containerWithIndexingPolicyDef.indexingPolicy.includedPaths[0].path);
      // And two excluded paths.
      assert.equal(
        2,
        containerWithIndexingPolicyDef.indexingPolicy.excludedPaths.length,
        "Unexpected excludedPaths length"
      );
      assert.equal('/"systemMetadata"/*', containerWithIndexingPolicyDef.indexingPolicy.excludedPaths[0].path);
    });

    const checkDefaultIndexingPolicyPaths = function(indexingPolicy: IndexingPolicy) {
      assert.equal(1, indexingPolicy["excludedPaths"].length);
      assert.equal(1, indexingPolicy["includedPaths"].length);

      let rootIncludedPath: IndexedPath = null;
      if (indexingPolicy["includedPaths"][0]["path"] === "/*") {
        rootIncludedPath = indexingPolicy["includedPaths"][0];
      }

      assert(rootIncludedPath); // root path should exist.
    };
    it("Create container with default indexing policy", async function() {
      // create database
      const database = await getTestDatabase("container test database");

      // create container with no indexing policy specified.
      const containerDefinition01: ContainerDefinition = { id: "TestCreateDefaultPolicy01" };
      const { resource: containerNoIndexPolicyDef } = await database.containers.create(containerDefinition01);
      checkDefaultIndexingPolicyPaths(containerNoIndexPolicyDef["indexingPolicy"]);

      // create container with partial policy specified.
      const containerDefinition02: ContainerDefinition = {
        id: "TestCreateDefaultPolicy02",
        indexingPolicy: {
          indexingMode: IndexingMode.lazy,
          automatic: true
        }
      };

      const { resource: containerWithPartialPolicyDef } = await database.containers.create(containerDefinition02);
      checkDefaultIndexingPolicyPaths((containerWithPartialPolicyDef as any)["indexingPolicy"]);

      // create container with default policy.
      const containerDefinition03 = {
        id: "TestCreateDefaultPolicy03",
        indexingPolicy: {}
      };
      const { resource: containerDefaultPolicy } = await database.containers.create(containerDefinition03);
      checkDefaultIndexingPolicyPaths((containerDefaultPolicy as any)["indexingPolicy"]);

      // create container with indexing policy missing indexes.
      const containerDefinition04 = {
        id: "TestCreateDefaultPolicy04",
        indexingPolicy: {
          includedPaths: [
            {
              path: "/*"
            }
          ]
        }
      };
      const { resource: containerMissingIndexes } = await database.containers.create(containerDefinition04);
      checkDefaultIndexingPolicyPaths((containerMissingIndexes as any)["indexingPolicy"]);

      // create container with indexing policy missing precision.
      const containerDefinition05 = {
        id: "TestCreateDefaultPolicy05",
        indexingPolicy: {
          includedPaths: [
            {
              path: "/*",
              indexes: [
                {
                  kind: IndexKind.Range,
                  dataType: DataType.String
                },
                {
                  kind: IndexKind.Range,
                  dataType: DataType.Number
                }
              ]
            }
          ]
        }
      };
      const { resource: containerMissingPrecision } = await database.containers.create(containerDefinition05);
      checkDefaultIndexingPolicyPaths((containerMissingPrecision as any)["indexingPolicy"]);
    });
  });

  describe("Validate response headers", function() {
    const createThenReadcontainer = async function(database: Database, definition: ContainerDefinition) {
      const { container: createdcontainer, headers } = await database.containers.create(definition);
      const response = await database.container(createdcontainer.id).read({ populateQuotaInfo: true });
      return response;
    };

    const indexProgressHeadersTest = async function() {
      const database = await getTestDatabase("Validate response headers");
      const { headers: headers1 } = await createThenReadcontainer(database, { id: "consistent_coll" });
      assert.notEqual(headers1[Constants.HttpHeaders.IndexTransformationProgress], undefined);
      assert.equal(headers1[Constants.HttpHeaders.LazyIndexingProgress], undefined);

      const lazyContainerDefinition = {
        id: "lazy_coll",
        indexingPolicy: { indexingMode: IndexingMode.lazy }
      };
      const { headers: headers2 } = await createThenReadcontainer(database, lazyContainerDefinition);
      assert.notEqual(headers2[Constants.HttpHeaders.IndexTransformationProgress], undefined);
      assert.notEqual(headers2[Constants.HttpHeaders.LazyIndexingProgress], undefined);

      const noneContainerDefinition = {
        id: "none_coll",
        indexingPolicy: { indexingMode: IndexingMode.none, automatic: false }
      };
      const { headers: headers3 } = await createThenReadcontainer(database, noneContainerDefinition);
      assert.notEqual(headers3[Constants.HttpHeaders.IndexTransformationProgress], undefined);
      assert.equal(headers3[Constants.HttpHeaders.LazyIndexingProgress], undefined);
    };

    it("nativeApi Validate index progress headers name based", async function() {
      await indexProgressHeadersTest();
    });
  });
});

describe("createIfNotExists", function() {
  let database: Database;
  before(async function() {
    // create database
    database = await getTestDatabase("containers.createIfNotExists");
  });

  it("should handle container does not exist", async function() {
    const def: ContainerDefinition = { id: "does not exist" };
    const { container } = await database.containers.createIfNotExists(def);
    const { resource: readDef } = await container.read();
    assert.equal(def.id, readDef.id);
  });

  it("should handle container exists", async function() {
    const def: ContainerDefinition = { id: "does exist" };
    await database.containers.create(def);

    const { container } = await database.containers.createIfNotExists(def);
    const { resource: readDef } = await container.read();
    assert.equal(def.id, readDef.id);
  });
});
