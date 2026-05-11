// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  _ModelCapacityListResult,
  ModelCapacityListResultValueItem,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _modelCapacityListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ModelCapacitiesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  modelFormat: string,
  modelName: string,
  modelVersion: string,
  options: ModelCapacitiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/modelCapacities{?api%2Dversion,modelFormat,modelName,modelVersion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
      modelFormat: modelFormat,
      modelName: modelName,
      modelVersion: modelVersion,
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
): Promise<_ModelCapacityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _modelCapacityListResultDeserializer(result.body);
}

/** List ModelCapacities. */
export function list(
  context: Client,
  modelFormat: string,
  modelName: string,
  modelVersion: string,
  options: ModelCapacitiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ModelCapacityListResultValueItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, modelFormat, modelName, modelVersion, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}
