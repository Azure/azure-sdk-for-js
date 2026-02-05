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
} from "../../api/policyDefinitions/operations.js";
import type {
  PolicyDefinitionsListByManagementGroupOptionalParams,
  PolicyDefinitionsDeleteAtManagementGroupOptionalParams,
  PolicyDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicyDefinitionsGetAtManagementGroupOptionalParams,
  PolicyDefinitionsListBuiltInOptionalParams,
  PolicyDefinitionsGetBuiltInOptionalParams,
  PolicyDefinitionsListOptionalParams,
  PolicyDefinitionsDeleteOptionalParams,
  PolicyDefinitionsCreateOrUpdateOptionalParams,
  PolicyDefinitionsGetOptionalParams,
} from "../../api/policyDefinitions/options.js";
import type { PolicyDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyDefinitions operations. */
export interface PolicyDefinitionsOperations {
  /** This operation retrieves a list of all the policy definitions in a given management group that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy definitions associated with the management group, including those that apply directly or from management groups that contain the given management group. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given management group. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}. */
  listByManagementGroup: (
    managementGroupId: string,
    options?: PolicyDefinitionsListByManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyDefinition>;
  /** This operation deletes the policy definition in the given management group with the given name. */
  deleteAtManagementGroup: (
    managementGroupId: string,
    policyDefinitionName: string,
    options?: PolicyDefinitionsDeleteAtManagementGroupOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a policy definition in the given management group with the given name. */
  createOrUpdateAtManagementGroup: (
    managementGroupId: string,
    policyDefinitionName: string,
    parameters: PolicyDefinition,
    options?: PolicyDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
  ) => Promise<PolicyDefinition>;
  /** This operation retrieves the policy definition in the given management group with the given name. */
  getAtManagementGroup: (
    managementGroupId: string,
    policyDefinitionName: string,
    options?: PolicyDefinitionsGetAtManagementGroupOptionalParams,
  ) => Promise<PolicyDefinition>;
  /** This operation retrieves a list of all the built-in policy definitions that match the optional given $filter. If $filter='policyType -eq {value}' is provided, the returned list only includes all built-in policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy definitions whose category match the {value}. */
  listBuiltIn: (
    options?: PolicyDefinitionsListBuiltInOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyDefinition>;
  /** This operation retrieves the built-in policy definition with the given name. */
  getBuiltIn: (
    policyDefinitionName: string,
    options?: PolicyDefinitionsGetBuiltInOptionalParams,
  ) => Promise<PolicyDefinition>;
  /** This operation retrieves a list of all the policy definitions in a given subscription that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy definitions associated with the subscription, including those that apply directly or from management groups that contain the given subscription. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given subscription. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}. */
  list: (
    options?: PolicyDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyDefinition>;
  /** This operation deletes the policy definition in the given subscription with the given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    policyDefinitionName: string,
    options?: PolicyDefinitionsDeleteOptionalParams,
  ) => Promise<void>;
  /** This operation creates or updates a policy definition in the given subscription with the given name. */
  createOrUpdate: (
    policyDefinitionName: string,
    parameters: PolicyDefinition,
    options?: PolicyDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<PolicyDefinition>;
  /** This operation retrieves the policy definition in the given subscription with the given name. */
  get: (
    policyDefinitionName: string,
    options?: PolicyDefinitionsGetOptionalParams,
  ) => Promise<PolicyDefinition>;
}

function _getPolicyDefinitions(context: PolicyContext) {
  return {
    listByManagementGroup: (
      managementGroupId: string,
      options?: PolicyDefinitionsListByManagementGroupOptionalParams,
    ) => listByManagementGroup(context, managementGroupId, options),
    deleteAtManagementGroup: (
      managementGroupId: string,
      policyDefinitionName: string,
      options?: PolicyDefinitionsDeleteAtManagementGroupOptionalParams,
    ) => deleteAtManagementGroup(context, managementGroupId, policyDefinitionName, options),
    createOrUpdateAtManagementGroup: (
      managementGroupId: string,
      policyDefinitionName: string,
      parameters: PolicyDefinition,
      options?: PolicyDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
    ) =>
      createOrUpdateAtManagementGroup(
        context,
        managementGroupId,
        policyDefinitionName,
        parameters,
        options,
      ),
    getAtManagementGroup: (
      managementGroupId: string,
      policyDefinitionName: string,
      options?: PolicyDefinitionsGetAtManagementGroupOptionalParams,
    ) => getAtManagementGroup(context, managementGroupId, policyDefinitionName, options),
    listBuiltIn: (options?: PolicyDefinitionsListBuiltInOptionalParams) =>
      listBuiltIn(context, options),
    getBuiltIn: (
      policyDefinitionName: string,
      options?: PolicyDefinitionsGetBuiltInOptionalParams,
    ) => getBuiltIn(context, policyDefinitionName, options),
    list: (options?: PolicyDefinitionsListOptionalParams) => list(context, options),
    delete: (policyDefinitionName: string, options?: PolicyDefinitionsDeleteOptionalParams) =>
      $delete(context, policyDefinitionName, options),
    createOrUpdate: (
      policyDefinitionName: string,
      parameters: PolicyDefinition,
      options?: PolicyDefinitionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, policyDefinitionName, parameters, options),
    get: (policyDefinitionName: string, options?: PolicyDefinitionsGetOptionalParams) =>
      get(context, policyDefinitionName, options),
  };
}

export function _getPolicyDefinitionsOperations(
  context: PolicyContext,
): PolicyDefinitionsOperations {
  return {
    ..._getPolicyDefinitions(context),
  };
}
