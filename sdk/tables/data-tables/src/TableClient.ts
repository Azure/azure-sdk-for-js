// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient } from "./TableServiceClient";
import {
  TableEntity,
  ListTableEntitiesOptions,
  GetTableEntityResponse,
  ListEntitiesResponse,
  CreateTableEntityOptions,
  UpdateTableEntityOptions,
  UpsertTableEntityOptions,
  DeleteTableEntityOptions,
  GetTableEntityOptions,
  UpdateMode,
  CreateTableEntityResponse
} from "./models";
import {
  TableServiceClientOptions as TableClientOptions,
  DeleteTableOptions,
  DeleteTableResponse,
  UpdateEntityResponse,
  UpsertEntityResponse,
  GetAccessPolicyOptions,
  GetAccessPolicyResponse,
  SetAccessPolicyResponse,
  SetAccessPolicyOptions,
  DeleteTableEntityResponse
} from "./generatedModels";
import { getClientParamsFromConnectionString } from "./utils/connectionString";
import { TablesSharedKeyCredential } from "./TablesSharedKeyCredential";

/**
 * A TableClient represents a Client to the Azure Tables service allowing you
 * to perform operations on a single table.
 */
export class TableClient {
  private client: TableServiceClient;
  /**
   * Name of the table to perform operations on.
   */
  public readonly tableName: string;

  /**
   * Creates a new instance of the TableClient class.
   *
   * @param {string} url The URL of the service account that is the target of the desired operation., such as
   *                     "https://myaccount.table.core.windows.net".
   * @param {string} tableName the name of the table
   * @param {TablesSharedKeyCredential} credential  TablesSharedKeyCredential used to authenticate requests. Only Supported for Browsers
   * @param {TableServiceClientOptions} options Optional. Options to configure the HTTP pipeline.
   *
   * Example using an account name/key:
   *
   * ```js
   * const account = "<storage account name>";
   * const tableName = "<table name>";
   * const sharedKeyCredential = new TablesSharedKeyCredential(account, "<account key>");
   *
   * const tableServiceClient = new TableServiceClient(
   *   `https://${account}.table.core.windows.net`,
   *   `${tableName}`
   *   sharedKeyCredential
   * );
   * ```
   */
  constructor(
    url: string,
    tableName: string,
    credential: TablesSharedKeyCredential,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableClientOptions
  );
  /**
   * Creates an instance of TableClient.
   *
   * @param {string} url A Client string pointing to Azure Storage table service, such as
   *                     "https://myaccount.table.core.windows.net". You can append a SAS,
   *                      such as "https://myaccount.table.core.windows.net?sasString".
   * @param {string} tableName the name of the table
   * @param {TableServiceClientOptions} options Optional. Options to configure the HTTP pipeline.
   *
   * Example appending a SAS token:
   *
   * ```js
   * const account = "<storage account name>";
   * const sasToken = "<SAS token>";
   * const tableName = "<table name>";
   *
   * const tableServiceClient = new TableServiceClient(
   *   `https://${account}.table.core.windows.net?${sasToken}`,
   *   `${tableName}`
   * );
   * ```
   */

  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(url: string, tableName: string, options?: TableClientOptions);
  constructor(
    url: string,
    tableName: string,
    credentialOrOptions?: TablesSharedKeyCredential | TableClientOptions,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableClientOptions
  ) {
    if (credentialOrOptions instanceof TablesSharedKeyCredential) {
      this.client = new TableServiceClient(url, credentialOrOptions, options);
    } else {
      this.client = new TableServiceClient(url, credentialOrOptions);
    }
    this.tableName = tableName;
  }

  /**
   * Permanently deletes the current table with all of its entities.
   * @param options The options parameters.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  delete(options?: DeleteTableOptions): Promise<DeleteTableResponse> {
    return this.client.deleteTable(this.tableName, options);
  }

  /**
   * Returns a single entity in the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  public getEntity<T extends object>(
    partitionKey: string,
    rowKey: string,
    options?: GetTableEntityOptions
  ): Promise<GetTableEntityResponse<T>> {
    return this.client.getEntity<T>(this.tableName, partitionKey, rowKey, options);
  }

  /**
   * Queries entities in the table.
   * @param query The OData query parameters.
   * @param options The options parameters.
   */
  public listEntities<T extends object>(
    options?: ListTableEntitiesOptions
  ): Promise<ListEntitiesResponse<T>> {
    return this.client.listEntities<T>(this.tableName, options);
  }

  /**
   * Insert entity in the table.
   * @param entity The properties for the table entity.
   * @param options The options parameters.
   */
  public createEntity<T extends object>(
    entity: TableEntity<T>,
    options?: CreateTableEntityOptions
  ): Promise<CreateTableEntityResponse> {
    return this.client.createEntity(this.tableName, entity, options);
  }

  /**
   * Deletes the specified entity in the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  public deleteEntity(
    partitionKey: string,
    rowKey: string,
    options?: DeleteTableEntityOptions
  ): Promise<DeleteTableEntityResponse> {
    return this.client.deleteEntity(this.tableName, partitionKey, rowKey, options);
  }

  /**
   * Update an entity in the table.
   * @param entity The properties of the entity to be updated.
   * @param mode The different modes for updating the entity:
   *             - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
   *             - Replace: Updates an existing entity by replacing the entire entity.
   * @param options The options parameters.
   */
  public updateEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode,
    options?: UpdateTableEntityOptions
  ): Promise<UpdateEntityResponse> {
    return this.client.updateEntity(this.tableName, entity, mode, options);
  }

  /**
   * Upsert an entity in the table.
   * @param tableName The name of the table.
   * @param entity The properties for the table entity.
   * @param mode The different modes for updating the entity:
   *             - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
   *             - Replace: Updates an existing entity by replacing the entire entity.
   * @param options The options parameters.
   */
  public upsertEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode,
    options?: UpsertTableEntityOptions
  ): Promise<UpsertEntityResponse> {
    return this.client.upsertEntity(this.tableName, entity, mode, options);
  }

  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param options The options parameters.
   */
  public getAccessPolicy(options?: GetAccessPolicyOptions): Promise<GetAccessPolicyResponse> {
    return this.client.getAccessPolicy(this.tableName, options);
  }

  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param acl The Access Control List for the table.
   * @param options The options parameters.
   */
  public setAccessPolicy(options?: SetAccessPolicyOptions): Promise<SetAccessPolicyResponse> {
    return this.client.setAccessPolicy(this.tableName, options);
  }

  /**
   *
   * Creates an instance of TableClient from connection string.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.table.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {TableServiceClientOptions} [options] Options to configure the HTTP pipeline.
   * @returns {TableClient} A new TableClient from the given connection string.
   */
  public static fromConnectionString(
    connectionString: string,
    tableName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableClientOptions
  ): TableClient {
    const { url, options: clientOptions } = getClientParamsFromConnectionString(
      connectionString,
      options
    );
    return new TableClient(url, tableName, clientOptions);
  }
}
