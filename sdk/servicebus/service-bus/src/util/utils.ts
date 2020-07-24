// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Long from "long";
import * as log from "../log";
import { OperationTimeoutError, generate_uuid } from "rhea-promise";
import isBuffer from "is-buffer";
import { Buffer } from "buffer";
import * as Constants from "../util/constants";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";

// This is the only dependency we have on DOM types, so rather than require
// the DOM lib we can just shim this in.
/**
 * @ignore
 * @internal
 */
interface Navigator {
  hardwareConcurrency: number;
}
/**
 * @ignore
 * @internal
 */
declare const navigator: Navigator;

/**
 * @internal
 * @ignore
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode = typeof navigator === "undefined" && typeof process !== "undefined";

/**
 * @internal
 * @ignore
 * Provides a uniue name by appending a string guid to the given string in the following format:
 * `{name}-{uuid}`.
 * @param name The nme of the entity
 */
export function getUniqueName(name: string): string {
  return `${name}-${generate_uuid()}`;
}

/**
 * @internal
 * @ignore
 * If you try to turn a Guid into a Buffer in .NET, the bytes of the first three groups get
 * flipped within the group, but the last two groups don't get flipped, so we end up with a
 * different byte order. This is the order of bytes needed to make Service Bus recognize the token.
 *
 * @param lockToken The lock token whose bytes need to be reorded.
 * @returns Buffer - Buffer representing reordered bytes.
 */
