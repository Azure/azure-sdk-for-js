// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type { ImageVersion, _ImageVersionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  imageVersionDeserializer,
  _imageVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ImageVersionsListByProjectOptionalParams,
  ImageVersionsGetByProjectOptionalParams,
  ImageVersionsListByImageOptionalParams,
  ImageVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByProjectSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  imageName: string,
  options: ImageVersionsListByProjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/images/{imageName}/versions{?api%2Dversion}",
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

export async function _listByProjectDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _imageVersionListResultDeserializer(result.body);
}

/** Lists versions for an image. */
export function listByProject(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  imageName: string,
  options: ImageVersionsListByProjectOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ImageVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProjectSend(context, resourceGroupName, projectName, imageName, options),
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
  versionName: string,
  options: ImageVersionsGetByProjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/images/{imageName}/versions/{versionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      imageName: imageName,
      versionName: versionName,
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

export async function _getByProjectDeserialize(
  result: PathUncheckedResponse,
): Promise<ImageVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageVersionDeserializer(result.body);
}

/** Gets an image version. */
export async function getByProject(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  imageName: string,
  versionName: string,
  options: ImageVersionsGetByProjectOptionalParams = { requestOptions: {} },
): Promise<ImageVersion> {
  const result = await _getByProjectSend(
    context,
    resourceGroupName,
    projectName,
    imageName,
    versionName,
    options,
  );
  return _getByProjectDeserialize(result);
}

export function _listByImageSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  galleryName: string,
  imageName: string,
  options: ImageVersionsListByImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}/images/{imageName}/versions{?api%2Dversion}",
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

export async function _listByImageDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _imageVersionListResultDeserializer(result.body);
}

/** Lists versions for an image. */
export function listByImage(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  galleryName: string,
  imageName: string,
  options: ImageVersionsListByImageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ImageVersion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByImageSend(context, resourceGroupName, devCenterName, galleryName, imageName, options),
    _listByImageDeserialize,
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
  versionName: string,
  options: ImageVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}/images/{imageName}/versions/{versionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      galleryName: galleryName,
      imageName: imageName,
      versionName: versionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ImageVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageVersionDeserializer(result.body);
}

/** Gets an image version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  galleryName: string,
  imageName: string,
  versionName: string,
  options: ImageVersionsGetOptionalParams = { requestOptions: {} },
): Promise<ImageVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    devCenterName,
    galleryName,
    imageName,
    versionName,
    options,
  );
  return _getDeserialize(result);
}
