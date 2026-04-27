// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, createOrUpdate, get } from "../../api/sensitivitySettings/operations.js";
import type {
  SensitivitySettingsListOptionalParams,
  SensitivitySettingsCreateOrUpdateOptionalParams,
  SensitivitySettingsGetOptionalParams,
} from "../../api/sensitivitySettings/options.js";
import type {
  GetSensitivitySettingsResponse,
  UpdateSensitivitySettingsRequest,
} from "../../models/sensitivitySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SensitivitySettings operations. */
export interface SensitivitySettingsOperations {
  /** Gets a list with a single sensitivity settings resource */
  list: (
    options?: SensitivitySettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<GetSensitivitySettingsResponse>;
  /** Create or update data sensitivity settings for sensitive data discovery */
  createOrUpdate: (
    sensitivitySettings: UpdateSensitivitySettingsRequest,
    options?: SensitivitySettingsCreateOrUpdateOptionalParams,
  ) => Promise<GetSensitivitySettingsResponse>;
  /** Gets data sensitivity settings for sensitive data discovery */
  get: (options?: SensitivitySettingsGetOptionalParams) => Promise<GetSensitivitySettingsResponse>;
}

function _getSensitivitySettings(context: SecurityCenterContext) {
  return {
    list: (options?: SensitivitySettingsListOptionalParams) => list(context, options),
    createOrUpdate: (
      sensitivitySettings: UpdateSensitivitySettingsRequest,
      options?: SensitivitySettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, sensitivitySettings, options),
    get: (options?: SensitivitySettingsGetOptionalParams) => get(context, options),
  };
}

export function _getSensitivitySettingsOperations(
  context: SecurityCenterContext,
): SensitivitySettingsOperations {
  return {
    ..._getSensitivitySettings(context),
  };
}
