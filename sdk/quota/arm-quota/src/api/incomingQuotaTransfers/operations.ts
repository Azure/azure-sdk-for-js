// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import type {
  IncomingQuotaTransfer,
  _IncomingQuotaTransferListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  incomingQuotaTransferDeserializer,
  _incomingQuotaTransferListResultDeserializer,
  incomingQuotaTransferApproveRequestSerializer,
  incomingQuotaTransferRejectRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IncomingQuotaTransfersRejectOptionalParams,
  IncomingQuotaTransfersApproveOptionalParams,
  IncomingQuotaTransfersListBySubscriptionOptionalParams,
  IncomingQuotaTransfersListOptionalParams,
  IncomingQuotaTransfersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _rejectSend(
  context: Client,
  targetProvider: string,
  region: string,
  transferId: string,
  ifMatch: string,
  options: IncomingQuotaTransfersRejectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{targetProvider}/locations/{region}/providers/Microsoft.Quota/incomingQuotaTransfers/{transferId}/reject{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      targetProvider: targetProvider,
      region: region,
      transferId: transferId,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      ...(options?.repeatabilityRequestId !== undefined
        ? { "repeatability-request-id": options?.repeatabilityRequestId }
        : {}),
      ...(options?.repeatabilityFirstSent !== undefined
        ? {
            "repeatability-first-sent": !options?.repeatabilityFirstSent
              ? options?.repeatabilityFirstSent
              : options?.repeatabilityFirstSent.toUTCString(),
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options?.body
      ? options?.body
      : incomingQuotaTransferRejectRequestSerializer(options?.body),
  });
}

export async function _rejectDeserialize(
  result: PathUncheckedResponse,
): Promise<IncomingQuotaTransfer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return incomingQuotaTransferDeserializer(result.body);
}

/**
 * Reject a Pending incoming quota transfer. Synchronous. The `If-Match` header value
 * must equal `properties.sourceEtag` returned on a prior GET.
 */
export async function reject(
  context: Client,
  targetProvider: string,
  region: string,
  transferId: string,
  ifMatch: string,
  options: IncomingQuotaTransfersRejectOptionalParams = { requestOptions: {} },
): Promise<IncomingQuotaTransfer> {
  const result = await _rejectSend(context, targetProvider, region, transferId, ifMatch, options);
  return _rejectDeserialize(result);
}

export function _approveSend(
  context: Client,
  targetProvider: string,
  region: string,
  transferId: string,
  ifMatch: string,
  options: IncomingQuotaTransfersApproveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{targetProvider}/locations/{region}/providers/Microsoft.Quota/incomingQuotaTransfers/{transferId}/approve{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      targetProvider: targetProvider,
      region: region,
      transferId: transferId,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      ...(options?.repeatabilityRequestId !== undefined
        ? { "repeatability-request-id": options?.repeatabilityRequestId }
        : {}),
      ...(options?.repeatabilityFirstSent !== undefined
        ? {
            "repeatability-first-sent": !options?.repeatabilityFirstSent
              ? options?.repeatabilityFirstSent
              : options?.repeatabilityFirstSent.toUTCString(),
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options?.body
      ? options?.body
      : incomingQuotaTransferApproveRequestSerializer(options?.body),
  });
}

export async function _approveDeserialize(
  result: PathUncheckedResponse,
): Promise<IncomingQuotaTransfer> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return incomingQuotaTransferDeserializer(result.body);
}

/**
 * Approve a Pending incoming quota transfer. Long-running. The `If-Match` header value
 * must equal `properties.sourceEtag` returned on a prior GET; a stale value yields
 * 412 SourceResourceModified.
 */
export function approve(
  context: Client,
  targetProvider: string,
  region: string,
  transferId: string,
  ifMatch: string,
  options: IncomingQuotaTransfersApproveOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IncomingQuotaTransfer>, IncomingQuotaTransfer> {
  return getLongRunningPoller(context, _approveDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _approveSend(context, targetProvider, region, transferId, ifMatch, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<IncomingQuotaTransfer>, IncomingQuotaTransfer>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: IncomingQuotaTransfersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Quota/incomingQuotaTransfers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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
): Promise<_IncomingQuotaTransferListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _incomingQuotaTransferListResultDeserializer(result.body);
}

/**
 * List incoming quota transfers across every targetProvider and region for the
 * subscription.
 */
export function listBySubscription(
  context: Client,
  options: IncomingQuotaTransfersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IncomingQuotaTransfer> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-01-preview",
    },
  );
}

export function _listSend(
  context: Client,
  targetProvider: string,
  region: string,
  options: IncomingQuotaTransfersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{targetProvider}/locations/{region}/providers/Microsoft.Quota/incomingQuotaTransfers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      targetProvider: targetProvider,
      region: region,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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
): Promise<_IncomingQuotaTransferListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _incomingQuotaTransferListResultDeserializer(result.body);
}

/** List incoming quota transfers at the (subscription, targetProvider, region) scope. */
export function list(
  context: Client,
  targetProvider: string,
  region: string,
  options: IncomingQuotaTransfersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IncomingQuotaTransfer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, targetProvider, region, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  targetProvider: string,
  region: string,
  transferId: string,
  options: IncomingQuotaTransfersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{targetProvider}/locations/{region}/providers/Microsoft.Quota/incomingQuotaTransfers/{transferId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      targetProvider: targetProvider,
      region: region,
      transferId: transferId,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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
): Promise<IncomingQuotaTransfer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return incomingQuotaTransferDeserializer(result.body);
}

/** Get an incoming quota transfer. */
export async function get(
  context: Client,
  targetProvider: string,
  region: string,
  transferId: string,
  options: IncomingQuotaTransfersGetOptionalParams = { requestOptions: {} },
): Promise<IncomingQuotaTransfer> {
  const result = await _getSend(context, targetProvider, region, transferId, options);
  return _getDeserialize(result);
}
