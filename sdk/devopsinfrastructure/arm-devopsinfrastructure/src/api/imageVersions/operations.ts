// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevOpsInfrastructureContext as Client } from "../index.js";
import type { _ImageVersionListResult, ImageVersion } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _imageVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ImageVersionsListByImageOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByImageSend(
  context: Client,
  resourceGroupName: string,
  imageName: string,
  options: ImageVersionsListByImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/images/{imageName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      imageName: imageName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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
/** List ImageVersion resources by Image */
export function listByImage(
  context: Client,
  resourceGroupName: string,
  imageName: string,
  options: ImageVersionsListByImageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ImageVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByImageSend(context, resourceGroupName, imageName, options),
    _listByImageDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-03-preview",
    },
  );
}
