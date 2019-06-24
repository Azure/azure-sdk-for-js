// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ConnectionConfig } from "./connectionConfig";
import { EventHubConnectionConfig } from "./eventhubConnectionConfig";
import {
  parseConnectionString,
  IotHubConnectionStringModel
} from "../util/utils";

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
  entityPath: string;
  /**
   * @property {string} sharedAccessKeyName - The name of the access key.
   */
  sharedAccessKeyName: string;
  /**
   * @property {string} sharedAccessKey - The secret value of the access key.
   */
  sharedAccessKey: string;
  /**
   * @property {string} [deviceId] - The unique device identifier.
   */
  deviceId?: string;
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
  export function create(
    connectionString: string,
    path?: string
  ): IotHubConnectionConfig {
    connectionString = String(connectionString);

    const parsedCS = parseConnectionString<IotHubConnectionStringModel>(
      connectionString
    );
    if (!path) {
      path = "messages/events";
    }
    const result: IotHubConnectionConfig = {
      connectionString: connectionString,
      hostName: parsedCS.HostName,
      host:
        parsedCS && parsedCS.HostName ? parsedCS.HostName.split(".")[0] : "",
      entityPath: path,
      sharedAccessKeyName: parsedCS.SharedAccessKeyName,
      sharedAccessKey: parsedCS.SharedAccessKey,
      deviceId: parsedCS.DeviceId
    };
    return result;
  }

  /**
   * Validates the properties of connection config.
   * @ignore
   * @param {ConnectionConfig} config The connection config to be validated.
   */
  export function validate(config: IotHubConnectionConfig): void {
    if (!config) {
      throw new TypeError("Missing configuration");
    }

    if (!config.hostName) {
      throw new TypeError("Missing 'hostName' in configuration");
    }
    config.hostName = String(config.hostName);

    if (!config.entityPath) {
      throw new TypeError("Missing 'entityPath' in configuration");
    }
    config.entityPath = String(config.entityPath);

    if (!config.sharedAccessKeyName) {
      throw new TypeError("Missing 'sharedAccessKeyName' in configuration");
    }
    config.sharedAccessKeyName = String(config.sharedAccessKeyName);

    if (!config.sharedAccessKey) {
      throw new TypeError("Missing 'sharedAccessKey' in configuration");
    }
    config.sharedAccessKey = String(config.sharedAccessKey);

    if (config.deviceId) {
      config.deviceId = String(config.deviceId);
    }
  }
  /**
   * Convert iothub connection config to eventhub connection config.
   * @ignore
   * @param {IotHubConnectionConfig} iotHubConfig
   */
  export function convertToEventHubConnectionConfig(
    iotHubConfig: IotHubConnectionConfig
  ): EventHubConnectionConfig {
    validate(iotHubConfig);
    const config: ConnectionConfig = {
      sharedAccessKey: iotHubConfig.sharedAccessKey,
      sharedAccessKeyName: iotHubConfig.sharedAccessKeyName,
      entityPath: iotHubConfig.entityPath,
      host: iotHubConfig.hostName,
      endpoint: `sb://${iotHubConfig.hostName}/`,
      connectionString: iotHubConfig.connectionString
    };
    return EventHubConnectionConfig.createFromConnectionConfig(config);
  }
}
