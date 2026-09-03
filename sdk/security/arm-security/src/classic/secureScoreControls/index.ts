// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, listBySecureScore } from "../../api/secureScoreControls/operations.js";
import {
  SecureScoreControlsListOptionalParams,
  SecureScoreControlsListBySecureScoreOptionalParams,
} from "../../api/secureScoreControls/options.js";
import { SecureScoreControlDetails } from "../../models/secureScoreAPI/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecureScoreControls operations. */
export interface SecureScoreControlsOperations {
  /** Get all security controls within a scope */
  list: (
    options?: SecureScoreControlsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecureScoreControlDetails>;
  /** Get all security controls for a specific initiative within a scope */
  listBySecureScore: (
    secureScoreName: string,
    options?: SecureScoreControlsListBySecureScoreOptionalParams,
  ) => PagedAsyncIterableIterator<SecureScoreControlDetails>;
}

function _getSecureScoreControls(context: SecurityCenterContext) {
  return {
    list: (options?: SecureScoreControlsListOptionalParams) => list(context, options),
    listBySecureScore: (
      secureScoreName: string,
      options?: SecureScoreControlsListBySecureScoreOptionalParams,
    ) => listBySecureScore(context, secureScoreName, options),
  };
}

export function _getSecureScoreControlsOperations(
  context: SecurityCenterContext,
): SecureScoreControlsOperations {
  return {
    ..._getSecureScoreControls(context),
  };
}
