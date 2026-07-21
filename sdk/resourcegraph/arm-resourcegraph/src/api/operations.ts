// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceGraphContext as Client } from "./index.js";
import type { ResourcesHistoryResponse } from "../models/models.js";
import type {
  ResourceChangesRequestParameters,
  ResourceChangeList,
  ResourceChangeData,
  ResourceChangeDetailsRequestParameters,
} from "../models/resourceChanges/models.js";
import {
  resourceChangesRequestParametersSerializer,
  resourceChangeListDeserializer,
  resourceChangeDataArrayDeserializer,
  resourceChangeDetailsRequestParametersSerializer,
} from "../models/resourceChanges/models.js";
import type { QueryRequest, QueryResponse } from "../models/resourceGraphApi/models.js";
import {
  queryRequestSerializer,
  queryResponseDeserializer,
} from "../models/resourceGraphApi/models.js";
import { errorResponseDeserializer } from "../models/resourceGraphCommon/models.js";
import type { ResourcesHistoryRequest } from "../models/resourceHistory/models.js";
import { resourcesHistoryRequestSerializer } from "../models/resourceHistory/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  ResourcesHistoryOptionalParams,
  ResourcesOptionalParams,
  ResourceChangeDetailsOptionalParams,
  ResourceChangesOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _resourcesHistorySend(
  context: Client,
  request: ResourcesHistoryRequest,
  options: ResourcesHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceGraph/resourcesHistory{?api%2Dversion}",
    {
      "api%2Dversion": "2021-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourcesHistoryRequestSerializer(request),
  });
}

export async function _resourcesHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourcesHistoryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** List all snapshots of a resource for a given time interval. */
export async function resourcesHistory(
  context: Client,
  request: ResourcesHistoryRequest,
  options: ResourcesHistoryOptionalParams = { requestOptions: {} },
): Promise<ResourcesHistoryResponse> {
  const result = await _resourcesHistorySend(context, request, options);
  return _resourcesHistoryDeserialize(result);
}

export function _resourcesSend(
  context: Client,
  query: QueryRequest,
  options: ResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceGraph/resources{?api%2Dversion}",
    {
      "api%2Dversion": "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: queryRequestSerializer(query),
  });
}

export async function _resourcesDeserialize(result: PathUncheckedResponse): Promise<QueryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return queryResponseDeserializer(result.body);
}

/** Queries the resources managed by Azure Resource Manager for scopes specified in the request. */
export async function resources(
  context: Client,
  query: QueryRequest,
  options: ResourcesOptionalParams = { requestOptions: {} },
): Promise<QueryResponse> {
  const result = await _resourcesSend(context, query, options);
  return _resourcesDeserialize(result);
}

export function _resourceChangeDetailsSend(
  context: Client,
  parameters: ResourceChangeDetailsRequestParameters,
  options: ResourceChangeDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceGraph/resourceChangeDetails{?api%2Dversion}",
    {
      "api%2Dversion": "2020-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceChangeDetailsRequestParametersSerializer(parameters),
  });
}

export async function _resourceChangeDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceChangeData[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceChangeDataArrayDeserializer(result.body);
}

/** Get resource change details. */
export async function resourceChangeDetails(
  context: Client,
  parameters: ResourceChangeDetailsRequestParameters,
  options: ResourceChangeDetailsOptionalParams = { requestOptions: {} },
): Promise<ResourceChangeData[]> {
  const result = await _resourceChangeDetailsSend(context, parameters, options);
  return _resourceChangeDetailsDeserialize(result);
}

export function _resourceChangesSend(
  context: Client,
  parameters: ResourceChangesRequestParameters,
  options: ResourceChangesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceGraph/resourceChanges{?api%2Dversion}",
    {
      "api%2Dversion": "2020-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceChangesRequestParametersSerializer(parameters),
  });
}

export async function _resourceChangesDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceChangeList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceChangeListDeserializer(result.body);
}

/** List changes to a resource for a given time interval. */
export async function resourceChanges(
  context: Client,
  parameters: ResourceChangesRequestParameters,
  options: ResourceChangesOptionalParams = { requestOptions: {} },
): Promise<ResourceChangeList> {
  const result = await _resourceChangesSend(context, parameters, options);
  return _resourceChangesDeserialize(result);
}
