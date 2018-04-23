// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { parseConnectionString } from "./util/utils";

export interface ConnectionConfig {
  /**
   * @property {string} endpoint - The service bus endpoint "sb://<yournamespace>.servicebus.windows.net/".
   */
  endpoint: string;
  /**
   * @property {string} host - The host "<yournamespace>.servicebus.windows.net".
   */
  host: string;
  /**
   * @property {string} connectionString - The connection string.
   */
  connectionString: string;
  /**
   * @property {string} entityPath - The name/path of the entity (hub name) to which the connection needs to happen.
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

export namespace ConnectionConfig {
  /**
   * Creates the connection config.
   * @param {string} connectionString - The event hub connection string
   * @param {string} [path]           - The name/path of the entity (hub name) to which the connection needs to happen
   */
  export function create(connectionString: string, path?: string): ConnectionConfig {
    if (!connectionString || (connectionString && typeof connectionString !== "string")) {
      throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
    }
    const parsedCS = parseConnectionString(connectionString);
    if (!path && !parsedCS.EntityPath) {
      throw new Error(`Either provide "path" or the "connectionString": "${connectionString}", must contain EntityPath="<path-to-the-entity>".`);
    }
    const result: ConnectionConfig = {
      connectionString: connectionString,
      endpoint: parsedCS.Endpoint,
      host: (parsedCS && parsedCS.Endpoint) ? (parsedCS.Endpoint.match('sb://([^/]*)') || [])[1] : "",
      entityPath: path || parsedCS.EntityPath,
      sharedAccessKeyName: parsedCS.SharedAccessKeyName,
      sharedAccessKey: parsedCS.SharedAccessKey
    };
    return result;
  }

  /**
   * Validates the properties of connection config.
   * @param {ConnectionConfig} config The connection config to be validated.
   */
  export function validate(config: ConnectionConfig): void {
    if (!config || (config && typeof config !== "object")) {
      throw new Error("'config' is a required parameter and must be of type: 'object'.");
    }
    if (!config.endpoint || (config.endpoint && typeof config.endpoint !== "string")) {
      throw new Error("'endpoint' is a required property of the ConnectionConfig.");
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
}
