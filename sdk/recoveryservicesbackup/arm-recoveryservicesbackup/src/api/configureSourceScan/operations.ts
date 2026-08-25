// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { ProtectedItemConfigureSourceScanRequest } from "../../models/models.js";
import {
  errorResponseDeserializer,
  protectedItemConfigureSourceScanRequestSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ConfigureSourceScanExecuteOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _executeSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  body: ProtectedItemConfigureSourceScanRequest,
  options: ConfigureSourceScanExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/configureSourceScan{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      fabricName: fabricName,
      containerName: containerName,
      protectedItemName: protectedItemName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: protectedItemConfigureSourceScanRequestSerializer(body),
  });
}

export async function _executeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
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
 * Configures source scan for a protected item. This is an asynchronous operation. To know the status of the
 * operation, call GetProtectedItemOperationResult API.
 */
export function execute(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  fabricName: string,
  containerName: string,
  protectedItemName: string,
  body: ProtectedItemConfigureSourceScanRequest,
  options: ConfigureSourceScanExecuteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _executeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _executeSend(
        context,
        resourceGroupName,
        vaultName,
        fabricName,
        containerName,
        protectedItemName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<void>, void>;
}
