// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  FileShareUsageDataResponse,
  fileShareUsageDataResponseDeserializer,
  FileShareLimitsResponse,
  fileShareLimitsResponseDeserializer,
  FileShareProvisioningRecommendationRequest,
  fileShareProvisioningRecommendationRequestSerializer,
  FileShareProvisioningRecommendationResponse,
  fileShareProvisioningRecommendationResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  InformationalOperationsGetProvisioningRecommendationOptionalParams,
  InformationalOperationsGetLimitsOptionalParams,
  InformationalOperationsGetUsageDataOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getProvisioningRecommendationSend(
  context: Client,
  location: string,
  body: FileShareProvisioningRecommendationRequest,
  options: InformationalOperationsGetProvisioningRecommendationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.FileShares/locations/{location}/getProvisioningRecommendation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
      body: fileShareProvisioningRecommendationRequestSerializer(body),
    });
}

export async function _getProvisioningRecommendationDeserialize(
  result: PathUncheckedResponse,
): Promise<FileShareProvisioningRecommendationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fileShareProvisioningRecommendationResponseDeserializer(result.body);
}

/** Get file shares provisioning parameters recommendation. */
export async function getProvisioningRecommendation(
  context: Client,
  location: string,
  body: FileShareProvisioningRecommendationRequest,
  options: InformationalOperationsGetProvisioningRecommendationOptionalParams = {
    requestOptions: {},
  },
): Promise<FileShareProvisioningRecommendationResponse> {
  const result = await _getProvisioningRecommendationSend(context, location, body, options);
  return _getProvisioningRecommendationDeserialize(result);
}

export function _getLimitsSend(
  context: Client,
  location: string,
  options: InformationalOperationsGetLimitsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.FileShares/locations/{location}/getLimits{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getLimitsDeserialize(
  result: PathUncheckedResponse,
): Promise<FileShareLimitsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fileShareLimitsResponseDeserializer(result.body);
}

/** Get file shares limits. */
export async function getLimits(
  context: Client,
  location: string,
  options: InformationalOperationsGetLimitsOptionalParams = { requestOptions: {} },
): Promise<FileShareLimitsResponse> {
  const result = await _getLimitsSend(context, location, options);
  return _getLimitsDeserialize(result);
}

export function _getUsageDataSend(
  context: Client,
  location: string,
  options: InformationalOperationsGetUsageDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.FileShares/locations/{location}/getUsageData{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getUsageDataDeserialize(
  result: PathUncheckedResponse,
): Promise<FileShareUsageDataResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fileShareUsageDataResponseDeserializer(result.body);
}

/** Get file shares usage data. */
export async function getUsageData(
  context: Client,
  location: string,
  options: InformationalOperationsGetUsageDataOptionalParams = { requestOptions: {} },
): Promise<FileShareUsageDataResponse> {
  const result = await _getUsageDataSend(context, location, options);
  return _getUsageDataDeserialize(result);
}
