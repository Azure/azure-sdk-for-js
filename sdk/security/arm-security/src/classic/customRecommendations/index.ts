// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/customRecommendations/operations.js";
import type {
  CustomRecommendationsListOptionalParams,
  CustomRecommendationsDeleteOptionalParams,
  CustomRecommendationsCreateOrUpdateOptionalParams,
  CustomRecommendationsGetOptionalParams,
} from "../../api/customRecommendations/options.js";
import type { CustomRecommendation } from "../../models/securityStandardsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CustomRecommendations operations. */
export interface CustomRecommendationsOperations {
  /** Get a list of all relevant custom recommendations over a scope */
  list: (
    scope: string,
    options?: CustomRecommendationsListOptionalParams,
  ) => PagedAsyncIterableIterator<CustomRecommendation>;
  /** Delete a custom recommendation over a given scope */
  delete: (
    scope: string,
    customRecommendationName: string,
    options?: CustomRecommendationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a custom recommendation over a given scope */
  createOrUpdate: (
    scope: string,
    customRecommendationName: string,
    customRecommendationBody: CustomRecommendation,
    options?: CustomRecommendationsCreateOrUpdateOptionalParams,
  ) => Promise<CustomRecommendation>;
  /** Get a specific custom recommendation for the requested scope by customRecommendationName */
  get: (
    scope: string,
    customRecommendationName: string,
    options?: CustomRecommendationsGetOptionalParams,
  ) => Promise<CustomRecommendation>;
}

function _getCustomRecommendations(context: SecurityCenterContext) {
  return {
    list: (scope: string, options?: CustomRecommendationsListOptionalParams) =>
      list(context, scope, options),
    delete: (
      scope: string,
      customRecommendationName: string,
      options?: CustomRecommendationsDeleteOptionalParams,
    ) => $delete(context, scope, customRecommendationName, options),
    createOrUpdate: (
      scope: string,
      customRecommendationName: string,
      customRecommendationBody: CustomRecommendation,
      options?: CustomRecommendationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, scope, customRecommendationName, customRecommendationBody, options),
    get: (
      scope: string,
      customRecommendationName: string,
      options?: CustomRecommendationsGetOptionalParams,
    ) => get(context, scope, customRecommendationName, options),
  };
}

export function _getCustomRecommendationsOperations(
  context: SecurityCenterContext,
): CustomRecommendationsOperations {
  return {
    ..._getCustomRecommendations(context),
  };
}
