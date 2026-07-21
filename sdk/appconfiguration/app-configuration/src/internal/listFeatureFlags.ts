// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PagedAsyncIterableIterator, PagedResult, PageSettings } from "@azure/core-paging";
import { getPagedAsyncIterator } from "@azure/core-paging";
import type { OperationOptions } from "@azure-rest/core-client";
import type { AppConfigurationContext } from "../generated/api/appConfigurationContext.js";
import type { FeatureFlag } from "../generated/models/models.js";
import type { FeatureFlagClientGetFeatureFlagsOptionalParams } from "../generated/api/featureFlagClient/options.js";
import {
  _getFeatureFlagsDeserialize,
  _getFeatureFlagsSend,
} from "../generated/api/featureFlagClient/operations.js";
import { extractAfterTokenFromNextLink } from "./helpers.js";
import { tracingClient } from "./tracing.js";

/**
 * Shared implementation of `listFeatureFlags` used by `FeatureFlagClient`.
 * Wraps each page fetch in an operation-level span so tracing behaves
 * consistently with the other public client methods.
 *
 * @internal
 */
export function listFeatureFlags(
  context: AppConfigurationContext,
  spanName: string,
  sendParams: FeatureFlagClientGetFeatureFlagsOptionalParams,
  options: OperationOptions = {},
): PagedAsyncIterableIterator<FeatureFlag> {
  const pagedResult: PagedResult<FeatureFlag[], PageSettings, string | undefined> = {
    firstPageLink: undefined,
    getPage: async (pageLink: string | undefined) => {
      const { items, nextLink } = await tracingClient.withSpan(
        spanName,
        options,
        async (updatedOptions) => {
          const rawResponse = await _getFeatureFlagsSend(context, {
            ...sendParams,
            ...updatedOptions,
            after: pageLink,
            requestOptions: {
              ...sendParams.requestOptions,
              ...updatedOptions.requestOptions,
              skipUrlEncoding: true,
            },
          });
          return _getFeatureFlagsDeserialize(rawResponse);
        },
      );
      return {
        page: items ?? [],
        nextPageLink: nextLink ? extractAfterTokenFromNextLink(nextLink) : undefined,
      };
    },
    toElements: (page) => page,
  };
  return getPagedAsyncIterator(pagedResult);
}
