"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompleteRoutingMap = createCompleteRoutingMap;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const constants_js_1 = require("../common/constants.js");
const inMemoryCollectionRoutingMap_js_1 = require("./inMemoryCollectionRoutingMap.js");
/**
 * @hidden
 */
function compareRanges(a, b) {
    const aVal = a[0][constants_js_1.Constants.PartitionKeyRange.MinInclusive];
    const bVal = b[0][constants_js_1.Constants.PartitionKeyRange.MinInclusive];
    if (aVal > bVal) {
        return 1;
    }
    if (aVal < bVal) {
        return -1;
    }
    return 0;
}
/** @hidden */
function createCompleteRoutingMap(partitionKeyRangeInfoTuppleList) {
    const rangeById = {}; // TODO: any
    const rangeByInfo = {}; // TODO: any
    let sortedRanges = [];
    // the for loop doesn't invoke any async callback
    for (const r of partitionKeyRangeInfoTuppleList) {
        rangeById[r[0][constants_js_1.Constants.PartitionKeyRange.Id]] = r;
        rangeByInfo[r[1]] = r[0];
        sortedRanges.push(r);
    }
    sortedRanges = sortedRanges.sort(compareRanges);
    const partitionKeyOrderedRange = sortedRanges.map((r) => r[0]);
    const orderedPartitionInfo = sortedRanges.map((r) => r[1]);
    if (!isCompleteSetOfRange(partitionKeyOrderedRange)) {
        return undefined;
    }
    return new inMemoryCollectionRoutingMap_js_1.InMemoryCollectionRoutingMap(partitionKeyOrderedRange, orderedPartitionInfo);
}
/**
 * @hidden
 */
function isCompleteSetOfRange(partitionKeyOrderedRange) {
    // TODO: any
    let isComplete = false;
    if (partitionKeyOrderedRange.length > 0) {
        const firstRange = partitionKeyOrderedRange[0];
        const lastRange = partitionKeyOrderedRange[partitionKeyOrderedRange.length - 1];
        isComplete =
            firstRange[constants_js_1.Constants.PartitionKeyRange.MinInclusive] ===
                constants_js_1.Constants.EffectivePartitionKeyConstants.MinimumInclusiveEffectivePartitionKey;
        isComplete =
            isComplete &&
                lastRange[constants_js_1.Constants.PartitionKeyRange.MaxExclusive] ===
                    constants_js_1.Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey;
        for (let i = 1; i < partitionKeyOrderedRange.length; i++) {
            const previousRange = partitionKeyOrderedRange[i - 1];
            const currentRange = partitionKeyOrderedRange[i];
            isComplete =
                isComplete &&
                    previousRange[constants_js_1.Constants.PartitionKeyRange.MaxExclusive] ===
                        currentRange[constants_js_1.Constants.PartitionKeyRange.MinInclusive];
            if (!isComplete) {
                if (previousRange[constants_js_1.Constants.PartitionKeyRange.MaxExclusive] >
                    currentRange[constants_js_1.Constants.PartitionKeyRange.MinInclusive]) {
                    throw Error("Ranges overlap");
                }
                break;
            }
        }
    }
    return isComplete;
}
//# sourceMappingURL=CollectionRoutingMapFactory.js.map