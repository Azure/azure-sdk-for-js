import { describe, it, assert } from "vitest";
import { binarySearchOnPartitionKeyRanges, hashPartitionKey } from "../../../src/utils/hashing/hash.js";
import { isKeyInRange } from "../../../src/utils/batch.js";
import { PartitionKeyDefinition, PartitionKeyRange } from "../../../src/index.js";
import { PartitionKeyKind } from "../../../dist/esm/index.js";

const partitionKeyDefinition : PartitionKeyDefinition = {
  paths: ["/name"],
  kind: PartitionKeyKind.MultiHash,
  version: 2,
};

const partitionKeyRanges: PartitionKeyRange[] = [
  {
    id: "0",
    minInclusive: "",
    maxExclusive: "0FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    ridPrefix: 0,
    throughputFraction: 0.25,
    status: "online",
    parents: [],
  },
  {
    id: "1",
    minInclusive: "0FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    maxExclusive: "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE",
    ridPrefix: 1,
    throughputFraction: 0.25,
    status: "online",
    parents: [],
  },
  {
    id: "2",
    minInclusive: "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE",
    maxExclusive: "2FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFD",
    ridPrefix: 2,
    throughputFraction: 0.25,
    status: "online",
    parents: [],
  },
  {
    id: "3",
    minInclusive: "2FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFD",
    maxExclusive: "FF",
    ridPrefix: 3,
    throughputFraction: 0.25,
    status: "online",
    parents: [],
  },
];

describe("PartitionKeyRange Binary Search Test", () => {
  it("binarySearchOnPartitionKeyRanges matches find for partition keys sample0 to sample10", () => {
    for (let i = 0; i <= 10; i++) {
      const pkValue = `sample${i}`;

      const partitionKey = [pkValue];

      const hashedKey = hashPartitionKey(partitionKey, partitionKeyDefinition);

      const binarySearchResult = binarySearchOnPartitionKeyRanges(partitionKeyRanges, hashedKey);
      const findResult = partitionKeyRanges.find((range) =>
        isKeyInRange(range.minInclusive, range.maxExclusive, hashedKey)
      )?.id;

      assert.equal(
        binarySearchResult,
        findResult,
        `Mismatch for key '${pkValue}': binarySearch=${binarySearchResult}, find=${findResult}`
      );
    }
  });
});
