// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import {
  list,
  deleteByScope,
  createOrUpdateByScope,
  getByScope,
} from "../../api/settings/operations.js";
import type {
  SettingsListOptionalParams,
  SettingsDeleteByScopeOptionalParams,
  SettingsCreateOrUpdateByScopeOptionalParams,
  SettingsGetByScopeOptionalParams,
} from "../../api/settings/options.js";
import type { SettingUnion, SettingType, SettingsListResult } from "../../models/models.js";

/** Interface representing a Settings operations. */
export interface SettingsOperations {
  /** List all cost management settings in the requested scope. */
  list: (scope: string, options?: SettingsListOptionalParams) => Promise<SettingsListResult>;
  /** Delete a setting within the given scope. */
  deleteByScope: (
    scope: string,
    typeParam: SettingType,
    options?: SettingsDeleteByScopeOptionalParams,
  ) => Promise<void>;
  /** Create or update a setting within the given scope. */
  createOrUpdateByScope: (
    scope: string,
    typeParam: SettingType,
    setting: SettingUnion,
    options?: SettingsCreateOrUpdateByScopeOptionalParams,
  ) => Promise<SettingUnion>;
  /** Get the setting from the given scope by name. */
  getByScope: (
    scope: string,
    typeParam: SettingType,
    options?: SettingsGetByScopeOptionalParams,
  ) => Promise<SettingUnion>;
}

function _getSettings(context: CostManagementContext) {
  return {
    list: (scope: string, options?: SettingsListOptionalParams) => list(context, scope, options),
    deleteByScope: (
      scope: string,
      typeParam: SettingType,
      options?: SettingsDeleteByScopeOptionalParams,
    ) => deleteByScope(context, scope, typeParam, options),
    createOrUpdateByScope: (
      scope: string,
      typeParam: SettingType,
      setting: SettingUnion,
      options?: SettingsCreateOrUpdateByScopeOptionalParams,
    ) => createOrUpdateByScope(context, scope, typeParam, setting, options),
    getByScope: (
      scope: string,
      typeParam: SettingType,
      options?: SettingsGetByScopeOptionalParams,
    ) => getByScope(context, scope, typeParam, options),
  };
}

export function _getSettingsOperations(context: CostManagementContext): SettingsOperations {
  return {
    ..._getSettings(context),
  };
}
