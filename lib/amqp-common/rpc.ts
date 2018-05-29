// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as os from "os";
import * as process from "process";
import * as debugModule from "debug";
import { defaultLock } from "./util/utils";
import { ConnectionOptions, Connection } from "./rhea-promise";
import * as Constants from "./util/constants";
import { ConnectionConfig } from ".";
const debug = debugModule("azure:amqp-common:rpc");

export interface CreateConnectionPrameters {
  config: ConnectionConfig;
  userAgent: string;
  useSaslPlain?: boolean;
}

/**
 * Opens the AMQP connection to the Event Hub for this client, returning a promise
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
