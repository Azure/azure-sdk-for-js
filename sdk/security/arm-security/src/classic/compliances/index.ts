// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/compliances/operations.js";
import {
  CompliancesListOptionalParams,
  CompliancesGetOptionalParams,
} from "../../api/compliances/options.js";
import { Compliance } from "../../models/legacySettingsAPI/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
