// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  ApplicationInsightsComponentFavorite,
  applicationInsightsComponentFavoriteSerializer,
  applicationInsightsComponentFavoriteDeserializer,
  applicationInsightsComponentFavoriteArrayDeserializer,
} from "../../models/favorites/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FavoritesDeleteOptionalParams,
  FavoritesUpdateOptionalParams,
  FavoritesAddOptionalParams,
  FavoritesGetOptionalParams,
  FavoritesListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  favoriteId: string,
  options: FavoritesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/favorites/{favoriteId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      favoriteId: favoriteId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Remove a favorite that is associated to an Application Insights component. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  favoriteId: string,
  options: FavoritesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, favoriteId, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  favoriteId: string,
  favoriteProperties: ApplicationInsightsComponentFavorite,
  options: FavoritesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/favorites/{favoriteId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      favoriteId: favoriteId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: applicationInsightsComponentFavoriteSerializer(favoriteProperties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentFavorite> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentFavoriteDeserializer(result.body);
}

/** Updates a favorite that has already been added to an Application Insights component. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  favoriteId: string,
  favoriteProperties: ApplicationInsightsComponentFavorite,
  options: FavoritesUpdateOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentFavorite> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    resourceName,
    favoriteId,
    favoriteProperties,
    options,
  );
  return _updateDeserialize(result);
}

export function _addSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  favoriteId: string,
  favoriteProperties: ApplicationInsightsComponentFavorite,
  options: FavoritesAddOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/favorites/{favoriteId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      favoriteId: favoriteId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: applicationInsightsComponentFavoriteSerializer(favoriteProperties),
    });
}

export async function _addDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentFavorite> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentFavoriteDeserializer(result.body);
}

/** Adds a new favorites to an Application Insights component. */
export async function add(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  favoriteId: string,
  favoriteProperties: ApplicationInsightsComponentFavorite,
  options: FavoritesAddOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentFavorite> {
  const result = await _addSend(
    context,
    resourceGroupName,
    resourceName,
    favoriteId,
    favoriteProperties,
    options,
  );
  return _addDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  favoriteId: string,
  options: FavoritesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/favorites/{favoriteId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      favoriteId: favoriteId,
      "api%2Dversion": "2015-05-01",
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
): Promise<ApplicationInsightsComponentFavorite> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentFavoriteDeserializer(result.body);
}

/** Get a single favorite by its FavoriteId, defined within an Application Insights component. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  favoriteId: string,
  options: FavoritesGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentFavorite> {
  const result = await _getSend(context, resourceGroupName, resourceName, favoriteId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: FavoritesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/favorites{?api%2Dversion,favoriteType,sourceType,canFetchContent,tags}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
      favoriteType: options?.favoriteType,
      sourceType: options?.sourceType,
      canFetchContent: options?.canFetchContent,
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
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
): Promise<ApplicationInsightsComponentFavorite[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentFavoriteArrayDeserializer(result.body);
}

/** Gets a list of favorites defined within an Application Insights component. */
export async function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: FavoritesListOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentFavorite[]> {
  const result = await _listSend(context, resourceGroupName, resourceName, options);
  return _listDeserialize(result);
}
