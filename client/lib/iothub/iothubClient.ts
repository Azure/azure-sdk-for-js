// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { IotHubConnectionConfig } from "./iotHubConnectionConfig";
import { ConnectionContext, ConnectionContextOptions } from "../connectionContext";
import { IotSasTokenProvider } from "./iotSas";
import * as debugModule from "debug";
import { translate, EventHubsError } from "../errors";
import { closeConnection } from "../rhea-promise";
const debug = debugModule("azure:event-hubs:iothubClient");

export interface ParsedRedirectError {
  endpoint: string;
  entityPath: string;
}

export interface EHConfig extends ParsedRedirectError {
  sharedAccessKey: string;
  sharedAccessKeyName: string;
}

export class IotHubClient {
  /**
   * @property {string} connectionString the IotHub connection string.
   */
  connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }
  /**
   * Constructs the EventHub connection string by catching the redirect error and parsing the error
   * information.
   * @param {ConnectionContextOptions} [options] optional parameters to be provided while creating
   * the connection context.
   * @return {Promise<string>} Promise<string>
   */
  async getEventHubConnectionString(options?: ConnectionContextOptions): Promise<string> {
    const iothubconfig = IotHubConnectionConfig.create(this.connectionString);
    const config = IotHubConnectionConfig.convertToEventHubConnectionConfig(iothubconfig);
    let result: string = "";
    if (!options) options = {};
    options.tokenProvider = new IotSasTokenProvider(config.endpoint, config.sharedAccessKeyName, config.sharedAccessKey);
    options.managementSessionAddress = `/messages/events/$management`;
    const context = ConnectionContext.create(config, options);
    try {
      debug("Getting the hub runtime info from the iothub connection string to get the redirect error.");
      await context.managementSession!.getHubRuntimeInformation();
    } catch (err) {
      const error = translate(err);
      debug("IotHubClient received the error: %O", error);
      const parsedInfo: ParsedRedirectError = this._parseRedirectError(err);
      debug("Parsed info from redirect error is: %O", parsedInfo);
      result = this._buildConnectionString({
        sharedAccessKey: config.sharedAccessKey,
        sharedAccessKeyName: config.sharedAccessKeyName,
        endpoint: parsedInfo.endpoint,
        entityPath: parsedInfo.entityPath
      });
    }
    debug("The EventHub ConnectionString is: '%s'.", result);
    await this.close(context);
    return result;
  }

  /**
   * Closes the AMQP connection to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns {Promise<any>}
   */
  async close(context: ConnectionContext): Promise<any> {
    try {
      if (context.connection) {
        debug("Closing the IotHubClient connection...");
        // Close the cbs session;
        await context.cbsSession!.close();
        debug("IotHub cbs session closed.");
        // Close the management session
        await context.managementSession!.close();
        debug("IotHub management client closed.");
        await closeConnection(context.connection);
        debug("Closed the amqp connection '%s' on the iothub client.", context.connectionId);
        context.connection = undefined;
      }
    } catch (err) {
      const msg = `An error occurred while closing the connection "${context.connectionId}": ${err.stack}`;
      debug(msg);
    }
  }

  private _parseRedirectError(error: EventHubsError): ParsedRedirectError {
    if (!error) {
      throw new Error("'error' is a required parameter and must be of type 'object'.");
    }
    if (error.name !== "LinkRedirectError" || !error.info) {
      throw error;
    }
    if (!error.info.hostname || !error.info.address) {
      const msg = `The received redirect error from IotHub is malformed. ${error.stack}\n${error.info}`;
      throw new Error(msg);
    }

    const address: string = error.info.address;
    const parsedResult = address.match(/5671\/(.*)\/\$management/i);
    if (parsedResult == undefined || parsedResult && parsedResult[1] == undefined) {
      const msg = `Cannot parse the EventHub name from the given address: ${address} in the error: ` +
        `${error.stack}\n${JSON.stringify(error.info)}.\nThe parsed result is: ${JSON.stringify(parsedResult)}.`;
      throw new Error(msg);
    }

    return {
      endpoint: error.info.hostname,
      entityPath: parsedResult[1]
    };
  }

  private _buildConnectionString(config: EHConfig): string {
    const parts = new Map();
    parts.set("Endpoint", `sb://${config.endpoint}/`);
    parts.set("SharedAccessKeyName", config.sharedAccessKeyName);
    parts.set("SharedAccessKey", config.sharedAccessKey);
    parts.set("EntityPath", config.entityPath);
    return Array.from(parts).map((part) => `${part[0]}=${part[1]}`).join(";");
  }
}
