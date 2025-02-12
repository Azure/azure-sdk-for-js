// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorResponse } from "../request/ErrorResponse";

const secondsPerMinute = 60;
const millisecondsPerSecond = 1000;
const millisecondsPerMinute = secondsPerMinute * millisecondsPerSecond;
const minutesPerHour = 60;
const millisecondsPerHour = minutesPerHour * millisecondsPerMinute;
/**
 * Time to live for encryption keys and settings caches in milliseconds.
 * This can be set through cosmos client options.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class EncryptionTimeToLive {
  /** method to set ttl in minutes. returns ttl in milliseconds */
  static FromMinutes(minutes: number): number {
    if (minutes < 0 || !Number.isInteger(minutes)) {
      throw new ErrorResponse("Encryption Time To Live must be a positive integer.");
    }
    return minutes * millisecondsPerMinute;
  }
  /** method to set ttl in hours. returns ttl in milliseconds */
  static FromHours(hours: number): number {
    if (hours < 0 || !Number.isInteger(hours)) {
      throw new ErrorResponse("Encryption Time To Live must be a positive integer");
    }
    return hours * millisecondsPerHour;
  }
  /** method to set zero ttl */
  static NoTTL(): number {
    return 0;
  }
}
