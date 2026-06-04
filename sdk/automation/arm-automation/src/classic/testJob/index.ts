// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { suspend, stop, resume, get, create } from "../../api/testJob/operations.js";
import type {
  TestJobSuspendOptionalParams,
  TestJobStopOptionalParams,
  TestJobResumeOptionalParams,
  TestJobGetOptionalParams,
  TestJobCreateOptionalParams,
} from "../../api/testJob/options.js";
import type { TestJobCreateParameters, TestJob } from "../../models/models.js";

/** Interface representing a TestJob operations. */
export interface TestJobOperations {
  /** Suspend the test job. */
  suspend: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: TestJobSuspendOptionalParams,
  ) => Promise<void>;
  /** Stop the test job. */
  stop: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: TestJobStopOptionalParams,
  ) => Promise<void>;
  /** Resume the test job. */
  resume: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: TestJobResumeOptionalParams,
  ) => Promise<void>;
  /** Retrieve the test job for the specified runbook. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: TestJobGetOptionalParams,
  ) => Promise<TestJob>;
  /** Create a test job of the runbook. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    parameters: TestJobCreateParameters,
    options?: TestJobCreateOptionalParams,
  ) => Promise<TestJob>;
}

function _getTestJob(context: AutomationContext) {
  return {
    suspend: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: TestJobSuspendOptionalParams,
    ) => suspend(context, resourceGroupName, automationAccountName, runbookName, options),
    stop: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: TestJobStopOptionalParams,
    ) => stop(context, resourceGroupName, automationAccountName, runbookName, options),
    resume: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: TestJobResumeOptionalParams,
    ) => resume(context, resourceGroupName, automationAccountName, runbookName, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: TestJobGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, runbookName, options),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      parameters: TestJobCreateParameters,
      options?: TestJobCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, automationAccountName, runbookName, parameters, options),
  };
}

export function _getTestJobOperations(context: AutomationContext): TestJobOperations {
  return {
    ..._getTestJob(context),
  };
}
