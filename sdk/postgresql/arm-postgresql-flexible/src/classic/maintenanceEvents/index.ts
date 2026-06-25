// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { applyNow, reschedule, list, get } from "../../api/maintenanceEvents/operations.js";
import {
  MaintenanceEventsApplyNowOptionalParams,
  MaintenanceEventsRescheduleOptionalParams,
  MaintenanceEventsListOptionalParams,
  MaintenanceEventsGetOptionalParams,
} from "../../api/maintenanceEvents/options.js";
import {
  MaintenanceEventResource,
  MaintenanceEventRescheduleRequest,
  MaintenanceEventActionResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MaintenanceEvents operations. */
export interface MaintenanceEventsOperations {
  /** Applies the maintenance event immediately. */
  applyNow: (
    resourceGroupName: string,
    serverName: string,
    maintenanceEventId: string,
    options?: MaintenanceEventsApplyNowOptionalParams,
  ) => PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>;
  /** @deprecated use applyNow instead */
  beginApplyNow: (
    resourceGroupName: string,
    serverName: string,
    maintenanceEventId: string,
    options?: MaintenanceEventsApplyNowOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>
  >;
  /** @deprecated use applyNow instead */
  beginApplyNowAndWait: (
    resourceGroupName: string,
    serverName: string,
    maintenanceEventId: string,
    options?: MaintenanceEventsApplyNowOptionalParams,
  ) => Promise<MaintenanceEventActionResponse>;
  /** Reschedules a maintenance event to a new date and time. */
  reschedule: (
    resourceGroupName: string,
    serverName: string,
    maintenanceEventId: string,
    body: MaintenanceEventRescheduleRequest,
    options?: MaintenanceEventsRescheduleOptionalParams,
  ) => PollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>;
  /** @deprecated use reschedule instead */
  beginReschedule: (
    resourceGroupName: string,
    serverName: string,
    maintenanceEventId: string,
    body: MaintenanceEventRescheduleRequest,
    options?: MaintenanceEventsRescheduleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MaintenanceEventActionResponse>, MaintenanceEventActionResponse>
  >;
  /** @deprecated use reschedule instead */
  beginRescheduleAndWait: (
    resourceGroupName: string,
    serverName: string,
    maintenanceEventId: string,
    body: MaintenanceEventRescheduleRequest,
    options?: MaintenanceEventsRescheduleOptionalParams,
  ) => Promise<MaintenanceEventActionResponse>;
  /** Lists all maintenance events for a flexible server. */
  list: (
    resourceGroupName: string,
    serverName: string,
    options?: MaintenanceEventsListOptionalParams,
  ) => PagedAsyncIterableIterator<MaintenanceEventResource>;
  /** Gets information about a maintenance event for a flexible server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    maintenanceEventId: string,
    options?: MaintenanceEventsGetOptionalParams,
  ) => Promise<MaintenanceEventResource>;
}

function _getMaintenanceEvents(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    applyNow: (
      resourceGroupName: string,
      serverName: string,
      maintenanceEventId: string,
      options?: MaintenanceEventsApplyNowOptionalParams,
    ) => applyNow(context, resourceGroupName, serverName, maintenanceEventId, options),
    beginApplyNow: async (
      resourceGroupName: string,
      serverName: string,
      maintenanceEventId: string,
      options?: MaintenanceEventsApplyNowOptionalParams,
    ) => {
      const poller = applyNow(context, resourceGroupName, serverName, maintenanceEventId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApplyNowAndWait: async (
      resourceGroupName: string,
      serverName: string,
      maintenanceEventId: string,
      options?: MaintenanceEventsApplyNowOptionalParams,
    ) => {
      return await applyNow(context, resourceGroupName, serverName, maintenanceEventId, options);
    },
    reschedule: (
      resourceGroupName: string,
      serverName: string,
      maintenanceEventId: string,
      body: MaintenanceEventRescheduleRequest,
      options?: MaintenanceEventsRescheduleOptionalParams,
    ) => reschedule(context, resourceGroupName, serverName, maintenanceEventId, body, options),
    beginReschedule: async (
      resourceGroupName: string,
      serverName: string,
      maintenanceEventId: string,
      body: MaintenanceEventRescheduleRequest,
      options?: MaintenanceEventsRescheduleOptionalParams,
    ) => {
      const poller = reschedule(
        context,
        resourceGroupName,
        serverName,
        maintenanceEventId,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRescheduleAndWait: async (
      resourceGroupName: string,
      serverName: string,
      maintenanceEventId: string,
      body: MaintenanceEventRescheduleRequest,
      options?: MaintenanceEventsRescheduleOptionalParams,
    ) => {
      return await reschedule(
        context,
        resourceGroupName,
        serverName,
        maintenanceEventId,
        body,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      serverName: string,
      options?: MaintenanceEventsListOptionalParams,
    ) => list(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      maintenanceEventId: string,
      options?: MaintenanceEventsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, maintenanceEventId, options),
  };
}

export function _getMaintenanceEventsOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): MaintenanceEventsOperations {
  return {
    ..._getMaintenanceEvents(context),
  };
}
