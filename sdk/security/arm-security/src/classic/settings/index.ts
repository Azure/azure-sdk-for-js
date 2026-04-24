// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, update, get } from "../../api/settings/operations.js";
import type {
  SettingsListOptionalParams,
  SettingsUpdateOptionalParams,
  SettingsGetOptionalParams,
} from "../../api/settings/options.js";
import type { CommonSettingName } from "../../models/common/models.js";
import type { SettingsAPISettingUnion } from "../../models/settingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Settings operations. */
export interface SettingsOperations {
  /** Settings about different configurations in Microsoft Defender for Cloud */
  list: (
    options?: SettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<SettingsAPISettingUnion>;
  /** updating settings about different configurations in Microsoft Defender for Cloud */
  update: (
    settingName: CommonSettingName,
    setting: SettingsAPISettingUnion,
    options?: SettingsUpdateOptionalParams,
  ) => Promise<SettingsAPISettingUnion>;
  /** Settings of different configurations in Microsoft Defender for Cloud */
  get: (
    settingName: CommonSettingName,
    options?: SettingsGetOptionalParams,
  ) => Promise<SettingsAPISettingUnion>;
}

function _getSettings(context: SecurityCenterContext) {
  return {
    list: (options?: SettingsListOptionalParams) => list(context, options),
    update: (
      settingName: CommonSettingName,
      setting: SettingsAPISettingUnion,
      options?: SettingsUpdateOptionalParams,
    ) => update(context, settingName, setting, options),
    get: (settingName: CommonSettingName, options?: SettingsGetOptionalParams) =>
      get(context, settingName, options),
  };
}

export function _getSettingsOperations(context: SecurityCenterContext): SettingsOperations {
  return {
    ..._getSettings(context),
  };
}
