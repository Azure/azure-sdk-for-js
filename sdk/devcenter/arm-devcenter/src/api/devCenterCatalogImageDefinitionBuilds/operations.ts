// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type { ImageDefinitionBuild, _ImageDefinitionBuildListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _imageDefinitionBuildListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DevCenterCatalogImageDefinitionBuildsListByImageDefinitionOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByImageDefinitionSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  options: DevCenterCatalogImageDefinitionBuildsListByImageDefinitionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      imageDefinitionName: imageDefinitionName,
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

export async function _listByImageDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageDefinitionBuildListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _imageDefinitionBuildListResultDeserializer(result.body);
}

/** Lists builds for a specified image definition. */
export function listByImageDefinition(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  options: DevCenterCatalogImageDefinitionBuildsListByImageDefinitionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ImageDefinitionBuild> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByImageDefinitionSend(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        options,
      ),
    _listByImageDefinitionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}
