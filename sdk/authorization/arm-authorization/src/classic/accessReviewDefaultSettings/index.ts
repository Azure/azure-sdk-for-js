// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { put, get } from "../../api/accessReviewDefaultSettings/operations.js";
import type {
  AccessReviewDefaultSettingsPutOptionalParams,
  AccessReviewDefaultSettingsGetOptionalParams,
} from "../../api/accessReviewDefaultSettings/options.js";
import type {
  AccessReviewScheduleSettings,
  AccessReviewDefaultSettings,
} from "../../models/microsoft/attributeNamespaces/models.js";

/** Interface representing a AccessReviewDefaultSettings operations. */
export interface AccessReviewDefaultSettingsOperations {
  /** Get access review default settings for the subscription */
  put: (
    properties: AccessReviewScheduleSettings,
    options?: AccessReviewDefaultSettingsPutOptionalParams,
  ) => Promise<AccessReviewDefaultSettings>;
  /** Get access review default settings for the subscription */
  get: (
    options?: AccessReviewDefaultSettingsGetOptionalParams,
  ) => Promise<AccessReviewDefaultSettings>;
}

function _getAccessReviewDefaultSettings(context: AuthorizationManagementContext) {
  return {
    put: (
      properties: AccessReviewScheduleSettings,
      options?: AccessReviewDefaultSettingsPutOptionalParams,
    ) => put(context, properties, options),
    get: (options?: AccessReviewDefaultSettingsGetOptionalParams) => get(context, options),
  };
}

export function _getAccessReviewDefaultSettingsOperations(
  context: AuthorizationManagementContext,
): AccessReviewDefaultSettingsOperations {
  return {
    ..._getAccessReviewDefaultSettings(context),
  };
}
