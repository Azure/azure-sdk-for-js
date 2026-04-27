// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type { ClusterRecoveryPoint } from "../../models/models.js";
import {
  errorResponseDeserializer,
  clusterRecoveryPointDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ClusterRecoveryPointGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  recoveryPointName: string,
  options: ClusterRecoveryPointGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/recoveryPoints/{recoveryPointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
      recoveryPointName: recoveryPointName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
): Promise<ClusterRecoveryPoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clusterRecoveryPointDeserializer(result.body);
}

/** Get the details of specified recovery point. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  recoveryPointName: string,
  options: ClusterRecoveryPointGetOptionalParams = { requestOptions: {} },
): Promise<ClusterRecoveryPoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    replicationProtectionClusterName,
    recoveryPointName,
    options,
  );
  return _getDeserialize(result);
}
