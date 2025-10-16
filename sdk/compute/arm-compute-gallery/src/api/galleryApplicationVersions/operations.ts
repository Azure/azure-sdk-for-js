// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import type {
  GalleryApplicationVersion,
  GalleryApplicationVersionUpdate,
  _GalleryApplicationVersionList,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  galleryApplicationVersionSerializer,
  galleryApplicationVersionDeserializer,
  galleryApplicationVersionUpdateSerializer,
  _galleryApplicationVersionListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GalleryApplicationVersionsListByGalleryApplicationOptionalParams,
  GalleryApplicationVersionsDeleteOptionalParams,
  GalleryApplicationVersionsUpdateOptionalParams,
  GalleryApplicationVersionsCreateOrUpdateOptionalParams,
  GalleryApplicationVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByGalleryApplicationSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  options: GalleryApplicationVersionsListByGalleryApplicationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryApplicationName: galleryApplicationName,
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

export async function _listByGalleryApplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<_GalleryApplicationVersionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _galleryApplicationVersionListDeserializer(result.body);
}

/** List gallery Application Versions in a gallery Application Definition. */
export function listByGalleryApplication(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  options: GalleryApplicationVersionsListByGalleryApplicationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<GalleryApplicationVersion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByGalleryApplicationSend(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        options,
      ),
    _listByGalleryApplicationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  galleryApplicationVersionName: string,
  options: GalleryApplicationVersionsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryApplicationName: galleryApplicationName,
      galleryApplicationVersionName: galleryApplicationVersionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a gallery Application Version. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  galleryApplicationVersionName: string,
  options: GalleryApplicationVersionsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplicationVersionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  galleryApplicationVersionName: string,
  galleryApplicationVersion: GalleryApplicationVersionUpdate,
  options: GalleryApplicationVersionsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryApplicationName: galleryApplicationName,
      galleryApplicationVersionName: galleryApplicationVersionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: galleryApplicationVersionUpdateSerializer(galleryApplicationVersion),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Update a gallery Application Version. */
export function update(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  galleryApplicationVersionName: string,
  galleryApplicationVersion: GalleryApplicationVersionUpdate,
  options: GalleryApplicationVersionsUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplicationVersionName,
        galleryApplicationVersion,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  galleryApplicationVersionName: string,
  galleryApplicationVersion: GalleryApplicationVersion,
  options: GalleryApplicationVersionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryApplicationName: galleryApplicationName,
      galleryApplicationVersionName: galleryApplicationVersionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: galleryApplicationVersionSerializer(galleryApplicationVersion),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Create or update a gallery Application Version. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  galleryApplicationVersionName: string,
  galleryApplicationVersion: GalleryApplicationVersion,
  options: GalleryApplicationVersionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        galleryName,
        galleryApplicationName,
        galleryApplicationVersionName,
        galleryApplicationVersion,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  galleryApplicationVersionName: string,
  options: GalleryApplicationVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryApplicationName: galleryApplicationName,
      galleryApplicationVersionName: galleryApplicationVersionName,
      "api%2Dversion": context.apiVersion,
      "%24expand": options?.expand,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<GalleryApplicationVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return galleryApplicationVersionDeserializer(result.body);
}

/** Retrieves information about a gallery Application Version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryApplicationName: string,
  galleryApplicationVersionName: string,
  options: GalleryApplicationVersionsGetOptionalParams = { requestOptions: {} },
): Promise<GalleryApplicationVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    galleryName,
    galleryApplicationName,
    galleryApplicationVersionName,
    options,
  );
  return _getDeserialize(result);
}
