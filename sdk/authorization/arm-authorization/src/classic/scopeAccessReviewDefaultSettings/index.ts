// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { put, get } from "../../api/scopeAccessReviewDefaultSettings/operations.js";
import type {
  ScopeAccessReviewDefaultSettingsPutOptionalParams,
  ScopeAccessReviewDefaultSettingsGetOptionalParams,
} from "../../api/scopeAccessReviewDefaultSettings/options.js";
import type {
  AccessReviewScheduleSettings,
  AccessReviewDefaultSettings,
} from "../../models/microsoft/attributeNamespaces/models.js";

/** Interface representing a ScopeAccessReviewDefaultSettings operations. */
export interface ScopeAccessReviewDefaultSettingsOperations {
  /** Get access review default settings for the subscription */
  put: (
    scope: string,
    properties: AccessReviewScheduleSettings,
    options?: ScopeAccessReviewDefaultSettingsPutOptionalParams,
  ) => Promise<AccessReviewDefaultSettings>;
  /** Get access review default settings for the subscription */
  get: (
    scope: string,
    options?: ScopeAccessReviewDefaultSettingsGetOptionalParams,
  ) => Promise<AccessReviewDefaultSettings>;
}

function _getScopeAccessReviewDefaultSettings(context: AuthorizationManagementContext) {
  return {
    put: (
      scope: string,
      properties: AccessReviewScheduleSettings,
      options?: ScopeAccessReviewDefaultSettingsPutOptionalParams,
    ) => put(context, scope, properties, options),
    get: (scope: string, options?: ScopeAccessReviewDefaultSettingsGetOptionalParams) =>
      get(context, scope, options),
  };
}

export function _getScopeAccessReviewDefaultSettingsOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewDefaultSettingsOperations {
  return {
    ..._getScopeAccessReviewDefaultSettings(context),
  };
}
