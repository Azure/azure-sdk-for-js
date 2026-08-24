// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import type { QuotaTransfer, _QuotaTransferListResult } from "../../models/models.js";
import {
  quotaTransferSerializer,
  quotaTransferDeserializer,
  errorResponseDeserializer,
  _quotaTransferListResultDeserializer,
  quotaTransferCancelRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  QuotaTransfersCancelOptionalParams,
  QuotaTransfersListOptionalParams,
  QuotaTransfersDeleteOptionalParams,
  QuotaTransfersCreateOrUpdateOptionalParams,
  QuotaTransfersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _cancelSend(
  context: Client,
  targetProvider: string,
  region: string,
  transferName: string,
  options: QuotaTransfersCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{targetProvider}/locations/{region}/providers/Microsoft.Quota/quotaTransfers/{transferName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      targetProvider: targetProvider,
      region: region,
      transferName: transferName,
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
    body: !options?.body ? options?.body : quotaTransferCancelRequestSerializer(options?.body),
  });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<QuotaTransfer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return quotaTransferDeserializer(result.body);
}

/**
 * Cancel a Pending quota transfer. Synchronous. Transitions the transfer to Cancelled
 * and returns the refreshed resource envelope.
 */
export async function cancel(
  context: Client,
  targetProvider: string,
  region: string,
  transferName: string,
  options: QuotaTransfersCancelOptionalParams = { requestOptions: {} },
): Promise<QuotaTransfer> {
  const result = await _cancelSend(context, targetProvider, region, transferName, options);
  return _cancelDeserialize(result);
}

export function _listSend(
  context: Client,
  targetProvider: string,
  region: string,
  options: QuotaTransfersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{targetProvider}/locations/{region}/providers/Microsoft.Quota/quotaTransfers{?api%2Dversion}",
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
): Promise<_QuotaTransferListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _quotaTransferListResultDeserializer(result.body);
}

/** List quota transfers at the (subscription, targetProvider, region) scope. */
export function list(
  context: Client,
  targetProvider: string,
  region: string,
  options: QuotaTransfersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<QuotaTransfer> {
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

export function _$deleteSend(
  context: Client,
  targetProvider: string,
  region: string,
  transferName: string,
  options: QuotaTransfersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{targetProvider}/locations/{region}/providers/Microsoft.Quota/quotaTransfers/{transferName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      targetProvider: targetProvider,
      region: region,
      transferName: transferName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Delete a quota transfer record. Quota is not moved by delete; only the resource entry
 * is removed.
 */
export async function $delete(
  context: Client,
  targetProvider: string,
  region: string,
  transferName: string,
  options: QuotaTransfersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, targetProvider, region, transferName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  targetProvider: string,
  region: string,
  transferName: string,
  resource: QuotaTransfer,
  options: QuotaTransfersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{targetProvider}/locations/{region}/providers/Microsoft.Quota/quotaTransfers/{transferName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      targetProvider: targetProvider,
      region: region,
      transferName: transferName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: quotaTransferSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<QuotaTransfer> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return quotaTransferDeserializer(result.body);
}

/**
 * Submit a quota transfer. Idempotent on the URI: a retry with the same body returns the
 * cached outcome and the same `transferId`; a retry with a different financial body
 * returns 409 BodyMismatch.
 */
export function createOrUpdate(
  context: Client,
  targetProvider: string,
  region: string,
  transferName: string,
  resource: QuotaTransfer,
  options: QuotaTransfersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<QuotaTransfer>, QuotaTransfer> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, targetProvider, region, transferName, resource, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<QuotaTransfer>, QuotaTransfer>;
}

export function _getSend(
  context: Client,
  targetProvider: string,
  region: string,
  transferName: string,
  options: QuotaTransfersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{targetProvider}/locations/{region}/providers/Microsoft.Quota/quotaTransfers/{transferName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      targetProvider: targetProvider,
      region: region,
      transferName: transferName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<QuotaTransfer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return quotaTransferDeserializer(result.body);
}

/** Get a quota transfer. */
export async function get(
  context: Client,
  targetProvider: string,
  region: string,
  transferName: string,
  options: QuotaTransfersGetOptionalParams = { requestOptions: {} },
): Promise<QuotaTransfer> {
  const result = await _getSend(context, targetProvider, region, transferName, options);
  return _getDeserialize(result);
}
