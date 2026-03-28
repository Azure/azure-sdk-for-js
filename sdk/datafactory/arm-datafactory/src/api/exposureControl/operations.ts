// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  ExposureControlRequest,
  ExposureControlResponse,
  ExposureControlBatchRequest,
  ExposureControlBatchResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  exposureControlRequestSerializer,
  exposureControlResponseDeserializer,
  exposureControlBatchRequestSerializer,
  exposureControlBatchResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExposureControlGetFeatureValueOptionalParams,
  ExposureControlQueryFeatureValuesByFactoryOptionalParams,
  ExposureControlGetFeatureValueByFactoryOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getFeatureValueSend(
  context: Client,
  locationId: string,
  exposureControlRequest: ExposureControlRequest,
  options: ExposureControlGetFeatureValueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataFactory/locations/{locationId}/getFeatureValue{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationId: locationId,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: exposureControlRequestSerializer(exposureControlRequest),
  });
}

export async function _getFeatureValueDeserialize(
  result: PathUncheckedResponse,
): Promise<ExposureControlResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return exposureControlResponseDeserializer(result.body);
}

/** Get exposure control feature for specific location. */
export async function getFeatureValue(
  context: Client,
  locationId: string,
  exposureControlRequest: ExposureControlRequest,
  options: ExposureControlGetFeatureValueOptionalParams = { requestOptions: {} },
): Promise<ExposureControlResponse> {
  const result = await _getFeatureValueSend(context, locationId, exposureControlRequest, options);
  return _getFeatureValueDeserialize(result);
}

export function _queryFeatureValuesByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  exposureControlBatchRequest: ExposureControlBatchRequest,
  options: ExposureControlQueryFeatureValuesByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/queryFeaturesValue{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: exposureControlBatchRequestSerializer(exposureControlBatchRequest),
  });
}

export async function _queryFeatureValuesByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<ExposureControlBatchResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return exposureControlBatchResponseDeserializer(result.body);
}

/** Get list of exposure control features for specific factory. */
export async function queryFeatureValuesByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  exposureControlBatchRequest: ExposureControlBatchRequest,
  options: ExposureControlQueryFeatureValuesByFactoryOptionalParams = { requestOptions: {} },
): Promise<ExposureControlBatchResponse> {
  const result = await _queryFeatureValuesByFactorySend(
    context,
    resourceGroupName,
    factoryName,
    exposureControlBatchRequest,
    options,
  );
  return _queryFeatureValuesByFactoryDeserialize(result);
}

export function _getFeatureValueByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  exposureControlRequest: ExposureControlRequest,
  options: ExposureControlGetFeatureValueByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/getFeatureValue{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: exposureControlRequestSerializer(exposureControlRequest),
  });
}

export async function _getFeatureValueByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<ExposureControlResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return exposureControlResponseDeserializer(result.body);
}

/** Get exposure control feature for specific factory. */
export async function getFeatureValueByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  exposureControlRequest: ExposureControlRequest,
  options: ExposureControlGetFeatureValueByFactoryOptionalParams = { requestOptions: {} },
): Promise<ExposureControlResponse> {
  const result = await _getFeatureValueByFactorySend(
    context,
    resourceGroupName,
    factoryName,
    exposureControlRequest,
    options,
  );
  return _getFeatureValueByFactoryDeserialize(result);
}
