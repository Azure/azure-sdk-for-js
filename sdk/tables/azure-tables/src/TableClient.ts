// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient } from "./TableServiceClient";
import { Entity } from "./models";
import {
  TableServiceClientOptions,
  QueryOptions,
  GetEntityOptions,
  GetEntityResponse,
  ListEntitiesOptions,
  ListEntitiesResponse,
  CreateEntityOptions,
  CreateEntityResponse,
  DeleteEntityOptions,
  DeleteEntityResponse,
  UpdateEntityOptions,
  UpdateEntityResponse,
  MergeEntityOptions,
  MergeEntityResponse,
  GetAccessPolicyOptions,
  GetAccessPolicyResponse,
  SetAccessPolicyOptions,
  SignedIdentifier,
  SetAccessPolicyResponse
} from "./generatedModels";

/**
 * A TableClient represents a Client to the Azure Tables service allowing you
 * to perform operations on a single table.
 */
export class TableClient {
  private client: TableServiceClient;
  private tableName: string;

  /**
   * Initializes a new instance of the TableClient class.
   * @param url The URL of the service account that is the target of the desired operation.
   * @param tableName The name of the table
   * @param options The parameter options.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(url: string, tableName: string, options?: TableServiceClientOptions) {
    this.client = new TableServiceClient(url, options);
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
    options?: Omit<ListEntitiesOptions, "queryOptions">
  ): Promise<ListEntitiesResponse> {
    return this.client.listEntities(this.tableName, query, options);
  }

  /**
   * Insert entity in the table.
   * @param entity The properties for the table entity.
   * @param options The options parameters.
   */
  createEntity(
    entity?: Entity,
    options?: Omit<CreateEntityOptions, "tableEntityProperties">
  ): Promise<CreateEntityResponse> {
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
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param entity The properties for the table entity.
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a replace will be performed if an existing entity is found.
   * @param options The options parameters.
   */

  updateEntity(
    entity: Entity,
    ifMatch?: string,
    options?: Omit<UpdateEntityOptions, "tableEntityProperties" | "ifMatch">
  ): Promise<UpdateEntityResponse> {
    return this.client.updateEntity(this.tableName, entity, ifMatch, options);
  }

  /**
   * Merge entity in the table.
   * @param entity The properties for the table entity.
   * @param ifMatch Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a merge will be performed if an existing entity is found.
   * @param options The options parameters.
   */
  mergeEntity(
    entity: Entity,
    ifMatch?: string,
    options?: Omit<MergeEntityOptions, "tableEntityProperties" | "ifMatch">
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
    options?: Omit<SetAccessPolicyOptions, "tableAcl">
  ): Promise<SetAccessPolicyResponse> {
    return this.client.setAccessPolicy(this.tableName, acl, options);
  }
}
