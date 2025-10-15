// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  GalleryInVMAccessControlProfileVersion,
  GalleryInVMAccessControlProfileVersionUpdate,
  _GalleryInVMAccessControlProfileVersionList,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  galleryInVMAccessControlProfileVersionSerializer,
  galleryInVMAccessControlProfileVersionDeserializer,
  galleryInVMAccessControlProfileVersionUpdateSerializer,
  _galleryInVMAccessControlProfileVersionListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileOptionalParams,
  GalleryInVMAccessControlProfileVersionsDeleteOptionalParams,
  GalleryInVMAccessControlProfileVersionsUpdateOptionalParams,
  GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams,
  GalleryInVMAccessControlProfileVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByGalleryInVMAccessControlProfileSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  options: GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      inVMAccessControlProfileName: inVMAccessControlProfileName,
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

export async function _listByGalleryInVMAccessControlProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_GalleryInVMAccessControlProfileVersionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _galleryInVMAccessControlProfileVersionListDeserializer(result.body);
}

/** List gallery inVMAccessControlProfile versions in a gallery inVMAccessControlProfile */
export function listByGalleryInVMAccessControlProfile(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  options: GalleryInVMAccessControlProfileVersionsListByGalleryInVMAccessControlProfileOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<GalleryInVMAccessControlProfileVersion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByGalleryInVMAccessControlProfileSend(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        options,
      ),
    _listByGalleryInVMAccessControlProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  inVMAccessControlProfileVersionName: string,
  options: GalleryInVMAccessControlProfileVersionsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}/versions/{inVMAccessControlProfileVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      inVMAccessControlProfileName: inVMAccessControlProfileName,
      inVMAccessControlProfileVersionName: inVMAccessControlProfileVersionName,
      "api%2Dversion": context.apiVersion,
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

/** Delete a gallery inVMAccessControlProfile version. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  inVMAccessControlProfileVersionName: string,
  options: GalleryInVMAccessControlProfileVersionsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        galleryName,
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  inVMAccessControlProfileVersionName: string,
  galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersionUpdate,
  options: GalleryInVMAccessControlProfileVersionsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}/versions/{inVMAccessControlProfileVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      inVMAccessControlProfileName: inVMAccessControlProfileName,
      inVMAccessControlProfileVersionName: inVMAccessControlProfileVersionName,
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
    body: galleryInVMAccessControlProfileVersionUpdateSerializer(
      galleryInVMAccessControlProfileVersion,
    ),
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

/** Update a gallery inVMAccessControlProfile version. */
export function update(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  inVMAccessControlProfileVersionName: string,
  galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersionUpdate,
  options: GalleryInVMAccessControlProfileVersionsUpdateOptionalParams = {
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
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        galleryInVMAccessControlProfileVersion,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  inVMAccessControlProfileVersionName: string,
  galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersion,
  options: GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}/versions/{inVMAccessControlProfileVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      inVMAccessControlProfileName: inVMAccessControlProfileName,
      inVMAccessControlProfileVersionName: inVMAccessControlProfileVersionName,
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
    body: galleryInVMAccessControlProfileVersionSerializer(galleryInVMAccessControlProfileVersion),
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

/** Create or update a gallery inVMAccessControlProfile version. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  inVMAccessControlProfileVersionName: string,
  galleryInVMAccessControlProfileVersion: GalleryInVMAccessControlProfileVersion,
  options: GalleryInVMAccessControlProfileVersionsCreateOrUpdateOptionalParams = {
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
        inVMAccessControlProfileName,
        inVMAccessControlProfileVersionName,
        galleryInVMAccessControlProfileVersion,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  inVMAccessControlProfileVersionName: string,
  options: GalleryInVMAccessControlProfileVersionsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}/versions/{inVMAccessControlProfileVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      galleryName: galleryName,
      inVMAccessControlProfileName: inVMAccessControlProfileName,
      inVMAccessControlProfileVersionName: inVMAccessControlProfileVersionName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<GalleryInVMAccessControlProfileVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return galleryInVMAccessControlProfileVersionDeserializer(result.body);
}

/** Retrieves information about a gallery inVMAccessControlProfile version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  galleryName: string,
  inVMAccessControlProfileName: string,
  inVMAccessControlProfileVersionName: string,
  options: GalleryInVMAccessControlProfileVersionsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<GalleryInVMAccessControlProfileVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    galleryName,
    inVMAccessControlProfileName,
    inVMAccessControlProfileVersionName,
    options,
  );
  return _getDeserialize(result);
}
