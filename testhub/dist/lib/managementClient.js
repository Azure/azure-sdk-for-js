"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const rheaPromise = require("./rhea-promise");
const Constants = require("./util/constants");
const debugModule = require("debug");
const rpc_1 = require("./rpc");
const errors_1 = require("./errors");
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
    async getHubRuntimeInformation(connection) {
        const info = await this._makeManagementRequest(connection, Constants.eventHub);
        const runtimeInfo = {
            path: info.name,
            createdAt: new Date(info.created_at),
            partitionCount: info.partition_count,
            partitionIds: info.partition_ids,
            type: info.type
        };
        debug(`[%s] The hub runtime info is.`, connection.options.id, runtimeInfo);
        return runtimeInfo;
    }
    /**
     * Provides an array of partitionIds.
     * @method getPartitionIds
     * @param {Connection} connection - The established amqp connection
     * @returns {Promise<Array<string>>}
     */
    async getPartitionIds(connection) {
        let runtimeInfo = await this.getHubRuntimeInformation(connection);
        return runtimeInfo.partitionIds;
    }
    /**
     * Provides information about the specified partition.
     * @method getPartitionInformation
     * @param {Connection} connection - The established amqp connection
     * @param {(string|number)} partitionId Partition ID for which partition information is required.
     */
    async getPartitionInformation(connection, partitionId) {
        if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
            throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
        }
        const info = await this._makeManagementRequest(connection, Constants.partition, partitionId);
        const partitionInfo = {
            beginningSequenceNumber: info.begin_sequence_number,
            hubPath: info.name,
            lastEnqueuedOffset: info.last_enqueued_offset,
            lastEnqueuedTimeUtc: new Date(info.last_enqueued_time_utc),
            lastSequenceNumber: info.last_enqueued_sequence_number,
            partitionId: info.partition,
            type: info.type
        };
        debug(`[%s] The partition info is: ${partitionInfo}.`, connection.options.id);
        return partitionInfo;
    }
    /**
     * Closes the AMQP management session to the Event Hub for this client,
     * returning a promise that will be resolved when disconnection is completed.
     * @return {Promise<void>}
     */
    async close() {
        try {
            if (this._mgmgtReqResLink) {
                await rheaPromise.closeSession(this._mgmgtReqResLink.session);
                debug("Successfully closed the management session.");
                this._mgmgtReqResLink = undefined;
            }
        }
        catch (err) {
            const msg = `An error occurred while closing the management session: ${err}`;
            debug(msg);
            return Promise.reject(msg);
        }
    }
    async _init(connection, endpoint, replyTo) {
        if (!this._mgmgtReqResLink) {
            const rxopt = { source: { address: endpoint }, name: replyTo, target: { address: replyTo } };
            debug("Creating a session for $management endpoint");
            this._mgmgtReqResLink = await rpc_1.createRequestResponseLink(connection, { target: { address: endpoint } }, rxopt);
            debug(`[${connection.options.id}] Created sender "${this._mgmgtReqResLink.sender.name}" and receiver "${this._mgmgtReqResLink.receiver.name}" links for $management endpoint.`);
        }
    }
    /**
     * @private
     * Helper method to make the management request
     * @param {Connection} connection - The established amqp connection
     * @param {string} type - The type of entity requested for. Valid values are "eventhub", "partition"
     * @param {string | number} [partitionId] - The partitionId. Required only when type is "partition".
     */
    async _makeManagementRequest(connection, type, partitionId) {
        if (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number") {
            throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
        }
        return new Promise(async (resolve, reject) => {
            try {
                const endpoint = Constants.management;
                const replyTo = uuid();
                const request = {
                    body: Buffer.from(JSON.stringify([])),
                    properties: {
                        message_id: uuid(),
                        reply_to: replyTo
                    },
                    application_properties: {
                        operation: Constants.readOperation,
                        name: this.entityPath,
                        type: `${Constants.vendorString}:${type}`
                    }
                };
                if (partitionId && type === Constants.partition) {
                    request.application_properties.partition = partitionId;
                }
                await utils_1.defaultLock.acquire(this.managementLock, () => { return this._init(connection, endpoint, replyTo); });
                // TODO: Handle timeout incase SB/EH does not send a response.
                const messageCallback = ({ message, delivery }) => {
                    // remove the event listener as this will be registered next time when someone makes a request.
                    this._mgmgtReqResLink.receiver.removeListener(Constants.message, messageCallback);
                    const code = message.application_properties[Constants.statusCode];
                    const desc = message.application_properties[Constants.statusDescription];
                    debug(`[${connection.options.id}] $management request: \n`, request);
                    debug(`[${connection.options.id}] $management response: \n`, message);
                    if (code === rheaPromise.AmqpResponseStatusCode.OK || code === rheaPromise.AmqpResponseStatusCode.Accepted) {
                        return resolve(message.body);
                    }
                    else {
                        const condition = errors_1.ConditionStatusMapper[code] || "amqp:internal-error";
                        let e = {
                            condition: condition,
                            description: desc
                        };
                        return reject(errors_1.translate(e));
                    }
                };
                this._mgmgtReqResLink.receiver.on(Constants.message, messageCallback);
                this._mgmgtReqResLink.sender.send(request);
            }
            catch (err) {
                debug(`An error occurred while making the request to $management endpoint: \n`, err);
                reject(err);
            }
        });
    }
}
exports.ManagementClient = ManagementClient;
