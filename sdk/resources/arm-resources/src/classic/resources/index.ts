// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext } from "../../api/resourceManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
  checkExistence,
  deleteById,
  updateById,
  createOrUpdateById,
  getById,
  checkExistenceById,
  validateMoveResources,
  moveResources,
  listByResourceGroup,
} from "../../api/resources/operations.js";
import {
  ResourcesListOptionalParams,
  ResourcesDeleteOptionalParams,
  ResourcesUpdateOptionalParams,
  ResourcesCreateOrUpdateOptionalParams,
  ResourcesGetOptionalParams,
  ResourcesCheckExistenceOptionalParams,
  ResourcesDeleteByIdOptionalParams,
  ResourcesUpdateByIdOptionalParams,
  ResourcesCreateOrUpdateByIdOptionalParams,
  ResourcesGetByIdOptionalParams,
  ResourcesCheckExistenceByIdOptionalParams,
  ResourcesValidateMoveResourcesOptionalParams,
  ResourcesMoveResourcesOptionalParams,
  ResourcesListByResourceGroupOptionalParams,
} from "../../api/resources/options.js";
import {
  GenericResourceExpanded,
  GenericResource,
  ResourcesMoveInfo,
  ResourcesCheckExistenceResponse,
  ResourcesCheckExistenceByIdResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Resources operations. */
export interface ResourcesOperations {
  /** Get all the resources in a subscription. */
  list: (
    options?: ResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<GenericResourceExpanded>;
  /** Deletes a resource. */
  delete: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    options?: ResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    options?: ResourcesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    options?: ResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a resource. */
  update: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesUpdateOptionalParams,
  ) => PollerLike<OperationState<GenericResource>, GenericResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GenericResource>, GenericResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesUpdateOptionalParams,
  ) => Promise<GenericResource>;
  /** Creates a resource. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GenericResource>, GenericResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GenericResource>, GenericResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesCreateOrUpdateOptionalParams,
  ) => Promise<GenericResource>;
  /** Gets a resource. */
  get: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    options?: ResourcesGetOptionalParams,
  ) => Promise<GenericResource>;
  /** Checks whether a resource exists. */
  checkExistence: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    apiVersion: string,
    options?: ResourcesCheckExistenceOptionalParams,
  ) => Promise<ResourcesCheckExistenceResponse>;
  /** Deletes a resource by ID. */
  deleteById: (
    resourceId: string,
    apiVersion: string,
    options?: ResourcesDeleteByIdOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteById instead */
  beginDeleteById: (
    resourceId: string,
    apiVersion: string,
    options?: ResourcesDeleteByIdOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteById instead */
  beginDeleteByIdAndWait: (
    resourceId: string,
    apiVersion: string,
    options?: ResourcesDeleteByIdOptionalParams,
  ) => Promise<void>;
  /** Update a resource by ID. */
  updateById: (
    resourceId: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesUpdateByIdOptionalParams,
  ) => PollerLike<OperationState<GenericResource>, GenericResource>;
  /** @deprecated use updateById instead */
  beginUpdateById: (
    resourceId: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesUpdateByIdOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GenericResource>, GenericResource>>;
  /** @deprecated use updateById instead */
  beginUpdateByIdAndWait: (
    resourceId: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesUpdateByIdOptionalParams,
  ) => Promise<GenericResource>;
  /** Create a resource by ID. */
  createOrUpdateById: (
    resourceId: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesCreateOrUpdateByIdOptionalParams,
  ) => PollerLike<OperationState<GenericResource>, GenericResource>;
  /** @deprecated use createOrUpdateById instead */
  beginCreateOrUpdateById: (
    resourceId: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesCreateOrUpdateByIdOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GenericResource>, GenericResource>>;
  /** @deprecated use createOrUpdateById instead */
  beginCreateOrUpdateByIdAndWait: (
    resourceId: string,
    apiVersion: string,
    parameters: GenericResource,
    options?: ResourcesCreateOrUpdateByIdOptionalParams,
  ) => Promise<GenericResource>;
  /** Gets a resource by ID. */
  getById: (
    resourceId: string,
    apiVersion: string,
    options?: ResourcesGetByIdOptionalParams,
  ) => Promise<GenericResource>;
  /** Checks by ID whether a resource exists. This API currently works only for a limited set of Resource providers. In the event that a Resource provider does not implement this API, ARM will respond with a 405. The alternative then is to use the GET API to check for the existence of the resource. */
  checkExistenceById: (
    resourceId: string,
    apiVersion: string,
    options?: ResourcesCheckExistenceByIdOptionalParams,
  ) => Promise<ResourcesCheckExistenceByIdResponse>;
  /** This operation checks whether the specified resources can be moved to the target. The resources to be moved must be in the same source resource group in the source subscription being used. The target resource group may be in a different subscription. If validation succeeds, it returns HTTP response code 204 (no content). If validation fails, it returns HTTP response code 409 (Conflict) with an error message. Retrieve the URL in the Location header value to check the result of the long-running operation. */
  validateMoveResources: (
    sourceResourceGroupName: string,
    parameters: ResourcesMoveInfo,
    options?: ResourcesValidateMoveResourcesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use validateMoveResources instead */
  beginValidateMoveResources: (
    sourceResourceGroupName: string,
    parameters: ResourcesMoveInfo,
    options?: ResourcesValidateMoveResourcesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use validateMoveResources instead */
  beginValidateMoveResourcesAndWait: (
    sourceResourceGroupName: string,
    parameters: ResourcesMoveInfo,
    options?: ResourcesValidateMoveResourcesOptionalParams,
  ) => Promise<void>;
  /** The resources to be moved must be in the same source resource group in the source subscription being used. The target resource group may be in a different subscription. When moving resources, both the source group and the target group are locked for the duration of the operation. Write and delete operations are blocked on the groups until the move completes. */
  moveResources: (
    sourceResourceGroupName: string,
    parameters: ResourcesMoveInfo,
    options?: ResourcesMoveResourcesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use moveResources instead */
  beginMoveResources: (
    sourceResourceGroupName: string,
    parameters: ResourcesMoveInfo,
    options?: ResourcesMoveResourcesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use moveResources instead */
  beginMoveResourcesAndWait: (
    sourceResourceGroupName: string,
    parameters: ResourcesMoveInfo,
    options?: ResourcesMoveResourcesOptionalParams,
  ) => Promise<void>;
  /** Get all the resources for a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ResourcesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<GenericResourceExpanded>;
}

function _getResources(context: ResourceManagementContext) {
  return {
    list: (options?: ResourcesListOptionalParams) => list(context, options),
    delete: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      options?: ResourcesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      options?: ResourcesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      options?: ResourcesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      options?: ResourcesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        options,
      ),
    checkExistence: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      apiVersion: string,
      options?: ResourcesCheckExistenceOptionalParams,
    ) =>
      checkExistence(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        apiVersion,
        options,
      ),
    deleteById: (
      resourceId: string,
      apiVersion: string,
      options?: ResourcesDeleteByIdOptionalParams,
    ) => deleteById(context, resourceId, apiVersion, options),
    beginDeleteById: async (
      resourceId: string,
      apiVersion: string,
      options?: ResourcesDeleteByIdOptionalParams,
    ) => {
      const poller = deleteById(context, resourceId, apiVersion, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteByIdAndWait: async (
      resourceId: string,
      apiVersion: string,
      options?: ResourcesDeleteByIdOptionalParams,
    ) => {
      return await deleteById(context, resourceId, apiVersion, options);
    },
    updateById: (
      resourceId: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesUpdateByIdOptionalParams,
    ) => updateById(context, resourceId, apiVersion, parameters, options),
    beginUpdateById: async (
      resourceId: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesUpdateByIdOptionalParams,
    ) => {
      const poller = updateById(context, resourceId, apiVersion, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateByIdAndWait: async (
      resourceId: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesUpdateByIdOptionalParams,
    ) => {
      return await updateById(context, resourceId, apiVersion, parameters, options);
    },
    createOrUpdateById: (
      resourceId: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesCreateOrUpdateByIdOptionalParams,
    ) => createOrUpdateById(context, resourceId, apiVersion, parameters, options),
    beginCreateOrUpdateById: async (
      resourceId: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesCreateOrUpdateByIdOptionalParams,
    ) => {
      const poller = createOrUpdateById(context, resourceId, apiVersion, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateByIdAndWait: async (
      resourceId: string,
      apiVersion: string,
      parameters: GenericResource,
      options?: ResourcesCreateOrUpdateByIdOptionalParams,
    ) => {
      return await createOrUpdateById(context, resourceId, apiVersion, parameters, options);
    },
    getById: (resourceId: string, apiVersion: string, options?: ResourcesGetByIdOptionalParams) =>
      getById(context, resourceId, apiVersion, options),
    checkExistenceById: (
      resourceId: string,
      apiVersion: string,
      options?: ResourcesCheckExistenceByIdOptionalParams,
    ) => checkExistenceById(context, resourceId, apiVersion, options),
    validateMoveResources: (
      sourceResourceGroupName: string,
      parameters: ResourcesMoveInfo,
      options?: ResourcesValidateMoveResourcesOptionalParams,
    ) => validateMoveResources(context, sourceResourceGroupName, parameters, options),
    beginValidateMoveResources: async (
      sourceResourceGroupName: string,
      parameters: ResourcesMoveInfo,
      options?: ResourcesValidateMoveResourcesOptionalParams,
    ) => {
      const poller = validateMoveResources(context, sourceResourceGroupName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateMoveResourcesAndWait: async (
      sourceResourceGroupName: string,
      parameters: ResourcesMoveInfo,
      options?: ResourcesValidateMoveResourcesOptionalParams,
    ) => {
      return await validateMoveResources(context, sourceResourceGroupName, parameters, options);
    },
    moveResources: (
      sourceResourceGroupName: string,
      parameters: ResourcesMoveInfo,
      options?: ResourcesMoveResourcesOptionalParams,
    ) => moveResources(context, sourceResourceGroupName, parameters, options),
    beginMoveResources: async (
      sourceResourceGroupName: string,
      parameters: ResourcesMoveInfo,
      options?: ResourcesMoveResourcesOptionalParams,
    ) => {
      const poller = moveResources(context, sourceResourceGroupName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMoveResourcesAndWait: async (
      sourceResourceGroupName: string,
      parameters: ResourcesMoveInfo,
      options?: ResourcesMoveResourcesOptionalParams,
    ) => {
      return await moveResources(context, sourceResourceGroupName, parameters, options);
    },
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ResourcesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
  };
}

export function _getResourcesOperations(context: ResourceManagementContext): ResourcesOperations {
  return {
    ..._getResources(context),
  };
}
