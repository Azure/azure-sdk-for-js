// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list } from "../../api/applications/operations.js";
import type { ApplicationsListOptionalParams } from "../../api/applications/options.js";
import type { ApplicationsAPIApplication } from "../../models/applicationsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Applications operations. */
export interface ApplicationsOperations {
  /** Get a list of all relevant applications over a subscription level scope */
  list: (
    options?: ApplicationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationsAPIApplication>;
}

function _getApplications(context: SecurityCenterContext) {
  return {
    list: (options?: ApplicationsListOptionalParams) => list(context, options),
  };
}

export function _getApplicationsOperations(context: SecurityCenterContext): ApplicationsOperations {
  return {
    ..._getApplications(context),
  };
}
