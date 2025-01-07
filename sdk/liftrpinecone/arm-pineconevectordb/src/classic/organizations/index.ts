// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VectorDbContext } from "../../api/vectorDbContext.js";
import {
  organizationsGet,
  organizationsCreateOrUpdate,
  organizationsUpdate,
  organizationsDelete,
  organizationsListByResourceGroup,
  organizationsListBySubscription,
} from "../../api/organizations/index.js";
import { OrganizationResource, OrganizationResourceUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  OrganizationsGetOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
} from "../../api/options.js";

/** Interface representing a Organizations operations. */
export interface OrganizationsOperations {
  /** Get a OrganizationResource */
  get: (
    resourceGroupName: string,
    organizationname: string,
    options?: OrganizationsGetOptionalParams,
  ) => Promise<OrganizationResource>;
  /** Create a OrganizationResource */
  createOrUpdate: (
    resourceGroupName: string,
    organizationname: string,
    resource: OrganizationResource,
    options?: OrganizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
  /** Update a OrganizationResource */
  update: (
    resourceGroupName: string,
    organizationname: string,
    properties: OrganizationResourceUpdate,
    options?: OrganizationsUpdateOptionalParams,
  ) => Promise<OrganizationResource>;
  /** Delete a OrganizationResource */
  delete: (
    resourceGroupName: string,
    organizationname: string,
    options?: OrganizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List OrganizationResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OrganizationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OrganizationResource>;
  /** List OrganizationResource resources by subscription ID */
  listBySubscription: (
    options?: OrganizationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OrganizationResource>;
}

export function getOrganizations(context: VectorDbContext, subscriptionId: string) {
  return {
    get: (
      resourceGroupName: string,
      organizationname: string,
      options?: OrganizationsGetOptionalParams,
    ) => organizationsGet(context, subscriptionId, resourceGroupName, organizationname, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationname: string,
      resource: OrganizationResource,
      options?: OrganizationsCreateOrUpdateOptionalParams,
    ) =>
      organizationsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        organizationname,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      organizationname: string,
      properties: OrganizationResourceUpdate,
      options?: OrganizationsUpdateOptionalParams,
    ) =>
      organizationsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        organizationname,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      organizationname: string,
      options?: OrganizationsDeleteOptionalParams,
    ) => organizationsDelete(context, subscriptionId, resourceGroupName, organizationname, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OrganizationsListByResourceGroupOptionalParams,
    ) => organizationsListByResourceGroup(context, subscriptionId, resourceGroupName, options),
    listBySubscription: (options?: OrganizationsListBySubscriptionOptionalParams) =>
      organizationsListBySubscription(context, subscriptionId, options),
  };
}

export function getOrganizationsOperations(
  context: VectorDbContext,
  subscriptionId: string,
): OrganizationsOperations {
  return {
    ...getOrganizations(context, subscriptionId),
  };
}
