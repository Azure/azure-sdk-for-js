// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  runReadCommands,
  enableRemoteVendorManagement,
  disableRemoteVendorManagement,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/storageAppliances/operations.js";
import {
  StorageAppliancesRunReadCommandsOptionalParams,
  StorageAppliancesEnableRemoteVendorManagementOptionalParams,
  StorageAppliancesDisableRemoteVendorManagementOptionalParams,
  StorageAppliancesListBySubscriptionOptionalParams,
  StorageAppliancesListByResourceGroupOptionalParams,
  StorageAppliancesDeleteOptionalParams,
  StorageAppliancesUpdateOptionalParams,
  StorageAppliancesCreateOrUpdateOptionalParams,
  StorageAppliancesGetOptionalParams,
} from "../../api/storageAppliances/options.js";
import {
  OperationStatusResult,
  StorageAppliance,
  StorageApplianceRunReadCommandsParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageAppliances operations. */
export interface StorageAppliancesOperations {
  /** Run one or more read-only commands on the provided storage appliance. */
  runReadCommands: (
    resourceGroupName: string,
    storageApplianceName: string,
    storageApplianceRunReadCommandsParameters: StorageApplianceRunReadCommandsParameters,
    options?: StorageAppliancesRunReadCommandsOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use runReadCommands instead */
  beginRunReadCommands: (
    resourceGroupName: string,
    storageApplianceName: string,
    storageApplianceRunReadCommandsParameters: StorageApplianceRunReadCommandsParameters,
    options?: StorageAppliancesRunReadCommandsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use runReadCommands instead */
  beginRunReadCommandsAndWait: (
    resourceGroupName: string,
    storageApplianceName: string,
    storageApplianceRunReadCommandsParameters: StorageApplianceRunReadCommandsParameters,
    options?: StorageAppliancesRunReadCommandsOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Enable remote vendor management of the provided storage appliance. */
  enableRemoteVendorManagement: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesEnableRemoteVendorManagementOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use enableRemoteVendorManagement instead */
  beginEnableRemoteVendorManagement: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesEnableRemoteVendorManagementOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use enableRemoteVendorManagement instead */
  beginEnableRemoteVendorManagementAndWait: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesEnableRemoteVendorManagementOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Disable remote vendor management of the provided storage appliance. */
  disableRemoteVendorManagement: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesDisableRemoteVendorManagementOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use disableRemoteVendorManagement instead */
  beginDisableRemoteVendorManagement: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesDisableRemoteVendorManagementOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use disableRemoteVendorManagement instead */
  beginDisableRemoteVendorManagementAndWait: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesDisableRemoteVendorManagementOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Get a list of storage appliances in the provided subscription. */
  listBySubscription: (
    options?: StorageAppliancesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StorageAppliance>;
  /** Get a list of storage appliances in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StorageAppliancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StorageAppliance>;
  /** Delete the provided storage appliance. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
  delete: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Update properties of the provided storage appliance, or update tags associated with the storage appliance Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageAppliance>, StorageAppliance>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StorageAppliance>, StorageAppliance>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesUpdateOptionalParams,
  ) => Promise<StorageAppliance>;
  /** Create a new storage appliance or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
  createOrUpdate: (
    resourceGroupName: string,
    storageApplianceName: string,
    storageApplianceParameters: StorageAppliance,
    options?: StorageAppliancesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageAppliance>, StorageAppliance>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    storageApplianceName: string,
    storageApplianceParameters: StorageAppliance,
    options?: StorageAppliancesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StorageAppliance>, StorageAppliance>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    storageApplianceName: string,
    storageApplianceParameters: StorageAppliance,
    options?: StorageAppliancesCreateOrUpdateOptionalParams,
  ) => Promise<StorageAppliance>;
  /** Get properties of the provided storage appliance. */
  get: (
    resourceGroupName: string,
    storageApplianceName: string,
    options?: StorageAppliancesGetOptionalParams,
  ) => Promise<StorageAppliance>;
}

function _getStorageAppliances(context: NetworkCloudContext) {
  return {
    runReadCommands: (
      resourceGroupName: string,
      storageApplianceName: string,
      storageApplianceRunReadCommandsParameters: StorageApplianceRunReadCommandsParameters,
      options?: StorageAppliancesRunReadCommandsOptionalParams,
    ) =>
      runReadCommands(
        context,
        resourceGroupName,
        storageApplianceName,
        storageApplianceRunReadCommandsParameters,
        options,
      ),
    beginRunReadCommands: async (
      resourceGroupName: string,
      storageApplianceName: string,
      storageApplianceRunReadCommandsParameters: StorageApplianceRunReadCommandsParameters,
      options?: StorageAppliancesRunReadCommandsOptionalParams,
    ) => {
      const poller = runReadCommands(
        context,
        resourceGroupName,
        storageApplianceName,
        storageApplianceRunReadCommandsParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunReadCommandsAndWait: async (
      resourceGroupName: string,
      storageApplianceName: string,
      storageApplianceRunReadCommandsParameters: StorageApplianceRunReadCommandsParameters,
      options?: StorageAppliancesRunReadCommandsOptionalParams,
    ) => {
      return await runReadCommands(
        context,
        resourceGroupName,
        storageApplianceName,
        storageApplianceRunReadCommandsParameters,
        options,
      );
    },
    enableRemoteVendorManagement: (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesEnableRemoteVendorManagementOptionalParams,
    ) => enableRemoteVendorManagement(context, resourceGroupName, storageApplianceName, options),
    beginEnableRemoteVendorManagement: async (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesEnableRemoteVendorManagementOptionalParams,
    ) => {
      const poller = enableRemoteVendorManagement(
        context,
        resourceGroupName,
        storageApplianceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginEnableRemoteVendorManagementAndWait: async (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesEnableRemoteVendorManagementOptionalParams,
    ) => {
      return await enableRemoteVendorManagement(
        context,
        resourceGroupName,
        storageApplianceName,
        options,
      );
    },
    disableRemoteVendorManagement: (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesDisableRemoteVendorManagementOptionalParams,
    ) => disableRemoteVendorManagement(context, resourceGroupName, storageApplianceName, options),
    beginDisableRemoteVendorManagement: async (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesDisableRemoteVendorManagementOptionalParams,
    ) => {
      const poller = disableRemoteVendorManagement(
        context,
        resourceGroupName,
        storageApplianceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisableRemoteVendorManagementAndWait: async (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesDisableRemoteVendorManagementOptionalParams,
    ) => {
      return await disableRemoteVendorManagement(
        context,
        resourceGroupName,
        storageApplianceName,
        options,
      );
    },
    listBySubscription: (options?: StorageAppliancesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StorageAppliancesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageApplianceName, options),
    beginDelete: async (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, storageApplianceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, storageApplianceName, options);
    },
    update: (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageApplianceName, options),
    beginUpdate: async (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, storageApplianceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, storageApplianceName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      storageApplianceName: string,
      storageApplianceParameters: StorageAppliance,
      options?: StorageAppliancesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        storageApplianceName,
        storageApplianceParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      storageApplianceName: string,
      storageApplianceParameters: StorageAppliance,
      options?: StorageAppliancesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        storageApplianceName,
        storageApplianceParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      storageApplianceName: string,
      storageApplianceParameters: StorageAppliance,
      options?: StorageAppliancesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        storageApplianceName,
        storageApplianceParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      storageApplianceName: string,
      options?: StorageAppliancesGetOptionalParams,
    ) => get(context, resourceGroupName, storageApplianceName, options),
  };
}

export function _getStorageAppliancesOperations(
  context: NetworkCloudContext,
): StorageAppliancesOperations {
  return {
    ..._getStorageAppliances(context),
  };
}
