// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "../log";
import { generate_uuid, string_to_uuid } from "rhea-promise";
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
  log.utils("Remaining time is :         %d", remainingTime);
  if (remainingTime < 1000) {
    return 0;
  }
  const buffer = Math.min(remainingTime / 2, 10000); // 10 seconds
  const renewAfter = remainingTime - buffer;
  log.utils("Renew after       : %d", renewAfter);
  return renewAfter;
}
