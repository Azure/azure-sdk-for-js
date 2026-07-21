// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { update, createOrUpdate, getEntityTag, get } from "../../api/signInSettings/operations.js";
import type {
  SignInSettingsUpdateOptionalParams,
  SignInSettingsCreateOrUpdateOptionalParams,
  SignInSettingsGetEntityTagOptionalParams,
  SignInSettingsGetOptionalParams,
} from "../../api/signInSettings/options.js";
import type { PortalSigninSettings } from "../../models/models.js";

/** Interface representing a SignInSettings operations. */
export interface SignInSettingsOperations {
  /** Update Sign-In settings. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    parameters: PortalSigninSettings,
    options?: SignInSettingsUpdateOptionalParams,
  ) => Promise<void>;
  /** Create or Update Sign-In settings. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    parameters: PortalSigninSettings,
    options?: SignInSettingsCreateOrUpdateOptionalParams,
  ) => Promise<PortalSigninSettings>;
  /** Gets the entity state (Etag) version of the SignInSettings. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    options?: SignInSettingsGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get Sign In Settings for the Portal */
  get: (
    resourceGroupName: string,
    serviceName: string,
    options?: SignInSettingsGetOptionalParams,
  ) => Promise<PortalSigninSettings>;
}

function _getSignInSettings(context: ApiManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      serviceName: string,
      ifMatch: string,
      parameters: PortalSigninSettings,
      options?: SignInSettingsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      parameters: PortalSigninSettings,
      options?: SignInSettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      options?: SignInSettingsGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      options?: SignInSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, options),
  };
}

export function _getSignInSettingsOperations(
  context: ApiManagementContext,
): SignInSettingsOperations {
  return {
    ..._getSignInSettings(context),
  };
}