export function reorderLockToken(lockTokenBytes: Buffer): Buffer {
  if (!lockTokenBytes || !Buffer.isBuffer(lockTokenBytes)) {
    return lockTokenBytes;
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
 * @ignore
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
 * @ignore
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
 * @ignore
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
 * @ignore
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
    if (input === undefined) input = null;
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
 * @ignore
 * Helper utility to retrieve `string` value from given string,
 * or throws error if undefined.
 * @param value
 */
export function getString(value: any, nameOfProperty: string): string {
  const result = getStringOrUndefined(value);
  if (result == undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a string value and not undefined.`
    );
  }
  return result;
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve `string` value from given input,
 * or undefined if not passed in.
 * @param value
 */
export function getStringOrUndefined(value: any): string | undefined {
  if (value == undefined) {
    return undefined;
  }
  return value.toString();
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve `integer` value from given string,
 * or throws error if undefined.
 * @param value
 */
export function getInteger(value: any, nameOfProperty: string): number {
  const result = getIntegerOrUndefined(value);
  if (result == undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a number value and not undefined.`
    );
  }
  return result;
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve `integer` value from given string,
 * or undefined if not passed in.
 * @param value
 */
export function getIntegerOrUndefined(value: any): number | undefined {
  if (value == undefined) {
    return undefined;
  }
  const result = parseInt(value.toString());
  return result == NaN ? undefined : result;
}

/**
 * @internal
 * @ignore
 * Helper utility to convert ISO-8601 time into Date type.
 * @param value
 */
export function getDate(value: string, nameOfProperty: string): Date {
  return new Date(getString(value, nameOfProperty));
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve `boolean` value from given string,
 * or throws error if undefined.
 * @param value
 */
export function getBoolean(value: any, nameOfProperty: string): boolean {
  const result = getBooleanOrUndefined(value);
  if (result == undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a boolean value and not undefined.`
    );
  }
  return result;
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve `boolean` value from given string,
 * or undefined if not passed in.
 * @param value
 */
export function getBooleanOrUndefined(value: any): boolean | undefined {
  if (value == undefined) {
    return undefined;
  }
  return (
    value
      .toString()
      .trim()
      .toLowerCase() === "true"
  );
}

/**
 * @internal
 * @ignore
 * Returns `true` if given input is a JSON like object.
 * @param value
 */
export function isJSONLikeObject(value: any): boolean {
  return typeof value === "object" && !(value instanceof Number) && !(value instanceof String);
}

/**
 * @internal
 * @ignore
 * Helper utility to retrieve message count details from given input,
 * @param value
 */
export function getMessageCountDetails(value: any): MessageCountDetails {
  if (value == undefined) {
    value = {};
  }
  return {
    activeMessageCount: parseInt(value["d2p1:ActiveMessageCount"]) || 0,
    deadLetterMessageCount: parseInt(value["d2p1:DeadLetterMessageCount"]) || 0,
    scheduledMessageCount: parseInt(value["d2p1:ScheduledMessageCount"]) || 0,
    transferMessageCount: parseInt(value["d2p1:TransferMessageCount"]) || 0,
    transferDeadLetterMessageCount: parseInt(value["d2p1:TransferDeadLetterMessageCount"]) || 0
  };
}

/**
 * Represents type of message count details in ATOM based management operations.
 */
export type MessageCountDetails = {
  activeMessageCount: number;
  deadLetterMessageCount: number;
  scheduledMessageCount: number;
  transferMessageCount: number;
  transferDeadLetterMessageCount: number;
};

/**
 * Represents type of `AuthorizationRule` in ATOM based management operations.
 */
export type AuthorizationRule = {
  claimType: string;
  claimValue: string;
  rights: { accessRights?: string[] };
  keyName: string;
  primaryKey?: string;
  secondaryKey?: string;
};

/**
 * @internal
 * @ignore
 * Helper utility to retrieve array of `AuthorizationRule` from given input,
 * or undefined if not passed in.
 * @param value
 */
export function getAuthorizationRulesOrUndefined(value: any): AuthorizationRule[] | undefined {
  const authorizationRules: AuthorizationRule[] = [];

  // Ignore special case as Service Bus treats "" as a valid value for authorization rules
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  if (value == undefined) {
    return undefined;
  }

  const rawAuthorizationRules = value.AuthorizationRule;
  if (Array.isArray(rawAuthorizationRules)) {
    for (let i = 0; i < rawAuthorizationRules.length; i++) {
      authorizationRules.push(buildAuthorizationRule(rawAuthorizationRules[i]));
    }
  } else {
    authorizationRules.push(buildAuthorizationRule(rawAuthorizationRules));
  }
  return authorizationRules;
}

/**
 * @internal
 * @ignore
 * Helper utility to build an instance of parsed authorization rule as `AuthorizationRule` from given input.
 * @param value
 */
function buildAuthorizationRule(value: any): AuthorizationRule {
  let accessRights;
  if (value["Rights"] != undefined) {
    accessRights = value["Rights"]["AccessRights"];
  }

  const authorizationRule: AuthorizationRule = {
    claimType: value["ClaimType"],
    claimValue: value["ClaimValue"],
    rights: {
      accessRights: accessRights
    },
    keyName: value["KeyName"],
    primaryKey: value["PrimaryKey"],
    secondaryKey: value["SecondaryKey"]
  };

  if (
    authorizationRule.rights.accessRights &&
    !Array.isArray(authorizationRule.rights.accessRights)
  ) {
    authorizationRule.rights.accessRights = [authorizationRule.rights.accessRights];
  }
  return authorizationRule;
}

/**
 * @internal
 * @ignore
 * Helper utility to extract output containing array of `RawAuthorizationRule` instances from given input,
 * or undefined if not passed in.
 * @param value
 */
export function getRawAuthorizationRules(authorizationRules: AuthorizationRule[] | undefined): any {
  if (authorizationRules == undefined) {
    return undefined;
  }

  if (!Array.isArray(authorizationRules)) {
    throw new TypeError(
      `authorizationRules must be an array of AuthorizationRule objects or undefined, but received ${JSON.stringify(
        authorizationRules,
        undefined,
        2
      )}`
    );
  }

  const rawAuthorizationRules: any[] = [];
  for (let i = 0; i < authorizationRules.length; i++) {
    rawAuthorizationRules.push(buildRawAuthorizationRule(authorizationRules[i]));
  }
  return { AuthorizationRule: rawAuthorizationRules };
}

/**
 * @internal
 * @ignore
 * Helper utility to build an instance of raw authorization rule as RawAuthorizationRule from given `AuthorizationRule` input.
 * @param authorizationRule parsed Authorization Rule instance
 */
function buildRawAuthorizationRule(authorizationRule: AuthorizationRule): any {
  if (!isJSONLikeObject(authorizationRule) || authorizationRule === null) {
    throw new TypeError(
      `Expected authorizationRule input to be a JS object value, but received ${JSON.stringify(
        authorizationRule,
        undefined,
        2
      )}`
    );
  }

  const rawAuthorizationRule: any = {
    ClaimType: authorizationRule.claimType,
    ClaimValue: authorizationRule.claimValue,
    Rights: {
      AccessRights: authorizationRule.rights.accessRights
    },
    KeyName: authorizationRule.keyName,
    PrimaryKey: authorizationRule.primaryKey,
    SecondaryKey: authorizationRule.secondaryKey
  };
  rawAuthorizationRule[Constants.XML_METADATA_MARKER] = {
    "p5:type": "SharedAccessAuthorizationRule",
    "xmlns:p5": "http://www.w3.org/2001/XMLSchema-instance"
  };
  return rawAuthorizationRule;
}

/**
 * @internal
 * @ignore
 * Helper utility to check if given string is an absolute URL
 * @param url
 */
export function isAbsoluteUrl(url: string) {
  const _url = url.toLowerCase();
  return _url.startsWith("sb://") || _url.startsWith("http://") || _url.startsWith("https://");
}

/**
 * Possible values for `status` of the Service Bus messaging entities.
 */
export type EntityStatus =
  | "Active"
  | "Creating"
  | "Deleting"
  | "ReceiveDisabled"
  | "SendDisabled"
  | "Disabled"
  | "Renaming"
  | "Restoring"
  | "Unknown";

/**
 * @internal
 * @ignore
 */
export const StandardAbortMessage = "The operation was aborted.";

/**
 * An executor for a function that returns a Promise that obeys both a timeout and an
 * optional AbortSignal.
 * @param timeoutMs - The number of milliseconds to allow before throwing an OperationTimeoutError.
 * @param timeoutMessage - The message to place in the .description field for the thrown exception for Timeout.
 * @param abortSignal - The abortSignal associated with containing operation.
 * @param abortErrorMsg - The abort error message associated with containing operation.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} - Resolved promise
 *
 * @internal
 * @ignore
 */
export async function waitForTimeoutOrAbortOrResolve<T>(args: {
  actionFn: () => Promise<T>;
  timeoutMs: number;
  timeoutMessage: string;
  abortSignal?: AbortSignalLike;
  // these are optional and only here for testing.
  timeoutFunctions?: {
    setTimeoutFn: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => any;
    clearTimeoutFn: (timeoutId: any) => void;
  };
}): Promise<T> {
  if (args.abortSignal && args.abortSignal.aborted) {
    throw new AbortError(StandardAbortMessage);
  }

  let timer: any | undefined = undefined;
  let clearAbortSignal: (() => void) | undefined = undefined;

  const clearAbortSignalAndTimer = (): void => {
    (args.timeoutFunctions?.clearTimeoutFn ?? clearTimeout)(timer);

    if (clearAbortSignal) {
      clearAbortSignal();
    }
  };

  // eslint-disable-next-line promise/param-names
  const abortOrTimeoutPromise = new Promise<T>((_resolve, reject) => {
    clearAbortSignal = checkAndRegisterWithAbortSignal(reject, args.abortSignal);

    timer = (args.timeoutFunctions?.setTimeoutFn ?? setTimeout)(() => {
      reject(new OperationTimeoutError(args.timeoutMessage));
    }, args.timeoutMs);
  });

  try {
    return await Promise.race([abortOrTimeoutPromise, args.actionFn()]);
  } finally {
    clearAbortSignalAndTimer();
  }
}

/**
 * Registers listener to the abort event on the abortSignal to call your abortFn and
 * returns a function that will clear the same listener.
 *
 * If abort signal is already aborted, then throws an AbortError and returns a function that does nothing
 *
 * @returns A function that removes any of our attached event listeners on the abort signal or an empty function if
 * the abortSignal was not defined.
 *
 * @internal
 * @ignore
 */
export function checkAndRegisterWithAbortSignal(
  onAbortFn: (abortError: AbortError) => void,
  abortSignal?: AbortSignalLike
): () => void {
  if (abortSignal == null) {
    return () => {};
  }

  if (abortSignal.aborted) {
    throw new AbortError(StandardAbortMessage);
  }

  const onAbort = (): void => {
    abortSignal.removeEventListener("abort", onAbort);
    onAbortFn(new AbortError(StandardAbortMessage));
  };

  abortSignal.addEventListener("abort", onAbort);

  return () => abortSignal.removeEventListener("abort", onAbort);
}

/**
 * @property {string} libInfo The user agent prefix string for the ServiceBus client.
 * See guideline at https://azure.github.io/azure-sdk/general_azurecore.html#telemetry-policy
 */
export const libInfo: string = `azsdk-js-azureservicebus/${Constants.packageJsonInfo.version}`;

/**
 * Returns the formatted prefix by removing the spaces, by appending the libInfo.
 *
 * @export
 * @param {string} [prefix]
 * @returns {string}
 */
export function formatUserAgentPrefix(prefix?: string): string {
  let userAgentPrefix = `${(prefix || "").replace(" ", "")}`;
  userAgentPrefix = userAgentPrefix.length > 0 ? userAgentPrefix + " " : "";
  return `${userAgentPrefix}${libInfo}`;
}
