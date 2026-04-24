// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/compliances/operations.js";
import type {
  CompliancesListOptionalParams,
  CompliancesGetOptionalParams,
} from "../../api/compliances/options.js";
import type { Compliance } from "../../models/legacySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Compliances operations. */
export interface CompliancesOperations {
  /** The Compliance scores of the specific management group. */
  list: (
    scope: string,
    options?: CompliancesListOptionalParams,
  ) => PagedAsyncIterableIterator<Compliance>;
  /** Details of a specific Compliance. */
  get: (
    scope: string,
    complianceName: string,
    options?: CompliancesGetOptionalParams,
  ) => Promise<Compliance>;
}

function _getCompliances(context: SecurityCenterContext) {
  return {
    list: (scope: string, options?: CompliancesListOptionalParams) => list(context, scope, options),
    get: (scope: string, complianceName: string, options?: CompliancesGetOptionalParams) =>
      get(context, scope, complianceName, options),
  };
}

export function _getCompliancesOperations(context: SecurityCenterContext): CompliancesOperations {
  return {
    ..._getCompliances(context),
  };
}
