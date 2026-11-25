// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProfessionalServiceContext as Client } from "../index.js";
import type { OperationStatusResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  operationStatusResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ProfessionalServiceOperationStatusesGetSubscriptionOperationStatusOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSubscriptionOperationStatusSend(
  context: Client,
  operationId: string,
  options: ProfessionalServiceOperationStatusesGetSubscriptionOperationStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProfessionalService/operationStatuses/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
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

export async function _getSubscriptionOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Gets the status of a long-running Professional Service operation at the subscription scope. All async operations, including resource-group-scoped ones, poll through this endpoint. */
export async function getSubscriptionOperationStatus(
  context: Client,
  operationId: string,
  options: ProfessionalServiceOperationStatusesGetSubscriptionOperationStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<OperationStatusResult> {
  const result = await _getSubscriptionOperationStatusSend(context, operationId, options);
  return _getSubscriptionOperationStatusDeserialize(result);
}
