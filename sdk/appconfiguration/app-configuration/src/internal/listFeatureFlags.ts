// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PagedAsyncIterableIterator, PagedResult, PageSettings } from "@azure/core-paging";
import { getPagedAsyncIterator } from "@azure/core-paging";
import type { OperationOptions } from "@azure-rest/core-client";
import type { RestError } from "@azure/core-rest-pipeline";
import type { ListFeatureFlagPage } from "../models.js";
import type { AppConfigurationContext } from "../generated/api/appConfigurationContext.js";
import type { FeatureFlag } from "../generated/models/models.js";
import type { FeatureFlagClientGetFeatureFlagsOptionalParams } from "../generated/api/featureFlagClient/options.js";
import {
  _getFeatureFlagsDeserialize,
  _getFeatureFlagsSend,
} from "../generated/api/featureFlagClient/operations.js";
import {
  checkAndFormatIfAndIfNoneMatch,
  extractAfterTokenFromLinkHeader,
  extractAfterTokenFromNextLink,
} from "./helpers.js";
import { logger } from "../logger.js";
import { tracingClient } from "./tracing.js";

/**
 * Shared implementation of `listFeatureFlags` used by `FeatureFlagClient`.
 *
 * Wraps each page fetch in an operation-level span so tracing behaves
 * consistently with the other public client methods, and supports conditional
 * page retrieval via `pageEtags`: each etag is sent as an `If-None-Match` header
 * for its corresponding page, and an unchanged page (`304 Not Modified`) yields
 * an empty page whose `etag` is preserved.
 *
 * @internal
 */
export function listFeatureFlags(
  context: AppConfigurationContext,
  spanName: string,
  sendParams: FeatureFlagClientGetFeatureFlagsOptionalParams,
  pageEtags: string[] | undefined,
  options: OperationOptions = {},
): PagedAsyncIterableIterator<FeatureFlag, ListFeatureFlagPage, PageSettings> {
  const remainingPageEtags = pageEtags ? [...pageEtags] : undefined;
  const pagedResult: PagedResult<ListFeatureFlagPage, PageSettings, string | undefined> = {
    firstPageLink: undefined,
    getPage: async (pageLink: string | undefined) => {
      const etag = remainingPageEtags?.shift();
      try {
        const response = await tracingClient.withSpan(spanName, options, async (updatedOptions) => {
          const rawResponse = await _getFeatureFlagsSend(context, {
            ...sendParams,
            ...updatedOptions,
            ...checkAndFormatIfAndIfNoneMatch({ etag }, { onlyIfChanged: true }),
            after: pageLink,
            requestOptions: {
              ...sendParams.requestOptions,
              ...updatedOptions.requestOptions,
              skipUrlEncoding: true,
            },
          });
          const parsed = await _getFeatureFlagsDeserialize(rawResponse);
          return Object.assign(parsed, { _response: rawResponse as any });
        });
        const currentResponse: ListFeatureFlagPage = {
          ...response,
          items: response.items ?? [],
          continuationToken: response.nextLink
            ? extractAfterTokenFromNextLink(response.nextLink)
            : undefined,
          _response: response._response,
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
            `[listFeatureFlags] No updates for this page. The current etag for the page is ${etag}`,
          );
          return {
            page: {
              items: [],
              etag,
              _response: { ...err.response, status: 304 },
            } as unknown as ListFeatureFlagPage,
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
