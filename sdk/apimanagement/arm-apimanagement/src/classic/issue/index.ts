// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService, get } from "../../api/issue/operations.js";
import type {
  IssueListByServiceOptionalParams,
  IssueGetOptionalParams,
} from "../../api/issue/options.js";
import type { IssueContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Issue operations. */
export interface IssueOperations {
  /** Lists a collection of issues in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: IssueListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<IssueContract>;
  /** Gets API Management issue details */
  get: (
    resourceGroupName: string,
    serviceName: string,
    issueId: string,
    options?: IssueGetOptionalParams,
  ) => Promise<IssueContract>;
}

function _getIssue(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: IssueListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      issueId: string,
      options?: IssueGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, issueId, options),
  };
}

export function _getIssueOperations(context: ApiManagementContext): IssueOperations {
  return {
    ..._getIssue(context),
  };
}
