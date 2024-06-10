// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { IndexingPolicy, VectorEmbeddingPolicy } from "../../../src/documents";
import { getTestDatabase } from "../common/TestHelpers";
import { Database } from "../../../src/client/Database/Database";
import { Container } from "../../../src/client";

// Skipping these tests as they are not supported by public emulator
describe("Vector search feature", async () => {
  describe("VectorEmbeddingPolicy", async () => {
    let database: Database;
    before(async function () {
      // removeAllDatabases();
      database = await getTestDatabase("vector embedding database");
    });

    it("validate VectorEmbeddingPolicy", async function () {
      const indexingPolicy: IndexingPolicy = {
        vectorIndexes: [
          { path: "/vector1", type: "flat" },
          { path: "/vector2", type: "quantizedFlat" },
          // { path: "/vector3", type: "diskANN" },
        ],
      };
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: "float32",
            dimensions: 500,
            distanceFunction: "euclidean",
          },
          {
            path: "/vector2",
            dataType: "int8",
            dimensions: 200,
            distanceFunction: "dotproduct",
          },
          {
            path: "/vector3",
            dataType: "uint8",
            dimensions: 400,
            distanceFunction: "cosine",
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
    });

    it("should fail to create vector indexing policy", async function () {
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: "float32",
            dimensions: 500,
            distanceFunction: "euclidean",
          },
        ],
      };

      // Pass a vector indexing policy without embedding policy
      let indexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: "flat" }],
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
        assert(
          e.body.message.includes(
            "Vector Indexing Policy's path::\\/vector1 not matching in Embedding's path",
          ),
        );
      }

      // Pass a vector indexing policy with non-matching path
      indexingPolicy = {
        vectorIndexes: [{ path: "/vector2", type: "flat" }],
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
    });

    it("should fail to replace vector indexing policy", async function () {
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: "float32",
            dimensions: 500,
            distanceFunction: "euclidean",
          },
        ],
      };
      const indexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: "flat" }],
      };
      const containerId = "replace vector indexing policy";
      await database.containers.createIfNotExists({
        id: containerId,
        indexingPolicy: indexingPolicy,
        vectorEmbeddingPolicy: vectorEmbeddingPolicy,
      });
      const newIndexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: "quantizedFlat" }],
      };
      try {
        await database.container(containerId).replace({
          id: containerId,
          indexingPolicy: newIndexingPolicy,
        });
        assert.fail("Container replace should have failed for indexing policy.");
      } catch (e) {
        assert(e.code === 400);
        assert(
          e.body.message.includes("Vector Indexing Policy cannot be changed in Collection Replace"),
        );
      }
    });

    it.skip("should fail to create vector embedding policy", async function () {
      // Using too many dimensions
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: "float32",
            dimensions: 2000,
            distanceFunction: "euclidean",
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

    after(async function () {
      await database.delete();
    });
  });

  describe("Vector Search Query", async () => {
    let database: Database;
    let container: Container;

    before(async function () {
      database = await getTestDatabase("vector search database");
      const indexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: "flat" }],
      };
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: "float32",
            dimensions: 2,
            distanceFunction: "euclidean",
          },
          {
            path: "/vector2",
            dataType: "float32",
            dimensions: 2,
            distanceFunction: "dotproduct",
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

    it("should execute vector search query", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) AS similarityScore from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'})";
      await executeQueryAndVerifyOrder(container, query, 3, false);
    });

    it("should execute distinct vector search query", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT distinct c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) AS similarityScore from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'})";
      await executeQueryAndVerifyOrder(container, query, 3, false);
    });

    it("should execute vector search query with limit in query", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector2, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 0 LIMIT 2";
      await executeQueryAndVerifyOrder(container, query, 2, true);
    });

    it("should execute distinct vector search query with limit in query", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT distinct c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector2, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 0 LIMIT 2";
      await executeQueryAndVerifyOrder(container, query, 2, true);
    });

    it("should execute vector search query with top in query", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT TOP 2 c.id AS Id,  VectorDistance([0.056419, -0.021141], c.vector2, true, {distanceFunction:'dotProduct'}) AS similarityScore from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'})";
      await executeQueryAndVerifyOrder(container, query, 2, true);
    });

    it("should execute distinct vector search query with top in query", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT distinct TOP 2 c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector2, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'})";
      await executeQueryAndVerifyOrder(container, query, 2, true);
    });

    it("should execute vector search query with filter in query", async function () {
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
    it("should execute distinct vector search query with filter in query", async function () {
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
    after(async function () {
      await database.delete();
    });
  });

  describe.skip("Vector Search Query large dataset", async () => {
    let database: Database;
    let container: Container;

    before(async function () {
      database = await getTestDatabase("vector search database");
      const indexingPolicy: IndexingPolicy = {
        vectorIndexes: [{ path: "/vector1", type: "flat" }],
      };
      const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
        vectorEmbeddings: [
          {
            path: "/vector1",
            dataType: "float32",
            dimensions: 2,
            distanceFunction: "dotproduct",
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

    it("should execute vector search query, large data OFFSET 0 LIMIT 1000", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT c.id AS Id, VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 0 LIMIT 1000";
      await executeQueryAndVerifyOrder(container, query, 1000, true);
    });

    it("should execute distinct vector search query, large data OFFSET 0 LIMIT", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT DISTINCT c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'}) OFFSET 0 LIMIT 1000";
      await executeQueryAndVerifyOrder(container, query, 1000, true);
    });

    it("should execute vector search query with top in query, large data", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT TOP 1000 c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'})";
      await executeQueryAndVerifyOrder(container, query, 1000, true);
    });

    it("should execute distinct vector search query with top in query, large data", async function () {
      // create a queryiterator to run vector search query
      const query =
        "SELECT DISTINCT TOP 1000 c.id AS Id, VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'dotProduct'}) AS similarityScore  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'dotProduct'})";
      await executeQueryAndVerifyOrder(container, query, 1000, true);
    });

    it.skip("should execute vector search query, large data with offset 1000 and limit 500", async function () {
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

    it.skip("should execute distinct vector search query, large data with offset 1000 and limit 500", async function () {
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

    after(async function () {
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
    console.log("result", JSON.stringify(result))
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
