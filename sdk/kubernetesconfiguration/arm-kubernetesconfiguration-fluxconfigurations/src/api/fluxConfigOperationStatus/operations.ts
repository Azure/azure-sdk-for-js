// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FluxConfigurationContext as Client } from "../index.js";
import type { OperationStatusResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  operationStatusResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { FluxConfigOperationStatusGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  operationId: string,
  options: FluxConfigOperationStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations/{fluxConfigurationName}/operations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      fluxConfigurationName: fluxConfigurationName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Get Async Operation status */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  operationId: string,
  options: FluxConfigOperationStatusGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatusResult> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    fluxConfigurationName,
    operationId,
    options,
  );
  return _getDeserialize(result);
}
