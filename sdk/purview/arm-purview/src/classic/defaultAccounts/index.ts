// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext } from "../../api/purviewManagementContext.js";
import { set, remove, get } from "../../api/defaultAccounts/operations.js";
import type {
  DefaultAccountsSetOptionalParams,
  DefaultAccountsRemoveOptionalParams,
  DefaultAccountsGetOptionalParams,
} from "../../api/defaultAccounts/options.js";
import type { DefaultAccountPayload, ScopeType } from "../../models/models.js";

/** Interface representing a DefaultAccounts operations. */
export interface DefaultAccountsOperations {
  /** Sets the default account for the scope. */
  set: (
    defaultAccountPayload: DefaultAccountPayload,
    options?: DefaultAccountsSetOptionalParams,
  ) => Promise<DefaultAccountPayload>;
  /** Removes the default account from the scope. */
  remove: (
    scopeTenantId: string,
    scopeType: ScopeType,
    options?: DefaultAccountsRemoveOptionalParams,
  ) => Promise<void>;
  /** Get the default account for the scope. */
  get: (
    scopeTenantId: string,
    scopeType: ScopeType,
    options?: DefaultAccountsGetOptionalParams,
  ) => Promise<DefaultAccountPayload>;
}

function _getDefaultAccounts(context: PurviewManagementContext) {
  return {
    set: (
      defaultAccountPayload: DefaultAccountPayload,
      options?: DefaultAccountsSetOptionalParams,
    ) => set(context, defaultAccountPayload, options),
    remove: (
      scopeTenantId: string,
      scopeType: ScopeType,
      options?: DefaultAccountsRemoveOptionalParams,
    ) => remove(context, scopeTenantId, scopeType, options),
    get: (
      scopeTenantId: string,
      scopeType: ScopeType,
      options?: DefaultAccountsGetOptionalParams,
    ) => get(context, scopeTenantId, scopeType, options),
  };
}

export function _getDefaultAccountsOperations(
  context: PurviewManagementContext,
): DefaultAccountsOperations {
  return {
    ..._getDefaultAccounts(context),
  };
}
