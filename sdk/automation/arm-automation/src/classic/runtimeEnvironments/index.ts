// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  create,
  get,
} from "../../api/runtimeEnvironments/operations.js";
import type {
  RuntimeEnvironmentsListByAutomationAccountOptionalParams,
  RuntimeEnvironmentsDeleteOptionalParams,
  RuntimeEnvironmentsUpdateOptionalParams,
  RuntimeEnvironmentsCreateOptionalParams,
  RuntimeEnvironmentsGetOptionalParams,
} from "../../api/runtimeEnvironments/options.js";
import type {
  RuntimeEnvironment,
  RuntimeEnvironmentUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RuntimeEnvironments operations. */
export interface RuntimeEnvironmentsOperations {
  /** Retrieve a list of RuntimeEnvironments. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: RuntimeEnvironmentsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<RuntimeEnvironment>;
  /** Delete the Runtime Environment. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    runtimeEnvironmentName: string,
    options?: RuntimeEnvironmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an Runtime Environment. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    runtimeEnvironmentName: string,
    parameters: RuntimeEnvironmentUpdateParameters,
    options?: RuntimeEnvironmentsUpdateOptionalParams,
  ) => Promise<RuntimeEnvironment>;
  /** Create or update Runtime Environment */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    runtimeEnvironmentName: string,
    parameters: RuntimeEnvironment,
    options?: RuntimeEnvironmentsCreateOptionalParams,
  ) => Promise<RuntimeEnvironment>;
  /** Get information about the Runtime Environment */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    runtimeEnvironmentName: string,
    options?: RuntimeEnvironmentsGetOptionalParams,
  ) => Promise<RuntimeEnvironment>;
}

function _getRuntimeEnvironments(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: RuntimeEnvironmentsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      runtimeEnvironmentName: string,
      options?: RuntimeEnvironmentsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, automationAccountName, runtimeEnvironmentName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      runtimeEnvironmentName: string,
      parameters: RuntimeEnvironmentUpdateParameters,
      options?: RuntimeEnvironmentsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        automationAccountName,
        runtimeEnvironmentName,
        parameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      runtimeEnvironmentName: string,
      parameters: RuntimeEnvironment,
      options?: RuntimeEnvironmentsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        automationAccountName,
        runtimeEnvironmentName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      runtimeEnvironmentName: string,
      options?: RuntimeEnvironmentsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, runtimeEnvironmentName, options),
  };
}

export function _getRuntimeEnvironmentsOperations(
  context: AutomationContext,
): RuntimeEnvironmentsOperations {
  return {
    ..._getRuntimeEnvironments(context),
  };
}
