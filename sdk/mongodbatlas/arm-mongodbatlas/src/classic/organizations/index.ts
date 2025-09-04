// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AtlasContext } from "../../api/atlasContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/organizations/operations.js";
import {
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "../../api/organizations/options.js";
import { OrganizationResource, OrganizationResourceUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Organizations operations. */
export interface OrganizationsOperations {
  /** List OrganizationResource resources by subscription ID */
  listBySubscription: (
    options?: OrganizationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OrganizationResource>;
  /** List OrganizationResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OrganizationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OrganizationResource>;
  /** Delete a OrganizationResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a OrganizationResource */
  update: (
    resourceGroupName: string,
    organizationName: string,
    properties: OrganizationResourceUpdate,
    options?: OrganizationsUpdateOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
  /** Create a OrganizationResource */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    resource: OrganizationResource,
    options?: OrganizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
  /** Get a OrganizationResource */
  get: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsGetOptionalParams,
  ) => Promise<OrganizationResource>;
}

function _getOrganizations(context: AtlasContext) {
  return {
    listBySubscription: (options?: OrganizationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OrganizationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, options),
    update: (
      resourceGroupName: string,
      organizationName: string,
      properties: OrganizationResourceUpdate,
      options?: OrganizationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, organizationName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      resource: OrganizationResource,
      options?: OrganizationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, organizationName, resource, options),
    get: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, options),
  };
}

export function _getOrganizationsOperations(context: AtlasContext): OrganizationsOperations {
  return {
    ..._getOrganizations(context),
  };
}
