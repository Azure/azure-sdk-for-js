// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import { list, get } from "../../api/recommendationMetadata/operations.js";
import type {
  RecommendationMetadataListOptionalParams,
  RecommendationMetadataGetOptionalParams,
} from "../../api/recommendationMetadata/options.js";
import type { MetadataEntity } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecommendationMetadata operations. */
export interface RecommendationMetadataOperations {
  /** Gets the list of metadata entities. */
  list: (
    options?: RecommendationMetadataListOptionalParams,
  ) => PagedAsyncIterableIterator<MetadataEntity>;
  /** Gets the metadata entity. */
  get: (name: string, options?: RecommendationMetadataGetOptionalParams) => Promise<MetadataEntity>;
}

function _getRecommendationMetadata(context: AdvisorManagementContext) {
  return {
    list: (options?: RecommendationMetadataListOptionalParams) => list(context, options),
    get: (name: string, options?: RecommendationMetadataGetOptionalParams) =>
      get(context, name, options),
  };
}

export function _getRecommendationMetadataOperations(
  context: AdvisorManagementContext,
): RecommendationMetadataOperations {
  return {
    ..._getRecommendationMetadata(context),
  };
}
