// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { suspend, stop, resume, get, create } from "../../api/testJobOperations/operations.js";
import type {
  TestJobOperationsSuspendOptionalParams,
  TestJobOperationsStopOptionalParams,
  TestJobOperationsResumeOptionalParams,
  TestJobOperationsGetOptionalParams,
  TestJobOperationsCreateOptionalParams,
} from "../../api/testJobOperations/options.js";
import type { TestJobCreateParameters, TestJob } from "../../models/models.js";

/** Interface representing a TestJobOperations operations. */
export interface TestJobOperationsOperations {
  /** Suspend the test job. */
  suspend: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: TestJobOperationsSuspendOptionalParams,
  ) => Promise<void>;
  /** Stop the test job. */
  stop: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: TestJobOperationsStopOptionalParams,
  ) => Promise<void>;
  /** Resume the test job. */
  resume: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: TestJobOperationsResumeOptionalParams,
  ) => Promise<void>;
  /** Retrieve the test job for the specified runbook. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: TestJobOperationsGetOptionalParams,
  ) => Promise<TestJob>;
  /** Create a test job of the runbook. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    parameters: TestJobCreateParameters,
    options?: TestJobOperationsCreateOptionalParams,
  ) => Promise<TestJob>;
}

function _getTestJobOperations(context: AutomationContext) {
  return {
    suspend: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: TestJobOperationsSuspendOptionalParams,
    ) => suspend(context, resourceGroupName, automationAccountName, runbookName, options),
    stop: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: TestJobOperationsStopOptionalParams,
    ) => stop(context, resourceGroupName, automationAccountName, runbookName, options),
    resume: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: TestJobOperationsResumeOptionalParams,
    ) => resume(context, resourceGroupName, automationAccountName, runbookName, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: TestJobOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, runbookName, options),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      parameters: TestJobCreateParameters,
      options?: TestJobOperationsCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, automationAccountName, runbookName, parameters, options),
  };
}

export function _getTestJobOperationsOperations(
  context: AutomationContext,
): TestJobOperationsOperations {
  return {
    ..._getTestJobOperations(context),
  };
}
