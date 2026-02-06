// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext } from "../../api/policyContext.js";
import {
  listAll,
  listAllAtManagementGroup,
  listAllBuiltins,
  listByManagementGroup,
  deleteAtManagementGroup,
  createOrUpdateAtManagementGroup,
  getAtManagementGroup,
  listBuiltIn,
  getBuiltIn,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/policyDefinitionVersions/operations.js";
import type {
  PolicyDefinitionVersionsListAllOptionalParams,
  PolicyDefinitionVersionsListAllAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsListAllBuiltinsOptionalParams,
  PolicyDefinitionVersionsListByManagementGroupOptionalParams,
  PolicyDefinitionVersionsDeleteAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsGetAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsListBuiltInOptionalParams,
  PolicyDefinitionVersionsGetBuiltInOptionalParams,
  PolicyDefinitionVersionsListOptionalParams,
  PolicyDefinitionVersionsDeleteOptionalParams,
  PolicyDefinitionVersionsCreateOrUpdateOptionalParams,
  PolicyDefinitionVersionsGetOptionalParams,
} from "../../api/policyDefinitionVersions/options.js";
import type {
  PolicyDefinitionVersion,
  _PolicyDefinitionVersionListResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyDefinitionVersions operations. */
export interface PolicyDefinitionVersionsOperations {
  /** This operation lists all the policy definition versions for all policy definitions within a subscription. */
  listAll: (
    options?: PolicyDefinitionVersionsListAllOptionalParams,
  ) => Promise<_PolicyDefinitionVersionListResult>;
  /** This operation lists all the policy definition versions for all policy definitions at the management group scope. */
  listAllAtManagementGroup: (
    managementGroupName: string,
    options?: PolicyDefinitionVersionsListAllAtManagementGroupOptionalParams,
  ) => Promise<_PolicyDefinitionVersionListResult>;
  /** This operation lists all the built-in policy definition versions for all built-in policy definitions. */
  listAllBuiltins: (
    options?: PolicyDefinitionVersionsListAllBuiltinsOptionalParams,
  ) => Promise<_PolicyDefinitionVersionListResult>;
  /** This operation retrieves a list of all the policy definition versions for the given policy definition in the given management group. */
  listByManagementGroup: (
    managementGroupName: string,
    policyDefinitionName: string,
    options?: PolicyDefinitionVersionsListByManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyDefinitionVersion>;
  /** This operation deletes the policy definition in the given management group with the given name. */
  deleteAtManagementGroup: (
    managementGroupName: string,
    policyDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicyDefinitionVersionsDeleteAtManagementGroupOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a policy definition version in the given management group with the given name. */
  createOrUpdateAtManagementGroup: (
    managementGroupName: string,
    policyDefinitionName: string,
    policyDefinitionVersion: string,
    parameters: PolicyDefinitionVersion,
    options?: PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
  ) => Promise<PolicyDefinitionVersion>;
  /** This operation retrieves the policy definition version in the given management group with the given name. */
  getAtManagementGroup: (
    managementGroupName: string,
    policyDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicyDefinitionVersionsGetAtManagementGroupOptionalParams,
  ) => Promise<PolicyDefinitionVersion>;
  /** This operation retrieves a list of all the built-in policy definition versions for the given policy definition. */
  listBuiltIn: (
    policyDefinitionName: string,
    options?: PolicyDefinitionVersionsListBuiltInOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyDefinitionVersion>;
  /** This operation retrieves the built-in policy definition version with the given name. */
  getBuiltIn: (
    policyDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicyDefinitionVersionsGetBuiltInOptionalParams,
  ) => Promise<PolicyDefinitionVersion>;
  /** This operation retrieves a list of all the policy definition versions for the given policy definition. */
  list: (
    policyDefinitionName: string,
    options?: PolicyDefinitionVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyDefinitionVersion>;
  /** This operation deletes the policy definition version in the given subscription with the given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    policyDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicyDefinitionVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a policy definition in the given subscription with the given name. */
  createOrUpdate: (
    policyDefinitionName: string,
    policyDefinitionVersion: string,
    parameters: PolicyDefinitionVersion,
    options?: PolicyDefinitionVersionsCreateOrUpdateOptionalParams,
  ) => Promise<PolicyDefinitionVersion>;
  /** This operation retrieves the policy definition version in the given subscription with the given name. */
  get: (
    policyDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicyDefinitionVersionsGetOptionalParams,
  ) => Promise<PolicyDefinitionVersion>;
}

function _getPolicyDefinitionVersions(context: PolicyContext) {
  return {
    listAll: (options?: PolicyDefinitionVersionsListAllOptionalParams) => listAll(context, options),
    listAllAtManagementGroup: (
      managementGroupName: string,
      options?: PolicyDefinitionVersionsListAllAtManagementGroupOptionalParams,
    ) => listAllAtManagementGroup(context, managementGroupName, options),
    listAllBuiltins: (options?: PolicyDefinitionVersionsListAllBuiltinsOptionalParams) =>
      listAllBuiltins(context, options),
    listByManagementGroup: (
      managementGroupName: string,
      policyDefinitionName: string,
      options?: PolicyDefinitionVersionsListByManagementGroupOptionalParams,
    ) => listByManagementGroup(context, managementGroupName, policyDefinitionName, options),
    deleteAtManagementGroup: (
      managementGroupName: string,
      policyDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicyDefinitionVersionsDeleteAtManagementGroupOptionalParams,
    ) =>
      deleteAtManagementGroup(
        context,
        managementGroupName,
        policyDefinitionName,
        policyDefinitionVersion,
        options,
      ),
    createOrUpdateAtManagementGroup: (
      managementGroupName: string,
      policyDefinitionName: string,
      policyDefinitionVersion: string,
      parameters: PolicyDefinitionVersion,
      options?: PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
    ) =>
      createOrUpdateAtManagementGroup(
        context,
        managementGroupName,
        policyDefinitionName,
        policyDefinitionVersion,
        parameters,
        options,
      ),
    getAtManagementGroup: (
      managementGroupName: string,
      policyDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicyDefinitionVersionsGetAtManagementGroupOptionalParams,
    ) =>
      getAtManagementGroup(
        context,
        managementGroupName,
        policyDefinitionName,
        policyDefinitionVersion,
        options,
      ),
    listBuiltIn: (
      policyDefinitionName: string,
      options?: PolicyDefinitionVersionsListBuiltInOptionalParams,
    ) => listBuiltIn(context, policyDefinitionName, options),
    getBuiltIn: (
      policyDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicyDefinitionVersionsGetBuiltInOptionalParams,
    ) => getBuiltIn(context, policyDefinitionName, policyDefinitionVersion, options),
    list: (policyDefinitionName: string, options?: PolicyDefinitionVersionsListOptionalParams) =>
      list(context, policyDefinitionName, options),
    delete: (
      policyDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicyDefinitionVersionsDeleteOptionalParams,
    ) => $delete(context, policyDefinitionName, policyDefinitionVersion, options),
    createOrUpdate: (
      policyDefinitionName: string,
      policyDefinitionVersion: string,
      parameters: PolicyDefinitionVersion,
      options?: PolicyDefinitionVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, policyDefinitionName, policyDefinitionVersion, parameters, options),
    get: (
      policyDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicyDefinitionVersionsGetOptionalParams,
    ) => get(context, policyDefinitionName, policyDefinitionVersion, options),
  };
}

export function _getPolicyDefinitionVersionsOperations(
  context: PolicyContext,
): PolicyDefinitionVersionsOperations {
  return {
    ..._getPolicyDefinitionVersions(context),
  };
}
