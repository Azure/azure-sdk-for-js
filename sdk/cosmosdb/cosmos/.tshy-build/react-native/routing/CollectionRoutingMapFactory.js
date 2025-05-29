// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/constants.js";
import { InMemoryCollectionRoutingMap } from "./inMemoryCollectionRoutingMap.js";
/**
 * @hidden
 */
function compareRanges(a, b) {
    const aVal = a[0][Constants.PartitionKeyRange.MinInclusive];
    const bVal = b[0][Constants.PartitionKeyRange.MinInclusive];
    if (aVal > bVal) {
        return 1;
    }
    if (aVal < bVal) {
        return -1;
    }
    return 0;
}
/** @hidden */
export function createCompleteRoutingMap(partitionKeyRangeInfoTuppleList) {
    const rangeById = {}; // TODO: any
    const rangeByInfo = {}; // TODO: any
    let sortedRanges = [];
    // the for loop doesn't invoke any async callback
    for (const r of partitionKeyRangeInfoTuppleList) {
        rangeById[r[0][Constants.PartitionKeyRange.Id]] = r;
        rangeByInfo[r[1]] = r[0];
        sortedRanges.push(r);
    }
    sortedRanges = sortedRanges.sort(compareRanges);
    const partitionKeyOrderedRange = sortedRanges.map((r) => r[0]);
    const orderedPartitionInfo = sortedRanges.map((r) => r[1]);
    if (!isCompleteSetOfRange(partitionKeyOrderedRange)) {
        return undefined;
    }
    return new InMemoryCollectionRoutingMap(partitionKeyOrderedRange, orderedPartitionInfo);
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
            firstRange[Constants.PartitionKeyRange.MinInclusive] ===
                Constants.EffectivePartitionKeyConstants.MinimumInclusiveEffectivePartitionKey;
        isComplete =
            isComplete &&
                lastRange[Constants.PartitionKeyRange.MaxExclusive] ===
                    Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey;
        for (let i = 1; i < partitionKeyOrderedRange.length; i++) {
            const previousRange = partitionKeyOrderedRange[i - 1];
            const currentRange = partitionKeyOrderedRange[i];
            isComplete =
                isComplete &&
                    previousRange[Constants.PartitionKeyRange.MaxExclusive] ===
                        currentRange[Constants.PartitionKeyRange.MinInclusive];
            if (!isComplete) {
                if (previousRange[Constants.PartitionKeyRange.MaxExclusive] >
                    currentRange[Constants.PartitionKeyRange.MinInclusive]) {
                    throw Error("Ranges overlap");
                }
                break;
            }
        }
    }
    return isComplete;
}
//# sourceMappingURL=CollectionRoutingMapFactory.js.map