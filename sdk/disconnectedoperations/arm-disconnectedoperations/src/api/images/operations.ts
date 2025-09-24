// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DisconnectedOperationsManagementContext as Client } from "../index.js";
import type { _ImageListResult, Image, ImageDownloadResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _imageListResultDeserializer,
  imageDeserializer,
  imageDownloadResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ImagesListDownloadUriOptionalParams,
  ImagesGetOptionalParams,
  ImagesListByDisconnectedOperationOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listDownloadUriSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  options: ImagesListDownloadUriOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}/listDownloadUri{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      imageName: imageName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDownloadUriDeserialize(
  result: PathUncheckedResponse,
): Promise<ImageDownloadResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return imageDownloadResultDeserializer(result.body);
}

/** Get the URI to download the image. */
export async function listDownloadUri(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  options: ImagesListDownloadUriOptionalParams = { requestOptions: {} },
): Promise<ImageDownloadResult> {
  const result = await _listDownloadUriSend(context, resourceGroupName, name, imageName, options);
  return _listDownloadUriDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  options: ImagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      imageName: imageName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Image> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return imageDeserializer(result.body);
}

/** Get the resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  imageName: string,
  options: ImagesGetOptionalParams = { requestOptions: {} },
): Promise<Image> {
  const result = await _getSend(context, resourceGroupName, name, imageName, options);
  return _getDeserialize(result);
}

export function _listByDisconnectedOperationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ImagesListByDisconnectedOperationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByDisconnectedOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _imageListResultDeserializer(result.body);
}

/** List by disconnected operation. */
export function listByDisconnectedOperation(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ImagesListByDisconnectedOperationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Image> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDisconnectedOperationSend(context, resourceGroupName, name, options),
    _listByDisconnectedOperationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
