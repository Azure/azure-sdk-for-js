// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import type { SharedGalleryImage, _SharedGalleryImageList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  sharedGalleryImageDeserializer,
  _sharedGalleryImageListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SharedGalleryImagesListOptionalParams,
  SharedGalleryImagesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  galleryUniqueName: string,
  options: SharedGalleryImagesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images{?api%2Dversion,sharedTo}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      galleryUniqueName: galleryUniqueName,
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
): Promise<_SharedGalleryImageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _sharedGalleryImageListDeserializer(result.body);
}

/** List shared gallery images by subscription id or tenant id. */
export function list(
  context: Client,
  location: string,
  galleryUniqueName: string,
  options: SharedGalleryImagesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SharedGalleryImage> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, galleryUniqueName, options),
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
  options: SharedGalleryImagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/sharedGalleries/{galleryUniqueName}/images/{galleryImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      galleryUniqueName: galleryUniqueName,
      galleryImageName: galleryImageName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SharedGalleryImage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return sharedGalleryImageDeserializer(result.body);
}

/** Get a shared gallery image by subscription id or tenant id. */
export async function get(
  context: Client,
  location: string,
  galleryUniqueName: string,
  galleryImageName: string,
  options: SharedGalleryImagesGetOptionalParams = { requestOptions: {} },
): Promise<SharedGalleryImage> {
  const result = await _getSend(context, location, galleryUniqueName, galleryImageName, options);
  return _getDeserialize(result);
}
