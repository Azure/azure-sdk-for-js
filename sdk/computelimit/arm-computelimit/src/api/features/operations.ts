// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Feature,
  featureDeserializer,
  _FeatureListResult,
  _featureListResultDeserializer,
  featureEnableRequestSerializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FeaturesDisableOptionalParams,
  FeaturesEnableOptionalParams,
  FeaturesListBySubscriptionLocationResourceOptionalParams,
  FeaturesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _disableSend(
  context: Client,
  location: string,
  featureName: string,
  options: FeaturesDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/features/{featureName}/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      featureName: featureName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _disableDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Disables a compute limit feature for the subscription at the specified location. */
export function disable(
  context: Client,
  location: string,
  featureName: string,
  options: FeaturesDisableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _disableDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _disableSend(context, location, featureName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

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
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: !options?.body ? options?.body : featureEnableRequestSerializer(options?.body),
    });
}

export async function _enableDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
  return getLongRunningPoller(context, _enableDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _enableSend(context, location, featureName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
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
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _listBySubscriptionLocationResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_FeatureListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
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
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Feature> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
