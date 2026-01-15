// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable eqeqeq */
import { ConnectionConfig } from "@azure/core-amqp";
import { parseEndpoint } from "./util/parseEndpoint.js";
/**
 * Describes the connection config object that is created after parsing an EventHub connection
 * string. It also provides some convenience methods for getting the address and audience for
 * different entities.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
export const EventHubConnectionConfig = {
    /**
     * Creates the connection config.
     * @param connectionString - The connection string for a given service like
     * EventHub/ServiceBus.
     * @param path - The name/path of the entity (hub name) to which the
     * connection needs to happen. This will override the EntityPath in the connectionString
     * if present.
     * @returns EventHubConnectionConfig
     */
    create(connectionString, path) {
        const config = ConnectionConfig.create(connectionString, path);
        if (!config.entityPath) {
            throw new TypeError(`Either provide "path" or the "connectionString": "${connectionString}", ` +
                `must contain EntityPath="<path-to-the-entity>".`);
        }
        return EventHubConnectionConfig.createFromConnectionConfig(config);
    },
    /**
     * Creates an EventHubConnectionConfig from the provided base ConnectionConfig.
     * @param config - The base connection config from which the EventHubConnectionConfig needs to be
     * created.
     * @returns EventHubConnectionConfig
     */
    createFromConnectionConfig(config) {
        ConnectionConfig.validate(config, { isEntityPathRequired: true });
        config.getManagementAudience = () => {
            return `${config.endpoint}${config.entityPath}/$management`;
        };
        config.getManagementAddress = () => {
            return `${config.entityPath}/$management`;
        };
        config.getSenderAudience = (partitionId) => {
            if (partitionId != undefined) {
                return `${config.endpoint}${config.entityPath}/Partitions/${partitionId}`;
            }
            else {
                return `${config.endpoint}${config.entityPath}`;
            }
        };
        config.getSenderAddress = (partitionId) => {
            if (partitionId != undefined) {
                return `${config.entityPath}/Partitions/${partitionId}`;
            }
            else {
                return `${config.entityPath}`;
            }
        };
        config.getReceiverAudience = (partitionId, consumergroup) => {
            if (!consumergroup)
                consumergroup = "$default";
            return (`${config.endpoint}${config.entityPath}/ConsumerGroups/${consumergroup}/` +
                `Partitions/${partitionId}`);
        };
        config.getReceiverAddress = (partitionId, consumergroup) => {
            if (!consumergroup)
                consumergroup = "$default";
            return `${config.entityPath}/ConsumerGroups/${consumergroup}/Partitions/${partitionId}`;
        };
        return config;
    },
    /**
     * Updates the provided EventHubConnectionConfig to use the custom endpoint address.
     * @param config - An existing connection configuration to be updated.
     * @param customEndpointAddress - The custom endpoint address to use.
     */
    setCustomEndpointAddress(config, customEndpointAddress) {
        // The amqpHostname should match the host prior to using the custom endpoint.
        config.amqpHostname = config.host;
        const { hostname, port } = parseEndpoint(customEndpointAddress);
        // Since we specify the port separately, set host to the customEndpointAddress hostname.
        config.host = hostname;
        if (port) {
            config.port = parseInt(port, 10);
        }
    },
    /**
     * Validates the properties of connection config.
     * @param config - The connection config to be validated.
     * @returns void
     */
    validate(config) {
        return ConnectionConfig.validate(config, { isEntityPathRequired: true });
    },
};
//# sourceMappingURL=eventhubConnectionConfig.js.map