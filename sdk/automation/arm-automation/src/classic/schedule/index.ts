// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/schedule/operations.js";
import type {
  ScheduleListByAutomationAccountOptionalParams,
  ScheduleDeleteOptionalParams,
  ScheduleUpdateOptionalParams,
  ScheduleCreateOrUpdateOptionalParams,
  ScheduleGetOptionalParams,
} from "../../api/schedule/options.js";
import type {
  Schedule,
  ScheduleCreateOrUpdateParameters,
  ScheduleUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Schedule operations. */
export interface ScheduleOperations {
  /** Retrieve a list of schedules. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: ScheduleListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Schedule>;
  /** Delete the schedule identified by schedule name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    scheduleName: string,
    options?: ScheduleDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the schedule identified by schedule name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    scheduleName: string,
    parameters: ScheduleUpdateParameters,
    options?: ScheduleUpdateOptionalParams,
  ) => Promise<Schedule>;
  /** Create a schedule. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    scheduleName: string,
    parameters: ScheduleCreateOrUpdateParameters,
    options?: ScheduleCreateOrUpdateOptionalParams,
  ) => Promise<Schedule | undefined>;
  /** Retrieve the schedule identified by schedule name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    scheduleName: string,
    options?: ScheduleGetOptionalParams,
  ) => Promise<Schedule>;
}

function _getSchedule(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: ScheduleListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      scheduleName: string,
      options?: ScheduleDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, scheduleName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      scheduleName: string,
      parameters: ScheduleUpdateParameters,
      options?: ScheduleUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, automationAccountName, scheduleName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      scheduleName: string,
      parameters: ScheduleCreateOrUpdateParameters,
      options?: ScheduleCreateOrUpdateOptionalParams,
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
      options?: ScheduleGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, scheduleName, options),
  };
}

export function _getScheduleOperations(context: AutomationContext): ScheduleOperations {
  return {
    ..._getSchedule(context),
  };
}
