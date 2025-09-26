// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  action,
  changeDisasterRecoveryConfiguration,
  shrink,
  restore,
  generateWallet,
  failover,
  switchover,
  listByResourceGroup,
  update,
  $delete,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/autonomousDatabases/operations.js";
import type {
  AutonomousDatabasesActionOptionalParams,
  AutonomousDatabasesChangeDisasterRecoveryConfigurationOptionalParams,
  AutonomousDatabasesShrinkOptionalParams,
  AutonomousDatabasesRestoreOptionalParams,
  AutonomousDatabasesGenerateWalletOptionalParams,
  AutonomousDatabasesFailoverOptionalParams,
  AutonomousDatabasesSwitchoverOptionalParams,
  AutonomousDatabasesListByResourceGroupOptionalParams,
  AutonomousDatabasesUpdateOptionalParams,
  AutonomousDatabasesDeleteOptionalParams,
  AutonomousDatabasesGetOptionalParams,
  AutonomousDatabasesCreateOrUpdateOptionalParams,
  AutonomousDatabasesListBySubscriptionOptionalParams,
} from "../../api/autonomousDatabases/options.js";
import type {
  AutonomousDatabase,
  DisasterRecoveryConfigurationDetails,
  AutonomousDatabaseUpdate,
  PeerDbDetails,
  GenerateAutonomousDatabaseWalletDetails,
  AutonomousDatabaseWalletFile,
  RestoreAutonomousDatabaseDetails,
  AutonomousDatabaseLifecycleAction,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AutonomousDatabases operations. */
export interface AutonomousDatabasesOperations {
  /** Perform Lifecycle Management Action on Autonomous Database */
  action: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    body: AutonomousDatabaseLifecycleAction,
    options?: AutonomousDatabasesActionOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
  /** Perform ChangeDisasterRecoveryConfiguration action on Autonomous Database */
  changeDisasterRecoveryConfiguration: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    body: DisasterRecoveryConfigurationDetails,
    options?: AutonomousDatabasesChangeDisasterRecoveryConfigurationOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
  /** This operation shrinks the current allocated storage down to the current actual used data storage. */
  shrink: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    options?: AutonomousDatabasesShrinkOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
  /** Restores an Autonomous Database based on the provided request parameters. */
  restore: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    body: RestoreAutonomousDatabaseDetails,
    options?: AutonomousDatabasesRestoreOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
  /** Generate wallet action on Autonomous Database */
  generateWallet: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    body: GenerateAutonomousDatabaseWalletDetails,
    options?: AutonomousDatabasesGenerateWalletOptionalParams,
  ) => Promise<AutonomousDatabaseWalletFile>;
  /** Perform failover action on Autonomous Database */
  failover: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    body: PeerDbDetails,
    options?: AutonomousDatabasesFailoverOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
  /** Perform switchover action on Autonomous Database */
  switchover: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    body: PeerDbDetails,
    options?: AutonomousDatabasesSwitchoverOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
  /** List AutonomousDatabase resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AutonomousDatabasesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AutonomousDatabase>;
  /** Update a AutonomousDatabase */
  update: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    properties: AutonomousDatabaseUpdate,
    options?: AutonomousDatabasesUpdateOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
  /** Delete a AutonomousDatabase */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    options?: AutonomousDatabasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a AutonomousDatabase */
  get: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    options?: AutonomousDatabasesGetOptionalParams,
  ) => Promise<AutonomousDatabase>;
  /** Create a AutonomousDatabase */
  createOrUpdate: (
    resourceGroupName: string,
    autonomousdatabasename: string,
    resource: AutonomousDatabase,
    options?: AutonomousDatabasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AutonomousDatabase>, AutonomousDatabase>;
  /** List AutonomousDatabase resources by subscription ID */
  listBySubscription: (
    options?: AutonomousDatabasesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AutonomousDatabase>;
}

function _getAutonomousDatabases(context: OracleDatabaseManagementContext) {
  return {
    action: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      body: AutonomousDatabaseLifecycleAction,
      options?: AutonomousDatabasesActionOptionalParams,
    ) => action(context, resourceGroupName, autonomousdatabasename, body, options),
    changeDisasterRecoveryConfiguration: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      body: DisasterRecoveryConfigurationDetails,
      options?: AutonomousDatabasesChangeDisasterRecoveryConfigurationOptionalParams,
    ) =>
      changeDisasterRecoveryConfiguration(
        context,
        resourceGroupName,
        autonomousdatabasename,
        body,
        options,
      ),
    shrink: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      options?: AutonomousDatabasesShrinkOptionalParams,
    ) => shrink(context, resourceGroupName, autonomousdatabasename, options),
    restore: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      body: RestoreAutonomousDatabaseDetails,
      options?: AutonomousDatabasesRestoreOptionalParams,
    ) => restore(context, resourceGroupName, autonomousdatabasename, body, options),
    generateWallet: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      body: GenerateAutonomousDatabaseWalletDetails,
      options?: AutonomousDatabasesGenerateWalletOptionalParams,
    ) => generateWallet(context, resourceGroupName, autonomousdatabasename, body, options),
    failover: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      body: PeerDbDetails,
      options?: AutonomousDatabasesFailoverOptionalParams,
    ) => failover(context, resourceGroupName, autonomousdatabasename, body, options),
    switchover: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      body: PeerDbDetails,
      options?: AutonomousDatabasesSwitchoverOptionalParams,
    ) => switchover(context, resourceGroupName, autonomousdatabasename, body, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AutonomousDatabasesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      properties: AutonomousDatabaseUpdate,
      options?: AutonomousDatabasesUpdateOptionalParams,
    ) => update(context, resourceGroupName, autonomousdatabasename, properties, options),
    delete: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      options?: AutonomousDatabasesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, autonomousdatabasename, options),
    get: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      options?: AutonomousDatabasesGetOptionalParams,
    ) => get(context, resourceGroupName, autonomousdatabasename, options),
    createOrUpdate: (
      resourceGroupName: string,
      autonomousdatabasename: string,
      resource: AutonomousDatabase,
      options?: AutonomousDatabasesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, autonomousdatabasename, resource, options),
    listBySubscription: (options?: AutonomousDatabasesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getAutonomousDatabasesOperations(
  context: OracleDatabaseManagementContext,
): AutonomousDatabasesOperations {
  return {
    ..._getAutonomousDatabases(context),
  };
}
