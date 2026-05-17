// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  createOrUpdate,
  checkEntityExists,
  listByProduct,
} from "../../api/productGroup/operations.js";
import {
  ProductGroupDeleteOptionalParams,
  ProductGroupCreateOrUpdateOptionalParams,
  ProductGroupCheckEntityExistsOptionalParams,
  ProductGroupListByProductOptionalParams,
} from "../../api/productGroup/options.js";
import { GroupContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductGroup operations. */
export interface ProductGroupOperations {
  /** Deletes the association between the specified group and product. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    groupId: string,
    options?: ProductGroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds the association between the specified developer group with the specified product. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    groupId: string,
    options?: ProductGroupCreateOrUpdateOptionalParams,
  ) => Promise<GroupContract>;
  /** Checks that Group entity specified by identifier is associated with the Product entity. */
  checkEntityExists: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    groupId: string,
    options?: ProductGroupCheckEntityExistsOptionalParams,
  ) => Promise<void>;
  /** Lists the collection of developer groups associated with the specified product. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductGroupListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<GroupContract>;
}

function _getProductGroup(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      groupId: string,
      options?: ProductGroupDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, productId, groupId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      groupId: string,
      options?: ProductGroupCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, productId, groupId, options),
    checkEntityExists: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      groupId: string,
      options?: ProductGroupCheckEntityExistsOptionalParams,
    ) => checkEntityExists(context, resourceGroupName, serviceName, productId, groupId, options),
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductGroupListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, productId, options),
  };
}

export function _getProductGroupOperations(context: ApiManagementContext): ProductGroupOperations {
  return {
    ..._getProductGroup(context),
  };
}
