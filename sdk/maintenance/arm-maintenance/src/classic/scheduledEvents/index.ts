// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import { acknowledgeList, acknowledge } from "../../api/scheduledEvents/operations.js";
import type {
  ScheduledEventsAcknowledgeListOptionalParams,
  ScheduledEventsAcknowledgeOptionalParams,
} from "../../api/scheduledEvents/options.js";
import type { ScheduledEventsApproveResponse, ScheduledEventsIdList } from "../../models/models.js";

/** Interface representing a ScheduledEvents operations. */
export interface ScheduledEventsOperations {
  /** Post List of ScheduledEvents Acknowledgement */
  acknowledgeList: (
    resourceGroupName: string,
    resourceType: string,
    resourceName: string,
    scheduledEventsIdList: ScheduledEventsIdList,
    options?: ScheduledEventsAcknowledgeListOptionalParams,
  ) => Promise<ScheduledEventsApproveResponse>;
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
    acknowledgeList: (
      resourceGroupName: string,
      resourceType: string,
      resourceName: string,
      scheduledEventsIdList: ScheduledEventsIdList,
      options?: ScheduledEventsAcknowledgeListOptionalParams,
    ) =>
      acknowledgeList(
        context,
        resourceGroupName,
        resourceType,
        resourceName,
        scheduledEventsIdList,
        options,
      ),
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
