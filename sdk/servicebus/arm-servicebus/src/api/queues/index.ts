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
  QueuesListByNamespaceOptionalParams,
  QueuesDeleteOptionalParams,
  QueuesCreateOrUpdateOptionalParams,
  QueuesGetOptionalParams,
  QueuesRegenerateKeysOptionalParams,
  QueuesListKeysOptionalParams,
  QueuesListAuthorizationRulesOptionalParams,
  QueuesDeleteAuthorizationRuleOptionalParams,
  QueuesCreateOrUpdateAuthorizationRuleOptionalParams,
  QueuesGetAuthorizationRuleOptionalParams,
} from "./options.js";
