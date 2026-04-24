// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, create, get } from "../../api/autoProvisioningSettings/operations.js";
import type {
  AutoProvisioningSettingsListOptionalParams,
  AutoProvisioningSettingsCreateOptionalParams,
  AutoProvisioningSettingsGetOptionalParams,
} from "../../api/autoProvisioningSettings/options.js";
import type { AutoProvisioningSetting } from "../../models/legacySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AutoProvisioningSettings operations. */
export interface AutoProvisioningSettingsOperations {
  /** Exposes the auto provisioning settings of the subscriptions */
  list: (
    options?: AutoProvisioningSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<AutoProvisioningSetting>;
  /** Details of a specific setting */
  create: (
    settingName: string,
    setting: AutoProvisioningSetting,
    options?: AutoProvisioningSettingsCreateOptionalParams,
  ) => Promise<AutoProvisioningSetting>;
  /** Details of a specific setting */
  get: (
    settingName: string,
    options?: AutoProvisioningSettingsGetOptionalParams,
  ) => Promise<AutoProvisioningSetting>;
}

function _getAutoProvisioningSettings(context: SecurityCenterContext) {
  return {
    list: (options?: AutoProvisioningSettingsListOptionalParams) => list(context, options),
    create: (
      settingName: string,
      setting: AutoProvisioningSetting,
      options?: AutoProvisioningSettingsCreateOptionalParams,
    ) => create(context, settingName, setting, options),
    get: (settingName: string, options?: AutoProvisioningSettingsGetOptionalParams) =>
      get(context, settingName, options),
  };
}

export function _getAutoProvisioningSettingsOperations(
  context: SecurityCenterContext,
): AutoProvisioningSettingsOperations {
  return {
    ..._getAutoProvisioningSettings(context),
  };
}
