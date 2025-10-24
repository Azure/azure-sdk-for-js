// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext as Client } from "../index.js";
import type { ScheduledEventApproveResponse } from "../../models/models.js";
import {
  maintenanceErrorDeserializer,
  scheduledEventApproveResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ScheduledEventAcknowledgeOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _acknowledgeSend(
  context: Client,
  resourceGroupName: string,
  resourceType: string,
  resourceName: string,
  scheduledEventId: string,
  options: ScheduledEventAcknowledgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Compute/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/scheduledevents/{scheduledEventId}/acknowledge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceType: resourceType,
      resourceName: resourceName,
      scheduledEventId: scheduledEventId,
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

export async function _acknowledgeDeserialize(
  result: PathUncheckedResponse,
): Promise<ScheduledEventApproveResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = maintenanceErrorDeserializer(result.body);
    throw error;
  }

  return scheduledEventApproveResponseDeserializer(result.body);
}

/** Post Scheduled Event Acknowledgement */
export async function acknowledge(
  context: Client,
  resourceGroupName: string,
  resourceType: string,
  resourceName: string,
  scheduledEventId: string,
  options: ScheduledEventAcknowledgeOptionalParams = { requestOptions: {} },
): Promise<ScheduledEventApproveResponse> {
  const result = await _acknowledgeSend(
    context,
    resourceGroupName,
    resourceType,
    resourceName,
    scheduledEventId,
    options,
  );
  return _acknowledgeDeserialize(result);
}
