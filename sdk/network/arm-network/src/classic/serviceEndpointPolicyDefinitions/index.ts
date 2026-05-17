// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/serviceEndpointPolicyDefinitions/operations.js";
import {
  ServiceEndpointPolicyDefinitionsListByResourceGroupOptionalParams,
  ServiceEndpointPolicyDefinitionsDeleteOptionalParams,
  ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams,
  ServiceEndpointPolicyDefinitionsGetOptionalParams,
} from "../../api/serviceEndpointPolicyDefinitions/options.js";
import { ServiceEndpointPolicyDefinition } from "../../models/common/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServiceEndpointPolicyDefinitions operations. */
export interface ServiceEndpointPolicyDefinitionsOperations {
  /** Gets all service endpoint policy definitions in a service end point policy. */
  listByResourceGroup: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    options?: ServiceEndpointPolicyDefinitionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceEndpointPolicyDefinition>;
  /** Deletes the specified ServiceEndpoint policy definitions. */
  delete: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    serviceEndpointPolicyDefinitionName: string,
    options?: ServiceEndpointPolicyDefinitionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    serviceEndpointPolicyDefinitionName: string,
    options?: ServiceEndpointPolicyDefinitionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    serviceEndpointPolicyDefinitionName: string,
    options?: ServiceEndpointPolicyDefinitionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a service endpoint policy definition in the specified service endpoint policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    serviceEndpointPolicyDefinitionName: string,
    serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition,
    options?: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServiceEndpointPolicyDefinition>, ServiceEndpointPolicyDefinition>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    serviceEndpointPolicyDefinitionName: string,
    serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition,
    options?: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ServiceEndpointPolicyDefinition>,
      ServiceEndpointPolicyDefinition
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    serviceEndpointPolicyDefinitionName: string,
    serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition,
    options?: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<ServiceEndpointPolicyDefinition>;
  /** Get a ServiceEndpointPolicyDefinition */
  get: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    serviceEndpointPolicyDefinitionName: string,
    options?: ServiceEndpointPolicyDefinitionsGetOptionalParams,
  ) => Promise<ServiceEndpointPolicyDefinition>;
}

function _getServiceEndpointPolicyDefinitions(context: NetworkManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      options?: ServiceEndpointPolicyDefinitionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, serviceEndpointPolicyName, options),
    delete: (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      serviceEndpointPolicyDefinitionName: string,
      options?: ServiceEndpointPolicyDefinitionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        serviceEndpointPolicyDefinitionName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      serviceEndpointPolicyDefinitionName: string,
      options?: ServiceEndpointPolicyDefinitionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        serviceEndpointPolicyDefinitionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      serviceEndpointPolicyDefinitionName: string,
      options?: ServiceEndpointPolicyDefinitionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        serviceEndpointPolicyDefinitionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      serviceEndpointPolicyDefinitionName: string,
      serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition,
      options?: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        serviceEndpointPolicyDefinitionName,
        serviceEndpointPolicyDefinitions,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      serviceEndpointPolicyDefinitionName: string,
      serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition,
      options?: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        serviceEndpointPolicyDefinitionName,
        serviceEndpointPolicyDefinitions,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      serviceEndpointPolicyDefinitionName: string,
      serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinition,
      options?: ServiceEndpointPolicyDefinitionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        serviceEndpointPolicyDefinitionName,
        serviceEndpointPolicyDefinitions,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      serviceEndpointPolicyDefinitionName: string,
      options?: ServiceEndpointPolicyDefinitionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        serviceEndpointPolicyDefinitionName,
        options,
      ),
  };
}

export function _getServiceEndpointPolicyDefinitionsOperations(
  context: NetworkManagementContext,
): ServiceEndpointPolicyDefinitionsOperations {
  return {
    ..._getServiceEndpointPolicyDefinitions(context),
  };
}
