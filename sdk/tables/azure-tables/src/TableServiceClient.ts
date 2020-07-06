// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Service } from "./generated/operations";
import { Table } from "./generated/operations/table";
import {
  GeneratedClientOptionalParams,
  ServiceGetStatisticsOptionalParams,
  ServiceGetStatisticsResponse,
  ServiceGetPropertiesOptionalParams,
  ServiceGetPropertiesResponse,
  TableServiceProperties,
  ServiceSetPropertiesOptionalParams,
  ServiceSetPropertiesResponse,
  TableCreateOptionalParams,
  TableCreateResponse,
  TableDeleteOptionalParams,
  TableDeleteResponse,
  TableQueryOptionalParams,
  QueryOptions,
  TableQueryOperationResponse,
  TableQueryEntitiesOptionalParams,
  TableQueryEntitiesResponse,
  TableQueryEntitiesWithPartitionAndRowKeyOptionalParams,
  TableQueryEntitiesWithPartitionAndRowKeyResponse,
  TableDeleteEntityOptionalParams,
  TableInsertEntityOptionalParams,
  TableInsertEntityResponse,
  TableMergeEntityOptionalParams,
  TableUpdateEntityResponse,
  TableDeleteEntityResponse,
  TableUpdateEntityOptionalParams,
  TableMergeEntityResponse,
  TableGetAccessPolicyOptionalParams,
  TableGetAccessPolicyResponse,
  TableSetAccessPolicyOptionalParams,
  SignedIdentifier,
  TableSetAccessPolicyResponse
} from "./generated/models";
import { GeneratedClient } from "./generated/generatedClient";

interface Entity {
  PartitionKey: string;
  RowKey: string;
  [propertyName: string]: any;
}

export class TableServiceClient {
  private table: Table;
  private service: Service;

  constructor(url: string, options?: GeneratedClientOptionalParams | undefined) {
    /**
     * Initializes a new instance of the TableServiceClient class.
     * @param url The URL of the service account that is the target of the desired operation.
     * @param options The parameter options.
     */
    const client = new GeneratedClient(url, options);
    this.table = client.table;
    this.service = client.service;

    // TODO: Add the required policies and credential pipelines #9909
  }

  /**
   * Retrieves statistics related to replication for the Table service. It is only available on the
   * secondary location endpoint when read-access geo-redundant replication is enabled for the account.
   * @param options The options parameters.
   */
  getStatistics(
    options?: ServiceGetStatisticsOptionalParams
  ): Promise<ServiceGetStatisticsResponse> {
    return this.service.getStatistics(options);
  }

  /**
   * Gets the properties of an account's Table service, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param options The options parameters.
   */
  getProperties(
    options?: ServiceGetPropertiesOptionalParams
  ): Promise<ServiceGetPropertiesResponse> {
    return this.service.getProperties(options);
  }

  /**
   * Sets properties for an account's Table service endpoint, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param properties The Table Service properties.
   * @param options The options parameters.
   */
  setProperties(
    properties: TableServiceProperties,
    options?: ServiceSetPropertiesOptionalParams
  ): Promise<ServiceSetPropertiesResponse> {
    return this.service.setProperties(properties, options);
  }

  /**
   * Creates a new table under the given account.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  createTable(
    tableName: string,
    options?: TableCreateOptionalParams
  ): Promise<TableCreateResponse> {
    return this.table.create({ tableName }, { ...options, responsePreference: "return-content" });
  }

  /**
   * Operation permanently deletes the specified table.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  deleteTable(
    tableName: string,
    options?: TableDeleteOptionalParams
  ): Promise<TableDeleteResponse> {
    return this.table.delete(tableName, options);
  }

  /**
   * Queries tables under the given account.
   * @param query The OData query parameters.
   * @param options The options parameters.
   */
  listTables(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    query?: QueryOptions,
    options?: Omit<TableQueryOptionalParams, "queryOptions">
  ): Promise<TableQueryOperationResponse> {
    return this.table.query({ queryOptions: query, ...options });
  }

