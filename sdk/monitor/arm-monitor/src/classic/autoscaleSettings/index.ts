// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/autoscaleSettings/operations.js";
import type {
  AutoscaleSettingsListBySubscriptionOptionalParams,
  AutoscaleSettingsListByResourceGroupOptionalParams,
  AutoscaleSettingsDeleteOptionalParams,
  AutoscaleSettingsUpdateOptionalParams,
  AutoscaleSettingsCreateOrUpdateOptionalParams,
  AutoscaleSettingsGetOptionalParams,
} from "../../api/autoscaleSettings/options.js";
import type {
  MicrosoftAutoScaleAutoscaleSettingResource,
  MicrosoftAutoScaleAutoscaleSettingResourcePatch,
} from "../../models/microsoft/autoScale/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AutoscaleSettings operations. */
export interface AutoscaleSettingsOperations {
  /** Lists the autoscale settings for a subscription */
  listBySubscription: (
    options?: AutoscaleSettingsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftAutoScaleAutoscaleSettingResource>;
  /** Lists the autoscale settings for a resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AutoscaleSettingsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftAutoScaleAutoscaleSettingResource>;
  /** Deletes and autoscale setting */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    autoscaleSettingName: string,
    options?: AutoscaleSettingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing AutoscaleSettingsResource. To update other fields use the CreateOrUpdate method. */
  update: (
    resourceGroupName: string,
    autoscaleSettingName: string,
    autoscaleSettingResource: MicrosoftAutoScaleAutoscaleSettingResourcePatch,
    options?: AutoscaleSettingsUpdateOptionalParams,
  ) => Promise<MicrosoftAutoScaleAutoscaleSettingResource>;
  /** Creates or updates an autoscale setting. */
  createOrUpdate: (
    resourceGroupName: string,
    autoscaleSettingName: string,
    parameters: MicrosoftAutoScaleAutoscaleSettingResource,
    options?: AutoscaleSettingsCreateOrUpdateOptionalParams,
  ) => Promise<MicrosoftAutoScaleAutoscaleSettingResource>;
  /** Gets an autoscale setting */
  get: (
    resourceGroupName: string,
    autoscaleSettingName: string,
    options?: AutoscaleSettingsGetOptionalParams,
  ) => Promise<MicrosoftAutoScaleAutoscaleSettingResource>;
}

function _getAutoscaleSettings(context: MonitorContext) {
  return {
    listBySubscription: (options?: AutoscaleSettingsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AutoscaleSettingsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      autoscaleSettingName: string,
      options?: AutoscaleSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, autoscaleSettingName, options),
    update: (
      resourceGroupName: string,
      autoscaleSettingName: string,
      autoscaleSettingResource: MicrosoftAutoScaleAutoscaleSettingResourcePatch,
      options?: AutoscaleSettingsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, autoscaleSettingName, autoscaleSettingResource, options),
    createOrUpdate: (
      resourceGroupName: string,
      autoscaleSettingName: string,
      parameters: MicrosoftAutoScaleAutoscaleSettingResource,
      options?: AutoscaleSettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, autoscaleSettingName, parameters, options),
    get: (
      resourceGroupName: string,
      autoscaleSettingName: string,
      options?: AutoscaleSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, autoscaleSettingName, options),
  };
}

export function _getAutoscaleSettingsOperations(
  context: MonitorContext,
): AutoscaleSettingsOperations {
  return {
    ..._getAutoscaleSettings(context),
  };
}
