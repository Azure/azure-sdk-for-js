// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { IndexingPolicy, VectorEmbeddingPolicy } from "../../../src/documents";
import { getTestDatabase } from "../common/TestHelpers";
import { Database } from "../../../src/client/Database/Database";
import { Container } from "../../../src/client";

// Skipping these tests as they are not supported by public emulator
describe("VectorEmbeddingPolicy", async () => {
  let database: Database;
  before(async function () {
    database = await getTestDatabase("vector embedding database");
  });

  it("validate VectorEmbeddingPolicy", async function () {
    const indexingPolicy: IndexingPolicy = {
      vectorIndexes: [
        { path: "/vector1", type: "flat" },
        { path: "/vector2", type: "quantizedFlat" },
        { path: "/vector3", type: "diskANN" },
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
    const containerName = "vector embedding container";
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
    const containerName = "vector embedding container failed";
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

  it("should fail to create vector embedding policy", async function () {
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

  it("should query container with vector embedding policy", async function () {});

  after(async function () {
    await database.delete();
  });
});

describe("Vector Search Query", async () => {
  let database: Database;
  let container1: Container;
  // let container2: Container;

  before(async function () {
    database = await getTestDatabase("vector search database");
    const indexingPolicy: IndexingPolicy = {
      vectorIndexes: [
        { path: "/vector1", type: "flat" },
        { path: "/vector2", type: "quantizedFlat" },
        { path: "/vector3", type: "diskANN" },
      ],
    };
    // TODO: IF vector value is outside [-1 1] empty orderbyItems is observerd? Any rationale behind it.
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
          dataType: "int8",
          dimensions: 2,
          distanceFunction: "dotproduct",
        },
        {
          path: "/vector3",
          dataType: "uint8",
          dimensions: 2,
          distanceFunction: "cosine",
        },
      ],
    };
    const containerName1 = "vector embedding container 1";
    // const containerName2 = "vector embedding container 2";
    // create container
    container1 = (
      await database.containers.createIfNotExists({
        id: containerName1,
        vectorEmbeddingPolicy: vectorEmbeddingPolicy,
        indexingPolicy: indexingPolicy,
        throughput: 1000,
      })
    ).container;
    // insert some items
    await container1.items.create({
      id: "1",
      vector1: [0.056419, -0.021141],
      vector2: [0, -1],
      vector3: [1, 2],
    });
    await container1.items.create({
      id: "2",
      vector1: [0.066419, -0.031141],
      vector2: [1, 0],
      vector3: [2, 3],
    });
    await container1.items.create({
      id: "3",
      vector1: [0.076419, -0.041141],
      vector2: [2, 1],
      vector3: [3, 4],
    });
  });

  it("should execute vector search query", async function () {
    // create a queryiterator to run vector search query
    const query =
      "SELECT c.id AS Id  from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) asc";
    const iterator = container1.items.query(query);
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

  it("should execute vector search query with limit in query", async function () {
    // create a queryiterator to run vector search query
    const query =
      "SELECT c.id AS Id  from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) desc OFFSET 0 LIMIT 2";
    const iterator = container1.items.query(query);
    // execute order by query on it
    let id = 3;
    while (iterator.hasMoreResults()) {
      const { resources: result } = await iterator.fetchNext();
      if (result !== undefined) {
        // should return 2 items as limit is 2 in descending order
        assert.equal(result.length, 2);
        assert.equal(result[0].Id, id.toString());
        id--;
        assert.equal(result[1].Id, id.toString());
      }
    }
  });

  it("should execute vector search query with top in query", async function () {
    // create a queryiterator to run vector search query
    const query =
      "SELECT TOP 2 c.id AS Id  from c ORDER BY VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) desc";
    const iterator = container1.items.query(query);
    // execute order by query on it
    let id = 3;
    while (iterator.hasMoreResults()) {
      const { resources: result } = await iterator.fetchNext();
      if (result !== undefined) {
        // should return 2 items as top is 2 in descending order
        assert.equal(result.length, 2);
        assert.equal(result[0].Id, id.toString());
        id--;
        assert.equal(result[1].Id, id.toString());
      }
    }
  });

  it("should execute vector search query with filter in query", async function () {
    // create a queryiterator to run vector search query
    const query =
      "SELECT c.id AS Id  from c WHERE VectorDistance([0.056419, -0.021141], c.vector1, true, {distanceFunction:'euclidean'}) >= 0.0";
    const iterator = container1.items.query(query);
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

  after(async function () {
    await database.delete();
  });
});

describe("Vector Search Query large dataset", async () => {
  let database: Database;
  let container1: Container;

  before(async function () {
    database = await getTestDatabase("vector search database");
    const indexingPolicy: IndexingPolicy = {
      vectorIndexes: [
        { path: "/vector1", type: "flat" },
        { path: "/vector2", type: "quantizedFlat" },
        { path: "/vector3", type: "diskANN" },
      ],
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
          dataType: "int8",
          dimensions: 2,
          distanceFunction: "dotproduct",
        },
        {
          path: "/vector3",
          dataType: "uint8",
          dimensions: 2,
          distanceFunction: "cosine",
        },
      ],
    };
    const containerName = "vector embedding container 2";

    container1 = (
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
      await container1.items.create({
        id: i.toString(),
        vector1: [vector1Value, vector1Value],
        vector2: [0, 0],
        vector3: [0, 0],
      });
      vector1Value += increment;
    }
  });

  it("should execute vector search query, large data", async function () {
    // create a queryiterator to run vector search query
    const query =
      "SELECT c.id AS Id  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'euclidean'}) desc OFFSET 0 LIMIT 1000";
    const iterator = container1.items.query(query);
    // execute order by query on it
    let id = 2000;
    while (iterator.hasMoreResults()) {
      const { resources: result } = await iterator.fetchNext();
      if (result !== undefined) {
        for (const item of result) {
          assert.equal(item.Id, id.toString());
          id--;
        }
      }
    }
    assert.equal(id, 1000);
  });

  it("should execute vector search query with top in query, large data", async function () {
    // create a queryiterator to run vector search query
    const query =
      "SELECT TOP 1000 c.id AS Id  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'euclidean'}) desc";
    const iterator = container1.items.query(query);
    // execute order by query on it
    let id = 2000;
    while (iterator.hasMoreResults()) {
      const { resources: result } = await iterator.fetchNext();
      if (result !== undefined) {
        for (const item of result) {
          assert.equal(item.Id, id.toString());
          id--;
        }
      }
    }
    assert.equal(id, 1000);
  });

  it("should execute vector search query, large data with offset 1000 and limit 500", async function () {
    // create a queryiterator to run vector search query
    const query =
      "SELECT c.id AS Id  from c ORDER BY VectorDistance([0.0001, 0.0001], c.vector1, true, {distanceFunction:'euclidean'}) desc OFFSET 1000 LIMIT 500";
    const iterator = container1.items.query(query);
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
