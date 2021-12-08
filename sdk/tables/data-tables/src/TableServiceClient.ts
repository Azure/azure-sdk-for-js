// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GeneratedClient } from "./generated/generatedClient";
import { Service, Table } from "./generated";
import {
  ListTableItemsOptions,
  TableItem,
  TableQueryOptions,
  TableServiceClientOptions
} from "./models";
import {
  GetPropertiesResponse,
  GetStatisticsResponse,
  ServiceProperties,
  SetPropertiesOptions,
  SetPropertiesResponse
} from "./generatedModels";
import { getClientParamsFromConnectionString } from "./utils/connectionString";
import {
  NamedKeyCredential,
  SASCredential,
  TokenCredential,
  isNamedKeyCredential,
  isSASCredential,
  isTokenCredential
} from "@azure/core-auth";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { STORAGE_SCOPE, TablesLoggingAllowedHeaderNames } from "./utils/constants";
import { logger } from "./logger";
import { InternalClientPipelineOptions, OperationOptions } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "./utils/tracing";
import { tablesNamedKeyCredentialPolicy } from "./tablesNamedCredentialPolicy";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { Pipeline } from "@azure/core-rest-pipeline";
import { isCredential } from "./utils/isCredential";
import { tablesSASTokenPolicy } from "./tablesSASTokenPolicy";
import { TableItemResultPage } from "./models";
import { handleTableAlreadyExists } from "./utils/errorHelpers";

/**
 * A TableServiceClient represents a Client to the Azure Tables service allowing you
 * to perform operations on the tables and the entities.
 */
