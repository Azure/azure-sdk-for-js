/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  TableQueryOptionalParams,
  TableQueryOperationResponse,
  TableProperties,
  TableCreateOptionalParams,
  TableCreateResponse,
  TableDeleteOptionalParams,
  TableDeleteResponse,
  TableQueryEntitiesOptionalParams,
  TableQueryEntitiesResponse,
  TableQueryEntitiesWithPartitionAndRowKeyOptionalParams,
  TableQueryEntitiesWithPartitionAndRowKeyResponse,
  TableUpdateEntityOptionalParams,
  TableUpdateEntityResponse,
  TableMergeEntityOptionalParams,
  TableMergeEntityResponse,
  TableDeleteEntityOptionalParams,
  TableDeleteEntityResponse,
  TableInsertEntityOptionalParams,
  TableInsertEntityResponse,
  TableGetAccessPolicyOptionalParams,
  TableGetAccessPolicyResponse,
  TableSetAccessPolicyOptionalParams,
  TableSetAccessPolicyResponse
} from "../models/index.js";

/** Interface representing a Table. */
export interface Table {
  /**
   * Queries tables under the given account.
   * @param options The options parameters.
   */
  query(
    options?: TableQueryOptionalParams
  ): Promise<TableQueryOperationResponse>;
  /**
   * Creates a new table under the given account.
   * @param tableProperties The Table properties.
   * @param options The options parameters.
   */
  create(
    tableProperties: TableProperties,
    options?: TableCreateOptionalParams
  ): Promise<TableCreateResponse>;
  /**
   * Operation permanently deletes the specified table.
   * @param table The name of the table.
   * @param options The options parameters.
   */
  delete(
    table: string,
    options?: TableDeleteOptionalParams
  ): Promise<TableDeleteResponse>;
  /**
   * Queries entities in a table.
   * @param table The name of the table.
   * @param options The options parameters.
   */
  queryEntities(
    table: string,
    options?: TableQueryEntitiesOptionalParams
  ): Promise<TableQueryEntitiesResponse>;
  /**
   * Queries entities in a table.
   * @param table The name of the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  queryEntitiesWithPartitionAndRowKey(
    table: string,
    partitionKey: string,
    rowKey: string,
    options?: TableQueryEntitiesWithPartitionAndRowKeyOptionalParams
  ): Promise<TableQueryEntitiesWithPartitionAndRowKeyResponse>;
  /**
   * Update entity in a table.
   * @param table The name of the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  updateEntity(
    table: string,
    partitionKey: string,
    rowKey: string,
    options?: TableUpdateEntityOptionalParams
  ): Promise<TableUpdateEntityResponse>;
  /**
   * Merge entity in a table.
   * @param table The name of the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  mergeEntity(
    table: string,
    partitionKey: string,
    rowKey: string,
    options?: TableMergeEntityOptionalParams
  ): Promise<TableMergeEntityResponse>;
  /**
   * Deletes the specified entity in a table.
   * @param table The name of the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param ifMatch Match condition for an entity to be deleted. If specified and a matching entity is
   *                not found, an error will be raised. To force an unconditional delete, set to the wildcard character
   *                (*).
   * @param options The options parameters.
   */
  deleteEntity(
    table: string,
    partitionKey: string,
    rowKey: string,
    ifMatch: string,
    options?: TableDeleteEntityOptionalParams
  ): Promise<TableDeleteEntityResponse>;
  /**
   * Insert entity in a table.
   * @param table The name of the table.
   * @param options The options parameters.
   */
  insertEntity(
    table: string,
    options?: TableInsertEntityOptionalParams
  ): Promise<TableInsertEntityResponse>;
  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param table The name of the table.
   * @param options The options parameters.
   */
  getAccessPolicy(
    table: string,
    options?: TableGetAccessPolicyOptionalParams
  ): Promise<TableGetAccessPolicyResponse>;
  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param table The name of the table.
   * @param options The options parameters.
   */
  setAccessPolicy(
    table: string,
    options?: TableSetAccessPolicyOptionalParams
  ): Promise<TableSetAccessPolicyResponse>;
}
