// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  PrivateLinkResource,
  PrivateLinkUpdate,
  _PrivateLinksList,
} from "../../models/privateLinksAPI/models.js";
import {
  privateLinkResourceSerializer,
  privateLinkResourceDeserializer,
  privateLinkUpdateSerializer,
  _privateLinksListDeserializer,
} from "../../models/privateLinksAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinksListBySubscriptionOptionalParams,
  PrivateLinksListOptionalParams,
  PrivateLinksDeleteOptionalParams,
  PrivateLinksUpdateOptionalParams,
  PrivateLinksCreateOptionalParams,
  PrivateLinksHeadOptionalParams,
  PrivateLinksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: PrivateLinksListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/privateLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2026-01-01",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinksList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateLinksListDeserializer(result.body);
}

/** Lists all the private links in the specified subscription. private links enable secure, private connectivity to Microsoft Defender for Cloud services without exposing traffic to the public internet. Use the 'nextLink' property in the response to get the next page of private links for the specified subscription. */
export function listBySubscription(
  context: Client,
  options: PrivateLinksListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-01-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/privateLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2026-01-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PrivateLinksList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateLinksListDeserializer(result.body);
}

/** Lists all the private links in the specified resource group. private links enable secure, private connectivity to Microsoft Defender for Cloud services without exposing traffic to the public internet. Use the 'nextLink' property in the response to get the next page of private links for the specified resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/privateLinks/{privateLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateLinkName: options?.params?.privateLinkName,
      "api%2Dversion": "2026-01-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a private link resource. This operation will remove the private link infrastructure and disconnect all associated private endpoints. This operation is asynchronous and may take several minutes to complete. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  privateLink: PrivateLinkUpdate,
  options: PrivateLinksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/privateLinks/{privateLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateLinkName: options?.params?.privateLinkName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateLinkUpdateSerializer(privateLink),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Update specific properties of a private link resource. Use this operation to update mutable properties like tags without affecting the entire resource configuration. */
export async function update(
  context: Client,
  resourceGroupName: string,
  privateLink: PrivateLinkUpdate,
  options: PrivateLinksUpdateOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _updateSend(context, resourceGroupName, privateLink, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  privateLink: PrivateLinkResource,
  options: PrivateLinksCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/privateLinks/{privateLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateLinkName: options?.params?.privateLinkName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateLinkResourceSerializer(privateLink),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Create a private link resource. This operation creates the necessary infrastructure to enable private endpoint connections to Microsoft Defender for Cloud services. For updates to existing resources, use the PATCH operation. The operation is asynchronous and may take several minutes to complete. */
export function create(
  context: Client,
  resourceGroupName: string,
  privateLink: PrivateLinkResource,
  options: PrivateLinksCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateLinkResource>, PrivateLinkResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, resourceGroupName, privateLink, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2026-01-01",
  }) as PollerLike<OperationState<PrivateLinkResource>, PrivateLinkResource>;
}

export function _headSend(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinksHeadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/privateLinks/{privateLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateLinkName: options?.params?.privateLinkName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _headDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Checks whether private link exists. */
export async function head(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinksHeadOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _headSend(context, resourceGroupName, options);
  return _headDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/privateLinks/{privateLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateLinkName: options?.params?.privateLinkName,
      "api%2Dversion": "2026-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Get a private link resource. Returns the configuration and status of private endpoint connectivity for Microsoft Defender for Cloud services in the specified region. */
export async function get(
  context: Client,
  resourceGroupName: string,
  options: PrivateLinksGetOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _getSend(context, resourceGroupName, options);
  return _getDeserialize(result);
}
