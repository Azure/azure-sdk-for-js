// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list } from "../../api/securityConnectorApplications/operations.js";
import type { SecurityConnectorApplicationsListOptionalParams } from "../../api/securityConnectorApplications/options.js";
import type { Application } from "../../models/applicationsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecurityConnectorApplications operations. */
export interface SecurityConnectorApplicationsOperations {
  /** Get a list of all relevant applications over a security connector level scope */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: SecurityConnectorApplicationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Application>;
}

function _getSecurityConnectorApplications(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: SecurityConnectorApplicationsListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, options),
  };
}

export function _getSecurityConnectorApplicationsOperations(
  context: SecurityCenterContext,
): SecurityConnectorApplicationsOperations {
  return {
    ..._getSecurityConnectorApplications(context),
  };
}
