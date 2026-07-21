// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/scheduleOperations/operations.js";
import type {
  ScheduleOperationsListByAutomationAccountOptionalParams,
  ScheduleOperationsDeleteOptionalParams,
  ScheduleOperationsUpdateOptionalParams,
  ScheduleOperationsCreateOrUpdateOptionalParams,
  ScheduleOperationsGetOptionalParams,
} from "../../api/scheduleOperations/options.js";
import type {
  Schedule,
  ScheduleCreateOrUpdateParameters,
  ScheduleUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScheduleOperations operations. */
export interface ScheduleOperationsOperations {
  /** Retrieve a list of schedules. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: ScheduleOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Schedule>;
  /** Delete the schedule identified by schedule name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    scheduleName: string,
    options?: ScheduleOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the schedule identified by schedule name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    scheduleName: string,
    parameters: ScheduleUpdateParameters,
    options?: ScheduleOperationsUpdateOptionalParams,
  ) => Promise<Schedule>;
  /** Create a schedule. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    scheduleName: string,
    parameters: ScheduleCreateOrUpdateParameters,
    options?: ScheduleOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Schedule | undefined>;
  /** Retrieve the schedule identified by schedule name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    scheduleName: string,
    options?: ScheduleOperationsGetOptionalParams,
  ) => Promise<Schedule>;
}

function _getScheduleOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: ScheduleOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      scheduleName: string,
      options?: ScheduleOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, scheduleName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      scheduleName: string,
      parameters: ScheduleUpdateParameters,
      options?: ScheduleOperationsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, scheduleName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      scheduleName: string,
      parameters: ScheduleCreateOrUpdateParameters,
      options?: ScheduleOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        scheduleName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      scheduleName: string,
      options?: ScheduleOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, scheduleName, options),
  };
}

export function _getScheduleOperationsOperations(
  context: AutomationContext,
): ScheduleOperationsOperations {
  return {
    ..._getScheduleOperations(context),
  };
}
