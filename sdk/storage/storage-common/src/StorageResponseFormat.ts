// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Specifies the format the service should use to return list results.
 */
export const StorageResponseFormat = {
  /**
   * Default. Currently maps to {@link StorageResponseFormat.Xml}, but may be updated in future releases.
   */
  Auto: "Auto",
  /**
   * Use XML to return list results.
   */
  Xml: "Xml",
  /**
   * Use Apache Arrow to return list results.
   */
  Arrow: "Arrow",
} as const;

/**
 * Specifies the format the service should use to return list results.
 */
export type StorageResponseFormat =
  (typeof StorageResponseFormat)[keyof typeof StorageResponseFormat];
