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
} from "../../api/policyEnrollments/operations.js";
import type {
  PolicyEnrollmentsListForResourceOptionalParams,
  PolicyEnrollmentsListOptionalParams,
  PolicyEnrollmentsListForManagementGroupOptionalParams,
  PolicyEnrollmentsListForResourceGroupOptionalParams,
  PolicyEnrollmentsDeleteOptionalParams,
  PolicyEnrollmentsUpdateOptionalParams,
  PolicyEnrollmentsCreateOrUpdateOptionalParams,
  PolicyEnrollmentsGetOptionalParams,
} from "../../api/policyEnrollments/options.js";
import type { PolicyEnrollment, PolicyEnrollmentUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyEnrollments operations. */
export interface PolicyEnrollmentsOperations {
  /** This operation retrieves the list of all policy enrollments associated with the specified resource in the given resource group and subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the resource, including those that apply directly or from all containing scopes, as well as any applied to resources contained within the resource. Three parameters plus the resource name are used to identify a specific resource. If the resource is not part of a parent resource (the more common case), the parent resource path should not be provided (or provided as ''). For example a web app could be specified as ({resourceProviderNamespace} == 'Microsoft.Web', {parentResourcePath} == '', {resourceType} == 'sites', {resourceName} == 'MyWebApp'). If the resource is part of a parent resource, then all parameters should be provided. For example a virtual machine DNS name could be specified as ({resourceProviderNamespace} == 'Microsoft.Compute', {parentResourcePath} == 'virtualMachines/MyVirtualMachine', {resourceType} == 'domainNames', {resourceName} == 'MyComputerName'). A convenient alternative to providing the namespace and type name separately is to provide both in the {resourceType} parameter, format: ({resourceProviderNamespace} == '', {parentResourcePath} == '', {resourceType} == 'Microsoft.Web/sites', {resourceName} == 'MyWebApp'). */
  listForResource: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    options?: PolicyEnrollmentsListForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEnrollment>;
  /** This operation retrieves the list of all policy enrollments associated with the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the subscription, including those that apply directly or from management groups that contain the given subscription, as well as any applied to objects contained within the subscription. */
  list: (
    options?: PolicyEnrollmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEnrollment>;
  /** This operation retrieves the list of all policy enrollments applicable to the management group that match the given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter=atScope() is provided, the returned list includes all policy enrollments that are assigned to the management group or the management group's ancestors. */
  listForManagementGroup: (
    managementGroupId: string,
    options?: PolicyEnrollmentsListForManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEnrollment>;
  /** This operation retrieves the list of all policy enrollments associated with the given resource group in the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()' or 'atExactScope()'. If $filter is not provided, the unfiltered list includes all policy enrollments associated with the resource group, including those that apply directly or apply from containing scopes, as well as any applied to resources contained within the resource group. */
  listForResourceGroup: (
    resourceGroupName: string,
    options?: PolicyEnrollmentsListForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEnrollment>;
  /** This operation deletes a policy enrollment, given its name and the scope it was created in. The scope of a policy enrollment is the part of its ID preceding '/providers/Microsoft.Authorization/policyEnrollments/{policyEnrollmentName}'. */
  delete: (
    scope: string,
    policyEnrollmentName: string,
    options?: PolicyEnrollmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** This operation updates a policy enrollment with the given scope and name. */
  update: (
    scope: string,
    policyEnrollmentName: string,
    parameters: PolicyEnrollmentUpdate,
    options?: PolicyEnrollmentsUpdateOptionalParams,
  ) => Promise<PolicyEnrollment>;
  /** This operation creates or updates a policy enrollment with the given scope and name. Policy enrollments apply to all resources contained within their scope. For example, when you create a policy enrollment at resource group scope for a policy assignment at the same or above level, the enrollment applies to all applicable resources in the resource group. */
  createOrUpdate: (
    scope: string,
    policyEnrollmentName: string,
    parameters: PolicyEnrollment,
    options?: PolicyEnrollmentsCreateOrUpdateOptionalParams,
  ) => Promise<PolicyEnrollment>;
  /** This operation retrieves a single policy enrollment, given its name and the scope it was created at. */
  get: (
    scope: string,
    policyEnrollmentName: string,
    options?: PolicyEnrollmentsGetOptionalParams,
  ) => Promise<PolicyEnrollment>;
}

function _getPolicyEnrollments(context: PolicyContext) {
  return {
    listForResource: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      options?: PolicyEnrollmentsListForResourceOptionalParams,
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
    list: (options?: PolicyEnrollmentsListOptionalParams) => list(context, options),
    listForManagementGroup: (
      managementGroupId: string,
      options?: PolicyEnrollmentsListForManagementGroupOptionalParams,
    ) => listForManagementGroup(context, managementGroupId, options),
    listForResourceGroup: (
      resourceGroupName: string,
      options?: PolicyEnrollmentsListForResourceGroupOptionalParams,
    ) => listForResourceGroup(context, resourceGroupName, options),
    delete: (
      scope: string,
      policyEnrollmentName: string,
      options?: PolicyEnrollmentsDeleteOptionalParams,
    ) => $delete(context, scope, policyEnrollmentName, options),
    update: (
      scope: string,
      policyEnrollmentName: string,
      parameters: PolicyEnrollmentUpdate,
      options?: PolicyEnrollmentsUpdateOptionalParams,
    ) => update(context, scope, policyEnrollmentName, parameters, options),
    createOrUpdate: (
      scope: string,
      policyEnrollmentName: string,
      parameters: PolicyEnrollment,
      options?: PolicyEnrollmentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scope, policyEnrollmentName, parameters, options),
    get: (
      scope: string,
      policyEnrollmentName: string,
      options?: PolicyEnrollmentsGetOptionalParams,
    ) => get(context, scope, policyEnrollmentName, options),
  };
}

export function _getPolicyEnrollmentsOperations(
  context: PolicyContext,
): PolicyEnrollmentsOperations {
  return {
    ..._getPolicyEnrollments(context),
  };
}
