// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VectorDbContext } from "../../api/vectorDbContext.js";
import {
  organizationsListBySubscription,
  organizationsListByResourceGroup,
  organizationsDelete,
  organizationsUpdate,
  organizationsCreateOrUpdate,
  organizationsGet,
} from "../../api/organizations/index.js";
import { OrganizationResource, OrganizationResourceUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "../../api/options.js";

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
  delete: (
    resourceGroupName: string,
    organizationname: string,
    options?: OrganizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a OrganizationResource */
  update: (
    resourceGroupName: string,
    organizationname: string,
    properties: OrganizationResourceUpdate,
    options?: OrganizationsUpdateOptionalParams,
  ) => Promise<OrganizationResource>;
  /** Create a OrganizationResource */
  createOrUpdate: (
    resourceGroupName: string,
    organizationname: string,
    resource: OrganizationResource,
    options?: OrganizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
  /** Get a OrganizationResource */
  get: (
    resourceGroupName: string,
    organizationname: string,
    options?: OrganizationsGetOptionalParams,
  ) => Promise<OrganizationResource>;
}

function _getOrganizations(context: VectorDbContext) {
  return {
    listBySubscription: (options?: OrganizationsListBySubscriptionOptionalParams) =>
      organizationsListBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OrganizationsListByResourceGroupOptionalParams,
    ) => organizationsListByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      organizationname: string,
      options?: OrganizationsDeleteOptionalParams,
    ) => organizationsDelete(context, resourceGroupName, organizationname, options),
    update: (
      resourceGroupName: string,
      organizationname: string,
      properties: OrganizationResourceUpdate,
      options?: OrganizationsUpdateOptionalParams,
    ) => organizationsUpdate(context, resourceGroupName, organizationname, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationname: string,
      resource: OrganizationResource,
      options?: OrganizationsCreateOrUpdateOptionalParams,
    ) =>
      organizationsCreateOrUpdate(context, resourceGroupName, organizationname, resource, options),
    get: (
      resourceGroupName: string,
      organizationname: string,
      options?: OrganizationsGetOptionalParams,
    ) => organizationsGet(context, resourceGroupName, organizationname, options),
  };
}

export function _getOrganizationsOperations(context: VectorDbContext): OrganizationsOperations {
  return {
    ..._getOrganizations(context),
  };
}
