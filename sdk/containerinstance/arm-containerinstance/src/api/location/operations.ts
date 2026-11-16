// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext as Client } from "../index.js";
import type {
  _UsageListResult,
  Usage,
  _CachedImagesListResult,
  CachedImages,
  _CapabilitiesListResult,
  Capabilities,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _usageListResultDeserializer,
  _cachedImagesListResultDeserializer,
  _capabilitiesListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LocationListCapabilitiesOptionalParams,
  LocationListCachedImagesOptionalParams,
  LocationListUsageOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listCapabilitiesSend(
  context: Client,
  location: string,
  options: LocationListCapabilitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/locations/{location}/capabilities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _listCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CapabilitiesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _capabilitiesListResultDeserializer(result.body);
}

/** Get the list of CPU/memory/GPU capabilities of a region. */
export function listCapabilities(
  context: Client,
  location: string,
  options: LocationListCapabilitiesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Capabilities> {
  return buildPagedAsyncIterator(
    context,
    () => _listCapabilitiesSend(context, location, options),
    _listCapabilitiesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _listCachedImagesSend(
  context: Client,
  location: string,
  options: LocationListCachedImagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/locations/{location}/cachedImages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _listCachedImagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CachedImagesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _cachedImagesListResultDeserializer(result.body);
}

/** Get the list of cached images on specific OS type for a subscription in a region. */
export function listCachedImages(
  context: Client,
  location: string,
  options: LocationListCachedImagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CachedImages> {
  return buildPagedAsyncIterator(
    context,
    () => _listCachedImagesSend(context, location, options),
    _listCachedImagesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _listUsageSend(
  context: Client,
  location: string,
  options: LocationListUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/locations/{location}/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _listUsageDeserialize(
  result: PathUncheckedResponse,
): Promise<_UsageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _usageListResultDeserializer(result.body);
}

/** Get the usage for a subscription */
export function listUsage(
  context: Client,
  location: string,
  options: LocationListUsageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Usage> {
  return buildPagedAsyncIterator(
    context,
    () => _listUsageSend(context, location, options),
    _listUsageDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}
