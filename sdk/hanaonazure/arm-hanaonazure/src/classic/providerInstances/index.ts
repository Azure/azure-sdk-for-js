// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HanaManagementContext } from "../../api/hanaManagementContext.js";
import { list, $delete, create, get } from "../../api/providerInstances/operations.js";
import type {
  ProviderInstancesListOptionalParams,
  ProviderInstancesDeleteOptionalParams,
  ProviderInstancesCreateOptionalParams,
  ProviderInstancesGetOptionalParams,
} from "../../api/providerInstances/options.js";
import type { ProviderInstance } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProviderInstances operations. */
export interface ProviderInstancesOperations {
  /** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
  list: (
    resourceGroupName: string,
    sapMonitorName: string,
    options?: ProviderInstancesListOptionalParams,
  ) => PagedAsyncIterableIterator<ProviderInstance>;
  /** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
  delete: (
    resourceGroupName: string,
    sapMonitorName: string,
    providerInstanceName: string,
    options?: ProviderInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sapMonitorName: string,
    providerInstanceName: string,
    options?: ProviderInstancesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sapMonitorName: string,
    providerInstanceName: string,
    options?: ProviderInstancesDeleteOptionalParams,
  ) => Promise<void>;
  /** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
  create: (
    resourceGroupName: string,
    sapMonitorName: string,
    providerInstanceName: string,
    providerInstanceParameter: ProviderInstance,
    options?: ProviderInstancesCreateOptionalParams,
  ) => PollerLike<OperationState<ProviderInstance>, ProviderInstance>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    sapMonitorName: string,
    providerInstanceName: string,
    providerInstanceParameter: ProviderInstance,
    options?: ProviderInstancesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ProviderInstance>, ProviderInstance>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    sapMonitorName: string,
    providerInstanceName: string,
    providerInstanceParameter: ProviderInstance,
    options?: ProviderInstancesCreateOptionalParams,
  ) => Promise<ProviderInstance>;
  /** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
  get: (
    resourceGroupName: string,
    sapMonitorName: string,
    providerInstanceName: string,
    options?: ProviderInstancesGetOptionalParams,
  ) => Promise<ProviderInstance>;
}

function _getProviderInstances(context: HanaManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      sapMonitorName: string,
      options?: ProviderInstancesListOptionalParams,
    ) => list(context, resourceGroupName, sapMonitorName, options),
    delete: (
      resourceGroupName: string,
      sapMonitorName: string,
      providerInstanceName: string,
      options?: ProviderInstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sapMonitorName, providerInstanceName, options),
    beginDelete: async (
      resourceGroupName: string,
      sapMonitorName: string,
      providerInstanceName: string,
      options?: ProviderInstancesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        sapMonitorName,
        providerInstanceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sapMonitorName: string,
      providerInstanceName: string,
      options?: ProviderInstancesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        sapMonitorName,
        providerInstanceName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      sapMonitorName: string,
      providerInstanceName: string,
      providerInstanceParameter: ProviderInstance,
      options?: ProviderInstancesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        sapMonitorName,
        providerInstanceName,
        providerInstanceParameter,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      sapMonitorName: string,
      providerInstanceName: string,
      providerInstanceParameter: ProviderInstance,
      options?: ProviderInstancesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        sapMonitorName,
        providerInstanceName,
        providerInstanceParameter,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      sapMonitorName: string,
      providerInstanceName: string,
      providerInstanceParameter: ProviderInstance,
      options?: ProviderInstancesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        sapMonitorName,
        providerInstanceName,
        providerInstanceParameter,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      sapMonitorName: string,
      providerInstanceName: string,
      options?: ProviderInstancesGetOptionalParams,
    ) => get(context, resourceGroupName, sapMonitorName, providerInstanceName, options),
  };
}

export function _getProviderInstancesOperations(
  context: HanaManagementContext,
): ProviderInstancesOperations {
  return {
    ..._getProviderInstances(context),
  };
}
