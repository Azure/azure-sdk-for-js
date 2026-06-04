// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByAutomationAccount, $delete, create, get } from "../../api/jobSchedule/operations.js";
import type {
  JobScheduleListByAutomationAccountOptionalParams,
  JobScheduleDeleteOptionalParams,
  JobScheduleCreateOptionalParams,
  JobScheduleGetOptionalParams,
} from "../../api/jobSchedule/options.js";
import type { JobSchedule, JobScheduleCreateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobSchedule operations. */
export interface JobScheduleOperations {
  /** Retrieve a list of job schedules. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: JobScheduleListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<JobSchedule>;
  /** Delete the job schedule identified by job schedule name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    jobScheduleId: string,
    options?: JobScheduleDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a job schedule. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    jobScheduleId: string,
    parameters: JobScheduleCreateParameters,
    options?: JobScheduleCreateOptionalParams,
  ) => Promise<JobSchedule>;
  /** Retrieve the job schedule identified by job schedule name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    jobScheduleId: string,
    options?: JobScheduleGetOptionalParams,
  ) => Promise<JobSchedule>;
}

function _getJobSchedule(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: JobScheduleListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      jobScheduleId: string,
      options?: JobScheduleDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, jobScheduleId, options),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      jobScheduleId: string,
      parameters: JobScheduleCreateParameters,
      options?: JobScheduleCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, automationAccountName, jobScheduleId, parameters, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      jobScheduleId: string,
      options?: JobScheduleGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, jobScheduleId, options),
  };
}

export function _getJobScheduleOperations(context: AutomationContext): JobScheduleOperations {
  return {
    ..._getJobSchedule(context),
  };
}
