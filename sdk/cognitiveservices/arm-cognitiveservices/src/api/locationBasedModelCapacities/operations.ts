// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _ModelCapacityListResult,
  _modelCapacityListResultDeserializer,
  ModelCapacityListResultValueItem,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { LocationBasedModelCapacitiesListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  modelFormat: string,
  modelName: string,
  modelVersion: string,
  options: LocationBasedModelCapacitiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/modelCapacities{?api%2Dversion,modelFormat,modelName,modelVersion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
      modelFormat: modelFormat,
      modelName: modelName,
      modelVersion: modelVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ModelCapacityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _modelCapacityListResultDeserializer(result.body);
}

/** List Location Based ModelCapacities. */
export function list(
  context: Client,
  location: string,
  modelFormat: string,
  modelName: string,
  modelVersion: string,
  options: LocationBasedModelCapacitiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ModelCapacityListResultValueItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, modelFormat, modelName, modelVersion, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}
