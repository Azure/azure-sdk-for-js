// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SaaSContext as Client } from "../index.js";
import type {
  AccessTokenResult,
  SaasTenantResource,
  SaasTenantResourceUpdate,
  _SaasTenantResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  accessTokenResultDeserializer,
  saasTenantResourceDeserializer,
  saasTenantResourceUpdateSerializer,
  _saasTenantResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SaasTenantLevelListAccessTokenOptionalParams,
  SaasTenantLevelListOptionalParams,
  SaasTenantLevelDeleteResourceOptionalParams,
  SaasTenantLevelUpdateResourceOptionalParams,
  SaasTenantLevelGetResourceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAccessTokenSend(
  context: Client,
  resourceId: string,
  options: SaasTenantLevelListAccessTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.SaaS/saasresources/{resourceId}/listAccessToken{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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

export async function _listAccessTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessTokenResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return accessTokenResultDeserializer(result.body);
}

/** Generates a publisher access token for a tenant-level SaaS resource. */
export async function listAccessToken(
  context: Client,
  resourceId: string,
  options: SaasTenantLevelListAccessTokenOptionalParams = { requestOptions: {} },
): Promise<AccessTokenResult> {
  const result = await _listAccessTokenSend(context, resourceId, options);
  return _listAccessTokenDeserialize(result);
}

export function _listSend(
  context: Client,
  options: SaasTenantLevelListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.SaaS/saasresources{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SaasTenantResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _saasTenantResourceListResultDeserializer(result.body);
}

/** Lists all tenant-level SaaS resources accessible to the caller. */
export function list(
  context: Client,
  options: SaasTenantLevelListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SaasTenantResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}

export function _deleteResourceSend(
  context: Client,
  resourceId: string,
  options: SaasTenantLevelDeleteResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.SaaS/saasresources/{resourceId}{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteResourceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a tenant-level SaaS resource. */
export function deleteResource(
  context: Client,
  resourceId: string,
  options: SaasTenantLevelDeleteResourceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteResourceDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteResourceSend(context, resourceId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateResourceSend(
  context: Client,
  resourceId: string,
  properties: SaasTenantResourceUpdate,
  options: SaasTenantLevelUpdateResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.SaaS/saasresources/{resourceId}{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: saasTenantResourceUpdateSerializer(properties),
  });
}

export async function _updateResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<SaasTenantResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return saasTenantResourceDeserializer(result.body);
}

/** Updates mutable properties or tags on an existing tenant-level SaaS resource. */
export function updateResource(
  context: Client,
  resourceId: string,
  properties: SaasTenantResourceUpdate,
  options: SaasTenantLevelUpdateResourceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SaasTenantResource>, SaasTenantResource> {
  return getLongRunningPoller(context, _updateResourceDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateResourceSend(context, resourceId, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<SaasTenantResource>, SaasTenantResource>;
}

export function _getResourceSend(
  context: Client,
  resourceId: string,
  options: SaasTenantLevelGetResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.SaaS/saasresources/{resourceId}{?api%2Dversion,%24expandCustomerData}",
    {
      resourceId: resourceId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
      "%24expandCustomerData": options?.expandCustomerData,
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

export async function _getResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<SaasTenantResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return saasTenantResourceDeserializer(result.body);
}

/** Gets a tenant-level SaaS resource by its identifier. */
export async function getResource(
  context: Client,
  resourceId: string,
  options: SaasTenantLevelGetResourceOptionalParams = { requestOptions: {} },
): Promise<SaasTenantResource> {
  const result = await _getResourceSend(context, resourceId, options);
  return _getResourceDeserialize(result);
}
