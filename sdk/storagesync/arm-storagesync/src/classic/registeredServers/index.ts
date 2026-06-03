// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import {
  triggerRollover,
  listByStorageSyncService,
  $delete,
  update,
  create,
  get,
} from "../../api/registeredServers/operations.js";
import type {
  RegisteredServersTriggerRolloverOptionalParams,
  RegisteredServersListByStorageSyncServiceOptionalParams,
  RegisteredServersDeleteOptionalParams,
  RegisteredServersUpdateOptionalParams,
  RegisteredServersCreateOptionalParams,
  RegisteredServersGetOptionalParams,
} from "../../api/registeredServers/options.js";
import type {
  RegisteredServer,
  RegisteredServerCreateParameters,
  RegisteredServerUpdateParameters,
  TriggerRolloverRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegisteredServers operations. */
export interface RegisteredServersOperations {
  /** Triggers Server certificate rollover. */
  triggerRollover: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: TriggerRolloverRequest,
    options?: RegisteredServersTriggerRolloverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a given registered server list. */
  listByStorageSyncService: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: RegisteredServersListByStorageSyncServiceOptionalParams,
  ) => PagedAsyncIterableIterator<RegisteredServer>;
  /** Delete the given registered server. */
  delete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    options?: RegisteredServersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update registered server. */
  update: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: RegisteredServerUpdateParameters,
    options?: RegisteredServersUpdateOptionalParams,
  ) => PollerLike<OperationState<RegisteredServer>, RegisteredServer>;
  /** Add a new registered server. */
  create: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: RegisteredServerCreateParameters,
    options?: RegisteredServersCreateOptionalParams,
  ) => PollerLike<OperationState<RegisteredServer>, RegisteredServer>;
  /** Get a given registered server. */
  get: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    options?: RegisteredServersGetOptionalParams,
  ) => Promise<RegisteredServer>;
}

function _getRegisteredServers(context: MicrosoftStorageSyncContext) {
  return {
    triggerRollover: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: TriggerRolloverRequest,
      options?: RegisteredServersTriggerRolloverOptionalParams,
    ) =>
      triggerRollover(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      ),
    listByStorageSyncService: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: RegisteredServersListByStorageSyncServiceOptionalParams,
    ) => listByStorageSyncService(context, resourceGroupName, storageSyncServiceName, options),
    delete: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      options?: RegisteredServersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageSyncServiceName, serverId, options),
    update: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: RegisteredServerUpdateParameters,
      options?: RegisteredServersUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageSyncServiceName, serverId, parameters, options),
    create: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: RegisteredServerCreateParameters,
      options?: RegisteredServersCreateOptionalParams,
    ) => create(context, resourceGroupName, storageSyncServiceName, serverId, parameters, options),
    get: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      options?: RegisteredServersGetOptionalParams,
    ) => get(context, resourceGroupName, storageSyncServiceName, serverId, options),
  };
}

export function _getRegisteredServersOperations(
  context: MicrosoftStorageSyncContext,
): RegisteredServersOperations {
  return {
    ..._getRegisteredServers(context),
  };
}
