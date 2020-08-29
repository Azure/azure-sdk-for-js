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
  TableQueryOptions
} from "./models";
import {
  TableServiceClientOptions,
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
import { PagedAsyncIterableIterator } from "@azure/core-paging";

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
   * @param {string} url The URL of the service account that is the target of the desired operation., such as
   *                     "https://myaccount.table.core.windows.net". You can append a SAS,
   *                     such as "https://myaccount.table.core.windows.net?sasString".
   * @param {TablesSharedKeyCredential} credential  TablesSharedKeyCredential used to authenticate requests. Only Supported for Browsers
   * @param {TableServiceClientOptions} options Optional. Options to configure the HTTP pipeline.
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
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(
    url: string,
    credential: TablesSharedKeyCredential,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableServiceClientOptions
  );
  /**
   * Creates a new instance of the TableServiceClient class.
   *
   * @param {string} url The URL of the service account that is the target of the desired operation., such as
   *                     "https://myaccount.table.core.windows.net". You can append a SAS,
   *                     such as "https://myaccount.table.core.windows.net?sasString".
   * @param {TableServiceClientOptions} options Optional. Options to configure the HTTP pipeline.
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
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(url: string, options?: TableServiceClientOptions);
  constructor(
    url: string,
    credentialOrOptions?: TablesSharedKeyCredential | TableServiceClientOptions,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableServiceClientOptions
  ) {
    const credential =
      credentialOrOptions instanceof TablesSharedKeyCredential ? credentialOrOptions : undefined;
    const clientOptions =
      (!(credentialOrOptions instanceof TablesSharedKeyCredential)
        ? credentialOrOptions
        : options) || {};

    if (credential) {
      clientOptions.requestPolicyFactories = (defaultFactories) => [
        ...defaultFactories,
        credential
      ];
    }

    const client = new GeneratedClient(url, clientOptions);
    this.table = client.table;
    this.service = client.service;

    // TODO: Add the required policies and credential pipelines #9909
  }

  /**
   * Retrieves statistics related to replication for the Table service. It is only available on the
   * secondary location endpoint when read-access geo-redundant replication is enabled for the account.
   * @param options The options parameters.
   */
  public getStatistics(options?: GetStatisticsOptions): Promise<GetStatisticsResponse> {
    return this.service.getStatistics(options);
  }

  /**
   * Gets the properties of an account's Table service, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param options The options parameters.
   */
  public getProperties(options?: GetPropertiesOptions): Promise<GetPropertiesResponse> {
    return this.service.getProperties(options);
  }

  /**
   * Sets properties for an account's Table service endpoint, including properties for Analytics and CORS
   * (Cross-Origin Resource Sharing) rules.
   * @param properties The Table Service properties.
   * @param options The options parameters.
   */
  public setProperties(
    properties: ServiceProperties,
    options?: SetPropertiesOptions
  ): Promise<SetPropertiesResponse> {
    return this.service.setProperties(properties, options);
  }

  /**
   * Creates a new table under the given account.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  public createTable(
    tableName: string,
    options?: CreateTableOptions
  ): Promise<CreateTableItemResponse> {
    return this.table.create({ tableName }, { ...options, responsePreference: "return-content" });
  }

  /**
   * Operation permanently deletes the specified table.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  public deleteTable(
    tableName: string,
    options?: DeleteTableOptions
  ): Promise<DeleteTableResponse> {
    return this.table.delete(tableName, options);
  }

  /**
   * Queries tables under the given account.
   * @param options The options parameters.
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
    options?: InternalListTablesOptions
  ): AsyncIterableIterator<ListTableItemsResponse> {
    let result = await this._listTables(options);

    yield result;

    while (result.nextTableName) {
      const optionsWithContinuation: ListTableItemsOptions = {
        ...options,
        nextTableName: result.nextTableName
      };
      result = await this._listTables(optionsWithContinuation);
      yield result;
    }
  }

  private async _listTables(options?: InternalListTablesOptions): Promise<ListTableItemsResponse> {
    const {
      _response,
      xMsContinuationNextTableName: nextTableName,
      value = []
    } = await this.table.query(options);

    return Object.assign([...value], { _response, nextTableName });
  }

  /**
   * Retrieves details about any stored access policies specified on the table that may be used with
   * Shared Access Signatures.
   * @param tableName The name of the table.
   * @param options The options parameters.
   */
  public getAccessPolicy(
    tableName: string,
    options?: GetAccessPolicyOptions
  ): Promise<GetAccessPolicyResponse> {
    return this.table.getAccessPolicy(tableName, options);
  }

  /**
   * Sets stored access policies for the table that may be used with Shared Access Signatures.
   * @param tableName The name of the table.
   * @param acl The Access Control List for the table.
   * @param options The options parameters.
   */
  public setAccessPolicy(
    tableName: string,
    options?: SetAccessPolicyOptions
  ): Promise<SetAccessPolicyResponse> {
    return this.table.setAccessPolicy(tableName, options);
  }

  /**
   *
   * Creates an instance of TableServiceClient from connection string.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.table.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {TableServiceClientOptions} [options] Options to configure the HTTP pipeline.
   * @returns {TableServiceClient} A new TableServiceClient from the given connection string.
   */
  public static fromConnectionString(
    connectionString: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: TableServiceClientOptions
  ): TableServiceClient {
    const { url, options: clientOptions } = getClientParamsFromConnectionString(
      connectionString,
      options
    );
    return new TableServiceClient(url, clientOptions);
  }
}

type InternalListTablesOptions = ListTableItemsOptions & {
  queryOptions?: TableQueryOptions & { top?: number };
};
