// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, create, get } from "../../api/securityContacts/operations.js";
import type {
  SecurityContactsListOptionalParams,
  SecurityContactsDeleteOptionalParams,
  SecurityContactsCreateOptionalParams,
  SecurityContactsGetOptionalParams,
} from "../../api/securityContacts/options.js";
import type { SecurityContact, SecurityContactName } from "../../models/automationsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecurityContacts operations. */
export interface SecurityContactsOperations {
  /** List all security contact configurations for the subscription */
  list: (
    options?: SecurityContactsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityContact>;
  /** Delete security contact configurations for the subscription */
  delete: (
    securityContactName: SecurityContactName,
    options?: SecurityContactsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create security contact configurations for the subscription */
  create: (
    securityContactName: SecurityContactName,
    securityContact: SecurityContact,
    options?: SecurityContactsCreateOptionalParams,
  ) => Promise<SecurityContact>;
  /** Get Default Security contact configurations for the subscription */
  get: (
    securityContactName: SecurityContactName,
    options?: SecurityContactsGetOptionalParams,
  ) => Promise<SecurityContact>;
}

function _getSecurityContacts(context: SecurityCenterContext) {
  return {
    list: (options?: SecurityContactsListOptionalParams) => list(context, options),
    delete: (
      securityContactName: SecurityContactName,
      options?: SecurityContactsDeleteOptionalParams,
    ) => $delete(context, securityContactName, options),
    create: (
      securityContactName: SecurityContactName,
      securityContact: SecurityContact,
      options?: SecurityContactsCreateOptionalParams,
    ) => create(context, securityContactName, securityContact, options),
    get: (securityContactName: SecurityContactName, options?: SecurityContactsGetOptionalParams) =>
      get(context, securityContactName, options),
  };
}

export function _getSecurityContactsOperations(
  context: SecurityCenterContext,
): SecurityContactsOperations {
  return {
    ..._getSecurityContacts(context),
  };
}
