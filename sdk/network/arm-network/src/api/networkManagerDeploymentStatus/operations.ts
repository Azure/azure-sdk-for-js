// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  NetworkManagerDeploymentStatusParameter,
  NetworkManagerDeploymentStatusListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkManagerDeploymentStatusParameterSerializer,
  networkManagerDeploymentStatusListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { NetworkManagerDeploymentStatusListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  parameters: NetworkManagerDeploymentStatusParameter,
  options: NetworkManagerDeploymentStatusListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/listDeploymentStatus{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkManagerDeploymentStatusParameterSerializer(parameters),
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkManagerDeploymentStatusListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkManagerDeploymentStatusListResultDeserializer(result.body);
}

/** Post to List of Network Manager Deployment Status. */
export async function list(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  parameters: NetworkManagerDeploymentStatusParameter,
  options: NetworkManagerDeploymentStatusListOptionalParams = { requestOptions: {} },
): Promise<NetworkManagerDeploymentStatusListResult> {
  const result = await _listSend(
    context,
    resourceGroupName,
    networkManagerName,
    parameters,
    options,
  );
  return _listDeserialize(result);
}
