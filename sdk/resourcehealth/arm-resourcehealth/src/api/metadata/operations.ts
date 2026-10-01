// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
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
import { MetadataListOptionalParams, MetadataGetEntityOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: MetadataListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/metadata{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _metadataEntityListResultDeserializer(result.body);
}

/** Gets the list of metadata entities. */
export function list(
  context: Client,
  options: MetadataListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetadataEntity> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getEntitySend(
  context: Client,
  name: string,
  options: MetadataGetEntityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/metadata/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getEntityDeserialize(
  result: PathUncheckedResponse,
): Promise<MetadataEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return metadataEntityDeserializer(result.body);
}

/** Gets the list of metadata entities. */
export async function getEntity(
  context: Client,
  name: string,
  options: MetadataGetEntityOptionalParams = { requestOptions: {} },
): Promise<MetadataEntity> {
  const result = await _getEntitySend(context, name, options);
  return _getEntityDeserialize(result);
}
