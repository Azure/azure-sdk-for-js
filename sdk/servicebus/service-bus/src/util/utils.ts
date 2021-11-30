// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Long from "long";
import { logger, receiverLogger, messageLogger } from "../log";
import { OperationTimeoutError, generate_uuid } from "rhea-promise";
import isBuffer from "is-buffer";
import { Buffer } from "buffer";
import * as Constants from "../util/constants";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { HttpOperationResponse, HttpResponse } from "@azure/core-http";
import { isDefined } from "./typeGuards";
import { StandardAbortMessage } from "@azure/core-amqp";

// This is the only dependency we have on DOM types, so rather than require
// the DOM lib we can just shim this in.
/**
 * @hidden
 * @internal
 */
interface Navigator {
  hardwareConcurrency: number;
}
/**
 * @hidden
 * @internal
 */
declare const navigator: Navigator;

/**
 * @internal
 * Provides a uniue name by appending a string guid to the given string in the following format:
 * `{name}-{uuid}`.
 * @param name - The nme of the entity
 */
export function getUniqueName(name: string): string {
  return `${name}-${generate_uuid()}`;
}

/**
 * @internal
 * If you try to turn a Guid into a Buffer in .NET, the bytes of the first three groups get
 * flipped within the group, but the last two groups don't get flipped, so we end up with a
 * different byte order. This is the order of bytes needed to make Service Bus recognize the token.
 *
 * @param lockToken - The lock token whose bytes need to be reorded.
 * @returns Buffer representing reordered bytes.
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
 * Provides the time in milliseconds after which the lock renewal should occur.
 * @param lockedUntilUtc - The time until which the message is locked.
 */
export function calculateRenewAfterDuration(lockedUntilUtc: Date): number {
  const now = Date.now();
  const lockedUntil = lockedUntilUtc.getTime();
  const remainingTime = lockedUntil - now;
  receiverLogger.verbose("Locked until utc  : %d", lockedUntil);
  receiverLogger.verbose("Current time is   : %d", now);
  receiverLogger.verbose("Remaining time is : %d", remainingTime);
  if (remainingTime < 1000) {
    return 0;
  }
  const buffer = Math.min(remainingTime / 2, 10000); // 10 seconds
  const renewAfter = remainingTime - buffer;
  receiverLogger.verbose("Renew after       : %d", renewAfter);
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
 * @param buf - Input as a Buffer
 * @returns The JS Date object.
 */
export function convertTicksToDate(buf: number[]): Date {
  const epochMicroDiff: number = 621355968000000000;
  const longValue: Long = Long.fromBytesBE(buf);
  const timeInMS = longValue
    .sub(epochMicroDiff)
    .div(10000)
    .toNumber();
  const result = new Date(timeInMS);
  logger.verbose("The converted date is: %s", result.toString());
  return result;
}

/**
 * @internal
 * Converts any given input to a Buffer.
 * @param input - The input that needs to be converted to a Buffer.
 */
export function toBuffer(input: unknown): Buffer {
  let result: any;
  messageLogger.verbose(
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
      messageLogger.warning("[utils.toBuffer] " + msg);
      throw err instanceof Error ? err : new Error(msg);
    }
  }
  messageLogger.verbose("[utils.toBuffer] The converted buffer is: %O.", result);
  return result;
}

/**
 * @internal
 * Helper utility to retrieve `string` value from given string,
 * or throws error if undefined.
 */
export function getString(value: unknown, nameOfProperty: string): string {
  const result = getStringOrUndefined(value);
  if (result === undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a string value and not undefined.`
    );
  }
  return result;
}

/**
 * @internal
 * Helper utility to retrieve `string` value from given input,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getStringOrUndefined(value: any): string | undefined {
  if (!isDefined(value)) {
    return undefined;
  }
  return value.toString();
}

/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or throws error if undefined.
 */
export function getInteger(value: unknown, nameOfProperty: string): number {
  const result = getIntegerOrUndefined(value);
  if (result === undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a number value and not undefined.`
    );
  }
  return result;
}

/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getIntegerOrUndefined(value: any): number | undefined {
  if (!isDefined(value)) {
    return undefined;
  }
  const result = parseInt(value.toString());
  return isNaN(result) ? undefined : result;
}

/**
 * @internal
 * Helper utility to convert ISO-8601 time into Date type.
 */
export function getDate(value: string, nameOfProperty: string): Date {
  return new Date(getString(value, nameOfProperty));
}

