// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementContext as Client } from "../index.js";
import {
  armErrorResponseDeserializer,
  armErrorResponseBodyDeserializer,
  MetadataEntity,
  metadataEntityDeserializer,
  _MetadataEntityListResult,
  _metadataEntityListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  RecommendationMetadataListOptionalParams,
  RecommendationMetadataGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: RecommendationMetadataListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Advisor/metadata{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MetadataEntityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = armErrorResponseDeserializer(result.body);

    throw error;
  }

  return _metadataEntityListResultDeserializer(result.body);
}

/** Gets the list of metadata entities. */
export function list(
  context: Client,
  options: RecommendationMetadataListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetadataEntity> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: RecommendationMetadataGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Advisor/metadata/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MetadataEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 404) {
      error.details = armErrorResponseBodyDeserializer(result.body);
    } else {
      error.details = armErrorResponseDeserializer(result.body);
    }
    throw error;
  }

  return metadataEntityDeserializer(result.body);
}

/** Gets the metadata entity. */
export async function get(
  context: Client,
  name: string,
  options: RecommendationMetadataGetOptionalParams = { requestOptions: {} },
): Promise<MetadataEntity> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
