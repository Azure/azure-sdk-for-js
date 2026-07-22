// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { list, getById } from "../../api/softwareUpdateConfigurationRuns/operations.js";
import type {
  SoftwareUpdateConfigurationRunsListOptionalParams,
  SoftwareUpdateConfigurationRunsGetByIdOptionalParams,
} from "../../api/softwareUpdateConfigurationRuns/options.js";
import type {
  SoftwareUpdateConfigurationRun,
  SoftwareUpdateConfigurationRunListResult,
} from "../../models/models.js";

/** Interface representing a SoftwareUpdateConfigurationRuns operations. */
export interface SoftwareUpdateConfigurationRunsOperations {
  /** Return list of software update configuration runs */
  list: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: SoftwareUpdateConfigurationRunsListOptionalParams,
  ) => Promise<SoftwareUpdateConfigurationRunListResult>;
  /** Get a single software update configuration Run by Id. */
  getById: (
    resourceGroupName: string,
    automationAccountName: string,
    softwareUpdateConfigurationRunId: string,
    options?: SoftwareUpdateConfigurationRunsGetByIdOptionalParams,
  ) => Promise<SoftwareUpdateConfigurationRun>;
}

function _getSoftwareUpdateConfigurationRuns(context: AutomationContext) {
  return {
    list: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: SoftwareUpdateConfigurationRunsListOptionalParams,
    ) => list(context, resourceGroupName, automationAccountName, options),
    getById: (
      resourceGroupName: string,
      automationAccountName: string,
      softwareUpdateConfigurationRunId: string,
      options?: SoftwareUpdateConfigurationRunsGetByIdOptionalParams,
    ) =>
      getById(
        context,
        resourceGroupName,
        automationAccountName,
        softwareUpdateConfigurationRunId,
        options,
      ),
  };
}

export function _getSoftwareUpdateConfigurationRunsOperations(
  context: AutomationContext,
): SoftwareUpdateConfigurationRunsOperations {
  return {
    ..._getSoftwareUpdateConfigurationRuns(context),
  };
}
