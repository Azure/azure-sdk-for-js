// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DevOpsInfrastructureContext as Client,
  ImageVersionsListByImageOptionalParams,
} from "../index.js";
import type {
  _ImageVersionListResult,
  ImageVersion} from "../../models/models.js";
import {
  _imageVersionListResultDeserializer
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _imageVersionsListByImageSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  imageName: string,
  options: ImageVersionsListByImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/images/{imageName}/versions",
      subscriptionId,
      resourceGroupName,
      imageName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _imageVersionsListByImageDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _imageVersionListResultDeserializer(result.body);
}

/** List ImageVersion resources by Image */
export function imageVersionsListByImage(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  imageName: string,
  options: ImageVersionsListByImageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ImageVersion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _imageVersionsListByImageSend(context, subscriptionId, resourceGroupName, imageName, options),
    _imageVersionsListByImageDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
