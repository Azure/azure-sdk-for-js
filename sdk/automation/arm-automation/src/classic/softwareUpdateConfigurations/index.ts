// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  list,
  $delete,
  create,
  getByName,
} from "../../api/softwareUpdateConfigurations/operations.js";
import type {
  SoftwareUpdateConfigurationsListOptionalParams,
  SoftwareUpdateConfigurationsDeleteOptionalParams,
  SoftwareUpdateConfigurationsCreateOptionalParams,
  SoftwareUpdateConfigurationsGetByNameOptionalParams,
} from "../../api/softwareUpdateConfigurations/options.js";
import type {
  SoftwareUpdateConfiguration,
  SoftwareUpdateConfigurationListResult,
} from "../../models/models.js";

/** Interface representing a SoftwareUpdateConfigurations operations. */
export interface SoftwareUpdateConfigurationsOperations {
  /** Get all software update configurations for the account. */
  list: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: SoftwareUpdateConfigurationsListOptionalParams,
  ) => Promise<SoftwareUpdateConfigurationListResult>;
  /** delete a specific software update configuration. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    softwareUpdateConfigurationName: string,
    options?: SoftwareUpdateConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a new software update configuration with the name given in the URI. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    softwareUpdateConfigurationName: string,
    parameters: SoftwareUpdateConfiguration,
    options?: SoftwareUpdateConfigurationsCreateOptionalParams,
  ) => Promise<SoftwareUpdateConfiguration>;
  /** Get a single software update configuration by name. */
  getByName: (
    resourceGroupName: string,
    automationAccountName: string,
    softwareUpdateConfigurationName: string,
    options?: SoftwareUpdateConfigurationsGetByNameOptionalParams,
  ) => Promise<SoftwareUpdateConfiguration>;
}

function _getSoftwareUpdateConfigurations(context: AutomationContext) {
  return {
    list: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: SoftwareUpdateConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      softwareUpdateConfigurationName: string,
      options?: SoftwareUpdateConfigurationsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        automationAccountName,
        softwareUpdateConfigurationName,
        options,
      ),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      softwareUpdateConfigurationName: string,
      parameters: SoftwareUpdateConfiguration,
      options?: SoftwareUpdateConfigurationsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        automationAccountName,
        softwareUpdateConfigurationName,
        parameters,
        options,
      ),
    getByName: (
      resourceGroupName: string,
      automationAccountName: string,
      softwareUpdateConfigurationName: string,
      options?: SoftwareUpdateConfigurationsGetByNameOptionalParams,
    ) =>
      getByName(
        context,
        resourceGroupName,
        automationAccountName,
        softwareUpdateConfigurationName,
        options,
      ),
  };
}

export function _getSoftwareUpdateConfigurationsOperations(
  context: AutomationContext,
): SoftwareUpdateConfigurationsOperations {
  return {
    ..._getSoftwareUpdateConfigurations(context),
  };
}
