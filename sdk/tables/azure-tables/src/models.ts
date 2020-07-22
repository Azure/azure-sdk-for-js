// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A set of key-value pairs representing the table entity.
 */
export interface Entity {
  /**
   * The PartitionKey property of the entity.
   */
  PartitionKey: string;
  /**
   * The RowKey property of the entity.
   */
  RowKey: string;
  /**
   * Any custom properties of the entity.
   */
  [propertyName: string]: any;
}
