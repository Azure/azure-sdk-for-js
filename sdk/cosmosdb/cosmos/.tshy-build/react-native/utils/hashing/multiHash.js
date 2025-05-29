import { hashV2PartitionKey } from "./v2.js";
/**
 * Generate Hash for a `Multi Hash` type partition.
 * @param partitionKey - to be hashed.
 * @returns
 */
export function hashMultiHashPartitionKey(partitionKey) {
    return partitionKey.map((keys) => hashV2PartitionKey([keys])).join("");
}
//# sourceMappingURL=multiHash.js.map