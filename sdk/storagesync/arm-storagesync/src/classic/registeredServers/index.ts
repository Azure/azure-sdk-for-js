// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import {
  triggerRollover,
  listByStorageSyncService,
  $delete,
  update,
  create,
  get,
} from "../../api/registeredServers/operations.js";
import {
  RegisteredServersTriggerRolloverOptionalParams,
  RegisteredServersListByStorageSyncServiceOptionalParams,
  RegisteredServersDeleteOptionalParams,
  RegisteredServersUpdateOptionalParams,
  RegisteredServersCreateOptionalParams,
  RegisteredServersGetOptionalParams,
} from "../../api/registeredServers/options.js";
import {
  RegisteredServer,
  RegisteredServerCreateParameters,
  RegisteredServerUpdateParameters,
  TriggerRolloverRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use triggerRollover instead */
  beginTriggerRollover: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: TriggerRolloverRequest,
    options?: RegisteredServersTriggerRolloverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use triggerRollover instead */
  beginTriggerRolloverAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: TriggerRolloverRequest,
    options?: RegisteredServersTriggerRolloverOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    options?: RegisteredServersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    options?: RegisteredServersDeleteOptionalParams,
  ) => Promise<void>;
  /** Update registered server. */
  update: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: RegisteredServerUpdateParameters,
    options?: RegisteredServersUpdateOptionalParams,
  ) => PollerLike<OperationState<RegisteredServer>, RegisteredServer>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: RegisteredServerUpdateParameters,
    options?: RegisteredServersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RegisteredServer>, RegisteredServer>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: RegisteredServerUpdateParameters,
    options?: RegisteredServersUpdateOptionalParams,
  ) => Promise<RegisteredServer>;
  /** Add a new registered server. */
  create: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: RegisteredServerCreateParameters,
    options?: RegisteredServersCreateOptionalParams,
  ) => PollerLike<OperationState<RegisteredServer>, RegisteredServer>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: RegisteredServerCreateParameters,
    options?: RegisteredServersCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RegisteredServer>, RegisteredServer>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    serverId: string,
    parameters: RegisteredServerCreateParameters,
    options?: RegisteredServersCreateOptionalParams,
  ) => Promise<RegisteredServer>;
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
    beginTriggerRollover: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: TriggerRolloverRequest,
      options?: RegisteredServersTriggerRolloverOptionalParams,
    ) => {
      const poller = triggerRollover(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTriggerRolloverAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: TriggerRolloverRequest,
      options?: RegisteredServersTriggerRolloverOptionalParams,
    ) => {
      return await triggerRollover(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      options?: RegisteredServersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, storageSyncServiceName, serverId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      options?: RegisteredServersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, storageSyncServiceName, serverId, options);
    },
    update: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: RegisteredServerUpdateParameters,
      options?: RegisteredServersUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageSyncServiceName, serverId, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: RegisteredServerUpdateParameters,
      options?: RegisteredServersUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: RegisteredServerUpdateParameters,
      options?: RegisteredServersUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: RegisteredServerCreateParameters,
      options?: RegisteredServersCreateOptionalParams,
    ) => create(context, resourceGroupName, storageSyncServiceName, serverId, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: RegisteredServerCreateParameters,
      options?: RegisteredServersCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      serverId: string,
      parameters: RegisteredServerCreateParameters,
      options?: RegisteredServersCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        serverId,
        parameters,
        options,
      );
    },
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