  /**
   * Returns a single entity in a table.
   * @param tableName The name of the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  getEntity(
    tableName: string,
    partitionKey: string,
    rowKey: string,
    options?: TableQueryEntitiesWithPartitionAndRowKeyOptionalParams
  ): Promise<TableQueryEntitiesWithPartitionAndRowKeyResponse> {
    return this.table.queryEntitiesWithPartitionAndRowKey(tableName, partitionKey, rowKey, options);
  }

  /**
   * Queries entities in a table.
   * @param tableName The name of the table.
   * @param query The OData query parameters.
   * @param options The options parameters.
   */
  listEntities(
    tableName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    query?: QueryOptions,
    options?: Omit<TableQueryEntitiesOptionalParams, "queryOptions">
  ): Promise<TableQueryEntitiesResponse> {
    return this.table.queryEntities(tableName, { queryOptions: query, ...options });
  }

  /**
   * Insert entity in a table.
   * @param tableName The name of the table.
   * @param entity The properties for the table entity.
   * @param options The options parameters.
   */
  createEntity(
    tableName: string,
    entity?: Entity,
    options?: Omit<TableInsertEntityOptionalParams, "tableEntityProperties">
  ): Promise<TableInsertEntityResponse> {
    return this.table.insertEntity(tableName, { tableEntityProperties: entity, ...options });
  }

  /**
   * Deletes the specified entity in a table.
   * @param tableName The name of the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param ifMatch Match condition for an entity to be deleted. If specified and a matching entity is
   *                not found, an error will be raised. To force an unconditional delete, set to the wildcard character
   *                (*).
   * @param options The options parameters.
   */
  deleteEntity(
    tableName: string,
    partitionKey: string,
    rowKey: string,
    ifMatch: string,
    options?: TableDeleteEntityOptionalParams
  ): Promise<TableDeleteEntityResponse> {
    return this.table.deleteEntity(tableName, partitionKey, rowKey, ifMatch, options);
  }

  /**
   * Update entity in a table.
   * @param tableName The name of the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param entity The properties for the table entity.
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a replace will be performed if an existing entity is found.
   * @param options The options parameters.
   */

  updateEntity(
    tableName: string,
    entity: Entity,
    ifMatch?: string,
    options?: Omit<TableUpdateEntityOptionalParams, "tableEntityProperties" | "ifMatch">
  ): Promise<TableUpdateEntityResponse> {
    return this.table.updateEntity(tableName, entity.PartitionKey, entity.RowKey, {
      tableEntityProperties: entity,
      ifMatch,
      ...options
    });
  }

  /**
   * Merge entity in a table.
   * @param tableName The name of the table.
   * @param entity The properties for the table entity.
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a merge will be performed if an existing entity is found.
   * @param options The options parameters.
   */
  mergeEntity(
    tableName: string,
    entity: Entity,
    ifMatch?: string,
    options?: Omit<TableMergeEntityOptionalParams, "tableEntityProperties" | "ifMatch">
  ): Promise<TableMergeEntityResponse> {
    return this.table.mergeEntity(tableName, entity.PartitionKey, entity.RowKey, {
      tableEntityProperties: entity,
      ifMatch,
      ...options
    });
  }

  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  getAccessPolicy(
    tableName: string,
    options?: TableGetAccessPolicyOptionalParams
  ): Promise<TableGetAccessPolicyResponse> {
    return this.table.getAccessPolicy(tableName, options);
  }

  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param tableName The name of the table.
   * @param acl The Access Control List for the table.
   * @param options The options parameters.
   */
  setAccessPolicy(
    tableName: string,
    acl?: SignedIdentifier[],
    options?: Omit<TableSetAccessPolicyOptionalParams, "tableAcl">
  ): Promise<TableSetAccessPolicyResponse> {
    return this.table.setAccessPolicy(tableName, { tableAcl: acl, ...options });
  }
}
