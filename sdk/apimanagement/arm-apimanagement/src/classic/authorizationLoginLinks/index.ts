// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { post } from "../../api/authorizationLoginLinks/operations.js";
import type { AuthorizationLoginLinksPostOptionalParams } from "../../api/authorizationLoginLinks/options.js";
import type {
  AuthorizationLoginRequestContract,
  AuthorizationLoginResponseContract,
} from "../../models/models.js";

/** Interface representing a AuthorizationLoginLinks operations. */
export interface AuthorizationLoginLinksOperations {
  /** Gets authorization login links. */
  post: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    parameters: AuthorizationLoginRequestContract,
    options?: AuthorizationLoginLinksPostOptionalParams,
  ) => Promise<AuthorizationLoginResponseContract>;
}

function _getAuthorizationLoginLinks(context: ApiManagementContext) {
  return {
    post: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      authorizationId: string,
      parameters: AuthorizationLoginRequestContract,
      options?: AuthorizationLoginLinksPostOptionalParams,
    ) =>
      post(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        parameters,
        options,
      ),
  };
}

export function _getAuthorizationLoginLinksOperations(
  context: ApiManagementContext,
): AuthorizationLoginLinksOperations {
  return {
    ..._getAuthorizationLoginLinks(context),
  };
}
