// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementContext } from "../../api/serviceNetworkingManagementContext.js";
import {
  securityPoliciesInterfaceListByTrafficController,
  securityPoliciesInterfaceDelete,
  securityPoliciesInterfaceUpdate,
  securityPoliciesInterfaceCreateOrUpdate,
  securityPoliciesInterfaceGet,
} from "../../api/securityPoliciesInterface/index.js";
import { SecurityPolicy, SecurityPolicyUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  SecurityPoliciesInterfaceListByTrafficControllerOptionalParams,
  SecurityPoliciesInterfaceDeleteOptionalParams,
  SecurityPoliciesInterfaceUpdateOptionalParams,
  SecurityPoliciesInterfaceCreateOrUpdateOptionalParams,
  SecurityPoliciesInterfaceGetOptionalParams,
} from "../../api/options.js";

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
    ) =>
      securityPoliciesInterfaceListByTrafficController(
        context,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      trafficControllerName: string,
      securityPolicyName: string,
      options?: SecurityPoliciesInterfaceDeleteOptionalParams,
    ) =>
      securityPoliciesInterfaceDelete(
        context,
        resourceGroupName,
        trafficControllerName,
        securityPolicyName,
        options,
      ),
    update: (
      resourceGroupName: string,
      trafficControllerName: string,
      securityPolicyName: string,
      properties: SecurityPolicyUpdate,
      options?: SecurityPoliciesInterfaceUpdateOptionalParams,
    ) =>
      securityPoliciesInterfaceUpdate(
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
      securityPoliciesInterfaceCreateOrUpdate(
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
    ) =>
      securityPoliciesInterfaceGet(
        context,
        resourceGroupName,
        trafficControllerName,
        securityPolicyName,
        options,
      ),
  };
}

export function _getSecurityPoliciesInterfaceOperations(
  context: ServiceNetworkingManagementContext,
): SecurityPoliciesInterfaceOperations {
  return {
    ..._getSecurityPoliciesInterface(context),
  };
}
