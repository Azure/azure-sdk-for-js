// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceNetworkingManagementContext } from "../../api/serviceNetworkingManagementContext.js";
import {
  listByTrafficController,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/securityPoliciesInterface/operations.js";
import type {
  SecurityPoliciesInterfaceListByTrafficControllerOptionalParams,
  SecurityPoliciesInterfaceDeleteOptionalParams,
  SecurityPoliciesInterfaceUpdateOptionalParams,
  SecurityPoliciesInterfaceCreateOrUpdateOptionalParams,
  SecurityPoliciesInterfaceGetOptionalParams,
} from "../../api/securityPoliciesInterface/options.js";
import type { SecurityPolicy, SecurityPolicyUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityPoliciesInterface operations. */
export interface SecurityPoliciesInterfaceOperations {
  /** List SecurityPolicy resources by TrafficController */
  listByTrafficController: (
    resourceGroupName: string,
    trafficControllerName: string,
    options?: SecurityPoliciesInterfaceListByTrafficControllerOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityPolicy>;
  /** Delete a SecurityPolicy */
  delete: (
    resourceGroupName: string,
    trafficControllerName: string,
    securityPolicyName: string,
    options?: SecurityPoliciesInterfaceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a SecurityPolicy */
  update: (
    resourceGroupName: string,
    trafficControllerName: string,
    securityPolicyName: string,
    properties: SecurityPolicyUpdate,
    options?: SecurityPoliciesInterfaceUpdateOptionalParams,
  ) => Promise<SecurityPolicy>;
  /** Create a SecurityPolicy */
  createOrUpdate: (
    resourceGroupName: string,
    trafficControllerName: string,
    securityPolicyName: string,
    resource: SecurityPolicy,
    options?: SecurityPoliciesInterfaceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SecurityPolicy>, SecurityPolicy>;
  /** Get a SecurityPolicy */
  get: (
    resourceGroupName: string,
    trafficControllerName: string,
    securityPolicyName: string,
    options?: SecurityPoliciesInterfaceGetOptionalParams,
  ) => Promise<SecurityPolicy>;
}

function _getSecurityPoliciesInterface(context: ServiceNetworkingManagementContext) {
  return {
    listByTrafficController: (
      resourceGroupName: string,
      trafficControllerName: string,
      options?: SecurityPoliciesInterfaceListByTrafficControllerOptionalParams,
    ) => listByTrafficController(context, resourceGroupName, trafficControllerName, options),
    delete: (
      resourceGroupName: string,
      trafficControllerName: string,
      securityPolicyName: string,
      options?: SecurityPoliciesInterfaceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, trafficControllerName, securityPolicyName, options),
    update: (
      resourceGroupName: string,
      trafficControllerName: string,
      securityPolicyName: string,
      properties: SecurityPolicyUpdate,
      options?: SecurityPoliciesInterfaceUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        trafficControllerName,
        securityPolicyName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      trafficControllerName: string,
      securityPolicyName: string,
      resource: SecurityPolicy,
      options?: SecurityPoliciesInterfaceCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        trafficControllerName,
        securityPolicyName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      trafficControllerName: string,
      securityPolicyName: string,
      options?: SecurityPoliciesInterfaceGetOptionalParams,
    ) => get(context, resourceGroupName, trafficControllerName, securityPolicyName, options),
  };
}

export function _getSecurityPoliciesInterfaceOperations(
  context: ServiceNetworkingManagementContext,
): SecurityPoliciesInterfaceOperations {
  return {
    ..._getSecurityPoliciesInterface(context),
  };
}
