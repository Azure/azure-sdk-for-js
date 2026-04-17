// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  restart,
  redeploy,
  listAvailableSizes,
  listByHostGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dedicatedHosts/operations.js";
import type {
  DedicatedHostsRestartOptionalParams,
  DedicatedHostsRedeployOptionalParams,
  DedicatedHostsListAvailableSizesOptionalParams,
  DedicatedHostsListByHostGroupOptionalParams,
  DedicatedHostsDeleteOptionalParams,
  DedicatedHostsUpdateOptionalParams,
  DedicatedHostsCreateOrUpdateOptionalParams,
  DedicatedHostsGetOptionalParams,
} from "../../api/dedicatedHosts/options.js";
import type { DedicatedHost, DedicatedHostUpdate } from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DedicatedHosts operations. */
export interface DedicatedHostsOperations {
  /** Restart the dedicated host. The operation will complete successfully once the dedicated host has restarted and is running. To determine the health of VMs deployed on the dedicated host after the restart check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details. */
  restart: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsRestartOptionalParams,
  ) => Promise<void>;
  /** Redeploy the dedicated host. The operation will complete successfully once the dedicated host has migrated to a new node and is running. To determine the health of VMs deployed on the dedicated host after the redeploy check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details. */
  redeploy: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsRedeployOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use redeploy instead */
  beginRedeploy: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsRedeployOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use redeploy instead */
  beginRedeployAndWait: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsRedeployOptionalParams,
  ) => Promise<void>;
  /** Lists all available dedicated host sizes to which the specified dedicated host can be resized. NOTE: The dedicated host sizes provided can be used to only scale up the existing dedicated host. */
  listAvailableSizes: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsListAvailableSizesOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /** Lists all of the dedicated hosts in the specified dedicated host group. Use the nextLink property in the response to get the next page of dedicated hosts. */
  listByHostGroup: (
    resourceGroupName: string,
    hostGroupName: string,
    options?: DedicatedHostsListByHostGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DedicatedHost>;
  /** Delete a dedicated host. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a dedicated host . */
  update: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHostUpdate,
    options?: DedicatedHostsUpdateOptionalParams,
  ) => PollerLike<OperationState<DedicatedHost>, DedicatedHost>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHostUpdate,
    options?: DedicatedHostsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DedicatedHost>, DedicatedHost>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHostUpdate,
    options?: DedicatedHostsUpdateOptionalParams,
  ) => Promise<DedicatedHost>;
  /** Create or update a dedicated host . */
  createOrUpdate: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHost,
    options?: DedicatedHostsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DedicatedHost>, DedicatedHost>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHost,
    options?: DedicatedHostsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DedicatedHost>, DedicatedHost>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHost,
    options?: DedicatedHostsCreateOrUpdateOptionalParams,
  ) => Promise<DedicatedHost>;
  /** Retrieves information about a dedicated host. */
  get: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsGetOptionalParams,
  ) => Promise<DedicatedHost>;
}

function _getDedicatedHosts(context: ComputeContext) {
  return {
    restart: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsRestartOptionalParams,
    ) => restart(context, resourceGroupName, hostGroupName, hostName, options),
    beginRestart: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, hostGroupName, hostName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, hostGroupName, hostName, options);
    },
    redeploy: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsRedeployOptionalParams,
    ) => redeploy(context, resourceGroupName, hostGroupName, hostName, options),
    beginRedeploy: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsRedeployOptionalParams,
    ) => {
      const poller = redeploy(context, resourceGroupName, hostGroupName, hostName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRedeployAndWait: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsRedeployOptionalParams,
    ) => {
      return await redeploy(context, resourceGroupName, hostGroupName, hostName, options);
    },
    listAvailableSizes: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsListAvailableSizesOptionalParams,
    ) => listAvailableSizes(context, resourceGroupName, hostGroupName, hostName, options),
    listByHostGroup: (
      resourceGroupName: string,
      hostGroupName: string,
      options?: DedicatedHostsListByHostGroupOptionalParams,
    ) => listByHostGroup(context, resourceGroupName, hostGroupName, options),
    delete: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, hostGroupName, hostName, options),
    beginDelete: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, hostGroupName, hostName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, hostGroupName, hostName, options);
    },
    update: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      parameters: DedicatedHostUpdate,
      options?: DedicatedHostsUpdateOptionalParams,
    ) => update(context, resourceGroupName, hostGroupName, hostName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      parameters: DedicatedHostUpdate,
      options?: DedicatedHostsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        hostGroupName,
        hostName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      parameters: DedicatedHostUpdate,
      options?: DedicatedHostsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, hostGroupName, hostName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      parameters: DedicatedHost,
      options?: DedicatedHostsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, hostGroupName, hostName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      parameters: DedicatedHost,
      options?: DedicatedHostsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        hostGroupName,
        hostName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      parameters: DedicatedHost,
      options?: DedicatedHostsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        hostGroupName,
        hostName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsGetOptionalParams,
    ) => get(context, resourceGroupName, hostGroupName, hostName, options),
  };
}

export function _getDedicatedHostsOperations(context: ComputeContext): DedicatedHostsOperations {
  return {
    ..._getDedicatedHosts(context),
  };
}
