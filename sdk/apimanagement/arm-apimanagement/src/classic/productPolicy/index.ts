// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByProduct,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/productPolicy/operations.js";
import type {
  ProductPolicyListByProductOptionalParams,
  ProductPolicyDeleteOptionalParams,
  ProductPolicyCreateOrUpdateOptionalParams,
  ProductPolicyGetEntityTagOptionalParams,
  ProductPolicyGetOptionalParams,
} from "../../api/productPolicy/options.js";
import type { PolicyContract, PolicyIdName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductPolicy operations. */
export interface ProductPolicyOperations {
  /** Get the policy configuration at the Product level. */
  listByProduct: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductPolicyListByProductOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyContract>;
  /** Deletes the policy configuration at the Product. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    policyId: PolicyIdName,
    ifMatch: string,
    options?: ProductPolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates policy configuration for the Product. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: ProductPolicyCreateOrUpdateOptionalParams,
  ) => Promise<PolicyContract>;
  /** Get the ETag of the policy configuration at the Product level. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    policyId: PolicyIdName,
    options?: ProductPolicyGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the policy configuration at the Product level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    policyId: PolicyIdName,
    options?: ProductPolicyGetOptionalParams,
  ) => Promise<PolicyContract>;
}

function _getProductPolicy(context: ApiManagementContext) {
  return {
    listByProduct: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductPolicyListByProductOptionalParams,
    ) => listByProduct(context, resourceGroupName, serviceName, productId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      policyId: PolicyIdName,
      ifMatch: string,
      options?: ProductPolicyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, productId, policyId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      policyId: PolicyIdName,
      parameters: PolicyContract,
      options?: ProductPolicyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        productId,
        policyId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      policyId: PolicyIdName,
      options?: ProductPolicyGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, productId, policyId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      policyId: PolicyIdName,
      options?: ProductPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, productId, policyId, options),
  };
}

export function _getProductPolicyOperations(
  context: ApiManagementContext,
): ProductPolicyOperations {
  return {
    ..._getProductPolicy(context),
  };
}
