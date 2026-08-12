// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  create,
  get,
} from "../../api/hybridRunbookWorkerGroupOperations/operations.js";
import type {
  HybridRunbookWorkerGroupOperationsListByAutomationAccountOptionalParams,
  HybridRunbookWorkerGroupOperationsDeleteOptionalParams,
  HybridRunbookWorkerGroupOperationsUpdateOptionalParams,
  HybridRunbookWorkerGroupOperationsCreateOptionalParams,
  HybridRunbookWorkerGroupOperationsGetOptionalParams,
} from "../../api/hybridRunbookWorkerGroupOperations/options.js";
import type {
  HybridRunbookWorkerGroup,
  HybridRunbookWorkerGroupCreateOrUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HybridRunbookWorkerGroupOperations operations. */
export interface HybridRunbookWorkerGroupOperationsOperations {
  /** Retrieve a list of hybrid runbook worker groups. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: HybridRunbookWorkerGroupOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<HybridRunbookWorkerGroup>;
  /** Delete a hybrid runbook worker group. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    options?: HybridRunbookWorkerGroupOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a hybrid runbook worker group. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    hybridRunbookWorkerGroupUpdationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
    options?: HybridRunbookWorkerGroupOperationsUpdateOptionalParams,
  ) => Promise<HybridRunbookWorkerGroup>;
  /** Create a hybrid runbook worker group. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    hybridRunbookWorkerGroupCreationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
    options?: HybridRunbookWorkerGroupOperationsCreateOptionalParams,
  ) => Promise<HybridRunbookWorkerGroup>;
  /** Retrieve a hybrid runbook worker group. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    options?: HybridRunbookWorkerGroupOperationsGetOptionalParams,
  ) => Promise<HybridRunbookWorkerGroup>;
}

function _getHybridRunbookWorkerGroupOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: HybridRunbookWorkerGroupOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      options?: HybridRunbookWorkerGroupOperationsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        options,
      ),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      hybridRunbookWorkerGroupUpdationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
      options?: HybridRunbookWorkerGroupOperationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        hybridRunbookWorkerGroupUpdationParameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      hybridRunbookWorkerGroupCreationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
      options?: HybridRunbookWorkerGroupOperationsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        hybridRunbookWorkerGroupCreationParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      options?: HybridRunbookWorkerGroupOperationsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, automationAccountName, hybridRunbookWorkerGroupName, options),
  };
}

export function _getHybridRunbookWorkerGroupOperationsOperations(
  context: AutomationContext,
): HybridRunbookWorkerGroupOperationsOperations {
  return {
    ..._getHybridRunbookWorkerGroupOperations(context),
  };
}
