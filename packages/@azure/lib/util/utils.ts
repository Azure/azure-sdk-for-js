// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as Long from "long";
import * as log from "../log";
import { generate_uuid, string_to_uuid } from "rhea-promise";
import { isBuffer } from "util";

/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode = typeof navigator === "undefined" && typeof process !== "undefined";

/**
 * Defines a concrete type that can be anything but `null` or `undefined`
 */
export type Concrete = string | number | boolean | symbol | object;

/**
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
export function reorderLockToken(lockToken: string): Buffer {
  if (!lockToken || typeof lockToken !== "string") {
    throw new Error("'lockToken' is a required parameter and must be of type 'string'.");
  }
  const lockTokenBytes = string_to_uuid(lockToken);
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
 * If you try to turn a Guid into a Buffer in .NET, the bytes of the first three groups get
 * flipped within the group, but the last two groups don't get flipped, so we end up with a
 * different byte order. This is the order of bytes needed to make Service Bus recognize the token.
 *
 * @param lockTokens An array of lock tokens whose bytes need to be reorderd.
 * @returns Buffer[] An array of Buffer representing reordered bytes.
 */
export function reorderLockTokens(lockTokens: string[]): Buffer[] {
  if (!Array.isArray(lockTokens)) {
    throw new Error("'lockTokens' is a required parameter and must be of type 'Array'.");
  }
  const result: Buffer[] = [];
  for (const lockToken of lockTokens) {
    result.push(reorderLockToken(lockToken));
  }

  return result;
}

/**
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
        `${err ? err.stack : JSON.stringify(err)}`;
      log.error("[utils.toBuffer] " + msg);
      throw new Error(msg);
    }
  }
  log.utils("[utils.toBuffer] The converted buffer is: %O.", result);
  return result;
}
