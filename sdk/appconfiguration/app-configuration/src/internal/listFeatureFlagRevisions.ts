// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PagedAsyncIterableIterator, PagedResult, PageSettings } from "@azure/core-paging";
import { getPagedAsyncIterator } from "@azure/core-paging";
import type { OperationOptions } from "@azure-rest/core-client";
import type { RestError } from "@azure/core-rest-pipeline";
import type { ListFeatureFlagRevisionsPage } from "../models.js";
import type { AppConfigurationContext } from "../generated/api/appConfigurationContext.js";
import type { FeatureFlag } from "../generated/models/models.js";
import type { FeatureFlagClientGetFeatureFlagRevisionsOptionalParams } from "../generated/api/featureFlagClient/options.js";
import {
  _getFeatureFlagRevisionsDeserialize,
  _getFeatureFlagRevisionsSend,
} from "../generated/api/featureFlagClient/operations.js";
import {
  checkAndFormatIfAndIfNoneMatch,
  extractAfterTokenFromLinkHeader,
  extractAfterTokenFromNextLink,
  toFeatureFlagCompatResponse,
} from "./helpers.js";
import { logger } from "../logger.js";
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
  pageEtags: string[] | undefined,
  options: OperationOptions = {},
): PagedAsyncIterableIterator<FeatureFlag, ListFeatureFlagRevisionsPage, PageSettings> {
  const remainingPageEtags = pageEtags ? [...pageEtags] : undefined;
  const pagedResult: PagedResult<ListFeatureFlagRevisionsPage, PageSettings, string | undefined> = {
    firstPageLink: undefined,
    getPage: async (pageLink: string | undefined) => {
      const etag = remainingPageEtags?.shift();
      try {
        const response = await tracingClient.withSpan(spanName, options, async (updatedOptions) => {
          const rawResponse = await _getFeatureFlagRevisionsSend(context, {
            ...sendParams,
            ...updatedOptions,
            ...checkAndFormatIfAndIfNoneMatch({ etag }, { onlyIfChanged: true }),
            after: pageLink,
            requestOptions: {
              ...sendParams.requestOptions,
              ...updatedOptions.requestOptions,
              skipUrlEncoding: true,
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
          _response: toFeatureFlagCompatResponse(response._response),
        };
        return {
          page: currentResponse,
          nextPageLink: currentResponse.continuationToken,
        };
      } catch (error) {
        const err = error as RestError;
        const link = err.response?.headers?.get("link");
        const continuationToken = link ? extractAfterTokenFromLinkHeader(link) : undefined;

        if (err.statusCode === 304) {
          err.message = `Status 304: No updates for this page`;
          logger.info(
            `[listFeatureFlagRevisions] No updates for this page. The current etag for the page is ${etag}`,
          );
          return {
            page: {
              items: [],
              etag,
              continuationToken,
              _response: toFeatureFlagCompatResponse(err.response),
            } as unknown as ListFeatureFlagRevisionsPage,
            nextPageLink: continuationToken,
          };
        }

        throw err;
      }
    },
    toElements: (page) => page.items,
  };
  return getPagedAsyncIterator(pagedResult);
}
