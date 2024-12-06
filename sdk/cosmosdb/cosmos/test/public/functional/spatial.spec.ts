// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Database } from "../../../src/index.js";
import { DataType, IndexKind } from "../../../src/index.js";
import { createOrUpsertItem, getTestDatabase, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, assert, beforeEach } from "vitest";

describe("Spatial Indexes", { timeout: 10000 }, () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  const spatialIndexTest = async function (isUpsertTest: boolean): Promise<void> {
    // create database
    const database: Database = await getTestDatabase("validate spatial index");

    // create container using an indexing policy with spatial index.
    const indexingPolicy = {
      includedPaths: [
        {
          path: '/"Location"/?',
          indexes: [
            {
              kind: IndexKind.Spatial,
              dataType: DataType.Point,
            },
          ],
        },
        {
          path: "/",
        },
      ],
    };
    const entropy = Math.floor(Math.random() * 10000);
    const { resource: containerDef } = await database.containers.create({
      id: `sample container${entropy}`,
      indexingPolicy,
    });
    const container = database.container(containerDef.id);

    const location1 = {
      id: "location1",
      Location: {
        type: "Point",
        coordinates: [20.0, 20.0],
      },
    };
    await createOrUpsertItem(container, location1, undefined, isUpsertTest);
    const location2 = {
      id: "location2",
      Location: {
        type: "Point",
        coordinates: [100.0, 100.0],
      },
    };
    await createOrUpsertItem(container, location2, undefined, isUpsertTest);
    const query =
      "SELECT * FROM root WHERE (ST_DISTANCE(root.Location, {type: 'Point', coordinates: [20.1, 20]}) < 20000) ";
    const { resources: results } = await container.items.query(query).fetchAll();
    assert.equal(1, results.length);
    assert.equal("location1", results[0].id);
  };

  it("nativeApi Should support spatial index name based", async () => {
    await spatialIndexTest(false);
  });

  it("nativeApi Should support spatial index name based with upsert", async () => {
    await spatialIndexTest(true);
  });
});
