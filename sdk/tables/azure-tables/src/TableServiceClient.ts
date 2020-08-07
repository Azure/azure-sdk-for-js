// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GeneratedClient } from "./generated/generatedClient";
import { Service } from "./generated/operations";
import { Table } from "./generated/operations";
import {
  Entity,
  ListTablesOptions,
  ListEntitiesOptions,
  CreateEntityOptions,
  UpdateEntityOptions,
  MergeEntityOptions,
  SetAccessPolicyOptions
} from "./models";
import {
  TableServiceClientOptions,
  GetStatisticsOptions,
  GetStatisticsResponse,
  GetPropertiesOptions,
  GetPropertiesResponse,
  SetPropertiesOptions,
  ServiceProperties,
  SetPropertiesResponse,
  CreateTableOptions,
  CreateTableResponse,
  DeleteTableOptions,
  DeleteTableResponse,
  QueryOptions,
  ListTablesResponse,
  GetEntityOptions,
  GetEntityResponse,
  ListEntitiesResponse,
  CreateEntityResponse,
  DeleteEntityOptions,
  DeleteEntityResponse,
  UpdateEntityResponse,
  MergeEntityResponse,
  GetAccessPolicyOptions,
  GetAccessPolicyResponse,
  SignedIdentifier,
  SetAccessPolicyResponse
} from "./generatedModels";
import { getClientParamsFromConnectionString } from "./utils/connectionString";
import { TablesSharedKeyCredential } from "./TablesSharedKeyCredential";

/**
 * A TableServiceClient represents a Client to the Azure Tables service allowing you
 * to perform operations on the tables and the entities.
 */
export class TableServiceClient {
  private table: Table;
  private service: Service;

  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param {string} url The URL of the service account that is the target of the desired operation., such as
   *                     "https://myaccount.table.core.windows.net". You can append a SAS,
   *                     such as "https://myaccount.table.core.windows.net?sasString".
   * @param {TablesSharedKeyCredential} credential  TablesSharedKeyCredential used to authenticate requests. Only Supported for Browsers
   * @param {TableServiceClientOptions} options Optional. Options to configure the HTTP pipeline.
   *
   * Example using an account name/key:
   *
   * ```js
   * const account = "<storage account name>"
   * const sharedKeyCredential = new TablesSharedKeyCredential(account, "<account key>");
   *
   * const tableServiceClient = new TableServiceClient(
   *   `https://${account}.table.core.windows.net`,
   *   sharedKeyCredential
   * );
   * ```
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(
    url: string,
    credential: TablesSharedKeyCredential,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableServiceClientOptions
  );
  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param {string} url The URL of the service account that is the target of the desired operation., such as
   *                     "https://myaccount.table.core.windows.net". You can append a SAS,
   *                     such as "https://myaccount.table.core.windows.net?sasString".
   * @param {TableServiceClientOptions} options Optional. Options to configure the HTTP pipeline.
   * Example appending a SAS token:
   *
   * ```js
   * const account = "<storage account name>";
   * const sasToken = "<SAS token>";
   *
   * const tableServiceClient = new TableServiceClient(
   *   `https://${account}.table.core.windows.net?${sasToken}`,
   * );
   * ```
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(url: string, options?: TableServiceClientOptions);
  constructor(
    url: string,
    credentialOrOptions?: TablesSharedKeyCredential | TableServiceClientOptions,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableServiceClientOptions
  ) {
    const credential =
      credentialOrOptions instanceof TablesSharedKeyCredential ? credentialOrOptions : undefined;
    const clientOptions =
      (!(credentialOrOptions instanceof TablesSharedKeyCredential)
        ? credentialOrOptions
        : options) || {};

    if (credential) {
      clientOptions.requestPolicyFactories = (defaultFactories) => [
        ...defaultFactories,
        credential
      ];
    }

    const client = new GeneratedClient(url, clientOptions);
    this.table = client.table;
    this.service = client.service;

    // TODO: Add the required policies and credential pipelines #9909
  }

  /**
   * Retrieves statistics related to replication for the Table service. It is only available on the
   * secondary location endpoint when read-access geo-redundant replication is enabled for the account.
   * @param options The options parameters.
   */
  getStatistics(options?: GetStatisticsOptions): Promise<GetStatisticsResponse> {
    return this.service.getStatistics(options);
  }

  /**
   * Gets the properties of an account's Table service, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param options The options parameters.
   */
  getProperties(options?: GetPropertiesOptions): Promise<GetPropertiesResponse> {
    return this.service.getProperties(options);
  }

  /**
   * Sets properties for an account's Table service endpoint, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param properties The Table Service properties.
   * @param options The options parameters.
   */
  setProperties(
    properties: ServiceProperties,
    options?: SetPropertiesOptions
  ): Promise<SetPropertiesResponse> {
    return this.service.setProperties(properties, options);
  }

  /**
   * Creates a new table under the given account.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  createTable(tableName: string, options?: CreateTableOptions): Promise<CreateTableResponse> {
    return this.table.create({ tableName }, { ...options, responsePreference: "return-content" });
  }

  /**
   * Operation permanently deletes the specified table.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  deleteTable(tableName: string, options?: DeleteTableOptions): Promise<DeleteTableResponse> {
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
    options?: ListTablesOptions
  ): Promise<ListTablesResponse> {
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
    options?: GetEntityOptions
  ): Promise<GetEntityResponse> {
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
    options?: ListEntitiesOptions
  ): Promise<ListEntitiesResponse> {
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
    options?: CreateEntityOptions
  ): Promise<CreateEntityResponse> {
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
    options?: DeleteEntityOptions
  ): Promise<DeleteEntityResponse> {
    return this.table.deleteEntity(tableName, partitionKey, rowKey, ifMatch, options);
  }

  /**
   * Update entity in a table.
   * @param tableName The name of the table.
   * @param entity The properties of the updated entity.
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a replace will be performed if an existing entity is found.
   * @param options The options parameters.
   */
  updateEntity(
    tableName: string,
    entity: Entity,
    ifMatch?: string,
    options?: UpdateEntityOptions
  ): Promise<UpdateEntityResponse> {
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
    options?: MergeEntityOptions
  ): Promise<MergeEntityResponse> {
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
    options?: GetAccessPolicyOptions
  ): Promise<GetAccessPolicyResponse> {
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
    options?: SetAccessPolicyOptions
  ): Promise<SetAccessPolicyResponse> {
    return this.table.setAccessPolicy(tableName, { tableAcl: acl, ...options });
  }

  /**
   *
   * Creates an instance of TableServiceClient from connection string.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.table.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {TableServiceClientOptions} [options] Options to configure the HTTP pipeline.
   * @returns {TableServiceClient} A new TableServiceClient from the given connection string.
   */
  public static fromConnectionString(
    connectionString: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableServiceClientOptions
  ): TableServiceClient {
    const { url, options: clientOptions } = getClientParamsFromConnectionString(
      connectionString,
      options
    );
    return new TableServiceClient(url, clientOptions);
  }
}
