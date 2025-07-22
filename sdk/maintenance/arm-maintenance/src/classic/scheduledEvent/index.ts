// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import { ScheduledEventApproveResponse } from "../../models/models.js";
import { ScheduledEventAcknowledgeOptionalParams } from "../../api/scheduledEvent/options.js";
import { acknowledge } from "../../api/scheduledEvent/operations.js";

/** Interface representing a ScheduledEvent operations. */
export interface ScheduledEventOperations {
  /** Post Scheduled Event Acknowledgement */
  acknowledge: (
    resourceGroupName: string,
    resourceType: string,
    resourceName: string,
    scheduledEventId: string,
    options?: ScheduledEventAcknowledgeOptionalParams,
  ) => Promise<ScheduledEventApproveResponse>;
}

function _getScheduledEvent(context: MaintenanceManagementContext) {
  return {
    acknowledge: (
      resourceGroupName: string,
      resourceType: string,
      resourceName: string,
      scheduledEventId: string,
      options?: ScheduledEventAcknowledgeOptionalParams,
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

export function _getScheduledEventOperations(
  context: MaintenanceManagementContext,
): ScheduledEventOperations {
  return {
    ..._getScheduledEvent(context),
  };
}
