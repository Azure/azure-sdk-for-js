// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { patch, update, get } from "../../api/settings/operations.js";
import {
  SettingsPatchOptionalParams,
  SettingsUpdateOptionalParams,
  SettingsGetOptionalParams,
} from "../../api/settings/options.js";
import { Settings } from "../../models/models.js";

/** Interface representing a Settings operations. */
export interface SettingsOperations {
  /** Update the base Settings of the target resource. */
  patch: (
    resourceGroupName: string,
    baseProvider: string,
    baseResourceType: string,
    baseResourceName: string,
    settingsResourceName: string,
    parameters: Settings,
    options?: SettingsPatchOptionalParams,
  ) => Promise<Settings>;
  /** Updates the base Settings of the target resource. */
  update: (
    resourceGroupName: string,
    baseProvider: string,
    baseResourceType: string,
    baseResourceName: string,
    settingsResourceName: string,
    parameters: Settings,
    options?: SettingsUpdateOptionalParams,
  ) => Promise<Settings>;
  /** Returns the base Settings for the target resource. */
  get: (
    resourceGroupName: string,
    baseProvider: string,
    baseResourceType: string,
    baseResourceName: string,
    settingsResourceName: string,
    options?: SettingsGetOptionalParams,
  ) => Promise<Settings>;
}

function _getSettings(context: HybridComputeManagementContext) {
  return {
    patch: (
      resourceGroupName: string,
      baseProvider: string,
      baseResourceType: string,
      baseResourceName: string,
      settingsResourceName: string,
      parameters: Settings,
      options?: SettingsPatchOptionalParams,
    ) =>
      patch(
        context,
        resourceGroupName,
        baseProvider,
        baseResourceType,
        baseResourceName,
        settingsResourceName,
        parameters,
        options,
      ),
    update: (
      resourceGroupName: string,
      baseProvider: string,
      baseResourceType: string,
      baseResourceName: string,
      settingsResourceName: string,
      parameters: Settings,
      options?: SettingsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        baseProvider,
        baseResourceType,
        baseResourceName,
        settingsResourceName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      baseProvider: string,
      baseResourceType: string,
      baseResourceName: string,
      settingsResourceName: string,
      options?: SettingsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        baseProvider,
        baseResourceType,
        baseResourceName,
        settingsResourceName,
        options,
      ),
  };
}

export function _getSettingsOperations(
  context: HybridComputeManagementContext,
): SettingsOperations {
  return {
    ..._getSettings(context),
  };
}
