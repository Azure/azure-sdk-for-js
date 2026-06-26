// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  TdeCertificate,
  tdeCertificateSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ManagedInstanceTdeCertificatesCreateOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _createSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  parameters: TdeCertificate,
  options: ManagedInstanceTdeCertificatesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/tdeCertificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: tdeCertificateSerializer(parameters),
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Creates a TDE certificate for a given server. */
export function create(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  parameters: TdeCertificate,
  options: ManagedInstanceTdeCertificatesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, managedInstanceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-01",
  }) as PollerLike<OperationState<void>, void>;
}
