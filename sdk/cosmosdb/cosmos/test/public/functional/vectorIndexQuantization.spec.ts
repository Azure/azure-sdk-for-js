// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterAll, assert, beforeAll, describe, expect, it } from "vitest";
import type { ContainerRequest, Database, SqlQuerySpec, VectorIndex } from "../../../src/index.js";
import {
  VectorEmbeddingDataType,
  VectorEmbeddingDistanceFunction,
  VectorIndexQuantizationType,
  VectorIndexType,
} from "../../../src/index.js";
import { getDefaultClient, getTestDatabase } from "../common/TestHelpers.js";

const indexTypes = [VectorIndexType.QuantizedFlat, VectorIndexType.DiskANN];
const quantizers = [VectorIndexQuantizationType.Product, VectorIndexQuantizationType.Spherical];
const combinations = indexTypes.flatMap((type) =>
  quantizers.map((quantizerType) => ({ type, quantizerType })),
);
const dimensions = 32;

function definition(id: string, index: VectorIndex): ContainerRequest {
  return {
    id,
    partitionKey: { paths: ["/group"] },
    indexingPolicy: { vectorIndexes: [index] },
    vectorEmbeddingPolicy: {
      vectorEmbeddings: ["/vector", "/other"].map((path) => ({
        path,
        dataType: VectorEmbeddingDataType.Float32,
        dimensions,
        distanceFunction: VectorEmbeddingDistanceFunction.Cosine,
      })),
    },
  };
}

function assertIndex(actual: VectorIndex, expected: VectorIndex): void {
  assert.equal(actual.path, expected.path);
  assert.equal(actual.type, expected.type);
  assert.equal(actual.quantizerType, expected.quantizerType);
  if (expected.quantizationByteSize !== undefined) {
    assert.equal(actual.quantizationByteSize, expected.quantizationByteSize);
  }
  if (expected.quantizerType === VectorIndexQuantizationType.Spherical) {
    assert.isUndefined(actual.quantizationByteSize);
  }
  if (expected.indexingSearchListSize !== undefined) {
    assert.equal(actual.indexingSearchListSize, expected.indexingSearchListSize);
  }
  if (expected.vectorIndexShardKey !== undefined) {
    assert.deepEqual(actual.vectorIndexShardKey, expected.vectorIndexShardKey);
  }
}

