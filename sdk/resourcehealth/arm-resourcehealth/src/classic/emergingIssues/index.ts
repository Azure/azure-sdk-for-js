// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import { list, get } from "../../api/emergingIssues/operations.js";
import {
  EmergingIssuesListOptionalParams,
  EmergingIssuesGetOptionalParams,
} from "../../api/emergingIssues/options.js";
import { EmergingIssuesGetResult, IssueNameParameter } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EmergingIssues operations. */
export interface EmergingIssuesOperations {
  /** Lists Azure services' emerging issues. */
  list: (
    options?: EmergingIssuesListOptionalParams,
  ) => PagedAsyncIterableIterator<EmergingIssuesGetResult>;
  /** Gets Azure services' emerging issues. */
  get: (
    issueName: IssueNameParameter,
    options?: EmergingIssuesGetOptionalParams,
  ) => Promise<EmergingIssuesGetResult>;
}

function _getEmergingIssues(context: MicrosoftResourceHealthContext) {
  return {
    list: (options?: EmergingIssuesListOptionalParams) => list(context, options),
    get: (issueName: IssueNameParameter, options?: EmergingIssuesGetOptionalParams) =>
      get(context, issueName, options),
  };
}

export function _getEmergingIssuesOperations(
  context: MicrosoftResourceHealthContext,
): EmergingIssuesOperations {
  return {
    ..._getEmergingIssues(context),
  };
}
