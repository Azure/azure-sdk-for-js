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
} from "../../api/dscConfigurationOperations/operations.js";
import type {
  DscConfigurationOperationsGetContentOptionalParams,
  DscConfigurationOperationsListByAutomationAccountOptionalParams,
  DscConfigurationOperationsDeleteOptionalParams,
  DscConfigurationOperationsUpdateOptionalParams,
  DscConfigurationOperationsCreateOrUpdateOptionalParams,
  DscConfigurationOperationsGetOptionalParams,
} from "../../api/dscConfigurationOperations/options.js";
import type {
  DscConfiguration,
  DscConfigurationCreateOrUpdateParameters,
  DscConfigurationOperationsGetContentResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DscConfigurationOperations operations. */
export interface DscConfigurationOperationsOperations {
  /** Retrieve the configuration script identified by configuration name. */
  getContent: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    options?: DscConfigurationOperationsGetContentOptionalParams,
  ) => Promise<DscConfigurationOperationsGetContentResponse>;
  /** Retrieve a list of configurations. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: DscConfigurationOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<DscConfiguration>;
  /** Delete the dsc configuration identified by configuration name. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    options?: DscConfigurationOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create the configuration identified by configuration name. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    options?: DscConfigurationOperationsUpdateOptionalParams,
  ) => Promise<DscConfiguration>;
  /** Create the configuration identified by configuration name. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    parameters: DscConfigurationCreateOrUpdateParameters,
    options?: DscConfigurationOperationsCreateOrUpdateOptionalParams,
  ) => Promise<DscConfiguration>;
  /** Retrieve the configuration identified by configuration name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    configurationName: string,
    options?: DscConfigurationOperationsGetOptionalParams,
  ) => Promise<DscConfiguration>;
}

function _getDscConfigurationOperations(context: AutomationContext) {
  return {
    getContent: (
      resourceGroupName: string,
      automationAccountName: string,
      configurationName: string,
      options?: DscConfigurationOperationsGetContentOptionalParams,
    ) => getContent(context, resourceGroupName, automationAccountName, configurationName, options),
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: DscConfigurationOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      configurationName: string,
      options?: DscConfigurationOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, configurationName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      configurationName: string,
      options?: DscConfigurationOperationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, automationAccountName, configurationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      configurationName: string,
      parameters: DscConfigurationCreateOrUpdateParameters,
      options?: DscConfigurationOperationsCreateOrUpdateOptionalParams,
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
      options?: DscConfigurationOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, configurationName, options),
  };
}

export function _getDscConfigurationOperationsOperations(
  context: AutomationContext,
): DscConfigurationOperationsOperations {
  return {
    ..._getDscConfigurationOperations(context),
  };
}
