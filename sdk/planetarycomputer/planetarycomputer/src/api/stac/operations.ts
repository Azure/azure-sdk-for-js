// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProContext as Client } from "../index.js";
import {
  StacAssetData,
  stacAssetDataSerializer,
  StacCollection,
  stacCollectionSerializer,
  stacCollectionDeserializer,
  UserCollectionSettings,
  userCollectionSettingsDeserializer,
  TileSettings,
  tileSettingsSerializer,
  tileSettingsDeserializer,
  stacMosaicArrayDeserializer,
  StacMosaic,
  stacMosaicSerializer,
  stacMosaicDeserializer,
  renderOptionArrayDeserializer,
  RenderOption,
  renderOptionSerializer,
  renderOptionDeserializer,
  StacCatalogCollections,
  stacCatalogCollectionsDeserializer,
  PartitionType,
  partitionTypeSerializer,
  partitionTypeDeserializer,
  StacConformanceClasses,
  stacConformanceClassesDeserializer,
  StacLandingPage,
  stacLandingPageDeserializer,
  stacItemOrStacItemCollectionUnionSerializer,
  StacItemOrStacItemCollectionUnion,
  StacItemCollection,
  stacItemCollectionDeserializer,
  StacItem,
  stacItemSerializer,
  stacItemDeserializer,
  StacQueryable,
  stacQueryableSerializer,
  stacQueryableDeserializer,
  StacSearchParameters,
  stacSearchParametersSerializer,
  stacQueryableArraySerializer,
  stacQueryableArrayDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StacSearchOptionalParams,
  StacGetCollectionQueryablesOptionalParams,
  StacListQueryablesOptionalParams,
  StacDeleteQueryableOptionalParams,
  StacReplaceQueryableOptionalParams,
  StacCreateQueryablesOptionalParams,
  StacUpdateItemOptionalParams,
  StacGetItemCollectionOptionalParams,
  StacGetItemOptionalParams,
  StacDeleteItemOptionalParams,
  StacCreateOrReplaceItemOptionalParams,
  StacCreateItemOptionalParams,
  StacGetLandingPageOptionalParams,
  StacGetConformanceClassOptionalParams,
  StacReplaceTileSettingsOptionalParams,
  StacGetTileSettingsOptionalParams,
  StacGetCollectionThumbnailOptionalParams,
  StacListRenderOptionsOptionalParams,
  StacGetRenderOptionOptionalParams,
  StacDeleteRenderOptionOptionalParams,
  StacReplaceRenderOptionOptionalParams,
  StacCreateRenderOptionOptionalParams,
  StacReplacePartitionTypeOptionalParams,
  StacGetPartitionTypeOptionalParams,
  StacListCollectionsOptionalParams,
  StacGetCollectionOptionalParams,
  StacDeleteCollectionOptionalParams,
  StacCreateOrReplaceCollectionOptionalParams,
  StacCreateCollectionOptionalParams,
  StacListMosaicsOptionalParams,
  StacGetMosaicOptionalParams,
  StacDeleteMosaicOptionalParams,
  StacReplaceMosaicOptionalParams,
  StacAddMosaicOptionalParams,
  StacGetCollectionConfigurationOptionalParams,
  StacDeleteCollectionAssetOptionalParams,
  StacReplaceCollectionAssetOptionalParams,
  StacCreateCollectionAssetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _searchSend(
  context: Client,
  body: StacSearchParameters,
  options: StacSearchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/search{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacSearchParametersSerializer(body),
    });
}

export async function _searchDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemCollectionDeserializer(result.body);
}

/** STAC search operation. */
export async function search(
  context: Client,
  body: StacSearchParameters,
  options: StacSearchOptionalParams = { requestOptions: {} },
): Promise<StacItemCollection> {
  const result = await _searchSend(context, body, options);
  return _searchDeserialize(result);
}

