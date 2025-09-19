// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import type {
  _ElasticVersionsListResponse,
  ElasticVersionListFormat,
} from "../../models/models.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  _elasticVersionsListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ElasticVersionsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  region: string,
  options: ElasticVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Elastic/elasticVersions{?api%2Dversion,region}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      region: region,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ElasticVersionsListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _elasticVersionsListResponseDeserializer(result.body);
}

/** Retrieve a list of all available Elastic versions for a specified region, helping you choose the best version for your deployment. */
export function list(
  context: Client,
  region: string,
  options: ElasticVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ElasticVersionListFormat> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, region, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
