// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VerifiedIdContext } from "../../api/verifiedIdContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/authorities/operations.js";
import type {
  AuthoritiesListBySubscriptionOptionalParams,
  AuthoritiesListByResourceGroupOptionalParams,
  AuthoritiesDeleteOptionalParams,
  AuthoritiesUpdateOptionalParams,
  AuthoritiesCreateOrUpdateOptionalParams,
  AuthoritiesGetOptionalParams,
} from "../../api/authorities/options.js";
import type { Authority, AuthorityUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Authorities operations. */
export interface AuthoritiesOperations {
  /** List Authority resources by subscription ID */
  listBySubscription: (
    options?: AuthoritiesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Authority>;
  /** List Authority resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AuthoritiesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Authority>;
  /** Delete a Authority */
  delete: (
    resourceGroupName: string,
    authorityName: string,
    options?: AuthoritiesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Authority */
  update: (
    resourceGroupName: string,
    authorityName: string,
    properties: AuthorityUpdate,
    options?: AuthoritiesUpdateOptionalParams,
  ) => Promise<Authority>;
  /** Create a Authority */
  createOrUpdate: (
    resourceGroupName: string,
    authorityName: string,
    resource: Authority,
    options?: AuthoritiesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Authority>, Authority>;
  /** Get a Authority */
  get: (
    resourceGroupName: string,
    authorityName: string,
    options?: AuthoritiesGetOptionalParams,
  ) => Promise<Authority>;
}

function _getAuthorities(context: VerifiedIdContext) {
  return {
    listBySubscription: (options?: AuthoritiesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AuthoritiesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      authorityName: string,
      options?: AuthoritiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, authorityName, options),
    update: (
      resourceGroupName: string,
      authorityName: string,
      properties: AuthorityUpdate,
      options?: AuthoritiesUpdateOptionalParams,
    ) => update(context, resourceGroupName, authorityName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      authorityName: string,
      resource: Authority,
      options?: AuthoritiesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, authorityName, resource, options),
    get: (
      resourceGroupName: string,
      authorityName: string,
      options?: AuthoritiesGetOptionalParams,
    ) => get(context, resourceGroupName, authorityName, options),
  };
}

export function _getAuthoritiesOperations(context: VerifiedIdContext): AuthoritiesOperations {
  return {
    ..._getAuthorities(context),
  };
}
