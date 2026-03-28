// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, get } from "../../api/officeConsents/operations.js";
import type {
  OfficeConsentsListOptionalParams,
  OfficeConsentsDeleteOptionalParams,
  OfficeConsentsGetOptionalParams,
} from "../../api/officeConsents/options.js";
import type { OfficeConsent } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OfficeConsents operations. */
export interface OfficeConsentsOperations {
  /** Gets all office365 consents. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: OfficeConsentsListOptionalParams,
  ) => PagedAsyncIterableIterator<OfficeConsent>;
  /** Delete the office365 consent. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    consentId: string,
    options?: OfficeConsentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets an office365 consent. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    consentId: string,
    options?: OfficeConsentsGetOptionalParams,
  ) => Promise<OfficeConsent>;
}

function _getOfficeConsents(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: OfficeConsentsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      consentId: string,
      options?: OfficeConsentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, consentId, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      consentId: string,
      options?: OfficeConsentsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, consentId, options),
  };
}

export function _getOfficeConsentsOperations(
  context: SecurityInsightsContext,
): OfficeConsentsOperations {
  return {
    ..._getOfficeConsents(context),
  };
}
