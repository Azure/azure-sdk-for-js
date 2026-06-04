// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  getContent,
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dscConfiguration/operations.js";
import type {
  DscConfigurationGetContentOptionalParams,
  DscConfigurationListByAutomationAccountOptionalParams,
  DscConfigurationDeleteOptionalParams,
  DscConfigurationUpdateOptionalParams,
  DscConfigurationCreateOrUpdateOptionalParams,
  DscConfigurationGetOptionalParams,
} from "../../api/dscConfiguration/options.js";
import type {
  DscConfiguration,
  DscConfigurationCreateOrUpdateParameters,
  DscConfigurationGetContentResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DscConfiguration operations. */
export interface DscConfigurationOperations {
  /** Retrieve the configuration script identified by configuration name. */
  getContent: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    options?: DscConfigurationGetContentOptionalParams,
  ) => Promise<DscConfigurationGetContentResponse>;
  /** Retrieve a list of configurations. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: DscConfigurationListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<DscConfiguration>;
  /** Delete the dsc configuration identified by configuration name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    options?: DscConfigurationDeleteOptionalParams,
  ) => Promise<void>;
  /** Create the configuration identified by configuration name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    options?: DscConfigurationUpdateOptionalParams,
  ) => Promise<DscConfiguration>;
  /** Create the configuration identified by configuration name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    parameters: DscConfigurationCreateOrUpdateParameters,
    options?: DscConfigurationCreateOrUpdateOptionalParams,
  ) => Promise<DscConfiguration>;
  /** Retrieve the configuration identified by configuration name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    options?: DscConfigurationGetOptionalParams,
  ) => Promise<DscConfiguration>;
}

function _getDscConfiguration(context: AutomationContext) {
  return {
    getContent: (
      resourceGroupName: string,
      automationAccountName: string,
      configurationName: string,
      options?: DscConfigurationGetContentOptionalParams,
    ) => getContent(context, resourceGroupName, automationAccountName, configurationName, options),
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: DscConfigurationListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      configurationName: string,
      options?: DscConfigurationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, configurationName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      configurationName: string,
      options?: DscConfigurationUpdateOptionalParams,
    ) => update(context, resourceGroupName, automationAccountName, configurationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      configurationName: string,
      parameters: DscConfigurationCreateOrUpdateParameters,
      options?: DscConfigurationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        configurationName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      configurationName: string,
      options?: DscConfigurationGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, configurationName, options),
  };
}

export function _getDscConfigurationOperations(
  context: AutomationContext,
): DscConfigurationOperations {
  return {
    ..._getDscConfiguration(context),
  };
}
