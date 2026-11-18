// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/secureScores/operations.js";
import type {
  SecureScoresListOptionalParams,
  SecureScoresGetOptionalParams,
} from "../../api/secureScores/options.js";
import type { SecureScoreItem } from "../../models/secureScoreAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecureScores operations. */
export interface SecureScoresOperations {
  /** List secure scores for all your Microsoft Defender for Cloud initiatives within your current scope. */
  list: (options?: SecureScoresListOptionalParams) => PagedAsyncIterableIterator<SecureScoreItem>;
  /** Get secure score for a specific Microsoft Defender for Cloud initiative within your current scope. For the ASC Default initiative, use 'ascScore'. */
  get: (
    secureScoreName: string,
    options?: SecureScoresGetOptionalParams,
  ) => Promise<SecureScoreItem>;
}

function _getSecureScores(context: SecurityCenterContext) {
  return {
    list: (options?: SecureScoresListOptionalParams) => list(context, options),
    get: (secureScoreName: string, options?: SecureScoresGetOptionalParams) =>
      get(context, secureScoreName, options),
  };
}

export function _getSecureScoresOperations(context: SecurityCenterContext): SecureScoresOperations {
  return {
    ..._getSecureScores(context),
  };
}
