// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/providerMonitorSettings/operations.js";
import type {
  ProviderMonitorSettingsListBySubscriptionOptionalParams,
  ProviderMonitorSettingsListByResourceGroupOptionalParams,
  ProviderMonitorSettingsDeleteOptionalParams,
  ProviderMonitorSettingsUpdateOptionalParams,
  ProviderMonitorSettingsCreateOptionalParams,
  ProviderMonitorSettingsGetOptionalParams,
} from "../../api/providerMonitorSettings/options.js";
import type { ProviderMonitorSetting } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProviderMonitorSettings operations. */
export interface ProviderMonitorSettingsOperations {
  /** Gets the list of the provider monitor settings in the subscription. */
  listBySubscription: (
    options?: ProviderMonitorSettingsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ProviderMonitorSetting>;
  /** Gets the list of the provider monitor settings in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ProviderMonitorSettingsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ProviderMonitorSetting>;
  /** Deletes a provider monitor setting. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    providerMonitorSettingName: string,
    options?: ProviderMonitorSettingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the provider monitor setting properties as specified in the request body. Update fails if the specified provider monitor setting does not already exist. */
  update: (
    resourceGroupName: string,
    providerMonitorSettingName: string,
    options?: ProviderMonitorSettingsUpdateOptionalParams,
  ) => Promise<ProviderMonitorSetting>;
  /** Creates the provider monitor setting. */
  create: (
    resourceGroupName: string,
    providerMonitorSettingName: string,
    properties: ProviderMonitorSetting,
    options?: ProviderMonitorSettingsCreateOptionalParams,
  ) => PollerLike<OperationState<ProviderMonitorSetting>, ProviderMonitorSetting>;
  /** Gets the provider monitor setting details. */
  get: (
    resourceGroupName: string,
    providerMonitorSettingName: string,
    options?: ProviderMonitorSettingsGetOptionalParams,
  ) => Promise<ProviderMonitorSetting>;
}

function _getProviderMonitorSettings(context: ProviderHubContext) {
  return {
    listBySubscription: (options?: ProviderMonitorSettingsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ProviderMonitorSettingsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      providerMonitorSettingName: string,
      options?: ProviderMonitorSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, providerMonitorSettingName, options),
    update: (
      resourceGroupName: string,
      providerMonitorSettingName: string,
      options?: ProviderMonitorSettingsUpdateOptionalParams,
    ) => update(context, resourceGroupName, providerMonitorSettingName, options),
    create: (
      resourceGroupName: string,
      providerMonitorSettingName: string,
      properties: ProviderMonitorSetting,
      options?: ProviderMonitorSettingsCreateOptionalParams,
    ) => create(context, resourceGroupName, providerMonitorSettingName, properties, options),
    get: (
      resourceGroupName: string,
      providerMonitorSettingName: string,
      options?: ProviderMonitorSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, providerMonitorSettingName, options),
  };
}

export function _getProviderMonitorSettingsOperations(
  context: ProviderHubContext,
): ProviderMonitorSettingsOperations {
  return {
    ..._getProviderMonitorSettings(context),
  };
}
