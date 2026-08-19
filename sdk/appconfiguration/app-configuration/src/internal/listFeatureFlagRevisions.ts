// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PagedAsyncIterableIterator, PagedResult, PageSettings } from "@azure/core-paging";
import { getPagedAsyncIterator } from "@azure/core-paging";
import type { OperationOptions } from "@azure-rest/core-client";
import type { ListFeatureFlagRevisionsPage } from "../models.js";
import type { AppConfigurationContext } from "../generated/api/appConfigurationContext.js";
import type { FeatureFlag } from "../generated/models/models.js";
import type { FeatureFlagClientGetFeatureFlagRevisionsOptionalParams } from "../generated/api/featureFlagClient/options.js";
import {
  _getFeatureFlagRevisionsDeserialize,
  _getFeatureFlagRevisionsSend,
} from "../generated/api/featureFlagClient/operations.js";
import { extractAfterTokenFromNextLink, toAppConfigurationCompatResponse } from "./helpers.js";
import { tracingClient } from "./tracing.js";

/**
 * Shared implementation of `listFeatureFlagRevisions` used by `FeatureFlagClient`.
 *
 * Wraps each page fetch in an operation-level span so tracing behaves
 * consistently with the other public client methods.
 *
 * @internal
 */
export function listFeatureFlagRevisions(
  context: AppConfigurationContext,
  spanName: string,
  sendParams: FeatureFlagClientGetFeatureFlagRevisionsOptionalParams,
  acceptDatetime: string | undefined,
  options: OperationOptions = {},
): PagedAsyncIterableIterator<FeatureFlag, ListFeatureFlagRevisionsPage, PageSettings> {
  const pagedResult: PagedResult<ListFeatureFlagRevisionsPage, PageSettings, string | undefined> = {
    firstPageLink: undefined,
    getPage: async (pageLink: string | undefined) => {
      const response = await tracingClient.withSpan(spanName, options, async (updatedOptions) => {
        const rawResponse = await _getFeatureFlagRevisionsSend(context, {
          ...sendParams,
          ...updatedOptions,
          after: pageLink,
          requestOptions: {
            ...sendParams.requestOptions,
            ...updatedOptions.requestOptions,
            headers: {
              ...sendParams.requestOptions?.headers,
              ...updatedOptions.requestOptions?.headers,
              ...(acceptDatetime === undefined ? {} : { "accept-datetime": acceptDatetime }),
            },
          },
        });
        const parsed = await _getFeatureFlagRevisionsDeserialize(rawResponse);
        return Object.assign(parsed, { _response: rawResponse });
      });
      const currentResponse: ListFeatureFlagRevisionsPage = {
        ...response,
        items: response.items ?? [],
        continuationToken: response.nextLink
          ? extractAfterTokenFromNextLink(response.nextLink)
          : undefined,
        _response: toAppConfigurationCompatResponse(response._response),
      };
      return {
        page: currentResponse,
        nextPageLink: currentResponse.continuationToken,
      };
    },
    toElements: (page) => page.items,
  };
  return getPagedAsyncIterator(pagedResult);
}
