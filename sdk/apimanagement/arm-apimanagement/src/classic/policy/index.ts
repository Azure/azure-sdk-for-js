// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/policy/operations.js";
import type {
  PolicyListByServiceOptionalParams,
  PolicyDeleteOptionalParams,
  PolicyCreateOrUpdateOptionalParams,
  PolicyGetEntityTagOptionalParams,
  PolicyGetOptionalParams,
} from "../../api/policy/options.js";
import type { PolicyContract, PolicyIdName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Policy operations. */
export interface PolicyOperations {
  /** Lists all the Global Policy definitions of the Api Management service. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PolicyListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyContract>;
  /** Deletes the global policy configuration of the Api Management Service. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    policyId: PolicyIdName,
    ifMatch: string,
    options?: PolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the global policy configuration of the Api Management service. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: PolicyCreateOrUpdateOptionalParams,
  ) => Promise<PolicyContract>;
  /** Gets the entity state (Etag) version of the Global policy definition in the Api Management service. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    policyId: PolicyIdName,
    options?: PolicyGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the Global policy definition of the Api Management service. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    policyId: PolicyIdName,
    options?: PolicyGetOptionalParams,
  ) => Promise<PolicyContract>;
}

function _getPolicy(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PolicyListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      policyId: PolicyIdName,
      ifMatch: string,
      options?: PolicyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, policyId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      policyId: PolicyIdName,
      parameters: PolicyContract,
      options?: PolicyCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, policyId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      policyId: PolicyIdName,
      options?: PolicyGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, policyId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      policyId: PolicyIdName,
      options?: PolicyGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, policyId, options),
  };
}

export function _getPolicyOperations(context: ApiManagementContext): PolicyOperations {
  return {
    ..._getPolicy(context),
  };
}
