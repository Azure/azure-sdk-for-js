// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { update, createOrReplace, get } from "../../api/passwordAuthentications/operations.js";
import type {
  PasswordAuthenticationsUpdateOptionalParams,
  PasswordAuthenticationsCreateOrReplaceOptionalParams,
  PasswordAuthenticationsGetOptionalParams,
} from "../../api/passwordAuthentications/options.js";
import type {
  PasswordAuthentication,
  PasswordAuthenticationCreateOrUpdate,
  PasswordAuthenticationForPatchUpdateUpdate,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PasswordAuthentications operations. */
export interface PasswordAuthenticationsOperations {
  /** Updates the service-created PostgreSQL username-and-password authentication method. The request is sparse and omitted properties preserve their current values. This API version supports enabling the method, disabling the method, and resetting its password. For a cluster that already has an administrator but currently has password authentication disabled, state Enabled and administratorLoginPassword can be supplied together to re-enable password authentication and reset the password. Disabling cannot include credentials and does not remove or modify existing database users or roles. Administrator rename is not supported in this API version. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    properties: PasswordAuthenticationForPatchUpdateUpdate,
    options?: PasswordAuthenticationsUpdateOptionalParams,
  ) => PollerLike<OperationState<PasswordAuthentication>, PasswordAuthentication>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    properties: PasswordAuthenticationForPatchUpdateUpdate,
    options?: PasswordAuthenticationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PasswordAuthentication>, PasswordAuthentication>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    properties: PasswordAuthenticationForPatchUpdateUpdate,
    options?: PasswordAuthenticationsUpdateOptionalParams,
  ) => Promise<PasswordAuthentication>;
  /** Creates or replaces the service-created PostgreSQL username-and-password authentication method. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    resource: PasswordAuthenticationCreateOrUpdate,
    options?: PasswordAuthenticationsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<PasswordAuthentication>, PasswordAuthentication>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    resource: PasswordAuthenticationCreateOrUpdate,
    options?: PasswordAuthenticationsCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PasswordAuthentication>, PasswordAuthentication>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    resource: PasswordAuthenticationCreateOrUpdate,
    options?: PasswordAuthenticationsCreateOrReplaceOptionalParams,
  ) => Promise<PasswordAuthentication>;
  /** Gets the service-created PostgreSQL username-and-password authentication method. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: PasswordAuthenticationsGetOptionalParams,
  ) => Promise<PasswordAuthentication>;
}

function _getPasswordAuthentications(context: HorizonDbContext) {
  return {
    update: (
      resourceGroupName: string,
      clusterName: string,
      properties: PasswordAuthenticationForPatchUpdateUpdate,
      options?: PasswordAuthenticationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      properties: PasswordAuthenticationForPatchUpdateUpdate,
      options?: PasswordAuthenticationsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      properties: PasswordAuthenticationForPatchUpdateUpdate,
      options?: PasswordAuthenticationsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, properties, options);
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      resource: PasswordAuthenticationCreateOrUpdate,
      options?: PasswordAuthenticationsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, clusterName, resource, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      resource: PasswordAuthenticationCreateOrUpdate,
      options?: PasswordAuthenticationsCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(context, resourceGroupName, clusterName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      resource: PasswordAuthenticationCreateOrUpdate,
      options?: PasswordAuthenticationsCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(context, resourceGroupName, clusterName, resource, options);
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: PasswordAuthenticationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getPasswordAuthenticationsOperations(
  context: HorizonDbContext,
): PasswordAuthenticationsOperations {
  return {
    ..._getPasswordAuthentications(context),
  };
}
