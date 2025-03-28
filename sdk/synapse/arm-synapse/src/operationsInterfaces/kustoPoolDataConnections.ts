/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  DataConnectionUnion,
  KustoPoolDataConnectionsListByDatabaseOptionalParams,
  DataConnectionCheckNameRequest,
  KustoPoolDataConnectionsCheckNameAvailabilityOptionalParams,
  KustoPoolDataConnectionsCheckNameAvailabilityResponse,
  DataConnectionValidation,
  KustoPoolDataConnectionsDataConnectionValidationOptionalParams,
  KustoPoolDataConnectionsDataConnectionValidationResponse,
  KustoPoolDataConnectionsGetOptionalParams,
  KustoPoolDataConnectionsGetResponse,
  KustoPoolDataConnectionsCreateOrUpdateOptionalParams,
  KustoPoolDataConnectionsCreateOrUpdateResponse,
  KustoPoolDataConnectionsUpdateOptionalParams,
  KustoPoolDataConnectionsUpdateResponse,
  KustoPoolDataConnectionsDeleteOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a KustoPoolDataConnections. */
export interface KustoPoolDataConnections {
  /**
   * Returns the list of data connections of the given Kusto pool database.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param options The options parameters.
   */
  listByDatabase(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    options?: KustoPoolDataConnectionsListByDatabaseOptionalParams
  ): PagedAsyncIterableIterator<DataConnectionUnion>;
  /**
   * Checks that the data connection name is valid and is not already in use.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param dataConnectionName The name of the data connection.
   * @param options The options parameters.
   */
  checkNameAvailability(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    dataConnectionName: DataConnectionCheckNameRequest,
    options?: KustoPoolDataConnectionsCheckNameAvailabilityOptionalParams
  ): Promise<KustoPoolDataConnectionsCheckNameAvailabilityResponse>;
  /**
   * Checks that the data connection parameters are valid.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param parameters The data connection parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  beginDataConnectionValidation(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    parameters: DataConnectionValidation,
    options?: KustoPoolDataConnectionsDataConnectionValidationOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<
        KustoPoolDataConnectionsDataConnectionValidationResponse
      >,
      KustoPoolDataConnectionsDataConnectionValidationResponse
    >
  >;
  /**
   * Checks that the data connection parameters are valid.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param parameters The data connection parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  beginDataConnectionValidationAndWait(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    parameters: DataConnectionValidation,
    options?: KustoPoolDataConnectionsDataConnectionValidationOptionalParams
  ): Promise<KustoPoolDataConnectionsDataConnectionValidationResponse>;
  /**
   * Returns a data connection.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param dataConnectionName The name of the data connection.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    dataConnectionName: string,
    options?: KustoPoolDataConnectionsGetOptionalParams
  ): Promise<KustoPoolDataConnectionsGetResponse>;
  /**
   * Creates or updates a data connection.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param dataConnectionName The name of the data connection.
   * @param parameters The data connection parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: KustoPoolDataConnectionsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<KustoPoolDataConnectionsCreateOrUpdateResponse>,
      KustoPoolDataConnectionsCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a data connection.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param dataConnectionName The name of the data connection.
   * @param parameters The data connection parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: KustoPoolDataConnectionsCreateOrUpdateOptionalParams
  ): Promise<KustoPoolDataConnectionsCreateOrUpdateResponse>;
  /**
   * Updates a data connection.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param dataConnectionName The name of the data connection.
   * @param parameters The data connection parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: KustoPoolDataConnectionsUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<KustoPoolDataConnectionsUpdateResponse>,
      KustoPoolDataConnectionsUpdateResponse
    >
  >;
  /**
   * Updates a data connection.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param dataConnectionName The name of the data connection.
   * @param parameters The data connection parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    dataConnectionName: string,
    parameters: DataConnectionUnion,
    options?: KustoPoolDataConnectionsUpdateOptionalParams
  ): Promise<KustoPoolDataConnectionsUpdateResponse>;
  /**
   * Deletes the data connection with the given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param dataConnectionName The name of the data connection.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    dataConnectionName: string,
    options?: KustoPoolDataConnectionsDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Deletes the data connection with the given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param kustoPoolName The name of the Kusto pool.
   * @param databaseName The name of the database in the Kusto pool.
   * @param dataConnectionName The name of the data connection.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    workspaceName: string,
    kustoPoolName: string,
    databaseName: string,
    dataConnectionName: string,
    options?: KustoPoolDataConnectionsDeleteOptionalParams
  ): Promise<void>;
}
