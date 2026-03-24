// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByApi,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiPolicy/operations.js";
import type {
  ApiPolicyListByApiOptionalParams,
  ApiPolicyDeleteOptionalParams,
  ApiPolicyCreateOrUpdateOptionalParams,
  ApiPolicyGetEntityTagOptionalParams,
  ApiPolicyGetOptionalParams,
} from "../../api/apiPolicy/options.js";
import type { PolicyContract, PolicyIdName, _PolicyCollection } from "../../models/models.js";

/** Interface representing a ApiPolicy operations. */
export interface ApiPolicyOperations {
  /** Get the policy configuration at the API level. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiPolicyListByApiOptionalParams,
  ) => Promise<_PolicyCollection>;
  /** Deletes the policy configuration at the Api. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    policyId: PolicyIdName,
    ifMatch: string,
    options?: ApiPolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates policy configuration for the API. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: ApiPolicyCreateOrUpdateOptionalParams,
  ) => Promise<PolicyContract>;
  /** Gets the entity state (Etag) version of the API policy specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    policyId: PolicyIdName,
    options?: ApiPolicyGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the policy configuration at the API level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    policyId: PolicyIdName,
    options?: ApiPolicyGetOptionalParams,
  ) => Promise<PolicyContract>;
}

function _getApiPolicy(context: ApiManagementContext) {
  return {
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiPolicyListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      policyId: PolicyIdName,
      ifMatch: string,
      options?: ApiPolicyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, policyId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      policyId: PolicyIdName,
      parameters: PolicyContract,
      options?: ApiPolicyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, apiId, policyId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      policyId: PolicyIdName,
      options?: ApiPolicyGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, policyId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      policyId: PolicyIdName,
      options?: ApiPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, policyId, options),
  };
}

export function _getApiPolicyOperations(context: ApiManagementContext): ApiPolicyOperations {
  return {
    ..._getApiPolicy(context),
  };
}
