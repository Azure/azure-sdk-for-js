// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import type {
  CommunityGalleryImageVersion,
  _CommunityGalleryImageVersionList,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  communityGalleryImageVersionDeserializer,
  _communityGalleryImageVersionListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CommunityGalleryImageVersionsListOptionalParams,
  CommunityGalleryImageVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  publicGalleryName: string,
  galleryImageName: string,
  options: CommunityGalleryImageVersionsListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publicGalleryName: publicGalleryName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_CommunityGalleryImageVersionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _communityGalleryImageVersionListDeserializer(result.body);
}

/** List community gallery image versions inside an image. */
export function list(
  context: Client,
  location: string,
  publicGalleryName: string,
  galleryImageName: string,
  options: CommunityGalleryImageVersionsListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CommunityGalleryImageVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, publicGalleryName, galleryImageName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  publicGalleryName: string,
  galleryImageName: string,
  galleryImageVersionName: string,
  options: CommunityGalleryImageVersionsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/communityGalleries/{publicGalleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      publicGalleryName: publicGalleryName,
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
): Promise<CommunityGalleryImageVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return communityGalleryImageVersionDeserializer(result.body);
}

/** Get a community gallery image version. */
export async function get(
  context: Client,
  location: string,
  publicGalleryName: string,
  galleryImageName: string,
  galleryImageVersionName: string,
  options: CommunityGalleryImageVersionsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<CommunityGalleryImageVersion> {
  const result = await _getSend(
    context,
    location,
    publicGalleryName,
    galleryImageName,
    galleryImageVersionName,
    options,
  );
  return _getDeserialize(result);
}
