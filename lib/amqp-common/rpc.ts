// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as os from "os";
import * as process from "process";
import * as debugModule from "debug";
import { defaultLock } from "./util/utils";
import { ConnectionOptions, Connection, DeliveryAnnotations, MessageAnnotations } from "../rhea-promise";
import * as Constants from "./util/constants";
import { ConnectionConfig } from ".";
const debug = debugModule("azure:amqp-common:rpc");

/**
 * Describes the delivery annotations.
 * @interface
 */
export interface ServiceBusDeliveryAnnotations extends DeliveryAnnotations {
  /**
   * @property {string} [last_enqueued_offset] The offset of the last event.
   */
  last_enqueued_offset?: string;
  /**
   * @property {number} [last_enqueued_sequence_number] The sequence number of the last event.
   */
  last_enqueued_sequence_number?: number;
  /**
   * @property {number} [last_enqueued_time_utc] The enqueued time of the last event.
   */
  last_enqueued_time_utc?: number;
  /**
   * @property {number} [runtime_info_retrieval_time_utc] The retrieval time of the last event.
   */
  runtime_info_retrieval_time_utc?: number;
  /**
   * @property {string} Any unknown delivery annotations.
   */
  [x: string]: any;
}

/**
 * Map containing message attributes that will be held in the message header.
 */
export interface ServiceBusMessageAnnotations extends MessageAnnotations {
  /**
   * @property {string | null} [x-opt-partition-key] Annotation for the partition key set for the event.
   */
  "x-opt-partition-key"?: string | null;
  /**
   * @property {number} [x-opt-sequence-number] Annontation for the sequence number of the event.
   */
  "x-opt-sequence-number"?: number;
  /**
   * @property {number} [x-opt-enqueued-time] Annotation for the enqueued time of the event.
   */
  "x-opt-enqueued-time"?: number;
  /**
   * @property {string} [x-opt-offset] Annotation for the offset of the event.
   */
  "x-opt-offset"?: string;
  /**
   * @property {string} [x-opt-locked-until] Annotation for the message being locked until.
   */
  "x-opt-locked-until"?: Date | number;
}

export interface CreateConnectionPrameters {
  config: ConnectionConfig;
  userAgent: string;
  useSaslPlain?: boolean;
}

/**
 * Opens the AMQP connection to the EventHub/ServiceBus for this client, returning a promise
 * that will be resolved when the connection is completed.
 *
 * @param {ConnectionContext} context The connection context.
 * @param {boolean} [useSaslPlain]   True for using sasl plain mode for authentication, false otherwise.
 * @returns {Promise<Connection>} The Connection object.
 */
export async function open(params: CreateConnectionPrameters): Promise<Connection> {
  try {
    return await defaultLock.acquire("connect", () => { return _open(params); });
  } catch (err) {
    debug(err);
    throw err;
  }
}

async function _open(params: CreateConnectionPrameters): Promise<Connection> {
  const connectOptions: ConnectionOptions = {
    transport: Constants.TLS,
    host: params.config.host,
    hostname: params.config.host,
    username: params.config.sharedAccessKeyName,
    port: 5671,
    reconnect_limit: Constants.reconnectLimit,
    properties: {
      product: "MSJSClient",
      version: Constants.packageJsonInfo.version || "0.1.0",
      platform: `(${os.arch()}-${os.type()}-${os.release()})`,
      framework: `Node/${process.version}`,
      "user-agent": params.userAgent
    }
  };
  if (params.useSaslPlain) {
    connectOptions.password = params.config.sharedAccessKey;
  }
  debug("Dialing the amqp connection with options.", connectOptions);
  const connection = await new Connection(connectOptions).open();
  debug("Successfully established the amqp connection '%s'.", connection.id);
  return connection;
}
