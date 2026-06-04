// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { list, get } from "../../api/problemClassifications/operations.js";
import {
  ProblemClassificationsListOptionalParams,
  ProblemClassificationsGetOptionalParams,
} from "../../api/problemClassifications/options.js";
import { ProblemClassification } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProblemClassifications operations. */
export interface ProblemClassificationsOperations {
  /** Lists all the problem classifications (categories) available for a specific Azure service. Always use the service and problem classifications obtained programmatically. This practice ensures that you always have the most recent set of service and problem classification Ids. */
  list: (
    serviceName: string,
    options?: ProblemClassificationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ProblemClassification>;
  /** Get problem classification details for a specific Azure service. */
  get: (
    serviceName: string,
    problemClassificationName: string,
    options?: ProblemClassificationsGetOptionalParams,
  ) => Promise<ProblemClassification>;
}

function _getProblemClassifications(context: MicrosoftSupportContext) {
  return {
    list: (serviceName: string, options?: ProblemClassificationsListOptionalParams) =>
      list(context, serviceName, options),
    get: (
      serviceName: string,
      problemClassificationName: string,
      options?: ProblemClassificationsGetOptionalParams,
    ) => get(context, serviceName, problemClassificationName, options),
  };
}

export function _getProblemClassificationsOperations(
  context: MicrosoftSupportContext,
): ProblemClassificationsOperations {
  return {
    ..._getProblemClassifications(context),
  };
}
