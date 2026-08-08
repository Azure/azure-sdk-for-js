// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PagedAsyncIterableIterator, PagedResult, PageSettings } from "@azure/core-paging";
import { getPagedAsyncIterator } from "@azure/core-paging";
import type { OperationOptions } from "@azure-rest/core-client";
import type { RestError } from "@azure/core-rest-pipeline";
import type { FeatureFlag, ListFeatureFlagPage } from "../models.js";
import type { AppConfigurationContext } from "../generated/api/appConfigurationContext.js";
import type { FeatureFlagClientCheckFeatureFlagsOptionalParams } from "../generated/api/featureFlagClient/options.js";
import {
  _checkFeatureFlagsDeserialize,
  _checkFeatureFlagsSend,
} from "../generated/api/featureFlagClient/operations.js";
import {
  checkAndFormatIfAndIfNoneMatch,
  extractAfterTokenFromLinkHeader,
  toFeatureFlagCompatResponse,
} from "./helpers.js";
import { logger } from "../logger.js";
import { tracingClient } from "./tracing.js";

/** @internal */
export function checkFeatureFlags(
  context: AppConfigurationContext,
  spanName: string,
  sendParams: FeatureFlagClientCheckFeatureFlagsOptionalParams,
  pageEtags: string[] | undefined,
  options: OperationOptions = {},
): PagedAsyncIterableIterator<FeatureFlag, ListFeatureFlagPage, PageSettings> {
  const remainingPageEtags = pageEtags ? [...pageEtags] : undefined;
  const pagedResult: PagedResult<ListFeatureFlagPage, PageSettings, string | undefined> = {
    firstPageLink: undefined,
    getPage: async (pageLink: string | undefined) => {
      const etag = remainingPageEtags?.shift();
      let rawResponse;
      try {
        rawResponse = await tracingClient.withSpan(spanName, options, async (updatedOptions) => {
          const response = await _checkFeatureFlagsSend(context, {
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
          await _checkFeatureFlagsDeserialize(response);
          return response;
        });
        const compatResponse = toFeatureFlagCompatResponse(rawResponse);
        const link = compatResponse.headers.get("link");
        const continuationToken = link ? extractAfterTokenFromLinkHeader(link) : undefined;
        return {
          page: {
            items: [],
            etag: compatResponse.headers.get("etag"),
            continuationToken,
            _response: compatResponse,
          } as unknown as ListFeatureFlagPage,
          nextPageLink: continuationToken,
        };
      } catch (error) {
        const err = error as RestError;
        if (err.statusCode === 304) {
          const response = rawResponse ?? err.response;
          if (!response) {
            throw err;
          }
          const compatResponse = toFeatureFlagCompatResponse(response);
          const link = compatResponse.headers.get("link");
          const continuationToken = link ? extractAfterTokenFromLinkHeader(link) : undefined;
          logger.info(
            `[checkFeatureFlags] No updates for this page. The current etag for the page is ${etag}`,
          );
          return {
            page: {
              items: [],
              etag,
              continuationToken,
              _response: compatResponse,
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
