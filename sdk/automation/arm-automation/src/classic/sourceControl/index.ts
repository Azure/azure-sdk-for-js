// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/sourceControl/operations.js";
import type {
  SourceControlListByAutomationAccountOptionalParams,
  SourceControlDeleteOptionalParams,
  SourceControlUpdateOptionalParams,
  SourceControlCreateOrUpdateOptionalParams,
  SourceControlGetOptionalParams,
} from "../../api/sourceControl/options.js";
import type {
  SourceControl,
  SourceControlCreateOrUpdateParameters,
  SourceControlUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SourceControl operations. */
export interface SourceControlOperations {
  /** Retrieve a list of source controls. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: SourceControlListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<SourceControl>;
  /** Delete the source control. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    options?: SourceControlDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a source control. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    parameters: SourceControlUpdateParameters,
    options?: SourceControlUpdateOptionalParams,
  ) => Promise<SourceControl>;
  /** Create a source control. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    parameters: SourceControlCreateOrUpdateParameters,
    options?: SourceControlCreateOrUpdateOptionalParams,
  ) => Promise<SourceControl>;
  /** Retrieve the source control identified by source control name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    options?: SourceControlGetOptionalParams,
  ) => Promise<SourceControl>;
}

function _getSourceControl(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: SourceControlListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      options?: SourceControlDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, sourceControlName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      parameters: SourceControlUpdateParameters,
      options?: SourceControlUpdateOptionalParams,
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
      options?: SourceControlCreateOrUpdateOptionalParams,
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
      options?: SourceControlGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, sourceControlName, options),
  };
}

export function _getSourceControlOperations(context: AutomationContext): SourceControlOperations {
  return {
    ..._getSourceControl(context),
  };
}
