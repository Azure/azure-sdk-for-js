"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAvailablePartitions = listAvailablePartitions;
const logger_js_1 = require("../logger.js");
/**
 * This method will create a new map of partition id and PartitionOwnership containing only those partitions
 * that are actively owned.
 * All entries in the original map that haven't been modified for a duration of time greater than the allowed
 * inactivity time limit are assumed to be owned by dead event processors.
 * These will not be included in the map returned by this method.
 *
 * @param partitionOwnershipMap - The existing PartitionOwnerships mapped by partition.
 * @param expirationIntervalInMs - The length of time a PartitionOwnership claim is valid.
 */
function getActivePartitionOwnerships(partitionOwnershipMap, expirationIntervalInMs) {
    const activePartitionOwnershipMap = new Map();
    partitionOwnershipMap.forEach((partitionOwnership, partitionId) => {
        // If lastModifiedtimeInMs is missing, assume it is inactive.
        if (typeof partitionOwnership.lastModifiedTimeInMs === "undefined" ||
            partitionOwnership.lastModifiedTimeInMs === null) {
            return;
        }
        const timeSincePartitionClaimed = Date.now() - partitionOwnership.lastModifiedTimeInMs;
        if (timeSincePartitionClaimed < expirationIntervalInMs && partitionOwnership.ownerId) {
            activePartitionOwnershipMap.set(partitionId, partitionOwnership);
        }
    });
    return activePartitionOwnershipMap;
}
/**
 * Calculates the minimum number of partitions each EventProcessor should own,
 * and the number of EventProcessors that should have an extra partition assigned.
 * @param ownerToOwnershipMap - The current ownerships for partitions.
 * @param partitionIds - The full list of the Event Hub's partition ids.
 * @internal
 */
function calculateBalancedLoadCounts(ownerToOwnershipMap, partitionIds) {
    // Calculate the minimum number of partitions every EventProcessor should own when the load
    // is evenly distributed.
    const minPartitionsPerOwner = Math.floor(partitionIds.length / ownerToOwnershipMap.size);
    // If the number of partitions in the Event Hub is not evenly divisible by the number of active
    // EventProcesrrors, some EventProcessors may own 1 partition in addition to the minimum when the
    // load is balanced.
    // Calculate the number of EventProcessors that can own an additional partition.
    const requiredNumberOfOwnersWithExtraPartition = partitionIds.length % ownerToOwnershipMap.size;
    return {
        minPartitionsPerOwner,
        requiredNumberOfOwnersWithExtraPartition,
    };
}
/**
 * Counts the EventProcessors and tallies them by type.
 *
 * To be in balance we need to make sure that each EventProcessor is only consuming
 * their fair share.
 *
 * When the partitions are divvied up we will sometimes end up with some EventProcessors
 * that will have 1 more partition than others.
 * This can happen if the number of partitions is not evenly divisible by the number of EventProcessors.
 *
 * So this function largely exists to support isLoadBalanced() and
 * shouldOwnMorePartitions(), both of which depend on knowing if our current list
 * of EventProcessors is actually in the proper state.
 *
 * @param minPartitionsPerOwner - The number of required partitions per EventProcessor.
 * @param ownerToOwnershipMap - The current ownerships for partitions.
 * @internal
 */
function getEventProcessorCounts(minPartitionsPerOwner, ownerToOwnershipMap) {
    const counts = {
        haveRequiredPartitions: 0,
        haveAdditionalPartition: 0,
        haveTooManyPartitions: 0,
    };
    for (const ownershipList of ownerToOwnershipMap.values()) {
        const numberOfPartitions = ownershipList.length;
        // there are basically three kinds of partition counts
        // for a processor:
        if (numberOfPartitions === minPartitionsPerOwner) {
            // 1. Has _exactly_ the required number of partitions
            counts.haveRequiredPartitions++;
        }
        else if (numberOfPartitions === minPartitionsPerOwner + 1) {
            // 2. Has the required number plus one extra (correct in cases)
            // where the # of partitions is not evenly divisible by the
            // number of processors.
            counts.haveAdditionalPartition++;
        }
        else if (numberOfPartitions > minPartitionsPerOwner + 1) {
            // 3. has more than the possible # of partitions required
            counts.haveTooManyPartitions++;
        }
    }
    return counts;
}
/**
 * Validates that we are currently in a balanced state - all EventProcessors own the
 * minimum required number of partitions (and additional partitions, if the # of partitions
 * is not evenly divisible by the # of EventProcessors).
 *
 * @param requiredNumberOfOwnersWithExtraPartition - The # of EventProcessors that process an additional partition, in addition to the required minimum.
 * @param totalExpectedProcessors - The total # of EventProcessors we expect.
 * @param eventProcessorCounts - EventProcessor counts, grouped by criteria.
 * @internal
 */
