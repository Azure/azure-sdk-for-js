// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { mapPartitionKeyToId } from "../../../src/impl/patitionKeyToIdMapper";

/**
 * These unit tests have been created from outputs received from the C# implementation
 * of Jenkins lookup3 that the Event Hubs service uses.
 */
describe("mapPartitionKeyToId", () => {
  it("short key, small partitions count", () => {
    assert.equal(mapPartitionKeyToId("alphabet", 3), 0);
  });

  it("short key, large partitions count", () => {
    assert.equal(mapPartitionKeyToId("alphabet", 11), 4);
  });

  it("long key, small partitions count", () => {
    assert.equal(mapPartitionKeyToId("TheBestParitionEver", 4), 2);
  });

  it("long key, large partitions count", () => {
    assert.equal(mapPartitionKeyToId("TheWorstParitionEver", 15), 1);
  });
});
