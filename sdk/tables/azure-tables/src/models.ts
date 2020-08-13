// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  QueryOptions as TableQueryOptions,
  TableQueryOptionalParams,
  TableQueryEntitiesOptionalParams,
  TableQueryEntitiesWithPartitionAndRowKeyResponse,
  TableQueryEntitiesResponse,
  TableInsertEntityOptionalParams,
  TableUpdateEntityOptionalParams,
  TableMergeEntityOptionalParams as TableUpsertEntityOptionalParams,
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
 * OData Query options to limit the set of tables or entities returned.
 */
export type QueryOptions = Omit<TableQueryOptions, "select"> & {
  /**
   * A select expression limits the properties on each entity to just those requested.
   */
  select?: string[];
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
export type UpsertEntityOptions = Omit<
  TableUpsertEntityOptionalParams,
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

/**
 * Supported EDM Types by Azure Tables.
 */
export type EdmTypes =
  | "Binary"
  | "Boolean"
  | "DateTime"
  | "Double"
  | "Guid"
  | "Int32"
  | "Int64"
  | "String";

/**
 * Entity Data Model representation for an entity property.
 */
export interface Edm<T extends EdmTypes> {
  /**
   * The value of the entity property
   */
  value: T extends "Binary"
    ? Uint8Array
    : T extends "Boolean"
    ? boolean
    : T extends "DateTime"
    ? Date
    : T extends "Double"
    ? number
    : T extends "Int32"
    ? number
    : string;
  /**
   * The type of the entity property
   */
  type: T;
}

/* The different modes for Update and Upsert methods
 * - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
 * - Replace: Updates an existing entity by replacing the entire entity.
 */
export type UpdateMode = "Merge" | "Replace";
