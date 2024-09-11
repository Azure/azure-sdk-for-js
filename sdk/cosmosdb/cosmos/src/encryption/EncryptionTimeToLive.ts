// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorResponse } from "../request/ErrorResponse";

// import { ErrorResponse } from "..";

/**
 * Time to live for encryption keys and settings caches in milliseconds.
 * This can be set through cosmos client options.
 */
export class EncryptionTimeToLive {
  /** method to set ttl in minutes. returns ttl in milliseconds */
  static FromMinutes(minutes: number): number {
    if (minutes < 0) {
      throw new ErrorResponse("TTL cannot be negative");
    }
    return minutes * 60 * 1000;
  }
  /** method to set ttl in hours. returns ttl in milliseconds */
  static FromHours(hours: number): number {
    if (hours < 0) {
      throw new ErrorResponse("TTL cannot be negative");
    }
    return hours * 60 * 60 * 1000;
  }
  /** method to set zero ttl */
  static NoTtl(): number {
    return 0;
  }
}
