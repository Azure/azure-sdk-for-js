// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
import {
  failOver,
  breakPairing,
  list,
  $delete,
  createOrUpdate,
  get,
  checkNameAvailability,
  listKeys,
  listAuthorizationRules,
  getAuthorizationRule,
} from "../../api/disasterRecoveryConfigs/operations.js";
import type {
  DisasterRecoveryConfigsFailOverOptionalParams,
  DisasterRecoveryConfigsBreakPairingOptionalParams,
  DisasterRecoveryConfigsListOptionalParams,
  DisasterRecoveryConfigsDeleteOptionalParams,
  DisasterRecoveryConfigsCreateOrUpdateOptionalParams,
  DisasterRecoveryConfigsGetOptionalParams,
  DisasterRecoveryConfigsCheckNameAvailabilityOptionalParams,
  DisasterRecoveryConfigsListKeysOptionalParams,
  DisasterRecoveryConfigsListAuthorizationRulesOptionalParams,
  DisasterRecoveryConfigsGetAuthorizationRuleOptionalParams,
} from "../../api/disasterRecoveryConfigs/options.js";
import type {
  SBAuthorizationRule,
  AccessKeys,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
  ArmDisasterRecovery,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DisasterRecoveryConfigs operations. */
export interface DisasterRecoveryConfigsOperations {
  /** Invokes GEO DR failover and reconfigure the alias to point to the secondary namespace */
  failOver: (
    resourceGroupName: string,
    namespaceName: string,
    alias: string,
    options?: DisasterRecoveryConfigsFailOverOptionalParams,
  ) => Promise<void>;
  /** This operation disables the Disaster Recovery and stops replicating changes from primary to secondary namespaces */
  breakPairing: (
    resourceGroupName: string,
    namespaceName: string,
    alias: string,
    options?: DisasterRecoveryConfigsBreakPairingOptionalParams,
  ) => Promise<void>;
  /** Gets all Alias(Disaster Recovery configurations) */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: DisasterRecoveryConfigsListOptionalParams,
  ) => PagedAsyncIterableIterator<ArmDisasterRecovery>;
  /** Deletes an Alias(Disaster Recovery configuration) */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    alias: string,
    options?: DisasterRecoveryConfigsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a new Alias(Disaster Recovery configuration) */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    alias: string,
    parameters: ArmDisasterRecovery,
    options?: DisasterRecoveryConfigsCreateOrUpdateOptionalParams,
  ) => Promise<ArmDisasterRecovery>;
  /** Retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    alias: string,
    options?: DisasterRecoveryConfigsGetOptionalParams,
  ) => Promise<ArmDisasterRecovery>;
  /** Check the give namespace name availability. */
  checkNameAvailability: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: CheckNameAvailability,
    options?: DisasterRecoveryConfigsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** Gets the primary and secondary connection strings for the namespace. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    alias: string,
    authorizationRuleName: string,
    options?: DisasterRecoveryConfigsListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Gets the authorization rules for a namespace. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    alias: string,
    options?: DisasterRecoveryConfigsListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<SBAuthorizationRule>;
  /** Gets an authorization rule for a namespace by rule name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    alias: string,
    authorizationRuleName: string,
    options?: DisasterRecoveryConfigsGetAuthorizationRuleOptionalParams,
  ) => Promise<SBAuthorizationRule>;
}

function _getDisasterRecoveryConfigs(context: ServiceBusManagementContext) {
  return {
    failOver: (
      resourceGroupName: string,
      namespaceName: string,
      alias: string,
      options?: DisasterRecoveryConfigsFailOverOptionalParams,
    ) => failOver(context, resourceGroupName, namespaceName, alias, options),
    breakPairing: (
      resourceGroupName: string,
      namespaceName: string,
      alias: string,
      options?: DisasterRecoveryConfigsBreakPairingOptionalParams,
    ) => breakPairing(context, resourceGroupName, namespaceName, alias, options),
    list: (
      resourceGroupName: string,
      namespaceName: string,
      options?: DisasterRecoveryConfigsListOptionalParams,
    ) => list(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      alias: string,
      options?: DisasterRecoveryConfigsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, alias, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      alias: string,
      parameters: ArmDisasterRecovery,
      options?: DisasterRecoveryConfigsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, alias, parameters, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      alias: string,
      options?: DisasterRecoveryConfigsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, alias, options),
    checkNameAvailability: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: CheckNameAvailability,
      options?: DisasterRecoveryConfigsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, resourceGroupName, namespaceName, parameters, options),
    listKeys: (
      resourceGroupName: string,
      namespaceName: string,
      alias: string,
      authorizationRuleName: string,
      options?: DisasterRecoveryConfigsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, namespaceName, alias, authorizationRuleName, options),
    listAuthorizationRules: (
      resourceGroupName: string,
      namespaceName: string,
      alias: string,
      options?: DisasterRecoveryConfigsListAuthorizationRulesOptionalParams,
    ) => listAuthorizationRules(context, resourceGroupName, namespaceName, alias, options),
    getAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      alias: string,
      authorizationRuleName: string,
      options?: DisasterRecoveryConfigsGetAuthorizationRuleOptionalParams,
    ) =>
      getAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        alias,
        authorizationRuleName,
        options,
      ),
  };
}

export function _getDisasterRecoveryConfigsOperations(
  context: ServiceBusManagementContext,
): DisasterRecoveryConfigsOperations {
  return {
    ..._getDisasterRecoveryConfigs(context),
  };
}
