// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/sourceControlOperations/operations.js";
import type {
  SourceControlOperationsListByAutomationAccountOptionalParams,
  SourceControlOperationsDeleteOptionalParams,
  SourceControlOperationsUpdateOptionalParams,
  SourceControlOperationsCreateOrUpdateOptionalParams,
  SourceControlOperationsGetOptionalParams,
} from "../../api/sourceControlOperations/options.js";
import type {
  SourceControl,
  SourceControlCreateOrUpdateParameters,
  SourceControlUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SourceControlOperations operations. */
export interface SourceControlOperationsOperations {
  /** Retrieve a list of source controls. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: SourceControlOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<SourceControl>;
  /** Delete the source control. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    options?: SourceControlOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a source control. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    parameters: SourceControlUpdateParameters,
    options?: SourceControlOperationsUpdateOptionalParams,
  ) => Promise<SourceControl>;
  /** Create a source control. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    parameters: SourceControlCreateOrUpdateParameters,
    options?: SourceControlOperationsCreateOrUpdateOptionalParams,
  ) => Promise<SourceControl>;
  /** Retrieve the source control identified by source control name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    options?: SourceControlOperationsGetOptionalParams,
  ) => Promise<SourceControl>;
}

function _getSourceControlOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: SourceControlOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      options?: SourceControlOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, sourceControlName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      parameters: SourceControlUpdateParameters,
      options?: SourceControlOperationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        automationAccountName,
        sourceControlName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      parameters: SourceControlCreateOrUpdateParameters,
      options?: SourceControlOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        sourceControlName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      options?: SourceControlOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, sourceControlName, options),
  };
}

export function _getSourceControlOperationsOperations(
  context: AutomationContext,
): SourceControlOperationsOperations {
  return {
    ..._getSourceControlOperations(context),
  };
}
