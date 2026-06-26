// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthContext } from "../../api/cloudHealthContext.js";
import {
  listByHealthModel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/authenticationSettings/operations.js";
import {
  AuthenticationSettingsListByHealthModelOptionalParams,
  AuthenticationSettingsDeleteOptionalParams,
  AuthenticationSettingsCreateOrUpdateOptionalParams,
  AuthenticationSettingsGetOptionalParams,
} from "../../api/authenticationSettings/options.js";
import { AuthenticationSetting } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AuthenticationSettings operations. */
export interface AuthenticationSettingsOperations {
  /** List AuthenticationSetting resources by HealthModel */
  listByHealthModel: (
    resourceGroupName: string,
    healthModelName: string,
    options?: AuthenticationSettingsListByHealthModelOptionalParams,
  ) => PagedAsyncIterableIterator<AuthenticationSetting>;
  /** Delete a AuthenticationSetting */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    authenticationSettingName: string,
    options?: AuthenticationSettingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a AuthenticationSetting */
  createOrUpdate: (
    resourceGroupName: string,
    healthModelName: string,
    authenticationSettingName: string,
    resource: AuthenticationSetting,
    options?: AuthenticationSettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AuthenticationSetting>, AuthenticationSetting>;
  /** Get a AuthenticationSetting */
  get: (
    resourceGroupName: string,
    healthModelName: string,
    authenticationSettingName: string,
    options?: AuthenticationSettingsGetOptionalParams,
  ) => Promise<AuthenticationSetting>;
}

function _getAuthenticationSettings(context: CloudHealthContext) {
  return {
    listByHealthModel: (
      resourceGroupName: string,
      healthModelName: string,
      options?: AuthenticationSettingsListByHealthModelOptionalParams,
    ) => listByHealthModel(context, resourceGroupName, healthModelName, options),
    delete: (
      resourceGroupName: string,
      healthModelName: string,
      authenticationSettingName: string,
      options?: AuthenticationSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, healthModelName, authenticationSettingName, options),
    createOrUpdate: (
      resourceGroupName: string,
      healthModelName: string,
      authenticationSettingName: string,
      resource: AuthenticationSetting,
      options?: AuthenticationSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        healthModelName,
        authenticationSettingName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      healthModelName: string,
      authenticationSettingName: string,
      options?: AuthenticationSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, healthModelName, authenticationSettingName, options),
  };
}

export function _getAuthenticationSettingsOperations(
  context: CloudHealthContext,
): AuthenticationSettingsOperations {
  return {
    ..._getAuthenticationSettings(context),
  };
}
