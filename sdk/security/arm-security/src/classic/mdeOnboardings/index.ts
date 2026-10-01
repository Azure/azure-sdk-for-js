// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/mdeOnboardings/operations.js";
import {
  MdeOnboardingsListOptionalParams,
  MdeOnboardingsGetOptionalParams,
} from "../../api/mdeOnboardings/options.js";
import { MdeOnboardingData, MdeOnboardingDataList } from "../../models/mdeOnboardingAPI/models.js";

/** Interface representing a MdeOnboardings operations. */
export interface MdeOnboardingsOperations {
  /** The configuration or data needed to onboard the machine to MDE */
  list: (options?: MdeOnboardingsListOptionalParams) => Promise<MdeOnboardingDataList>;
  /** The default configuration or data needed to onboard the machine to MDE */
  get: (options?: MdeOnboardingsGetOptionalParams) => Promise<MdeOnboardingData>;
}

function _getMdeOnboardings(context: SecurityCenterContext) {
  return {
    list: (options?: MdeOnboardingsListOptionalParams) => list(context, options),
    get: (options?: MdeOnboardingsGetOptionalParams) => get(context, options),
  };
}

export function _getMdeOnboardingsOperations(
  context: SecurityCenterContext,
): MdeOnboardingsOperations {
  return {
    ..._getMdeOnboardings(context),
  };
}
