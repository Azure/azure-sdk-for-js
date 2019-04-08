// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import Long from "long";
import * as log from "../log";
import { generate_uuid } from "rhea-promise";
import { isBuffer } from "util";
import { ConnectionContext } from "../connectionContext";
import { ClientType } from "../client";

// This is the only dependency we have on DOM types, so rather than require
// the DOM lib we can just shim this in.
interface Navigator {
  hardwareConcurrency: number;
}
declare var navigator: Navigator;

/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode = typeof navigator === "undefined" && typeof process !== "undefined";

/**
 * @internal
 * Provides a uniue name by appending a string guid to the given string in the following format:
 * `{name}-{uuid}`.
 * @param name The nme of the entity
 */
export function getUniqueName(name: string): string {
  if (typeof name !== "string") {
    throw new Error("name is a required parameter of type 'string'.");
  }
  return `${name}-${generate_uuid()}`;
}

/**
 * If you try to turn a Guid into a Buffer in .NET, the bytes of the first three groups get
 * flipped within the group, but the last two groups don't get flipped, so we end up with a
 * different byte order. This is the order of bytes needed to make Service Bus recognize the token.
 *
 * @param lockToken The lock token whose bytes need to be reorded.
 * @returns Buffer - Buffer representing reordered bytes.
 */
export function reorderLockToken(lockTokenBytes: Buffer): Buffer {
  if (!lockTokenBytes || !Buffer.isBuffer(lockTokenBytes)) {
    throw new Error("'lockToken' is a required parameter and must be of type 'Buffer'.");
  }

  return Buffer.from([
    lockTokenBytes[3],
    lockTokenBytes[2],
    lockTokenBytes[1],
    lockTokenBytes[0],

    lockTokenBytes[5],
    lockTokenBytes[4],

    lockTokenBytes[7],
    lockTokenBytes[6],

    lockTokenBytes[8],
    lockTokenBytes[9],

    lockTokenBytes[10],
    lockTokenBytes[11],
    lockTokenBytes[12],
    lockTokenBytes[13],
    lockTokenBytes[14],
    lockTokenBytes[15]
  ]);
}

/**
 * @internal
 * Provides the time in milliseconds after which the lock renewal should occur.
 * @param lockedUntilUtc - The time until which the message is locked.
 */
export function calculateRenewAfterDuration(lockedUntilUtc: Date): number {
  const now = Date.now();
  const lockedUntil = lockedUntilUtc.getTime();
  const remainingTime = lockedUntil - now;
  log.utils("Locked until utc  : %d", lockedUntil);
  log.utils("Current time is   : %d", now);
  log.utils("Remaining time is : %d", remainingTime);
  if (remainingTime < 1000) {
    return 0;
  }
  const buffer = Math.min(remainingTime / 2, 10000); // 10 seconds
  const renewAfter = remainingTime - buffer;
  log.utils("Renew after       : %d", renewAfter);
  return renewAfter;
}

/**
 * @internal
 * Converts the .net ticks to a JS Date object.
 *
 * - The epoch for the DateTimeOffset type is `0000-01-01`, while the epoch for JS Dates is
 * `1970-01-01`.
 * - The DateTimeOffset ticks value for the date `1970-01-01` is `621355968000000000`.
 *   - Hence, to convert it to the JS epoch; we `subtract` the delta from the given value.
 * - Ticks in DateTimeOffset is `1/10000000` second, while ticks in JS Date is `1/1000` second.
 *   - Thus, we `divide` the value by `10000` to convert it to JS Date ticks.
 *
 * @param buf Input as a Buffer
 * @returns Date The JS Date object.
 */
export function convertTicksToDate(buf: number[]): Date {
  const epochMicroDiff: number = 621355968000000000;
  const longValue: Long = Long.fromBytesBE(buf);
  const timeInMS = longValue
    .sub(epochMicroDiff)
    .div(10000)
    .toNumber();
  const result = new Date(timeInMS);
  log.utils("The converted date is: %s", result.toString());
  return result;
}

/**
 * @internal
 * Returns the number of logical processors in the system.
 */
export function getProcessorCount(): number {
  if (isNode) {
    const os = require("os");
    return os.cpus().length;
  } else {
    return navigator.hardwareConcurrency || 1;
  }
}

/**
 * @internal
 * Converts any given input to a Buffer.
 * @param input The input that needs to be converted to a Buffer.
 */
export function toBuffer(input: any): Buffer {
  let result: any;
  log.utils(
    "[utils.toBuffer] The given message body that needs to be converted to buffer is: ",
    input
  );
  if (isBuffer(input)) {
    result = input;
  } else {
    // string, undefined, null, boolean, array, object, number should end up here
    // coercing undefined to null as that will ensure that null value will be given to the
    // customer on receive.
    if (input === undefined) input = null; // tslint:disable-line
    try {
      const inputStr = JSON.stringify(input);
      result = Buffer.from(inputStr, "utf8");
    } catch (err) {
      const msg =
        `An error occurred while executing JSON.stringify() on the given input ` +
        input +
        `${err instanceof Error ? err.stack : JSON.stringify(err)}`;
      log.error("[utils.toBuffer] " + msg);
      throw err instanceof Error ? err : new Error(msg);
    }
  }
  log.utils("[utils.toBuffer] The converted buffer is: %O.", result);
  return result;
}

/**
 * @internal
 * Throws InvalidOperationError if the current AMQP connection is closed.
 * @param context The ConnectionContext associated with the current AMQP connection.
 */
