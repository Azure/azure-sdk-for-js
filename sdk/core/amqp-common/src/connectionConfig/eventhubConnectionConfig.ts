// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ConnectionConfig } from "./connectionConfig";

/**
 * Describes the connection config object that is created after parsing an EventHub connection
 * string. It also provides some convenience methods for getting the address and audience for
 * different entities.
 * @interface EventHubConnectionConfig
 */
export interface EventHubConnectionConfig extends ConnectionConfig {
  /**
   * @property {string} entityPath - The name/path of the entity (event hub name) to which the
   * connection needs to happen.
   */
  entityPath: string;
  /**
   * Provides the EventHub Sender address in one of the following forms based on the input:
   * - `"<hubName>"`
   * - `"<hubName>/Partitions/<partitionId>"`
   *
   * @param partitionId The partitionId in the EventHub to which messages will be sent.
   */
  getSenderAddress(partitionId?: string | number): string;
  /**
   * Provides the EventHub Sender audience in one of the following forms based on the input:
   * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
   * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`
   *
   * @param partitionId The partitionId in the EventHub to which messages will be sent.
   */
  getSenderAudience(partitionId?: string | number): string;
  /**
   * Provides the EventHub Receiver address:
   * - `"<hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`
   *
   * @param partitionId The partitionId in the EventHub from which messages will be received.
   * @param consumergroup The consumergoup in the EventHub from which the messages will
   * be received. Default: `$default`.
   */
  getReceiverAddress(
    partitionId: string | number,
    consumergroup?: string
  ): string;
  /**
   * Provides the EventHub Receiver audience.
   * - `"sb://<your-namespace>.servicebus.windows.net/<hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`
   *
   * @param partitionId The partitionId in the EventHub from which messages will be received.
   * @param consumergroup The consumergoup in the EventHub from which the messages will
   * be received. Default: `$default`.
   */
  getReceiverAudience(
    partitionId: string | number,
    consumergroup?: string
  ): string;
  /**
   * Provides the EventHub Management address.
   * - `"<hub-name>/$management"`
   */
  getManagementAddress(): string;
  /**
   * Provides the EventHub Management audience.
   * - `"sb://<your-namespace>.servicebus.windows.net/<hub-name>/$management"`
   */
  getManagementAudience(): string;
}

/**
 * Describes the connection config object that is created after parsing an EventHub connection
 * string. It also provides some convenience methods for getting the address and audience for
 * different entities.
 * @module EventHubConnectionConfig
 */
export module EventHubConnectionConfig {
  /**
   * Creates the connection config.
   * @param {string} connectionString - The connection string for a given service like
   * EventHub/ServiceBus.
   * @param {string} [path]           - The name/path of the entity (hub name) to which the
   * connection needs to happen. This will override the EntityPath in the connectionString
   * if present.
   * @returns {EventHubConnectionConfig} EventHubConnectionConfig
   */
  export function create(
    connectionString: string,
    path?: string
  ): EventHubConnectionConfig {
    const config = ConnectionConfig.create(connectionString, path);
    if (!config.entityPath) {
      throw new TypeError(
        `Either provide "path" or the "connectionString": "${connectionString}", ` +
          `must contain EntityPath="<path-to-the-entity>".`
      );
    }
    return createFromConnectionConfig(config);
  }

  /**
   * Creates an EventHubConnectionConfig from the provided base ConnectionConfig.
   * @param config The base connection config from which the EventHubConnectionConfig needs to be
   * created.
   * @returns EventHubConnectionConfig
   */
  export function createFromConnectionConfig(
    config: ConnectionConfig
  ): EventHubConnectionConfig {
    ConnectionConfig.validate(config, { isEntityPathRequired: true });

    (config as EventHubConnectionConfig).getManagementAudience = () => {
      return `${config.endpoint}${config.entityPath}/$management`;
    };
    (config as EventHubConnectionConfig).getManagementAddress = () => {
      return `${config.entityPath}/$management`;
    };

    (config as EventHubConnectionConfig).getSenderAudience = (
      partitionId?: string | number
    ) => {
      if (partitionId != undefined) {
        return `${config.endpoint}${
          config.entityPath
        }/Partitions/${partitionId}`;
      } else {
        return `${config.endpoint}${config.entityPath}`;
      }
    };

    (config as EventHubConnectionConfig).getSenderAddress = (
      partitionId?: string | number
    ) => {
      if (partitionId != undefined) {
        return `${config.entityPath}/Partitions/${partitionId}`;
      } else {
        return `${config.entityPath}`;
      }
    };

    (config as EventHubConnectionConfig).getReceiverAudience = (
      partitionId: string | number,
      consumergroup?: string
    ) => {
      if (!consumergroup) consumergroup = "$default";
      return (
        `${config.endpoint}${
          config.entityPath
        }/ConsumerGroups/${consumergroup}/` + `Partitions/${partitionId}`
      );
    };

    (config as EventHubConnectionConfig).getReceiverAddress = (
      partitionId: string | number,
      consumergroup?: string
    ) => {
      if (!consumergroup) consumergroup = "$default";
      return `${
        config.entityPath
      }/ConsumerGroups/${consumergroup}/Partitions/${partitionId}`;
    };
    return config as EventHubConnectionConfig;
  }

  /**
   * Validates the properties of connection config.
   * @param {ConnectionConfig} config The connection config to be validated.
   * @returns {void} void
   */
  export function validate(config: EventHubConnectionConfig): void {
    return ConnectionConfig.validate(config, { isEntityPathRequired: true });
  }
}
