// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type { Image, _ImageListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  imageDeserializer,
  _imageListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ImagesListByProjectOptionalParams,
  ImagesGetByProjectOptionalParams,
  ImagesListByDevCenterOptionalParams,
  ImagesListByGalleryOptionalParams,
  ImagesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByProjectSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ImagesListByProjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/images{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _listByProjectDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _imageListResultDeserializer(result.body);
}

/** Lists images for a project. */
export function listByProject(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ImagesListByProjectOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Image> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProjectSend(context, resourceGroupName, projectName, options),
    _listByProjectDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getByProjectSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  imageName: string,
  options: ImagesGetByProjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/images/{imageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      imageName: imageName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getByProjectDeserialize(result: PathUncheckedResponse): Promise<Image> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageDeserializer(result.body);
}

/** Gets an image. */
export async function getByProject(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  imageName: string,
  options: ImagesGetByProjectOptionalParams = { requestOptions: {} },
): Promise<Image> {
  const result = await _getByProjectSend(
    context,
    resourceGroupName,
    projectName,
    imageName,
    options,
  );
  return _getByProjectDeserialize(result);
}

export function _listByDevCenterSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: ImagesListByDevCenterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/images{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24top": options?.top,
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

export async function _listByDevCenterDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _imageListResultDeserializer(result.body);
}

/** Lists images for a devcenter. */
export function listByDevCenter(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: ImagesListByDevCenterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Image> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDevCenterSend(context, resourceGroupName, devCenterName, options),
    _listByDevCenterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _listByGallerySend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  galleryName: string,
  options: ImagesListByGalleryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}/images{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      galleryName: galleryName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24top": options?.top,
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

export async function _listByGalleryDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _imageListResultDeserializer(result.body);
}

/** Lists images for a gallery. */
export function listByGallery(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  galleryName: string,
  options: ImagesListByGalleryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Image> {
  return buildPagedAsyncIterator(
    context,
    () => _listByGallerySend(context, resourceGroupName, devCenterName, galleryName, options),
    _listByGalleryDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  galleryName: string,
  imageName: string,
  options: ImagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}/images/{imageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      galleryName: galleryName,
      imageName: imageName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Image> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageDeserializer(result.body);
}

/** Gets a gallery image. */
export async function get(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  galleryName: string,
  imageName: string,
  options: ImagesGetOptionalParams = { requestOptions: {} },
): Promise<Image> {
  const result = await _getSend(
    context,
    resourceGroupName,
    devCenterName,
    galleryName,
    imageName,
    options,
  );
  return _getDeserialize(result);
}
