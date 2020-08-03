// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient } from "./TableServiceClient";
import {
  Entity,
  ListEntitiesOptions,
  CreateEntityOptions,
  UpdateEntityOptions,
  MergeEntityOptions,
  SetAccessPolicyOptions
} from "./models";
import {
  TableServiceClientOptions,
  QueryOptions,
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
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(
    url: string,
    tableName: string,
    credential: TablesSharedKeyCredential,
    options?: TableServiceClientOptions
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
  constructor(url: string, tableName: string, options?: TableServiceClientOptions);
  constructor(
    url: string,
    tableName: string,
    credentialOrOptions?: TablesSharedKeyCredential | TableServiceClientOptions,
    options?: TableServiceClientOptions
  ) {
    if (credentialOrOptions instanceof TablesSharedKeyCredential) {
      this.client = new TableServiceClient(url, credentialOrOptions, options);
    } else {
      this.client = new TableServiceClient(url, credentialOrOptions);
    }
    this.tableName = tableName;
  }

  /**
   * Returns a single entity in the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  getEntity(
    partitionKey: string,
    rowKey: string,
    options?: GetEntityOptions
  ): Promise<GetEntityResponse> {
    return this.client.getEntity(this.tableName, partitionKey, rowKey, options);
  }

  /**
   * Queries entities in the table.
   * @param query The OData query parameters.
   * @param options The options parameters.
   */
  listEntities(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    query?: QueryOptions,
    options?: ListEntitiesOptions
  ): Promise<ListEntitiesResponse> {
    return this.client.listEntities(this.tableName, query, options);
  }

  /**
   * Insert entity in the table.
   * @param entity The properties for the table entity.
   * @param options The options parameters.
   */
  createEntity(entity?: Entity, options?: CreateEntityOptions): Promise<CreateEntityResponse> {
    return this.client.createEntity(this.tableName, entity, options);
  }

  /**
   * Deletes the specified entity in the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param ifMatch Match condition for an entity to be deleted. If specified and a matching entity is
   *                not found, an error will be raised. To force an unconditional delete, set to the wildcard character
   *                (*).
   * @param options The options parameters.
   */
  deleteEntity(
    partitionKey: string,
    rowKey: string,
    ifMatch: string,
    options?: DeleteEntityOptions
  ): Promise<DeleteEntityResponse> {
    return this.client.deleteEntity(this.tableName, partitionKey, rowKey, ifMatch, options);
  }

  /**
   * Update entity in the table.
   * @param entity The properties of the updated entity.
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a replace will be performed if an existing entity is found.
   * @param options The options parameters.
   */
  updateEntity(
    entity: Entity,
    ifMatch?: string,
    options?: UpdateEntityOptions
  ): Promise<UpdateEntityResponse> {
    return this.client.updateEntity(this.tableName, entity, ifMatch, options);
  }

  /**
   * Merge entity in the table.
   * @param entity The properties of the merged entity
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a merge will be performed if an existing entity is found.
   * @param options The options parameters.
   */
  mergeEntity(
    entity: Entity,
    ifMatch?: string,
    options?: MergeEntityOptions
  ): Promise<MergeEntityResponse> {
    return this.client.mergeEntity(this.tableName, entity, ifMatch, options);
  }

  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param options The options parameters.
   */
  getAccessPolicy(options?: GetAccessPolicyOptions): Promise<GetAccessPolicyResponse> {
    return this.client.getAccessPolicy(this.tableName, options);
  }

  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param acl The Access Control List for the table.
   * @param options The options parameters.
   */
  setAccessPolicy(
    acl?: SignedIdentifier[],
    options?: SetAccessPolicyOptions
  ): Promise<SetAccessPolicyResponse> {
    return this.client.setAccessPolicy(this.tableName, acl, options);
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
    options?: TableServiceClientOptions
  ): TableClient {
    const { url, options: clientOptions } = getClientParamsFromConnectionString(
      connectionString,
      options
    );
    return new TableClient(url, tableName, clientOptions);
  }
}
