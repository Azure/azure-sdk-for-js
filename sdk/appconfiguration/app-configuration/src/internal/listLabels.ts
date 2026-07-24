// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PagedAsyncIterableIterator, PagedResult } from "@azure/core-paging";
import { getPagedAsyncIterator } from "@azure/core-paging";
import type {
  ListLabelsOptions,
  ListLabelsPage,
  PageSettings,
  SettingLabel,
} from "../models.js";
import type { AppConfigurationContext } from "../generated/api/appConfigurationContext.js";
import type { _LabelListResult } from "../generated/models/models.js";
import { _getLabelsDeserialize, _getLabelsSend } from "../generated/api/operations.js";
import {
  extractAfterTokenFromNextLink,
  formatAcceptDateTime,
  formatLabelsFiltersAndSelect,
} from "./helpers.js";
import { tracingClient } from "./tracing.js";

/**
 * Shared implementation of `listLabels` used by both `AppConfigurationClient`
 * and `FeatureFlagClient`. The calling client supplies the `resourceType`
 * (`"kv"` or `"ff"`) so consumers don't have to.
 *
 * @internal
 */
export function listLabels(
  context: AppConfigurationContext,
  resourceType: string,
  spanName: string,
  options: ListLabelsOptions = {},
): PagedAsyncIterableIterator<SettingLabel, ListLabelsPage, PageSettings> {
  const pagedResult: PagedResult<ListLabelsPage, PageSettings, string | undefined> = {
    firstPageLink: undefined,
    getPage: async (pageLink: string | undefined) => {
      const response = await tracingClient.withSpan(
        spanName,
        options,
        async (updatedOptions): Promise<_LabelListResult & { _response: any }> => {
          const rawResponse = await _getLabelsSend(context, {
            ...updatedOptions,
            ...formatAcceptDateTime(options),
            ...formatLabelsFiltersAndSelect(options, resourceType),
            after: pageLink,
            requestOptions: {
              ...updatedOptions.requestOptions,
              skipUrlEncoding: true,
            },
          });
          const parsed = await _getLabelsDeserialize(rawResponse);
          return Object.assign(parsed, { _response: rawResponse });
        },
      );
      const currentResponse: ListLabelsPage = {
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
    },
    toElements: (page) => page.items,
  };
  return getPagedAsyncIterator(pagedResult);
}
