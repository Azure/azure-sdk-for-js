// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext as Client } from "../index.js";
import type { BatchFeatureRequest, BatchFeatureStatus } from "../../models/models.js";
import {
  errorResponseModelDeserializer,
  batchFeatureRequestSerializer,
  batchFeatureStatusDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FeaturesSubscriptionGetOptionalParams,
  FeaturesAccountGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _subscriptionGetSend(
  context: Client,
  locations: string,
  featureRequest: BatchFeatureRequest,
  options: FeaturesSubscriptionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Purview/locations/{locations}/listFeatures{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locations: locations,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: batchFeatureRequestSerializer(featureRequest),
  });
}

export async function _subscriptionGetDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchFeatureStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return batchFeatureStatusDeserializer(result.body);
}

/** Gets details from a list of feature names. */
export async function subscriptionGet(
  context: Client,
  locations: string,
  featureRequest: BatchFeatureRequest,
  options: FeaturesSubscriptionGetOptionalParams = { requestOptions: {} },
): Promise<BatchFeatureStatus> {
  const result = await _subscriptionGetSend(context, locations, featureRequest, options);
  return _subscriptionGetDeserialize(result);
}

export function _accountGetSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  featureRequest: BatchFeatureRequest,
  options: FeaturesAccountGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/listFeatures{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: batchFeatureRequestSerializer(featureRequest),
  });
}

export async function _accountGetDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchFeatureStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return batchFeatureStatusDeserializer(result.body);
}

/** Gets details from a list of feature names. */
export async function accountGet(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  featureRequest: BatchFeatureRequest,
  options: FeaturesAccountGetOptionalParams = { requestOptions: {} },
): Promise<BatchFeatureStatus> {
  const result = await _accountGetSend(
    context,
    resourceGroupName,
    accountName,
    featureRequest,
    options,
  );
  return _accountGetDeserialize(result);
}
