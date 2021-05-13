// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TableEntity,
  ListTableEntitiesOptions,
  GetTableEntityResponse,
  UpdateTableEntityOptions,
  DeleteTableEntityOptions,
  GetTableEntityOptions,
  UpdateMode,
  CreateTableEntityResponse,
  TableEntityQueryOptions,
  TableServiceClientOptions as TableClientOptions,
  TableEntityResult,
  TransactionAction,
  TableTransactionResponse
} from "./models";
import {
  UpdateEntityResponse,
  UpsertEntityResponse,
  DeleteTableEntityResponse,
  GetAccessPolicyResponse,
  SetAccessPolicyResponse
} from "./generatedModels";
import {
  GeneratedClientOptionalParams,
  QueryOptions as GeneratedQueryOptions,
  SignedIdentifier
} from "./generated/models";
import { getClientParamsFromConnectionString } from "./utils/connectionString";
import {
  TablesSharedKeyCredential,
  TablesSharedKeyCredentialLike
} from "./TablesSharedKeyCredential";
import { tablesSharedKeyCredentialPolicy } from "./TablesSharedKeyCredentialPolicy";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { GeneratedClient, TableDeleteEntityOptionalParams } from "./generated";
import { deserialize, deserializeObjectsArray, serialize } from "./serialization";
import { Table } from "./generated/operations";
import { LIB_INFO, TablesLoggingAllowedHeaderNames } from "./utils/constants";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";
import { logger } from "./logger";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { InternalTableTransaction, createInnerTransactionRequest } from "./TableTransaction";
import {
  InternalTransactionClientOptions,
  ListEntitiesResponse,
  TableClientLike
} from "./utils/internalModels";
import { Uuid } from "./utils/uuid";
import { parseXML, stringifyXML } from "@azure/core-xml";

/**
 * A TableClient represents a Client to the Azure Tables service allowing you
 * to perform operations on a single table.
 */
export class TableClient {
  /**
   * Table Account URL
   */
  public url: string;
  private table: Table;
  private credential: TablesSharedKeyCredentialLike | undefined;
  private interceptClient: TableClientLike | undefined;

  /**
   * Name of the table to perform operations on.
   */
  public readonly tableName: string;

  /**
   * Creates a new instance of the TableClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation., such as
   *                     "https://myaccount.table.core.windows.net".
   * @param tableName - the name of the table
   * @param credential - TablesSharedKeyCredential used to authenticate requests. Only Supported for Browsers
   * @param options - Optional. Options to configure the HTTP pipeline.
   *
   * Example using an account name/key:
   *
   * ```js
   * const account = "<storage account name>";
   * const tableName = "<table name>";
   * const sharedKeyCredential = new TablesSharedKeyCredential(account, "<account key>");
   *
   * const client = new TableClient(
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
    options?: TableClientOptions
  );
  /**
   * Creates an instance of TableClient.
   *
   * @param url - A Client string pointing to Azure Storage table service, such as
   *              "https://myaccount.table.core.windows.net". You can append a SAS,
   *              such as "https://myaccount.table.core.windows.net?sasString".
   * @param tableName - the name of the table
   * @param options - Options to configure the HTTP pipeline.
   *
   * Example appending a SAS token:
   *
   * ```js
   * const account = "<storage account name>";
   * const sasToken = "<SAS token>";
   * const tableName = "<table name>";
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net?${sasToken}`,
   *   `${tableName}`
   * );
   * ```
   */

