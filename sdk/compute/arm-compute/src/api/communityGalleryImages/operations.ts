// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import {
  CommunityGalleryImage,
  communityGalleryImageDeserializer,
  _CommunityGalleryImageList,
  _communityGalleryImageListDeserializer,
} from "../../models/computeGallery/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CommunityGalleryImagesListOptionalParams,
  CommunityGalleryImagesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  publicGalleryName: string,
  options: CommunityGalleryImagesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publicGalleryName: publicGalleryName,
      "api%2Dversion": "2025-12-03",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_CommunityGalleryImageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _communityGalleryImageListDeserializer(result.body);
}

/** List community gallery images inside a gallery. */
export function list(
  context: Client,
  location: string,
  publicGalleryName: string,
  options: CommunityGalleryImagesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommunityGalleryImage> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, publicGalleryName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-12-03" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  publicGalleryName: string,
  galleryImageName: string,
  options: CommunityGalleryImagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publicGalleryName: publicGalleryName,
      galleryImageName: galleryImageName,
      "api%2Dversion": "2025-12-03",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunityGalleryImage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return communityGalleryImageDeserializer(result.body);
}

/** Get a community gallery image. */
export async function get(
  context: Client,
  location: string,
  publicGalleryName: string,
  galleryImageName: string,
  options: CommunityGalleryImagesGetOptionalParams = { requestOptions: {} },
): Promise<CommunityGalleryImage> {
  const result = await _getSend(context, location, publicGalleryName, galleryImageName, options);
  return _getDeserialize(result);
}
