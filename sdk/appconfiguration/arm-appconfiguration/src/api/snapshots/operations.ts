// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext as Client } from "../index.js";
import type { Snapshot } from "../../models/models.js";
import {
  errorResponseDeserializer,
  snapshotSerializer,
  snapshotDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SnapshotsCreateOptionalParams, SnapshotsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  snapshotName: string,
  body: Snapshot,
  options: SnapshotsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/snapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      snapshotName: snapshotName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: snapshotSerializer(body),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Snapshot> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotDeserializer(result.body);
}

/** Creates a snapshot. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead. */
export function create(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  snapshotName: string,
  body: Snapshot,
  options: SnapshotsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Snapshot>, Snapshot> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, configStoreName, snapshotName, body, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Snapshot>, Snapshot>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  snapshotName: string,
  options: SnapshotsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/snapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      snapshotName: snapshotName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Snapshot> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotDeserializer(result.body);
}

/** Gets the properties of the specified snapshot. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead. */
export async function get(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  snapshotName: string,
  options: SnapshotsGetOptionalParams = { requestOptions: {} },
): Promise<Snapshot> {
  const result = await _getSend(context, resourceGroupName, configStoreName, snapshotName, options);
  return _getDeserialize(result);
}
