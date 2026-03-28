// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type { ManagedNetworkProvisionStatus } from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedNetworkProvisionStatusDeserializer,
  managedNetworkProvisionOptionsSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _provisionManagedNetworkSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/provisionManagedNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : managedNetworkProvisionOptionsSerializer(options["body"]),
  });
}

export async function _provisionManagedNetworkDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedNetworkProvisionStatus> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedNetworkProvisionStatusDeserializer(result.body);
}

/** Provisions the managed network of a machine learning workspace. */
export function provisionManagedNetwork(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedNetworkProvisionStatus>, ManagedNetworkProvisionStatus> {
  return getLongRunningPoller(context, _provisionManagedNetworkDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _provisionManagedNetworkSend(context, resourceGroupName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<ManagedNetworkProvisionStatus>, ManagedNetworkProvisionStatus>;
}