export function _getCollectionQueryablesSend(
  context: Client,
  collectionId: string,
  options: StacGetCollectionQueryablesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/queryables{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getCollectionQueryablesDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, any>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** List all queryables in a given collection */
export async function getCollectionQueryables(
  context: Client,
  collectionId: string,
  options: StacGetCollectionQueryablesOptionalParams = { requestOptions: {} },
): Promise<Record<string, any>> {
  const result = await _getCollectionQueryablesSend(
    context,
    collectionId,
    options,
  );
  return _getCollectionQueryablesDeserialize(result);
}

export function _listQueryablesSend(
  context: Client,
  options: StacListQueryablesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/queryables{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listQueryablesDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, any>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** List all queryables in the GeoCatalog instance */
export async function listQueryables(
  context: Client,
  options: StacListQueryablesOptionalParams = { requestOptions: {} },
): Promise<Record<string, any>> {
  const result = await _listQueryablesSend(context, options);
  return _listQueryablesDeserialize(result);
}

export function _deleteQueryableSend(
  context: Client,
  collectionId: string,
  queryableName: string,
  options: StacDeleteQueryableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/queryables/{queryableName}{?api%2Dversion}",
    {
      collectionId: collectionId,
      queryableName: queryableName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteQueryableDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete queryables by name for specified collection. */
export async function deleteQueryable(
  context: Client,
  collectionId: string,
  queryableName: string,
  options: StacDeleteQueryableOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteQueryableSend(
    context,
    collectionId,
    queryableName,
    options,
  );
  return _deleteQueryableDeserialize(result);
}

export function _replaceQueryableSend(
  context: Client,
  collectionId: string,
  queryableName: string,
  body: StacQueryable,
  options: StacReplaceQueryableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/queryables/{queryableName}{?api%2Dversion}",
    {
      collectionId: collectionId,
      queryableName: queryableName,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacQueryableSerializer(body),
    });
}

export async function _replaceQueryableDeserialize(
  result: PathUncheckedResponse,
): Promise<StacQueryable> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacQueryableDeserializer(result.body);
}

/**
 * Updates a queryable given a queryable definition and
 * corresponding collection id.
 */
export async function replaceQueryable(
  context: Client,
  collectionId: string,
  queryableName: string,
  body: StacQueryable,
  options: StacReplaceQueryableOptionalParams = { requestOptions: {} },
): Promise<StacQueryable> {
  const result = await _replaceQueryableSend(
    context,
    collectionId,
    queryableName,
    body,
    options,
  );
  return _replaceQueryableDeserialize(result);
}

export function _createQueryablesSend(
  context: Client,
  collectionId: string,
  body: StacQueryable[],
  options: StacCreateQueryablesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/queryables{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacQueryableArraySerializer(body),
    });
}

export async function _createQueryablesDeserialize(
  result: PathUncheckedResponse,
): Promise<StacQueryable[]> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacQueryableArrayDeserializer(result.body);
}

/** Set queryables for a collection given a list of queryable definitions */
export async function createQueryables(
  context: Client,
  collectionId: string,
  body: StacQueryable[],
  options: StacCreateQueryablesOptionalParams = { requestOptions: {} },
): Promise<StacQueryable[]> {
  const result = await _createQueryablesSend(
    context,
    collectionId,
    body,
    options,
  );
  return _createQueryablesDeserialize(result);
}

export function _updateItemSend(
  context: Client,
  collectionId: string,
  itemId: string,
  body: StacItem,
  options: StacUpdateItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/items/{itemId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacItemSerializer(body),
    });
}

export async function _updateItemDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Update a STAC item in a collection */
export function updateItem(
  context: Client,
  collectionId: string,
  itemId: string,
  body: StacItem,
  options: StacUpdateItemOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateItemDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateItemSend(context, collectionId, itemId, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getItemCollectionSend(
  context: Client,
  collectionId: string,
  options: StacGetItemCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/items{?api%2Dversion,limit,bbox,datetime}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
      limit: options?.limit,
      bbox: !options?.boundingBox
        ? options?.boundingBox
        : options?.boundingBox.map((p: any) => {
            return p;
          }),
      datetime: options?.datetime,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getItemCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemCollectionDeserializer(result.body);
}

/**
 * Fetch features of the feature collection with id `collectionId`.
 *
 * Every feature in a dataset belongs to a collection. A dataset may
 * consist of multiple feature collections. A feature collection is often a
 * collection of features of a similar type, based on a common schema.
 */
export async function getItemCollection(
  context: Client,
  collectionId: string,
  options: StacGetItemCollectionOptionalParams = { requestOptions: {} },
): Promise<StacItemCollection> {
  const result = await _getItemCollectionSend(context, collectionId, options);
  return _getItemCollectionDeserialize(result);
}

export function _getItemSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: StacGetItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/items/{itemId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getItemDeserialize(
  result: PathUncheckedResponse,
): Promise<StacItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacItemDeserializer(result.body);
}

/** Fetch a single STAC Item */
export async function getItem(
  context: Client,
  collectionId: string,
  itemId: string,
  options: StacGetItemOptionalParams = { requestOptions: {} },
): Promise<StacItem> {
  const result = await _getItemSend(context, collectionId, itemId, options);
  return _getItemDeserialize(result);
}

export function _deleteItemSend(
  context: Client,
  collectionId: string,
  itemId: string,
  options: StacDeleteItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/items/{itemId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteItemDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a STAC item from a collection */
export function deleteItem(
  context: Client,
  collectionId: string,
  itemId: string,
  options: StacDeleteItemOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteItemDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteItemSend(context, collectionId, itemId, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceItemSend(
  context: Client,
  collectionId: string,
  itemId: string,
  body: StacItem,
  options: StacCreateOrReplaceItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/items/{itemId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      itemId: itemId,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacItemSerializer(body),
    });
}

export async function _createOrReplaceItemDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Create or replace a STAC item in a collection */
export function createOrReplaceItem(
  context: Client,
  collectionId: string,
  itemId: string,
  body: StacItem,
  options: StacCreateOrReplaceItemOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _createOrReplaceItemDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrReplaceItemSend(context, collectionId, itemId, body, options),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createItemSend(
  context: Client,
  collectionId: string,
  body: StacItemOrStacItemCollectionUnion,
  options: StacCreateItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/items{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacItemOrStacItemCollectionUnionSerializer(body),
    });
}

export async function _createItemDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Create a new STAC item or a set of items in a collection */
export function createItem(
  context: Client,
  collectionId: string,
  body: StacItemOrStacItemCollectionUnion,
  options: StacCreateItemOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createItemDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createItemSend(context, collectionId, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getLandingPageSend(
  context: Client,
  options: StacGetLandingPageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getLandingPageDeserialize(
  result: PathUncheckedResponse,
): Promise<StacLandingPage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacLandingPageDeserializer(result.body);
}

/** Return the STAC landing page. */
export async function getLandingPage(
  context: Client,
  options: StacGetLandingPageOptionalParams = { requestOptions: {} },
): Promise<StacLandingPage> {
  const result = await _getLandingPageSend(context, options);
  return _getLandingPageDeserialize(result);
}

export function _getConformanceClassSend(
  context: Client,
  options: StacGetConformanceClassOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/conformance{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getConformanceClassDeserialize(
  result: PathUncheckedResponse,
): Promise<StacConformanceClasses> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacConformanceClassesDeserializer(result.body);
}

/** Returns the STAC conformance classes. */
export async function getConformanceClass(
  context: Client,
  options: StacGetConformanceClassOptionalParams = { requestOptions: {} },
): Promise<StacConformanceClasses> {
  const result = await _getConformanceClassSend(context, options);
  return _getConformanceClassDeserialize(result);
}

export function _replaceTileSettingsSend(
  context: Client,
  collectionId: string,
  body: TileSettings,
  options: StacReplaceTileSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/tile-settings{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: tileSettingsSerializer(body),
    });
}

export async function _replaceTileSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<TileSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileSettingsDeserializer(result.body);
}

/** Update the tile settings for a given collection */
export async function replaceTileSettings(
  context: Client,
  collectionId: string,
  body: TileSettings,
  options: StacReplaceTileSettingsOptionalParams = { requestOptions: {} },
): Promise<TileSettings> {
  const result = await _replaceTileSettingsSend(
    context,
    collectionId,
    body,
    options,
  );
  return _replaceTileSettingsDeserialize(result);
}

export function _getTileSettingsSend(
  context: Client,
  collectionId: string,
  options: StacGetTileSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/tile-settings{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getTileSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<TileSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return tileSettingsDeserializer(result.body);
}

/** Get the tile settings for a given collection */
export async function getTileSettings(
  context: Client,
  collectionId: string,
  options: StacGetTileSettingsOptionalParams = { requestOptions: {} },
): Promise<TileSettings> {
  const result = await _getTileSettingsSend(context, collectionId, options);
  return _getTileSettingsDeserialize(result);
}

export function _getCollectionThumbnailSend(
  context: Client,
  collectionId: string,
  options: StacGetCollectionThumbnailOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/thumbnail{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getCollectionThumbnailDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Get thumbnail for given collection. */
export async function getCollectionThumbnail(
  context: Client,
  collectionId: string,
  options: StacGetCollectionThumbnailOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getCollectionThumbnailSend(
    context,
    collectionId,
    options,
  );
  return _getCollectionThumbnailDeserialize(result);
}

export function _listRenderOptionsSend(
  context: Client,
  collectionId: string,
  options: StacListRenderOptionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/render-options{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listRenderOptionsDeserialize(
  result: PathUncheckedResponse,
): Promise<RenderOption[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return renderOptionArrayDeserializer(result.body);
}

/** Get all render options for a given collection */
export async function listRenderOptions(
  context: Client,
  collectionId: string,
  options: StacListRenderOptionsOptionalParams = { requestOptions: {} },
): Promise<RenderOption[]> {
  const result = await _listRenderOptionsSend(context, collectionId, options);
  return _listRenderOptionsDeserialize(result);
}

export function _getRenderOptionSend(
  context: Client,
  collectionId: string,
  renderOptionId: string,
  options: StacGetRenderOptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/render-options/{renderOptionId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      renderOptionId: renderOptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getRenderOptionDeserialize(
  result: PathUncheckedResponse,
): Promise<RenderOption> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return renderOptionDeserializer(result.body);
}

/** Get a render option for a given collection */
export async function getRenderOption(
  context: Client,
  collectionId: string,
  renderOptionId: string,
  options: StacGetRenderOptionOptionalParams = { requestOptions: {} },
): Promise<RenderOption> {
  const result = await _getRenderOptionSend(
    context,
    collectionId,
    renderOptionId,
    options,
  );
  return _getRenderOptionDeserialize(result);
}

export function _deleteRenderOptionSend(
  context: Client,
  collectionId: string,
  renderOptionId: string,
  options: StacDeleteRenderOptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/render-options/{renderOptionId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      renderOptionId: renderOptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteRenderOptionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a render option for a given collection */
export async function deleteRenderOption(
  context: Client,
  collectionId: string,
  renderOptionId: string,
  options: StacDeleteRenderOptionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteRenderOptionSend(
    context,
    collectionId,
    renderOptionId,
    options,
  );
  return _deleteRenderOptionDeserialize(result);
}

export function _replaceRenderOptionSend(
  context: Client,
  collectionId: string,
  renderOptionId: string,
  body: RenderOption,
  options: StacReplaceRenderOptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/render-options/{renderOptionId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      renderOptionId: renderOptionId,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: renderOptionSerializer(body),
    });
}

export async function _replaceRenderOptionDeserialize(
  result: PathUncheckedResponse,
): Promise<RenderOption> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return renderOptionDeserializer(result.body);
}

/** Update a render option for a given collection */
export async function replaceRenderOption(
  context: Client,
  collectionId: string,
  renderOptionId: string,
  body: RenderOption,
  options: StacReplaceRenderOptionOptionalParams = { requestOptions: {} },
): Promise<RenderOption> {
  const result = await _replaceRenderOptionSend(
    context,
    collectionId,
    renderOptionId,
    body,
    options,
  );
  return _replaceRenderOptionDeserialize(result);
}

export function _createRenderOptionSend(
  context: Client,
  collectionId: string,
  body: RenderOption,
  options: StacCreateRenderOptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/render-options{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: renderOptionSerializer(body),
    });
}

export async function _createRenderOptionDeserialize(
  result: PathUncheckedResponse,
): Promise<RenderOption> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return renderOptionDeserializer(result.body);
}

/** Add a render option for a given collection */
export async function createRenderOption(
  context: Client,
  collectionId: string,
  body: RenderOption,
  options: StacCreateRenderOptionOptionalParams = { requestOptions: {} },
): Promise<RenderOption> {
  const result = await _createRenderOptionSend(
    context,
    collectionId,
    body,
    options,
  );
  return _createRenderOptionDeserialize(result);
}

export function _replacePartitionTypeSend(
  context: Client,
  collectionId: string,
  body: PartitionType,
  options: StacReplacePartitionTypeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/partition-type{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
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
      body: partitionTypeSerializer(body),
    });
}

export async function _replacePartitionTypeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/**
 * Updates partition type for a GeoCatalog Collection. This will
 * determine the partitioning scheme for items within the database,
 * and can only be set before any items are loaded.
 *
 * Ideal partitioning schemes result in partitions of roughly 100k items each.
 *
 * The default partitioning scheme is "none" which does not partition items.
 */
export async function replacePartitionType(
  context: Client,
  collectionId: string,
  body: PartitionType,
  options: StacReplacePartitionTypeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _replacePartitionTypeSend(
    context,
    collectionId,
    body,
    options,
  );
  return _replacePartitionTypeDeserialize(result);
}

export function _getPartitionTypeSend(
  context: Client,
  collectionId: string,
  options: StacGetPartitionTypeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/partition-type{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPartitionTypeDeserialize(
  result: PathUncheckedResponse,
): Promise<PartitionType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return partitionTypeDeserializer(result.body);
}

/** Get the partitiontype for a GeoCatalog Collection. */
export async function getPartitionType(
  context: Client,
  collectionId: string,
  options: StacGetPartitionTypeOptionalParams = { requestOptions: {} },
): Promise<PartitionType> {
  const result = await _getPartitionTypeSend(context, collectionId, options);
  return _getPartitionTypeDeserialize(result);
}

export function _listCollectionsSend(
  context: Client,
  options: StacListCollectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections{?api%2Dversion,sign,duration}",
    {
      "api%2Dversion": context.apiVersion,
      sign: options?.sign,
      duration: options?.durationInMinutes,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listCollectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<StacCatalogCollections> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacCatalogCollectionsDeserializer(result.body);
}

/** List all collections in the GeoCatalog instance */
export async function listCollections(
  context: Client,
  options: StacListCollectionsOptionalParams = { requestOptions: {} },
): Promise<StacCatalogCollections> {
  const result = await _listCollectionsSend(context, options);
  return _listCollectionsDeserialize(result);
}

export function _getCollectionSend(
  context: Client,
  collectionId: string,
  options: StacGetCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}{?api%2Dversion,sign,duration}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
      sign: options?.sign,
      duration: options?.durationInMinutes,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<StacCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacCollectionDeserializer(result.body);
}

/** Get a collection in the GeoCatalog instance */
export async function getCollection(
  context: Client,
  collectionId: string,
  options: StacGetCollectionOptionalParams = { requestOptions: {} },
): Promise<StacCollection> {
  const result = await _getCollectionSend(context, collectionId, options);
  return _getCollectionDeserialize(result);
}

export function _deleteCollectionSend(
  context: Client,
  collectionId: string,
  options: StacDeleteCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a collection in the GeoCatalog instance */
export function deleteCollection(
  context: Client,
  collectionId: string,
  options: StacDeleteCollectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteCollectionDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteCollectionSend(context, collectionId, options),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceCollectionSend(
  context: Client,
  collectionId: string,
  body: StacCollection,
  options: StacCreateOrReplaceCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacCollectionSerializer(body),
    });
}

export async function _createOrReplaceCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<StacCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacCollectionDeserializer(result.body);
}

/** Create or replace a collection in the GeoCatalog instance */
export async function createOrReplaceCollection(
  context: Client,
  collectionId: string,
  body: StacCollection,
  options: StacCreateOrReplaceCollectionOptionalParams = { requestOptions: {} },
): Promise<StacCollection> {
  const result = await _createOrReplaceCollectionSend(
    context,
    collectionId,
    body,
    options,
  );
  return _createOrReplaceCollectionDeserialize(result);
}

export function _createCollectionSend(
  context: Client,
  body: StacCollection,
  options: StacCreateCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacCollectionSerializer(body),
    });
}

export async function _createCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Create a new collection in the GeoCatalog instance */
export function createCollection(
  context: Client,
  body: StacCollection,
  options: StacCreateCollectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _createCollectionDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () => _createCollectionSend(context, body, options),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listMosaicsSend(
  context: Client,
  collectionId: string,
  options: StacListMosaicsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/mosaics{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listMosaicsDeserialize(
  result: PathUncheckedResponse,
): Promise<StacMosaic[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacMosaicArrayDeserializer(result.body);
}

/** Get the mosaic definitions for a given collection */
export async function listMosaics(
  context: Client,
  collectionId: string,
  options: StacListMosaicsOptionalParams = { requestOptions: {} },
): Promise<StacMosaic[]> {
  const result = await _listMosaicsSend(context, collectionId, options);
  return _listMosaicsDeserialize(result);
}

export function _getMosaicSend(
  context: Client,
  collectionId: string,
  mosaicId: string,
  options: StacGetMosaicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/mosaics/{mosaicId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      mosaicId: mosaicId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getMosaicDeserialize(
  result: PathUncheckedResponse,
): Promise<StacMosaic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacMosaicDeserializer(result.body);
}

/** Get a mosaic definition from a given collection */
export async function getMosaic(
  context: Client,
  collectionId: string,
  mosaicId: string,
  options: StacGetMosaicOptionalParams = { requestOptions: {} },
): Promise<StacMosaic> {
  const result = await _getMosaicSend(context, collectionId, mosaicId, options);
  return _getMosaicDeserialize(result);
}

export function _deleteMosaicSend(
  context: Client,
  collectionId: string,
  mosaicId: string,
  options: StacDeleteMosaicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/mosaics/{mosaicId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      mosaicId: mosaicId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteMosaicDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a mosaic definition from a given collection */
export async function deleteMosaic(
  context: Client,
  collectionId: string,
  mosaicId: string,
  options: StacDeleteMosaicOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteMosaicSend(
    context,
    collectionId,
    mosaicId,
    options,
  );
  return _deleteMosaicDeserialize(result);
}

export function _replaceMosaicSend(
  context: Client,
  collectionId: string,
  mosaicId: string,
  body: StacMosaic,
  options: StacReplaceMosaicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/mosaics/{mosaicId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      mosaicId: mosaicId,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacMosaicSerializer(body),
    });
}

export async function _replaceMosaicDeserialize(
  result: PathUncheckedResponse,
): Promise<StacMosaic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacMosaicDeserializer(result.body);
}

/** Update a mosaic definition from a given collection */
export async function replaceMosaic(
  context: Client,
  collectionId: string,
  mosaicId: string,
  body: StacMosaic,
  options: StacReplaceMosaicOptionalParams = { requestOptions: {} },
): Promise<StacMosaic> {
  const result = await _replaceMosaicSend(
    context,
    collectionId,
    mosaicId,
    body,
    options,
  );
  return _replaceMosaicDeserialize(result);
}

export function _addMosaicSend(
  context: Client,
  collectionId: string,
  body: StacMosaic,
  options: StacAddMosaicOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations/mosaics{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacMosaicSerializer(body),
    });
}

export async function _addMosaicDeserialize(
  result: PathUncheckedResponse,
): Promise<StacMosaic> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacMosaicDeserializer(result.body);
}

/** Add a mosaic definition to a given collection */
export async function addMosaic(
  context: Client,
  collectionId: string,
  body: StacMosaic,
  options: StacAddMosaicOptionalParams = { requestOptions: {} },
): Promise<StacMosaic> {
  const result = await _addMosaicSend(context, collectionId, body, options);
  return _addMosaicDeserialize(result);
}

export function _getCollectionConfigurationSend(
  context: Client,
  collectionId: string,
  options: StacGetCollectionConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/configurations{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getCollectionConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<UserCollectionSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return userCollectionSettingsDeserializer(result.body);
}

/** Get the complete user configuration for a given collection */
export async function getCollectionConfiguration(
  context: Client,
  collectionId: string,
  options: StacGetCollectionConfigurationOptionalParams = {
    requestOptions: {},
  },
): Promise<UserCollectionSettings> {
  const result = await _getCollectionConfigurationSend(
    context,
    collectionId,
    options,
  );
  return _getCollectionConfigurationDeserialize(result);
}

export function _deleteCollectionAssetSend(
  context: Client,
  collectionId: string,
  assetId: string,
  options: StacDeleteCollectionAssetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/assets/{assetId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      assetId: assetId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteCollectionAssetDeserialize(
  result: PathUncheckedResponse,
): Promise<StacCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacCollectionDeserializer(result.body);
}

/** Delete an asset from a given collection. */
export async function deleteCollectionAsset(
  context: Client,
  collectionId: string,
  assetId: string,
  options: StacDeleteCollectionAssetOptionalParams = { requestOptions: {} },
): Promise<StacCollection> {
  const result = await _deleteCollectionAssetSend(
    context,
    collectionId,
    assetId,
    options,
  );
  return _deleteCollectionAssetDeserialize(result);
}

export function _replaceCollectionAssetSend(
  context: Client,
  collectionId: string,
  assetId: string,
  body: StacAssetData,
  options: StacReplaceCollectionAssetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/assets/{assetId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      assetId: assetId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "multipart/form-data",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacAssetDataSerializer(body),
    });
}

export async function _replaceCollectionAssetDeserialize(
  result: PathUncheckedResponse,
): Promise<StacCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacCollectionDeserializer(result.body);
}

/** Update an existing asset in a given collection. */
export async function replaceCollectionAsset(
  context: Client,
  collectionId: string,
  assetId: string,
  body: StacAssetData,
  options: StacReplaceCollectionAssetOptionalParams = { requestOptions: {} },
): Promise<StacCollection> {
  const result = await _replaceCollectionAssetSend(
    context,
    collectionId,
    assetId,
    body,
    options,
  );
  return _replaceCollectionAssetDeserialize(result);
}

export function _createCollectionAssetSend(
  context: Client,
  collectionId: string,
  body: StacAssetData,
  options: StacCreateCollectionAssetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/stac/collections/{collectionId}/assets{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "multipart/form-data",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: stacAssetDataSerializer(body),
    });
}

export async function _createCollectionAssetDeserialize(
  result: PathUncheckedResponse,
): Promise<StacCollection> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return stacCollectionDeserializer(result.body);
}

/**
 * Create a new asset in the Collection metadata and write the associated
 * file to managed storage.
 */
export async function createCollectionAsset(
  context: Client,
  collectionId: string,
  body: StacAssetData,
  options: StacCreateCollectionAssetOptionalParams = { requestOptions: {} },
): Promise<StacCollection> {
  const result = await _createCollectionAssetSend(
    context,
    collectionId,
    body,
    options,
  );
  return _createCollectionAssetDeserialize(result);
}