export class TableServiceClient {
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
  private service: Service;

  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation., such as "https://myaccount.table.core.windows.net".
   * @param credential - NamedKeyCredential | SASCredential used to authenticate requests. Only Supported for Node
   * @param options - Options to configure the HTTP pipeline.
   *
   * ### Example using an account name/key:
   *
   * ```js
   * const { AzureNamedKeyCredential, TableServiceClient } = require("@azure/data-tables")
   * const account = "<storage account name>"
   * const sharedKeyCredential = new AzureNamedKeyCredential(account, "<account key>");
   *
   * const tableServiceClient = new TableServiceClient(
   *   `https://${account}.table.core.windows.net`,
   *   sharedKeyCredential
   * );
   * ```
   */
  constructor(url: string, credential: NamedKeyCredential, options?: TableServiceClientOptions);
  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation., such as "https://myaccount.table.core.windows.net".
   * @param credential - SASCredential used to authenticate requests
   * @param options - Options to configure the HTTP pipeline.
   *
   * ### Example using a SAS Token.
   *
   * ```js
   * const { AzureSASCredential, TableServiceClient } = require("@azure/data-tables")
   * const account = "<storage account name>"
   * const sasCredential = new AzureSASCredential(account, "<account key>");
   *
   * const tableServiceClient = new TableServiceClient(
   *   `https://${account}.table.core.windows.net`,
   *   sasCredential
   * );
   * ```
   */
  constructor(url: string, credential: SASCredential, options?: TableServiceClientOptions);
  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation., such as "https://myaccount.table.core.windows.net".
   * @param credential - Azure Active Directory credential used to authenticate requests
   * @param options - Options to configure the HTTP pipeline.
   *
   * ### Example using an Azure Active Directory credential:
   *
   * ```js
   * cons { DefaultAzureCredential } = require("@azure/identity");
   * const { TableServiceClient } = require("@azure/data-tables")
   * const account = "<storage account name>"
   * const credential = new DefaultAzureCredential();
   *
   * const tableServiceClient = new TableServiceClient(
   *   `https://${account}.table.core.windows.net`,
   *   credential
   * );
   * ```
   */
  constructor(url: string, credential: TokenCredential, options?: TableServiceClientOptions);
  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param url - The URL of the service account that is the target of the desired operation., such as
   *              "https://myaccount.table.core.windows.net". You can append a SAS,
   *              such as "https://myaccount.table.core.windows.net?sasString".
   * @param options - Options to configure the HTTP pipeline.
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
  constructor(url: string, options?: TableServiceClientOptions);
  constructor(
    url: string,
    credentialOrOptions?:
      | NamedKeyCredential
      | SASCredential
      | TokenCredential
      | TableServiceClientOptions,
    options?: TableServiceClientOptions
  ) {
    this.url = url;
    const credential = isCredential(credentialOrOptions) ? credentialOrOptions : undefined;
    const clientOptions =
      (!isCredential(credentialOrOptions) ? credentialOrOptions : options) || {};

    clientOptions.endpoint = clientOptions.endpoint || this.url;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...clientOptions,
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
      },
      ...(isTokenCredential(credential) && { credential, credentialScopes: STORAGE_SCOPE })
    };
    const client = new GeneratedClient(this.url, internalPipelineOptions);
    if (isNamedKeyCredential(credential)) {
      client.pipeline.addPolicy(tablesNamedKeyCredentialPolicy(credential));
    } else if (isSASCredential(credential)) {
      client.pipeline.addPolicy(tablesSASTokenPolicy(credential));
    }

    this.pipeline = client.pipeline;
    this.table = client.table;
    this.service = client.service;
  }

  /**
   * Retrieves statistics related to replication for the Table service. It is only available on the
   * secondary location endpoint when read-access geo-redundant replication is enabled for the account.
   * @param options - The options parameters.
   */
  public async getStatistics(options: OperationOptions = {}): Promise<GetStatisticsResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-getStatistics", options);
    try {
      return await this.service.getStatistics(updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the properties of an account's Table service, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param options - The options parameters.
   */
  public async getProperties(options: OperationOptions = {}): Promise<GetPropertiesResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-getProperties", options);
    try {
      return await this.service.getProperties(updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets properties for an account's Table service endpoint, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param properties - The Table Service properties.
   * @param options - The options parameters.
   */
  public async setProperties(
    properties: ServiceProperties,
    options: SetPropertiesOptions = {}
  ): Promise<SetPropertiesResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-setProperties", options);
    try {
      return await this.service.setProperties(properties, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new table under the given account.
   * @param name - The name of the table.
   * @param options - The options parameters.
   */
  public async createTable(name: string, options: OperationOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("TableServiceClient-createTable", options);
    try {
      await this.table.create({ name }, { ...updatedOptions });
    } catch (e) {
      handleTableAlreadyExists(e, { ...updatedOptions, span, logger, tableName: name });
    } finally {
      span.end();
    }
  }

  /**
   * Operation permanently deletes the specified table.
   * @param name - The name of the table.
   * @param options - The options parameters.
   */
  public async deleteTable(name: string, options: OperationOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("TableServiceClient-deleteTable", options);
    try {
      await this.table.delete(name, updatedOptions);
    } catch (e) {
      if (e.statusCode === 404) {
        logger.info("TableServiceClient-deleteTable: Table doesn't exist");
      } else {
        span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
        throw e;
      }
    } finally {
      span.end();
    }
  }

  /**
   * Queries tables under the given account.
   * @param options - The options parameters.
   */
  public listTables(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ListTableItemsOptions
  ): PagedAsyncIterableIterator<TableItem, TableItemResultPage> {
    const iter = this.listTablesAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings) => {
        const pageOptions: InternalListTablesOptions = {
          ...options,
          queryOptions: { top: settings?.maxPageSize }
        };

        if (settings?.continuationToken) {
          pageOptions.continuationToken = settings.continuationToken;
        }

        return this.listTablesPage(pageOptions);
      }
    };
  }

  private async *listTablesAll(
    options?: InternalListTablesOptions
  ): AsyncIterableIterator<TableItem> {
    const firstPage = await this._listTables(options);
    const { continuationToken } = firstPage;
    yield* firstPage;
    if (continuationToken) {
      const optionsWithContinuation: InternalListTablesOptions = {
        ...options,
        continuationToken
      };
      for await (const page of this.listTablesPage(optionsWithContinuation)) {
        yield* page;
      }
    }
  }

  private async *listTablesPage(
    options: InternalListTablesOptions = {}
  ): AsyncIterableIterator<TableItemResultPage> {
    const { span, updatedOptions } = createSpan("TableServiceClient-listTablesPage", options);

    try {
      let result = await this._listTables(updatedOptions);

      yield result;

      while (result.continuationToken) {
        const optionsWithContinuation: InternalListTablesOptions = {
          ...updatedOptions,
          continuationToken: result.continuationToken
        };
        result = await this._listTables(optionsWithContinuation);
        yield result;
      }
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  private async _listTables(options: InternalListTablesOptions = {}): Promise<TableItemResultPage> {
    const { continuationToken: nextTableName, ...listOptions } = options;
    const { xMsContinuationNextTableName: continuationToken, value = [] } = await this.table.query({
      ...listOptions,
      nextTableName
    });
    return Object.assign([...value], { continuationToken });
  }

  /**
   *
   * Creates an instance of TableServiceClient from connection string.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                           [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                           Account connection string example -
   *                           `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                           SAS connection string example -
   *                           `BlobEndpoint=https://myaccount.table.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param options - Options to configure the HTTP pipeline.
   * @returns A new TableServiceClient from the given connection string.
   */
  public static fromConnectionString(
    connectionString: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableServiceClientOptions
  ): TableServiceClient {
    const { url, options: clientOptions, credential } = getClientParamsFromConnectionString(
      connectionString,
      options
    );

    if (credential) {
      return new TableServiceClient(url, credential, clientOptions);
    } else {
      return new TableServiceClient(url, clientOptions);
    }
  }
}

type InternalListTablesOptions = ListTableItemsOptions & {
  queryOptions?: TableQueryOptions & { top?: number };
  /**
   * A table query continuation token from a previous call.
   */
  continuationToken?: string;
};
