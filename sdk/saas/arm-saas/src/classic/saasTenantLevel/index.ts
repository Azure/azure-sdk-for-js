// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SaaSContext } from "../../api/saaSContext.js";
import {
  listAccessToken,
  list,
  deleteResource,
  updateResource,
  getResource,
} from "../../api/saasTenantLevel/operations.js";
import type {
  SaasTenantLevelListAccessTokenOptionalParams,
  SaasTenantLevelListOptionalParams,
  SaasTenantLevelDeleteResourceOptionalParams,
  SaasTenantLevelUpdateResourceOptionalParams,
  SaasTenantLevelGetResourceOptionalParams,
} from "../../api/saasTenantLevel/options.js";
import type {
  AccessTokenResult,
  SaasTenantResource,
  SaasTenantResourceUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SaasTenantLevel operations. */
export interface SaasTenantLevelOperations {
  /** Generates a publisher access token for a tenant-level SaaS resource. */
  listAccessToken: (
    resourceId: string,
    options?: SaasTenantLevelListAccessTokenOptionalParams,
  ) => Promise<AccessTokenResult>;
  /** Lists all tenant-level SaaS resources accessible to the caller. */
  list: (
    options?: SaasTenantLevelListOptionalParams,
  ) => PagedAsyncIterableIterator<SaasTenantResource>;
  /** Deletes a tenant-level SaaS resource. */
  deleteResource: (
    resourceId: string,
    options?: SaasTenantLevelDeleteResourceOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates mutable properties or tags on an existing tenant-level SaaS resource. */
  updateResource: (
    resourceId: string,
    properties: SaasTenantResourceUpdate,
    options?: SaasTenantLevelUpdateResourceOptionalParams,
  ) => PollerLike<OperationState<SaasTenantResource>, SaasTenantResource>;
  /** Gets a tenant-level SaaS resource by its identifier. */
  getResource: (
    resourceId: string,
    options?: SaasTenantLevelGetResourceOptionalParams,
  ) => Promise<SaasTenantResource>;
}

function _getSaasTenantLevel(context: SaaSContext) {
  return {
    listAccessToken: (resourceId: string, options?: SaasTenantLevelListAccessTokenOptionalParams) =>
      listAccessToken(context, resourceId, options),
    list: (options?: SaasTenantLevelListOptionalParams) => list(context, options),
    deleteResource: (resourceId: string, options?: SaasTenantLevelDeleteResourceOptionalParams) =>
      deleteResource(context, resourceId, options),
    updateResource: (
      resourceId: string,
      properties: SaasTenantResourceUpdate,
      options?: SaasTenantLevelUpdateResourceOptionalParams,
    ) => updateResource(context, resourceId, properties, options),
    getResource: (resourceId: string, options?: SaasTenantLevelGetResourceOptionalParams) =>
      getResource(context, resourceId, options),
  };
}

export function _getSaasTenantLevelOperations(context: SaaSContext): SaasTenantLevelOperations {
  return {
    ..._getSaasTenantLevel(context),
  };
}
