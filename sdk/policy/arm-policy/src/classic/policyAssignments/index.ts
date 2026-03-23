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
  create,
  get,
} from "../../api/policyAssignments/operations.js";
import type {
  PolicyAssignmentsListForResourceOptionalParams,
  PolicyAssignmentsListOptionalParams,
  PolicyAssignmentsListForManagementGroupOptionalParams,
  PolicyAssignmentsListForResourceGroupOptionalParams,
  PolicyAssignmentsDeleteOptionalParams,
  PolicyAssignmentsUpdateOptionalParams,
  PolicyAssignmentsCreateOptionalParams,
  PolicyAssignmentsGetOptionalParams,
} from "../../api/policyAssignments/options.js";
import type { PolicyAssignment, PolicyAssignmentUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyAssignments operations. */
export interface PolicyAssignmentsOperations {
  /** This operation retrieves the list of all policy assignments associated with the specified resource in the given resource group and subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy assignments associated with the resource, including those that apply directly or from all containing scopes, as well as any applied to resources contained within the resource. If $filter=atScope() is provided, the returned list includes all policy assignments that apply to the resource, which is everything in the unfiltered list except those applied to resources contained within the resource. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the resource level. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value} that apply to the resource. Three parameters plus the resource name are used to identify a specific resource. If the resource is not part of a parent resource (the more common case), the parent resource path should not be provided (or provided as ''). For example a web app could be specified as ({resourceProviderNamespace} == 'Microsoft.Web', {parentResourcePath} == '', {resourceType} == 'sites', {resourceName} == 'MyWebApp'). If the resource is part of a parent resource, then all parameters should be provided. For example a virtual machine DNS name could be specified as ({resourceProviderNamespace} == 'Microsoft.Compute', {parentResourcePath} == 'virtualMachines/MyVirtualMachine', {resourceType} == 'domainNames', {resourceName} == 'MyComputerName'). A convenient alternative to providing the namespace and type name separately is to provide both in the {resourceType} parameter, format: ({resourceProviderNamespace} == '', {parentResourcePath} == '', {resourceType} == 'Microsoft.Web/sites', {resourceName} == 'MyWebApp'). */
  listForResource: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    options?: PolicyAssignmentsListForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyAssignment>;
  /** This operation retrieves the list of all policy assignments associated with the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy assignments associated with the subscription, including those that apply directly or from management groups that contain the given subscription, as well as any applied to objects contained within the subscription. If $filter=atScope() is provided, the returned list includes all policy assignments that apply to the subscription, which is everything in the unfiltered list except those applied to objects contained within the subscription. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the subscription. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}. */
  list: (
    options?: PolicyAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyAssignment>;
  /** This operation retrieves the list of all policy assignments applicable to the management group that match the given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter=atScope() is provided, the returned list includes all policy assignments that are assigned to the management group or the management group's ancestors. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the management group. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value} that apply to the management group. */
  listForManagementGroup: (
    managementGroupId: string,
    options?: PolicyAssignmentsListForManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyAssignment>;
  /** This operation retrieves the list of all policy assignments associated with the given resource group in the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy assignments associated with the resource group, including those that apply directly or apply from containing scopes, as well as any applied to resources contained within the resource group. If $filter=atScope() is provided, the returned list includes all policy assignments that apply to the resource group, which is everything in the unfiltered list except those applied to resources contained within the resource group. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the resource group. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value} that apply to the resource group. */
  listForResourceGroup: (
    resourceGroupName: string,
    options?: PolicyAssignmentsListForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyAssignment>;
  /** This operation deletes a policy assignment, given its name and the scope it was created in. The scope of a policy assignment is the part of its ID preceding '/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}'. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    scope: string,
    policyAssignmentName: string,
    options?: PolicyAssignmentsDeleteOptionalParams,
  ) => Promise<PolicyAssignment>;
  /** This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group. */
  update: (
    scope: string,
    policyAssignmentName: string,
    parameters: PolicyAssignmentUpdate,
    options?: PolicyAssignmentsUpdateOptionalParams,
  ) => Promise<PolicyAssignment>;
  /** This operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group. */
  create: (
    scope: string,
    policyAssignmentName: string,
    parameters: PolicyAssignment,
    options?: PolicyAssignmentsCreateOptionalParams,
  ) => Promise<PolicyAssignment>;
  /** This operation retrieves a single policy assignment, given its name and the scope it was created at. */
  get: (
    scope: string,
    policyAssignmentName: string,
    options?: PolicyAssignmentsGetOptionalParams,
  ) => Promise<PolicyAssignment>;
}

function _getPolicyAssignments(context: PolicyContext) {
  return {
    listForResource: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      options?: PolicyAssignmentsListForResourceOptionalParams,
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
    list: (options?: PolicyAssignmentsListOptionalParams) => list(context, options),
    listForManagementGroup: (
      managementGroupId: string,
      options?: PolicyAssignmentsListForManagementGroupOptionalParams,
    ) => listForManagementGroup(context, managementGroupId, options),
    listForResourceGroup: (
      resourceGroupName: string,
      options?: PolicyAssignmentsListForResourceGroupOptionalParams,
    ) => listForResourceGroup(context, resourceGroupName, options),
    delete: (
      scope: string,
      policyAssignmentName: string,
      options?: PolicyAssignmentsDeleteOptionalParams,
    ) => $delete(context, scope, policyAssignmentName, options),
    update: (
      scope: string,
      policyAssignmentName: string,
      parameters: PolicyAssignmentUpdate,
      options?: PolicyAssignmentsUpdateOptionalParams,
    ) => update(context, scope, policyAssignmentName, parameters, options),
    create: (
      scope: string,
      policyAssignmentName: string,
      parameters: PolicyAssignment,
      options?: PolicyAssignmentsCreateOptionalParams,
    ) => create(context, scope, policyAssignmentName, parameters, options),
    get: (
      scope: string,
      policyAssignmentName: string,
      options?: PolicyAssignmentsGetOptionalParams,
    ) => get(context, scope, policyAssignmentName, options),
  };
}

export function _getPolicyAssignmentsOperations(
  context: PolicyContext,
): PolicyAssignmentsOperations {
  return {
    ..._getPolicyAssignments(context),
  };
}