describe("Vector index quantization", () => {
  const client = getDefaultClient();
  let database: Database;

  beforeAll(async () => {
    database = await getTestDatabase("vector-quantization", client);
  });

  afterAll(async () => {
    try {
      if (database) await database.delete();
    } finally {
      client.dispose();
    }
  });

  for (const combination of combinations) {
    const { type, quantizerType } = combination;
    const name = `${type}-${quantizerType}`;
    const index: VectorIndex = {
      path: "/vector",
      type,
      quantizerType,
      vectorIndexShardKey: ["/group"],
      ...(quantizerType === VectorIndexQuantizationType.Product ? { quantizationByteSize: 8 } : {}),
      ...(type === VectorIndexType.DiskANN ? { indexingSearchListSize: 100 } : {}),
    };

    it(`creates and reads ${name} with applicable options`, async () => {
      const { container, resource, statusCode } = await database.containers.create(
        definition(`create-${name}`, index),
      );
      try {
        assert.equal(statusCode, 201);
        assertIndex(resource.indexingPolicy.vectorIndexes[0], index);
        const read = await container.read();
        assert.equal(read.statusCode, 200);
        assertIndex(read.resource.indexingPolicy.vectorIndexes[0], index);
      } finally {
        await container.delete();
      }
    });

    it(`preserves ${name} when adding and removing vector indexes`, async () => {
      const { container } = await database.containers.create(definition(`replace-${name}`, index));
      try {
        const { resource } = await container.read();
        const otherIndex: VectorIndex = { ...index, path: "/other" };
        await container.replace({
          ...resource,
          indexingPolicy: { ...resource.indexingPolicy, vectorIndexes: [index, otherIndex] },
        });
        const added = await container.read();
        assert.lengthOf(added.resource.indexingPolicy.vectorIndexes, 2);
        assertIndex(added.resource.indexingPolicy.vectorIndexes[0], index);
        assertIndex(added.resource.indexingPolicy.vectorIndexes[1], otherIndex);
        await container.replace({
          ...added.resource,
          indexingPolicy: { ...added.resource.indexingPolicy, vectorIndexes: [otherIndex] },
        });
        const removed = await container.read();
        assert.lengthOf(removed.resource.indexingPolicy.vectorIndexes, 1);
        assertIndex(removed.resource.indexingPolicy.vectorIndexes[0], otherIndex);
      } finally {
        await container.delete();
      }
    });
  }

  for (const type of indexTypes) {
    it(`supports the product default for ${type} without quantizerType`, async () => {
      const { container } = await database.containers.create(
        definition(`default-${type}`, { path: "/vector", type, quantizationByteSize: 8 }),
      );
      try {
        const { resource } = await container.read();
        const index = resource.indexingPolicy.vectorIndexes[0];
        assert.equal(index.type, type);
        assert.equal(index.quantizationByteSize, 8);
        assert.oneOf(index.quantizerType, [undefined, VectorIndexQuantizationType.Product]);
      } finally {
        await container.delete();
      }
    });

    for (const quantizationByteSize of [1, dimensions]) {
      it(`supports product quantizationByteSize=${quantizationByteSize} for ${type}`, async () => {
        const index: VectorIndex = {
          path: "/vector",
          type,
          quantizerType: VectorIndexQuantizationType.Product,
          quantizationByteSize,
        };
        const { container } = await database.containers.create(
          definition(`bytes-${type}-${quantizationByteSize}`, index),
        );
        try {
          const { resource } = await container.read();
          assertIndex(resource.indexingPolicy.vectorIndexes[0], index);
        } finally {
          await container.delete();
        }
      });
    }

    for (const quantizationByteSize of [0, dimensions + 1]) {
      it(`rejects product quantizationByteSize=${quantizationByteSize} for ${type}`, async () => {
        await expect(
          database.containers.create(
            definition(`invalid-bytes-${type}-${quantizationByteSize}`, {
              path: "/vector",
              type,
              quantizerType: VectorIndexQuantizationType.Product,
              quantizationByteSize,
            }),
          ),
        ).rejects.toMatchObject({ code: 400 });
      });
    }

    it(`rejects spherical quantizationByteSize on create and replace for ${type}`, async () => {
      const index: VectorIndex = {
        path: "/vector",
        type,
        quantizerType: VectorIndexQuantizationType.Spherical,
      };
      const invalidIndex = { ...index, quantizationByteSize: 2 };
      const error = {
        code: 400,
        message: expect.stringContaining("QuantizationByteSize is only allowed for QuantizerType"),
      };
      await expect(
        database.containers.create(definition(`invalid-spherical-${type}`, invalidIndex)),
      ).rejects.toMatchObject(error);
      const { container } = await database.containers.create(
        definition(`invalid-replace-${type}`, index),
      );
      try {
        const { resource } = await container.read();
        await expect(
          container.replace({
            ...resource,
            indexingPolicy: { ...resource.indexingPolicy, vectorIndexes: [invalidIndex] },
          }),
        ).rejects.toMatchObject(error);
        const read = await container.read();
        assertIndex(read.resource.indexingPolicy.vectorIndexes[0], index);
      } finally {
        await container.delete();
      }
    });

    it(`rejects an unknown quantizer for ${type}`, async () => {
      await expect(
        database.containers.create(
          definition(`unknown-${type}`, {
            path: "/vector",
            type,
            quantizerType: "unsupported" as VectorIndexQuantizationType,
          }),
        ),
      ).rejects.toMatchObject({ code: 400 });
    });
  }

  it("retains a flat index without quantizerType", async () => {
    const { container } = await database.containers.create(
      definition("flat", { path: "/vector", type: VectorIndexType.Flat }),
    );
    try {
      const { resource } = await container.read();
      assertIndex(resource.indexingPolicy.vectorIndexes[0], {
        path: "/vector",
        type: VectorIndexType.Flat,
      });
      assert.isUndefined(resource.indexingPolicy.vectorIndexes[0].quantizationByteSize);
    } finally {
      await container.delete();
    }
  });

  for (const quantizerType of quantizers) {
    it(`rejects ${quantizerType} quantization on a flat index`, async () => {
      await expect(
        database.containers.create(
          definition(`flat-${quantizerType}`, {
            path: "/vector",
            type: VectorIndexType.Flat,
            quantizerType,
          }),
        ),
      ).rejects.toMatchObject({ code: 400 });
    });
  }

  it("preserves quantizers with the PR's float32, int8, and uint8 embedding policies", async () => {
    const indexes: VectorIndex[] = [
      { path: "/vector1", type: VectorIndexType.Flat },
      {
        path: "/vector2",
        type: VectorIndexType.QuantizedFlat,
        quantizerType: VectorIndexQuantizationType.Product,
        quantizationByteSize: 1,
        vectorIndexShardKey: ["/Country"],
      },
      {
        path: "/vector3",
        type: VectorIndexType.DiskANN,
        quantizerType: VectorIndexQuantizationType.Spherical,
        indexingSearchListSize: 100,
        vectorIndexShardKey: ["/ZipCode"],
      },
    ];
    const { container } = await database.containers.create({
      id: "mixed-embedding-policies",
      indexingPolicy: { vectorIndexes: indexes },
      vectorEmbeddingPolicy: {
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
      },
    });
    try {
      const { resource } = await container.read();
      assert.lengthOf(resource.indexingPolicy.vectorIndexes, indexes.length);
      indexes.forEach((index, i) => assertIndex(resource.indexingPolicy.vectorIndexes[i], index));
    } finally {
      await container.delete();
    }
  });

  it("returns vector query results for all quantizers on small and larger datasets", async () => {
    const indexes: VectorIndex[] = combinations.map((combination, i) => ({
      path: `/vector${i}`,
      ...combination,
    }));
    const { container } = await database.containers.create({
      id: "indexed-query-matrix",
      partitionKey: { paths: ["/group"] },
      indexingPolicy: {
        includedPaths: [{ path: "/*" }],
        excludedPaths: indexes.map((index) => ({ path: `${index.path}/*` })),
        vectorIndexes: indexes,
      },
      vectorEmbeddingPolicy: {
        vectorEmbeddings: indexes.map((index) => ({
          path: index.path,
          dataType: VectorEmbeddingDataType.Float32,
          dimensions,
          distanceFunction: VectorEmbeddingDistanceFunction.Cosine,
        })),
      },
    });
    try {
      const vector = (i: number): number[] => {
        const values = Array.from(
          { length: dimensions },
          (_, d) => Math.sin((i + 1) * (d + 1) * 0.013) + Math.cos((i + 3) * (d + 2) * 0.007),
        );
        const norm = Math.sqrt(values.reduce((sum, value) => sum + value * value, 0));
        return values.map((value) => Math.fround(value / norm));
      };
      const insert = async (i: number): Promise<void> => {
        const embedding = vector(i);
        const vectors = Object.fromEntries(
          indexes.map((index) => [index.path.slice(1), embedding]),
        );
        const response = await container.items.create({ id: `v-${i}`, group: "test", ...vectors });
        await new Promise((resolve) => setTimeout(resolve, Math.ceil(response.requestCharge * 5)));
      };
      const query = (index: VectorIndex, bruteForce: boolean, target: number): SqlQuerySpec => ({
        query: `SELECT TOP 10 c.id, VectorDistance(c${index.path.replace("/", ".")}, @v, ${bruteForce}) AS distance FROM c ORDER BY VectorDistance(c${index.path.replace("/", ".")}, @v, ${bruteForce})`,
        parameters: [{ name: "@v", value: vector(target) }],
      });
      for (let i = 0; i < 5; i++) await insert(i);
      for (const index of indexes) {
        const response = await container.items
          .query<{ id: string; distance: number }>(query(index, false, 2), {
            partitionKey: "test",
          })
          .fetchAll();
        assert.lengthOf(response.resources, 5);
        assert.equal(response.resources[0].id, "v-2");
      }
      // Synthetic vectors exercise query results, not semantic recall or performance.
      const count = 1200;
      for (let i = 5; i < count; i++) await insert(i);
      const counted = await container.items
        .query<number>("SELECT VALUE COUNT(1) FROM c")
        .fetchAll();
      assert.equal(counted.resources[0], count);
      const baseline = await container.items
        .query<{ id: string; distance: number }>(query(indexes[0], true, 42), {
          partitionKey: "test",
        })
        .fetchAll();
      assert.lengthOf(baseline.resources, 10);
      assert.equal(baseline.resources[0].id, "v-42");
      for (const index of indexes) {
        const response = await container.items
          .query<{ id: string; distance: number }>(query(index, false, 42), {
            partitionKey: "test",
          })
          .fetchAll();
        assert.lengthOf(response.resources, 10);
        assert.equal(new Set(response.resources.map((item) => item.id)).size, 10);
        assert.include(
          response.resources.map((item) => item.id),
          "v-42",
        );
        assert.isTrue(response.resources.every((item) => Number.isFinite(item.distance)));
      }
    } finally {
      await container.delete();
    }
  });
});
