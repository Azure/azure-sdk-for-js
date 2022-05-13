// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "@azure/core-paging";

import {
  CreateTableEntityResponse,
  DeleteTableEntityOptions,
  GetAccessPolicyResponse,
  GetTableEntityOptions,
  GetTableEntityResponse,
  ListTableEntitiesOptions,
  SignedIdentifier,
  TableServiceClientOptions as TableClientOptions,
  TableEntity,
  TableEntityQueryOptions,
  TableEntityResult,
  TableEntityResultPage,
  TableTransactionResponse,
  TransactionAction,
  UpdateMode,
  UpdateTableEntityOptions,
} from "./models";
import {
  DeleteTableEntityResponse,
  SetAccessPolicyResponse,
  UpdateEntityResponse,
  UpsertEntityResponse,
} from "./generatedModels";
import {
  FullOperationResponse,
  InternalClientPipelineOptions,
  OperationOptions,
  ServiceClient,
} from "@azure/core-client";
import { GeneratedClient, TableDeleteEntityOptionalParams } from "./generated";
import {
  NamedKeyCredential,
  SASCredential,
  TokenCredential,
  isNamedKeyCredential,
  isSASCredential,
  isTokenCredential,
} from "@azure/core-auth";
import { STORAGE_SCOPE, TablesLoggingAllowedHeaderNames } from "./utils/constants";
import { decodeContinuationToken, encodeContinuationToken } from "./utils/continuationToken";
import {
  deserialize,
  deserializeObjectsArray,
  deserializeSignedIdentifier,
  serialize,
  serializeQueryOptions,
  serializeSignedIdentifiers,
} from "./serialization";
import { parseXML, stringifyXML } from "@azure/core-xml";

import { InternalTableTransaction } from "./TableTransaction";
import { ListEntitiesResponse } from "./utils/internalModels";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Pipeline } from "@azure/core-rest-pipeline";
import { Table } from "./generated/operationsInterfaces";
import { TableQueryEntitiesOptionalParams } from "./generated/models";
import { Uuid } from "./utils/uuid";
import { apiVersionPolicy } from "./utils/apiVersionPolicy";
import { cosmosPatchPolicy } from "./cosmosPathPolicy";
import { escapeQuotes } from "./odata";
import { getClientParamsFromConnectionString } from "./utils/connectionString";
import { handleTableAlreadyExists } from "./utils/errorHelpers";
import { isCosmosEndpoint } from "./utils/isCosmosEndpoint";
import { isCredential } from "./utils/isCredential";
import { logger } from "./logger";
import { setTokenChallengeAuthenticationPolicy } from "./utils/challengeAuthenticationUtils";
import { tablesNamedKeyCredentialPolicy } from "./tablesNamedCredentialPolicy";
import { tablesSASTokenPolicy } from "./tablesSASTokenPolicy";
import { tracingClient } from "./utils/tracing";

/**
 * A TableClient represents a Client to the Azure Tables service allowing you
 * to perform operations on a single table.
 */
export class TableClient {
  /**
   * Table Account URL
   */
  public url: string;
  /**
   * Represents a pipeline for making a HTTP request to a URL.
   * Pipelines can have multiple policies to manage manipulating each request before and after it is made to the server.
   */
  public pipeline: Pipeline;
  private table: Table;
  private generatedClient: ServiceClient;
  private credential?: NamedKeyCredential | SASCredential | TokenCredential;
  private transactionClient?: InternalTableTransaction;
  private clientOptions: TableClientOptions;
  private readonly allowInsecureConnection: boolean;

  /**
   * Name of the table to perform operations on.
   */
  public readonly tableName: string;

