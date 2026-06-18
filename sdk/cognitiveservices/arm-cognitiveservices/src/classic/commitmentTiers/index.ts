// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list } from "../../api/commitmentTiers/operations.js";
import { CommitmentTiersListOptionalParams } from "../../api/commitmentTiers/options.js";
import { CommitmentTier } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CommitmentTiers operations. */
export interface CommitmentTiersOperations {
  /** List Commitment Tiers. */
  list: (
    location: string,
    options?: CommitmentTiersListOptionalParams,
  ) => PagedAsyncIterableIterator<CommitmentTier>;
}

function _getCommitmentTiers(context: CognitiveServicesManagementContext) {
  return {
    list: (location: string, options?: CommitmentTiersListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getCommitmentTiersOperations(
  context: CognitiveServicesManagementContext,
): CommitmentTiersOperations {
  return {
    ..._getCommitmentTiers(context),
  };
}
