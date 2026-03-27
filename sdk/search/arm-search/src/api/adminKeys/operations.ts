// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext as Client } from "../index.js";
import type { AdminKeyResult, AdminKeyKind } from "../../models/models.js";
import { cloudErrorDeserializer, adminKeyResultDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AdminKeysRegenerateOptionalParams, AdminKeysGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _regenerateSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  keyKind: AdminKeyKind,
  options: AdminKeysRegenerateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/regenerateAdminKey/{keyKind}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      keyKind: keyKind,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _regenerateDeserialize(
  result: PathUncheckedResponse,
): Promise<AdminKeyResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return adminKeyResultDeserializer(result.body);
}

/** Regenerates either the primary or secondary admin API key. You can only regenerate one key at a time. */
export async function regenerate(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  keyKind: AdminKeyKind,
  options: AdminKeysRegenerateOptionalParams = { requestOptions: {} },
): Promise<AdminKeyResult> {
  const result = await _regenerateSend(
    context,
    resourceGroupName,
    searchServiceName,
    keyKind,
    options,
  );
  return _regenerateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: AdminKeysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/listAdminKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AdminKeyResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return adminKeyResultDeserializer(result.body);
}

/** Gets the primary and secondary admin API keys for the specified Azure AI Search service. */
export async function get(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: AdminKeysGetOptionalParams = { requestOptions: {} },
): Promise<AdminKeyResult> {
  const result = await _getSend(context, resourceGroupName, searchServiceName, options);
  return _getDeserialize(result);
}
