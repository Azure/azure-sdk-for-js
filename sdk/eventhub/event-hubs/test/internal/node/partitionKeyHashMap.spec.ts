// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hashPartitionKey } from "../../../src/impl/partitionKeyToIdMapper.js";
import expectations from "./partitionKeyHashMap.json";
import { assert } from "../../utils/chai.js";
import { describe, it } from "vitest";

/**
 * These unit tests have been created from outputs received from the C# implementation
 * of Jenkins lookup3 that the Event Hubs service uses.
 */
describe("hashPartitionKey", function () {
  it("Generated hashes match the ones the service would have generated", async function () {
    (expectations as unknown as { Key: string; Hash: number }[]).map(({ Key, Hash }) =>
      assert.equal(hashPartitionKey(Key), Hash),
    );
  });
});
