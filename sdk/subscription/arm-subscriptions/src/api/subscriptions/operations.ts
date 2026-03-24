// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext as Client } from "../index.js";
import type {
  TargetDirectoryResult,
  TargetDirectoryResultProperties,
  TargetDirectoryRequest,
  _TargetDirectoryListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  targetDirectoryResultDeserializer,
  targetDirectoryResultPropertiesDeserializer,
  targetDirectoryRequestSerializer,
  _targetDirectoryListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubscriptionsTargetDirectoryStatusOptionalParams,
  SubscriptionsAcceptTargetDirectoryOptionalParams,
  SubscriptionsListTargetDirectoryOptionalParams,
  SubscriptionsDeleteTargetDirectoryOptionalParams,
  SubscriptionsPutTargetDirectoryOptionalParams,
  SubscriptionsGetTargetDirectoryOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _targetDirectoryStatusSend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsTargetDirectoryStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/subscriptions/{subscriptionId}/changeTenantStatus{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _targetDirectoryStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<TargetDirectoryResultProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return targetDirectoryResultPropertiesDeserializer(result.body);
}

/** The operation for Acceptor to view the accepted request */
export async function targetDirectoryStatus(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsTargetDirectoryStatusOptionalParams = { requestOptions: {} },
): Promise<TargetDirectoryResultProperties> {
  const result = await _targetDirectoryStatusSend(context, subscriptionId, options);
  return _targetDirectoryStatusDeserialize(result);
}

export function _acceptTargetDirectorySend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsAcceptTargetDirectoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/subscriptions/{subscriptionId}/acceptChangeTenant{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _acceptTargetDirectoryDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** The operation to accept Subscription Changed Request */
export async function acceptTargetDirectory(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsAcceptTargetDirectoryOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _acceptTargetDirectorySend(context, subscriptionId, options);
  return _acceptTargetDirectoryDeserialize(result);
}

export function _listTargetDirectorySend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsListTargetDirectoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/changeTenantRequest{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
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

export async function _listTargetDirectoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_TargetDirectoryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _targetDirectoryListResultDeserializer(result.body);
}

/** The operation to list Initiator Subscription Changed Request */
export function listTargetDirectory(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsListTargetDirectoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TargetDirectoryResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listTargetDirectorySend(context, subscriptionId, options),
    _listTargetDirectoryDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _deleteTargetDirectorySend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsDeleteTargetDirectoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/changeTenantRequest/default{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteTargetDirectoryDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** The operation to delete Initiator Subscription Changed Request */
export async function deleteTargetDirectory(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsDeleteTargetDirectoryOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTargetDirectorySend(context, subscriptionId, options);
  return _deleteTargetDirectoryDeserialize(result);
}

export function _putTargetDirectorySend(
  context: Client,
  subscriptionId: string,
  body: TargetDirectoryRequest,
  options: SubscriptionsPutTargetDirectoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/changeTenantRequest/default{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
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
    body: targetDirectoryRequestSerializer(body),
  });
}

export async function _putTargetDirectoryDeserialize(
  result: PathUncheckedResponse,
): Promise<TargetDirectoryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return targetDirectoryResultDeserializer(result.body);
}

/** The operation to initiate Subscription Changed Request */
export async function putTargetDirectory(
  context: Client,
  subscriptionId: string,
  body: TargetDirectoryRequest,
  options: SubscriptionsPutTargetDirectoryOptionalParams = { requestOptions: {} },
): Promise<TargetDirectoryResult> {
  const result = await _putTargetDirectorySend(context, subscriptionId, body, options);
  return _putTargetDirectoryDeserialize(result);
}

export function _getTargetDirectorySend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsGetTargetDirectoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/changeTenantRequest/default{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
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

export async function _getTargetDirectoryDeserialize(
  result: PathUncheckedResponse,
): Promise<TargetDirectoryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return targetDirectoryResultDeserializer(result.body);
}

/** The operation to view Initiator Subscription Changed Request */
export async function getTargetDirectory(
  context: Client,
  subscriptionId: string,
  options: SubscriptionsGetTargetDirectoryOptionalParams = { requestOptions: {} },
): Promise<TargetDirectoryResult> {
  const result = await _getTargetDirectorySend(context, subscriptionId, options);
  return _getTargetDirectoryDeserialize(result);
}
