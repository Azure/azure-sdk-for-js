// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionEvents } from "rhea-promise";
import { ConnectionContext } from "../connectionContext";
import { logger } from "../log";

/**
 * Checks if the connection on a ConnectionContext is closing.
 * @internal
 * @ignore
 * @param context
 */
export function isConnectionClosing(context: ConnectionContext): boolean {
  // When the connection is not open, but the remote end is open,
  // then the rhea connection is in the process of terminating.
  return Boolean(!context.connection.isOpen() && context.connection.isRemoteOpen());
}

/**
 * Resolves once the context's connection emits a 'disconnected' event.
 * @internal
 * @ignore
 * @param context
 */
export async function waitForConnectionDisconnected(context: ConnectionContext): Promise<void> {
  return new Promise((resolve) => {
    logger.verbose(
      `[${context.connectionId}] Attempting to reinitialize connection` +
        ` but the connection is in the process of closing.` +
        ` Waiting for the disconnect event before continuing.`
    );
    context.connection.once(ConnectionEvents.disconnected, resolve);
  });
}
