// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { update, createOrUpdate, getEntityTag, get } from "../../api/signUpSettings/operations.js";
import type {
  SignUpSettingsUpdateOptionalParams,
  SignUpSettingsCreateOrUpdateOptionalParams,
  SignUpSettingsGetEntityTagOptionalParams,
  SignUpSettingsGetOptionalParams,
} from "../../api/signUpSettings/options.js";
import type { PortalSignupSettings } from "../../models/models.js";

/** Interface representing a SignUpSettings operations. */
export interface SignUpSettingsOperations {
  /** Update Sign-Up settings. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    parameters: PortalSignupSettings,
    options?: SignUpSettingsUpdateOptionalParams,
  ) => Promise<void>;
  /** Create or Update Sign-Up settings. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    parameters: PortalSignupSettings,
    options?: SignUpSettingsCreateOrUpdateOptionalParams,
  ) => Promise<PortalSignupSettings>;
  /** Gets the entity state (Etag) version of the SignUpSettings. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    options?: SignUpSettingsGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get Sign Up Settings for the Portal */
  get: (
    resourceGroupName: string,
    serviceName: string,
    options?: SignUpSettingsGetOptionalParams,
  ) => Promise<PortalSignupSettings>;
}

function _getSignUpSettings(context: ApiManagementContext) {
  return {
    update: (
      resourceGroupName: string,
      serviceName: string,
      ifMatch: string,
      parameters: PortalSignupSettings,
      options?: SignUpSettingsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      parameters: PortalSignupSettings,
      options?: SignUpSettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      options?: SignUpSettingsGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      options?: SignUpSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, options),
  };
}

export function _getSignUpSettingsOperations(
  context: ApiManagementContext,
): SignUpSettingsOperations {
  return {
    ..._getSignUpSettings(context),
  };
}
