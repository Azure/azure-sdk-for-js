// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SpatialIndex } from "../../../src/documents/IndexingPolicy.js";
import { SpatialType } from "../../../src/documents/IndexingPolicy.js";
import { describe, it, expect } from "vitest";

describe("SpatialIndex type", function () {
  it("should allow creating a geographic spatial index without boundingBox", function () {
    const index: SpatialIndex = {
      path: "/location/?",
      types: [SpatialType.Point],
    };
    expect(index.path).toBe("/location/?");
    expect(index.types).toEqual([SpatialType.Point]);
    expect(index.boundingBox).toBeUndefined();
  });

  it("should allow creating a geometry spatial index with boundingBox", function () {
    const index: SpatialIndex = {
      path: "/region/?",
      types: [SpatialType.Polygon],
      boundingBox: {
        xmin: 0,
        ymin: 0,
        xmax: 10,
        ymax: 10,
      },
    };
    expect(index.path).toBe("/region/?");
    expect(index.types).toEqual([SpatialType.Polygon]);
    expect(index.boundingBox).toBeDefined();
    expect(index.boundingBox!.xmin).toBe(0);
    expect(index.boundingBox!.xmax).toBe(10);
  });
});
