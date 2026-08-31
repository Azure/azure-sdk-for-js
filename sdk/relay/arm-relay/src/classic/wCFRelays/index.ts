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
} from "../../api/wCFRelays/operations.js";
import type {
  wCFRelaysListByNamespaceOptionalParams,
  wCFRelaysDeleteOptionalParams,
  wCFRelaysCreateOrUpdateOptionalParams,
  wCFRelaysGetOptionalParams,
  wCFRelaysRegenerateKeysOptionalParams,
  wCFRelaysListKeysOptionalParams,
  wCFRelaysListAuthorizationRulesOptionalParams,
  wCFRelaysDeleteAuthorizationRuleOptionalParams,
  wCFRelaysCreateOrUpdateAuthorizationRuleOptionalParams,
  wCFRelaysGetAuthorizationRuleOptionalParams,
} from "../../api/wCFRelays/options.js";
import type {
  AuthorizationRule,
  AccessKeys,
  RegenerateAccessKeyParameters,
  WcfRelay,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a wCFRelays operations. */
export interface wCFRelaysOperations {
  /** Lists the WCF relays within the namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: wCFRelaysListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<WcfRelay>;
  /** Deletes a WCF relay. */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    options?: wCFRelaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a WCF relay. This operation is idempotent. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    parameters: WcfRelay,
    options?: wCFRelaysCreateOrUpdateOptionalParams,
  ) => Promise<WcfRelay>;
  /** Returns the description for the specified WCF relay. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    options?: wCFRelaysGetOptionalParams,
  ) => Promise<WcfRelay | undefined>;
  /** Regenerates the primary or secondary connection strings to the WCF relay. */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: wCFRelaysRegenerateKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Primary and secondary connection strings to the WCF relay. */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    options?: wCFRelaysListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Authorization rules for a WCF relay. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    options?: wCFRelaysListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationRule>;
  /** Deletes a WCF relay authorization rule. */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    options?: wCFRelaysDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an authorization rule for a WCF relay. */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    parameters: AuthorizationRule,
    options?: wCFRelaysCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
  /** Get authorizationRule for a WCF relay by name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    relayName: string,
    authorizationRuleName: string,
    options?: wCFRelaysGetAuthorizationRuleOptionalParams,
  ) => Promise<AuthorizationRule>;
}

function _getwCFRelays(context: RelayAPIContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: wCFRelaysListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      options?: wCFRelaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, relayName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      parameters: WcfRelay,
      options?: wCFRelaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, relayName, parameters, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      options?: wCFRelaysGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, relayName, options),
    regenerateKeys: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      authorizationRuleName: string,
      parameters: RegenerateAccessKeyParameters,
      options?: wCFRelaysRegenerateKeysOptionalParams,
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
      options?: wCFRelaysListKeysOptionalParams,
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
      options?: wCFRelaysListAuthorizationRulesOptionalParams,
    ) => listAuthorizationRules(context, resourceGroupName, namespaceName, relayName, options),
    deleteAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      relayName: string,
      authorizationRuleName: string,
      options?: wCFRelaysDeleteAuthorizationRuleOptionalParams,
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
      options?: wCFRelaysCreateOrUpdateAuthorizationRuleOptionalParams,
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
      options?: wCFRelaysGetAuthorizationRuleOptionalParams,
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

export function _getwCFRelaysOperations(context: RelayAPIContext): wCFRelaysOperations {
  return {
    ..._getwCFRelays(context),
  };
}
