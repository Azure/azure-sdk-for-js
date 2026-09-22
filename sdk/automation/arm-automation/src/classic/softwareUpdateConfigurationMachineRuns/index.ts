// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { list, getById } from "../../api/softwareUpdateConfigurationMachineRuns/operations.js";
import type {
  SoftwareUpdateConfigurationMachineRunsListOptionalParams,
  SoftwareUpdateConfigurationMachineRunsGetByIdOptionalParams,
} from "../../api/softwareUpdateConfigurationMachineRuns/options.js";
import type {
  SoftwareUpdateConfigurationMachineRun,
  SoftwareUpdateConfigurationMachineRunListResult,
} from "../../models/models.js";

/** Interface representing a SoftwareUpdateConfigurationMachineRuns operations. */
export interface SoftwareUpdateConfigurationMachineRunsOperations {
  /** Return list of software update configuration machine runs */
  list: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: SoftwareUpdateConfigurationMachineRunsListOptionalParams,
  ) => Promise<SoftwareUpdateConfigurationMachineRunListResult>;
  /** Get a single software update configuration machine run by Id. */
  getById: (
    resourceGroupName: string,
    automationAccountName: string,
    softwareUpdateConfigurationMachineRunId: string,
    options?: SoftwareUpdateConfigurationMachineRunsGetByIdOptionalParams,
  ) => Promise<SoftwareUpdateConfigurationMachineRun>;
}

function _getSoftwareUpdateConfigurationMachineRuns(context: AutomationContext) {
  return {
    list: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: SoftwareUpdateConfigurationMachineRunsListOptionalParams,
    ) => list(context, resourceGroupName, automationAccountName, options),
    getById: (
      resourceGroupName: string,
      automationAccountName: string,
      softwareUpdateConfigurationMachineRunId: string,
      options?: SoftwareUpdateConfigurationMachineRunsGetByIdOptionalParams,
    ) =>
      getById(
        context,
        resourceGroupName,
        automationAccountName,
        softwareUpdateConfigurationMachineRunId,
        options,
      ),
  };
}

export function _getSoftwareUpdateConfigurationMachineRunsOperations(
  context: AutomationContext,
): SoftwareUpdateConfigurationMachineRunsOperations {
  return {
    ..._getSoftwareUpdateConfigurationMachineRuns(context),
  };
}
