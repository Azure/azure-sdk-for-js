// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import {
  createApiKey,
  listClusters,
  getClusterById,
  getSchemaRegistryClusterById,
  listSchemaRegistryClusters,
  listEnvironments,
  getEnvironmentById,
  listRegions,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
  deleteClusterAPIKey,
  getClusterAPIKey,
} from "../../api/organization/operations.js";
import {
  OrganizationCreateApiKeyOptionalParams,
  OrganizationListClustersOptionalParams,
  OrganizationGetClusterByIdOptionalParams,
  OrganizationGetSchemaRegistryClusterByIdOptionalParams,
  OrganizationListSchemaRegistryClustersOptionalParams,
  OrganizationListEnvironmentsOptionalParams,
  OrganizationGetEnvironmentByIdOptionalParams,
  OrganizationListRegionsOptionalParams,
  OrganizationListBySubscriptionOptionalParams,
  OrganizationListByResourceGroupOptionalParams,
  OrganizationDeleteOptionalParams,
  OrganizationUpdateOptionalParams,
  OrganizationCreateOptionalParams,
  OrganizationGetOptionalParams,
  OrganizationDeleteClusterAPIKeyOptionalParams,
  OrganizationGetClusterAPIKeyOptionalParams,
} from "../../api/organization/options.js";
import {
  APIKeyRecord,
  OrganizationResource,
  ListAccessRequestModel,
  ListRegionsSuccessResponse,
  SCEnvironmentRecord,
  SchemaRegistryClusterRecord,
  SCClusterRecord,
  CreateAPIKeyModel,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Organization operations. */
export interface OrganizationOperations {
  /** Creates API key for a schema registry Cluster ID or Kafka Cluster ID under a environment */
  createApiKey: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    body: CreateAPIKeyModel,
    options?: OrganizationCreateApiKeyOptionalParams,
  ) => Promise<APIKeyRecord>;
  /** Lists of all the clusters in a environment */
  listClusters: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    options?: OrganizationListClustersOptionalParams,
  ) => PagedAsyncIterableIterator<SCClusterRecord>;
  /** Get cluster by Id */
  getClusterById: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    options?: OrganizationGetClusterByIdOptionalParams,
  ) => Promise<SCClusterRecord>;
  /** Get schema registry cluster by Id */
  getSchemaRegistryClusterById: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    options?: OrganizationGetSchemaRegistryClusterByIdOptionalParams,
  ) => Promise<SchemaRegistryClusterRecord>;
  /** Get schema registry clusters */
  listSchemaRegistryClusters: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    options?: OrganizationListSchemaRegistryClustersOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaRegistryClusterRecord>;
  /** Lists of all the environments in a organization */
  listEnvironments: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationListEnvironmentsOptionalParams,
  ) => PagedAsyncIterableIterator<SCEnvironmentRecord>;
  /** Get Environment details by environment Id */
  getEnvironmentById: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    options?: OrganizationGetEnvironmentByIdOptionalParams,
  ) => Promise<SCEnvironmentRecord>;
  /** cloud provider regions available for creating Schema Registry clusters. */
  listRegions: (
    resourceGroupName: string,
    organizationName: string,
    body: ListAccessRequestModel,
    options?: OrganizationListRegionsOptionalParams,
  ) => Promise<ListRegionsSuccessResponse>;
  /** List all organizations under the specified subscription. */
  listBySubscription: (
    options?: OrganizationListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OrganizationResource>;
  /** List all Organizations under the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OrganizationListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OrganizationResource>;
  /** Delete Organization resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update Organization resource */
  update: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationUpdateOptionalParams,
  ) => Promise<OrganizationResource>;
  /** Create Organization resource */
  create: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationCreateOptionalParams,
  ) => PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
  /** Get the properties of a specific Organization resource. */
  get: (
    resourceGroupName: string,
    organizationName: string,
    options?: OrganizationGetOptionalParams,
  ) => Promise<OrganizationResource>;
  /** Deletes API key of a kafka or schema registry cluster */
  deleteClusterAPIKey: (
    resourceGroupName: string,
    organizationName: string,
    apiKeyId: string,
    options?: OrganizationDeleteClusterAPIKeyOptionalParams,
  ) => Promise<void>;
  /** Get API key details of a kafka or schema registry cluster */
  getClusterAPIKey: (
    resourceGroupName: string,
    organizationName: string,
    apiKeyId: string,
    options?: OrganizationGetClusterAPIKeyOptionalParams,
  ) => Promise<APIKeyRecord>;
}

function _getOrganization(context: ConfluentManagementContext) {
  return {
    createApiKey: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      body: CreateAPIKeyModel,
      options?: OrganizationCreateApiKeyOptionalParams,
    ) =>
      createApiKey(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        body,
        options,
      ),
    listClusters: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      options?: OrganizationListClustersOptionalParams,
    ) => listClusters(context, resourceGroupName, organizationName, environmentId, options),
    getClusterById: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      options?: OrganizationGetClusterByIdOptionalParams,
    ) =>
      getClusterById(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        options,
      ),
    getSchemaRegistryClusterById: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      options?: OrganizationGetSchemaRegistryClusterByIdOptionalParams,
    ) =>
      getSchemaRegistryClusterById(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        options,
      ),
    listSchemaRegistryClusters: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      options?: OrganizationListSchemaRegistryClustersOptionalParams,
    ) =>
      listSchemaRegistryClusters(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        options,
      ),
    listEnvironments: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationListEnvironmentsOptionalParams,
    ) => listEnvironments(context, resourceGroupName, organizationName, options),
    getEnvironmentById: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      options?: OrganizationGetEnvironmentByIdOptionalParams,
    ) => getEnvironmentById(context, resourceGroupName, organizationName, environmentId, options),
    listRegions: (
      resourceGroupName: string,
      organizationName: string,
      body: ListAccessRequestModel,
      options?: OrganizationListRegionsOptionalParams,
    ) => listRegions(context, resourceGroupName, organizationName, body, options),
    listBySubscription: (options?: OrganizationListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OrganizationListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, options),
    update: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationUpdateOptionalParams,
    ) => update(context, resourceGroupName, organizationName, options),
    create: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationCreateOptionalParams,
    ) => create(context, resourceGroupName, organizationName, options),
    get: (
      resourceGroupName: string,
      organizationName: string,
      options?: OrganizationGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, options),
    deleteClusterAPIKey: (
      resourceGroupName: string,
      organizationName: string,
      apiKeyId: string,
      options?: OrganizationDeleteClusterAPIKeyOptionalParams,
    ) => deleteClusterAPIKey(context, resourceGroupName, organizationName, apiKeyId, options),
    getClusterAPIKey: (
      resourceGroupName: string,
      organizationName: string,
      apiKeyId: string,
      options?: OrganizationGetClusterAPIKeyOptionalParams,
    ) => getClusterAPIKey(context, resourceGroupName, organizationName, apiKeyId, options),
  };
}

export function _getOrganizationOperations(
  context: ConfluentManagementContext,
): OrganizationOperations {
  return {
    ..._getOrganization(context),
  };
}
