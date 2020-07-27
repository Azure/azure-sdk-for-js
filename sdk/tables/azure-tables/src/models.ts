// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TableQueryOptionalParams,
  TableQueryEntitiesOptionalParams,
  TableQueryEntitiesWithPartitionAndRowKeyResponse,
  TableQueryEntitiesResponse,
  TableInsertEntityOptionalParams,
  TableUpdateEntityOptionalParams,
  TableMergeEntityOptionalParams,
  TableSetAccessPolicyOptionalParams
} from "./generated/models";

/**
 * Contains response data for the getEntity operation.
 */
export type ListEntitiesResponse<T> = Omit<TableQueryEntitiesResponse, "value"> & {
  /**
   * List of table entities.
   */
  value?: T[];
};

/**
 * Contains response data for the listEntities operation.
 */
export type GetEntityResponse<T> = TableQueryEntitiesWithPartitionAndRowKeyResponse & {
  /**
   * The table entity object.
   */
  value?: T;
};

/**
 * List tables optional parameters.
 */
export type ListTablesOptions = Omit<TableQueryOptionalParams, "queryOptions">;

/**
 * List entities optional parameters.
 */
export type ListEntitiesOptions = Omit<TableQueryEntitiesOptionalParams, "queryOptions">;

/**
 * Create entity optional parameters.
 */
export type CreateEntityOptions = Omit<TableInsertEntityOptionalParams, "tableEntityProperties">;

/**
 * Update entity optional parameters.
 */
export type UpdateEntityOptions = Omit<
  TableUpdateEntityOptionalParams,
  "tableEntityProperties" | "ifMatch"
>;

/**
 * Merge entity optional parameters.
 */
export type MergeEntityOptions = Omit<
  TableMergeEntityOptionalParams,
  "tableEntityProperties" | "ifMatch"
>;

/**
 * Set table access policy optional parameters.
 */
export type SetAccessPolicyOptions = Omit<TableSetAccessPolicyOptionalParams, "tableAcl">;

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
