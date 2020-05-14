// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionEvents } from "rhea-promise";
import { ConnectionContext } from "../connectionContext";
import { logger } from "../log";

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
