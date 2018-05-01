// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.


import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import * as rhea from "rhea";
import * as Constants from "./util/constants";
import { ConnectionConfig } from ".";
import { EventHubReceiver } from "./eventHubReceiver";
import { EventHubSender } from "./eventHubSender";
import { TokenProvider } from "./auth/token";
import { ManagementClient } from "./managementClient";
import { CbsClient } from "./cbs";
import { SasTokenProvider } from "./auth/sas";
import { ClientOptions } from "./eventHubClient";

const isBuffer = require("is-buffer");
const debug = debugModule("azure:event-hubs:connectionContext");

/**
 * @interface ConnectionContext
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the EventHub client.
 */
export interface ConnectionContext {
  /**
   * @property {ConnectionConfig} config The EventHub connection config that is created after parsing the connection string.
   */
  readonly config: ConnectionConfig;
  /**
   * @property {any} [connection] The underlying AMQP connection.
   */
  connection?: any;
  /**
   * @property {string} [connectionId] The amqp connection id that uniquely identifies the connection within a process.
   */
  connectionId?: string;
  /**
   * @property {Function} encoder A function that takes the body from EventData object and returns the encoded body.
   */
  encoder: (body: any) => any;
  /**
   * @property {Function} decoder A function that takes the AMQP message body and returns the decoded body.
   */
  decoder: (body: any) => any;
  /**
   * @property {TokenProvider} tokenProvider The TokenProvider to be used for getting tokens for authentication for the EventHub client.
   */
  readonly tokenProvider: TokenProvider;
  /**
   * @property {Dictionary<EventHubReceiver<} receivers A dictionary of the EventHub Receivers associated with this client.
   */
  receivers: { [x: string]: EventHubReceiver };
  /**
   * @property {Dictionary<EventHubSender>} senders A dictionary of the EventHub Senders associated with this client.
   */
  senders: { [x: string]: EventHubSender };
  /**
   * @property {ManagementClient} managementSession A reference to the management session ($management endpoint) on
   * the underlying amqp connection for the EventHub Client.
   */
  readonly managementSession: ManagementClient;
  /**
   * @property {CbsClient} cbsSession A reference to the cbs session ($cbs endpoint) on the underlying
   * the amqp connection for the EventHub Client.
   */
  readonly cbsSession: CbsClient;
  /**
   * @property {string} connectionLock The unqiue lock name per connection that is used to acquire the lock
   * for establishing an aqmp connection per client if one does not exist.
   */
  readonly connectionLock: string;
  /**
   * @property {string} negotiateClaimLock The unqiue lock name per connection that is used to acquire the lock
   * for negotiating cbs claim by an entity on that connection.
   */
  readonly negotiateClaimLock: string;
}


export namespace ConnectionContext {

  /**
   * @property {string} userAgent The user agent string for the event hub client. Constant value: "/js-event-hubs".
   */
  export const userAgent: string = "/js-event-hubs";

  function encodeMessage(body: any): any {
    let result: any;
    if (body != undefined)
      if (isBuffer(body))
        result = rhea.message.data_section(body);
      else if (typeof body !== "string")
        result = rhea.message.data_section(Buffer.from(JSON.stringify(body), "utf8"));
      else
        result = rhea.message.data_section(Buffer.from(body, "utf8"));
    else
      result = rhea.message.data_section(Buffer.from("", "utf8"));

    return result;
  }

  function decodeMessage(body: any): any {
    let processedBody: any = body;
    if (isBuffer(body)) {
      processedBody = body.toString("utf8");
    } else if (typeof body === "string") {
      processedBody = body;
    } else if (body.content) {
      processedBody = body.content.toString("utf8");
    }
    try {
      processedBody = JSON.parse(processedBody);
    } catch (err) {
      // do nothing
    }

    return processedBody;
  }

  export function create(config: ConnectionConfig, options?: ClientOptions): ConnectionContext {
    ConnectionConfig.validate(config);
    if (!options) options = {};
    const context: ConnectionContext = {
      connectionLock: `${Constants.establishConnection}-${uuid()}`,
      negotiateClaimLock: `${Constants.negotiateClaim}-${uuid()}`,
      config: config,
      tokenProvider: options.tokenProvider ||
        new SasTokenProvider(config.endpoint, config.sharedAccessKeyName, config.sharedAccessKey),
      cbsSession: new CbsClient(),
      managementSession: new ManagementClient(config.entityPath!),
      senders: {},
      receivers: {},
      encoder: encodeMessage,
      decoder: decodeMessage
    };
    debug("Created connection context: %O", context);
    return context;
  }
}
