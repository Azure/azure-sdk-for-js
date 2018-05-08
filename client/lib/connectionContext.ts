// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import * as Constants from "./util/constants";
import { ConnectionConfig } from ".";
import { EventHubReceiver } from "./eventHubReceiver";
import { EventHubSender } from "./eventHubSender";
import { TokenProvider } from "./auth/token";
import { ManagementClient } from "./managementClient";
import { CbsClient } from "./cbs";
import { SasTokenProvider } from "./auth/sas";
import { ClientOptions } from "./eventHubClient";
import { DataTransformer, DefaultDataTransformer } from "./dataTransformer";

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
   * @property {DataTransformer} dataTransformer A DataTransformer object that has methods named
   * - encode Responsible for encoding the AMQP message before sending it on the wire.
   * - decode Responsible for decoding the received AMQP message before passing it to the customer.
   */
  dataTransformer: DataTransformer;
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
  managementSession?: ManagementClient;
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
      senders: {},
      receivers: {},
      dataTransformer: options.dataTransformer || new DefaultDataTransformer()
    };
    context.managementSession = new ManagementClient(context);
    debug("Created connection context: %O", context);
    return context;
  }
}
