// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const SDK_VERSION: string = "2.0.0";

/**
 * The supported API versions for the SMS service.
 */
export enum ServiceVersion {
  /** API version 2021-03-07 */
  V2021_03_07 = "2021-03-07",
  /** API version 2026-01-23 (default) */
  V2026_01_23 = "2026-01-23",
}

/**
 * The default API version to use if none is specified.
 */
export const DEFAULT_API_VERSION = ServiceVersion.V2026_01_23;
