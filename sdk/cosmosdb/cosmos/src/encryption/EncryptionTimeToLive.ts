// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Time to live for encryption keys and settings caches in milliseconds.
 * This can be set through cosmos client options.
 */
export class EncryptionTimeToLive {
  /** method to set ttl in minutes. returns ttl in milliseconds */
  static FromMinutes(minutes: number): number {
    return minutes * 60 * 1000;
  }
  /** method to set ttl in hours. returns ttl in milliseconds */
  static FromHours(hours: number): number {
    return hours * 60 * 60 * 1000;
  }
  /** method to set zero ttl */
  static NoTtl(): number {
    return 0;
  }
}
