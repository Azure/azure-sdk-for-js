// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import {
  Constants,
  ContainerResponse,
  PartitionKeyDefinition,
  PartitionKeyKind,
  StatusCodes,
} from "../../../src";
import { ContainerDefinition, Database, Container } from "../../../src";
import { ContainerRequest } from "../../../src";
import { DataType, IndexedPath, IndexingMode, IndexingPolicy, IndexKind } from "../../../src";
import {
  getTestDatabase,
  removeAllDatabases,
  getTestContainer,
  assertThrowsAsync,
  addEntropy,
} from "../common/TestHelpers";
import { SpatialType } from "../../../src";
import { GeospatialType } from "../../../src";

describe("Containers", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });

  describe("Container CRUD", function () {
    const containerCRUDTest = async function (
      partitionKey?: PartitionKeyDefinition,
      opts?: Partial<ContainerRequest>
    ): Promise<void> {
      // create database
      const database = await getTestDatabase("Validate Container CRUD");

      // create a container
      const containerDefinition: ContainerRequest = {
        id: "sample container",
        indexingPolicy: { indexingMode: IndexingMode.consistent },
        throughput: 400,
        ...opts,
      };

      if (partitionKey) {
        containerDefinition.partitionKey = partitionKey;
      }

      const { resource: containerDef } = await database.containers.create(containerDefinition);
      const container = database.container(containerDef.id);
      assert.equal(containerDefinition.id, containerDef.id);
      assert.equal("consistent", containerDef.indexingPolicy.indexingMode);
      if (containerDef.partitionKey) {
        const comparePaths =
          typeof containerDefinition.partitionKey === "string"
            ? [containerDefinition.partitionKey]
            : containerDefinition.partitionKey.paths;
        assert.deepStrictEqual(containerDef.partitionKey.paths, comparePaths);
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
            value: containerDefinition.id,
          },
        ],
      };
      const { resources: results } = await database.containers.query(querySpec).fetchAll();
      assert(results.length > 0, "number of results for the query should be > 0");

      const { resources: ranges } = await container.readPartitionKeyRanges().fetchAll();
      assert(ranges.length > 0, "container should have at least 1 partition");

      // Replacing indexing policy is allowed.
      containerDef.indexingPolicy.spatialIndexes = [
        {
          path: "/region/?",
          types: [SpatialType.Polygon],
          boundingBox: {
            xmin: 0,
            ymin: 0,
            xmax: 10,
            ymax: 10,
          },
        },
      ];

      containerDef.geospatialConfig.type = GeospatialType.Geometry;
      await container.replace(containerDef);

      // Replacing partition key is not allowed.
      try {
        containerDef.partitionKey = { paths: ["/key"] };
        await container.replace(containerDef);
        assert.fail("Replacing partitionKey must throw");
      } catch (err: any) {
        const badRequestErrorCode = 400;
        assert.equal(
          err.code,
          badRequestErrorCode,
          "response should return error code " + badRequestErrorCode
        );
      } finally {
        containerDef.partitionKey = partitionKey; // Resume partition key
      }
      // Replacing id is not allowed.
      try {
        containerDef.id = "try_to_replace_id";
        await container.replace(containerDef);
        assert.fail("Replacing container id must throw");
      } catch (err: any) {
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
      } catch (err: any) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    };

    it("Default partition key", async function () {
      await containerCRUDTest();
    });

    it("Custom partition key", async function () {
      await containerCRUDTest({ paths: ["/id"] });
    });

    it("Hierarchical partition key", async function () {
      await containerCRUDTest({
        paths: ["/id", "/id2"],
        version: 2,
        kind: PartitionKeyKind.MultiHash,
      });
    });

    describe("Bad partition key definition", async function () {
      it("Has 'paths' property as string", async function () {
        // create database
        const database = await getTestDatabase("container CRUD bad partition key");

        // create a container
        const badPartitionKeyDefinition: any = {
          paths: "/id", // This is invalid. Must be an array.
        };

        const containerDefinition: ContainerRequest = {
          id: "sample container",
          indexingPolicy: { indexingMode: IndexingMode.consistent },
          partitionKey: badPartitionKeyDefinition, // This is invalid, forced using type coersion
        };

        try {
          await database.containers.create(containerDefinition);
        } catch (err: any) {
          assert.equal(err.code, 400);
        }
      });
      it("Is missing leading '/'", async function () {
        // create database
        const database = await getTestDatabase("container CRUD bad partition key");

        // create a container
        const badPartitionKeyDefinition = "id";

        const containerDefinition: ContainerRequest = {
          id: "sample container",
          indexingPolicy: { indexingMode: IndexingMode.consistent },
          partitionKey: badPartitionKeyDefinition,
        };

        try {
          await database.containers.create(containerDefinition);
          console.log("finish");
        } catch (err: any) {
          assert.equal(err.message, "Partition key must start with '/'");
        }
      });
      it("Is missing leading '/' - hierarchical partitions", async function () {
        // create database
        const database = await getTestDatabase("container CRUD bad partition key");

        // create a container
        const badPartitionKeyDefinition = ["id", "/id2"];

        const containerDefinition: ContainerRequest = {
          id: "sample container",
          indexingPolicy: { indexingMode: IndexingMode.consistent },
          partitionKey: {
            paths: badPartitionKeyDefinition,
            version: 2,
            kind: PartitionKeyKind.MultiHash,
          },
        };

        try {
          await database.containers.create(containerDefinition);
          console.log("finish");
        } catch (err: any) {
          assert.strictEqual(
            true,
            err.message.includes(
              "The partition key component definition path 'id' could not be accepted"
            )
          );
        }
      });
    });
  });

  describe("Indexing policy", function () {
    it("Create container with correct indexing policy", async function () {
      // create database
      const database = await getTestDatabase("container test database");

      // create container
      const { resource: containerDef } = await database.containers.create({
        id: "container test container",
      });
      const container = database.container(containerDef.id);

      assert.equal(
        containerDef.indexingPolicy.indexingMode,
        IndexingMode.consistent,
        "default indexing mode should be consistent"
      );
      await container.delete();

      const uniqueKeysContainerDefinition: ContainerDefinition = {
        id: "uniqueKeysContainer",
        uniqueKeyPolicy: { uniqueKeys: [{ paths: ["/foo"] }] },
      };

      const { resource: uniqueKeysContainerDef } = await database.containers.create(
        uniqueKeysContainerDefinition
      );
      const uniqueKeysContainer = database.container(uniqueKeysContainerDef.id);

      assert.equal(uniqueKeysContainerDef.uniqueKeyPolicy.uniqueKeys[0].paths, "/foo");

      await uniqueKeysContainer.delete();

      const consistentcontainerDefinition: ContainerDefinition = {
        id: "lazy container",
        indexingPolicy: { indexingMode: "consistent" }, // tests the type flexibility
      };
      const { resource: consistentContainerDef } = await database.containers.create(
        consistentcontainerDefinition
      );
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
              path: "/*",
            },
          ],
          excludedPaths: [
            {
              path: '/"systemMetadata"/*',
            },
          ],
        },
      };

      const { resource: containerWithIndexingPolicyDef } = await database.containers.create(
        containerDefinition
      );

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
      assert.equal(
        '/"systemMetadata"/*',
        containerWithIndexingPolicyDef.indexingPolicy.excludedPaths[0].path
      );
    });

    const checkDefaultIndexingPolicyPaths = function (indexingPolicy: IndexingPolicy): void {
      assert.equal(1, indexingPolicy["excludedPaths"].length);
      assert.equal(1, indexingPolicy["includedPaths"].length);

      let rootIncludedPath: IndexedPath = null;
      if (indexingPolicy["includedPaths"][0]["path"] === "/*") {
        rootIncludedPath = indexingPolicy["includedPaths"][0];
      }

      assert(rootIncludedPath); // root path should exist.
    };
    it("Create container with default indexing policy", async function () {
      // create database
      const database = await getTestDatabase("container test database");

      // create container with no indexing policy specified.
      const containerDefinition01: ContainerDefinition = { id: "TestCreateDefaultPolicy01" };
      const { resource: containerNoIndexPolicyDef } = await database.containers.create(
        containerDefinition01
      );
      checkDefaultIndexingPolicyPaths(containerNoIndexPolicyDef["indexingPolicy"]);

      // create container with default policy.
      const containerDefinition03 = {
        id: "TestCreateDefaultPolicy03",
        indexingPolicy: {},
      };
      const { resource: containerDefaultPolicy } = await database.containers.create(
        containerDefinition03
      );
      checkDefaultIndexingPolicyPaths((containerDefaultPolicy as any)["indexingPolicy"]);

      // create container with indexing policy missing indexes.
      const containerDefinition04 = {
        id: "TestCreateDefaultPolicy04",
        indexingPolicy: {
          includedPaths: [
            {
              path: "/*",
            },
          ],
        },
      };
      const { resource: containerMissingIndexes } = await database.containers.create(
        containerDefinition04
      );
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
                  dataType: DataType.String,
                },
                {
                  kind: IndexKind.Range,
                  dataType: DataType.Number,
                },
              ],
            },
          ],
        },
      };
      const { resource: containerMissingPrecision } = await database.containers.create(
        containerDefinition05
      );
      checkDefaultIndexingPolicyPaths((containerMissingPrecision as any)["indexingPolicy"]);
    });
  });

  describe("Validate response headers", function () {
    const createThenReadcontainer = async function (
      database: Database,
      definition: ContainerDefinition
    ): Promise<ContainerResponse> {
      const { container: createdcontainer } = await database.containers.create(definition);
      const response = await database
        .container(createdcontainer.id)
        .read({ populateQuotaInfo: true });
      return response;
    };

    const indexProgressHeadersTest = async function (): Promise<void> {
      const database = await getTestDatabase("Validate response headers");
      const { headers: headers1 } = await createThenReadcontainer(database, {
        id: "consistent_coll",
      });
      assert.notEqual(headers1[Constants.HttpHeaders.IndexTransformationProgress], undefined);
      assert.equal(headers1[Constants.HttpHeaders.LazyIndexingProgress], undefined);

      const noneContainerDefinition = {
        id: "none_coll",
        indexingPolicy: { indexingMode: IndexingMode.none, automatic: false },
      };
      const { headers: headers3 } = await createThenReadcontainer(
        database,
        noneContainerDefinition
      );
      assert.notEqual(headers3[Constants.HttpHeaders.IndexTransformationProgress], undefined);
      assert.equal(headers3[Constants.HttpHeaders.LazyIndexingProgress], undefined);
    };

    it("nativeApi Validate index progress headers name based", async function () {
      await indexProgressHeadersTest();
    });
  });
});

