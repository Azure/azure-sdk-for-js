// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
import {
  revert,
  completeMigration,
  list,
  $delete,
  createAndStartMigration,
  get,
} from "../../api/migrationConfigs/operations.js";
import type {
  MigrationConfigsRevertOptionalParams,
  MigrationConfigsCompleteMigrationOptionalParams,
  MigrationConfigsListOptionalParams,
  MigrationConfigsDeleteOptionalParams,
  MigrationConfigsCreateAndStartMigrationOptionalParams,
  MigrationConfigsGetOptionalParams,
} from "../../api/migrationConfigs/options.js";
import type { MigrationConfigProperties, MigrationConfigurationName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MigrationConfigs operations. */
export interface MigrationConfigsOperations {
  /** This operation reverts Migration */
  revert: (
    resourceGroupName: string,
    namespaceName: string,
    configName: MigrationConfigurationName,
    options?: MigrationConfigsRevertOptionalParams,
  ) => Promise<void>;
  /** This operation Completes Migration of entities by pointing the connection strings to Premium namespace and any entities created after the operation will be under Premium Namespace. CompleteMigration operation will fail when entity migration is in-progress. */
  completeMigration: (
    resourceGroupName: string,
    namespaceName: string,
    configName: MigrationConfigurationName,
    options?: MigrationConfigsCompleteMigrationOptionalParams,
  ) => Promise<void>;
  /** Gets all migrationConfigurations */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: MigrationConfigsListOptionalParams,
  ) => PagedAsyncIterableIterator<MigrationConfigProperties>;
  /** Deletes a MigrationConfiguration */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    configName: MigrationConfigurationName,
    options?: MigrationConfigsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates Migration configuration and starts migration of entities from Standard to Premium namespace */
  createAndStartMigration: (
    resourceGroupName: string,
    namespaceName: string,
    configName: MigrationConfigurationName,
    parameters: MigrationConfigProperties,
    options?: MigrationConfigsCreateAndStartMigrationOptionalParams,
  ) => PollerLike<OperationState<MigrationConfigProperties>, MigrationConfigProperties>;
  /** Retrieves Migration Config */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    configName: MigrationConfigurationName,
    options?: MigrationConfigsGetOptionalParams,
  ) => Promise<MigrationConfigProperties>;
}

function _getMigrationConfigs(context: ServiceBusManagementContext) {
  return {
    revert: (
      resourceGroupName: string,
      namespaceName: string,
      configName: MigrationConfigurationName,
      options?: MigrationConfigsRevertOptionalParams,
    ) => revert(context, resourceGroupName, namespaceName, configName, options),
    completeMigration: (
      resourceGroupName: string,
      namespaceName: string,
      configName: MigrationConfigurationName,
      options?: MigrationConfigsCompleteMigrationOptionalParams,
    ) => completeMigration(context, resourceGroupName, namespaceName, configName, options),
    list: (
      resourceGroupName: string,
      namespaceName: string,
      options?: MigrationConfigsListOptionalParams,
    ) => list(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      configName: MigrationConfigurationName,
      options?: MigrationConfigsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, configName, options),
    createAndStartMigration: (
      resourceGroupName: string,
      namespaceName: string,
      configName: MigrationConfigurationName,
      parameters: MigrationConfigProperties,
      options?: MigrationConfigsCreateAndStartMigrationOptionalParams,
    ) =>
      createAndStartMigration(
        context,
        resourceGroupName,
        namespaceName,
        configName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      configName: MigrationConfigurationName,
      options?: MigrationConfigsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, configName, options),
  };
}

export function _getMigrationConfigsOperations(
  context: ServiceBusManagementContext,
): MigrationConfigsOperations {
  return {
    ..._getMigrationConfigs(context),
  };
}
