// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { IndexingPolicy, VectorEmbeddingPolicy } from "../../../src/documents";
import { getTestDatabase } from "../common/TestHelpers";
import { Database } from "../../../src/client/Database/Database";

// Skipping these tests as they are not supported by public emulator
describe.skip("VectorEmbeddingPolicy", async () => {
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
          dimensions: 1000,
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
          dimensions: 1000,
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
          dimensions: 1000,
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

  after(async function () {
    await database.delete();
  });
});