  constructor(url: string, tableName: string, options?: TableClientOptions);
  constructor(
    url: string,
    tableName: string,
    credentialOrOptions?: TablesSharedKeyCredential | TableClientOptions,
    options: TableClientOptions = {}
  ) {
    this.url = url;
    const credential =
      credentialOrOptions instanceof TablesSharedKeyCredential ? credentialOrOptions : undefined;
    const clientOptions =
      (!(credentialOrOptions instanceof TablesSharedKeyCredential)
        ? credentialOrOptions
        : options) || {};

    clientOptions.endpoint = clientOptions.endpoint || url;
    if (!clientOptions.userAgentOptions) {
      clientOptions.userAgentOptions = {};
    }

    if (clientOptions.userAgentOptions.userAgentPrefix) {
      clientOptions.userAgentOptions.userAgentPrefix = `${clientOptions.userAgentOptions.userAgentPrefix} ${LIB_INFO}`;
    } else {
      clientOptions.userAgentOptions.userAgentPrefix = LIB_INFO;
    }

    let internalPipelineOptions: GeneratedClientOptionalParams = {
      ...clientOptions
    };

    if (isInternalClientOptions(clientOptions)) {
      // The client is meant to be an intercept client (for Transaction), so we need to create only the intercepting
      // pipelines.
      internalPipelineOptions.pipeline = clientOptions.innerTransactionRequest.createPipeline();
    } else {
      // The client is a regular client (non-transaction), pass the pipeline options to create a pipeline
      internalPipelineOptions = {
        ...internalPipelineOptions,
        ...{
          loggingOptions: {
            logger: logger.info,
            additionalAllowedHeaderNames: [...TablesLoggingAllowedHeaderNames]
          },
          deserializationOptions: {
            parseXML
          },
          serializationOptions: {
            stringifyXML
          }
        }
      };
    }

    this.tableName = tableName;
    this.credential = credential;
    const generatedClient = new GeneratedClient(url, internalPipelineOptions);
    if (credential) {
      generatedClient.pipeline.addPolicy(tablesSharedKeyCredentialPolicy(credential));
    }
    this.table = generatedClient.table;
  }

  /**
   * Permanently deletes the current table with all of its entities.
   * @param options - The options parameters.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public async deleteTable(options: OperationOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("TableClient-deleteTable", options);
    try {
      await this.table.delete(this.tableName, updatedOptions);
    } catch (e) {
      if (e.statusCode === 404) {
        logger.info("TableClient-deleteTable: Table doesn't exist");
      } else {
        span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
        throw e;
      }
    } finally {
      span.end();
    }
  }

  /**
   *  Creates a table with the tableName passed to the client constructor
   * @param options - The options parameters.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public async createTable(options: OperationOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("TableClient-createTable", options);
    try {
      await this.table.create({ name: this.tableName }, updatedOptions);
    } catch (e) {
      if (e.statusCode === 409) {
        logger.info("TableClient-createTable: Table Already Exists");
      } else {
        span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
        throw e;
      }
    } finally {
      span.end();
    }
  }

  /**
   * Returns a single entity in the table.
   * @param partitionKey - The partition key of the entity.
   * @param rowKey - The row key of the entity.
   * @param options - The options parameters.
   */
  public async getEntity<T extends object = Record<string, unknown>>(
    partitionKey: string,
    rowKey: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: GetTableEntityOptions = {}
  ): Promise<GetTableEntityResponse<TableEntityResult<T>>> {
    const { span, updatedOptions } = createSpan("TableClient-getEntity", options);

    let parsedBody: any;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      parsedBody = rawResponse.parsedBody;
      if (updatedOptions.onResponse) {
        updatedOptions.onResponse(rawResponse, flatResponse);
      }
    }

    try {
      const { disableTypeConversion, queryOptions, ...getEntityOptions } = updatedOptions || {};
      await this.table.queryEntitiesWithPartitionAndRowKey(this.tableName, partitionKey, rowKey, {
        ...getEntityOptions,
        queryOptions: this.convertQueryOptions(queryOptions || {}),
        onResponse
      });
      const tableEntity = deserialize<TableEntityResult<T>>(
        parsedBody,
        disableTypeConversion ?? false
      );

      return tableEntity;
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Queries entities in a table.
   * @param options - The options parameters.
   */
  public listEntities<T extends object = Record<string, unknown>>(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: ListTableEntitiesOptions = {}
  ): PagedAsyncIterableIterator<TableEntityResult<T>, TableEntityResult<T>[]> {
    const tableName = this.tableName;
    const iter = this.listEntitiesAll<T>(tableName, options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings) => {
        const pageOptions: InternalListTableEntitiesOptions = {
          ...options,
          queryOptions: { ...options.queryOptions, top: settings?.maxPageSize }
        };
        return this.listEntitiesPage(tableName, pageOptions);
      }
    };
  }

