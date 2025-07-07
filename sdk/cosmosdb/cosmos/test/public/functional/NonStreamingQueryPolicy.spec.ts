// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IndexingPolicy, VectorEmbeddingPolicy } from "../../../src/documents/index.js";
import {
  PartitionKeyKind,
  VectorEmbeddingDataType,
  VectorEmbeddingDistanceFunction,
  VectorIndexType,
} from "../../../src/documents/index.js";
import { getTestDatabase } from "../common/TestHelpers.js";
import type { Database } from "../../../src/client/Database/Database.js";
import type { Container } from "../../../src/client/index.js";
import { describe, it, assert, beforeAll, afterAll } from "vitest";
import { CosmosClient } from "../../../src/CosmosClient.js";
import type { CreateOperationInput, PluginConfig } from "../../../src/index.js";
import { PluginOn, ResourceType } from "../../../src/index.js";
import type { Response } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";

// Skipping these tests as they are not supported by public emulator
describe("Vector search feature", async () => {
  describe("VectorEmbeddingPolicy", async () => {
    let database: Database;
    beforeAll(async () => {
      database = await getTestDatabase("vector embedding database");
    });

    it("validate-VectorEmbeddingPolicy", async () => {
      const indexingPolicy: IndexingPolicy = {
        vectorIndexes: [
          { path: "/vector1", type: VectorIndexType.Flat },
          { path: "/vector2", type: VectorIndexType.QuantizedFlat },
        ],
      };
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: VectorEmbeddingDataType.Float32,
            dimensions: 500,
            distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
          },
          {
            path: "/vector2",
            dataType: VectorEmbeddingDataType.Int8,
            dimensions: 200,
            distanceFunction: VectorEmbeddingDistanceFunction.DotProduct,
          },
          {
            path: "/vector3",
            dataType: VectorEmbeddingDataType.UInt8,
            dimensions: 400,
            distanceFunction: VectorEmbeddingDistanceFunction.Cosine,
          },
        ],
      };
      const containerName = "JSApp-vector embedding container";
      // create container
      const { resource: containerdef } = await database.containers.createIfNotExists({
        id: containerName,
        vectorEmbeddingPolicy: vectorEmbeddingPolicy,
        indexingPolicy: indexingPolicy,
      });

      assert(containerdef.indexingPolicy !== undefined);
      assert(containerdef.vectorEmbeddingPolicy !== undefined);
      assert(containerdef.vectorEmbeddingPolicy.vectorEmbeddings.length === 3);
      assert(containerdef.vectorEmbeddingPolicy.vectorEmbeddings[0].path === "/vector1");
      assert(containerdef.vectorEmbeddingPolicy.vectorEmbeddings[1].path === "/vector2");
      assert(containerdef.vectorEmbeddingPolicy.vectorEmbeddings[2].path === "/vector3");
      try {
        await database.container(containerName).delete();
      } catch {
        // Ignore if container is not found
      }
    });

    // skipping the test case for now. Will enable it once the changes are live on backend
    it.skip("validate VectorEmbeddingPolicy", async () => {
      const indexingPolicy: IndexingPolicy = {
        vectorIndexes: [
          { path: "/vector1", type: VectorIndexType.Flat },
          {
            path: "/vector2",
            type: VectorIndexType.QuantizedFlat,
            quantizationByteSize: 1,
            vectorIndexShardKey: ["/Country"],
          },
          {
            path: "/vector3",
            type: VectorIndexType.DiskANN,
            quantizationByteSize: 2,
            indexingSearchListSize: 100,
            vectorIndexShardKey: ["/ZipCode"],
          },
        ],
      };
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: VectorEmbeddingDataType.Float32,
            dimensions: 500,
            distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
          },
          {
            path: "/vector2",
            dataType: VectorEmbeddingDataType.Int8,
            dimensions: 200,
            distanceFunction: VectorEmbeddingDistanceFunction.DotProduct,
          },
          {
            path: "/vector3",
            dataType: VectorEmbeddingDataType.UInt8,
            dimensions: 400,
            distanceFunction: VectorEmbeddingDistanceFunction.Cosine,
          },
        ],
      };
      const containerName = "JSApp-vector embedding container";
      // create container
      const { resource: containerdef } = await database.containers.createIfNotExists({
        id: containerName,
        vectorEmbeddingPolicy: vectorEmbeddingPolicy,
        indexingPolicy: indexingPolicy,
      });

      assert(containerdef.indexingPolicy !== undefined);
      assert(containerdef.vectorEmbeddingPolicy !== undefined);
      assert(containerdef.vectorEmbeddingPolicy.vectorEmbeddings.length === 3);
      assert(containerdef.vectorEmbeddingPolicy.vectorEmbeddings[0].path === "/vector1");
      assert(containerdef.vectorEmbeddingPolicy.vectorEmbeddings[1].path === "/vector2");
      assert(containerdef.vectorEmbeddingPolicy.vectorEmbeddings[2].path === "/vector3");

      assert(containerdef.indexingPolicy.vectorIndexes.length === 3);
      assert(containerdef.indexingPolicy.vectorIndexes[0].path === "/vector1");
      assert(containerdef.indexingPolicy.vectorIndexes[1].path === "/vector2");
      assert(containerdef.indexingPolicy.vectorIndexes[2].path === "/vector3");

      assert(containerdef.indexingPolicy.vectorIndexes[0].type === VectorIndexType.Flat);
      assert(containerdef.indexingPolicy.vectorIndexes[1].type === VectorIndexType.QuantizedFlat);
      assert(containerdef.indexingPolicy.vectorIndexes[2].type === VectorIndexType.DiskANN);

      assert(containerdef.indexingPolicy.vectorIndexes[1].quantizationByteSize === 1);
      assert(containerdef.indexingPolicy.vectorIndexes[2].quantizationByteSize === 2);
      assert(containerdef.indexingPolicy.vectorIndexes[2].indexingSearchListSize === 100);
      assert(containerdef.indexingPolicy.vectorIndexes[1].vectorIndexShardKey[0] === "/Country");
      assert(containerdef.indexingPolicy.vectorIndexes[2].vectorIndexShardKey[0] === "/ZipCode");
    });

    it("should fail to create vector indexing policy", async () => {
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: VectorEmbeddingDataType.Float32,
            dimensions: 500,
            distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
          },
        ],
      };

      // Pass a vector indexing policy without embedding policy
      let indexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: VectorIndexType.Flat }],
      };
      const containerName = "JSApp- vector embedding container failed";
      // create container
      try {
        await database.containers.createIfNotExists({
          id: containerName,
          indexingPolicy: indexingPolicy,
        });
        assert.fail("Container creation should have failed for missing vectorEmbeddingPolicy.");
      } catch (e) {
        assert(e.code === 400);
      }

      // Pass a vector indexing policy with non-matching path
      indexingPolicy = {
        vectorIndexes: [{ path: "/vector2", type: VectorIndexType.Flat }],
      };
      try {
        await database.containers.createIfNotExists({
          id: containerName,
          vectorEmbeddingPolicy: vectorEmbeddingPolicy,
          indexingPolicy: indexingPolicy,
        });
        assert.fail("Container creation should have failed for index mismatch.");
      } catch (e) {
        assert(e.code === 400);
        assert(e.body.message.includes("vector2 not matching in Embedding's path"));
      }
      try {
        await database.container(containerName).delete();
      } catch {
        // Ignore if container is not found
      }
    });

    it("should fail to replace vector indexing policy", async () => {
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: VectorEmbeddingDataType.Float32,
            dimensions: 500,
            distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
          },
        ],
      };
      const indexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: VectorIndexType.Flat }],
      };
      const containerId = "replace vector indexing policy";
      await database.containers.createIfNotExists({
        id: containerId,
        indexingPolicy: indexingPolicy,
        vectorEmbeddingPolicy: vectorEmbeddingPolicy,
      });
      const newIndexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: VectorIndexType.QuantizedFlat }],
      };
      try {
        await database.container(containerId).replace({
          id: containerId,
          indexingPolicy: newIndexingPolicy,
        });
        assert.fail("Container replace should have failed for indexing policy.");
      } catch (e) {
        assert(e.code === 400);
      }
      try {
        await database.container(containerId).delete();
      } catch {
        // Ignore if container is not found
      }
    });

    it.skip("should fail to create vector embedding policy", async () => {
      // Using too many dimensions
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: VectorEmbeddingDataType.Float32,
            dimensions: 2000,
            distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
          },
        ],
      };
      try {
        await database.containers.create({
          id: "vector container with too many dimensions",
          vectorEmbeddingPolicy: vectorEmbeddingPolicy,
        });
        assert.fail("Container creation should have failed but succeeded.");
      } catch (e) {
        assert(e.code === 400);
        assert(
          e.body.message.includes(
            "Vector Embedding Policy has Dimensions:2000 which is more than max:1536",
          ),
        );
      }

      // Using negative dimensions
      vectorEmbeddingPolicy.vectorEmbeddings[0].dimensions = -1;
      try {
        await database.containers.create({
          id: "vector container with negative dimensions",
          vectorEmbeddingPolicy: vectorEmbeddingPolicy,
        });
        assert.fail("Container creation should have failed but succeeded.");
      } catch (e) {
        assert(e.code === 400);
        assert(
          e.body.message.includes(
            "Vector Embedding Policy has invalid Dimensions:-1, it should be positive integer",
          ),
        );
      }
    });

    afterAll(async () => {
      await database.delete();
    });
  });

  describe("Vector Search Query", async () => {
    let database: Database;
    let container: Container;

    beforeAll(async () => {
      database = await getTestDatabase("vector search database");
      const indexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: VectorIndexType.Flat }],
      };
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: VectorEmbeddingDataType.Float32,
            dimensions: 2,
            distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
          },
          {
            path: "/vector2",
            dataType: VectorEmbeddingDataType.Float32,
            dimensions: 2,
            distanceFunction: VectorEmbeddingDistanceFunction.DotProduct,
          },
        ],
      };
      const containerName1 = "vector embedding container 1";

      container = (
        await database.containers.createIfNotExists({
          id: containerName1,
          vectorEmbeddingPolicy: vectorEmbeddingPolicy,
          indexingPolicy: indexingPolicy,
          throughput: 1000,
        })
      ).container;
      // insert some items
      await container.items.create({
        id: "1",
        vector1: [0.056419, -0.021141],
        vector2: [0.056419, -0.021141],
      });
      await container.items.create({
        id: "2",
        vector1: [0.066419, -0.031141],
        vector2: [0.066419, -0.031141],
      });
      await container.items.create({
        id: "3",
        vector1: [0.076419, -0.041141],
        vector2: [0.076419, -0.041141],
      });
    });

    it("should execute vector search query", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT TOP 10 c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) AS similarityScore from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'})";
      await executeQueryAndVerifyOrder(container, query, 3, false);
    });

    it("should execute distinct vector search query", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT distinct TOP 10 c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) AS similarityScore from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'})";
      await executeQueryAndVerifyOrder(container, query, 3, false);
    });

    it("should execute vector search query with limit in query", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector2, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 0 LIMIT 2";
      await executeQueryAndVerifyOrder(container, query, 2, true);
    });

    it("should execute distinct vector search query with limit in query", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT distinct c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector2, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 0 LIMIT 2";
      await executeQueryAndVerifyOrder(container, query, 2, true);
    });

    it("should execute vector search query with top in query", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT TOP 2 c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector2, true, {distanceFunction:'dotProduct'}) AS similarityScore from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'})";
      await executeQueryAndVerifyOrder(container, query, 2, true);
    });

    it("should execute distinct vector search query with top in query", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT distinct TOP 2 c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector2, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'})";
      await executeQueryAndVerifyOrder(container, query, 2, true);
    });

    it("should execute vector search query with filter in query", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) AS similarityScore  from c WHERE VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) >= 0.0";
      const iterator = container.items.query(query);
      // execute order by query on it
      let id = 1;
      while (iterator.hasMoreResults()) {
        const { resources: result } = await iterator.fetchNext();
        if (result !== undefined) {
          assert.equal(result[0].Id, id.toString());
          id++;
        }
      }
    });
    it("should execute distinct vector search query with filter in query", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT distinct c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) AS similarityScore  from c WHERE VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) >= 0.0";
      const iterator = container.items.query(query);
      // execute distinct order by query on it
      let id = 1;
      while (iterator.hasMoreResults()) {
        const { resources: result } = await iterator.fetchNext();
        if (result !== undefined) {
          assert.equal(result[0].Id, id.toString());
          id++;
        }
      }
    });

    afterAll(async () => {
      await database.delete();
    });
  });

  describe.skip("Vector Search Query large dataset", async () => {
    let database: Database;
    let container: Container;

    beforeAll(async () => {
      database = await getTestDatabase("vector search database");
      const indexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: VectorIndexType.Flat }],
      };
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: VectorEmbeddingDataType.Float32,
            dimensions: 2,
            distanceFunction: VectorEmbeddingDistanceFunction.DotProduct,
          },
        ],
      };
      const containerName = "vector embedding container 2";

      container = (
        await database.containers.createIfNotExists({
          id: containerName,
          vectorEmbeddingPolicy: vectorEmbeddingPolicy,
          indexingPolicy: indexingPolicy,
          throughput: 10000,
        })
      ).container;
      // insert some items
      let vector1Value = 0.0001;
      const increment = 0.0001;
      for (let i = 0; i <= 2000; i++) {
        await container.items.create({
          id: i.toString(),
          vector1: [vector1Value, vector1Value],
        });
        vector1Value += increment;
      }
    });

    it("should execute vector search query, large data OFFSET 0 LIMIT 1000", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT c.id AS Id, VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 0 LIMIT 1000";
      await executeQueryAndVerifyOrder(container, query, 1000, true);
    });

    it("should execute distinct vector search query, large data OFFSET 0 LIMIT", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT DISTINCT c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 0 LIMIT 1000";
      await executeQueryAndVerifyOrder(container, query, 1000, true);
    });

    it("should execute vector search query with top in query, large data", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT TOP 1000 c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'})";
      await executeQueryAndVerifyOrder(container, query, 1000, true);
    });

    it("should execute distinct vector search query with top in query, large data", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT DISTINCT TOP 1000 c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'})";
      await executeQueryAndVerifyOrder(container, query, 1000, true);
    });

    it.skip("should execute vector search query, large data with offset 1000 and limit 500", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 1000 LIMIT 500";
      const iterator = container.items.query(query);
      // execute order by query on it
      // offset is set to 1000, so id should start from 1000
      let id = 1000;
      while (iterator.hasMoreResults()) {
        const { resources: result } = await iterator.fetchNext();
        if (result !== undefined) {
          for (const item of result) {
            assert.equal(item.Id, id.toString());
            id--;
          }
        }
      }
      // id should be 500 after fetching 500 items
      assert.equal(id, 500);
    });

    it.skip("should execute distinct vector search query, large data with offset 1000 and limit 500", async () => {
      // create a queryiterator to run vector search query
      const query =
        "SELECT DISTINCT c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotproduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 1000 LIMIT 500";
      const iterator = container.items.query(query);
      // execute order by query on it
      // offset is set to 1000, so id should start from 1000
      let id = 1000;
      while (iterator.hasMoreResults()) {
        const { resources: result } = await iterator.fetchNext();
        if (result !== undefined) {
          for (const item of result) {
            assert.equal(item.Id, id.toString());
            id--;
          }
        }
      }
      // id should be 500 after fetching 500 items
      assert.equal(id, 500);
    });

    afterAll(async () => {
      await database.delete();
    });
  });
});

