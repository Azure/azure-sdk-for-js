// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "../utils/chai.js";
import {
  clearPartitionKeyToIdCache,
  mapPartitionKeyToId,
} from "../../src/impl/partitionKeyToIdMapper.js";
import { Buffer } from "buffer";
import { beforeEach, describe, it, vi } from "vitest";

/**
 * These unit tests have been created from outputs received from the C# implementation
 * of Jenkins lookup3 that the Event Hubs service uses.
 */
describe("mapPartitionKeyToId", () => {
  beforeEach(() => {
    clearPartitionKeyToIdCache();
  });

  it("short key, small partitions count", async () => {
    assert.equal(mapPartitionKeyToId("alphabet", 3), 0);
  });

  it("short key, large partitions count", async () => {
    assert.equal(mapPartitionKeyToId("alphabet", 11), 4);
  });

  it("long key, small partitions count", async () => {
    assert.equal(mapPartitionKeyToId("TheBestParitionEver", 4), 2);
  });

  it("long key, large partitions count", async () => {
    assert.equal(mapPartitionKeyToId("TheWorstParitionEver", 15), 1);
  });

  it("reuses cached partition ids for repeated keys", async () => {
    const bufferFromSpy = vi.spyOn(Buffer, "from");

    assert.equal(mapPartitionKeyToId("cached-key", 8), mapPartitionKeyToId("cached-key", 8));
    assert.equal(bufferFromSpy.mock.calls.length, 1);

    bufferFromSpy.mockRestore();
  });
});