function isLoadBalanced(requiredNumberOfOwnersWithExtraPartition, totalExpectedEventProcessors, { haveAdditionalPartition, haveRequiredPartitions }) {
    return (haveAdditionalPartition === requiredNumberOfOwnersWithExtraPartition &&
        haveRequiredPartitions + haveAdditionalPartition === totalExpectedEventProcessors);
}
/**
 * Determines the number of new partitions to claim for this particular processor.
 *
 * @param minRequired - The minimum required number of partitions.
 * @param requiredNumberOfOwnersWithExtraPartition - The current number of processors that should have an additional partition.
 * @param numPartitionsOwnedByUs - The number of partitions we currently own.
 * @param eventProcessorCounts - Processors, grouped by criteria.
 * @internal
 */
function getNumberOfPartitionsToClaim(minRequiredPartitionCount, requiredNumberOfOwnersWithExtraPartition, numPartitionsOwnedByUs, { haveAdditionalPartition, haveTooManyPartitions }) {
    let actualRequiredPartitionCount = minRequiredPartitionCount;
    if (requiredNumberOfOwnersWithExtraPartition > 0 &&
        // Eventually the `haveTooManyPartitions` will decay into `haveAdditionalPartition`
        // EventProcessors as partitions are balanced to consumers that aren't at par.
        // We can consider them to be `haveAdditionalPartition` EventProcessors for our purposes.
        haveAdditionalPartition + haveTooManyPartitions < requiredNumberOfOwnersWithExtraPartition) {
        // Overall we don't have enough EventProcessors that are taking on an additional partition
        // so we should attempt to.
        actualRequiredPartitionCount = minRequiredPartitionCount + 1;
    }
    return actualRequiredPartitionCount - numPartitionsOwnedByUs;
}
/**
 * Determines which partitions can be stolen from other owners while maintaining
 * a balanced state.
 * @param numberOfPartitionsToClaim - The number of partitions the owner needs to claim to reach a balanced state.
 * @param minPartitionsPerOwner - The minimum number of partitions each owner needs for the partition load to be balanced.
 * @param requiredNumberOfOwnersWithExtraPartition - The number of owners that should have 1 extra partition.
 * @param ourOwnerId - The id of _our_ owner.
 * @param ownerToOwnershipMap - The current ownerships for partitions.
 * @internal
 */
function findPartitionsToSteal(numberOfPartitionsToClaim, minPartitionsPerOwner, requiredNumberOfOwnersWithExtraPartition, ourOwnerId, ownerToOwnershipMap) {
    const partitionsToSteal = [];
    // Create a list of PartitionOwnership lists that we can steal from.
    const listOfPartitionOwnerships = [];
    ownerToOwnershipMap.forEach((partitionOwnerships, ownerId) => {
        if (ownerId === ourOwnerId || partitionOwnerships.length <= minPartitionsPerOwner)
            return;
        listOfPartitionOwnerships.push(partitionOwnerships);
    });
    // Sort the list in descending order based on the length of each element.
    listOfPartitionOwnerships.sort((a, b) => {
        if (a.length > b.length)
            return -1;
        if (a.length < b.length)
            return 1;
        return 0;
    });
    // Attempt to steal partitions from EventProcessors that have the most partitions 1st,
    // then work our way down.
    let ownersEncounteredWithExtraPartitions = 0;
    let currentPartitionOwnershipList = listOfPartitionOwnerships.shift();
    while (numberOfPartitionsToClaim > 0 && currentPartitionOwnershipList) {
        let ownersExpectedPartitionCount = minPartitionsPerOwner;
        // Determine if the current owner should be allowed to have an extra partition.
        if (ownersEncounteredWithExtraPartitions < requiredNumberOfOwnersWithExtraPartition) {
            ownersExpectedPartitionCount++;
        }
        ownersEncounteredWithExtraPartitions++;
        let numberAvailableToSteal = currentPartitionOwnershipList.length - ownersExpectedPartitionCount;
        // Claim as many random partitions as possible.
        while (Math.min(numberOfPartitionsToClaim, numberAvailableToSteal)) {
            const indexToClaim = Math.floor(Math.random() * currentPartitionOwnershipList.length);
            partitionsToSteal.push(currentPartitionOwnershipList.splice(indexToClaim, 1)[0].partitionId);
            numberOfPartitionsToClaim--;
            numberAvailableToSteal--;
        }
        // Move on to the next list of PartitionOwnership.
        currentPartitionOwnershipList = listOfPartitionOwnerships.shift();
    }
    return partitionsToSteal;
}
/**
 * Identifies all of the partitions that can be claimed by the specified owner for
 * that owner to reach a balanced state.
 * @param OwnerId - The id we should assume is _our_ id when checking for ownership.
 * @param claimedPartitionOwnershipMap - The current claimed ownerships for partitions.
 * @param partitionIds - Partitions to assign owners to.
 * @param expirationIntervalInMs - The length of time a partition claim is valid.
 * @returns Partition ids that may be claimed.
 * @internal
 */
