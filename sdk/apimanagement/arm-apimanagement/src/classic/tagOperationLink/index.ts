// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  get,
} from "../../api/tagOperationLink/operations.js";
import type {
  TagOperationLinkListByProductOptionalParams,
  TagOperationLinkDeleteOptionalParams,
  TagOperationLinkCreateOrUpdateOptionalParams,
  TagOperationLinkGetOptionalParams,
} from "../../api/tagOperationLink/options.js";
import type { TagOperationLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TagOperationLink operations. */
export interface TagOperationLinkOperations {
  /** Lists a collection of the operation links associated with a tag. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    options?: TagOperationLinkListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<TagOperationLinkContract>;
  /** Deletes the specified operation from the specified tag. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    operationLinkId: string,
    options?: TagOperationLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds an operation to the specified tag via link. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    operationLinkId: string,
    parameters: TagOperationLinkContract,
    options?: TagOperationLinkCreateOrUpdateOptionalParams,
  ) => Promise<TagOperationLinkContract>;
  /** Gets the operation link for the tag. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    tagId: string,
    operationLinkId: string,
    options?: TagOperationLinkGetOptionalParams,
  ) => Promise<TagOperationLinkContract>;
}

function _getTagOperationLink(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      options?: TagOperationLinkListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, tagId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      operationLinkId: string,
      options?: TagOperationLinkDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, tagId, operationLinkId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      operationLinkId: string,
      parameters: TagOperationLinkContract,
      options?: TagOperationLinkCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        tagId,
        operationLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      tagId: string,
      operationLinkId: string,
      options?: TagOperationLinkGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, tagId, operationLinkId, options),
  };
}

export function _getTagOperationLinkOperations(
  context: ApiManagementContext,
): TagOperationLinkOperations {
  return {
    ..._getTagOperationLink(context),
  };
}