async function executeQueryAndVerifyOrder(
  container: Container,
  query: string,
  size: number,
  isDescending: boolean,
): Promise<void> {
  const iterator = container.items.query(query);
  let prevScore = isDescending ? Number.MAX_VALUE : -Number.MIN_VALUE;
  let count = 0;
  // execute order by query on it
  while (iterator.hasMoreResults()) {
    const { resources: result } = await iterator.fetchNext();
    if (result !== undefined) {
      // check for order of similarityScore for items
      for (const item of result) {
        const currentScore = item.similarityScore;
        if (isDescending) {
          assert(prevScore > currentScore, "Elements are not in descending order");
        } else {
          assert(prevScore < currentScore, "Elements are not in ascending order");
        }
        prevScore = currentScore;
        count++;
      }
    }
  }
  assert.equal(count, size);
}

describe("Full text search feature", async () => {
  let database: Database;

  beforeAll(async () => {
    database = await getTestDatabase("full text search database");
  });

  afterAll(async () => {
    await database.delete();
  });

  const indexingPolicy: IndexingPolicy = {
    includedPaths: [{ path: "/*" }],
    excludedPaths: [{ path: '/"_etag"/?' }],
    fullTextIndexes: [{ path: "/text1" }, { path: "/text2" }],
  };

  const fullTextPolicy = {
    defaultLanguage: "en-US",
    fullTextPaths: [
      { path: "/text1", language: "1033" },
      { path: "/text2", language: "en-US" },
    ],
  };

  it("validate full text search policy", async () => {
    const containerName = "full text search container policy";
    const { resource: containerdef } = await database.containers.createIfNotExists({
      id: containerName,
      fullTextPolicy: fullTextPolicy,
      indexingPolicy: indexingPolicy,
      throughput: 1000,
    });

    assert(containerdef.indexingPolicy !== undefined);
    assert(containerdef.fullTextPolicy !== undefined);
    assert(containerdef.fullTextPolicy.defaultLanguage === "en-US");
    assert(containerdef.fullTextPolicy.fullTextPaths.length === 2);
    assert(containerdef.fullTextPolicy.fullTextPaths[0].path === "/text1");
    assert(containerdef.fullTextPolicy.fullTextPaths[1].path === "/text2");
    await database.container(containerName).delete();
  });

  it("should execute a full text query", async () => {
    const containerName = "full text search container 1";
    const query = "SELECT TOP 10 * FROM c ORDER BY RANK FullTextScore(c.text1, 'swim', 'run')";

    const { container } = await database.containers.createIfNotExists({
      id: containerName,
      throughput: 22000,
    });

    await container.items.create({ id: "1", text1: "I like to swim", text2: "I like to swim" });
    await container.items.create({ id: "2", text1: "I like to run", text2: "I like to run" });

    const queryOptions = { forceQueryPlan: true };
    const queryIterator = container.items.query(query, queryOptions);
    const result = [];
    while (queryIterator.hasMoreResults()) {
      result.push(...(await queryIterator.fetchNext()).resources);
    }
    assert(result.length === 2);
    await database.container(containerName).delete();
  });

  it("should execute a full text query with RRF score", async () => {
    const containerName = "full text search container 2";
    const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
      vectorEmbeddings: [
        {
          path: "/image",
          dataType: VectorEmbeddingDataType.Float32,
          dimensions: 3,
          distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
        },
      ],
    };

    const query =
      "SELECT TOP 10 c FROM c WHERE FullTextContains(c.text, 'swim') AND FullTextContains(c.text2, 'swim') ORDER BY RANK RRF (FullTextScore(c.text, 'swim', 'run'),FullTextScore(c.text2, 'swim', 'run'))";

    const { container } = await database.containers.createIfNotExists({
      id: containerName,
      throughput: 15000,
      vectorEmbeddingPolicy: vectorEmbeddingPolicy,
    });

    const items = [
      { id: "1", text: "I like to swim", image: [1, 2, 3], text2: "I do not like to swim" },
      { id: "2", text: "I like to run", image: [2, 2, 3], text2: "I do not like to run" },
      {
        id: "3",
        text: "I like to run and swim",
        image: [2, 2, 3],
        text2: "I do not like to run and swim",
      },
    ];

    for (const item of items) {
      await container.items.create(item);
    }

    const queryOptions = { forceQueryPlan: true };
    const queryIterator = container.items.query(query, queryOptions);
    const result = [];

    while (queryIterator.hasMoreResults()) {
      result.push(...(await queryIterator.fetchNext()).resources);
    }

    assert(result.length === 2);
    await database.container(containerName).delete();
  });

  it("should execute a full text query with fetchAll", async () => {
    const containerName = "full text search container 3";
    const query = "SELECT TOP 10 * FROM c ORDER BY RANK FullTextScore(c.text, 'swim', 'run')";

    const { container } = await database.containers.createIfNotExists({
      id: containerName,
      throughput: 22000,
    });

    await container.items.create({ id: "1", text: "I like to swim" });
    await container.items.create({ id: "2", text: "I like to run" });

    const queryOptions = { forceQueryPlan: true };
    const queryIterator = container.items.query(query, queryOptions);
    const result = await queryIterator.fetchAll();
    assert(result.resources.length === 2);
    await database.container(containerName).delete();
  });

  it("should execute a full text query targeting an individual partition via query plan using WHERE clause", async () => {
    const containerName = "full text search partition where test";

    const { container } = await database.containers.createIfNotExists({
      id: containerName,
      partitionKey: { paths: ["/pk"] },
      indexingPolicy: {
        includedPaths: [{ path: "/*" }],
        fullTextIndexes: [{ path: "/text" }],
      },
      fullTextPolicy: {
        defaultLanguage: "en-US",
        fullTextPaths: [{ path: "/text", language: "en-US" }],
      },
      throughput: 25000,
    });

    // Insert items into different partitions
    const responseA1 = await container.items.create({ id: "1", pk: "A", text: "I like to swim" });
    const responseZ = await container.items.create({ id: "2", pk: "Z", text: "I like to swim" });
    const responseA2 = await container.items.create({ id: "3", pk: "A", text: "I like to run" });

    // Ensure items are going to different partitions
    const pkRangeIdA1 = responseA1.headers["x-ms-documentdb-partitionkeyrangeid"];
    const pkRangeIdZ = responseZ.headers["x-ms-documentdb-partitionkeyrangeid"];
    const pkRangeIdA2 = responseA2.headers["x-ms-documentdb-partitionkeyrangeid"];
    assert.notEqual(pkRangeIdA1, pkRangeIdZ);
    assert.equal(pkRangeIdA1, pkRangeIdA2); // Both A items

    // Query using WHERE clause on partition key
    const query = "SELECT * FROM c WHERE c.pk = 'A' AND FullTextContains(c.text, 'swim')";
    const { resources } = await container.items.query(query).fetchAll();
    // Should only return items from partition 'A' that match
    assert.equal(resources.length, 1);
    assert.equal(resources[0].pk, "A");
    assert.equal(resources[0].text, "I like to swim");

    await database.container(containerName).delete();
  });

  it("should execute a cross-partition full text query", async () => {
    const containerName = "full text search cross partition test";
    const { container } = await database.containers.createIfNotExists({
      id: containerName,
      partitionKey: { paths: ["/pk"] },
      indexingPolicy: {
        includedPaths: [{ path: "/*" }],
        fullTextIndexes: [{ path: "/text" }],
      },
      fullTextPolicy: {
        defaultLanguage: "en-US",
        fullTextPaths: [{ path: "/text", language: "en-US" }],
      },
      throughput: 25000,
    });

    // Insert items into different partitions
    const responseA = await container.items.create({ id: "1", pk: "A", text: "I like to swim" });
    const responseZ = await container.items.create({ id: "2", pk: "Z", text: "I like to swim" });
    const responseM = await container.items.create({ id: "3", pk: "M", text: "I like to run" });

    // Ensure items are going to different partitions
    const pkRangeIdA = responseA.headers["x-ms-documentdb-partitionkeyrangeid"];
    const pkRangeIdZ = responseZ.headers["x-ms-documentdb-partitionkeyrangeid"];
    const pkRangeIdM = responseM.headers["x-ms-documentdb-partitionkeyrangeid"];
    assert.notEqual(pkRangeIdA, pkRangeIdZ);
    assert.notEqual(pkRangeIdA, pkRangeIdM);
    assert.notEqual(pkRangeIdZ, pkRangeIdM);

    // Query across all partitions for 'swim'
    const query = "SELECT * FROM c WHERE FullTextContains(c.text, 'swim')";
    const { resources } = await container.items.query(query, { forceQueryPlan: true }).fetchAll();
    // Should return items from all partitions that match
    const pks = resources.map((r) => r.pk);
    assert.equal(resources.length, 2);
    assert(pks.includes("A"));
    assert(pks.includes("Z"));

    await database.container(containerName).delete();
  });

  it("should execute a full text query using hierarchical partition keys", async () => {
    const containerName = "full text search hierarchical partition test";
    // Create a container with hierarchical partition keys and full text policy
    const { container } = await database.containers.createIfNotExists({
      id: containerName,
      partitionKey: { paths: ["/country", "/city"], version: 2, kind: PartitionKeyKind.MultiHash },
      indexingPolicy: {
        includedPaths: [{ path: "/*" }],
        fullTextIndexes: [{ path: "/text" }],
      },
      fullTextPolicy: {
        defaultLanguage: "en-US",
        fullTextPaths: [{ path: "/text", language: "en-US" }],
      },
      throughput: 12000,
    });

    // Insert items into different hierarchical partitions
    await container.items.create({ id: "1", country: "US", city: "NY", text: "I like to swim" });
    await container.items.create({ id: "2", country: "US", city: "SF", text: "I like to swim" });
    await container.items.create({
      id: "3",
      country: "CA",
      city: "Toronto",
      text: "I like to run",
    });

    // Query only partition ['US', 'NY'] for 'swim'
    const query = "SELECT * FROM c WHERE FullTextContains(c.text, 'swim')";
    const { resources } = await container.items
      .query(query, { partitionKey: ["US", "NY"] })
      .fetchAll();
    // Should only return items from the targeted hierarchical partition
    assert.equal(resources.length, 1);
    assert.equal(resources[0].country, "US");
    assert.equal(resources[0].city, "NY");
    assert.equal(resources[0].text, "I like to swim");

    await database.container(containerName).delete();
  });

  it("should use the countIf aggregate with full text search", async () => {
    const containerName = "full text search countIf test";
    // Create a container with partition key /pk and full text policy
    const { container } = await database.containers.createIfNotExists({
      id: containerName,
      partitionKey: { paths: ["/pk"] },
      indexingPolicy: {
        includedPaths: [{ path: "/*" }],
        fullTextIndexes: [{ path: "/text" }],
      },
      fullTextPolicy: {
        defaultLanguage: "en-US",
        fullTextPaths: [{ path: "/text", language: "en-US" }],
      },
      throughput: 12000,
    });

    // Insert items with and without the matching term
    await container.items.create({ id: "1", pk: "A", text: "I like to swim" });
    await container.items.create({ id: "2", pk: "B", text: "I like to run" });
    await container.items.create({ id: "3", pk: "C", text: "I like to swim and run" });

    // Use countIf with FullTextContains
    const query = "SELECT VALUE countIf(FullTextContains(c.text, 'swim')) FROM c";
    const { resources } = await container.items.query(query).fetchAll();
    // Should count items where text contains 'swim' (id 1 and 3)
    assert.equal(resources[0], 2);

    await database.container(containerName).delete();
  });

  it("should handle partition split during long-running full text queries", async () => {
    let numpkRangeRequests = 0;
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, _diagNode, next) => {
          if (context.resourceType === ResourceType.pkranges) {
            let response: Response<any>;
            if (numpkRangeRequests === 0) {
              response = {
                headers: {},
                result: {
                  PartitionKeyRanges: [
                    {
                      _rid: "RRsbAKHytdECAAAAAAAAUA==",
                      id: "1",
                      _etag: '"00000000-0000-0000-683c-819a242201db"',
                      minInclusive: "",
                      maxExclusive: "FF",
                    },
                  ],
                },
              };
              response.code = 200;
              numpkRangeRequests++;
              return response;
            }
            numpkRangeRequests++;
          }
          const res = await next(context);
          return res;
        },
      },
    ];
    const client = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      plugins: plugins,
    });

    // Create a test database and container
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { database } = await client.databases.createIfNotExists({ id: "partitionSplitTestDb" });
    const { container } = await database.containers.createIfNotExists({
      id: "partitionSplitTestContainer",
      partitionKey: { paths: ["/pk"] },
      indexingPolicy: {
        includedPaths: [{ path: "/*" }],
        fullTextIndexes: [{ path: "/text" }],
      },
      fullTextPolicy: {
        defaultLanguage: "en-US",
        fullTextPaths: [{ path: "/text", language: "en-US" }],
      },
      throughput: 1000,
    });
    // Replace the for loop with the executeBulkOperations API call:
    const operations: CreateOperationInput[] = [...Array(50).keys()].map((i) => ({
      operationType: "Create",
      partitionKey: `A${i}`,
      resourceBody: { id: `${i}`, pk: `A${i}`, text: "I like to swim" },
    }));
    await container.items.executeBulkOperations(operations);
    // Start a long-running full text query
    const query = "SELECT * FROM c WHERE FullTextContains(c.text, 'swim')";
    const iterator = container.items.query(query, { maxItemCount: 10 });

    let total = 0;
    while (iterator.hasMoreResults()) {
      const { resources } = await iterator.fetchNext();
      total += resources.length;
    }

    // Assert all items were returned
    assert.equal(total, 50);

    await database.delete();
  });
});
