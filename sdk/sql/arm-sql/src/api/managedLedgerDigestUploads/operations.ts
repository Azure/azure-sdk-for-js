// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  ManagedLedgerDigestUploads,
  ManagedLedgerDigestUploadsName,
  _ManagedLedgerDigestUploadsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedLedgerDigestUploadsSerializer,
  managedLedgerDigestUploadsDeserializer,
  _managedLedgerDigestUploadsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedLedgerDigestUploadsDisableOptionalParams,
  ManagedLedgerDigestUploadsListByDatabaseOptionalParams,
  ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams,
  ManagedLedgerDigestUploadsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _disableSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  ledgerDigestUploads: ManagedLedgerDigestUploadsName,
  options: ManagedLedgerDigestUploadsDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      ledgerDigestUploads: ledgerDigestUploads,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _disableDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedLedgerDigestUploads> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedLedgerDigestUploadsDeserializer(result.body);
}

/** Disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
export function disable(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  ledgerDigestUploads: ManagedLedgerDigestUploadsName,
  options: ManagedLedgerDigestUploadsDisableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads> {
  return getLongRunningPoller(context, _disableDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableSend(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        ledgerDigestUploads,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads>;
}

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedLedgerDigestUploadsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedLedgerDigestUploadsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedLedgerDigestUploadsListResultDeserializer(result.body);
}

/** Gets all ledger digest upload settings on a database. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedLedgerDigestUploadsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedLedgerDigestUploads> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDatabaseSend(context, resourceGroupName, managedInstanceName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  ledgerDigestUploads: ManagedLedgerDigestUploadsName,
  parameters: ManagedLedgerDigestUploads,
  options: ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      ledgerDigestUploads: ledgerDigestUploads,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedLedgerDigestUploadsSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedLedgerDigestUploads> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedLedgerDigestUploadsDeserializer(result.body);
}

/** Enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  ledgerDigestUploads: ManagedLedgerDigestUploadsName,
  parameters: ManagedLedgerDigestUploads,
  options: ManagedLedgerDigestUploadsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        ledgerDigestUploads,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ManagedLedgerDigestUploads>, ManagedLedgerDigestUploads>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  ledgerDigestUploads: ManagedLedgerDigestUploadsName,
  options: ManagedLedgerDigestUploadsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      ledgerDigestUploads: ledgerDigestUploads,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<ManagedLedgerDigestUploads> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedLedgerDigestUploadsDeserializer(result.body);
}

/** Gets the current ledger digest upload configuration for a database. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  ledgerDigestUploads: ManagedLedgerDigestUploadsName,
  options: ManagedLedgerDigestUploadsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedLedgerDigestUploads> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    ledgerDigestUploads,
    options,
  );
  return _getDeserialize(result);
}
