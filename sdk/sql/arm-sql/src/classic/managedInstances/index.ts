// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByInstancePool,
  validateAzureKeyVaultEncryptionKey,
  listByManagedInstance,
  stop,
  start,
  refreshStatus,
  reevaluateInaccessibleDatabaseState,
  listOutboundNetworkDependenciesByManagedInstance,
  failover,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedInstances/operations.js";
import type {
  ManagedInstancesListByInstancePoolOptionalParams,
  ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams,
  ManagedInstancesListByManagedInstanceOptionalParams,
  ManagedInstancesStopOptionalParams,
  ManagedInstancesStartOptionalParams,
  ManagedInstancesRefreshStatusOptionalParams,
  ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams,
  ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOptionalParams,
  ManagedInstancesFailoverOptionalParams,
  ManagedInstancesListOptionalParams,
  ManagedInstancesListByResourceGroupOptionalParams,
  ManagedInstancesDeleteOptionalParams,
  ManagedInstancesUpdateOptionalParams,
  ManagedInstancesCreateOrUpdateOptionalParams,
  ManagedInstancesGetOptionalParams,
} from "../../api/managedInstances/options.js";
import type {
  ManagedInstance,
  ManagedInstanceUpdate,
  OutboundEnvironmentEndpoint,
  RefreshExternalGovernanceStatusOperationResultMI,
  TopQueries,
  ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstances operations. */
export interface ManagedInstancesOperations {
  /** Gets a list of all managed instances in an instance pool. */
  listByInstancePool: (
    resourceGroupName: string,
    instancePoolName: string,
    options?: ManagedInstancesListByInstancePoolOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstance>;
  /** Validates customer managed key. */
  validateAzureKeyVaultEncryptionKey: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
    options?: ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use validateAzureKeyVaultEncryptionKey instead */
  beginValidateAzureKeyVaultEncryptionKey: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
    options?: ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use validateAzureKeyVaultEncryptionKey instead */
  beginValidateAzureKeyVaultEncryptionKeyAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
    options?: ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams,
  ) => Promise<void>;
  /** Get top resource consuming queries of a managed instance. */
  listByManagedInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesListByManagedInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<TopQueries>;
  /** Stops the managed instance. */
  stop: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesStopOptionalParams,
  ) => PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedInstance>, ManagedInstance>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesStopOptionalParams,
  ) => Promise<ManagedInstance>;
  /** Starts the managed instance. */
  start: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesStartOptionalParams,
  ) => PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedInstance>, ManagedInstance>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesStartOptionalParams,
  ) => Promise<ManagedInstance>;
  /** Refresh external governance enablement status. */
  refreshStatus: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesRefreshStatusOptionalParams,
  ) => PollerLike<
    OperationState<RefreshExternalGovernanceStatusOperationResultMI>,
    RefreshExternalGovernanceStatusOperationResultMI
  >;
  /** @deprecated use refreshStatus instead */
  beginRefreshStatus: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesRefreshStatusOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<RefreshExternalGovernanceStatusOperationResultMI>,
      RefreshExternalGovernanceStatusOperationResultMI
    >
  >;
  /** @deprecated use refreshStatus instead */
  beginRefreshStatusAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesRefreshStatusOptionalParams,
  ) => Promise<RefreshExternalGovernanceStatusOperationResultMI>;
  /** Reevaluates the inaccessibility state of all managed databases. */
  reevaluateInaccessibleDatabaseState: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reevaluateInaccessibleDatabaseState instead */
  beginReevaluateInaccessibleDatabaseState: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reevaluateInaccessibleDatabaseState instead */
  beginReevaluateInaccessibleDatabaseStateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams,
  ) => Promise<void>;
  /** Gets the collection of outbound network dependencies for the given managed instance. */
  listOutboundNetworkDependenciesByManagedInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundEnvironmentEndpoint>;
  /** Failovers a managed instance. */
  failover: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesFailoverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesFailoverOptionalParams,
  ) => Promise<void>;
  /** Gets a list of all managed instances in the subscription. */
  list: (
    options?: ManagedInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstance>;
  /** Gets a list of managed instances in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ManagedInstancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstance>;
  /** Deletes a managed instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a managed instance. */
  update: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: ManagedInstanceUpdate,
    options?: ManagedInstancesUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: ManagedInstanceUpdate,
    options?: ManagedInstancesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedInstance>, ManagedInstance>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: ManagedInstanceUpdate,
    options?: ManagedInstancesUpdateOptionalParams,
  ) => Promise<ManagedInstance>;
  /** Creates or updates a managed instance. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: ManagedInstance,
    options?: ManagedInstancesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: ManagedInstance,
    options?: ManagedInstancesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedInstance>, ManagedInstance>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    parameters: ManagedInstance,
    options?: ManagedInstancesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedInstance>;
  /** Gets a managed instance. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancesGetOptionalParams,
  ) => Promise<ManagedInstance>;
}

function _getManagedInstances(context: SqlContext) {
  return {
    listByInstancePool: (
      resourceGroupName: string,
      instancePoolName: string,
      options?: ManagedInstancesListByInstancePoolOptionalParams,
    ) => listByInstancePool(context, resourceGroupName, instancePoolName, options),
    validateAzureKeyVaultEncryptionKey: (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
      options?: ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams,
    ) =>
      validateAzureKeyVaultEncryptionKey(
        context,
        resourceGroupName,
        managedInstanceName,
        parameters,
        options,
      ),
    beginValidateAzureKeyVaultEncryptionKey: async (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
      options?: ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams,
    ) => {
      const poller = validateAzureKeyVaultEncryptionKey(
        context,
        resourceGroupName,
        managedInstanceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateAzureKeyVaultEncryptionKeyAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
      options?: ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams,
    ) => {
      return await validateAzureKeyVaultEncryptionKey(
        context,
        resourceGroupName,
        managedInstanceName,
        parameters,
        options,
      );
    },
    listByManagedInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesListByManagedInstanceOptionalParams,
    ) => listByManagedInstance(context, resourceGroupName, managedInstanceName, options),
    stop: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesStopOptionalParams,
    ) => stop(context, resourceGroupName, managedInstanceName, options),
    beginStop: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, managedInstanceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, managedInstanceName, options);
    },
    start: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesStartOptionalParams,
    ) => start(context, resourceGroupName, managedInstanceName, options),
    beginStart: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, managedInstanceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, managedInstanceName, options);
    },
    refreshStatus: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesRefreshStatusOptionalParams,
    ) => refreshStatus(context, resourceGroupName, managedInstanceName, options),
    beginRefreshStatus: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesRefreshStatusOptionalParams,
    ) => {
      const poller = refreshStatus(context, resourceGroupName, managedInstanceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshStatusAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesRefreshStatusOptionalParams,
    ) => {
      return await refreshStatus(context, resourceGroupName, managedInstanceName, options);
    },
    reevaluateInaccessibleDatabaseState: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams,
    ) =>
      reevaluateInaccessibleDatabaseState(context, resourceGroupName, managedInstanceName, options),
    beginReevaluateInaccessibleDatabaseState: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams,
    ) => {
      const poller = reevaluateInaccessibleDatabaseState(
        context,
        resourceGroupName,
        managedInstanceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReevaluateInaccessibleDatabaseStateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams,
    ) => {
      return await reevaluateInaccessibleDatabaseState(
        context,
        resourceGroupName,
        managedInstanceName,
        options,
      );
    },
    listOutboundNetworkDependenciesByManagedInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOptionalParams,
    ) =>
      listOutboundNetworkDependenciesByManagedInstance(
        context,
        resourceGroupName,
        managedInstanceName,
        options,
      ),
    failover: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesFailoverOptionalParams,
    ) => failover(context, resourceGroupName, managedInstanceName, options),
    beginFailover: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, managedInstanceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, managedInstanceName, options);
    },
    list: (options?: ManagedInstancesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ManagedInstancesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, managedInstanceName, options),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, managedInstanceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, managedInstanceName, options);
    },
    update: (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: ManagedInstanceUpdate,
      options?: ManagedInstancesUpdateOptionalParams,
    ) => update(context, resourceGroupName, managedInstanceName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: ManagedInstanceUpdate,
      options?: ManagedInstancesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, managedInstanceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: ManagedInstanceUpdate,
      options?: ManagedInstancesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, managedInstanceName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: ManagedInstance,
      options?: ManagedInstancesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, managedInstanceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: ManagedInstance,
      options?: ManagedInstancesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      parameters: ManagedInstance,
      options?: ManagedInstancesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, options),
  };
}

export function _getManagedInstancesOperations(context: SqlContext): ManagedInstancesOperations {
  return {
    ..._getManagedInstances(context),
  };
}
