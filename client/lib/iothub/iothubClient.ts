import { IotHubConnectionConfig } from "./iotHubConnectionConfig";
import { ConnectionContext, ConnectionContextOptions } from "../connectionContext";
import { IotSasTokenProvider } from "./iotSas";
import * as debugModule from "debug";
import { translate } from "../errors";
import { closeConnection } from "../rhea-promise";
const debug = debugModule("azure:event-hubs:iothubClient");
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

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
    const config = IotHubConnectionConfig.convertToConnectionConfig(iothubconfig);
    let result = `SharedAccessKeyName=${config.sharedAccessKeyName};SharedAccessKey=${config.sharedAccessKey}`;
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
      if (error.name !== "LinkRedirectError" || !error.info) {
        throw error;
      }
      if (!error.info.hostname || !error.info.address) {
        const msg = `The received redirect error from IotHub is malformed. ${error.stack}\n${error.info}`;
        throw new Error(msg);
      }
      result = `Endpoint=sb://${error.info.hostname}/;` + result;
      const address: string = error.info.address;
      const parsedResult = address.match(/.*5671\/(.*)\/\$management/i);
      if (parsedResult == undefined || parsedResult && parsedResult[1] == undefined) {
        const msg = `Cannot parse the EventHub name from the given address: ${address} in the error: ` +
          `${error.stack}\n${JSON.stringify(error.info)}.\nThe parsed result is: ${JSON.stringify(parsedResult)}.`;
        throw new Error(msg);
      }
      result += `;EntityPath=${parsedResult[1]}`;
    }
    debug("The EventHub ConnectionString is: '%s'.", result);
    await this.close(context);
    return result;
  }

  /**
   * Closes the AMQP connection to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @method close
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
}
