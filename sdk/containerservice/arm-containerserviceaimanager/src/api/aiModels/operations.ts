// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type {
  AIModel,
  _AIModelListResult,
  CalculateCostRequest,
  CalculateCostResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiModelDeserializer,
  _aiModelListResultDeserializer,
  calculateCostRequestSerializer,
  calculateCostResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AIModelsCalculateCostOptionalParams,
  AIModelsListOptionalParams,
  AIModelsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _calculateCostSend(
  context: Client,
  location: string,
  aiModelName: string,
  body: CalculateCostRequest,
  options: AIModelsCalculateCostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/aiModels/{aiModelName}/calculateCost{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      aiModelName: aiModelName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: calculateCostRequestSerializer(body),
  });
}

export async function _calculateCostDeserialize(
  result: PathUncheckedResponse,
): Promise<CalculateCostResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return calculateCostResponseDeserializer(result.body);
}
/** Returns a ranked list of GPU SKU pricing plans for deploying this model in the target region, each annotated with feasibility, per-replica hourly cost, and estimated relative performance. No Azure or Kubernetes resources are provisioned. */
export async function calculateCost(
  context: Client,
  location: string,
  aiModelName: string,
  body: CalculateCostRequest,
  options: AIModelsCalculateCostOptionalParams = { requestOptions: {} },
): Promise<CalculateCostResponse> {
  const result = await _calculateCostSend(context, location, aiModelName, body, options);
  return _calculateCostDeserialize(result);
}

export function _listSend(
  context: Client,
  location: string,
  options: AIModelsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/aiModels{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_AIModelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiModelListResultDeserializer(result.body);
}
/** List AIModel resources by SubscriptionLocationResource */
export function list(
  context: Client,
  location: string,
  options: AIModelsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AIModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-02-preview",
    },
  );
}

export function _getSend(
  context: Client,
  location: string,
  aiModelName: string,
  options: AIModelsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/aiModels/{aiModelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      aiModelName: aiModelName,
      "api%2Dversion": context.apiVersion ?? "2026-05-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AIModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiModelDeserializer(result.body);
}
/** Get a AIModel */
export async function get(
  context: Client,
  location: string,
  aiModelName: string,
  options: AIModelsGetOptionalParams = { requestOptions: {} },
): Promise<AIModel> {
  const result = await _getSend(context, location, aiModelName, options);
  return _getDeserialize(result);
}