function listAvailablePartitions(ownerId, claimedPartitionOwnershipMap, partitionIds, expirationIntervalInMs) {
    if (!partitionIds.length) {
        return [];
    }
    // Collect only the PartitionOwnership that have been updated within the expiration interval.
    // Any PartitionOwnership that has been updated outside the expiration interval can be claimed.
    const activePartitionOwnershipMap = getActivePartitionOwnerships(claimedPartitionOwnershipMap, expirationIntervalInMs);
    logger_js_1.logger.verbose(`[${ownerId}] Number of active ownership records: ${activePartitionOwnershipMap.size}.`);
    if (activePartitionOwnershipMap.size === 0) {
        // All partitions in this Event Hub are available to claim.
        return partitionIds;
    }
    // Map ownerIds to the partitions they own so that we can determine how many each owner has.
    const ownerToOwnershipMap = new Map();
    for (const activeOwnership of activePartitionOwnershipMap.values()) {
        const partitionOwnershipList = ownerToOwnershipMap.get(activeOwnership.ownerId) || [];
        partitionOwnershipList.push(activeOwnership);
        ownerToOwnershipMap.set(activeOwnership.ownerId, partitionOwnershipList);
    }
    // Add the current EventProcessor to the map of owners to ownerships if it doesn't exist.
    if (!ownerToOwnershipMap.has(ownerId)) {
        ownerToOwnershipMap.set(ownerId, []);
    }
    logger_js_1.logger.info(`[${ownerId}] Number of active event processors: ${ownerToOwnershipMap.size}.`);
    const { minPartitionsPerOwner, requiredNumberOfOwnersWithExtraPartition } = calculateBalancedLoadCounts(ownerToOwnershipMap, partitionIds);
    logger_js_1.logger.verbose(`[${ownerId}] Expected minimum number of partitions per event processor: ${minPartitionsPerOwner},` +
        `expected number of event processors with additional partition: ${requiredNumberOfOwnersWithExtraPartition}.`);
    // Get some stats representing the current state the world with regards to how balanced the
    // partitions are across EventProcessors.
    const eventProcessorCounts = getEventProcessorCounts(minPartitionsPerOwner, ownerToOwnershipMap);
    if (isLoadBalanced(requiredNumberOfOwnersWithExtraPartition, ownerToOwnershipMap.size, eventProcessorCounts)) {
        // When the partitions are evenly distributed, no change required.
        return [];
    }
    let numberOfPartitionsToClaim = getNumberOfPartitionsToClaim(minPartitionsPerOwner, requiredNumberOfOwnersWithExtraPartition, ownerToOwnershipMap.get(ownerId).length, eventProcessorCounts);
    if (numberOfPartitionsToClaim <= 0) {
        return [];
    }
    const partitionsToClaim = [];
    const unclaimedPartitionIds = partitionIds.filter((id) => !activePartitionOwnershipMap.has(id));
    // Prioritize getting unclaimed partitions first.
    while (Math.min(numberOfPartitionsToClaim, unclaimedPartitionIds.length)) {
        const indexToClaim = Math.floor(Math.random() * unclaimedPartitionIds.length);
        partitionsToClaim.push(unclaimedPartitionIds.splice(indexToClaim, 1)[0]);
        numberOfPartitionsToClaim--;
    }
    if (numberOfPartitionsToClaim === 0) {
        return partitionsToClaim;
    }
    // Find partitions that can be stolen from other EventProcessors.
    const partitionsToSteal = findPartitionsToSteal(numberOfPartitionsToClaim, minPartitionsPerOwner, requiredNumberOfOwnersWithExtraPartition, ownerId, ownerToOwnershipMap);
    return partitionsToClaim.concat(partitionsToSteal);
}
//# sourceMappingURL=loadBalancingStrategy.js.map