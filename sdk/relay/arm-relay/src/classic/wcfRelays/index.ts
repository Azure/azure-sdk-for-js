// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelayAPIContext } from "../../api/relayAPIContext.js";
import {
  listByNamespace,
  $delete,
  createOrUpdate,
  get,
  regenerateKeys,
  listKeys,
  listAuthorizationRules,
  deleteAuthorizationRule,
  createOrUpdateAuthorizationRule,
  getAuthorizationRule,
} from "../../api/wcfRelays/operations.js";
import type {
  WCFRelaysListByNamespaceOptionalParams,
  WCFRelaysDeleteOptionalParams,
  WCFRelaysCreateOrUpdateOptionalParams,
  WCFRelaysGetOptionalParams,
  WCFRelaysRegenerateKeysOptionalParams,
  WCFRelaysListKeysOptionalParams,
  WCFRelaysListAuthorizationRulesOptionalParams,
  WCFRelaysDeleteAuthorizationRuleOptionalParams,
  WCFRelaysCreateOrUpdateAuthorizationRuleOptionalParams,
  WCFRelaysGetAuthorizationRuleOptionalParams,
} from "../../api/wcfRelays/options.js";
import type {
  AuthorizationRule,
  AccessKeys,
  RegenerateAccessKeyParameters,
  WcfRelay,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WCFRelays operations. */
export interface WCFRelaysOperations {
  /** Lists the WCF relays within the namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: WCFRelaysListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<WcfRelay>;
  /** Deletes a WCF relay. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    options?: WCFRelaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a WCF relay. This operation is idempotent. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    parameters: WcfRelay,
    options?: WCFRelaysCreateOrUpdateOptionalParams,
  ) => Promise<WcfRelay>;
  /** Returns the description for the specified WCF relay. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    options?: WCFRelaysGetOptionalParams,
  ) => Promise<WcfRelay | null>;
  /** Regenerates the primary or secondary connection strings to the WCF relay. */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: WCFRelaysRegenerateKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Primary and secondary connection strings to the WCF relay. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    options?: WCFRelaysListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Authorization rules for a WCF relay. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    options?: WCFRelaysListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationRule>;
  /** Deletes a WCF relay authorization rule. */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    options?: WCFRelaysDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an authorization rule for a WCF relay. */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    parameters: AuthorizationRule,
    options?: WCFRelaysCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
  /** Get authorizationRule for a WCF relay by name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    options?: WCFRelaysGetAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
}

function _getWCFRelays(context: RelayAPIContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: WCFRelaysListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      options?: WCFRelaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, relayName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      parameters: WcfRelay,
      options?: WCFRelaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, relayName, parameters, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      options?: WCFRelaysGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, relayName, options),
    regenerateKeys: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      authorizationRuleName: string,
      parameters: RegenerateAccessKeyParameters,
      options?: WCFRelaysRegenerateKeysOptionalParams,
    ) =>
      regenerateKeys(
        context,
        resourceGroupName,
        namespaceName,
        relayName,
        authorizationRuleName,
        parameters,
        options,
      ),
    listKeys: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      authorizationRuleName: string,
      options?: WCFRelaysListKeysOptionalParams,
    ) =>
      listKeys(
        context,
        resourceGroupName,
        namespaceName,
        relayName,
        authorizationRuleName,
        options,
      ),
    listAuthorizationRules: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      options?: WCFRelaysListAuthorizationRulesOptionalParams,
    ) => listAuthorizationRules(context, resourceGroupName, namespaceName, relayName, options),
    deleteAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      authorizationRuleName: string,
      options?: WCFRelaysDeleteAuthorizationRuleOptionalParams,
    ) =>
      deleteAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        relayName,
        authorizationRuleName,
        options,
      ),
    createOrUpdateAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      authorizationRuleName: string,
      parameters: AuthorizationRule,
      options?: WCFRelaysCreateOrUpdateAuthorizationRuleOptionalParams,
    ) =>
      createOrUpdateAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        relayName,
        authorizationRuleName,
        parameters,
        options,
      ),
    getAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      authorizationRuleName: string,
      options?: WCFRelaysGetAuthorizationRuleOptionalParams,
    ) =>
      getAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        relayName,
        authorizationRuleName,
        options,
      ),
  };
}

export function _getWCFRelaysOperations(context: RelayAPIContext): WCFRelaysOperations {
  return {
    ..._getWCFRelays(context),
  };
}
