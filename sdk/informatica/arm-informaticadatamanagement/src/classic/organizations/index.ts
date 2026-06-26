// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InformaticaDataManagementContext } from "../../api/informaticaDataManagementContext.js";
import {
  getAllServerlessRuntimes,
  getServerlessMetadata,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/organizations/operations.js";
import type {
  OrganizationsGetAllServerlessRuntimesOptionalParams,
  OrganizationsGetServerlessMetadataOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "../../api/organizations/options.js";
import type {
  InformaticaOrganizationResource,
  InformaticaOrganizationResourceUpdate,
  ServerlessMetadataResponse,
  InformaticaServerlessRuntimeResourceList,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Organizations operations. */
export interface OrganizationsOperations {
  /** Gets all serverless runtime resources in a given informatica organization resource. */
  getAllServerlessRuntimes: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsGetAllServerlessRuntimesOptionalParams,
  ) => Promise<InformaticaServerlessRuntimeResourceList>;
  /** Gets Metadata of the serverless runtime environment. */
  getServerlessMetadata: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsGetServerlessMetadataOptionalParams,
  ) => Promise<ServerlessMetadataResponse>;
  /** List InformaticaOrganizationResource resources by subscription ID */
  listBySubscription: (
    options?: OrganizationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<InformaticaOrganizationResource>;
  /** List InformaticaOrganizationResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OrganizationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<InformaticaOrganizationResource>;
  /** Delete a InformaticaOrganizationResource */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a InformaticaOrganizationResource */
  update: (
    resourceGroupName: string,
    organizationName: string,
    properties: InformaticaOrganizationResourceUpdate,
    options?: OrganizationsUpdateOptionalParams,
  ) => Promise<InformaticaOrganizationResource>;
  /** Create a InformaticaOrganizationResource */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    resource: InformaticaOrganizationResource,
    options?: OrganizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InformaticaOrganizationResource>, InformaticaOrganizationResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    resource: InformaticaOrganizationResource,
    options?: OrganizationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<InformaticaOrganizationResource>,
      InformaticaOrganizationResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    organizationName: string,
    resource: InformaticaOrganizationResource,
    options?: OrganizationsCreateOrUpdateOptionalParams,
  ) => Promise<InformaticaOrganizationResource>;
  /** Get a InformaticaOrganizationResource */
  get: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationsGetOptionalParams,
  ) => Promise<InformaticaOrganizationResource>;
}

function _getOrganizations(context: InformaticaDataManagementContext) {
  return {
    getAllServerlessRuntimes: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsGetAllServerlessRuntimesOptionalParams,
    ) => getAllServerlessRuntimes(context, resourceGroupName, organizationName, options),
    getServerlessMetadata: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsGetServerlessMetadataOptionalParams,
    ) => getServerlessMetadata(context, resourceGroupName, organizationName, options),
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
    beginDelete: async (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, organizationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, organizationName, options);
    },
    update: (
      resourceGroupName: string,
      organizationName: string,
      properties: InformaticaOrganizationResourceUpdate,
      options?: OrganizationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, organizationName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      resource: InformaticaOrganizationResource,
      options?: OrganizationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, organizationName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      organizationName: string,
      resource: InformaticaOrganizationResource,
      options?: OrganizationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      resource: InformaticaOrganizationResource,
      options?: OrganizationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, organizationName, resource, options);
    },
    get: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationsGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, options),
  };
}

export function _getOrganizationsOperations(
  context: InformaticaDataManagementContext,
): OrganizationsOperations {
  return {
    ..._getOrganizations(context),
  };
}