  private async *listEntitiesAll<T extends object>(
    tableName: string,
    options?: InternalListTableEntitiesOptions
  ): AsyncIterableIterator<TableEntityResult<T>> {
    const firstPage = await this._listEntities<T>(tableName, options);
    const { nextPartitionKey, nextRowKey } = firstPage;
    yield* firstPage;
    if (nextRowKey && nextPartitionKey) {
      const optionsWithContinuation: InternalListTableEntitiesOptions = {
        ...options,
        nextPartitionKey,
        nextRowKey
      };
      for await (const page of this.listEntitiesPage<T>(tableName, optionsWithContinuation)) {
        yield* page;
      }
    }
  }

  private async *listEntitiesPage<T extends object>(
    tableName: string,
    options: InternalListTableEntitiesOptions = {}
  ): AsyncIterableIterator<ListEntitiesResponse<TableEntityResult<T>>> {
    const { span, updatedOptions } = createSpan("TableClient-listEntitiesPage", options);

    try {
      let result = await this._listEntities<T>(tableName, updatedOptions);

      yield result;

      while (result.nextPartitionKey && result.nextRowKey) {
        const optionsWithContinuation: InternalListTableEntitiesOptions = {
          ...updatedOptions,
          nextPartitionKey: result.nextPartitionKey,
          nextRowKey: result.nextRowKey
        };
        result = await this._listEntities(tableName, optionsWithContinuation);

        yield result;
      }
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async _listEntities<T extends object>(
    tableName: string,
    options: InternalListTableEntitiesOptions = {}
  ): Promise<ListEntitiesResponse<TableEntityResult<T>>> {
    const { disableTypeConversion = false } = options;
    const queryOptions = this.convertQueryOptions(options.queryOptions || {});
    const {
      xMsContinuationNextPartitionKey: nextPartitionKey,
      xMsContinuationNextRowKey: nextRowKey,
      value
    } = await this.table.queryEntities(tableName, {
      ...options,
      queryOptions
    });

    const tableEntities = deserializeObjectsArray<TableEntityResult<T>>(
      value ?? [],
      disableTypeConversion
    );

    return Object.assign([...tableEntities], {
      nextPartitionKey,
      nextRowKey
    });
  }

  /**
   * Insert entity in the table.
   * @param entity - The properties for the table entity.
   * @param options - The options parameters.
   */
  public async createEntity<T extends object>(
    entity: TableEntity<T>,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: OperationOptions = {}
  ): Promise<CreateTableEntityResponse> {
    const { span, updatedOptions } = createSpan("TableClient-createEntity", options);

    try {
      const { ...createTableEntity } = updatedOptions || {};
      return await this.table.insertEntity(this.tableName, {
        ...createTableEntity,
        tableEntityProperties: serialize(entity),
        responsePreference: "return-no-content"
      });
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes the specified entity in the table.
   * @param partitionKey - The partition key of the entity.
   * @param rowKey - The row key of the entity.
   * @param options - The options parameters.
   */
  public async deleteEntity(
    partitionKey: string,
    rowKey: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: DeleteTableEntityOptions = {}
  ): Promise<DeleteTableEntityResponse> {
    const { span, updatedOptions } = createSpan("TableClient-deleteEntity", options);

    try {
      const { etag = "*", ...rest } = updatedOptions || {};
      const deleteOptions: TableDeleteEntityOptionalParams = {
        ...rest
      };
      return await this.table.deleteEntity(
        this.tableName,
        partitionKey,
        rowKey,
        etag,
        deleteOptions
      );
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Update an entity in the table.
   * @param entity - The properties of the entity to be updated.
   * @param mode - The different modes for updating the entity:
   *               - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
   *               - Replace: Updates an existing entity by replacing the entire entity.
   * @param options - The options parameters.
   */
  public async updateEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode = "Merge",
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: UpdateTableEntityOptions = {}
  ): Promise<UpdateEntityResponse> {
    const { span, updatedOptions } = createSpan(`TableClient-updateEntity-${mode}`, options);

    try {
      if (!entity.partitionKey || !entity.rowKey) {
        throw new Error("partitionKey and rowKey must be defined");
      }

      const { etag = "*", ...updateEntityOptions } = updatedOptions || {};
      if (mode === "Merge") {
        return this.table.mergeEntity(this.tableName, entity.partitionKey, entity.rowKey, {
          tableEntityProperties: serialize(entity),
          ifMatch: etag,
          ...updateEntityOptions
        });
      }
      if (mode === "Replace") {
        return await this.table.updateEntity(this.tableName, entity.partitionKey, entity.rowKey, {
          tableEntityProperties: serialize(entity),
          ifMatch: etag,
          ...updateEntityOptions
        });
      }

      throw new Error(`Unexpected value for update mode: ${mode}`);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Upsert an entity in the table.
   * @param entity - The properties for the table entity.
   * @param mode - The different modes for updating the entity:
   *               - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
   *               - Replace: Updates an existing entity by replacing the entire entity.
   * @param options - The options parameters.
   */
  public async upsertEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode = "Merge",
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: OperationOptions = {}
  ): Promise<UpsertEntityResponse> {
    const { span, updatedOptions } = createSpan(`TableClient-upsertEntity-${mode}`, options);

    try {
      if (!entity.partitionKey || !entity.rowKey) {
        throw new Error("partitionKey and rowKey must be defined");
      }

      if (mode === "Merge") {
        return await this.table.mergeEntity(this.tableName, entity.partitionKey, entity.rowKey, {
          tableEntityProperties: serialize(entity),
          ...updatedOptions
        });
      }

      if (mode === "Replace") {
        return await this.table.updateEntity(this.tableName, entity.partitionKey, entity.rowKey, {
          tableEntityProperties: serialize(entity),
          ...updatedOptions
        });
      }
      throw new Error(`Unexpected value for update mode: ${mode}`);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param options - The options parameters.
   */
  public getAccessPolicy(options: OperationOptions = {}): Promise<GetAccessPolicyResponse> {
    const { span, updatedOptions } = createSpan("TableClient-getAccessPolicy", options);
    try {
      return this.table.getAccessPolicy(this.tableName, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param tableAcl - The Access Control List for the table.
   * @param options - The options parameters.
   */
  public setAccessPolicy(
    tableAcl: SignedIdentifier[],
    options: OperationOptions = {}
  ): Promise<SetAccessPolicyResponse> {
    const { span, updatedOptions } = createSpan("TableClient-setAccessPolicy", options);
    try {
      return this.table.setAccessPolicy(this.tableName, { ...updatedOptions, tableAcl });
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Submits a Transaction which is composed of a set of actions. You can provide the actions as a list
   * or you can use {@link TableTransaction} to help building the transaction.
   *
   * Example usage:
   * ```js
   * const client = TableClient.fromConnectionString(connectionString, tableName);
   * const actions: TransactionAction[] = [
   *    ["create", \{partitionKey: "p1", rowKey: "1", data: "test1"\}]
   *    ["delete", \{partitionKey: "p1", rowKey: "2"\}],
   *    ["update", \{partitionKey: "p1", rowKey: "3", data: "newTest"\}, "Merge"]
   * ]
   * const result = await client.submitTransaction(actions);
   * ```
   *
   * Example usage with TableTransaction:
   * ```js
   * const client = TableClient.fromConnectionString(connectionString, tableName);
   * const transaction = new TableTransaction();
   * // Call the available action in the TableTransaction object
   * transaction.create(\{partitionKey: "p1", rowKey: "1", data: "test1"\});
   * transaction.delete("p1", "2");
   * transaction.update(\{partitionKey: "p1", rowKey: "3", data: "newTest"\}, "Merge")
   * // submitTransaction with the actions list on the transaction.
   * const result = await client.submitTransaction(transaction.actions);
   * ```
   *
   * @param actions - tuple that contains the action to perform, and the entity to perform the action with
   */
  public async submitTransaction(actions: TransactionAction[]): Promise<TableTransactionResponse> {
    const partitionKey = actions[0][1].partitionKey;
    const transactionId = Uuid.generateUuid();
    const changesetId = Uuid.generateUuid();
    const innerTransactionRequest = createInnerTransactionRequest(transactionId, changesetId);
    const internalClientOptions: InternalTransactionClientOptions = {
      innerTransactionRequest: innerTransactionRequest
    };

    if (!this.interceptClient) {
      // Cache intercept client so we just have to instantiate it once
      this.interceptClient = new TableClient(this.url, this.tableName, internalClientOptions);
    }

    const transactionClient = new InternalTableTransaction(
      this.url,
      partitionKey,
      this.interceptClient,
      transactionId,
      innerTransactionRequest,
      this.credential
    );

    for (const item of actions) {
      const [action, entity, updateMode = "Merge"] = item;
      switch (action) {
        case "create":
          transactionClient.createEntity(entity);
          break;
        case "delete":
          transactionClient.deleteEntity(entity.partitionKey, entity.rowKey);
          break;
        case "update":
          transactionClient.updateEntity(entity, updateMode);
          break;
        case "upsert":
          transactionClient.upsertEntity(entity, updateMode);
      }
    }

    return transactionClient.submitTransaction();
  }

  private convertQueryOptions(query: TableEntityQueryOptions): GeneratedQueryOptions {
    const { select, ...queryOptions } = query;
    const mappedQuery: GeneratedQueryOptions = { ...queryOptions };
    if (select) {
      mappedQuery.select = select.join(",");
    }
    return mappedQuery;
  }

  /**
   *
   * Creates an instance of TableClient from connection string.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                           [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                           Account connection string example -
   *                           `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                           SAS connection string example -
   *                           `BlobEndpoint=https://myaccount.table.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param options - Options to configure the HTTP pipeline.
   * @returns A new TableClient from the given connection string.
   */
  public static fromConnectionString(
    connectionString: string,
    tableName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableClientOptions
  ): TableClient {
    const { url, options: clientOptions, credential } = getClientParamsFromConnectionString(
      connectionString,
      options
    );
    if (credential) {
      return new TableClient(url, tableName, credential, clientOptions);
    } else {
      return new TableClient(url, tableName, clientOptions);
    }
  }
}

type InternalQueryOptions = TableEntityQueryOptions & { top?: number };
interface InternalListTableEntitiesOptions extends ListTableEntitiesOptions {
  queryOptions?: InternalQueryOptions;
  /**
   * An entity query continuation token from a previous call.
   */
  nextPartitionKey?: string;
  /**
   * An entity query continuation token from a previous call.
   */
  nextRowKey?: string;
  /**
   * If true, automatic type conversion will be disabled and entity properties will
   * be represented by full metadata types. For example, an Int32 value will be {value: "123", type: "Int32"} instead of 123.
   * This option applies for all the properties
   */
  disableTypeConversion?: boolean;
}

function isInternalClientOptions(options: any): options is InternalTransactionClientOptions {
  return Boolean(options.innerTransactionRequest);
}
