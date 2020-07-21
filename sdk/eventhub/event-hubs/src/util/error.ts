// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logErrorStackTrace, logger } from "../log";
import { ConnectionContext } from "../connectionContext";
import { MessagingError } from "@azure/core-amqp";

/**
 * LinkRedirectError is a type of `MessagingError`.
 * It contains information used to create a new connection.
 * @internal
 * @ignore
 */
export interface LinkRedirectError extends MessagingError {
  code: "LinkRedirectError";
  info: {
    hostname: string;
    port: string;
    address: string;
  };
}

/**
 * The extracted info from a `LinkRedirectError` that can be used
 * to create a new connection.
 * @internal
 * @ignore
 */
export interface LinkRedirectErrorInfo {
  host: string;
  hostname: string;
  port: number;
  address: string;
}

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
    logger.warning(`[${context.connectionId}] ${error.name}: ${error.message}`);
    logErrorStackTrace(error);
    throw error;
  }
}

/**
 * @internal
 * @ignore
 * Logs and Throws TypeError if given parameter is undefined or null
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param methodName Name of the method that was passed the parameter
 * @param parameterName Name of the parameter to check
 * @param parameterValue Value of the parameter to check
 */
export function throwTypeErrorIfParameterMissing(
  connectionId: string,
  methodName: string,
  parameterName: string,
  parameterValue: any
): void {
  if (parameterValue === undefined || parameterValue === null) {
    const error = new TypeError(
      `${methodName} called without required argument "${parameterName}"`
    );
    logger.warning(`[${connectionId}] ${error.name}: ${error.message}`);
    logErrorStackTrace(error);
    throw error;
  }
}

/**
 * Indicates whether the provided error is a `MessagingError`.
 * @param err An error to check against.
 * @internal
 * @ignore
 */
export function isMessagingError(err: any): err is MessagingError {
  return err && err.name === "MessagingError";
}

/**
 * Indicates whether the provided error is a valid `LinkRedirectError`.
 * @param err An error to check against.
 * @internal
 * @ignore
 */
export function isValidLinkRedirectError(err: any): err is LinkRedirectError {
  if (!isMessagingError(err) || err.code !== "LinkRedirectError" || !err.info) {
    return false;
  }

  for (const field of ["hostname", "port", "address"] as Array<keyof LinkRedirectError["info"]>) {
    if (!Object.prototype.hasOwnProperty.call(err.info, field)) {
      return false;
    }
  }

  return true;
}

/**
 * Extracts the redirect info from a `LinkRedirectError`.
 * @param err A LinkRedirectError to extract redirect info from.
 * @internal
 * @ignore
 */
export function extractInfoFromLinkRedirectError(err: LinkRedirectError): LinkRedirectErrorInfo {
  const info = err.info;

  return {
    address: info.address,
    port: parseInt(info.port, 10),
    host: info.hostname.split(":")[0],
    hostname: info.hostname
  };
}
