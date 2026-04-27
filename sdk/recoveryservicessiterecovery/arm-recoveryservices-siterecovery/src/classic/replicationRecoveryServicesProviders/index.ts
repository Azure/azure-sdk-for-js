// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  list,
  $delete,
  refreshProvider,
  listByReplicationFabrics,
  purge,
  create,
  get,
} from "../../api/replicationRecoveryServicesProviders/operations.js";
import type {
  ReplicationRecoveryServicesProvidersListOptionalParams,
  ReplicationRecoveryServicesProvidersDeleteOptionalParams,
  ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams,
  ReplicationRecoveryServicesProvidersListByReplicationFabricsOptionalParams,
  ReplicationRecoveryServicesProvidersPurgeOptionalParams,
  ReplicationRecoveryServicesProvidersCreateOptionalParams,
  ReplicationRecoveryServicesProvidersGetOptionalParams,
} from "../../api/replicationRecoveryServicesProviders/options.js";
import type {
  RecoveryServicesProvider,
  AddRecoveryServicesProviderInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationRecoveryServicesProviders operations. */
export interface ReplicationRecoveryServicesProvidersOperations {
  /** Lists the registered recovery services providers in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationRecoveryServicesProvidersListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryServicesProvider>;
  /** The operation to removes/delete(unregister) a recovery services provider from the vault. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to refresh the information from the recovery services provider. */
  refreshProvider: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams,
  ) => PollerLike<OperationState<RecoveryServicesProvider>, RecoveryServicesProvider>;
  /** @deprecated use refreshProvider instead */
  beginRefreshProvider: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<RecoveryServicesProvider>, RecoveryServicesProvider>
  >;
  /** @deprecated use refreshProvider instead */
  beginRefreshProviderAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams,
  ) => Promise<RecoveryServicesProvider>;
  /** Lists the registered recovery services providers for the specified fabric. */
  listByReplicationFabrics: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationRecoveryServicesProvidersListByReplicationFabricsOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryServicesProvider>;
  /** The operation to purge(force delete) a recovery services provider from the vault. */
  purge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purge instead */
  beginPurge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersPurgeOptionalParams,
  ) => Promise<void>;
  /** The operation to add a recovery services provider. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    addProviderInput: AddRecoveryServicesProviderInput,
    options?: ReplicationRecoveryServicesProvidersCreateOptionalParams,
  ) => PollerLike<OperationState<RecoveryServicesProvider>, RecoveryServicesProvider>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    addProviderInput: AddRecoveryServicesProviderInput,
    options?: ReplicationRecoveryServicesProvidersCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<RecoveryServicesProvider>, RecoveryServicesProvider>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    addProviderInput: AddRecoveryServicesProviderInput,
    options?: ReplicationRecoveryServicesProvidersCreateOptionalParams,
  ) => Promise<RecoveryServicesProvider>;
  /** Gets the details of registered recovery services provider. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    providerName: string,
    options?: ReplicationRecoveryServicesProvidersGetOptionalParams,
  ) => Promise<RecoveryServicesProvider>;
}

function _getReplicationRecoveryServicesProviders(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationRecoveryServicesProvidersListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, fabricName, providerName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        options,
      );
    },
    refreshProvider: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams,
    ) =>
      refreshProvider(context, resourceGroupName, resourceName, fabricName, providerName, options),
    beginRefreshProvider: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams,
    ) => {
      const poller = refreshProvider(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshProviderAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams,
    ) => {
      return await refreshProvider(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        options,
      );
    },
    listByReplicationFabrics: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationRecoveryServicesProvidersListByReplicationFabricsOptionalParams,
    ) => listByReplicationFabrics(context, resourceGroupName, resourceName, fabricName, options),
    purge: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersPurgeOptionalParams,
    ) => purge(context, resourceGroupName, resourceName, fabricName, providerName, options),
    beginPurge: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersPurgeOptionalParams,
    ) => {
      const poller = purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersPurgeOptionalParams,
    ) => {
      return await purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      addProviderInput: AddRecoveryServicesProviderInput,
      options?: ReplicationRecoveryServicesProvidersCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        addProviderInput,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      addProviderInput: AddRecoveryServicesProviderInput,
      options?: ReplicationRecoveryServicesProvidersCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        addProviderInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      addProviderInput: AddRecoveryServicesProviderInput,
      options?: ReplicationRecoveryServicesProvidersCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        addProviderInput,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      providerName: string,
      options?: ReplicationRecoveryServicesProvidersGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, fabricName, providerName, options),
  };
}

export function _getReplicationRecoveryServicesProvidersOperations(
  context: SiteRecoveryManagementContext,
): ReplicationRecoveryServicesProvidersOperations {
  return {
    ..._getReplicationRecoveryServicesProviders(context),
  };
}
