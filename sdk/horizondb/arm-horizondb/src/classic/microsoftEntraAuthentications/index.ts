// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  update,
  createOrReplace,
  get,
} from "../../api/microsoftEntraAuthentications/operations.js";
import type {
  MicrosoftEntraAuthenticationsUpdateOptionalParams,
  MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams,
  MicrosoftEntraAuthenticationsGetOptionalParams,
} from "../../api/microsoftEntraAuthentications/options.js";
import type {
  MicrosoftEntraAuthentication,
  MicrosoftEntraAuthenticationCreateOrUpdate,
  MicrosoftEntraAuthenticationForPatchUpdateUpdate,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MicrosoftEntraAuthentications operations. */
export interface MicrosoftEntraAuthenticationsOperations {
  /** Updates the service-created Microsoft Entra authentication method. State Enabled enables the feature and State Disabled disables it; no additional properties are required. Disabling the feature does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    properties: MicrosoftEntraAuthenticationForPatchUpdateUpdate,
    options?: MicrosoftEntraAuthenticationsUpdateOptionalParams,
  ) => PollerLike<OperationState<MicrosoftEntraAuthentication>, MicrosoftEntraAuthentication>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    properties: MicrosoftEntraAuthenticationForPatchUpdateUpdate,
    options?: MicrosoftEntraAuthenticationsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MicrosoftEntraAuthentication>, MicrosoftEntraAuthentication>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    properties: MicrosoftEntraAuthenticationForPatchUpdateUpdate,
    options?: MicrosoftEntraAuthenticationsUpdateOptionalParams,
  ) => Promise<MicrosoftEntraAuthentication>;
  /** Creates or replaces the service-created Microsoft Entra authentication method. State Enabled enables the feature and State Disabled disables it; no additional properties are required. Repeating the same request is idempotent. Disabling the feature does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    resource: MicrosoftEntraAuthenticationCreateOrUpdate,
    options?: MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<MicrosoftEntraAuthentication>, MicrosoftEntraAuthentication>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    resource: MicrosoftEntraAuthenticationCreateOrUpdate,
    options?: MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MicrosoftEntraAuthentication>, MicrosoftEntraAuthentication>
  >;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    resource: MicrosoftEntraAuthenticationCreateOrUpdate,
    options?: MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams,
  ) => Promise<MicrosoftEntraAuthentication>;
  /** Gets the service-created Microsoft Entra authentication method. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: MicrosoftEntraAuthenticationsGetOptionalParams,
  ) => Promise<MicrosoftEntraAuthentication>;
}

function _getMicrosoftEntraAuthentications(context: HorizonDbContext) {
  return {
    update: (
      resourceGroupName: string,
      clusterName: string,
      properties: MicrosoftEntraAuthenticationForPatchUpdateUpdate,
      options?: MicrosoftEntraAuthenticationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      properties: MicrosoftEntraAuthenticationForPatchUpdateUpdate,
      options?: MicrosoftEntraAuthenticationsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      properties: MicrosoftEntraAuthenticationForPatchUpdateUpdate,
      options?: MicrosoftEntraAuthenticationsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, properties, options);
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      resource: MicrosoftEntraAuthenticationCreateOrUpdate,
      options?: MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, clusterName, resource, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      resource: MicrosoftEntraAuthenticationCreateOrUpdate,
      options?: MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(context, resourceGroupName, clusterName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      resource: MicrosoftEntraAuthenticationCreateOrUpdate,
      options?: MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(context, resourceGroupName, clusterName, resource, options);
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: MicrosoftEntraAuthenticationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getMicrosoftEntraAuthenticationsOperations(
  context: HorizonDbContext,
): MicrosoftEntraAuthenticationsOperations {
  return {
    ..._getMicrosoftEntraAuthentications(context),
  };
}
