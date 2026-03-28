// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext as Client } from "../index.js";
import type {
  SubscriptionAliasResponse,
  PutAliasRequest,
  _SubscriptionAliasListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  subscriptionAliasResponseDeserializer,
  putAliasRequestSerializer,
  _subscriptionAliasListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AliasListOptionalParams,
  AliasDeleteOptionalParams,
  AliasCreateOptionalParams,
  AliasGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  options: AliasListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/aliases{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SubscriptionAliasListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _subscriptionAliasListResultDeserializer(result.body);
}

/** List Alias Subscription. */
export function list(
  context: Client,
  options: AliasListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SubscriptionAliasResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  aliasName: string,
  options: AliasDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/aliases/{aliasName}{?api%2Dversion}",
    {
      aliasName: aliasName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete Alias. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  aliasName: string,
  options: AliasDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, aliasName, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  aliasName: string,
  body: PutAliasRequest,
  options: AliasCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/aliases/{aliasName}{?api%2Dversion}",
    {
      aliasName: aliasName,
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
    body: putAliasRequestSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionAliasResponse> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionAliasResponseDeserializer(result.body);
}

/** Create Alias Subscription. */
export function create(
  context: Client,
  aliasName: string,
  body: PutAliasRequest,
  options: AliasCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SubscriptionAliasResponse>, SubscriptionAliasResponse> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, aliasName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<SubscriptionAliasResponse>, SubscriptionAliasResponse>;
}

export function _getSend(
  context: Client,
  aliasName: string,
  options: AliasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/aliases/{aliasName}{?api%2Dversion}",
    {
      aliasName: aliasName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionAliasResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionAliasResponseDeserializer(result.body);
}

/** Get Alias Subscription. */
export async function get(
  context: Client,
  aliasName: string,
  options: AliasGetOptionalParams = { requestOptions: {} },
): Promise<SubscriptionAliasResponse> {
  const result = await _getSend(context, aliasName, options);
  return _getDeserialize(result);
}
