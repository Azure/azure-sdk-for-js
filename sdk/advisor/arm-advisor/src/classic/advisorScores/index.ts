// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import { list, get } from "../../api/advisorScores/operations.js";
import {
  AdvisorScoresListOptionalParams,
  AdvisorScoresGetOptionalParams,
} from "../../api/advisorScores/options.js";
import { AdvisorScoreEntity } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AdvisorScores operations. */
export interface AdvisorScoresOperations {
  /** Gets the list of advisor scores. */
  list: (
    options?: AdvisorScoresListOptionalParams,
  ) => PagedAsyncIterableIterator<AdvisorScoreEntity>;
  /** Gets the advisor score. */
  get: (name: string, options?: AdvisorScoresGetOptionalParams) => Promise<AdvisorScoreEntity>;
}

function _getAdvisorScores(context: AdvisorManagementContext) {
  return {
    list: (options?: AdvisorScoresListOptionalParams) => list(context, options),
    get: (name: string, options?: AdvisorScoresGetOptionalParams) => get(context, name, options),
  };
}

export function _getAdvisorScoresOperations(
  context: AdvisorManagementContext,
): AdvisorScoresOperations {
  return {
    ..._getAdvisorScores(context),
  };
}
