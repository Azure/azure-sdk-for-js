// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
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
} from "./models.js";
import type {
  DeleteTableEntityResponse,
  SetAccessPolicyResponse,
  UpdateEntityResponse,
  UpsertEntityResponse,
} from "./generatedModels.js";
import type {
  FullOperationResponse,
  InternalClientPipelineOptions,
  OperationOptions,
  ServiceClient,
  ServiceClientOptions,
} from "@azure/core-client";
import type { TableDeleteEntityOptionalParams } from "./generated/index.js";
import { GeneratedClient } from "./generated/index.js";
import type { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import { isNamedKeyCredential, isSASCredential, isTokenCredential } from "@azure/core-auth";
import { COSMOS_SCOPE, STORAGE_SCOPE, TablesLoggingAllowedHeaderNames } from "./utils/constants.js";
import { decodeContinuationToken, encodeContinuationToken } from "./utils/continuationToken.js";
import {
  deserialize,
  deserializeObjectsArray,
  deserializeSignedIdentifier,
  serialize,
  serializeQueryOptions,
  serializeSignedIdentifiers,
} from "./serialization.js";
import { parseXML, stringifyXML } from "@azure/core-xml";

import { InternalTableTransaction } from "./TableTransaction.js";
import type { ListEntitiesResponse } from "./utils/internalModels.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { Table } from "./generated/operationsInterfaces/index.js";
import type { TableQueryEntitiesOptionalParams } from "./generated/models/index.js";
import { Uuid } from "./utils/uuid.js";
import { apiVersionPolicy } from "./utils/apiVersionPolicy.js";
import { cosmosPatchPolicy } from "./cosmosPathPolicy.js";
import { escapeQuotes } from "./odata.js";
import { getClientParamsFromConnectionString } from "./utils/connectionString.js";
import { handleTableAlreadyExists } from "./utils/errorHelpers.js";
import { isCosmosEndpoint } from "./utils/isCosmosEndpoint.js";
import { isCredential } from "./utils/isCredential.js";
import { logger } from "./logger.js";
import { setTokenChallengeAuthenticationPolicy } from "./utils/challengeAuthenticationUtils.js";
import { tablesNamedKeyCredentialPolicy } from "./tablesNamedCredentialPolicy.js";
import { tablesSASTokenPolicy } from "./tablesSASTokenPolicy.js";
import { tracingClient } from "./utils/tracing.js";

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
   * ```ts snippet:ReadmeSampleCreateTableClient_NamedKeyCredential
   * import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
   *
   * // Enter your storage account name and shared key
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * // Use AzureNamedKeyCredential with storage account and account key
   * // AzureNamedKeyCredential is only available in Node.js runtime, not in browsers
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   * ```
   */
  constructor(
    url: string,
    tableName: string,
    credential: NamedKeyCredential,
    options?: TableClientOptions,
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
   * ```ts snippet:ReadmeSampleCreateTableClient_SASToken
   * import { TableClient, AzureSASCredential } from "@azure/data-tables";
   *
   * const account = "<account name>";
   * const sas = "<service Shared Access Signature Token>";
   * const tableName = "<tableName>";
   *
   * const clientWithSAS = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   tableName,
   *   new AzureSASCredential(sas),
   * );
   * ```
   */
  constructor(
    url: string,
    tableName: string,
    credential: SASCredential,
    options?: TableClientOptions,
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
   * ```ts snippet:ReadmeSampleCreateTableClient_TokenCredential
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { TableClient } from "@azure/data-tables";
   *
   * // DefaultAzureCredential expects the following three environment variables:
   * // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
   * // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
   * // - AZURE_CLIENT_SECRET: The client secret for the registered application
   * const credential = new DefaultAzureCredential();
   * const account = "<account name>";
   * const tableName = "<tableName>";
   *
   * const clientWithAAD = new TableClient(
   *   `https://${account}.table.core.windows.net`,
   *   tableName,
   *   credential,
   * );
   * ```
   */
  constructor(
    url: string,
    tableName: string,
    credential: TokenCredential,
    options?: TableClientOptions,
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
   * ```ts snippet:ReadmeSampleCreateTableClient_SASTokenURL
   * import { TableClient } from "@azure/data-tables";
   *
   * const account = "<account name>";
   * const sasToken = "<SAS token>";
   * const tableName = "<tableName>";
   *
   * const clientWithSAS = new TableClient(
   *   `https://${account}.table.core.windows.net?${sasToken}`,
   *   tableName,
   * );
   * ```
   */
  constructor(url: string, tableName: string, options?: TableClientOptions);
  constructor(
    url: string,
    tableName: string,
    credentialOrOptions?: NamedKeyCredential | SASCredential | TableClientOptions | TokenCredential,
    options: TableClientOptions = {},
  ) {
    this.url = url;
    this.tableName = tableName;
    const isCosmos = isCosmosEndpoint(this.url);

    const credential = isCredential(credentialOrOptions) ? credentialOrOptions : undefined;
    this.credential = credential;

    this.clientOptions = (!isCredential(credentialOrOptions) ? credentialOrOptions : options) || {};

    this.allowInsecureConnection = this.clientOptions.allowInsecureConnection ?? false;

    const internalPipelineOptions: ServiceClientOptions & InternalClientPipelineOptions = {
      ...this.clientOptions,
      endpoint: this.clientOptions.endpoint || this.url,
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
      const scope = isCosmos ? COSMOS_SCOPE : STORAGE_SCOPE;
      setTokenChallengeAuthenticationPolicy(generatedClient.pipeline, credential, scope);
    }

    if (isCosmos) {
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
   * ```ts snippet:ReadmeSampleDeleteTable
   * import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * await client.deleteTable();
   * ```
   */
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
   * ```ts snippet:ReadmeSampleTableClientCreateTable
   * import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * // If the table 'newTable' already exists, createTable doesn't throw
   * await client.createTable();
   * ```
   */
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
   * ```ts snippet:ReadmeSampleGetEntity
   * import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * const entity = await client.getEntity("<partitionKey>", "<rowKey>");
   * console.log(`Entity: PartitionKey: ${entity.partitionKey} RowKey: ${entity.rowKey}`);
   * ```
   */
  public getEntity<T extends object = Record<string, unknown>>(
    partitionKey: string,
    rowKey: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: GetTableEntityOptions = {},
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
        },
      );
      const tableEntity = deserialize<TableEntityResult<T>>(
        parsedBody,
        disableTypeConversion ?? false,
      );

      return tableEntity;
    });
  }

  /**
   * Queries entities in a table.
   * @param options - The options parameters.
   *
   * Example listing entities
   * ```ts snippet:ReadmeSampleListEntities
   * import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * let i = 0;
   * const entities = client.listEntities();
   * for await (const entity of entities) {
   *   console.log(`Entity${++i}: PartitionKey: ${entity.partitionKey} RowKey: ${entity.rowKey}`);
   * }
   * ```
   */
  public listEntities<T extends object = Record<string, unknown>>(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: ListTableEntitiesOptions = {},
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
    options?: InternalListTableEntitiesOptions,
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
    options: InternalListTableEntitiesOptions = {},
  ): AsyncIterableIterator<ListEntitiesResponse<TableEntityResult<T>>> {
    let result = await tracingClient.withSpan(
      "TableClient.listEntitiesPage",
      options,
      (updatedOptions) => this._listEntities<T>(tableName, updatedOptions),
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
        },
      );
      yield result;
    }
  }

  private async _listEntities<T extends object>(
    tableName: string,
    options: InternalListTableEntitiesOptions = {},
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
      disableTypeConversion,
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
   * ```ts snippet:ReadmeSampleCreateEntity
   * import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * const testEntity = {
   *   partitionKey: "P1",
   *   rowKey: "R1",
   *   foo: "foo",
   *   bar: 123,
   * };
   * await client.createEntity(testEntity);
   * ```
   */
  public createEntity<T extends object>(
    entity: TableEntity<T>,
    options: OperationOptions = {},
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
   * ```ts snippet:ReadmeSampleDeleteEntity
   * import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * // deleteEntity deletes the entity that matches exactly the partitionKey and rowKey
   * await client.deleteEntity("<partitionKey>", "<rowKey>");
   * ```
   */
  public deleteEntity(
    partitionKey: string,
    rowKey: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: DeleteTableEntityOptions = {},
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
        deleteOptions,
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
   * ```ts snippet:ReadmeSampleUpdateEntity
   * import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * const entity = { partitionKey: "p1", rowKey: "r1", bar: "updatedBar" };
   *
   * // Update uses update mode "Merge" as default
   * // merge means that update will match a stored entity
   * // that has the same partitionKey and rowKey as the entity
   * // passed to the method and then will only update the properties present in it.
   * // Any other properties that are not defined in the entity passed to updateEntity
   * // will remain as they are in the service
   * await client.updateEntity(entity);
   *
   * // We can also set the update mode to Replace, which will match the entity passed
   * // to updateEntity with one stored in the service and replace with the new one.
   * // If there are any missing properties in the entity passed to updateEntity, they
   * // will be removed from the entity stored in the service
   * await client.updateEntity(entity, "Replace");
   * ```
   */
  public updateEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode = "Merge",
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: UpdateTableEntityOptions = {},
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
      },
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
   * ```ts snippet:ReadmeSampleUpsertEntity
   * import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * const entity = { partitionKey: "p1", rowKey: "r1", bar: "updatedBar" };
   *
   * // Upsert uses update mode "Merge" as default.
   * // This behaves similarly to update but creates the entity
   * // if it doesn't exist in the service
   * await client.upsertEntity(entity);
   *
   * // We can also set the update mode to Replace.
   * // This behaves similarly to update but creates the entity
   * // if it doesn't exist in the service
   * await client.upsertEntity(entity, "Replace");
   * ```
   */
  public upsertEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode = "Merge",
    options: OperationOptions = {},
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
      },
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
      },
    );
  }

  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param tableAcl - The Access Control List for the table.
   * @param options - The options parameters.
   */
  public setAccessPolicy(
    tableAcl: SignedIdentifier[],
    options: OperationOptions = {},
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
   * ```ts snippet:ReadmeSampleSubmitTransaction
   * import { AzureNamedKeyCredential, TableClient, TransactionAction } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * const actions: TransactionAction[] = [
   *   ["create", { partitionKey: "p1", rowKey: "1", data: "test1" }],
   *   ["delete", { partitionKey: "p1", rowKey: "2" }],
   *   ["update", { partitionKey: "p1", rowKey: "3", data: "newTest" }, "Merge"],
   * ];
   * const result = await client.submitTransaction(actions);
   * ```
   *
   * Example usage with TableTransaction:
   * ```ts snippet:ReadmeSampleSubmitTransactionWithTableTransaction
   * import { AzureNamedKeyCredential, TableClient, TableTransaction } from "@azure/data-tables";
   *
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   * const tableName = "<tableName>";
   *
   * const credential = new AzureNamedKeyCredential(account, accountKey);
   * const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
   *
   * const transaction = new TableTransaction();
   *
   * // Call the available action in the TableTransaction object
   * transaction.createEntity({ partitionKey: "p1", rowKey: "1", data: "test1" });
   * transaction.deleteEntity("p1", "2");
   * transaction.updateEntity({ partitionKey: "p1", rowKey: "3", data: "newTest" }, "Merge");
   *
   * // submitTransaction with the actions list on the transaction.
   * const result = await client.submitTransaction(transaction.actions);
   * ```
   *
   * @param actions - tuple that contains the action to perform, and the entity to perform the action with
   * @param options - Options for the request.
   */
  public async submitTransaction(
    actions: TransactionAction[],

    options: OperationOptions = {},
  ): Promise<TableTransactionResponse> {
    const partitionKey = actions[0][1].partitionKey;
    const transactionId = Uuid.generateUuid();
    const changesetId = Uuid.generateUuid();

    // Add pipeline
    const transactionClient = new InternalTableTransaction(
      this.url,
      partitionKey,
      transactionId,
      changesetId,
      this.generatedClient,
      new TableClient(this.url, this.tableName),
      this.credential,
      this.allowInsecureConnection,
    );

    for (const item of actions) {
      const [action, entity, updateMode = "Merge", updateOptions] = item;
      switch (action) {
        case "create":
          transactionClient.createEntity(entity);
          break;
        case "delete":
          transactionClient.deleteEntity(entity.partitionKey, entity.rowKey);
          break;
        case "update":
          transactionClient.updateEntity(entity, updateMode, updateOptions);
          break;
        case "upsert":
          transactionClient.upsertEntity(entity, updateMode);
      }
    }

    return transactionClient.submitTransaction(options);
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
    options?: TableClientOptions,
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
