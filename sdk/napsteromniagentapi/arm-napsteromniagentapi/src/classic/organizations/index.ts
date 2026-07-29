// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CompanionAPIContext } from "../../api/companionAPIContext.js";
import {
  latestLinkedSaaS,
  linkSaaS,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/organizations/operations.js";
import type {
  OrganizationsLatestLinkedSaaSOptionalParams,
  OrganizationsLinkSaaSOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "../../api/organizations/options.js";
import type {
  OrganizationResource,
  OrganizationResourceUpdate,
  SaaSData,
  LatestLinkedSaaSResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Organizations operations. */
export interface OrganizationsOperations {
  /** Returns the latest SaaS linked to the Napster organization of the underlying monitor. */
  latestLinkedSaaS: (
    resourceGroupName: string,
    organizationname: string,
    options?: OrganizationsLatestLinkedSaaSOptionalParams,
  ) => Promise<LatestLinkedSaaSResponse>;
  /** Links a new SaaS to the Napster organization of the underlying monitor. */
  linkSaaS: (
    resourceGroupName: string,
    organizationname: string,
    body: SaaSData,
    options?: OrganizationsLinkSaaSOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
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
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
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

function _getOrganizations(context: CompanionAPIContext) {
  return {
    latestLinkedSaaS: (
      resourceGroupName: string,
      organizationname: string,
      options?: OrganizationsLatestLinkedSaaSOptionalParams,
    ) => latestLinkedSaaS(context, resourceGroupName, organizationname, options),
    linkSaaS: (
      resourceGroupName: string,
      organizationname: string,
      body: SaaSData,
      options?: OrganizationsLinkSaaSOptionalParams,
    ) => linkSaaS(context, resourceGroupName, organizationname, body, options),
    listBySubscription: (options?: OrganizationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OrganizationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      organizationname: string,
      options?: OrganizationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationname, options),
    update: (
      resourceGroupName: string,
      organizationname: string,
      properties: OrganizationResourceUpdate,
      options?: OrganizationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, organizationname, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationname: string,
      resource: OrganizationResource,
      options?: OrganizationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, organizationname, resource, options),
    get: (
      resourceGroupName: string,
      organizationname: string,
      options?: OrganizationsGetOptionalParams,
    ) => get(context, resourceGroupName, organizationname, options),
  };
}

export function _getOrganizationsOperations(context: CompanionAPIContext): OrganizationsOperations {
  return {
    ..._getOrganizations(context),
  };
}
