// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementContext } from "../../api/serviceNetworkingManagementContext.js";
import { SecurityPolicy, SecurityPolicyUpdate } from "../../models/models.js";
import {
  SecurityPoliciesInterfaceListByTrafficControllerOptionalParams,
  SecurityPoliciesInterfaceDeleteOptionalParams,
  SecurityPoliciesInterfaceUpdateOptionalParams,
  SecurityPoliciesInterfaceCreateOrUpdateOptionalParams,
  SecurityPoliciesInterfaceGetOptionalParams,
} from "../../api/securityPoliciesInterface/options.js";
import {
  listByTrafficController,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/securityPoliciesInterface/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SecurityPoliciesInterface operations. */
export interface SecurityPoliciesInterfaceOperations {
  /** List SecurityPolicy resources by TrafficController */
  listByTrafficController: (
    resourceGroupName: string,
    trafficControllerName: string,
    options?: SecurityPoliciesInterfaceListByTrafficControllerOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityPolicy>;
  /** Delete a SecurityPolicy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
