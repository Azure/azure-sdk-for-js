// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext as Client } from "../index.js";
import type {
  GetTenantPolicyResponse,
  PutTenantPolicyRequestProperties,
  _GetTenantPolicyListResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  getTenantPolicyResponseDeserializer,
  putTenantPolicyRequestPropertiesSerializer,
  _getTenantPolicyListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubscriptionPolicyListPolicyForTenantOptionalParams,
  SubscriptionPolicyAddUpdatePolicyForTenantOptionalParams,
  SubscriptionPolicyGetPolicyForTenantOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listPolicyForTenantSend(
  context: Client,
  options: SubscriptionPolicyListPolicyForTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/policies{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _listPolicyForTenantDeserialize(
  result: PathUncheckedResponse,
): Promise<_GetTenantPolicyListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _getTenantPolicyListResponseDeserializer(result.body);
}

/** Get the subscription tenant policy for the user's tenant. */
export function listPolicyForTenant(
  context: Client,
  options: SubscriptionPolicyListPolicyForTenantOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GetTenantPolicyResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listPolicyForTenantSend(context, options),
    _listPolicyForTenantDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _addUpdatePolicyForTenantSend(
  context: Client,
  body: PutTenantPolicyRequestProperties,
  options: SubscriptionPolicyAddUpdatePolicyForTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/policies/default{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: putTenantPolicyRequestPropertiesSerializer(body),
  });
}

export async function _addUpdatePolicyForTenantDeserialize(
  result: PathUncheckedResponse,
): Promise<GetTenantPolicyResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return getTenantPolicyResponseDeserializer(result.body);
}

/** Create or Update Subscription tenant policy for user's tenant. */
export async function addUpdatePolicyForTenant(
  context: Client,
  body: PutTenantPolicyRequestProperties,
  options: SubscriptionPolicyAddUpdatePolicyForTenantOptionalParams = { requestOptions: {} },
): Promise<GetTenantPolicyResponse> {
  const result = await _addUpdatePolicyForTenantSend(context, body, options);
  return _addUpdatePolicyForTenantDeserialize(result);
}

export function _getPolicyForTenantSend(
  context: Client,
  options: SubscriptionPolicyGetPolicyForTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/policies/default{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _getPolicyForTenantDeserialize(
  result: PathUncheckedResponse,
): Promise<GetTenantPolicyResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return getTenantPolicyResponseDeserializer(result.body);
}

/** Get the subscription tenant policy for the user's tenant. */
export async function getPolicyForTenant(
  context: Client,
  options: SubscriptionPolicyGetPolicyForTenantOptionalParams = { requestOptions: {} },
): Promise<GetTenantPolicyResponse> {
  const result = await _getPolicyForTenantSend(context, options);
  return _getPolicyForTenantDeserialize(result);
}
