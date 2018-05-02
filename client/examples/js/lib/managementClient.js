"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const rheaPromise = require("./rhea-promise");
const Constants = require("./util/constants");
const debugModule = require("debug");
const rpc_1 = require("./rpc");
const utils_1 = require("./util/utils");
const Buffer = require("buffer/").Buffer;
const debug = debugModule("azure:event-hubs:management");
/**
 * @class ManagementClient
 * Descibes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
class ManagementClient {
    /**
     * @constructor
     * Instantiates the management client.
     * @param entityPath - The name/path of the entity (hub name) for which the management request needs to be made.
     */
    constructor(entityPath) {
        this.entityPath = entityPath;
        this.managementLock = `${Constants.managementRequestKey}-${uuid()}`;
        this.entityPath = entityPath;
    }
    /**
     * Provides the eventhub runtime information.
     * @method getHubRuntimeInformation
     * @param {Connection} connection - The established amqp connection
     * @returns {Promise<EventHubRuntimeInformation>}
     */
    getHubRuntimeInformation(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this._makeManagementRequest(connection, Constants.eventHub);
            const runtimeInfo = {
                path: info.name,
                createdAt: new Date(info.created_at),
                partitionCount: info.partition_count,
                partitionIds: info.partition_ids,
                type: info.type
            };
            debug("[%s] The hub runtime info is: %O", connection.options.id, runtimeInfo);
            return runtimeInfo;
        });
    }
    /**
     * Provides an array of partitionIds.
     * @method getPartitionIds
     * @param {Connection} connection - The established amqp connection
     * @returns {Promise<Array<string>>}
     */
    getPartitionIds(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const runtimeInfo = yield this.getHubRuntimeInformation(connection);
            return runtimeInfo.partitionIds;
        });
    }
    /**
     * Provides information about the specified partition.
     * @method getPartitionInformation
     * @param {Connection} connection - The established amqp connection
     * @param {(string|number)} partitionId Partition ID for which partition information is required.
     */
    getPartitionInformation(connection, partitionId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
                throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
            }
            const info = yield this._makeManagementRequest(connection, Constants.partition, partitionId);
            const partitionInfo = {
                beginningSequenceNumber: info.begin_sequence_number,
                hubPath: info.name,
                lastEnqueuedOffset: info.last_enqueued_offset,
                lastEnqueuedTimeUtc: new Date(info.last_enqueued_time_utc),
                lastSequenceNumber: info.last_enqueued_sequence_number,
                partitionId: info.partition,
                type: info.type
            };
            debug("[%s] The partition info is: %O.", connection.options.id, partitionInfo);
            return partitionInfo;
        });
    }
    /**
     * Closes the AMQP management session to the Event Hub for this client,
     * returning a promise that will be resolved when disconnection is completed.
     * @return {Promise<void>}
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._mgmtReqResLink) {
                    yield rheaPromise.closeSession(this._mgmtReqResLink.session);
                    debug("Successfully closed the management session.");
                    this._mgmtReqResLink = undefined;
                }
            }
            catch (err) {
                const msg = `An error occurred while closing the management session: ${err}`;
                debug(msg);
                throw new Error(msg);
            }
        });
    }
    _init(connection, endpoint, replyTo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._mgmtReqResLink) {
                const rxopt = { source: { address: endpoint }, name: replyTo, target: { address: replyTo } };
                debug("Creating a session for $management endpoint");
                this._mgmtReqResLink = yield rpc_1.createRequestResponseLink(connection, { target: { address: endpoint } }, rxopt);
                debug("[%s] Created sender '%s' and receiver '%s' links for $management endpoint.", connection.options.id, this._mgmtReqResLink.sender.name, this._mgmtReqResLink.receiver.name);
            }
        });
    }
    /**
     * @private
     * Helper method to make the management request
     * @param {Connection} connection - The established amqp connection
     * @param {string} type - The type of entity requested for. Valid values are "eventhub", "partition"
     * @param {string | number} [partitionId] - The partitionId. Required only when type is "partition".
     */
    _makeManagementRequest(connection, type, partitionId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number") {
                throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
            }
            try {
                const endpoint = Constants.management;
                const replyTo = uuid();
                const request = {
                    body: Buffer.from(JSON.stringify([])),
                    message_id: uuid(),
                    reply_to: replyTo,
                    application_properties: {
                        operation: Constants.readOperation,
                        name: this.entityPath,
                        type: `${Constants.vendorString}:${type}`
                    }
                };
                if (partitionId && type === Constants.partition) {
                    request.application_properties.partition = partitionId;
                }
                yield utils_1.defaultLock.acquire(this.managementLock, () => { return this._init(connection, endpoint, replyTo); });
                return rpc_1.sendRequest(connection, this._mgmtReqResLink, request);
            }
            catch (err) {
                debug("An error occurred while making the request to $management endpoint: %O", err);
                throw err;
            }
        });
    }
}
exports.ManagementClient = ManagementClient;
