// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import {
  organizationsGet,
  organizationsCreateOrUpdate,
  organizationsUpdate,
  organizationsDelete,
  organizationsListByResourceGroup,
  organizationsListBySubscription,
} from "../../api/organizations/index.js";
import { OrganizationResource } from "../../models/models.js";
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
    organizationName: string,
    options?: OrganizationsGetOptionalParams,
  ) => Promise<OrganizationResource>;
  /** Create a OrganizationResource */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    resource: OrganizationResource,
    options?: OrganizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
  /** Update a OrganizationResource */
  update: (
    resourceGroupName: string,
    organizationName: string,
    properties: OrganizationResource,
    options?: OrganizationsUpdateOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
  /** Delete a OrganizationResource */
  delete: (
    resourceGroupName: string,
    organizationName: string,
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

export function getOrganizations(context: PostgresContext, subscriptionId: string) {
  return {
    get: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsGetOptionalParams,
    ) => organizationsGet(context, subscriptionId, resourceGroupName, organizationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      resource: OrganizationResource,
      options?: OrganizationsCreateOrUpdateOptionalParams,
    ) =>
      organizationsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        organizationName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      organizationName: string,
      properties: OrganizationResource,
      options?: OrganizationsUpdateOptionalParams,
    ) =>
      organizationsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        organizationName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsDeleteOptionalParams,
    ) => organizationsDelete(context, subscriptionId, resourceGroupName, organizationName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OrganizationsListByResourceGroupOptionalParams,
    ) => organizationsListByResourceGroup(context, subscriptionId, resourceGroupName, options),
    listBySubscription: (options?: OrganizationsListBySubscriptionOptionalParams) =>
      organizationsListBySubscription(context, subscriptionId, options),
  };
}

export function getOrganizationsOperations(
  context: PostgresContext,
  subscriptionId: string,
): OrganizationsOperations {
  return {
    ...getOrganizations(context, subscriptionId),
  };
}
