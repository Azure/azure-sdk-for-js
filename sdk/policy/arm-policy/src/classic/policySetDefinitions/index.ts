// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext } from "../../api/policyContext.js";
import {
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
} from "../../api/policySetDefinitions/operations.js";
import type {
  PolicySetDefinitionsListByManagementGroupOptionalParams,
  PolicySetDefinitionsDeleteAtManagementGroupOptionalParams,
  PolicySetDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicySetDefinitionsGetAtManagementGroupOptionalParams,
  PolicySetDefinitionsListBuiltInOptionalParams,
  PolicySetDefinitionsGetBuiltInOptionalParams,
  PolicySetDefinitionsListOptionalParams,
  PolicySetDefinitionsDeleteOptionalParams,
  PolicySetDefinitionsCreateOrUpdateOptionalParams,
  PolicySetDefinitionsGetOptionalParams,
} from "../../api/policySetDefinitions/options.js";
import type { PolicySetDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicySetDefinitions operations. */
export interface PolicySetDefinitionsOperations {
  /** This operation retrieves a list of all the policy set definitions in a given management group that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy set definitions associated with the management group, including those that apply directly or from management groups that contain the given management group. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given management group. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn and Custom. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}. */
  listByManagementGroup: (
    managementGroupId: string,
    options?: PolicySetDefinitionsListByManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicySetDefinition>;
  /** This operation deletes the policy set definition in the given management group with the given name. */
  deleteAtManagementGroup: (
    managementGroupId: string,
    policySetDefinitionName: string,
    options?: PolicySetDefinitionsDeleteAtManagementGroupOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a policy set definition in the given management group with the given name. */
  createOrUpdateAtManagementGroup: (
    managementGroupId: string,
    policySetDefinitionName: string,
    parameters: PolicySetDefinition,
    options?: PolicySetDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
  ) => Promise<PolicySetDefinition>;
  /** This operation retrieves the policy set definition in the given management group with the given name. */
  getAtManagementGroup: (
    managementGroupId: string,
    policySetDefinitionName: string,
    options?: PolicySetDefinitionsGetAtManagementGroupOptionalParams,
  ) => Promise<PolicySetDefinition>;
  /** This operation retrieves a list of all the built-in policy set definitions that match the optional given $filter. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy set definitions whose category match the {value}. */
  listBuiltIn: (
    options?: PolicySetDefinitionsListBuiltInOptionalParams,
  ) => PagedAsyncIterableIterator<PolicySetDefinition>;
  /** This operation retrieves the built-in policy set definition with the given name. */
  getBuiltIn: (
    policySetDefinitionName: string,
    options?: PolicySetDefinitionsGetBuiltInOptionalParams,
  ) => Promise<PolicySetDefinition>;
  /** This operation retrieves a list of all the policy set definitions in a given subscription that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy set definitions associated with the subscription, including those that apply directly or from management groups that contain the given subscription. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given subscription. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn and Custom. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}. */
  list: (
    options?: PolicySetDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PolicySetDefinition>;
  /** This operation deletes the policy set definition in the given subscription with the given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    policySetDefinitionName: string,
    options?: PolicySetDefinitionsDeleteOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a policy set definition in the given subscription with the given name. */
  createOrUpdate: (
    policySetDefinitionName: string,
    parameters: PolicySetDefinition,
    options?: PolicySetDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<PolicySetDefinition>;
  /** This operation retrieves the policy set definition in the given subscription with the given name. */
  get: (
    policySetDefinitionName: string,
    options?: PolicySetDefinitionsGetOptionalParams,
  ) => Promise<PolicySetDefinition>;
}

function _getPolicySetDefinitions(context: PolicyContext) {
  return {
    listByManagementGroup: (
      managementGroupId: string,
      options?: PolicySetDefinitionsListByManagementGroupOptionalParams,
    ) => listByManagementGroup(context, managementGroupId, options),
    deleteAtManagementGroup: (
      managementGroupId: string,
      policySetDefinitionName: string,
      options?: PolicySetDefinitionsDeleteAtManagementGroupOptionalParams,
    ) => deleteAtManagementGroup(context, managementGroupId, policySetDefinitionName, options),
    createOrUpdateAtManagementGroup: (
      managementGroupId: string,
      policySetDefinitionName: string,
      parameters: PolicySetDefinition,
      options?: PolicySetDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
    ) =>
      createOrUpdateAtManagementGroup(
        context,
        managementGroupId,
        policySetDefinitionName,
        parameters,
        options,
      ),
    getAtManagementGroup: (
      managementGroupId: string,
      policySetDefinitionName: string,
      options?: PolicySetDefinitionsGetAtManagementGroupOptionalParams,
    ) => getAtManagementGroup(context, managementGroupId, policySetDefinitionName, options),
    listBuiltIn: (options?: PolicySetDefinitionsListBuiltInOptionalParams) =>
      listBuiltIn(context, options),
    getBuiltIn: (
      policySetDefinitionName: string,
      options?: PolicySetDefinitionsGetBuiltInOptionalParams,
    ) => getBuiltIn(context, policySetDefinitionName, options),
    list: (options?: PolicySetDefinitionsListOptionalParams) => list(context, options),
    delete: (policySetDefinitionName: string, options?: PolicySetDefinitionsDeleteOptionalParams) =>
      $delete(context, policySetDefinitionName, options),
    createOrUpdate: (
      policySetDefinitionName: string,
      parameters: PolicySetDefinition,
      options?: PolicySetDefinitionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, policySetDefinitionName, parameters, options),
    get: (policySetDefinitionName: string, options?: PolicySetDefinitionsGetOptionalParams) =>
      get(context, policySetDefinitionName, options),
  };
}

export function _getPolicySetDefinitionsOperations(
  context: PolicyContext,
): PolicySetDefinitionsOperations {
  return {
    ..._getPolicySetDefinitions(context),
  };
}
