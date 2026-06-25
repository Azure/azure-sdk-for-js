// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByOperation,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiOperationPolicy/operations.js";
import {
  ApiOperationPolicyListByOperationOptionalParams,
  ApiOperationPolicyDeleteOptionalParams,
  ApiOperationPolicyCreateOrUpdateOptionalParams,
  ApiOperationPolicyGetEntityTagOptionalParams,
  ApiOperationPolicyGetOptionalParams,
} from "../../api/apiOperationPolicy/options.js";
import { PolicyContract, PolicyIdName, PolicyCollection } from "../../models/models.js";

/** Interface representing a ApiOperationPolicy operations. */
export interface ApiOperationPolicyOperations {
  /** Get the list of policy configuration at the API Operation level. */
  listByOperation: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    options?: ApiOperationPolicyListByOperationOptionalParams,
  ) => Promise<PolicyCollection>;
  /** Deletes the policy configuration at the Api Operation. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    ifMatch: string,
    options?: ApiOperationPolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates policy configuration for the API Operation level. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: ApiOperationPolicyCreateOrUpdateOptionalParams,
  ) => Promise<PolicyContract>;
  /** Gets the entity state (Etag) version of the API operation policy specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    options?: ApiOperationPolicyGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the policy configuration at the API Operation level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    operationId: string,
    policyId: PolicyIdName,
    options?: ApiOperationPolicyGetOptionalParams,
  ) => Promise<PolicyContract>;
}

function _getApiOperationPolicy(context: ApiManagementContext) {
  return {
    listByOperation: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      options?: ApiOperationPolicyListByOperationOptionalParams,
    ) => listByOperation(context, resourceGroupName, serviceName, apiId, operationId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      policyId: PolicyIdName,
      ifMatch: string,
      options?: ApiOperationPolicyDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        operationId,
        policyId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      policyId: PolicyIdName,
      parameters: PolicyContract,
      options?: ApiOperationPolicyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        operationId,
        policyId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      policyId: PolicyIdName,
      options?: ApiOperationPolicyGetEntityTagOptionalParams,
    ) =>
      getEntityTag(context, resourceGroupName, serviceName, apiId, operationId, policyId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      operationId: string,
      policyId: PolicyIdName,
      options?: ApiOperationPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, operationId, policyId, options),
  };
}

export function _getApiOperationPolicyOperations(
  context: ApiManagementContext,
): ApiOperationPolicyOperations {
  return {
    ..._getApiOperationPolicy(context),
  };
}
