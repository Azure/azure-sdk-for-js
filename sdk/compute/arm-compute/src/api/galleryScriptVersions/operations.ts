// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  GalleryScriptVersion,
  GalleryScriptVersionUpdate,
  _GalleryScriptVersionList,
} from "../../models/computeGallery/models.js";
import {
  galleryScriptVersionSerializer,
  galleryScriptVersionDeserializer,
  galleryScriptVersionUpdateSerializer,
  _galleryScriptVersionListDeserializer,
} from "../../models/computeGallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GalleryScriptVersionsListByGalleryScriptOptionalParams,
  GalleryScriptVersionsDeleteOptionalParams,
  GalleryScriptVersionsUpdateOptionalParams,
  GalleryScriptVersionsCreateOrUpdateOptionalParams,
  GalleryScriptVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByGalleryScriptSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  options: GalleryScriptVersionsListByGalleryScriptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryScriptName: galleryScriptName,
      "api%2Dversion": "2025-03-03",
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

export async function _listByGalleryScriptDeserialize(
  result: PathUncheckedResponse,
): Promise<_GalleryScriptVersionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _galleryScriptVersionListDeserializer(result.body);
}

/** List gallery Script Versions in a gallery Script Definition. */
export function listByGalleryScript(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  options: GalleryScriptVersionsListByGalleryScriptOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GalleryScriptVersion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByGalleryScriptSend(context, resourceGroupName, galleryName, galleryScriptName, options),
    _listByGalleryScriptDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-03-03" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  galleryScriptVersionName: string,
  options: GalleryScriptVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}/versions/{galleryScriptVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryScriptName: galleryScriptName,
      galleryScriptVersionName: galleryScriptVersionName,
      "api%2Dversion": "2025-03-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a gallery Script Version. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  galleryScriptVersionName: string,
  options: GalleryScriptVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-03-03",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  galleryScriptVersionName: string,
  galleryScriptVersion: GalleryScriptVersionUpdate,
  options: GalleryScriptVersionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}/versions/{galleryScriptVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryScriptName: galleryScriptName,
      galleryScriptVersionName: galleryScriptVersionName,
      "api%2Dversion": "2025-03-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: galleryScriptVersionUpdateSerializer(galleryScriptVersion),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<GalleryScriptVersion> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return galleryScriptVersionDeserializer(result.body);
}

/** Update a gallery Script Version. */
export function update(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  galleryScriptVersionName: string,
  galleryScriptVersion: GalleryScriptVersionUpdate,
  options: GalleryScriptVersionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GalleryScriptVersion>, GalleryScriptVersion> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        galleryScriptVersion,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-03-03",
  }) as PollerLike<OperationState<GalleryScriptVersion>, GalleryScriptVersion>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  galleryScriptVersionName: string,
  galleryScriptVersion: GalleryScriptVersion,
  options: GalleryScriptVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}/versions/{galleryScriptVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryScriptName: galleryScriptName,
      galleryScriptVersionName: galleryScriptVersionName,
      "api%2Dversion": "2025-03-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: galleryScriptVersionSerializer(galleryScriptVersion),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GalleryScriptVersion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return galleryScriptVersionDeserializer(result.body);
}

/** Create or update a gallery Script Version. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  galleryScriptVersionName: string,
  galleryScriptVersion: GalleryScriptVersion,
  options: GalleryScriptVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GalleryScriptVersion>, GalleryScriptVersion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        galleryName,
        galleryScriptName,
        galleryScriptVersionName,
        galleryScriptVersion,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-03-03",
  }) as PollerLike<OperationState<GalleryScriptVersion>, GalleryScriptVersion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  galleryScriptVersionName: string,
  options: GalleryScriptVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}/versions/{galleryScriptVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      galleryScriptName: galleryScriptName,
      galleryScriptVersionName: galleryScriptVersionName,
      "api%2Dversion": "2025-03-03",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<GalleryScriptVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return galleryScriptVersionDeserializer(result.body);
}

/** Custom ArmResourceRead operation template with CloudError as Error */
export async function get(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  galleryScriptName: string,
  galleryScriptVersionName: string,
  options: GalleryScriptVersionsGetOptionalParams = { requestOptions: {} },
): Promise<GalleryScriptVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    galleryName,
    galleryScriptName,
    galleryScriptVersionName,
    options,
  );
  return _getDeserialize(result);
}
