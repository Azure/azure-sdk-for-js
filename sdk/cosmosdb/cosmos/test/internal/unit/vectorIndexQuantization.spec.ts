// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import type { IndexingPolicy, VectorIndex } from "../../../src/index.js";
import { VectorIndexQuantizationType, VectorIndexType } from "../../../src/index.js";

describe("Vector index quantization serialization", () => {
  it("exports the service quantizer names from the public API", () => {
    assert.equal(VectorIndexQuantizationType.Product, "product");
    assert.equal(VectorIndexQuantizationType.Spherical, "spherical");
  });

  for (const type of [VectorIndexType.QuantizedFlat, VectorIndexType.DiskANN]) {
    for (const quantizerType of [
      VectorIndexQuantizationType.Product,
      VectorIndexQuantizationType.Spherical,
    ]) {
      it(`round-trips ${type}/${quantizerType} and its applicable options`, () => {
        const index: VectorIndex = {
          path: "/embedding",
          type,
          quantizerType,
          vectorIndexShardKey: ["/region"],
          ...(quantizerType === VectorIndexQuantizationType.Product
            ? { quantizationByteSize: 8 }
            : {}),
          ...(type === VectorIndexType.DiskANN ? { indexingSearchListSize: 100 } : {}),
        };
        const policy: IndexingPolicy = { vectorIndexes: [index] };
        const serialized = JSON.stringify(policy);
        const deserialized: IndexingPolicy = JSON.parse(serialized);
        assert.deepEqual(deserialized, policy);
        assert.include(serialized, `"quantizerType":"${quantizerType}"`);
        if (quantizerType === VectorIndexQuantizationType.Spherical) {
          assert.notInclude(serialized, "quantizationByteSize");
        }
      });
    }
  }

  for (const type of Object.values(VectorIndexType)) {
    it(`omits an unspecified quantizer for ${type} without changing the policy`, () => {
      const index: VectorIndex = { path: "/embedding", type };
      const policy: IndexingPolicy = { vectorIndexes: [index] };
      const serialized = JSON.stringify(policy);
      assert.notInclude(serialized, "quantizerType");
      assert.deepEqual(JSON.parse(serialized), policy);
      assert.notProperty(index, "quantizerType");
    });
  }
});
