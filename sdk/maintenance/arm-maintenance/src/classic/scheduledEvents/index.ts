// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import { acknowledge } from "../../api/scheduledEvents/operations.js";
import { ScheduledEventsAcknowledgeOptionalParams } from "../../api/scheduledEvents/options.js";
import { ScheduledEventsApproveResponse } from "../../models/models.js";

/** Interface representing a ScheduledEvents operations. */
export interface ScheduledEventsOperations {
  /** Post ScheduledEvents Acknowledgement */
  acknowledge: (
    resourceGroupName: string,
    resourceType: string,
    resourceName: string,
    scheduledEventId: string,
    options?: ScheduledEventsAcknowledgeOptionalParams,
  ) => Promise<ScheduledEventsApproveResponse>;
}

function _getScheduledEvents(context: MaintenanceManagementContext) {
  return {
    acknowledge: (
      resourceGroupName: string,
      resourceType: string,
      resourceName: string,
      scheduledEventId: string,
      options?: ScheduledEventsAcknowledgeOptionalParams,
    ) =>
      acknowledge(
        context,
        resourceGroupName,
        resourceType,
        resourceName,
        scheduledEventId,
        options,
      ),
  };
}

export function _getScheduledEventsOperations(
  context: MaintenanceManagementContext,
): ScheduledEventsOperations {
  return {
    ..._getScheduledEvents(context),
  };
}
