// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { assert } from "console";
import { IndexingPolicy, VectorEmbeddingPolicy } from "../../../src/documents";
import { getTestDatabase } from "../common/TestHelpers";

// Licensed under the MIT license.
describe("VectorEmbeddingPolicy", async () => {
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
    const database = await getTestDatabase("vector embedding database");
    const containerName = "vector embedding container";
    // create container
    const { resource: containerdef } = await database.containers.createIfNotExists({
      id: containerName,
      vectorEmbeddingPolicy: vectorEmbeddingPolicy,
      indexingPolicy: indexingPolicy,
    });

    assert(containerdef.indexingPolicy !== undefined);
    assert(containerdef.vectorEmbeddingPolicy !== undefined);
    console.log("embedding policy: ", containerdef.vectorEmbeddingPolicy);
  });
});
