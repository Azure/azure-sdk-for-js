// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  SharedGalleryImageVersion,
  _SharedGalleryImageVersionList,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  sharedGalleryImageVersionDeserializer,
  _sharedGalleryImageVersionListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SharedGalleryImageVersionsListOptionalParams,
  SharedGalleryImageVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  galleryUniqueName: string,
  galleryImageName: string,
  options: SharedGalleryImageVersionsListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}/versions{?api%2Dversion,sharedTo}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      galleryUniqueName: galleryUniqueName,
      galleryImageName: galleryImageName,
      "api%2Dversion": context.apiVersion,
      sharedTo: options?.sharedTo,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SharedGalleryImageVersionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _sharedGalleryImageVersionListDeserializer(result.body);
}

/** List shared gallery image versions by subscription id or tenant id. */
export function list(
  context: Client,
  location: string,
  galleryUniqueName: string,
  galleryImageName: string,
  options: SharedGalleryImageVersionsListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SharedGalleryImageVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, galleryUniqueName, galleryImageName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  galleryUniqueName: string,
  galleryImageName: string,
  galleryImageVersionName: string,
  options: SharedGalleryImageVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}/versions/{galleryImageVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      galleryUniqueName: galleryUniqueName,
      galleryImageName: galleryImageName,
      galleryImageVersionName: galleryImageVersionName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedGalleryImageVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return sharedGalleryImageVersionDeserializer(result.body);
}

/** Get a shared gallery image version by subscription id or tenant id. */
export async function get(
  context: Client,
  location: string,
  galleryUniqueName: string,
  galleryImageName: string,
  galleryImageVersionName: string,
  options: SharedGalleryImageVersionsGetOptionalParams = { requestOptions: {} },
): Promise<SharedGalleryImageVersion> {
  const result = await _getSend(
    context,
    location,
    galleryUniqueName,
    galleryImageName,
    galleryImageVersionName,
    options,
  );
  return _getDeserialize(result);
}
