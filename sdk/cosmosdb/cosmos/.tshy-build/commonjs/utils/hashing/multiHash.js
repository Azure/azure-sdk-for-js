"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashMultiHashPartitionKey = hashMultiHashPartitionKey;
const v2_js_1 = require("./v2.js");
/**
 * Generate Hash for a `Multi Hash` type partition.
 * @param partitionKey - to be hashed.
 * @returns
 */
function hashMultiHashPartitionKey(partitionKey) {
    return partitionKey.map((keys) => (0, v2_js_1.hashV2PartitionKey)([keys])).join("");
}
//# sourceMappingURL=multiHash.js.map