// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { create, get } from "../../api/advancedThreatProtection/operations.js";
import type {
  AdvancedThreatProtectionCreateOptionalParams,
  AdvancedThreatProtectionGetOptionalParams,
} from "../../api/advancedThreatProtection/options.js";
import type { ATPSettingsAPIAdvancedThreatProtectionSetting } from "../../models/atpSettingsAPI/models.js";

/** Interface representing a AdvancedThreatProtection operations. */
export interface AdvancedThreatProtectionOperations {
  /** Creates or updates the Advanced Threat Protection settings on a specified resource. */
  create: (
    resourceId: string,
    advancedThreatProtectionSetting: ATPSettingsAPIAdvancedThreatProtectionSetting,
    options?: AdvancedThreatProtectionCreateOptionalParams,
  ) => Promise<ATPSettingsAPIAdvancedThreatProtectionSetting>;
  /** Gets the Advanced Threat Protection settings for the specified resource. */
  get: (
    resourceId: string,
    options?: AdvancedThreatProtectionGetOptionalParams,
  ) => Promise<ATPSettingsAPIAdvancedThreatProtectionSetting>;
}

function _getAdvancedThreatProtection(context: SecurityCenterContext) {
  return {
    create: (
      resourceId: string,
      advancedThreatProtectionSetting: ATPSettingsAPIAdvancedThreatProtectionSetting,
      options?: AdvancedThreatProtectionCreateOptionalParams,
    ) => create(context, resourceId, advancedThreatProtectionSetting, options),
    get: (resourceId: string, options?: AdvancedThreatProtectionGetOptionalParams) =>
      get(context, resourceId, options),
  };
}

export function _getAdvancedThreatProtectionOperations(
  context: SecurityCenterContext,
): AdvancedThreatProtectionOperations {
  return {
    ..._getAdvancedThreatProtection(context),
  };
}
