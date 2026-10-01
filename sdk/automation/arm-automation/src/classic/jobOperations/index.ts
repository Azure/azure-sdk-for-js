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
} from "../../api/jobOperations/operations.js";
import type {
  JobOperationsResumeOptionalParams,
  JobOperationsStopOptionalParams,
  JobOperationsSuspendOptionalParams,
  JobOperationsGetRunbookContentOptionalParams,
  JobOperationsGetOutputOptionalParams,
  JobOperationsCreateOptionalParams,
  JobOperationsGetOptionalParams,
  JobOperationsListByAutomationAccountOptionalParams,
} from "../../api/jobOperations/options.js";
import type {
  JobCollectionItem,
  Job,
  JobCreateParameters,
  JobOperationsGetRunbookContentResponse,
  JobOperationsGetOutputResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobOperations operations. */
export interface JobOperationsOperations {
  /** Resume the job identified by jobName. */
  resume: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobOperationsResumeOptionalParams,
  ) => Promise<void>;
  /** Stop the job identified by jobName. */
  stop: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobOperationsStopOptionalParams,
  ) => Promise<void>;
  /** Suspend the job identified by job name. */
  suspend: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobOperationsSuspendOptionalParams,
  ) => Promise<void>;
  /** Retrieve the runbook content of the job identified by job name. */
  getRunbookContent: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobOperationsGetRunbookContentOptionalParams,
  ) => Promise<JobOperationsGetRunbookContentResponse>;
  /** Retrieve the job output identified by job name. */
  getOutput: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobOperationsGetOutputOptionalParams,
  ) => Promise<JobOperationsGetOutputResponse>;
  /** Create a job of the runbook. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    parameters: JobCreateParameters,
    options?: JobOperationsCreateOptionalParams,
  ) => Promise<Job>;
  /** Retrieve the job identified by job name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    jobName: string,
    options?: JobOperationsGetOptionalParams,
  ) => Promise<Job>;
  /** Retrieve a list of jobs. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: JobOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<JobCollectionItem>;
}

function _getJobOperations(context: AutomationContext) {
  return {
    resume: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobOperationsResumeOptionalParams,
    ) => resume(context, resourceGroupName, automationAccountName, jobName, options),
    stop: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobOperationsStopOptionalParams,
    ) => stop(context, resourceGroupName, automationAccountName, jobName, options),
    suspend: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobOperationsSuspendOptionalParams,
    ) => suspend(context, resourceGroupName, automationAccountName, jobName, options),
    getRunbookContent: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobOperationsGetRunbookContentOptionalParams,
    ) => getRunbookContent(context, resourceGroupName, automationAccountName, jobName, options),
    getOutput: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobOperationsGetOutputOptionalParams,
    ) => getOutput(context, resourceGroupName, automationAccountName, jobName, options),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      parameters: JobCreateParameters,
      options?: JobOperationsCreateOptionalParams,
    ) => create(context, resourceGroupName, automationAccountName, jobName, parameters, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      jobName: string,
      options?: JobOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, jobName, options),
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: JobOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getJobOperationsOperations(context: AutomationContext): JobOperationsOperations {
  return {
    ..._getJobOperations(context),
  };
}
