// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { parseConnectionString, IotHubConnectionStringModel, ConnectionConfig } from "../amqp-common";

/**
 * @interface IotHubConnectionConfig
 * @ignore
 */
export interface IotHubConnectionConfig {
  /**
   * @property {string} endpoint - The iothub endpoint `"<iothub-namespace>.azure-devices.net"`.
   */
  hostName: string;
  /**
   * @property {string} host - The host `"<yournamespace>"`.
   */
  host: string;
  /**
   * @property {string} connectionString - The IotHub connection string.
   */
  connectionString: string;
  /**
   * @property {string} entityPath - The name/path of the entity to which the connection needs to happen.
   */
  entityPath?: string;
  /**
   * @property {string} sharedAccessKeyName - The name of the access key.
   */
  sharedAccessKeyName: string;
  /**
   * @property {string} sharedAccessKey - The secret value of the access key.
   */
  sharedAccessKey: string;
}

/**
 * @module IotHubConnectionConfig
 * @ignore
 */
export namespace IotHubConnectionConfig {
  /**
   * Creates the connection config.
   * @ignore
   * @param {string} connectionString - The event hub connection string
   * @param {string} [path]           - The name/path of the entity (hub name) to which the connection needs to happen
   */
  export function create(connectionString: string, path?: string): IotHubConnectionConfig {
    if (!connectionString || (connectionString && typeof connectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const parsedCS = parseConnectionString<IotHubConnectionStringModel>(connectionString);
    if (!path) {
      path = "messages/events";
    }
    const result: IotHubConnectionConfig = {
      connectionString: connectionString,
      hostName: parsedCS.HostName,
      host: (parsedCS && parsedCS.HostName) ? parsedCS.HostName.split(".")[0] : "",
      entityPath: path,
      sharedAccessKeyName: parsedCS.SharedAccessKeyName,
      sharedAccessKey: parsedCS.SharedAccessKey
    };
    return result;
  }

  /**
   * Validates the properties of connection config.
   * @ignore
   * @param {ConnectionConfig} config The connection config to be validated.
   */
  export function validate(config: IotHubConnectionConfig): void {
    if (!config || (config && typeof config !== "object")) {
      throw new Error("'config' is a required parameter and must be of type: 'object'.");
    }
    if (!config.hostName || (config.hostName && typeof config.hostName !== "string")) {
      throw new Error("'hostName' is a required property of the ConnectionConfig.");
    }
    if (!config.entityPath || (config.entityPath && typeof config.entityPath !== "string")) {
      throw new Error("'entityPath' is a required property of the ConnectionConfig.");
    }
    if (!config.sharedAccessKeyName || (config.sharedAccessKeyName && typeof config.sharedAccessKeyName !== "string")) {
      throw new Error("'sharedAccessKeyName' is a required property of the ConnectionConfig.");
    }
    if (!config.sharedAccessKey || (config.sharedAccessKey && typeof config.sharedAccessKey !== "string")) {
      throw new Error("'sharedAccessKey' is a required property of the ConnectionConfig.");
    }
  }
  /**
   * Convert iothub connection config to eventhub connection config.
   * @ignore
   * @param {IotHubConnectionConfig} iotHubConfig
   */
  export function convertToEventHubConnectionConfig(iotHubConfig: IotHubConnectionConfig): ConnectionConfig {
    if (!iotHubConfig || (iotHubConfig && typeof iotHubConfig !== "object")) {
      throw new Error("'iotHubConfig' is a required parameter and must be of type: 'object'.");
    }
    validate(iotHubConfig);
    const config: ConnectionConfig = {
      sharedAccessKey: iotHubConfig.sharedAccessKey,
      sharedAccessKeyName: iotHubConfig.sharedAccessKeyName,
      entityPath: iotHubConfig.entityPath,
      host: iotHubConfig.hostName,
      endpoint: `sb://${iotHubConfig.hostName}/`,
      connectionString: iotHubConfig.connectionString
    };
    return config;
  }
}
