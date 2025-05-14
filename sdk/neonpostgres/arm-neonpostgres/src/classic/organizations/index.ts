// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { OrganizationResource, PgVersionsResult } from "../../models/models.js";
import {
  OrganizationsGetPostgresVersionsOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "../../api/organizations/options.js";
import {
  getPostgresVersions,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/organizations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Organizations operations. */
export interface OrganizationsOperations {
  /** Action to retrieve the PostgreSQL versions. */
  getPostgresVersions: (
    resourceGroupName: string,
    options?: OrganizationsGetPostgresVersionsOptionalParams,
  ) => Promise<PgVersionsResult>;
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
    properties: OrganizationResource,
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

function _getOrganizations(context: PostgresContext) {
  return {
    getPostgresVersions: (
      resourceGroupName: string,
      options?: OrganizationsGetPostgresVersionsOptionalParams,
    ) => getPostgresVersions(context, resourceGroupName, options),
    listBySubscription: (
      options?: OrganizationsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
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
      properties: OrganizationResource,
      options?: OrganizationsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, organizationName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      resource: OrganizationResource,
      options?: OrganizationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, options),
  };
}

export function _getOrganizationsOperations(
  context: PostgresContext,
): OrganizationsOperations {
  return {
    ..._getOrganizations(context),
  };
}