export function throwErrorIfConnectionClosed(context: ConnectionContext): void {
  if (context && context.wasConnectionCloseCalled) {
    const errorMessage = "The underlying AMQP connection is closed.";
    log.error(`[${context.connectionId}] ${errorMessage}`);
    throw new Error(errorMessage);
  }
}

/**
 * @internal
 * Throws error if the underlying AMQP connection or if the client is closed
 * @param context The ConnectionContext associated with the current AMQP connection.
 * @param entityPath Entity Path of the client which denotes the name of the Queue/Topic/Subscription
 * @param isClientClosed Boolean denoting if the client is closed or not
 */
export function throwErrorIfClientOrConnectionClosed(
  context: ConnectionContext,
  entityPath: string,
  isClientClosed: boolean
): void {
  throwErrorIfConnectionClosed(context);
  if (context && isClientClosed) {
    const err = getClientClosedErrorMsg(entityPath);
    log.error(`[${context.connectionId}] ${err}`);
    throw new Error(err);
  }
}

/**
 * @internal
 * Gets the error message when an open sender exists, but a new one is asked for on the same client
 * @param clientType 'QueueClient' or 'TopicClient'
 * @param entityPath  Value of the `entityPath` property on the client which denotes its name
 */
export function getOpenSenderErrorMsg(clientType: string, entityPath: string): string {
  return (
    `An open sender already exists on the ${clientType} for "${entityPath}". ` +
    `Please close it and try again or use a new ${clientType} instance.`
  );
}

/**
 * @internal
 * Gets the error message when an open receiver exists, but a new one is asked for on the same client
 * @param clientType 'QueueClient' or 'SubscriptionClient'
 * @param entityPath  Value of the `entityPath` property on the client which denotes its name
 * @param sessionId If using session receiver, then the id of the session
 */
export function getOpenReceiverErrorMsg(
  clientType: ClientType,
  entityPath: string,
  sessionId?: string
): string {
  if (!sessionId) {
    return (
      `An open receiver already exists on the ${clientType} for "${entityPath}". ` +
      `Please close it and try again or use a new ${clientType} instance.`
    );
  }
  return (
    `An open receiver already exists for the session "${sessionId}" on the ${clientType} for ` +
    `"${entityPath}". Please close it and try again or use a new ${clientType} instance.`
  );
}

/**
 * Gets the error message when a client is used when its already closed
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
 */
export function getClientClosedErrorMsg(entityPath: string): string {
  return (
    `The client for "${entityPath}" has been closed and can no longer be used. ` +
    `Please create a new client using an instance of ServiceBusClient.`
  );
}

/**
 * Gets the error message when a sender is used when its already closed
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
 * @param clientType One of "QueueClient", "TopicClient" or "SubscriptionClient", used for logging
 */
export function getSenderClosedErrorMsg(entityPath: string, clientType: ClientType): string {
  return (
    `The sender for "${entityPath}" has been closed and can no longer be used. ` +
    `Please create a new sender using the "createSender" function on the ${clientType}.`
  );
}

/**
 * Gets the error message when a receiver is used when its already closed
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
 * @param clientType One of "QueueClient", "TopicClient" or "SubscriptionClient", used for logging
 * @param sessionId If using session receiver, then the id of the session
 */
export function getReceiverClosedErrorMsg(
  entityPath: string,
  clientType: ClientType,
  sessionId?: string
): string {
  if (!sessionId) {
    return (
      `The receiver for "${entityPath}" has been closed and can no longer be used. ` +
      `Please create a new receiver using the "createReceiver" function on the ${clientType}.`
    );
  }
  return (
    `The receiver for session "${sessionId}" in "${entityPath}" has been closed and can no ` +
    `longer be used. Please create a new receiver using the "createReceiver" function.`
  );
}

/**
 *
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
 * @param sessionId If using session receiver, then the id of the session
 */
export function getAlreadyRecevingErrorMsg(entityPath: string, sessionId?: string): string {
  if (!sessionId) {
    return `The receiver for "${entityPath}" is already receiving messages.`;
  }
  return `The receiver for session "${sessionId}" for "${entityPath}" is already receiving messages.`;
}

/**
 * @internal
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
    log.error(`[${connectionId}] ${error}`);
    throw error;
  }
}

/**
 * @internal
 * Logs and Throws TypeError if given parameter is not of expected type
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param parameterName Name of the parameter to type check
 * @param parameterValue Value of the parameter to type check
 * @param expectedType Expected type of the parameter
 */
export function throwTypeErrorIfParameterTypeMismatch(
  connectionId: string,
  parameterName: string,
  parameterValue: any,
  expectedType: string
): void {
  if (expectedType === "string" && typeof parameterValue !== expectedType) {
    const error = new TypeError(
      `The parameter "${parameterName}" should be of type "${expectedType}"`
    );
    log.error(`[${connectionId}] ${error}`);
    throw error;
  }
}

/**
 * @internal
 * Logs and Throws TypeError if given parameter is not of type `Long`
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param parameterName Name of the parameter to type check
 * @param parameterValue Value of the parameter to type check
 */
export function throwTypeErrorIfParameterNotLong(
  connectionId: string,
  parameterName: string,
  parameterValue: any
): TypeError | undefined {
  if (Long.isLong(parameterValue)) {
    return;
  }
  const error = new TypeError(`The parameter "${parameterName}" should be of type "${Long}"`);
  log.error(`[${connectionId}] ${error}`);
  throw error;
}
