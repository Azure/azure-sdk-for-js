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
  EventHubsListByNamespaceOptionalParams,
  EventHubsDeleteOptionalParams,
  EventHubsCreateOrUpdateOptionalParams,
  EventHubsGetOptionalParams,
  EventHubsRegenerateKeysOptionalParams,
  EventHubsListKeysOptionalParams,
  EventHubsListAuthorizationRulesOptionalParams,
  EventHubsDeleteAuthorizationRuleOptionalParams,
  EventHubsCreateOrUpdateAuthorizationRuleOptionalParams,
  EventHubsGetAuthorizationRuleOptionalParams,
} from "./options.js";
