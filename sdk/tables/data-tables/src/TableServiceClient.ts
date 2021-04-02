// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GeneratedClient } from "./generated/generatedClient";
import { Service } from "./generated/operations";
import { Table } from "./generated/operations";
import {
  ListTableItemsOptions,
  CreateTableOptions,
  ListTableItemsResponse,
  CreateTableItemResponse,
  TableServiceClientOptions,
  TableQueryOptions
} from "./models";
import {
  GetStatisticsOptions,
  GetStatisticsResponse,
  GetPropertiesOptions,
  GetPropertiesResponse,
  SetPropertiesOptions,
  ServiceProperties,
  SetPropertiesResponse,
  DeleteTableOptions,
  DeleteTableResponse,
  GetAccessPolicyOptions,
  GetAccessPolicyResponse,
  SetAccessPolicyResponse,
  SetAccessPolicyOptions,
  TableResponseProperties
} from "./generatedModels";
import { getClientParamsFromConnectionString } from "./utils/connectionString";
import { TablesSharedKeyCredential } from "./TablesSharedKeyCredential";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LIB_INFO, TablesLoggingAllowedHeaderNames } from "./utils/constants";
import { logger } from "./logger";
import { InternalClientPipelineOptions } from "@azure/core-client";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "./utils/tracing";
import { tablesSharedKeyCredentialPolicy } from "./TablesSharedKeyCredentialPolicy";
import { parseXML, stringifyXML } from "@azure/core-xml";

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
   * @param url - The URL of the service account that is the target of the desired operation., such as
   *              "https://myaccount.table.core.windows.net". You can append a SAS,
   *              such as "https://myaccount.table.core.windows.net?sasString".
   * @param credential - TablesSharedKeyCredential used to authenticate requests. Only Supported for Browsers
   * @param options - Options to configure the HTTP pipeline.
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
  constructor(
    url: string,
    credential: TablesSharedKeyCredential,
    options?: TableServiceClientOptions
  );
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
    credentialOrOptions?: TablesSharedKeyCredential | TableServiceClientOptions,
    options?: TableServiceClientOptions
  ) {
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
      }
    };

    const client = new GeneratedClient(url, internalPipelineOptions);
    if (credential) {
      client.pipeline.addPolicy(tablesSharedKeyCredentialPolicy(credential));
    }
    this.table = client.table;
    this.service = client.service;
  }

  /**
   * Retrieves statistics related to replication for the Table service. It is only available on the
   * secondary location endpoint when read-access geo-redundant replication is enabled for the account.
   * @param options - The options parameters.
   */
  public getStatistics(options: GetStatisticsOptions = {}): Promise<GetStatisticsResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-getStatistics", options);
    try {
      return this.service.getStatistics(updatedOptions);
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
  public getProperties(options: GetPropertiesOptions = {}): Promise<GetPropertiesResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-getProperties", options);
    try {
      return this.service.getProperties(updatedOptions);
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
  public setProperties(
    properties: ServiceProperties,
    options: SetPropertiesOptions = {}
  ): Promise<SetPropertiesResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-setProperties", options);
    try {
      return this.service.setProperties(properties, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new table under the given account.
   * @param tableName - The name of the table.
   * @param options - The options parameters.
   */
  public createTable(
    tableName: string,
    options: CreateTableOptions = {}
  ): Promise<CreateTableItemResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-createTable", options);
    try {
      return this.table.create(
        { tableName },
        { ...updatedOptions, responsePreference: "return-content" }
      );
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Operation permanently deletes the specified table.
   * @param tableName - The name of the table.
   * @param options - The options parameters.
   */
  public deleteTable(
    tableName: string,
    options: DeleteTableOptions = {}
  ): Promise<DeleteTableResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-deleteTable", options);
    try {
      return this.table.delete(tableName, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
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
  ): PagedAsyncIterableIterator<TableResponseProperties, ListTableItemsResponse> {
    const iter = this.listTablesAll(options);

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
          queryOptions: { top: settings?.maxPageSize }
        };
        return this.listTablesPage(pageOptions);
      }
    };
  }

  private async *listTablesAll(
    options?: ListTableItemsOptions
  ): AsyncIterableIterator<TableResponseProperties> {
    const firstPage = await this._listTables(options);
    const { nextTableName } = firstPage;
    yield* firstPage;
    if (nextTableName) {
      const optionsWithContinuation: ListTableItemsOptions = {
        ...options,
        nextTableName
      };
      for await (const page of this.listTablesPage(optionsWithContinuation)) {
        yield* page;
      }
    }
  }

  private async *listTablesPage(
    options: InternalListTablesOptions = {}
  ): AsyncIterableIterator<ListTableItemsResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-listTablesPage", options);

    try {
      let result = await this._listTables(updatedOptions);

      yield result;

      while (result.nextTableName) {
        const optionsWithContinuation: ListTableItemsOptions = {
          ...updatedOptions,
          nextTableName: result.nextTableName
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

  private async _listTables(options?: InternalListTablesOptions): Promise<ListTableItemsResponse> {
    const { xMsContinuationNextTableName: nextTableName, value = [] } = await this.table.query(
      options
    );

    return Object.assign([...value], { nextTableName });
  }

  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param tableName - The name of the table.
   * @param options - The options parameters.
   */
  public getAccessPolicy(
    tableName: string,
    options: GetAccessPolicyOptions = {}
  ): Promise<GetAccessPolicyResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-getAccessPolicy", options);
    try {
      return this.table.getAccessPolicy(tableName, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param tableName - The name of the table.
   * @param acl - The Access Control List for the table.
   * @param options - The options parameters.
   */
  public setAccessPolicy(
    tableName: string,
    options: SetAccessPolicyOptions = {}
  ): Promise<SetAccessPolicyResponse> {
    const { span, updatedOptions } = createSpan("TableServiceClient-setAccessPolicy", options);
    try {
      return this.table.setAccessPolicy(tableName, updatedOptions);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
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
};
