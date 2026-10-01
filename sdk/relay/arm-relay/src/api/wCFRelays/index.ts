// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
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
} from "./operations.js";
export type {
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
} from "./options.js";
