// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { logger } from "../log";
import { ConnectionContext } from "../connectionContext";

/**
 * @internal
 * @ignore
 * Logs and throws Error if the current AMQP connection is closed.
 * @param context The ConnectionContext associated with the current AMQP connection.
 */
export function throwErrorIfConnectionClosed(context: ConnectionContext): void {
  if (context && context.wasConnectionCloseCalled) {
    const errorMessage = "The underlying AMQP connection is closed.";
    const error = new Error(errorMessage);
    logger.warning(`[${context.connectionId}] %O`, error);
    logger.verbose(error.stack);
    throw error;
  }
}

/**
 * @internal
 * @ignore
 * Logs and Throws TypeError if given parameter is undefined or null
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param parameterName Name of the parameter to check
 * @param parameterValue Value of the parameter to check
 */
export function throwTypeErrorIfParameterMissing(
  connectionId: string,
  parameterName: string,
  parameterValue: any
): void {
  if (parameterValue === undefined || parameterValue === null) {
    const error = new TypeError(`Missing parameter "${parameterName}"`);
    logger.warning(`[${connectionId}] %O`, error);
    logger.verbose(error.stack);
    throw error;
  }
}
