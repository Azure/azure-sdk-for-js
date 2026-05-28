// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list } from "../../api/applications/operations.js";
import { ApplicationsListOptionalParams } from "../../api/applications/options.js";
import { Application } from "../../models/applicationsAPI/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Applications operations. */
export interface ApplicationsOperations {
  /** Get a list of all relevant applications over a subscription level scope */
  list: (options?: ApplicationsListOptionalParams) => PagedAsyncIterableIterator<Application>;
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