/**
 * @internal
 * Helper utility to retrieve `boolean` value from given string,
 * or throws error if undefined.
 */
export function getBoolean(value: unknown, nameOfProperty: string): boolean {
  const result = getBooleanOrUndefined(value);
  if (result === undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a boolean value and not undefined.`
    );
  }
  return result;
}

/**
 * @internal
 * Helper utility to retrieve `boolean` value from given string,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getBooleanOrUndefined(value: any): boolean | undefined {
  if (!isDefined(value)) {
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
 * Helps in differentiating JSON like objects from other kinds of objects.
 */
const EMPTY_JSON_OBJECT_CONSTRUCTOR = {}.constructor;

/**
 * @internal
 * Returns `true` if given input is a JSON like object.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isJSONLikeObject(value: any): boolean {
  // `value.constructor === {}.constructor` differentiates among the "object"s,
  //    would filter the JSON objects and won't match any array or other kinds of objects

  // -------------------------------------------------------------------------------
  // Few examples       | typeof obj ==="object" |  obj.constructor==={}.constructor
  // -------------------------------------------------------------------------------
  // {abc:1}            | true                   | true
  // ["a","b"]          | true                   | false
  // [{"a":1},{"b":2}]  | true                   | false
  // new Date()         | true                   | false
  // 123                | false                  | false
  // -------------------------------------------------------------------------------
  return typeof value === "object" && value.constructor === EMPTY_JSON_OBJECT_CONSTRUCTOR;
}

/**
 * @internal
 * Helper utility to retrieve message count details from given input,
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getMessageCountDetails(value: any): MessageCountDetails {
  const xmlnsPrefix = getXMLNSPrefix(value);
  if (!isDefined(value)) {
    value = {};
  }
  return {
    activeMessageCount: parseInt(value[`${xmlnsPrefix}:ActiveMessageCount`]) || 0,
    deadLetterMessageCount: parseInt(value[`${xmlnsPrefix}:DeadLetterMessageCount`]) || 0,
    scheduledMessageCount: parseInt(value[`${xmlnsPrefix}:ScheduledMessageCount`]) || 0,
    transferMessageCount: parseInt(value[`${xmlnsPrefix}:TransferMessageCount`]) || 0,
    transferDeadLetterMessageCount:
      parseInt(value[`${xmlnsPrefix}:TransferDeadLetterMessageCount`]) || 0
  };
}

/**
 * @internal
 * Gets the xmlns prefix from the root of the objects that are part of the parsed response body.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getXMLNSPrefix(value: any): string {
  if (!value[Constants.XML_METADATA_MARKER]) {
    throw new Error(
      `Error occurred while parsing the response body - cannot find the XML_METADATA_MARKER "$" on the object ${JSON.stringify(
        value
      )}`
    );
  }
  const keys = Object.keys(value[Constants.XML_METADATA_MARKER]);
  if (keys.length !== 1) {
    throw new Error(
      `Error occurred while parsing the response body - unexpected number of "xmlns:\${prefix}" keys at ${JSON.stringify(
        value[Constants.XML_METADATA_MARKER]
      )}`
    );
  }
  if (!keys[0].startsWith("xmlns:")) {
    throw new Error(
      `Error occurred while parsing the response body - unexpected key at ${JSON.stringify(
        value[Constants.XML_METADATA_MARKER]
      )}`
    );
  }
  // Pick the substring that's after "xmlns:"
  const xmlnsPrefix = keys[0].substring(6);
  if (!xmlnsPrefix) {
    throw new Error(
      `Error occurred while parsing the response body - unexpected xmlns prefix at ${JSON.stringify(
        value[Constants.XML_METADATA_MARKER]
      )}`
    );
  }
  return xmlnsPrefix;
}

/**
 * Represents type of message count details in ATOM based management operations.
 * @internal
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
export interface AuthorizationRule {
  /**
   * The claim type.
   */
  claimType: string;
  /**
   * The list of rights("Manage" | "Send" | "Listen").
   */
  accessRights?: ("Manage" | "Send" | "Listen")[];
  /**
   * The authorization rule key name.
   */
  keyName: string;
  /**
   * The primary key for the authorization rule.
   */
  primaryKey?: string;
  /**
   * The secondary key for the authorization rule.
   */
  secondaryKey?: string;
}

/**
 * @internal
 * Helper utility to retrieve array of `AuthorizationRule` from given input,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getAuthorizationRulesOrUndefined(value: any): AuthorizationRule[] | undefined {
  const authorizationRules: AuthorizationRule[] = [];

  // Ignore special case as Service Bus treats "" as a valid value for authorization rules
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  if (!isDefined(value)) {
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
 * Helper utility to build an instance of parsed authorization rule as `AuthorizationRule` from given input.
 */
function buildAuthorizationRule(value: any): AuthorizationRule {
  let accessRights;
  if (isDefined(value["Rights"])) {
    accessRights = value["Rights"]["AccessRights"];
  }

  const authorizationRule: AuthorizationRule = {
    claimType: value["ClaimType"],
    accessRights,
    keyName: value["KeyName"],
    primaryKey: value["PrimaryKey"],
    secondaryKey: value["SecondaryKey"]
  };

  if (authorizationRule.accessRights && !Array.isArray(authorizationRule.accessRights)) {
    authorizationRule.accessRights = [authorizationRule.accessRights];
  }
  return authorizationRule;
}

/**
 * @internal
 * Helper utility to extract output containing array of `RawAuthorizationRule` instances from given input,
 * or undefined if not passed in.
 */
export function getRawAuthorizationRules(authorizationRules: AuthorizationRule[] | undefined): any {
  if (!isDefined(authorizationRules)) {
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
 * Helper utility to build an instance of raw authorization rule as RawAuthorizationRule from given `AuthorizationRule` input.
 * @param authorizationRule - parsed Authorization Rule instance
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
    // ClaimValue is not settable by the users, but service expects the value for PUT requests
    ClaimValue: "None",
    Rights: {
      AccessRights: authorizationRule.accessRights
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
 * Helper utility to check if given string is an absolute URL
 */
export function isAbsoluteUrl(url: string): boolean {
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
 * Possible values for `availabilityStatus` of the Service Bus messaging entities.
 */
export type EntityAvailabilityStatus =
  | "Available"
  | "Limited"
  | "Renaming"
  | "Restoring"
  | "Unknown";

/**
 * @internal
 */
type setTimeoutArgs = (callback: (...args: any[]) => void, ms: number, ...args: any[]) => any;

/**
 * An executor for a function that returns a Promise that obeys both a timeout and an
 * optional AbortSignal.
 * @param timeoutMs - The number of milliseconds to allow before throwing an OperationTimeoutError.
 * @param timeoutMessage - The message to place in the .description field for the thrown exception for Timeout.
 * @param abortSignal - The abortSignal associated with containing operation.
 * @param abortErrorMsg - The abort error message associated with containing operation.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 *
 * @internal
 */
export async function waitForTimeoutOrAbortOrResolve<T>(args: {
  actionFn: () => Promise<T>;
  timeoutMs: number;
  timeoutMessage: string;
  abortSignal?: AbortSignalLike;
  // these are optional and only here for testing.
  timeoutFunctions?: {
    setTimeoutFn: setTimeoutArgs;
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
 */
export function checkAndRegisterWithAbortSignal(
  onAbortFn: (abortError: AbortError) => void,
  abortSignal?: AbortSignalLike
): () => void {
  if (abortSignal == null) {
    return () => {
      /** Nothing to do here, no abort signal */
    };
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
 * @internal
 * The user agent prefix string for the ServiceBus client.
 * See guideline at https://azure.github.io/azure-sdk/general_azurecore.html#telemetry-policy
 */
export const libInfo: string = `azsdk-js-azureservicebus/${Constants.packageJsonInfo.version}`;

/**
 * @internal
 * Returns the formatted prefix by removing the spaces, by appending the libInfo.
 */
export function formatUserAgentPrefix(prefix?: string): string {
  let userAgentPrefix = `${(prefix || "").replace(" ", "")}`;
  userAgentPrefix = userAgentPrefix.length > 0 ? userAgentPrefix + " " : "";
  return `${userAgentPrefix}${libInfo}`;
}

/**
 * @internal
 * Helper method which returns `HttpResponse` from an object of shape `HttpOperationResponse`.
 */
export const getHttpResponseOnly = ({
  request,
  status,
  headers
}: HttpOperationResponse): HttpResponse => ({
  request,
  status,
  headers
});

/**
 * @internal
 * Type with the service versions for the ATOM API.
 */
export type ServiceBusAtomAPIVersion = "2021-05" | "2017-04";
