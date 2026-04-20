// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedServiceIdentityContext } from "../../api/managedServiceIdentityContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/userAssignedIdentities/operations.js";
import type {
  UserAssignedIdentitiesListBySubscriptionOptionalParams,
  UserAssignedIdentitiesListByResourceGroupOptionalParams,
  UserAssignedIdentitiesDeleteOptionalParams,
  UserAssignedIdentitiesUpdateOptionalParams,
  UserAssignedIdentitiesCreateOrUpdateOptionalParams,
  UserAssignedIdentitiesGetOptionalParams,
} from "../../api/userAssignedIdentities/options.js";
import type { Identity, IdentityUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UserAssignedIdentities operations. */
export interface UserAssignedIdentitiesOperations {
  /** Lists all the userAssignedIdentities available under the specified subscription. */
  listBySubscription: (
    options?: UserAssignedIdentitiesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Identity>;
  /** Lists all the userAssignedIdentities available under the specified ResourceGroup. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: UserAssignedIdentitiesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Identity>;
  /** Deletes the identity. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: UserAssignedIdentitiesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an identity in the specified subscription and resource group. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    parameters: IdentityUpdate,
    options?: UserAssignedIdentitiesUpdateOptionalParams,
  ) => Promise<Identity>;
  /** Create or update an identity in the specified subscription and resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: Identity,
    options?: UserAssignedIdentitiesCreateOrUpdateOptionalParams,
  ) => Promise<Identity>;
  /** Gets the identity. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: UserAssignedIdentitiesGetOptionalParams,
  ) => Promise<Identity>;
}

function _getUserAssignedIdentities(context: ManagedServiceIdentityContext) {
  return {
    listBySubscription: (options?: UserAssignedIdentitiesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: UserAssignedIdentitiesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: UserAssignedIdentitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      parameters: IdentityUpdate,
      options?: UserAssignedIdentitiesUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      parameters: Identity,
      options?: UserAssignedIdentitiesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, parameters, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: UserAssignedIdentitiesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getUserAssignedIdentitiesOperations(
  context: ManagedServiceIdentityContext,
): UserAssignedIdentitiesOperations {
  return {
    ..._getUserAssignedIdentities(context),
  };
}
