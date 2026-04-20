// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { OperationStatus } from "../../models/microsoft/privateLinkScopes/models.js";
import { operationStatusDeserializer } from "../../models/microsoft/privateLinkScopes/models.js";
import { armErrorResponseDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PrivateLinkScopeOperationStatusGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  asyncOperationId: string,
  options: PrivateLinkScopeOperationStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopeOperationStatuses/{asyncOperationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      asyncOperationId: asyncOperationId,
      "api%2Dversion": "2023-06-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = armErrorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusDeserializer(result.body);
}

/** Get the status of an azure asynchronous operation associated with a private link scope operation. */
export async function get(
  context: Client,
  resourceGroupName: string,
  asyncOperationId: string,
  options: PrivateLinkScopeOperationStatusGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatus> {
  const result = await _getSend(context, resourceGroupName, asyncOperationId, options);
  return _getDeserialize(result);
}
