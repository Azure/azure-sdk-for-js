// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  create,
  get,
} from "../../api/jobScheduleOperations/operations.js";
import type {
  JobScheduleOperationsListByAutomationAccountOptionalParams,
  JobScheduleOperationsDeleteOptionalParams,
  JobScheduleOperationsCreateOptionalParams,
  JobScheduleOperationsGetOptionalParams,
} from "../../api/jobScheduleOperations/options.js";
import type { JobSchedule, JobScheduleCreateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobScheduleOperations operations. */
export interface JobScheduleOperationsOperations {
  /** Retrieve a list of job schedules. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: JobScheduleOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<JobSchedule>;
  /** Delete the job schedule identified by job schedule name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    jobScheduleId: string,
    options?: JobScheduleOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a job schedule. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    jobScheduleId: string,
    parameters: JobScheduleCreateParameters,
    options?: JobScheduleOperationsCreateOptionalParams,
  ) => Promise<JobSchedule>;
  /** Retrieve the job schedule identified by job schedule name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    jobScheduleId: string,
    options?: JobScheduleOperationsGetOptionalParams,
  ) => Promise<JobSchedule>;
}

function _getJobScheduleOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: JobScheduleOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      jobScheduleId: string,
      options?: JobScheduleOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, jobScheduleId, options),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      jobScheduleId: string,
      parameters: JobScheduleCreateParameters,
      options?: JobScheduleOperationsCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, automationAccountName, jobScheduleId, parameters, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      jobScheduleId: string,
      options?: JobScheduleOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, jobScheduleId, options),
  };
}

export function _getJobScheduleOperationsOperations(
  context: AutomationContext,
): JobScheduleOperationsOperations {
  return {
    ..._getJobScheduleOperations(context),
  };
}
