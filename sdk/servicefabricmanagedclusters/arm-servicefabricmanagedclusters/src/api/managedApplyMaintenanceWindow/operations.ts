// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { ManagedApplyMaintenanceWindowPostOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ManagedApplyMaintenanceWindowPostOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applyMaintenanceWindow{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _postDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Action to Apply Maintenance window on the Service Fabric Managed Clusters, right now. Any pending update will be applied. */
export async function post(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ManagedApplyMaintenanceWindowPostOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _postSend(context, resourceGroupName, clusterName, options);
  return _postDeserialize(result);
}
