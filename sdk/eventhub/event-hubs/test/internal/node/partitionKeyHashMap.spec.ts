// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { hashPartitionKey } from "../../../src/impl/partitionKeyToIdMapper";

/**
 * These unit tests have been created from outputs received from the C# implementation
 * of Jenkins lookup3 that the Event Hubs service uses.
 */
describe("hashPartitionKey", () => {
  it("Generated hashes match the ones the service would have generated", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const expectations: { Key: string; Hash: number }[] = require("./partitionKeyHashMap.json");
    expectations.map(({ Key, Hash }) => assert.equal(hashPartitionKey(Key), Hash));
  });
});