describe("createIfNotExists", function () {
  let database: Database;
  before(async function () {
    // create database
    database = await getTestDatabase("containers.createIfNotExists");
  });

  it("should handle container does not exist", async function () {
    const def: ContainerDefinition = { id: "does not exist" };
    const { container } = await database.containers.createIfNotExists(def);
    const { resource: readDef } = await container.read();
    assert.equal(def.id, readDef.id);
  });

  it("should handle container exists", async function () {
    const def: ContainerDefinition = { id: "does exist" };
    await database.containers.create(def);

    const { container } = await database.containers.createIfNotExists(def);
    const { resource: readDef } = await container.read();
    assert.equal(def.id, readDef.id);
  });

  it("should handle container does not exist - hierarchical partitions", async function () {
    const def: ContainerDefinition = {
      id: "does not exist hierarchical partitions",
      partitionKey: {
        paths: ["/key1", "/key2"],
        kind: PartitionKeyKind.MultiHash,
        version: 2,
      },
    };
    const { container } = await database.containers.createIfNotExists(def);
    const { resource: readDef } = await container.read();
    assert.equal(def.id, readDef.id);
  });

  it("should handle container exists  - hierarchical partitions", async function () {
    const def: ContainerDefinition = {
      id: "does exist hierarchical partitions",
      partitionKey: {
        paths: ["/key1", "/key2"],
        kind: PartitionKeyKind.MultiHash,
        version: 2,
      },
    };
    await database.containers.create(def);

    const { container } = await database.containers.createIfNotExists(def);
    const { resource: readDef } = await container.read();
    assert.equal(def.id, readDef.id);
  });
});

