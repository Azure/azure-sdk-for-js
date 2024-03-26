// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Image, ImageListResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  AzureSphereContext as Client,
  ImagesCreateOrUpdate200Response,
  ImagesCreateOrUpdate201Response,
  ImagesCreateOrUpdateDefaultResponse,
  ImagesCreateOrUpdateLogicalResponse,
  ImagesDeleteLogicalResponse,
  ImagesDeleteOperation200Response,
  ImagesDeleteOperation202Response,
  ImagesDeleteOperation204Response,
  ImagesDeleteOperationDefaultResponse,
  ImagesGet200Response,
  ImagesGetDefaultResponse,
  ImagesListByCatalog200Response,
  ImagesListByCatalogDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  ImagesGetOptions,
  ImagesListByCatalogOptions,
  ImagesCreateOrUpdateOptions,
  ImagesDeleteOperationOptions,
} from "../../models/options.js";

export function _imagesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  imageName: string,
  options: ImagesGetOptions = { requestOptions: {} },
): StreamableMethod<ImagesGet200Response | ImagesGetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      imageName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _imagesGetDeserialize(
  result: ImagesGet200Response | ImagesGetDefaultResponse,
): Promise<Image> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          image: result.body.properties?.["image"],
          imageId: result.body.properties?.["imageId"],
          imageName: result.body.properties?.["imageName"],
          regionalDataBoundary:
            result.body.properties?.["regionalDataBoundary"],
          uri: result.body.properties?.["uri"],
          description: result.body.properties?.["description"],
          componentId: result.body.properties?.["componentId"],
          imageType: result.body.properties?.["imageType"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a Image */
export async function imagesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  imageName: string,
  options: ImagesGetOptions = { requestOptions: {} },
): Promise<Image> {
  const result = await _imagesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    imageName,
    options,
  );
  return _imagesGetDeserialize(result);
}

export function _imagesListByCatalogSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: ImagesListByCatalogOptions = { requestOptions: {} },
): StreamableMethod<
  ImagesListByCatalog200Response | ImagesListByCatalogDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        $filter: options?.filter,
        $top: options?.top,
        $skip: options?.skip,
        $maxpagesize: options?.maxpagesize,
      },
    });
}

export async function _imagesListByCatalogDeserialize(
  result: ImagesListByCatalog200Response | ImagesListByCatalogDefaultResponse,
): Promise<ImageListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      type: p["type"],
      systemData: !p.systemData
        ? undefined
        : {
            createdBy: p.systemData?.["createdBy"],
            createdByType: p.systemData?.["createdByType"],
            createdAt:
              p.systemData?.["createdAt"] !== undefined
                ? new Date(p.systemData?.["createdAt"])
                : undefined,
            lastModifiedBy: p.systemData?.["lastModifiedBy"],
            lastModifiedByType: p.systemData?.["lastModifiedByType"],
            lastModifiedAt:
              p.systemData?.["lastModifiedAt"] !== undefined
                ? new Date(p.systemData?.["lastModifiedAt"])
                : undefined,
          },
      properties: !p.properties
        ? undefined
        : {
            image: p.properties?.["image"],
            imageId: p.properties?.["imageId"],
            imageName: p.properties?.["imageName"],
            regionalDataBoundary: p.properties?.["regionalDataBoundary"],
            uri: p.properties?.["uri"],
            description: p.properties?.["description"],
            componentId: p.properties?.["componentId"],
            imageType: p.properties?.["imageType"],
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Image resources by Catalog */
export function imagesListByCatalog(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: ImagesListByCatalogOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<Image> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _imagesListByCatalogSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    _imagesListByCatalogDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _imagesCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  imageName: string,
  resource: Image,
  options: ImagesCreateOrUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | ImagesCreateOrUpdate200Response
  | ImagesCreateOrUpdate201Response
  | ImagesCreateOrUpdateDefaultResponse
  | ImagesCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      imageName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? undefined
          : {
              image: resource.properties?.["image"],
              imageId: resource.properties?.["imageId"],
              regionalDataBoundary:
                resource.properties?.["regionalDataBoundary"],
            },
      },
    });
}

export async function _imagesCreateOrUpdateDeserialize(
  result:
    | ImagesCreateOrUpdate200Response
    | ImagesCreateOrUpdate201Response
    | ImagesCreateOrUpdateDefaultResponse
    | ImagesCreateOrUpdateLogicalResponse,
): Promise<Image> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as ImagesCreateOrUpdateLogicalResponse;
  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          image: result.body.properties?.["image"],
          imageId: result.body.properties?.["imageId"],
          imageName: result.body.properties?.["imageName"],
          regionalDataBoundary:
            result.body.properties?.["regionalDataBoundary"],
          uri: result.body.properties?.["uri"],
          description: result.body.properties?.["description"],
          componentId: result.body.properties?.["componentId"],
          imageType: result.body.properties?.["imageType"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a Image */
export function imagesCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  imageName: string,
  resource: Image,
  options: ImagesCreateOrUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<Image>, Image> {
  return getLongRunningPoller(context, _imagesCreateOrUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _imagesCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        imageName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<Image>, Image>;
}

export function _imagesDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  imageName: string,
  options: ImagesDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  | ImagesDeleteOperation200Response
  | ImagesDeleteOperation202Response
  | ImagesDeleteOperation204Response
  | ImagesDeleteOperationDefaultResponse
  | ImagesDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images/{imageName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      imageName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _imagesDeleteOperationDeserialize(
  result:
    | ImagesDeleteOperation200Response
    | ImagesDeleteOperation202Response
    | ImagesDeleteOperation204Response
    | ImagesDeleteOperationDefaultResponse
    | ImagesDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as ImagesDeleteLogicalResponse;
  return;
}

/** Delete a Image */
export function imagesDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  imageName: string,
  options: ImagesDeleteOperationOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _imagesDeleteOperationDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _imagesDeleteOperationSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        imageName,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}
