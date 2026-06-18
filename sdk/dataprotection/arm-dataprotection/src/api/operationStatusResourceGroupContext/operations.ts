// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  OperationResource,
  operationResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { OperationStatusResourceGroupContextGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  operationId: string,
  options: OperationStatusResourceGroupContextGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/operationStatus/{operationId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OperationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return operationResourceDeserializer(result.body);
}

/** Gets the operation status for an operation over a ResourceGroup's context. */
export async function get(
  context: Client,
  resourceGroupName: string,
  operationId: string,
  options: OperationStatusResourceGroupContextGetOptionalParams = { requestOptions: {} },
): Promise<OperationResource> {
  const result = await _getSend(context, resourceGroupName, operationId, options);
  return _getDeserialize(result);
}
