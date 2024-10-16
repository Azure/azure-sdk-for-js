// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "../utils/chai.js";
import { mapPartitionKeyToId } from "../../src/impl/partitionKeyToIdMapper.js";
import { describe, it } from "vitest";

/**
 * These unit tests have been created from outputs received from the C# implementation
 * of Jenkins lookup3 that the Event Hubs service uses.
 */
describe("mapPartitionKeyToId", function () {
  it("short key, small partitions count", async function () {
    assert.equal(mapPartitionKeyToId("alphabet", 3), 0);
  });

  it("short key, large partitions count", async function () {
    assert.equal(mapPartitionKeyToId("alphabet", 11), 4);
  });

  it("long key, small partitions count", async function () {
    assert.equal(mapPartitionKeyToId("TheBestParitionEver", 4), 2);
  });

  it("long key, large partitions count", async function () {
    assert.equal(mapPartitionKeyToId("TheWorstParitionEver", 15), 1);
  });
});