  /**
   * Creates a new instance of the TableClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation, such as "https://myaccount.table.core.windows.net".
   * @param tableName - the name of the table
   * @param credential - NamedKeyCredential used to authenticate requests. Only Supported for Node
   * @param options - Optional. Options to configure the HTTP pipeline.
   *
   *
   * ### Example using an account name/key:
   *
   * ```js
   * const { AzureNamedKeyCredential, TableClient } = require("@azure/data-tables");
   * const account = "<storage account name>";
   * const accountKey = "<account key>"
   * const tableName = "<table name>";
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   tableName,
   *   sharedKeyCredential
   * );
   * ```
   */
  constructor(
    url: string,
    tableName: string,
    credential: NamedKeyCredential,
    options?: TableClientOptions
  );
  /**
   * Creates a new instance of the TableClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation, such as "https://myaccount.table.core.windows.net".
   * @param tableName - the name of the table
   * @param credential - SASCredential used to authenticate requests
   * @param options - Optional. Options to configure the HTTP pipeline.
   *
   *
   * ### Example using a SAS Token:
   *
   * ```js
   * const { AzureSASCredential, TableClient } = require("@azure/data-tables");
   * const account = "<storage account name>";
   * const sasToken = "<sas-token>";
   * const tableName = "<table name>";
   * const sasCredential = new AzureSASCredential(sasToken);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   tableName,
   *   sasCredential
   * );
   * ```
   */
  constructor(
    url: string,
    tableName: string,
    credential: SASCredential,
    options?: TableClientOptions
  );
  /**
   * Creates a new instance of the TableClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation, such as "https://myaccount.table.core.windows.net".
   * @param tableName - the name of the table
   * @param credential - Azure Active Directory credential used to authenticate requests
   * @param options - Optional. Options to configure the HTTP pipeline.
   *
   *
   * ### Example using an Azure Active Directory credential:
   *
   * ```js
   * cons { DefaultAzureCredential } = require("@azure/identity");
   * const { AzureSASCredential, TableClient } = require("@azure/data-tables");
   * const account = "<storage account name>";
   * const sasToken = "<sas-token>";
   * const tableName = "<table name>";
   * const credential = new DefaultAzureCredential();
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   tableName,
   *   credential
   * );
   * ```
   */
  constructor(
    url: string,
    tableName: string,
    credential: TokenCredential,
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
   * ### Example appending a SAS token:
   *
   * ```js
   * const { TableClient } = require("@azure/data-tables");
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
    credentialOrOptions?: NamedKeyCredential | SASCredential | TableClientOptions | TokenCredential,
    options: TableClientOptions = {}
  ) {
    this.url = url;
    this.tableName = tableName;

    const credential = isCredential(credentialOrOptions) ? credentialOrOptions : undefined;
    this.credential = credential;

    this.clientOptions = (!isCredential(credentialOrOptions) ? credentialOrOptions : options) || {};

    this.allowInsecureConnection = this.clientOptions.allowInsecureConnection ?? false;
    this.clientOptions.endpoint = this.clientOptions.endpoint || this.url;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...this.clientOptions,
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: [...TablesLoggingAllowedHeaderNames],
      },
      deserializationOptions: {
        parseXML,
      },
      serializationOptions: {
        stringifyXML,
      },
    };

    const generatedClient = new GeneratedClient(this.url, internalPipelineOptions);
    if (isNamedKeyCredential(credential)) {
      generatedClient.pipeline.addPolicy(tablesNamedKeyCredentialPolicy(credential));
    } else if (isSASCredential(credential)) {
      generatedClient.pipeline.addPolicy(tablesSASTokenPolicy(credential));
    }

    if (isTokenCredential(credential)) {
      setTokenChallengeAuthenticationPolicy(generatedClient.pipeline, credential, STORAGE_SCOPE);
    }

    if (isCosmosEndpoint(this.url)) {
      generatedClient.pipeline.addPolicy(cosmosPatchPolicy());
    }

    if (options.version) {
      generatedClient.pipeline.addPolicy(apiVersionPolicy(options.version));
    }

    this.generatedClient = generatedClient;
    this.table = generatedClient.table;
    this.pipeline = generatedClient.pipeline;
  }

  /**
   * Permanently deletes the current table with all of its entities.
   * @param options - The options parameters.
   *
   * ### Example deleting a table
   * ```js
   * const { AzureNamedKeyCredential, TableClient } = require("@azure/data-tables")
   * const account = "<storage account name>";
   * const accountKey = "<account key>"
   * const tableName = "<table name>";
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   `${tableName}`,
   *   sharedKeyCredential
   * );
   *
   * // calling deleteTable will delete the table used
   * // to instantiate the TableClient.
   * // Note: If the table doesn't exist this function doesn't fail.
   * await client.deleteTable();
   * ```
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public deleteTable(options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan("TableClient.deleteTable", options, async (updatedOptions) => {
      try {
        await this.table.delete(this.tableName, updatedOptions);
      } catch (e: any) {
        if (e.statusCode === 404) {
          logger.info("TableClient.deleteTable: Table doesn't exist");
        } else {
          throw e;
        }
      }
    });
  }

  /**
   *  Creates a table with the tableName passed to the client constructor
   * @param options - The options parameters.
   *
   * ### Example creating a table
   * ```js
   * const { AzureNamedKeyCredential, TableClient } = require("@azure/data-tables")
   * const account = "<storage account name>";
   * const accountKey = "<account key>"
   * const tableName = "<table name>";
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   `${tableName}`,
   *   sharedKeyCredential
   * );
   *
   * // calling create table will create the table used
   * // to instantiate the TableClient.
   * // Note: If the table already
   * // exists this function doesn't throw.
   * await client.createTable();
   * ```
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public createTable(options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan("TableClient.createTable", options, async (updatedOptions) => {
      try {
        await this.table.create({ name: this.tableName }, updatedOptions);
      } catch (e: any) {
        handleTableAlreadyExists(e, { ...updatedOptions, logger, tableName: this.tableName });
      }
    });
  }

  /**
   * Returns a single entity in the table.
   * @param partitionKey - The partition key of the entity.
   * @param rowKey - The row key of the entity.
   * @param options - The options parameters.
   *
   * ### Example getting an entity
   * ```js
   * const { AzureNamedKeyCredential, TableClient } = require("@azure/data-tables")
   * const account = "<storage account name>";
   * const accountKey = "<account key>"
   * const tableName = "<table name>";
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   `${tableName}`,
   *   sharedKeyCredential
   * );
   *
   * // getEntity will get a single entity stored in the service that
   * // matches exactly the partitionKey and rowKey used as parameters
   * // to the method.
   * const entity = await client.getEntity("<partitionKey>", "<rowKey>");
   * console.log(entity);
   * ```
   */
  public getEntity<T extends object = Record<string, unknown>>(
    partitionKey: string,
    rowKey: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: GetTableEntityOptions = {}
  ): Promise<GetTableEntityResponse<TableEntityResult<T>>> {
    return tracingClient.withSpan("TableClient.getEntity", options, async (updatedOptions) => {
      let parsedBody: any;
      function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
        parsedBody = rawResponse.parsedBody;
        if (updatedOptions.onResponse) {
          updatedOptions.onResponse(rawResponse, flatResponse);
        }
      }
      const { disableTypeConversion, queryOptions, ...getEntityOptions } = updatedOptions;
      await this.table.queryEntitiesWithPartitionAndRowKey(
        this.tableName,
        escapeQuotes(partitionKey),
        escapeQuotes(rowKey),
        {
          ...getEntityOptions,
          queryOptions: serializeQueryOptions(queryOptions || {}),
          onResponse,
        }
      );
      const tableEntity = deserialize<TableEntityResult<T>>(
        parsedBody,
        disableTypeConversion ?? false
      );

      return tableEntity;
    });
  }

  /**
   * Queries entities in a table.
   * @param options - The options parameters.
   *
   * Example listing entities
   * ```js
   * const { AzureNamedKeyCredential, TableClient } = require("@azure/data-tables")
   * const account = "<storage account name>";
   * const accountKey = "<account key>"
   * const tableName = "<table name>";
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   `${tableName}`,
   *   sharedKeyCredential
   * );
   *
   * // list entities returns a AsyncIterableIterator
   * // this helps consuming paginated responses by
   * // automatically handling getting the next pages
   * const entities = client.listEntities();
   *
   * // this loop will get all the entities from all the pages
   * // returned by the service
   * for await (const entity of entities) {
   *    console.log(entity);
   * }
   * ```
   */
  public listEntities<T extends object = Record<string, unknown>>(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: ListTableEntitiesOptions = {}
  ): PagedAsyncIterableIterator<TableEntityResult<T>, TableEntityResultPage<T>> {
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
          queryOptions: { ...options.queryOptions, top: settings?.maxPageSize },
        };

        if (settings?.continuationToken) {
          pageOptions.continuationToken = settings.continuationToken;
        }

        return this.listEntitiesPage(tableName, pageOptions);
      },
    };
  }

  private async *listEntitiesAll<T extends object>(
    tableName: string,
    options?: InternalListTableEntitiesOptions
  ): AsyncIterableIterator<TableEntityResult<T>> {
    const firstPage = await this._listEntities<T>(tableName, options);
    yield* firstPage;
    if (firstPage.continuationToken) {
      const optionsWithContinuation: InternalListTableEntitiesOptions = {
        ...options,
        continuationToken: firstPage.continuationToken,
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
    let result = await tracingClient.withSpan(
      "TableClient.listEntitiesPage",
      options,
      (updatedOptions) => this._listEntities<T>(tableName, updatedOptions)
    );

    yield result;

    while (result.continuationToken) {
      const optionsWithContinuation: InternalListTableEntitiesOptions = {
        ...options,
        continuationToken: result.continuationToken,
      };

      result = await tracingClient.withSpan(
        "TableClient.listEntitiesPage",
        optionsWithContinuation,
        (updatedOptions, span) => {
          span.setAttribute("continuationToken", result.continuationToken);
          return this._listEntities<T>(tableName, updatedOptions);
        }
      );
      yield result;
    }
  }

  private async _listEntities<T extends object>(
    tableName: string,
    options: InternalListTableEntitiesOptions = {}
  ): Promise<TableEntityResultPage<T>> {
    const { disableTypeConversion = false } = options;
    const queryOptions = serializeQueryOptions(options.queryOptions || {});
    const listEntitiesOptions: TableQueryEntitiesOptionalParams = {
      ...options,
      queryOptions,
    };

    // If a continuation token is used, decode it and set the next row and partition key
    if (options.continuationToken) {
      const continuationToken = decodeContinuationToken(options.continuationToken);
      listEntitiesOptions.nextRowKey = continuationToken.nextRowKey;
      listEntitiesOptions.nextPartitionKey = continuationToken.nextPartitionKey;
    }

    const {
      xMsContinuationNextPartitionKey: nextPartitionKey,
      xMsContinuationNextRowKey: nextRowKey,
      value,
    } = await this.table.queryEntities(tableName, listEntitiesOptions);

    const tableEntities = deserializeObjectsArray<TableEntityResult<T>>(
      value ?? [],
      disableTypeConversion
    );

    // Encode nextPartitionKey and nextRowKey as a single continuation token and add it as a
    // property to the page.
    const continuationToken = encodeContinuationToken(nextPartitionKey, nextRowKey);
    const page: TableEntityResultPage<T> = Object.assign([...tableEntities], {
      continuationToken,
    });

    return page;
  }

  /**
   * Insert entity in the table.
   * @param entity - The properties for the table entity.
   * @param options - The options parameters.
   *
   * ### Example creating an entity
   * ```js
   * const { AzureNamedKeyCredential, TableClient } = require("@azure/data-tables")
   * const account = "<storage account name>";
   * const accountKey = "<account key>"
   * const tableName = "<table name>";
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   `${tableName}`,
   *   sharedKeyCredential
   * );
   *
   * // partitionKey and rowKey are required properties of the entity to create
   * // and accepts any other properties
   * await client.createEntity({partitionKey: "p1", rowKey: "r1", foo: "Hello!"});
   * ```
   */
  public createEntity<T extends object>(
    entity: TableEntity<T>,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: OperationOptions = {}
  ): Promise<CreateTableEntityResponse> {
    return tracingClient.withSpan("TableClient.createEntity", options, (updatedOptions) => {
      const { ...createTableEntity } = updatedOptions || {};
      return this.table.insertEntity(this.tableName, {
        ...createTableEntity,
        tableEntityProperties: serialize(entity),
        responsePreference: "return-no-content",
      });
    });
  }

  /**
   * Deletes the specified entity in the table.
   * @param partitionKey - The partition key of the entity.
   * @param rowKey - The row key of the entity.
   * @param options - The options parameters.
   *
   * ### Example deleting an entity
   * ```js
   * const { AzureNamedKeyCredential, TableClient } = require("@azure/data-tables")
   * const account = "<storage account name>";
   * const accountKey = "<account key>"
   * const tableName = "<table name>";
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   `${tableName}`,
   *   sharedKeyCredential
   * );
   *
   * // deleteEntity deletes the entity that matches
   * // exactly the partitionKey and rowKey passed as parameters
   * await client.deleteEntity("<partitionKey>", "<rowKey>")
   * ```
   */
  public deleteEntity(
    partitionKey: string,
    rowKey: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: DeleteTableEntityOptions = {}
  ): Promise<DeleteTableEntityResponse> {
    return tracingClient.withSpan("TableClient.deleteEntity", options, (updatedOptions) => {
      const { etag = "*", ...rest } = updatedOptions;
      const deleteOptions: TableDeleteEntityOptionalParams = {
        ...rest,
      };
      return this.table.deleteEntity(
        this.tableName,
        escapeQuotes(partitionKey),
        escapeQuotes(rowKey),
        etag,
        deleteOptions
      );
    });
  }

  /**
   * Update an entity in the table.
   * @param entity - The properties of the entity to be updated.
   * @param mode - The different modes for updating the entity:
   *               - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
   *               - Replace: Updates an existing entity by replacing the entire entity.
   * @param options - The options parameters.
   *
   * ### Example updating an entity
   * ```js
   * const { AzureNamedKeyCredential, TableClient } = require("@azure/data-tables")
   * const account = "<storage account name>";
   * const accountKey = "<account key>"
   * const tableName = "<table name>";
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   `${tableName}`,
   *   sharedKeyCredential
   * );
   *
   * const entity = {partitionKey: "p1", rowKey: "r1", bar: "updatedBar"};
   *
   * // Update uses update mode "Merge" as default
   * // merge means that update will match a stored entity
   * // that has the same partitionKey and rowKey as the entity
   * // passed to the method and then will only update the properties present in it.
   * // Any other properties that are not defined in the entity passed to updateEntity
   * // will remain as they are in the service
   * await client.updateEntity(entity)
   *
   * // We can also set the update mode to Replace, which will match the entity passed
   * // to updateEntity with one stored in the service and replace with the new one.
   * // If there are any missing properties in the entity passed to updateEntity, they
   * // will be removed from the entity stored in the service
   * await client.updateEntity(entity, "Replace")
   * ```
   */
  public updateEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode = "Merge",
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: UpdateTableEntityOptions = {}
  ): Promise<UpdateEntityResponse> {
    return tracingClient.withSpan(
      "TableClient.updateEntity",
      options,
      async (updatedOptions) => {
        const partitionKey = escapeQuotes(entity.partitionKey);
        const rowKey = escapeQuotes(entity.rowKey);

        const { etag = "*", ...updateEntityOptions } = updatedOptions || {};
        if (mode === "Merge") {
          return this.table.mergeEntity(this.tableName, partitionKey, rowKey, {
            tableEntityProperties: serialize(entity),
            ifMatch: etag,
            ...updateEntityOptions,
          });
        }
        if (mode === "Replace") {
          return this.table.updateEntity(this.tableName, partitionKey, rowKey, {
            tableEntityProperties: serialize(entity),
            ifMatch: etag,
            ...updateEntityOptions,
          });
        }

        throw new Error(`Unexpected value for update mode: ${mode}`);
      },
      {
        spanAttributes: {
          updateEntityMode: mode,
        },
      }
    );
  }

  /**
   * Upsert an entity in the table.
   * @param entity - The properties for the table entity.
   * @param mode - The different modes for updating the entity:
   *               - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
   *               - Replace: Updates an existing entity by replacing the entire entity.
   * @param options - The options parameters.
   *
   * ### Example upserting an entity
   * ```js
   * const { AzureNamedKeyCredential, TableClient } = require("@azure/data-tables")
   * const account = "<storage account name>";
   * const accountKey = "<account key>"
   * const tableName = "<table name>";
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
   *
   * const client = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   `${tableName}`,
   *   sharedKeyCredential
   * );
   *
   * const entity = {partitionKey: "p1", rowKey: "r1", bar: "updatedBar"};
   *
   * // Upsert uses update mode "Merge" as default.
   * // This behaves similarly to update but creates the entity
   * // if it doesn't exist in the service
   * await client.upsertEntity(entity)
   *
   * // We can also set the update mode to Replace.
   * // This behaves similarly to update but creates the entity
   * // if it doesn't exist in the service
   * await client.upsertEntity(entity, "Replace")
   * ```
   */
  public upsertEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode = "Merge",
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: OperationOptions = {}
  ): Promise<UpsertEntityResponse> {
    return tracingClient.withSpan(
      "TableClient.upsertEntity",
      options,
      async (updatedOptions) => {
        const partitionKey = escapeQuotes(entity.partitionKey);
        const rowKey = escapeQuotes(entity.rowKey);

        if (mode === "Merge") {
          return this.table.mergeEntity(this.tableName, partitionKey, rowKey, {
            tableEntityProperties: serialize(entity),
            ...updatedOptions,
          });
        }

        if (mode === "Replace") {
          return this.table.updateEntity(this.tableName, partitionKey, rowKey, {
            tableEntityProperties: serialize(entity),
            ...updatedOptions,
          });
        }
        throw new Error(`Unexpected value for update mode: ${mode}`);
      },
      {
        spanAttributes: {
          upsertEntityMode: mode,
        },
      }
    );
  }

  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param options - The options parameters.
   */
  public getAccessPolicy(options: OperationOptions = {}): Promise<GetAccessPolicyResponse> {
    return tracingClient.withSpan(
      "TableClient.getAccessPolicy",
      options,
      async (updatedOptions) => {
        const signedIdentifiers = await this.table.getAccessPolicy(this.tableName, updatedOptions);
        return deserializeSignedIdentifier(signedIdentifiers);
      }
    );
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
    return tracingClient.withSpan("TableClient.setAccessPolicy", options, (updatedOptions) => {
      const serlializedAcl = serializeSignedIdentifiers(tableAcl);
      return this.table.setAccessPolicy(this.tableName, {
        ...updatedOptions,
        tableAcl: serlializedAcl,
      });
    });
  }

  /**
   * Submits a Transaction which is composed of a set of actions. You can provide the actions as a list
   * or you can use {@link TableTransaction} to help building the transaction.
   *
   * Example usage:
   * ```typescript
   * const { TableClient } = require("@azure/data-tables");
   * const connectionString = "<connection-string>"
   * const tableName = "<tableName>"
   * const client = TableClient.fromConnectionString(connectionString, tableName);
   * const actions = [
   *    ["create", {partitionKey: "p1", rowKey: "1", data: "test1"}],
   *    ["delete", {partitionKey: "p1", rowKey: "2"}],
   *    ["update", {partitionKey: "p1", rowKey: "3", data: "newTest"}, "Merge"]
   * ]
   * const result = await client.submitTransaction(actions);
   * ```
   *
   * Example usage with TableTransaction:
   * ```js
   * const { TableClient } = require("@azure/data-tables");
   * const connectionString = "<connection-string>"
   * const tableName = "<tableName>"
   * const client = TableClient.fromConnectionString(connectionString, tableName);
   * const transaction = new TableTransaction();
   * // Call the available action in the TableTransaction object
   * transaction.create({partitionKey: "p1", rowKey: "1", data: "test1"});
   * transaction.delete("p1", "2");
   * transaction.update({partitionKey: "p1", rowKey: "3", data: "newTest"}, "Merge")
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

    if (!this.transactionClient) {
      // Add pipeline
      this.transactionClient = new InternalTableTransaction(
        this.url,
        partitionKey,
        transactionId,
        changesetId,
        this.generatedClient,
        new TableClient(this.url, this.tableName),
        this.credential,
        this.allowInsecureConnection
      );
    } else {
      this.transactionClient.reset(transactionId, changesetId, partitionKey);
    }

    for (const item of actions) {
      const [action, entity, updateMode = "Merge"] = item;
      switch (action) {
        case "create":
          this.transactionClient.createEntity(entity);
          break;
        case "delete":
          this.transactionClient.deleteEntity(entity.partitionKey, entity.rowKey);
          break;
        case "update":
          this.transactionClient.updateEntity(entity, updateMode);
          break;
        case "upsert":
          this.transactionClient.upsertEntity(entity, updateMode);
      }
    }

    return this.transactionClient.submitTransaction();
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
    const {
      url,
      options: clientOptions,
      credential,
    } = getClientParamsFromConnectionString(connectionString, options);
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
  continuationToken?: string;
  /**
   * If true, automatic type conversion will be disabled and entity properties will
   * be represented by full metadata types. For example, an Int32 value will be \{value: "123", type: "Int32"\} instead of 123.
   * This option applies for all the properties
   */
  disableTypeConversion?: boolean;
}
