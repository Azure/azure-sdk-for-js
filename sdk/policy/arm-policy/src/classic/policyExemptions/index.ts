// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext } from "../../api/policyContext.js";
import {
  listForResource,
  list,
  listForManagementGroup,
  listForResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/policyExemptions/operations.js";
import type {
  PolicyExemptionsListForResourceOptionalParams,
  PolicyExemptionsListOptionalParams,
  PolicyExemptionsListForManagementGroupOptionalParams,
  PolicyExemptionsListForResourceGroupOptionalParams,
  PolicyExemptionsDeleteOptionalParams,
  PolicyExemptionsUpdateOptionalParams,
  PolicyExemptionsCreateOrUpdateOptionalParams,
  PolicyExemptionsGetOptionalParams,
} from "../../api/policyExemptions/options.js";
import type { PolicyExemption, PolicyExemptionUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyExemptions operations. */
export interface PolicyExemptionsOperations {
  /** This operation retrieves the list of all policy exemptions associated with the specified resource in the given resource group and subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()', 'excludeExpired()' or 'policyAssignmentId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy exemptions associated with the resource, including those that apply directly or from all containing scopes, as well as any applied to resources contained within the resource. Three parameters plus the resource name are used to identify a specific resource. If the resource is not part of a parent resource (the more common case), the parent resource path should not be provided (or provided as ''). For example a web app could be specified as ({resourceProviderNamespace} == 'Microsoft.Web', {parentResourcePath} == '', {resourceType} == 'sites', {resourceName} == 'MyWebApp'). If the resource is part of a parent resource, then all parameters should be provided. For example a virtual machine DNS name could be specified as ({resourceProviderNamespace} == 'Microsoft.Compute', {parentResourcePath} == 'virtualMachines/MyVirtualMachine', {resourceType} == 'domainNames', {resourceName} == 'MyComputerName'). A convenient alternative to providing the namespace and type name separately is to provide both in the {resourceType} parameter, format: ({resourceProviderNamespace} == '', {parentResourcePath} == '', {resourceType} == 'Microsoft.Web/sites', {resourceName} == 'MyWebApp'). */
  listForResource: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    options?: PolicyExemptionsListForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyExemption>;
  /** This operation retrieves the list of all policy exemptions associated with the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()', 'excludeExpired()' or 'policyAssignmentId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy exemptions associated with the subscription, including those that apply directly or from management groups that contain the given subscription, as well as any applied to objects contained within the subscription. */
  list: (
    options?: PolicyExemptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyExemption>;
  /** This operation retrieves the list of all policy exemptions applicable to the management group that match the given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()', 'excludeExpired()' or 'policyAssignmentId eq '{value}''. If $filter=atScope() is provided, the returned list includes all policy exemptions that are assigned to the management group or the management group's ancestors. */
  listForManagementGroup: (
    managementGroupId: string,
    options?: PolicyExemptionsListForManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyExemption>;
  /** This operation retrieves the list of all policy exemptions associated with the given resource group in the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()', 'excludeExpired()' or 'policyAssignmentId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy exemptions associated with the resource group, including those that apply directly or apply from containing scopes, as well as any applied to resources contained within the resource group. */
  listForResourceGroup: (
    resourceGroupName: string,
    options?: PolicyExemptionsListForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyExemption>;
  /** This operation deletes a policy exemption, given its name and the scope it was created in. The scope of a policy exemption is the part of its ID preceding '/providers/Microsoft.Authorization/policyExemptions/{policyExemptionName}'. */
  delete: (
    scope: string,
    policyExemptionName: string,
    options?: PolicyExemptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** This operation updates a policy exemption with the given scope and name. */
  update: (
    scope: string,
    policyExemptionName: string,
    parameters: PolicyExemptionUpdate,
    options?: PolicyExemptionsUpdateOptionalParams,
  ) => Promise<PolicyExemption>;
  /** This operation creates or updates a policy exemption with the given scope and name. Policy exemptions apply to all resources contained within their scope. For example, when you create a policy exemption at resource group scope for a policy assignment at the same or above level, the exemption exempts to all applicable resources in the resource group. */
  createOrUpdate: (
    scope: string,
    policyExemptionName: string,
    parameters: PolicyExemption,
    options?: PolicyExemptionsCreateOrUpdateOptionalParams,
  ) => Promise<PolicyExemption>;
  /** This operation retrieves a single policy exemption, given its name and the scope it was created at. */
  get: (
    scope: string,
    policyExemptionName: string,
    options?: PolicyExemptionsGetOptionalParams,
  ) => Promise<PolicyExemption>;
}

function _getPolicyExemptions(context: PolicyContext) {
  return {
    listForResource: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      options?: PolicyExemptionsListForResourceOptionalParams,
    ) =>
      listForResource(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        options,
      ),
    list: (options?: PolicyExemptionsListOptionalParams) => list(context, options),
    listForManagementGroup: (
      managementGroupId: string,
      options?: PolicyExemptionsListForManagementGroupOptionalParams,
    ) => listForManagementGroup(context, managementGroupId, options),
    listForResourceGroup: (
      resourceGroupName: string,
      options?: PolicyExemptionsListForResourceGroupOptionalParams,
    ) => listForResourceGroup(context, resourceGroupName, options),
    delete: (
      scope: string,
      policyExemptionName: string,
      options?: PolicyExemptionsDeleteOptionalParams,
    ) => $delete(context, scope, policyExemptionName, options),
    update: (
      scope: string,
      policyExemptionName: string,
      parameters: PolicyExemptionUpdate,
      options?: PolicyExemptionsUpdateOptionalParams,
    ) => update(context, scope, policyExemptionName, parameters, options),
    createOrUpdate: (
      scope: string,
      policyExemptionName: string,
      parameters: PolicyExemption,
      options?: PolicyExemptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scope, policyExemptionName, parameters, options),
    get: (
      scope: string,
      policyExemptionName: string,
      options?: PolicyExemptionsGetOptionalParams,
    ) => get(context, scope, policyExemptionName, options),
  };
}

export function _getPolicyExemptionsOperations(context: PolicyContext): PolicyExemptionsOperations {
  return {
    ..._getPolicyExemptions(context),
  };
}
