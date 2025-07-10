// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SqlVmTroubleshooting,
  sqlVmTroubleshootingSerializer,
  sqlVmTroubleshootingDeserializer,
} from "../../models/models.js";
import { SqlVirtualMachineTroubleshootTroubleshootOptionalParams } from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _troubleshootSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineName: string,
  parameters: SqlVmTroubleshooting,
  options: SqlVirtualMachineTroubleshootTroubleshootOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/troubleshoot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineName: sqlVirtualMachineName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sqlVmTroubleshootingSerializer(parameters),
  });
}

export async function _troubleshootDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlVmTroubleshooting> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
  options: SqlVirtualMachineTroubleshootTroubleshootOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SqlVmTroubleshooting>, SqlVmTroubleshooting> {
  return getLongRunningPoller(context, _troubleshootDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _troubleshootSend(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SqlVmTroubleshooting>, SqlVmTroubleshooting>;
}
