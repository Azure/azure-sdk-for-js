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
} from "../../api/policySetDefinitionVersions/operations.js";
import type {
  PolicySetDefinitionVersionsListAllOptionalParams,
  PolicySetDefinitionVersionsListAllAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsListAllBuiltinsOptionalParams,
  PolicySetDefinitionVersionsListByManagementGroupOptionalParams,
  PolicySetDefinitionVersionsDeleteAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsGetAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsListBuiltInOptionalParams,
  PolicySetDefinitionVersionsGetBuiltInOptionalParams,
  PolicySetDefinitionVersionsListOptionalParams,
  PolicySetDefinitionVersionsDeleteOptionalParams,
  PolicySetDefinitionVersionsCreateOrUpdateOptionalParams,
  PolicySetDefinitionVersionsGetOptionalParams,
} from "../../api/policySetDefinitionVersions/options.js";
import type {
  PolicySetDefinitionVersion,
  _PolicySetDefinitionVersionListResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicySetDefinitionVersions operations. */
export interface PolicySetDefinitionVersionsOperations {
  /** This operation lists all the policy set definition versions for all policy set definitions within a subscription. */
  listAll: (
    options?: PolicySetDefinitionVersionsListAllOptionalParams,
  ) => Promise<_PolicySetDefinitionVersionListResult>;
  /** This operation lists all the policy set definition versions for all policy set definitions at the management group scope. */
  listAllAtManagementGroup: (
    managementGroupName: string,
    options?: PolicySetDefinitionVersionsListAllAtManagementGroupOptionalParams,
  ) => Promise<_PolicySetDefinitionVersionListResult>;
  /** This operation lists all the built-in policy set definition versions for all built-in policy set definitions. */
  listAllBuiltins: (
    options?: PolicySetDefinitionVersionsListAllBuiltinsOptionalParams,
  ) => Promise<_PolicySetDefinitionVersionListResult>;
  /** This operation retrieves a list of all the policy set definition versions for the given policy set definition in a given management group. */
  listByManagementGroup: (
    managementGroupName: string,
    policySetDefinitionName: string,
    options?: PolicySetDefinitionVersionsListByManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicySetDefinitionVersion>;
  /** This operation deletes the policy set definition version in the given management group with the given name and version. */
  deleteAtManagementGroup: (
    managementGroupName: string,
    policySetDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicySetDefinitionVersionsDeleteAtManagementGroupOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a policy set definition version in the given management group with the given name and version. */
  createOrUpdateAtManagementGroup: (
    managementGroupName: string,
    policySetDefinitionName: string,
    policyDefinitionVersion: string,
    parameters: PolicySetDefinitionVersion,
    options?: PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
  ) => Promise<PolicySetDefinitionVersion>;
  /** This operation retrieves the policy set definition version in the given management group with the given name and version. */
  getAtManagementGroup: (
    managementGroupName: string,
    policySetDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicySetDefinitionVersionsGetAtManagementGroupOptionalParams,
  ) => Promise<PolicySetDefinitionVersion>;
  /** This operation retrieves a list of all the built-in policy set definition versions for the given built-in policy set definition. */
  listBuiltIn: (
    policySetDefinitionName: string,
    options?: PolicySetDefinitionVersionsListBuiltInOptionalParams,
  ) => PagedAsyncIterableIterator<PolicySetDefinitionVersion>;
  /** This operation retrieves the built-in policy set definition version with the given name and version. */
  getBuiltIn: (
    policySetDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicySetDefinitionVersionsGetBuiltInOptionalParams,
  ) => Promise<PolicySetDefinitionVersion>;
  /** This operation retrieves a list of all the policy set definition versions for the given policy set definition. */
  list: (
    policySetDefinitionName: string,
    options?: PolicySetDefinitionVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PolicySetDefinitionVersion>;
  /** This operation deletes the policy set definition version in the given subscription with the given name and version. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    policySetDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicySetDefinitionVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a policy set definition version in the given subscription with the given name and version. */
  createOrUpdate: (
    policySetDefinitionName: string,
    policyDefinitionVersion: string,
    parameters: PolicySetDefinitionVersion,
    options?: PolicySetDefinitionVersionsCreateOrUpdateOptionalParams,
  ) => Promise<PolicySetDefinitionVersion>;
  /** This operation retrieves the policy set definition version in the given subscription with the given name and version. */
  get: (
    policySetDefinitionName: string,
    policyDefinitionVersion: string,
    options?: PolicySetDefinitionVersionsGetOptionalParams,
  ) => Promise<PolicySetDefinitionVersion>;
}

function _getPolicySetDefinitionVersions(context: PolicyContext) {
  return {
    listAll: (options?: PolicySetDefinitionVersionsListAllOptionalParams) =>
      listAll(context, options),
    listAllAtManagementGroup: (
      managementGroupName: string,
      options?: PolicySetDefinitionVersionsListAllAtManagementGroupOptionalParams,
    ) => listAllAtManagementGroup(context, managementGroupName, options),
    listAllBuiltins: (options?: PolicySetDefinitionVersionsListAllBuiltinsOptionalParams) =>
      listAllBuiltins(context, options),
    listByManagementGroup: (
      managementGroupName: string,
      policySetDefinitionName: string,
      options?: PolicySetDefinitionVersionsListByManagementGroupOptionalParams,
    ) => listByManagementGroup(context, managementGroupName, policySetDefinitionName, options),
    deleteAtManagementGroup: (
      managementGroupName: string,
      policySetDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicySetDefinitionVersionsDeleteAtManagementGroupOptionalParams,
    ) =>
      deleteAtManagementGroup(
        context,
        managementGroupName,
        policySetDefinitionName,
        policyDefinitionVersion,
        options,
      ),
    createOrUpdateAtManagementGroup: (
      managementGroupName: string,
      policySetDefinitionName: string,
      policyDefinitionVersion: string,
      parameters: PolicySetDefinitionVersion,
      options?: PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
    ) =>
      createOrUpdateAtManagementGroup(
        context,
        managementGroupName,
        policySetDefinitionName,
        policyDefinitionVersion,
        parameters,
        options,
      ),
    getAtManagementGroup: (
      managementGroupName: string,
      policySetDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicySetDefinitionVersionsGetAtManagementGroupOptionalParams,
    ) =>
      getAtManagementGroup(
        context,
        managementGroupName,
        policySetDefinitionName,
        policyDefinitionVersion,
        options,
      ),
    listBuiltIn: (
      policySetDefinitionName: string,
      options?: PolicySetDefinitionVersionsListBuiltInOptionalParams,
    ) => listBuiltIn(context, policySetDefinitionName, options),
    getBuiltIn: (
      policySetDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicySetDefinitionVersionsGetBuiltInOptionalParams,
    ) => getBuiltIn(context, policySetDefinitionName, policyDefinitionVersion, options),
    list: (
      policySetDefinitionName: string,
      options?: PolicySetDefinitionVersionsListOptionalParams,
    ) => list(context, policySetDefinitionName, options),
    delete: (
      policySetDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicySetDefinitionVersionsDeleteOptionalParams,
    ) => $delete(context, policySetDefinitionName, policyDefinitionVersion, options),
    createOrUpdate: (
      policySetDefinitionName: string,
      policyDefinitionVersion: string,
      parameters: PolicySetDefinitionVersion,
      options?: PolicySetDefinitionVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        policySetDefinitionName,
        policyDefinitionVersion,
        parameters,
        options,
      ),
    get: (
      policySetDefinitionName: string,
      policyDefinitionVersion: string,
      options?: PolicySetDefinitionVersionsGetOptionalParams,
    ) => get(context, policySetDefinitionName, policyDefinitionVersion, options),
  };
}

export function _getPolicySetDefinitionVersionsOperations(
  context: PolicyContext,
): PolicySetDefinitionVersionsOperations {
  return {
    ..._getPolicySetDefinitionVersions(context),
  };
}