describe("container.readOffer", function () {
  let containerWithOffer: Container;
  let containerWithoutOffer: Container;
  let container2WithOffer: Container;
  let container2WithoutOffer: Container;
  const containerRequestWithOffer: ContainerRequest = {
    id: "sample",
    throughput: 400,
  };
  const containerRequest: ContainerRequest = {
    id: "sample-offerless",
  };
  let offerDatabase: Database;
  before(async function () {
    offerDatabase = await getTestDatabase("has offer");
    containerWithOffer = await getTestContainer(
      "offerContainer",
      undefined,
      containerRequestWithOffer
    );
    containerWithoutOffer = await getTestContainer("container", undefined, containerRequest);
    const response1 = await offerDatabase.containers.create(containerRequestWithOffer);
    const response2 = await offerDatabase.containers.create(containerRequest);
    container2WithOffer = response1.container;
    container2WithoutOffer = response2.container;
  });
  describe("database does not have offer", function () {
    it("has offer", async function () {
      const offer: any = await containerWithOffer.readOffer();
      const { resource: readDef } = await containerWithOffer.read();
      assert.equal(offer.resource.offerResourceId, readDef._rid);
    });
    it("does not have offer so uses default", async function () {
      const offer: any = await containerWithoutOffer.readOffer();
      const { resource: readDef } = await containerWithoutOffer.read();
      assert.equal(offer.resource.offerResourceId, readDef._rid);
    });
  });
  describe("database has offer", function () {
    it("container does not have offer", async function () {
      const offer: any = await container2WithoutOffer.readOffer();
      const { resource: readDef } = await container2WithoutOffer.read();
      assert.equal(offer.resource.offerResourceId, readDef._rid);
    });
    it("container has offer", async function () {
      const offer: any = await container2WithOffer.readOffer();
      const { resource: readDef } = await container2WithOffer.read();
      assert.equal(offer.resource.offerResourceId, readDef._rid);
    });
  });
});

