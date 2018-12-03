import assert from "assert";
import { Constants, DocumentBase } from "../..";
import { ContainerDefinition, Database } from "../../client";
import { DataType, Index, IndexedPath, IndexingMode, IndexingPolicy, IndexKind } from "../../documents";
import { getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function() {
    await removeAllDatabases();
  });

  describe("Validate Container CRUD", function() {
    const containerCRUDTest = async function(hasPartitionKey: boolean) {
      try {
        // create database
        const database = await getTestDatabase("Validate Container CRUD");

        // create a container
        const containerDefinition: ContainerDefinition = {
          id: "sample container",
          indexingPolicy: { indexingMode: IndexingMode.consistent }
        };

        if (hasPartitionKey) {
          containerDefinition.partitionKey = { paths: ["/id"], kind: DocumentBase.PartitionKind.Hash };
        }

        const { body: containerDef } = await database.containers.create(containerDefinition);
        const container = database.container(containerDef.id);
        assert.equal(containerDefinition.id, containerDef.id);
        assert.equal("consistent", containerDef.indexingPolicy.indexingMode);
        assert.equal(JSON.stringify(containerDef.partitionKey), JSON.stringify(containerDefinition.partitionKey));
        // read containers after creation
        const { result: containers } = await database.containers.readAll().toArray();

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
        const { result: results } = await database.containers.query(querySpec).toArray();
        assert(results.length > 0, "number of results for the query should be > 0");

        const { result: ranges } = await container.readPartitionKeyRanges().toArray();
        assert(ranges.length > 0, "container should have at least 1 partition");

        // Replacing indexing policy is allowed.
        containerDef.indexingPolicy.indexingMode = IndexingMode.lazy;
        const { body: replacedContainer } = await container.replace(containerDef);
        assert.equal("lazy", replacedContainer.indexingPolicy.indexingMode);

        // Replacing partition key is not allowed.
        try {
          containerDef.partitionKey = { paths: ["/key"], kind: DocumentBase.PartitionKind.Hash };
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
        const { body: readcontainer } = await container.read();
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
      } catch (err) {
        throw err;
      }
    };

    const badPartitionKeyDefinitionTest = async function(isNameBased: boolean) {
      try {
        // create database
        const database = await getTestDatabase("container CRUD bad partition key");

        // create a container
        const badPartitionKeyDefinition: any = {
          paths: "/id", // This is invalid. Must be an array.
          kind: DocumentBase.PartitionKind.Hash
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
      } catch (err) {
        throw err;
      }
    };

    it("nativeApi Should do container CRUD operations successfully name based", async function() {
      try {
        await containerCRUDTest(false);
      } catch (err) {
        throw err;
      }
    });

    it("nativeApi Should do elastic container CRUD operations successfully name based", async function() {
      try {
        await containerCRUDTest(true);
      } catch (err) {
        throw err;
      }
    });

    it("nativeApi container with bad partition key definition name based", async function() {
      try {
        await badPartitionKeyDefinitionTest(true);
      } catch (err) {
        throw err;
      }
    });

    it("nativeApi container with bad partition key definition name based", async function() {
      try {
        await badPartitionKeyDefinitionTest(false);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("Validate container indexing policy", function() {
    const indexPolicyTest = async function() {
      try {
        // create database
        const database = await getTestDatabase("container test database");

        // create container
        const { body: containerDef } = await database.containers.create({ id: "container test container" });
        const container = database.container(containerDef.id);

        assert.equal(
          containerDef.indexingPolicy.indexingMode,
          DocumentBase.IndexingMode.consistent,
          "default indexing mode should be consistent"
        );
        await container.delete();

        const lazyContainerDefinition: ContainerDefinition = {
          id: "lazy container",
          indexingPolicy: { indexingMode: DocumentBase.IndexingMode.lazy }
        };

        const { body: lazyContainerDef } = await database.containers.create(lazyContainerDefinition);
        const lazyContainer = database.container(lazyContainerDef.id);

        assert.equal(
          lazyContainerDef.indexingPolicy.indexingMode,
          DocumentBase.IndexingMode.lazy,
          "indexing mode should be lazy"
        );

        await lazyContainer.delete();

        const consistentcontainerDefinition: ContainerDefinition = {
          id: "lazy container",
          indexingPolicy: { indexingMode: "consistent" } // tests the type flexibility
        };
        const { body: consistentContainerDef } = await database.containers.create(consistentcontainerDefinition);
        const consistentContainer = database.container(consistentContainerDef.id);
        assert.equal(
          containerDef.indexingPolicy.indexingMode,
          DocumentBase.IndexingMode.consistent,
          "indexing mode should be consistent"
        );
        await consistentContainer.delete();

        const containerDefinition: ContainerDefinition = {
          id: "containerWithIndexingPolicy",
          indexingPolicy: {
            automatic: true,
            indexingMode: DocumentBase.IndexingMode.consistent,
            includedPaths: [
              {
                path: "/",
                indexes: [
                  {
                    kind: DocumentBase.IndexKind.Hash,
                    dataType: DocumentBase.DataType.Number,
                    precision: 2
                  }
                ]
              }
            ],
            excludedPaths: [
              {
                path: '/"systemMetadata"/*'
              }
            ]
          }
        };

        const { body: containerWithIndexingPolicyDef } = await database.containers.create(containerDefinition);

        // Two included paths.
        assert.equal(
          1,
          containerWithIndexingPolicyDef.indexingPolicy.includedPaths.length,
          "Unexpected includedPaths length"
        );
        // The first included path is what we created.
        assert.equal("/", containerWithIndexingPolicyDef.indexingPolicy.includedPaths[0].path);
        // Backend adds a default index
        assert(containerWithIndexingPolicyDef.indexingPolicy.includedPaths[0].indexes.length > 1);
        assert.equal(
          DocumentBase.IndexKind.Hash,
          containerWithIndexingPolicyDef.indexingPolicy.includedPaths[0].indexes[0].kind
        );
        // The second included path is a timestamp index created by the server.

        // And one excluded path.
        assert.equal(
          1,
          containerWithIndexingPolicyDef.indexingPolicy.excludedPaths.length,
          "Unexpected excludedPaths length"
        );
        assert.equal('/"systemMetadata"/*', containerWithIndexingPolicyDef.indexingPolicy.excludedPaths[0].path);
      } catch (err) {
        throw err;
      }
    };

    it("nativeApi Should create container with correct indexing policy name based", async function() {
      try {
        await indexPolicyTest();
      } catch (err) {
        throw err;
      }
    });

    const checkDefaultIndexingPolicyPaths = function(indexingPolicy: IndexingPolicy) {
      // no excluded paths.
      assert.equal(0, indexingPolicy["excludedPaths"].length);
      // included paths should be 1 "/".
      assert.equal(1, indexingPolicy["includedPaths"].length);

      let rootIncludedPath: IndexedPath = null;
      if (indexingPolicy["includedPaths"][0]["path"] === "/*") {
        rootIncludedPath = indexingPolicy["includedPaths"][0];
      }

      assert(rootIncludedPath); // root path should exist.

      // In the root path, there should be one HashIndex for Strings, and one RangeIndex for Numbers.
      assert.equal(2, rootIncludedPath["indexes"].length);

      let hashIndex: Index = null;
      let rangeIndex: Index = null;

      for (let i = 0; i < 2; ++i) {
        if (rootIncludedPath["indexes"][i]["kind"] === "Hash") {
          hashIndex = rootIncludedPath["indexes"][i];
        } else if (rootIncludedPath["indexes"][i]["kind"] === "Range") {
          rangeIndex = rootIncludedPath["indexes"][i];
        }
      }

      assert(hashIndex);
      assert.equal("String", hashIndex["dataType"]);
      assert(rangeIndex);
      assert.equal("Number", rangeIndex["dataType"]);
    };

    const defaultIndexingPolicyTest = async function() {
      try {
        // create database
        const database = await getTestDatabase("container test database");

        // create container with no indexing policy specified.
        const containerDefinition01: ContainerDefinition = { id: "TestCreateDefaultPolicy01" };
        const { body: containerNoIndexPolicyDef } = await database.containers.create(containerDefinition01);
        checkDefaultIndexingPolicyPaths(containerNoIndexPolicyDef["indexingPolicy"]);

        // create container with partial policy specified.
        const containerDefinition02: ContainerDefinition = {
          id: "TestCreateDefaultPolicy02",
          indexingPolicy: {
            indexingMode: IndexingMode.lazy,
            automatic: true
          }
        };

        const { body: containerWithPartialPolicyDef } = await database.containers.create(containerDefinition02);
        checkDefaultIndexingPolicyPaths((containerWithPartialPolicyDef as any)["indexingPolicy"]);

        // create container with default policy.
        const containerDefinition03 = {
          id: "TestCreateDefaultPolicy03",
          indexingPolicy: {}
        };
        const { body: containerDefaultPolicy } = await database.containers.create(containerDefinition03);
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
        const { body: containerMissingIndexes } = await database.containers.create(containerDefinition04);
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
                    kind: IndexKind.Hash,
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
        const { body: containerMissingPrecision } = await database.containers.create(containerDefinition05);
        checkDefaultIndexingPolicyPaths((containerMissingPrecision as any)["indexingPolicy"]);
      } catch (err) {
        throw err;
      }
    };

    it("nativeApi Should create container with default indexing policy name based", async function() {
      try {
        await defaultIndexingPolicyTest();
      } catch (err) {
        throw err;
      }
    });
  });

  describe("Validate response headers", function() {
    const createThenReadcontainer = async function(database: Database, body: ContainerDefinition) {
      try {
        const { body: createdcontainer, headers } = await database.containers.create(body);
        const response = await database.container(createdcontainer.id).read();
        return response;
      } catch (err) {
        throw err;
      }
    };

    const indexProgressHeadersTest = async function() {
      try {
        const database = await getTestDatabase("Validate response headers");
        const { headers: headers1 } = await createThenReadcontainer(database, { id: "consistent_coll" });
        assert.notEqual(headers1[Constants.HttpHeaders.IndexTransformationProgress], undefined);
        assert.equal(headers1[Constants.HttpHeaders.LazyIndexingProgress], undefined);

        const lazyContainerDefinition = {
          id: "lazy_coll",
          indexingPolicy: { indexingMode: DocumentBase.IndexingMode.lazy }
        };
        const { headers: headers2 } = await createThenReadcontainer(database, lazyContainerDefinition);
        assert.notEqual(headers2[Constants.HttpHeaders.IndexTransformationProgress], undefined);
        assert.notEqual(headers2[Constants.HttpHeaders.LazyIndexingProgress], undefined);

        const noneContainerDefinition = {
          id: "none_coll",
          indexingPolicy: { indexingMode: DocumentBase.IndexingMode.none, automatic: false }
        };
        const { headers: headers3 } = await createThenReadcontainer(database, noneContainerDefinition);
        assert.notEqual(headers3[Constants.HttpHeaders.IndexTransformationProgress], undefined);
        assert.equal(headers3[Constants.HttpHeaders.LazyIndexingProgress], undefined);
      } catch (err) {
        throw err;
      }
    };

    it("nativeApi Validate index progress headers name based", async function() {
      try {
        await indexProgressHeadersTest();
      } catch (err) {
        throw err;
      }
    });
  });
});

describe("containers.createIfNotExists", function() {
  let database: Database;
  before(async function() {
    // create database
    database = await getTestDatabase("containers.createIfNotExists");
  });

  it("should handle container does not exist", async function() {
    const def: ContainerDefinition = { id: "does not exist" };
    const { container } = await database.containers.createIfNotExists(def);
    const { body: readDef } = await container.read();
    assert.equal(def.id, readDef.id);
  });

  it("should handle container exists", async function() {
    const def: ContainerDefinition = { id: "does exist" };
    await database.containers.create(def);

    const { container } = await database.containers.createIfNotExists(def);
    const { body: readDef } = await container.read();
    assert.equal(def.id, readDef.id);
  });
});
