// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CreateTableEntityResponse,
  DeleteTableEntityOptions,
  GetTableEntityOptions,
  GetTableEntityResponse,
  ListTableEntitiesOptions,
  TableEntity,
  TableEntityResult,
  TableItem,
  TableServiceClientOptions,
  TableTransactionResponse,
  TransactionAction,
  UpdateMode,
  UpdateTableEntityOptions,
} from "../models";
import { DeleteTableEntityResponse, UpdateEntityResponse, UpsertEntityResponse } from "..";
import { Pipeline, PipelineRequest } from "@azure/core-rest-pipeline";
import { NamedKeyCredential } from "@azure/core-auth";
import { OperationOptions } from "@azure/core-client";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export interface ConnectionString {
  kind: "AccountConnString" | "SASConnString";
  url: string;
  accountName: string;
  accountKey?: any;
  accountSas?: string;
}

/**
 * Contains response data for the listTable operation.
 */
export type ListTableItemsResponse = Array<TableItem> & {
  /**
   * This header contains the continuation token value.
   */
  nextTableName?: string;
};

/**
 * Contains response data for the getEntity operation.
 */
export type ListEntitiesResponse<T extends object> = Array<TableEntityResult<T>> & {
  /**
   * Contains the continuation token value for the next page.
   */
  continuationToken?: string;
};

export interface ClientParamsFromConnectionString {
  url: string;
  options?: TableServiceClientOptions;
  credential?: NamedKeyCredential;
}

/**
 * Transaction request builder
 */
export interface InnerTransactionRequest {
  /**
   * Transaction request body
   */
  body: string[];
  /**
   * Creates a pipeline to intercept sub-requests and
   * build the request body
   */
  createPipeline(): Pipeline;
  /**
   * Adds an operation to add to the transaction body
   * @param request - The operation to add
   */
  appendSubRequestToBody(request: PipelineRequest): void;
  /**
   * Gets the transaction request body
   */
  getHttpRequestBody(): string;
}

export interface InternalTransactionClientOptions extends TableServiceClientOptions {
  innerTransactionRequest: InnerTransactionRequest;
}

/**
 * Describes the shape of a TableClient
 */
export interface TableClientLike {
  /**
   * Represents a pipeline for making a HTTP request to a URL.
   */
  pipeline: Pipeline;
  /**
   * Name of the table to perform operations on.
   */
  readonly tableName: string;
  /**
   *  Creates the current table.
   * @param options - The options parameters.
   */
  createTable(options?: OperationOptions): Promise<void>;
  /**
   * Submits a Transaction which is composed of a set of actions.
   * @param actions - tuple that contains the action to perform, and the entity to perform the action with
   */
  submitTransaction(actions: TransactionAction[]): Promise<TableTransactionResponse>;
  /**
   * Insert entity in the table.
   * @param entity - The properties for the table entity.
   * @param options - The options parameters.
   */
  createEntity<T extends object>(
    entity: TableEntity<T>,
    options?: OperationOptions
  ): Promise<CreateTableEntityResponse>;
  /**
   * Permanently deletes the current table with all of its entities.
   * @param options - The options parameters.
   */
  deleteTable(options?: OperationOptions): Promise<void>;
  /**
   * Permanently deletes the current table if it exists in the account.
   * @param options - The options parameters.
   */
  deleteEntity(
    partitionKey: string,
    rowKey: string,
    options?: DeleteTableEntityOptions
  ): Promise<DeleteTableEntityResponse>;
  /**
   * Returns a single entity in the table.
   * @param partitionKey - The partition key of the entity.
   * @param rowKey - The row key of the entity.
   * @param options - The options parameters.
   */
  getEntity<T extends object>(
    partitionKey: string,
    rowKey: string,
    options?: GetTableEntityOptions
  ): Promise<GetTableEntityResponse<T>>;
  /**
   * Queries entities in a table.
   * @param tableName - The name of the table.
   * @param options - The options parameters.
   */
  listEntities<T extends object>(
    options?: ListTableEntitiesOptions
  ): PagedAsyncIterableIterator<T, ListEntitiesResponse<T>>;
  /**
   * Update an entity in the table.
   * @param entity - The properties of the entity to be updated.
   * @param mode - The different modes for updating the entity:
   *               - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
   *               - Replace: Updates an existing entity by replacing the entire entity.
   * @param options - The options parameters.
   */
  updateEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode,
    options?: UpdateTableEntityOptions
  ): Promise<UpdateEntityResponse>;
  /**
   * Upsert an entity in the table.
   * @param tableName - The name of the table.
   * @param entity - The properties for the table entity.
   * @param mode - The different modes for updating the entity:
   *               - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
   *               - Replace: Updates an existing entity by replacing the entire entity.
   * @param options - The options parameters.
   */
  upsertEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode,
    options?: OperationOptions
  ): Promise<UpsertEntityResponse>;
}
