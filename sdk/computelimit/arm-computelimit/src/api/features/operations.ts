// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext as Client } from "../index.js";
import type { Feature, _FeatureListResult, OperationStatusResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  featureDeserializer,
  _featureListResultDeserializer,
  operationStatusResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FeaturesEnableOptionalParams,
  FeaturesListBySubscriptionLocationResourceOptionalParams,
  FeaturesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _enableSend(
  context: Client,
  location: string,
  featureName: string,
  options: FeaturesEnableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/features/{featureName}/enable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      featureName: featureName,
      "api%2Dversion": context.apiVersion ?? "2026-03-20",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _enableDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Enables a compute limit feature for the subscription at the specified location. */
export function enable(
  context: Client,
  location: string,
  featureName: string,
  options: FeaturesEnableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _enableDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _enableSend(context, location, featureName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-20",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _listBySubscriptionLocationResourceSend(
  context: Client,
  location: string,
  options: FeaturesListBySubscriptionLocationResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/features{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-03-20",
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

export async function _listBySubscriptionLocationResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_FeatureListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _featureListResultDeserializer(result.body);
}

/** Lists all compute limit features for the subscription at the specified location. */
export function listBySubscriptionLocationResource(
  context: Client,
  location: string,
  options: FeaturesListBySubscriptionLocationResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Feature> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionLocationResourceSend(context, location, options),
    _listBySubscriptionLocationResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-20" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  featureName: string,
  options: FeaturesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/features/{featureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      featureName: featureName,
      "api%2Dversion": context.apiVersion ?? "2026-03-20",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Feature> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return featureDeserializer(result.body);
}

/** Gets the properties of a compute limit feature. */
export async function get(
  context: Client,
  location: string,
  featureName: string,
  options: FeaturesGetOptionalParams = { requestOptions: {} },
): Promise<Feature> {
  const result = await _getSend(context, location, featureName, options);
  return _getDeserialize(result);
}
