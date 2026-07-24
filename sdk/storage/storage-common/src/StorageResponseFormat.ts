// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Specifies the format the service should use to return list results.
 */
export enum StorageResponseFormat {
  /**
   * Default. Currently maps to {@link StorageResponseFormat.Xml}, but may be updated in future releases.
   */
  Auto = 0,
  /**
   * Use XML to return list results.
   */
  Xml = 1,
  /**
   * Use Apache Arrow to return list results.
   */
  Arrow = 2,
}
