// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  RansomwareReport,
  _RansomwareReportsList,
  RansomwareSuspectsClearRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  ransomwareReportDeserializer,
  _ransomwareReportsListDeserializer,
  ransomwareSuspectsClearRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RansomwareReportsClearSuspectsOptionalParams,
  RansomwareReportsListOptionalParams,
  RansomwareReportsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _clearSuspectsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  ransomwareReportName: string,
  body: RansomwareSuspectsClearRequest,
  options: RansomwareReportsClearSuspectsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/ransomwareReports/{ransomwareReportName}/clearSuspects{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      ransomwareReportName: ransomwareReportName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: ransomwareSuspectsClearRequestSerializer(body),
  });
}

export async function _clearSuspectsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/**
 * "Clear ransomware suspects for the given Advanced Ransomware Protection report. You should evaluate the report to determine whether the activity is acceptable (false positive) or whether an attack seems malicious.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data",
 */
export function clearSuspects(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  ransomwareReportName: string,
  body: RansomwareSuspectsClearRequest,
  options: RansomwareReportsClearSuspectsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _clearSuspectsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _clearSuspectsSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        ransomwareReportName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: RansomwareReportsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/ransomwareReports{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RansomwareReportsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _ransomwareReportsListDeserializer(result.body);
}

/**
 * List all ransomware reports for the volume
 * Returns a list of the Advanced Ransomware Protection (ARP) reports for the volume.
 * ARP reports are created with a list of suspected files when it detects any combination of high data entropy, abnormal volume activity with data encryption, and unusual file extensions.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data"
 */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: RansomwareReportsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RansomwareReport> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, poolName, volumeName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  ransomwareReportName: string,
  options: RansomwareReportsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/ransomwareReports/{ransomwareReportName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      ransomwareReportName: ransomwareReportName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RansomwareReport> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ransomwareReportDeserializer(result.body);
}

/**
 * Get details of the specified ransomware report (ARP)
 * ARP reports are created with a list of suspected files when it detects any combination of high data entropy, abnormal volume activity with data encryption, and unusual file extensions.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data.
 */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  ransomwareReportName: string,
  options: RansomwareReportsGetOptionalParams = { requestOptions: {} },
): Promise<RansomwareReport> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    ransomwareReportName,
    options,
  );
  return _getDeserialize(result);
}
