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
    put: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsPropertiesBasicResource,
      options?: ManagedNetworkSettingsPutOptionalParams,
    ) => put(context, resourceGroupName, workspaceName, managedNetworkName, body, options),
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
