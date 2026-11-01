// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Container,
  CosmosClient,
  Database,
  IndexingPolicy,
  VectorEmbeddingPolicy,
} from "../../../src/index.js";
import {
  VectorEmbeddingDataType,
  VectorEmbeddingDistanceFunction,
  VectorIndexType,
} from "../../../src/index.js";
import { getDefaultClient, getTestDatabase } from "../common/TestHelpers.js";
import { afterAll, assert, beforeAll, describe, it } from "vitest";

interface VectorQueryResult {
  id: string;
  distance: number;
}

// Float16 is not supported by the emulator used in CI. Set ACCOUNT_HOST and ACCOUNT_KEY
// for a disposable test account with vector search and float16 support to run this suite.
const hasRequiredEnv = Boolean(process.env.ACCOUNT_HOST && process.env.ACCOUNT_KEY);

describe.skipIf(!hasRequiredEnv)("Vector embedding data types", { timeout: 120000 }, () => {
  const vectorCases = [
    { dataType: VectorEmbeddingDataType.Float16, queryVector: [0.5, -1.25, 2] },
    { dataType: VectorEmbeddingDataType.Float32, queryVector: [0.25, -0.5, 1.5] },
    { dataType: VectorEmbeddingDataType.Int8, queryVector: [-8, 12, 4] },
    { dataType: VectorEmbeddingDataType.UInt8, queryVector: [200, 150, 3] },
  ];
  const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
    vectorEmbeddings: vectorCases.map(({ dataType }) => ({
      path: `/${dataType}`,
      dataType,
      dimensions: 3,
      distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
    })),
  };
  const indexingPolicy: IndexingPolicy = {
    includedPaths: [{ path: "/*" }],
    excludedPaths: vectorCases.map(({ dataType }) => ({ path: `/${dataType}/*` })),
    vectorIndexes: vectorCases.map(({ dataType }) => ({
      path: `/${dataType}`,
      type: VectorIndexType.QuantizedFlat,
    })),
  };
  let client: CosmosClient;
  let database: Database | undefined;
  let container: Container;

  beforeAll(async () => {
    client = getDefaultClient();
    database = await getTestDatabase("vector-data-types", client);
    const response = await database.containers.create({
      id: "all-vector-types",
      partitionKey: "/id",
      vectorEmbeddingPolicy,
      indexingPolicy,
    });
    container = response.container;
    assert.equal(response.statusCode, 201);
    assert.deepEqual(response.resource?.vectorEmbeddingPolicy, vectorEmbeddingPolicy);
    assert.deepEqual(
      response.resource?.indexingPolicy?.vectorIndexes?.map(({ path, type }) => ({ path, type })),
      indexingPolicy.vectorIndexes,
    );

    // Insert out of distance order. Fractional, negative, and >127 components exercise
    // floating-point, signed integer, and unsigned integer embeddings respectively.
    for (const item of [
      {
        id: "far",
        category: "included",
        float16: [6.5, 6.75, 2],
        float32: [6.25, 7.5, 1.5],
        int8: [-2, 20, 4],
        uint8: [206, 158, 3],
      },
      {
        id: "near",
        category: "included",
        float16: [0.5, -1.25, 2],
        float32: [0.25, -0.5, 1.5],
        int8: [-8, 12, 4],
        uint8: [200, 150, 3],
      },
      {
        id: "middle",
        category: "excluded",
        float16: [3.5, 2.75, 2],
        float32: [3.25, 3.5, 1.5],
        int8: [-5, 16, 4],
        uint8: [203, 154, 3],
      },
    ]) {
      const { statusCode } = await container.items.create(item);
      assert.equal(statusCode, 201);
    }
  });

  afterAll(async () => {
    try {
      await database?.delete();
    } finally {
      client?.dispose();
    }
  });

  it("round-trips every embedding and vector index in container metadata", async () => {
    const { resource, statusCode } = await container.read();
    assert.equal(statusCode, 200);
    assert.deepEqual(resource?.vectorEmbeddingPolicy, vectorEmbeddingPolicy);
    assert.deepEqual(
      resource?.indexingPolicy?.vectorIndexes?.map(({ path, type }) => ({ path, type })),
      indexingPolicy.vectorIndexes,
    );
  });

  it.each(vectorCases)(
    "queries and filters $dataType embeddings",
    async ({ dataType, queryVector }) => {
      // With only three items, quantizedFlat can fall back to a scan. This validates
      // query results with an index policy, not approximate-index recall.
      for (const forceBruteForce of [false, true]) {
        const distance = `VectorDistance(c.${dataType}, @vector, ${forceBruteForce})`;
        const { resources } = await container.items
          .query<VectorQueryResult>({
            query: `SELECT TOP 3 c.id, ${distance} AS distance FROM c ORDER BY ${distance}`,
            parameters: [{ name: "@vector", value: queryVector }],
          })
          .fetchAll();

        assert.deepEqual(
          resources.map(({ id }) => id),
          ["near", "middle", "far"],
        );
        for (const result of resources) {
          assert.isTrue(Number.isFinite(result.distance));
        }
        assert.closeTo(resources[0].distance, 0, 0.0001);
        assert.isAbove(resources[1].distance, resources[0].distance);
        assert.isAbove(resources[2].distance, resources[1].distance);
      }

      const distance = `VectorDistance(c.${dataType}, @vector)`;
      const { resources } = await container.items
        .query<VectorQueryResult>({
          query:
            `SELECT TOP 2 c.id, ${distance} AS distance FROM c ` +
            `WHERE c.category = @category ORDER BY ${distance}`,
          parameters: [
            { name: "@vector", value: queryVector },
            { name: "@category", value: "included" },
          ],
        })
        .fetchAll();

      assert.deepEqual(
        resources.map(({ id }) => id),
        ["near", "far"],
      );
      assert.closeTo(resources[0].distance, 0, 0.0001);
      assert.isTrue(Number.isFinite(resources[1].distance));
      assert.isAbove(resources[1].distance, resources[0].distance);
    },
  );
});
