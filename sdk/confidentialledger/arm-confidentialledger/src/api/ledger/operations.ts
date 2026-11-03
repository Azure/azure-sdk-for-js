// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfidentialLedgerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConfidentialLedger,
  confidentialLedgerSerializer,
  confidentialLedgerDeserializer,
  _ConfidentialLedgerList,
  _confidentialLedgerListDeserializer,
  ConfidentialLedgerFilesExport,
  confidentialLedgerFilesExportSerializer,
  ConfidentialLedgerFilesExportResponse,
  confidentialLedgerFilesExportResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  LedgerFilesExportOptionalParams,
  LedgerListBySubscriptionOptionalParams,
  LedgerListByResourceGroupOptionalParams,
  LedgerDeleteOptionalParams,
  LedgerUpdateOptionalParams,
  LedgerCreateOptionalParams,
  LedgerGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _filesExportSend(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  confidentialLedger: ConfidentialLedgerFilesExport,
  options: LedgerFilesExportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}/filesExport{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ledgerName: ledgerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: confidentialLedgerFilesExportSerializer(confidentialLedger),
  });
}

export async function _filesExportDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfidentialLedgerFilesExportResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return confidentialLedgerFilesExportResponseDeserializer(result.body);
}

/** Copies the ledger files and the service certificate to a customer's storage account of choice. */
export function filesExport(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  confidentialLedger: ConfidentialLedgerFilesExport,
  options: LedgerFilesExportOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ConfidentialLedgerFilesExportResponse>,
  ConfidentialLedgerFilesExportResponse
> {
  return getLongRunningPoller(context, _filesExportDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _filesExportSend(context, resourceGroupName, ledgerName, confidentialLedger, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-23",
  }) as PollerLike<
    OperationState<ConfidentialLedgerFilesExportResponse>,
    ConfidentialLedgerFilesExportResponse
  >;
}

export function _listBySubscriptionSend(
  context: Client,
  options: LedgerListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ConfidentialLedger/ledgers{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-23",
      "%24filter": options?.filter,
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
): Promise<_ConfidentialLedgerList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _confidentialLedgerListDeserializer(result.body);
}

/** Retrieves the properties of all Confidential Ledgers. */
export function listBySubscription(
  context: Client,
  options: LedgerListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfidentialLedger> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-02-23" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: LedgerListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-02-23",
      "%24filter": options?.filter,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConfidentialLedgerList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _confidentialLedgerListDeserializer(result.body);
}

/** Retrieves the properties of all Confidential Ledgers. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: LedgerListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfidentialLedger> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-02-23" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  options: LedgerDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ledgerName: ledgerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Confidential Ledger. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  options: LedgerDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, ledgerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-23",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  confidentialLedger: ConfidentialLedger,
  options: LedgerUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ledgerName: ledgerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: confidentialLedgerSerializer(confidentialLedger),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfidentialLedger> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return confidentialLedgerDeserializer(result.body);
}

/** Updates properties of Confidential Ledger */
export function update(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  confidentialLedger: ConfidentialLedger,
  options: LedgerUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConfidentialLedger>, ConfidentialLedger> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, ledgerName, confidentialLedger, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-23",
  }) as PollerLike<OperationState<ConfidentialLedger>, ConfidentialLedger>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  confidentialLedger: ConfidentialLedger,
  options: LedgerCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ledgerName: ledgerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: confidentialLedgerSerializer(confidentialLedger),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfidentialLedger> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return confidentialLedgerDeserializer(result.body);
}

/** Creates a  Confidential Ledger with the specified ledger parameters. */
export function create(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  confidentialLedger: ConfidentialLedger,
  options: LedgerCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConfidentialLedger>, ConfidentialLedger> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, ledgerName, confidentialLedger, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-23",
  }) as PollerLike<OperationState<ConfidentialLedger>, ConfidentialLedger>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  options: LedgerGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConfidentialLedger/ledgers/{ledgerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ledgerName: ledgerName,
      "api%2Dversion": context.apiVersion ?? "2026-02-23",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ConfidentialLedger> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return confidentialLedgerDeserializer(result.body);
}

/** Retrieves the properties of a Confidential Ledger. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ledgerName: string,
  options: LedgerGetOptionalParams = { requestOptions: {} },
): Promise<ConfidentialLedger> {
  const result = await _getSend(context, resourceGroupName, ledgerName, options);
  return _getDeserialize(result);
}