describe("container.create", function () {
  let database: Database;
  before(async () => {
    database = await getTestDatabase("autoscale test");
  });
  it("uses autoscale", async function () {
    const maxThroughput = 50000;
    const containerRequest: ContainerRequest = {
      id: "sample",
      maxThroughput,
    };
    const { container } = await database.containers.create(containerRequest);
    const { resource: offer } = await container.readOffer();
    const settings = offer.content.offerAutopilotSettings;
    assert.equal(settings.maxThroughput, maxThroughput);
  });
  it("throws with maxThroughput and throughput", function () {
    const containerRequest: ContainerRequest = {
      id: "sample",
      throughput: 400,
      maxThroughput: 400,
    };
    assertThrowsAsync(() => database.containers.create(containerRequest));
  });
});

describe("Reading items using container", function () {
  it("should be able to read item based on partition key value", async function () {
    const container = await getTestContainer("container", undefined, {
      partitionKey: { paths: ["/key1", "/key2"], kind: PartitionKeyKind.MultiHash, version: 2 },
    });
    const itemWithNoPartitionKeySet = addEntropy("item1");
    const itemWithOnePartitionKeySet = addEntropy("item2");
    const itemWithBothPartitionKeySet = addEntropy("item3");

    const itemWithNoPartitionKeySetDef = {
      id: itemWithNoPartitionKeySet,
    };
    const itemWithOnePartitionKeySetDef = {
      id: itemWithOnePartitionKeySet,
      key1: "a",
    };
    const itemWithBothPartitionKeySetDef = {
      id: itemWithBothPartitionKeySet,
      key1: "a",
      key2: "b",
    };

    await container.items.create(itemWithNoPartitionKeySetDef);
    const { resource: itemRead1 } = await container.item(itemWithNoPartitionKeySet).read();
    assert.strictEqual(itemRead1.id, itemWithNoPartitionKeySet);

    await container.items.create(itemWithOnePartitionKeySetDef);
    const { resource: itemRead2 } = await container
      .item(itemWithOnePartitionKeySet, ["a", undefined])
      .read();
    assert.strictEqual(itemRead2.id, itemWithOnePartitionKeySet);

    try {
      await container.item(itemWithOnePartitionKeySet, ["a"]).read();
      assert(false, "Should have thrown exception due to improper partition key passed.");
    } catch (err: any) {
      assert.strictEqual(err.code, 400, "Should fail due to improper partition key given");
    }

    await container.items.create(itemWithBothPartitionKeySetDef);
    const { resource: itemRead3 } = await container
      .item(itemWithBothPartitionKeySet, ["a", "b"])
      .read();
    assert.strictEqual(itemRead3.id, itemWithBothPartitionKeySet);
  });
});

describe("container.deleteAllItemsForPartitionKey", function () {
  it("should delete all items for partition key value", async function () {
    const container = await getTestContainer("container", undefined, { partitionKey: "/pk" });
    await testDeleteAllItemsForPartitionKey(container);
  });

  it("should delete all items for parition key value in multi partition container", async function () {
    //  multi partition container
    const container = await getTestContainer("container", undefined, {
      partitionKey: {
        paths: ["/pk"],
        version: 2,
      },
      throughput: 10500,
    });
    await testDeleteAllItemsForPartitionKey(container);
  });
  async function testDeleteAllItemsForPartitionKey(container: Container) {
    const { resource: create1 } = await container.items.create({
      id: "1",
      key: "value",
      pk: "pk",
    });
    const { resource: create2 } = await container.items.create({
      id: "2",
      key: "value",
      pk: "pk",
    });
    const { resource: create3 } = await container.items.create({
      id: "3",
      key: "value",
      pk: "rk",
    });
    await container.deleteAllItemsForPartitionKey("pk");
    assert((await container.item(create1.id).read()).statusCode === StatusCodes.NotFound);
    assert((await container.item(create2.id).read()).statusCode === StatusCodes.NotFound);
    assert((await (await container.item(create3.id).read()).item.id) === create3.id);
  }
});
