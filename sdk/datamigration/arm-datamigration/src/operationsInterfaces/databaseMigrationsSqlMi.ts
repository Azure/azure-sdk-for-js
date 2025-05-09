/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  DatabaseMigrationsSqlMiGetOptionalParams,
  DatabaseMigrationsSqlMiGetResponse,
  DatabaseMigrationSqlMi,
  DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams,
  DatabaseMigrationsSqlMiCreateOrUpdateResponse,
  MigrationOperationInput,
  DatabaseMigrationsSqlMiCancelOptionalParams,
  DatabaseMigrationsSqlMiCutoverOptionalParams
} from "../models/index.js";

/** Interface representing a DatabaseMigrationsSqlMi. */
export interface DatabaseMigrationsSqlMi {
  /**
   * Retrieve the Database Migration resource.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName
   * @param targetDbName The name of the target database.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlMiGetOptionalParams
  ): Promise<DatabaseMigrationsSqlMiGetResponse>;
  /**
   * Create or Update Database Migration resource.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName
   * @param targetDbName The name of the target database.
   * @param parameters Details of SqlMigrationService resource.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlMi,
    options?: DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DatabaseMigrationsSqlMiCreateOrUpdateResponse>,
      DatabaseMigrationsSqlMiCreateOrUpdateResponse
    >
  >;
  /**
   * Create or Update Database Migration resource.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName
   * @param targetDbName The name of the target database.
   * @param parameters Details of SqlMigrationService resource.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlMi,
    options?: DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams
  ): Promise<DatabaseMigrationsSqlMiCreateOrUpdateResponse>;
  /**
   * Stop migrations in progress for the database
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName
   * @param targetDbName The name of the target database.
   * @param parameters Required migration operation ID for which cancel will be initiated.
   * @param options The options parameters.
   */
  beginCancel(
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCancelOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Stop migrations in progress for the database
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName
   * @param targetDbName The name of the target database.
   * @param parameters Required migration operation ID for which cancel will be initiated.
   * @param options The options parameters.
   */
  beginCancelAndWait(
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCancelOptionalParams
  ): Promise<void>;
  /**
   * Initiate cutover for online migration in progress for the database.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName
   * @param targetDbName The name of the target database.
   * @param parameters Required migration operation ID for which cutover will be initiated.
   * @param options The options parameters.
   */
  beginCutover(
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCutoverOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Initiate cutover for online migration in progress for the database.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName
   * @param targetDbName The name of the target database.
   * @param parameters Required migration operation ID for which cutover will be initiated.
   * @param options The options parameters.
   */
  beginCutoverAndWait(
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCutoverOptionalParams
  ): Promise<void>;
}
