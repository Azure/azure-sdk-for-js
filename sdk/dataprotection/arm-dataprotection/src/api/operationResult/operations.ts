// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type { OperationJobExtendedInfo } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  operationJobExtendedInfoDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OperationResultGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  operationId: string,
  location: string,
  options: OperationResultGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      operationId: operationId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationJobExtendedInfo> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return operationJobExtendedInfoDeserializer(result.body);
}

/** Gets the operation result for a resource */
export async function get(
  context: Client,
  operationId: string,
  location: string,
  options: OperationResultGetOptionalParams = { requestOptions: {} },
): Promise<OperationJobExtendedInfo | null> {
  const result = await _getSend(context, operationId, location, options);
  return _getDeserialize(result);
}
