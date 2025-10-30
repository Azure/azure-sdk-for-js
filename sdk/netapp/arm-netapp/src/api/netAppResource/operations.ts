// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  RegionInfo,
  ResourceNameAvailabilityRequest,
  CheckAvailabilityResponse,
  FilePathAvailabilityRequest,
  QuotaAvailabilityRequest,
  QueryNetworkSiblingSetRequest,
  NetworkSiblingSet,
  UpdateNetworkSiblingSetRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  regionInfoDeserializer,
  resourceNameAvailabilityRequestSerializer,
  checkAvailabilityResponseDeserializer,
  filePathAvailabilityRequestSerializer,
  quotaAvailabilityRequestSerializer,
  queryNetworkSiblingSetRequestSerializer,
  networkSiblingSetDeserializer,
  updateNetworkSiblingSetRequestSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetAppResourceUpdateNetworkSiblingSetOptionalParams,
  NetAppResourceQueryNetworkSiblingSetOptionalParams,
  NetAppResourceQueryRegionInfoOptionalParams,
  NetAppResourceCheckQuotaAvailabilityOptionalParams,
  NetAppResourceCheckFilePathAvailabilityOptionalParams,
  NetAppResourceCheckNameAvailabilityOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateNetworkSiblingSetSend(
  context: Client,
  location: string,
  body: UpdateNetworkSiblingSetRequest,
  options: NetAppResourceUpdateNetworkSiblingSetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/updateNetworkSiblingSet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateNetworkSiblingSetRequestSerializer(body),
  });
}

export async function _updateNetworkSiblingSetDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSiblingSet> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkSiblingSetDeserializer(result.body);
}

/** Update the network features of the specified network sibling set. */
export function updateNetworkSiblingSet(
  context: Client,
  location: string,
  body: UpdateNetworkSiblingSetRequest,
  options: NetAppResourceUpdateNetworkSiblingSetOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NetworkSiblingSet>, NetworkSiblingSet> {
  return getLongRunningPoller(context, _updateNetworkSiblingSetDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateNetworkSiblingSetSend(context, location, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NetworkSiblingSet>, NetworkSiblingSet>;
}

export function _queryNetworkSiblingSetSend(
  context: Client,
  location: string,
  body: QueryNetworkSiblingSetRequest,
  options: NetAppResourceQueryNetworkSiblingSetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/queryNetworkSiblingSet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: queryNetworkSiblingSetRequestSerializer(body),
  });
}

export async function _queryNetworkSiblingSetDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSiblingSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkSiblingSetDeserializer(result.body);
}

/** Get details of the specified network sibling set. */
export async function queryNetworkSiblingSet(
  context: Client,
  location: string,
  body: QueryNetworkSiblingSetRequest,
  options: NetAppResourceQueryNetworkSiblingSetOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkSiblingSet> {
  const result = await _queryNetworkSiblingSetSend(context, location, body, options);
  return _queryNetworkSiblingSetDeserialize(result);
}

export function _queryRegionInfoSend(
  context: Client,
  location: string,
  options: NetAppResourceQueryRegionInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/regionInfo{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _queryRegionInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<RegionInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return regionInfoDeserializer(result.body);
}

/** Provides storage to network proximity and logical zone mapping information. */
export async function queryRegionInfo(
  context: Client,
  location: string,
  options: NetAppResourceQueryRegionInfoOptionalParams = { requestOptions: {} },
): Promise<RegionInfo> {
  const result = await _queryRegionInfoSend(context, location, options);
  return _queryRegionInfoDeserialize(result);
}

export function _checkQuotaAvailabilitySend(
  context: Client,
  location: string,
  body: QuotaAvailabilityRequest,
  options: NetAppResourceCheckQuotaAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/checkQuotaAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: quotaAvailabilityRequestSerializer(body),
  });
}

export async function _checkQuotaAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkAvailabilityResponseDeserializer(result.body);
}

/** Check if a quota is available. */
export async function checkQuotaAvailability(
  context: Client,
  location: string,
  body: QuotaAvailabilityRequest,
  options: NetAppResourceCheckQuotaAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckAvailabilityResponse> {
  const result = await _checkQuotaAvailabilitySend(context, location, body, options);
  return _checkQuotaAvailabilityDeserialize(result);
}

export function _checkFilePathAvailabilitySend(
  context: Client,
  location: string,
  body: FilePathAvailabilityRequest,
  options: NetAppResourceCheckFilePathAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/checkFilePathAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: filePathAvailabilityRequestSerializer(body),
  });
}

export async function _checkFilePathAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkAvailabilityResponseDeserializer(result.body);
}

/** Check if a file path is available. */
export async function checkFilePathAvailability(
  context: Client,
  location: string,
  body: FilePathAvailabilityRequest,
  options: NetAppResourceCheckFilePathAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckAvailabilityResponse> {
  const result = await _checkFilePathAvailabilitySend(context, location, body, options);
  return _checkFilePathAvailabilityDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  location: string,
  body: ResourceNameAvailabilityRequest,
  options: NetAppResourceCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: resourceNameAvailabilityRequestSerializer(body),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkAvailabilityResponseDeserializer(result.body);
}

/** Check if a resource name is available. */
export async function checkNameAvailability(
  context: Client,
  location: string,
  body: ResourceNameAvailabilityRequest,
  options: NetAppResourceCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(context, location, body, options);
  return _checkNameAvailabilityDeserialize(result);
}
