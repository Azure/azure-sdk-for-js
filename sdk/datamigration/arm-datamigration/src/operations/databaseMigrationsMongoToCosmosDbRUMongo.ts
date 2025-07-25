/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { DatabaseMigrationsMongoToCosmosDbRUMongo } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataMigrationManagementClient } from "../dataMigrationManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  DatabaseMigrationCosmosDbMongo,
  DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeNextOptionalParams,
  DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOptionalParams,
  DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeResponse,
  DatabaseMigrationsMongoToCosmosDbRUMongoGetOptionalParams,
  DatabaseMigrationsMongoToCosmosDbRUMongoGetResponse,
  DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
  DatabaseMigrationsMongoToCosmosDbRUMongoCreateResponse,
  DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
  DatabaseMigrationsMongoToCosmosDbRUMongoDeleteResponse,
  DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing DatabaseMigrationsMongoToCosmosDbRUMongo operations. */
export class DatabaseMigrationsMongoToCosmosDbRUMongoImpl
  implements DatabaseMigrationsMongoToCosmosDbRUMongo
{
  private readonly client: DataMigrationManagementClient;

  /**
   * Initialize a new instance of the class DatabaseMigrationsMongoToCosmosDbRUMongo class.
   * @param client Reference to the service client
   */
  constructor(client: DataMigrationManagementClient) {
    this.client = client;
  }

  /**
   * Get Database Migration resources for the scope.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param targetResourceName The name of the target resource/account.
   * @param options The options parameters.
   */
  public listForScope(
    resourceGroupName: string,
    targetResourceName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOptionalParams,
  ): PagedAsyncIterableIterator<DatabaseMigrationCosmosDbMongo> {
    const iter = this.getForScopePagingAll(
      resourceGroupName,
      targetResourceName,
      options,
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.getForScopePagingPage(
          resourceGroupName,
          targetResourceName,
          options,
          settings,
        );
      },
    };
  }

  private async *getForScopePagingPage(
    resourceGroupName: string,
    targetResourceName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<DatabaseMigrationCosmosDbMongo[]> {
    let result: DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._getForScope(
        resourceGroupName,
        targetResourceName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._getForScopeNext(
        resourceGroupName,
        targetResourceName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *getForScopePagingAll(
    resourceGroupName: string,
    targetResourceName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOptionalParams,
  ): AsyncIterableIterator<DatabaseMigrationCosmosDbMongo> {
    for await (const page of this.getForScopePagingPage(
      resourceGroupName,
      targetResourceName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get Database Migration resource.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param targetResourceName The name of the target resource/account.
   * @param migrationName Name of the migration.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoGetOptionalParams,
  ): Promise<DatabaseMigrationsMongoToCosmosDbRUMongoGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, targetResourceName, migrationName, options },
      getOperationSpec,
    );
  }

  /**
   * Create or Update Database Migration resource.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param targetResourceName The name of the target resource/account.
   * @param migrationName Name of the migration.
   * @param parameters Details of CosmosDB for Mongo API Migration resource.
   * @param options The options parameters.
   */
  async beginCreate(
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    parameters: DatabaseMigrationCosmosDbMongo,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DatabaseMigrationsMongoToCosmosDbRUMongoCreateResponse>,
      DatabaseMigrationsMongoToCosmosDbRUMongoCreateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<DatabaseMigrationsMongoToCosmosDbRUMongoCreateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        targetResourceName,
        migrationName,
        parameters,
        options,
      },
      spec: createOperationSpec,
    });
    const poller = await createHttpPoller<
      DatabaseMigrationsMongoToCosmosDbRUMongoCreateResponse,
      OperationState<DatabaseMigrationsMongoToCosmosDbRUMongoCreateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create or Update Database Migration resource.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param targetResourceName The name of the target resource/account.
   * @param migrationName Name of the migration.
   * @param parameters Details of CosmosDB for Mongo API Migration resource.
   * @param options The options parameters.
   */
  async beginCreateAndWait(
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    parameters: DatabaseMigrationCosmosDbMongo,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
  ): Promise<DatabaseMigrationsMongoToCosmosDbRUMongoCreateResponse> {
    const poller = await this.beginCreate(
      resourceGroupName,
      targetResourceName,
      migrationName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete Database Migration resource.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param targetResourceName The name of the target resource/account.
   * @param migrationName Name of the migration.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DatabaseMigrationsMongoToCosmosDbRUMongoDeleteResponse>,
      DatabaseMigrationsMongoToCosmosDbRUMongoDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<DatabaseMigrationsMongoToCosmosDbRUMongoDeleteResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, targetResourceName, migrationName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      DatabaseMigrationsMongoToCosmosDbRUMongoDeleteResponse,
      OperationState<DatabaseMigrationsMongoToCosmosDbRUMongoDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete Database Migration resource.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param targetResourceName The name of the target resource/account.
   * @param migrationName Name of the migration.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
  ): Promise<DatabaseMigrationsMongoToCosmosDbRUMongoDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      targetResourceName,
      migrationName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Get Database Migration resources for the scope.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param targetResourceName The name of the target resource/account.
   * @param options The options parameters.
   */
  private _getForScope(
    resourceGroupName: string,
    targetResourceName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOptionalParams,
  ): Promise<DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, targetResourceName, options },
      getForScopeOperationSpec,
    );
  }

  /**
   * GetForScopeNext
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param targetResourceName The name of the target resource/account.
   * @param nextLink The nextLink from the previous successful call to the GetForScope method.
   * @param options The options parameters.
   */
  private _getForScopeNext(
    resourceGroupName: string,
    targetResourceName: string,
    nextLink: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeNextOptionalParams,
  ): Promise<DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, targetResourceName, nextLink, options },
      getForScopeNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatabaseMigrationCosmosDbMongo,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.targetResourceName,
    Parameters.migrationName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DatabaseMigrationCosmosDbMongo,
    },
    201: {
      bodyMapper: Mappers.DatabaseMigrationCosmosDbMongo,
    },
    202: {
      bodyMapper: Mappers.DatabaseMigrationCosmosDbMongo,
    },
    204: {
      bodyMapper: Mappers.DatabaseMigrationCosmosDbMongo,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.targetResourceName,
    Parameters.migrationName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations/{migrationName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper:
        Mappers.DatabaseMigrationsMongoToCosmosDbRUMongoDeleteHeaders,
    },
    201: {
      headersMapper:
        Mappers.DatabaseMigrationsMongoToCosmosDbRUMongoDeleteHeaders,
    },
    202: {
      headersMapper:
        Mappers.DatabaseMigrationsMongoToCosmosDbRUMongoDeleteHeaders,
    },
    204: {
      headersMapper:
        Mappers.DatabaseMigrationsMongoToCosmosDbRUMongoDeleteHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.force],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.targetResourceName,
    Parameters.migrationName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getForScopeOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{targetResourceName}/providers/Microsoft.DataMigration/databaseMigrations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatabaseMigrationCosmosDbMongoListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.targetResourceName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getForScopeNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatabaseMigrationCosmosDbMongoListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.targetResourceName,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
