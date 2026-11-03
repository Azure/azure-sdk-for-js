// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, patch, put, get } from "../../api/managedNetworkSettings/operations.js";
import type {
  ManagedNetworkSettingsListOptionalParams,
  ManagedNetworkSettingsPatchOptionalParams,
  ManagedNetworkSettingsPutOptionalParams,
  ManagedNetworkSettingsGetOptionalParams,
} from "../../api/managedNetworkSettings/options.js";
import type { ManagedNetworkSettingsPropertiesBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedNetworkSettings operations. */
export interface ManagedNetworkSettingsOperations {
  /** List API for managed network settings of a machine learning workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ManagedNetworkSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedNetworkSettingsPropertiesBasicResource>;
  /** Patch API for managed network settings of a machine learning workspace. */
  patch: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsPatchOptionalParams,
  ) => PollerLike<
    OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
    ManagedNetworkSettingsPropertiesBasicResource
  >;
  /** @deprecated use patch instead */
  beginPatch: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsPatchOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
      ManagedNetworkSettingsPropertiesBasicResource
    >
  >;
  /** @deprecated use patch instead */
  beginPatchAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsPatchOptionalParams,
  ) => Promise<ManagedNetworkSettingsPropertiesBasicResource>;
  /** PUT API for managed network settings of a machine learning workspace. */
  put: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsPropertiesBasicResource,
    options?: ManagedNetworkSettingsPutOptionalParams,
  ) => PollerLike<
    OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
    ManagedNetworkSettingsPropertiesBasicResource
  >;
  /** @deprecated use put instead */
  beginPut: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsPropertiesBasicResource,
    options?: ManagedNetworkSettingsPutOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
      ManagedNetworkSettingsPropertiesBasicResource
    >
  >;
  /** @deprecated use put instead */
  beginPutAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsPropertiesBasicResource,
    options?: ManagedNetworkSettingsPutOptionalParams,
  ) => Promise<ManagedNetworkSettingsPropertiesBasicResource>;
  /** Get API for managed network settings of a machine learning workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsGetOptionalParams,
  ) => Promise<ManagedNetworkSettingsPropertiesBasicResource>;
}

function _getManagedNetworkSettings(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ManagedNetworkSettingsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    patch: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsPatchOptionalParams,
    ) => patch(context, resourceGroupName, workspaceName, managedNetworkName, options),
    beginPatch: async (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsPatchOptionalParams,
    ) => {
      const poller = patch(context, resourceGroupName, workspaceName, managedNetworkName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPatchAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsPatchOptionalParams,
    ) => {
      return await patch(context, resourceGroupName, workspaceName, managedNetworkName, options);
    },
    put: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsPropertiesBasicResource,
      options?: ManagedNetworkSettingsPutOptionalParams,
    ) => put(context, resourceGroupName, workspaceName, managedNetworkName, body, options),
    beginPut: async (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsPropertiesBasicResource,
      options?: ManagedNetworkSettingsPutOptionalParams,
    ) => {
      const poller = put(
        context,
        resourceGroupName,
        workspaceName,
        managedNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPutAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsPropertiesBasicResource,
      options?: ManagedNetworkSettingsPutOptionalParams,
    ) => {
      return await put(
        context,
        resourceGroupName,
        workspaceName,
        managedNetworkName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, managedNetworkName, options),
  };
}

export function _getManagedNetworkSettingsOperations(
  context: AzureMachineLearningServicesManagementContext,
): ManagedNetworkSettingsOperations {
  return {
    ..._getManagedNetworkSettings(context),
  };
}
