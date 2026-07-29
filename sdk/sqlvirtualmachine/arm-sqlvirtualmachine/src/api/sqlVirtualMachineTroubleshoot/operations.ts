// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlVirtualMachineManagementContext as Client } from "../index.js";
import type { SqlVmTroubleshooting } from "../../models/models.js";
import {
  errorResponseDeserializer,
  sqlVmTroubleshootingSerializer,
  sqlVmTroubleshootingDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SqlVirtualMachineTroubleshootTroubleshootOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _troubleshootSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  parameters: SqlVmTroubleshooting,
  options: SqlVirtualMachineTroubleshootTroubleshootOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/troubleshoot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineName: sqlVirtualMachineName,
      "api%2Dversion": context.apiVersion ?? "2023-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sqlVmTroubleshootingSerializer(parameters),
  });
}

export async function _troubleshootDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlVmTroubleshooting> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sqlVmTroubleshootingDeserializer(result.body);
}

/** Starts SQL virtual machine troubleshooting. */
export function troubleshoot(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  parameters: SqlVmTroubleshooting,
  options: SqlVirtualMachineTroubleshootTroubleshootOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlVmTroubleshooting>, SqlVmTroubleshooting> {
  return getLongRunningPoller(context, _troubleshootDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _troubleshootSend(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-10-01",
  }) as PollerLike<OperationState<SqlVmTroubleshooting>, SqlVmTroubleshooting>;
}
