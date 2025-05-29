"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStore = void 0;
const tslib_1 = require("tslib");
const queue_js_1 = require("./queue.js");
/**
 * The `MessageStore` stores events sent to the service.
 * It provides a method of pulling events from a partition via `getMessageIterator`,
 * and setting a `startPosition` that indicates which event in a partition to start reading from.
 */
class MessageStore {
    constructor() {
        /**
         * All messages are stored in a list specific to a partition.
         *
         * Key: partitionId
         * Value: List of `MessageRecord`.
         */
        this._partitionRecordMap = new Map();
        /**
         * Each partition has any number of 'QueueViews' associated with it.
         *
         * QueueViews provide a way to have multiple senders stream events using the same
         * backing `MessageStore`, even supporting different starting positions.
         *
         * Key: partitionId
         * Value: A Set containing all the `QueueViews` for a partition.
         */
        this._partitionQueueViews = new Map();
    }
    /**
     * Gets the list of `MessageRecord` associated with the specified partition id.
     * @param partitionId - The partition id to find message records for.
     */
    _getPartitionStore(partitionId) {
        var _a;
        const partitionStore = (_a = this._partitionRecordMap.get(partitionId)) !== null && _a !== void 0 ? _a : [];
        this._partitionRecordMap.set(partitionId, partitionStore);
        return partitionStore;
    }
    /**
     * Gets the full Set of 'QueueViews' associated with the specified partition id.
     * @param partitionId -
     */
    _getPartitionViews(partitionId) {
        var _a;
        const queueViews = (_a = this._partitionQueueViews.get(partitionId)) !== null && _a !== void 0 ? _a : new Set();
        this._partitionQueueViews.set(partitionId, queueViews);
        return queueViews;
    }
    /**
     * Returns the list of `MessageRecord` that appears on or after the specified `startPosition`.
     * @param fullList - List of `MessageRecord`.
     * @param startPosition - The `EventPosition` used to find which `MessageRecord` to start reading from.
     */
    _getSubList(fullList, startPosition) {
        if (startPosition.type === "offset" && startPosition.value === "@latest") {
            return [];
        }
        const index = fullList.findIndex((record) => {
            return this._isValidPositionedRecord(record, startPosition);
        });
        if (index === -1) {
            return [];
        }
        return fullList.slice(index);
    }
    _isValidPositionedRecord(record, startPosition) {
        if (startPosition.type === "offset" && startPosition.value === "@latest") {
            return true;
        }
        const type = startPosition.type;
        if (startPosition.operator === ">") {
            return record[type] > startPosition.value;
        }
        else {
            return record[type] >= startPosition.value;
        }
    }
    /**
     * Provides information about the state of the specified partition.
     * @param partitionId - The partition ID to find information about.
     */
    getPartitionInfo(partitionId) {
        const partitionStore = this._getPartitionStore(partitionId);
        const isEmpty = !partitionStore.length;
        if (isEmpty) {
            return {
                beginningSequenceNumber: -1,
                lastEnqueuedOffset: "-1",
                lastEnqueuedTimeUtc: new Date(0),
                lastEnqueuedSequenceNumber: -1,
                partitionId,
                isPartitionEmpty: isEmpty,
            };
        }
        const firstMessage = partitionStore[0];
        const lastMessage = partitionStore[partitionStore.length - 1];
        return {
            beginningSequenceNumber: firstMessage.sequenceNumber,
            lastEnqueuedOffset: `${lastMessage.offset}`,
            lastEnqueuedTimeUtc: lastMessage.enqueuedTime,
            lastEnqueuedSequenceNumber: lastMessage.sequenceNumber,
            partitionId,
            isPartitionEmpty: isEmpty,
        };
    }
    /**
     * Associates the provided `Message` with a `partitionId` and stores it.
     *
     * This will also update any `MessageIterator`s that are waiting on this partitionId.
     * @param partitionId - The partition id to associate the message with.
     * @param message - The message to store.
     * @param partitionKey - Optional partition key.
     */
    storeMessage(partitionId, message, partitionKey) {
        const partitionStore = this._getPartitionStore(partitionId);
        const record = {
            enqueuedTime: new Date(),
            sequenceNumber: partitionStore.length + 1,
            offset: partitionStore.length,
            message,
        };
        if (partitionKey) {
            record.partitionKey = partitionKey;
        }
        partitionStore.push(record);
        const partitionViews = this._getPartitionViews(partitionId);
        partitionViews.forEach((queue) => queue.push(record));
    }
    /**
     * Returns an AsyncIterableIterator that yields `MessageRecord`.
     *
     * @param partitionId - The partition ID
     * @param startPosition - Specifies which `MessageRecord` to start iterating from.
     */
    getMessageIterator(partitionId, startPosition) {
        return tslib_1.__asyncGenerator(this, arguments, function* getMessageIterator_1() {
            const partitionStore = this._getPartitionStore(partitionId);
            const partitionViews = this._getPartitionViews(partitionId);
            const partitionStoreSubset = this._getSubList(partitionStore, startPosition);
            const queueView = new queue_js_1.Queue(partitionStoreSubset);
            partitionViews.add(queueView);
            let shouldStop = false;
            do {
                const nextItem = yield tslib_1.__await(queueView.shift());
                if (this._isValidPositionedRecord(nextItem, startPosition)) {
                    shouldStop = Boolean(yield yield tslib_1.__await(nextItem));
                }
            } while (!shouldStop);
            partitionViews.delete(queueView);
        });
    }
}
exports.MessageStore = MessageStore;
//# sourceMappingURL=messageStore.js.map