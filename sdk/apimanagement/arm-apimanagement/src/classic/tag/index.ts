// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityState,
  get,
  listByProduct,
  detachFromProduct,
  assignToProduct,
  getEntityStateByProduct,
  getByProduct,
  listByOperation,
  detachFromOperation,
  assignToOperation,
  getEntityStateByOperation,
  getByOperation,
  listByApi,
  detachFromApi,
  assignToApi,
  getEntityStateByApi,
  getByApi,
} from "../../api/tag/operations.js";
import type {
  TagListByServiceOptionalParams,
  TagDeleteOptionalParams,
  TagUpdateOptionalParams,
  TagCreateOrUpdateOptionalParams,
  TagGetEntityStateOptionalParams,
  TagGetOptionalParams,
  TagListByProductOptionalParams,
  TagDetachFromProductOptionalParams,
  TagAssignToProductOptionalParams,
  TagGetEntityStateByProductOptionalParams,
  TagGetByProductOptionalParams,
  TagListByOperationOptionalParams,
  TagDetachFromOperationOptionalParams,
  TagAssignToOperationOptionalParams,
  TagGetEntityStateByOperationOptionalParams,
  TagGetByOperationOptionalParams,
  TagListByApiOptionalParams,
  TagDetachFromApiOptionalParams,
  TagAssignToApiOptionalParams,
  TagGetEntityStateByApiOptionalParams,
  TagGetByApiOptionalParams,
} from "../../api/tag/options.js";
import type { TagContract, TagCreateUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Tag operations. */
export interface TagOperations {
  /** Lists a collection of tags defined within a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: TagListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<TagContract>;
  /** Deletes specific tag of the API Management service instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    ifMatch: string,
    options?: TagDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the tag specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    ifMatch: string,
    parameters: TagCreateUpdateParameters,
    options?: TagUpdateOptionalParams,
  ) => Promise<TagContract>;
  /** Creates a tag. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    parameters: TagCreateUpdateParameters,
    options?: TagCreateOrUpdateOptionalParams,
  ) => Promise<TagContract>;
  /** Gets the entity state version of the tag specified by its identifier. */
  getEntityState: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    options?: TagGetEntityStateOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the tag specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    options?: TagGetOptionalParams,
  ) => Promise<TagContract>;
  /** Lists all Tags associated with the Product. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: TagListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<TagContract>;
  /** Detach the tag from the Product. */
  detachFromProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    tagId: string,
    options?: TagDetachFromProductOptionalParams,
  ) => Promise<void>;
  /** Assign tag to the Product. */
  assignToProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    tagId: string,
    options?: TagAssignToProductOptionalParams,
  ) => Promise<TagContract>;
  /** Gets the entity state version of the tag specified by its identifier. */
  getEntityStateByProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    tagId: string,
    options?: TagGetEntityStateByProductOptionalParams,
  ) => Promise<void>;
  /** Get tag associated with the Product. */
  getByProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    tagId: string,
    options?: TagGetByProductOptionalParams,
  ) => Promise<TagContract>;
  /** Lists all Tags associated with the Operation. */
  listByOperation: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    options?: TagListByOperationOptionalParams,
  ) => PagedAsyncIterableIterator<TagContract>;
  /** Detach the tag from the Operation. */
  detachFromOperation: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    tagId: string,
    options?: TagDetachFromOperationOptionalParams,
  ) => Promise<void>;
  /** Assign tag to the Operation. */
  assignToOperation: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    tagId: string,
    options?: TagAssignToOperationOptionalParams,
  ) => Promise<TagContract>;
  /** Gets the entity state version of the tag specified by its identifier. */
  getEntityStateByOperation: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    tagId: string,
    options?: TagGetEntityStateByOperationOptionalParams,
  ) => Promise<void>;
  /** Get tag associated with the Operation. */
  getByOperation: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    tagId: string,
    options?: TagGetByOperationOptionalParams,
  ) => Promise<TagContract>;
  /** Lists all Tags associated with the API. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: TagListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<TagContract>;
  /** Detach the tag from the Api. */
  detachFromApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagId: string,
    options?: TagDetachFromApiOptionalParams,
  ) => Promise<void>;
  /** Assign tag to the Api. */
  assignToApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagId: string,
    options?: TagAssignToApiOptionalParams,
  ) => Promise<TagContract>;
  /** Gets the entity state version of the tag specified by its identifier. */
  getEntityStateByApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagId: string,
    options?: TagGetEntityStateByApiOptionalParams,
  ) => Promise<void>;
  /** Get tag associated with the API. */
  getByApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagId: string,
    options?: TagGetByApiOptionalParams,
  ) => Promise<TagContract>;
}

