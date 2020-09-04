// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  CreateTableEntityResponse,
  TableEntityQueryOptions,
  CreateTableOptions,
  CreateTableItemResponse,
  TableServiceClientOptions as TableClientOptions
} from "./models";
import {
  DeleteTableOptions,
  DeleteTableResponse,
  UpdateEntityResponse,
  UpsertEntityResponse,
  DeleteTableEntityResponse
} from "./generatedModels";
import { QueryOptions as GeneratedQueryOptions } from "./generated/models";
import { getClientParamsFromConnectionString } from "./utils/connectionString";
import { TablesSharedKeyCredential } from "./TablesSharedKeyCredential";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { GeneratedClient, TableDeleteEntityOptionalParams } from "./generated";
import { deserialize, deserializeObjectsArray, serialize } from "./serialization";
import { Table } from "./generated/operations";
import { LIB_INFO, TablesLoggingAllowedHeaderNames } from "./utils/constants";
import { createPipelineFromOptions, InternalPipelineOptions } from "@azure/core-http";
import { logger } from "./logger";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@opentelemetry/api";

/**
 * A TableClient represents a Client to the Azure Tables service allowing you
 * to perform operations on a single table.
 */
export class TableClient {
  private table: Table;
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
   * @param {TableClientOptions} options Optional. Options to configure the HTTP pipeline.
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
   * @param {TableClientOptions} options Optional. Options to configure the HTTP pipeline.
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
    options: TableClientOptions = {}
  ) {
    const credential =
      credentialOrOptions instanceof TablesSharedKeyCredential ? credentialOrOptions : undefined;
    const clientOptions =
      (!(credentialOrOptions instanceof TablesSharedKeyCredential)
        ? credentialOrOptions
        : options) || {};

    if (!clientOptions.userAgentOptions) {
      clientOptions.userAgentOptions = {};
    }

    if (clientOptions.userAgentOptions.userAgentPrefix) {
      clientOptions.userAgentOptions.userAgentPrefix = `${clientOptions.userAgentOptions.userAgentPrefix} ${LIB_INFO}`;
    } else {
      clientOptions.userAgentOptions.userAgentPrefix = LIB_INFO;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...clientOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: [...TablesLoggingAllowedHeaderNames]
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, credential);

    this.tableName = tableName;
    const { table } = new GeneratedClient(url, pipeline);
    this.table = table;
  }

  /**
   * Permanently deletes the current table with all of its entities.
   * @param options The options parameters.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public delete(options: DeleteTableOptions = {}): Promise<DeleteTableResponse> {
    const { span, updatedOptions } = createSpan("TableClient-delete", options);
    try {
      return this.table.delete(this.tableName, updatedOptions);
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   *  Creates the current table it it doesn't exist
   * @param options The options parameters.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public create(options: CreateTableOptions = {}): Promise<CreateTableItemResponse> {
    const { span, updatedOptions } = createSpan("TableClient-create", options);
    try {
      return this.table.create({ tableName: this.tableName }, updatedOptions);
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns a single entity in the table.
   * @param partitionKey The partition key of the entity.
   * @param rowKey The row key of the entity.
   * @param options The options parameters.
   */
  public async getEntity<T extends object>(
    partitionKey: string,
    rowKey: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: GetTableEntityOptions = {}
  ): Promise<GetTableEntityResponse<T>> {
    const { span, updatedOptions } = createSpan("TableClient-getEntity", options);

    try {
      const { queryOptions, ...getEntityOptions } = updatedOptions || {};
      const { _response } = await this.table.queryEntitiesWithPartitionAndRowKey(
        this.tableName,
        partitionKey,
        rowKey,
        { ...getEntityOptions, queryOptions: this.convertQueryOptions(queryOptions || {}) }
      );
      const tableEntity = deserialize<TableEntity<T>>(_response.parsedBody);

      return Object.defineProperty({ ...tableEntity }, "_response", {
        enumerable: false,
        value: _response
      });
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Queries entities in a table.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  public listEntities<T extends object>(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: ListTableEntitiesOptions = {}
  ): PagedAsyncIterableIterator<T, ListEntitiesResponse<T>> {
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
        const pageOptions = {
          ...options,
          queryOptions: { ...options.queryOptions, top: settings?.maxPageSize }
        };
        return this.listEntitiesPage(tableName, pageOptions);
      }
    };
  }

  private async *listEntitiesAll<T extends object>(
    tableName: string,
    options?: ListTableEntitiesOptions
  ): AsyncIterableIterator<T> {
    const firstPage = await this._listEntities<T>(tableName, options);
    const { nextPartitionKey, nextRowKey } = firstPage;
    yield* firstPage;
    if (nextRowKey && nextPartitionKey) {
      const optionsWithContinuation: ListTableEntitiesOptions = {
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
  ): AsyncIterableIterator<ListEntitiesResponse<T>> {
    const { span, updatedOptions } = createSpan("TableClient-listEntitiesPage", options);

    try {
      let result = await this._listEntities<T>(tableName, updatedOptions);

      yield result;

      while (result.nextPartitionKey && result.nextRowKey) {
        const optionsWithContinuation: ListTableEntitiesOptions = {
          ...updatedOptions,
          nextPartitionKey: result.nextPartitionKey,
          nextRowKey: result.nextRowKey
        };
        result = await this._listEntities(tableName, optionsWithContinuation);
        yield result;
      }
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async _listEntities<T extends object>(
    tableName: string,
    options?: ListTableEntitiesOptions
  ): Promise<ListEntitiesResponse<T>> {
    const queryOptions = this.convertQueryOptions(options?.queryOptions || {});
    const {
      xMsContinuationNextPartitionKey: nextPartitionKey,
      xMsContinuationNextRowKey: nextRowKey,
      value,
      _response
    } = await this.table.queryEntities(tableName, {
      ...options,
      queryOptions
    });

    const tableEntities = deserializeObjectsArray<TableEntity<T>>(value || []);

    const resultArray = Object.assign([...tableEntities], {
      nextPartitionKey,
      nextRowKey
    });

    return Object.defineProperty(resultArray, "_response", {
      enumerable: false,
      value: _response
    });
  }

  /**
   * Insert entity in the table.
   * @param entity The properties for the table entity.
   * @param options The options parameters.
   */
  public createEntity<T extends object>(
    entity: TableEntity<T>,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: CreateTableEntityOptions = {}
  ): Promise<CreateTableEntityResponse> {
    const { span, updatedOptions } = createSpan("TableClient-createEntity", options);

    try {
      const { queryOptions, ...createTableEntity } = updatedOptions || {};
      return this.table.insertEntity(this.tableName, {
        ...createTableEntity,
        queryOptions: this.convertQueryOptions(queryOptions || {}),
        tableEntityProperties: serialize(entity),
        responsePreference: "return-no-content"
      });
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
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
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: DeleteTableEntityOptions = {}
  ): Promise<DeleteTableEntityResponse> {
    const { span, updatedOptions } = createSpan("TableClient-deleteEntity", options);

    try {
      const { etag = "*", queryOptions, ...rest } = updatedOptions || {};
      const deleteOptions: TableDeleteEntityOptionalParams = {
        ...rest,
        queryOptions: this.convertQueryOptions(queryOptions || {})
      };
      return this.table.deleteEntity(this.tableName, partitionKey, rowKey, etag, deleteOptions);
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
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
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: UpdateTableEntityOptions = {}
  ): Promise<UpdateEntityResponse> {
    const { span, updatedOptions } = createSpan(`TableClient-updateEntity-${mode}`, options);

    try {
      if (!entity.PartitionKey || !entity.RowKey) {
        throw new Error("PartitionKey and RowKey must be defined");
      }

      const { etag = "*", ...updateEntityOptions } = updatedOptions || {};
      if (mode === "Merge") {
        return this.table.mergeEntity(this.tableName, entity.PartitionKey, entity.RowKey, {
          tableEntityProperties: serialize(entity),
          ifMatch: etag,
          ...updateEntityOptions
        });
      }
      if (mode === "Replace") {
        return this.table.updateEntity(this.tableName, entity.PartitionKey, entity.RowKey, {
          tableEntityProperties: serialize(entity),
          ifMatch: etag,
          ...updateEntityOptions
        });
      }

      throw new Error(`Unexpected value for update mode: ${mode}`);
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
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
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: UpsertTableEntityOptions = {}
  ): Promise<UpsertEntityResponse> {
    const { span, updatedOptions } = createSpan(`TableClient-upsertEntity-${mode}`, options);

    try {
      if (!entity.PartitionKey || !entity.RowKey) {
        throw new Error("PartitionKey and RowKey must be defined");
      }

      const { queryOptions, etag = "*", ...upsertOptions } = updatedOptions || {};
      if (mode === "Merge") {
        return this.table.mergeEntity(this.tableName, entity.PartitionKey, entity.RowKey, {
          tableEntityProperties: serialize(entity),
          queryOptions: this.convertQueryOptions(queryOptions || {}),
          ...upsertOptions,
          ifMatch: etag
        });
      }

      if (mode === "Replace") {
        return this.table.updateEntity(this.tableName, entity.PartitionKey, entity.RowKey, {
          tableEntityProperties: serialize(entity),
          queryOptions: this.convertQueryOptions(queryOptions || {}),
          ...upsertOptions,
          ifMatch: etag
        });
      }
      throw new Error(`Unexpected value for update mode: ${mode}`);
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
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
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.table.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {TableClientOptions} [options] Options to configure the HTTP pipeline.
   * @returns {TableClient} A new TableClient from the given connection string.
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

type InternalListTableEntitiesOptions = ListTableEntitiesOptions & {
  queryOptions?: TableEntityQueryOptions & { top?: number };
};
