// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  CatalogResourceValidationErrorDetails,
  ImageDefinition,
  _ImageDefinitionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  catalogResourceValidationErrorDetailsDeserializer,
  imageDefinitionDeserializer,
  _imageDefinitionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DevCenterCatalogImageDefinitionsBuildImageOptionalParams,
  DevCenterCatalogImageDefinitionsGetErrorDetailsOptionalParams,
  DevCenterCatalogImageDefinitionsListByDevCenterCatalogOptionalParams,
  DevCenterCatalogImageDefinitionsGetByDevCenterCatalogOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _buildImageSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  options: DevCenterCatalogImageDefinitionsBuildImageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/buildImage{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _buildImageDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Builds an image for the specified Image Definition. */
export function buildImage(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  options: DevCenterCatalogImageDefinitionsBuildImageOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _buildImageDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _buildImageSend(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getErrorDetailsSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  options: DevCenterCatalogImageDefinitionsGetErrorDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/getErrorDetails{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getErrorDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<CatalogResourceValidationErrorDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogResourceValidationErrorDetailsDeserializer(result.body);
}

/** Gets Image Definition error details. */
export async function getErrorDetails(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  options: DevCenterCatalogImageDefinitionsGetErrorDetailsOptionalParams = { requestOptions: {} },
): Promise<CatalogResourceValidationErrorDetails> {
  const result = await _getErrorDetailsSend(
    context,
    resourceGroupName,
    devCenterName,
    catalogName,
    imageDefinitionName,
    options,
  );
  return _getErrorDetailsDeserialize(result);
}

export function _listByDevCenterCatalogSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: DevCenterCatalogImageDefinitionsListByDevCenterCatalogOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
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

export async function _listByDevCenterCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _imageDefinitionListResultDeserializer(result.body);
}

/** List Image Definitions in the catalog. */
export function listByDevCenterCatalog(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: DevCenterCatalogImageDefinitionsListByDevCenterCatalogOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ImageDefinition> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDevCenterCatalogSend(context, resourceGroupName, devCenterName, catalogName, options),
    _listByDevCenterCatalogDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getByDevCenterCatalogSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  options: DevCenterCatalogImageDefinitionsGetByDevCenterCatalogOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}{?api%2Dversion}",
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

export async function _getByDevCenterCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<ImageDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageDefinitionDeserializer(result.body);
}

/** Gets an Image Definition from the catalog */
export async function getByDevCenterCatalog(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  imageDefinitionName: string,
  options: DevCenterCatalogImageDefinitionsGetByDevCenterCatalogOptionalParams = {
    requestOptions: {},
  },
): Promise<ImageDefinition> {
  const result = await _getByDevCenterCatalogSend(
    context,
    resourceGroupName,
    devCenterName,
    catalogName,
    imageDefinitionName,
    options,
  );
  return _getByDevCenterCatalogDeserialize(result);
}