function _getTag(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: TagListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      ifMatch: string,
      options?: TagDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, tagId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      ifMatch: string,
      parameters: TagCreateUpdateParameters,
      options?: TagUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, tagId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      parameters: TagCreateUpdateParameters,
      options?: TagCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, tagId, parameters, options),
    getEntityState: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      options?: TagGetEntityStateOptionalParams,
    ) => getEntityState(context, resourceGroupName, serviceName, tagId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      options?: TagGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, tagId, options),
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: TagListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, productId, options),
    detachFromProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      tagId: string,
      options?: TagDetachFromProductOptionalParams,
    ) => detachFromProduct(context, resourceGroupName, serviceName, productId, tagId, options),
    assignToProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      tagId: string,
      options?: TagAssignToProductOptionalParams,
    ) => assignToProduct(context, resourceGroupName, serviceName, productId, tagId, options),
    getEntityStateByProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      tagId: string,
      options?: TagGetEntityStateByProductOptionalParams,
    ) =>
      getEntityStateByProduct(context, resourceGroupName, serviceName, productId, tagId, options),
    getByProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      tagId: string,
      options?: TagGetByProductOptionalParams,
    ) => getByProduct(context, resourceGroupName, serviceName, productId, tagId, options),
    listByOperation: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      options?: TagListByOperationOptionalParams,
    ) => listByOperation(context, resourceGroupName, serviceName, apiId, operationId, options),
    detachFromOperation: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      tagId: string,
      options?: TagDetachFromOperationOptionalParams,
    ) =>
      detachFromOperation(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        operationId,
        tagId,
        options,
      ),
    assignToOperation: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      tagId: string,
      options?: TagAssignToOperationOptionalParams,
    ) =>
      assignToOperation(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        operationId,
        tagId,
        options,
      ),
    getEntityStateByOperation: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      tagId: string,
      options?: TagGetEntityStateByOperationOptionalParams,
    ) =>
      getEntityStateByOperation(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        operationId,
        tagId,
        options,
      ),
    getByOperation: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      tagId: string,
      options?: TagGetByOperationOptionalParams,
    ) =>
      getByOperation(context, resourceGroupName, serviceName, apiId, operationId, tagId, options),
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: TagListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, apiId, options),
    detachFromApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      tagId: string,
      options?: TagDetachFromApiOptionalParams,
    ) => detachFromApi(context, resourceGroupName, serviceName, apiId, tagId, options),
    assignToApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      tagId: string,
      options?: TagAssignToApiOptionalParams,
    ) => assignToApi(context, resourceGroupName, serviceName, apiId, tagId, options),
    getEntityStateByApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      tagId: string,
      options?: TagGetEntityStateByApiOptionalParams,
    ) => getEntityStateByApi(context, resourceGroupName, serviceName, apiId, tagId, options),
    getByApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      tagId: string,
      options?: TagGetByApiOptionalParams,
    ) => getByApi(context, resourceGroupName, serviceName, apiId, tagId, options),
  };
}

export function _getTagOperations(context: ApiManagementContext): TagOperations {
  return {
    ..._getTag(context),
  };
}
