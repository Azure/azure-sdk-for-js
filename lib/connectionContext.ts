// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import {
  DataTransformer, DefaultDataTransformer, SasTokenProvider, CbsClient, TokenProvider,
  ConnectionConfig, Constants
} from "./amqp-common";
import { MessageReceiver } from "./messageReceiver";
import { MessageSender } from "./messageSender";
import { ManagementClient, ManagementClientOptions } from "./managementClient";
import { ClientOptions } from "./queueClient";
import { Connection } from "./rhea-promise";

const debug = debugModule("azure:service-bus:connectionContext");

/**
 * @interface ConnectionContext
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the ServiceBus client.
 */
export interface ConnectionContext {
  /**
   * @property {ConnectionConfig} config The ServiceBus connection config that is created after parsing the connection string.
   */
  readonly config: ConnectionConfig;
  /**
   * @property {Connection} [connection] The underlying AMQP connection.
   */
  connection?: Connection;
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
   * @property {TokenProvider} tokenProvider The TokenProvider to be used for getting tokens for authentication for the ServiceBus client.
   */
  readonly tokenProvider: TokenProvider;
  /**
   * @property {Dictionary<MessageReceiver>} receivers A dictionary of the ServiceBus Receivers associated with this client.
   */
  receivers: { [x: string]: MessageReceiver };
  /**
   * @property {Dictionary<MessageSender>} senders A dictionary of the ServiceBus Senders associated with this client.
   */
  senders: { [x: string]: MessageSender };
  /**
   * @property {ManagementClient} managementSession A reference to the management session ($management endpoint) on
   * the underlying amqp connection for the ServiceBus Client.
   */
  managementSession?: ManagementClient;
  /**
   * @property {CbsClient} cbsSession A reference to the cbs session ($cbs endpoint) on the underlying
   * the amqp connection for the ServiceBus Client.
   */
  cbsSession?: CbsClient;
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

export interface ConnectionContextOptions extends ClientOptions {
  managementSessionAddress?: string;
  managementSessionAudience?: string;
}


export namespace ConnectionContext {
  /**
   * @property {string} userAgent The user agent string for the event hub client. Constant value: "/js-service-bus".
   */
  export const userAgent: string = "/js-service-bus";

  export function create(config: ConnectionConfig, options?: ConnectionContextOptions): ConnectionContext {
    ConnectionConfig.validate(config);
    if (!options) options = {};
    const context: ConnectionContext = {
      connectionLock: `${Constants.establishConnection}-${uuid()}`,
      negotiateClaimLock: `${Constants.negotiateClaim}-${uuid()}`,
      config: config,
      tokenProvider: options.tokenProvider ||
        new SasTokenProvider(config.endpoint, config.sharedAccessKeyName, config.sharedAccessKey),
      senders: {},
      receivers: {},
      dataTransformer: options.dataTransformer || new DefaultDataTransformer()
    };
    context.cbsSession = new CbsClient(config, userAgent);
    const mOptions: ManagementClientOptions = {
      address: options.managementSessionAddress,
      audience: options.managementSessionAudience
    };
    context.managementSession = new ManagementClient(context, mOptions);
    debug("Created connection context: %O", context);
    return context;
  }
}
