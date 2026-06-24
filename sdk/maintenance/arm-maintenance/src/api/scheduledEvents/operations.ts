// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementContext as Client } from "../index.js";
import {
  maintenanceErrorDeserializer,
  ScheduledEventsApproveResponse,
  scheduledEventsApproveResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ScheduledEventsAcknowledgeOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _acknowledgeSend(
  context: Client,
  resourceGroupName: string,
  resourceType: string,
  resourceName: string,
  scheduledEventId: string,
  options: ScheduledEventsAcknowledgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Compute/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/scheduledevents/{scheduledEventId}/acknowledge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceType: resourceType,
      resourceName: resourceName,
      scheduledEventId: scheduledEventId,
      "api%2Dversion": context.apiVersion ?? "2023-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _acknowledgeDeserialize(
  result: PathUncheckedResponse,
): Promise<ScheduledEventsApproveResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = maintenanceErrorDeserializer(result.body);
    }

    throw error;
  }

  return scheduledEventsApproveResponseDeserializer(result.body);
}

/** Post ScheduledEvents Acknowledgement */
export async function acknowledge(
  context: Client,
  resourceGroupName: string,
  resourceType: string,
  resourceName: string,
  scheduledEventId: string,
  options: ScheduledEventsAcknowledgeOptionalParams = { requestOptions: {} },
): Promise<ScheduledEventsApproveResponse> {
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
