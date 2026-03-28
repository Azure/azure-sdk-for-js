// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  getBootDiagnosticLogs,
  reimage,
  restart,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/networkVirtualAppliances/operations.js";
import type {
  NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams,
  NetworkVirtualAppliancesReimageOptionalParams,
  NetworkVirtualAppliancesRestartOptionalParams,
  NetworkVirtualAppliancesListOptionalParams,
  NetworkVirtualAppliancesListByResourceGroupOptionalParams,
  NetworkVirtualAppliancesDeleteOptionalParams,
  NetworkVirtualAppliancesUpdateTagsOptionalParams,
  NetworkVirtualAppliancesCreateOrUpdateOptionalParams,
  NetworkVirtualAppliancesGetOptionalParams,
} from "../../api/networkVirtualAppliances/options.js";
import type {
  TagsObject,
  NetworkVirtualAppliance,
  NetworkVirtualApplianceInstanceIds,
  NetworkVirtualApplianceBootDiagnosticParameters,
  NetworkVirtualApplianceInstanceId,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkVirtualAppliances operations. */
export interface NetworkVirtualAppliancesOperations {
  /** Retrieves the boot diagnostic logs for a VM instance belonging to the specified Network Virtual Appliance. */
  getBootDiagnosticLogs: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    request: NetworkVirtualApplianceBootDiagnosticParameters,
    options?: NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams,
  ) => PollerLike<
    OperationState<NetworkVirtualApplianceInstanceId>,
    NetworkVirtualApplianceInstanceId
  >;
  /** @deprecated use getBootDiagnosticLogs instead */
  beginGetBootDiagnosticLogs: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    request: NetworkVirtualApplianceBootDiagnosticParameters,
    options?: NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkVirtualApplianceInstanceId>,
      NetworkVirtualApplianceInstanceId
    >
  >;
  /** @deprecated use getBootDiagnosticLogs instead */
  beginGetBootDiagnosticLogsAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    request: NetworkVirtualApplianceBootDiagnosticParameters,
    options?: NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams,
  ) => Promise<NetworkVirtualApplianceInstanceId>;
  /** Reimages one VM belonging to the specified Network Virtual Appliance. */
  reimage: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesReimageOptionalParams,
  ) => PollerLike<
    OperationState<NetworkVirtualApplianceInstanceIds>,
    NetworkVirtualApplianceInstanceIds
  >;
  /** @deprecated use reimage instead */
  beginReimage: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesReimageOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkVirtualApplianceInstanceIds>,
      NetworkVirtualApplianceInstanceIds
    >
  >;
  /** @deprecated use reimage instead */
  beginReimageAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesReimageOptionalParams,
  ) => Promise<NetworkVirtualApplianceInstanceIds>;
  /** Restarts one or more VMs belonging to the specified Network Virtual Appliance. */
  restart: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesRestartOptionalParams,
  ) => PollerLike<
    OperationState<NetworkVirtualApplianceInstanceIds>,
    NetworkVirtualApplianceInstanceIds
  >;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesRestartOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkVirtualApplianceInstanceIds>,
      NetworkVirtualApplianceInstanceIds
    >
  >;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesRestartOptionalParams,
  ) => Promise<NetworkVirtualApplianceInstanceIds>;
  /** Gets all Network Virtual Appliances in a subscription. */
  list: (
    options?: NetworkVirtualAppliancesListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkVirtualAppliance>;
  /** Lists all Network Virtual Appliances in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkVirtualAppliancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkVirtualAppliance>;
  /** Deletes the specified Network Virtual Appliance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Network Virtual Appliance. */
  updateTags: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    parameters: TagsObject,
    options?: NetworkVirtualAppliancesUpdateTagsOptionalParams,
  ) => Promise<NetworkVirtualAppliance>;
  /** Creates or updates the specified Network Virtual Appliance. */
  createOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    parameters: NetworkVirtualAppliance,
    options?: NetworkVirtualAppliancesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkVirtualAppliance>, NetworkVirtualAppliance>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    parameters: NetworkVirtualAppliance,
    options?: NetworkVirtualAppliancesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkVirtualAppliance>, NetworkVirtualAppliance>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    parameters: NetworkVirtualAppliance,
    options?: NetworkVirtualAppliancesCreateOrUpdateOptionalParams,
  ) => Promise<NetworkVirtualAppliance>;
  /** Gets the specified Network Virtual Appliance. */
  get: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: NetworkVirtualAppliancesGetOptionalParams,
  ) => Promise<NetworkVirtualAppliance>;
}

function _getNetworkVirtualAppliances(context: NetworkManagementContext) {
  return {
    getBootDiagnosticLogs: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      request: NetworkVirtualApplianceBootDiagnosticParameters,
      options?: NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams,
    ) =>
      getBootDiagnosticLogs(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        request,
        options,
      ),
    beginGetBootDiagnosticLogs: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      request: NetworkVirtualApplianceBootDiagnosticParameters,
      options?: NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams,
    ) => {
      const poller = getBootDiagnosticLogs(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        request,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetBootDiagnosticLogsAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      request: NetworkVirtualApplianceBootDiagnosticParameters,
      options?: NetworkVirtualAppliancesGetBootDiagnosticLogsOptionalParams,
    ) => {
      return await getBootDiagnosticLogs(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        request,
        options,
      );
    },
    reimage: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesReimageOptionalParams,
    ) => reimage(context, resourceGroupName, networkVirtualApplianceName, options),
    beginReimage: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesReimageOptionalParams,
    ) => {
      const poller = reimage(context, resourceGroupName, networkVirtualApplianceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReimageAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesReimageOptionalParams,
    ) => {
      return await reimage(context, resourceGroupName, networkVirtualApplianceName, options);
    },
    restart: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesRestartOptionalParams,
    ) => restart(context, resourceGroupName, networkVirtualApplianceName, options),
    beginRestart: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, networkVirtualApplianceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, networkVirtualApplianceName, options);
    },
    list: (options?: NetworkVirtualAppliancesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkVirtualAppliancesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkVirtualApplianceName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkVirtualApplianceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkVirtualApplianceName, options);
    },
    updateTags: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      parameters: TagsObject,
      options?: NetworkVirtualAppliancesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, networkVirtualApplianceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      parameters: NetworkVirtualAppliance,
      options?: NetworkVirtualAppliancesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, networkVirtualApplianceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      parameters: NetworkVirtualAppliance,
      options?: NetworkVirtualAppliancesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      parameters: NetworkVirtualAppliance,
      options?: NetworkVirtualAppliancesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      options?: NetworkVirtualAppliancesGetOptionalParams,
    ) => get(context, resourceGroupName, networkVirtualApplianceName, options),
  };
}

export function _getNetworkVirtualAppliancesOperations(
  context: NetworkManagementContext,
): NetworkVirtualAppliancesOperations {
  return {
    ..._getNetworkVirtualAppliances(context),
  };
}
