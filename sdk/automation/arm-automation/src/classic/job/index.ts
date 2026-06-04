// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  resume,
  stop,
  suspend,
  getRunbookContent,
  getOutput,
  create,
  get,
  listByAutomationAccount,
} from "../../api/job/operations.js";
import type {
  JobResumeOptionalParams,
  JobStopOptionalParams,
  JobSuspendOptionalParams,
  JobGetRunbookContentOptionalParams,
  JobGetOutputOptionalParams,
  JobCreateOptionalParams,
  JobGetOptionalParams,
  JobListByAutomationAccountOptionalParams,
} from "../../api/job/options.js";
import type {
  JobCollectionItem,
  Job,
  JobCreateParameters,
  JobGetRunbookContentResponse,
  JobGetOutputResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Job operations. */
export interface JobOperations {
  /** Resume the job identified by jobName. */
  resume: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobResumeOptionalParams,
  ) => Promise<void>;
  /** Stop the job identified by jobName. */
  stop: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobStopOptionalParams,
  ) => Promise<void>;
  /** Suspend the job identified by job name. */
  suspend: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobSuspendOptionalParams,
  ) => Promise<void>;
  /** Retrieve the runbook content of the job identified by job name. */
  getRunbookContent: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobGetRunbookContentOptionalParams,
  ) => Promise<JobGetRunbookContentResponse>;
  /** Retrieve the job output identified by job name. */
  getOutput: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobGetOutputOptionalParams,
  ) => Promise<JobGetOutputResponse>;
  /** Create a job of the runbook. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    parameters: JobCreateParameters,
    options?: JobCreateOptionalParams,
  ) => Promise<Job>;
  /** Retrieve the job identified by job name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobGetOptionalParams,
  ) => Promise<Job>;
  /** Retrieve a list of jobs. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: JobListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<JobCollectionItem>;
}

function _getJob(context: AutomationContext) {
  return {
    resume: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobResumeOptionalParams,
    ) => resume(context, resourceGroupName, automationAccountName, jobName, options),
    stop: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobStopOptionalParams,
    ) => stop(context, resourceGroupName, automationAccountName, jobName, options),
    suspend: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobSuspendOptionalParams,
    ) => suspend(context, resourceGroupName, automationAccountName, jobName, options),
    getRunbookContent: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobGetRunbookContentOptionalParams,
    ) => getRunbookContent(context, resourceGroupName, automationAccountName, jobName, options),
    getOutput: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobGetOutputOptionalParams,
    ) => getOutput(context, resourceGroupName, automationAccountName, jobName, options),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      parameters: JobCreateParameters,
      options?: JobCreateOptionalParams,
    ) => create(context, resourceGroupName, automationAccountName, jobName, parameters, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, jobName, options),
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: JobListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getJobOperations(context: AutomationContext): JobOperations {
  return {
    ..._getJob(context),
  };
}
