// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GeospatialType, SpatialType } from "../../../src/index.js";
import { getTestDatabase, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

describe("Spatial Index - boundingBox behavior", { timeout: 30000 }, () => {
  beforeAll(async () => {
    await removeAllDatabases();
  });

  afterAll(async () => {
    await removeAllDatabases();
  });

  it("should allow creating a Geography spatial index without boundingBox", async () => {
    const database = await getTestDatabase("geo-no-bbox");

    const { resource: containerDef } = await database.containers.create({
      id: "geo-no-bbox-container",
      partitionKey: { paths: ["/id"] },
      indexingPolicy: {
        spatialIndexes: [
          {
            path: "/location/?",
            types: [SpatialType.Point],
          },
        ],
      },
      geospatialConfig: { type: GeospatialType.Geography },
    });

    expect(containerDef).toBeDefined();
    expect(containerDef!.id).toBe("geo-no-bbox-container");
    const spatialIndexes = containerDef!.indexingPolicy?.spatialIndexes;
    expect(spatialIndexes).toBeDefined();
    expect(spatialIndexes!.length).toBe(1);
    expect(spatialIndexes![0].path).toBe("/location/?");
    expect(spatialIndexes![0].boundingBox).toBeUndefined();
  });

  it("should allow creating a Geometry spatial index with boundingBox", async () => {
    const database = await getTestDatabase("geom-with-bbox");

    const { resource: containerDef } = await database.containers.create({
      id: "geom-with-bbox-container",
      partitionKey: { paths: ["/id"] },
      indexingPolicy: {
        spatialIndexes: [
          {
            path: "/location/?",
            types: [SpatialType.Point, SpatialType.Polygon],
            boundingBox: {
              xmin: 0,
              ymin: 0,
              xmax: 100,
              ymax: 100,
            },
          },
        ],
      },
      geospatialConfig: { type: GeospatialType.Geometry },
    });

    expect(containerDef).toBeDefined();
    expect(containerDef!.id).toBe("geom-with-bbox-container");
    const spatialIndexes = containerDef!.indexingPolicy?.spatialIndexes;
    expect(spatialIndexes).toBeDefined();
    expect(spatialIndexes!.length).toBe(1);
    expect(spatialIndexes![0].boundingBox).toBeDefined();
    expect(spatialIndexes![0].boundingBox!.xmin).toBe(0);
    expect(spatialIndexes![0].boundingBox!.ymax).toBe(100);
  });

  it("should reject creating a Geometry spatial index without boundingBox", async () => {
    const database = await getTestDatabase("geom-no-bbox");

    try {
      await database.containers.create({
        id: "geom-no-bbox-container",
        partitionKey: { paths: ["/id"] },
        indexingPolicy: {
          spatialIndexes: [
            {
              path: "/location/?",
              types: [SpatialType.Point],
            },
          ],
        },
        geospatialConfig: { type: GeospatialType.Geometry },
      });
      expect.unreachable("Should have thrown for Geometry without boundingBox");
    } catch (err: any) {
      expect(err.code).toBe(400);
      expect(err.message).toContain("boundingBox");
      expect(err.message).toContain("Geometry");
    }
  });

  it("should reject creating a Geography spatial index with boundingBox", async () => {
    const database = await getTestDatabase("geo-with-bbox");

    try {
      await database.containers.create({
        id: "geo-with-bbox-container",
        partitionKey: { paths: ["/id"] },
        indexingPolicy: {
          spatialIndexes: [
            {
              path: "/location/?",
              types: [SpatialType.Point],
              boundingBox: {
                xmin: -180,
                ymin: -90,
                xmax: 180,
                ymax: 90,
              },
            },
          ],
        },
        geospatialConfig: { type: GeospatialType.Geography },
      });
      expect.unreachable("Should have thrown for Geography with boundingBox");
    } catch (err: any) {
      expect(err.code).toBe(400);
      expect(err.message).toContain("boundingBox");
      expect(err.message).toContain("Geography");
    }
  });
});
