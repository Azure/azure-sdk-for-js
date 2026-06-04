// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  create,
  get,
} from "../../api/hybridRunbookWorkerGroup/operations.js";
import type {
  HybridRunbookWorkerGroupListByAutomationAccountOptionalParams,
  HybridRunbookWorkerGroupDeleteOptionalParams,
  HybridRunbookWorkerGroupUpdateOptionalParams,
  HybridRunbookWorkerGroupCreateOptionalParams,
  HybridRunbookWorkerGroupGetOptionalParams,
} from "../../api/hybridRunbookWorkerGroup/options.js";
import type {
  HybridRunbookWorkerGroup,
  HybridRunbookWorkerGroupCreateOrUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HybridRunbookWorkerGroup operations. */
export interface HybridRunbookWorkerGroupOperations {
  /** Retrieve a list of hybrid runbook worker groups. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: HybridRunbookWorkerGroupListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<HybridRunbookWorkerGroup>;
  /** Delete a hybrid runbook worker group. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    options?: HybridRunbookWorkerGroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a hybrid runbook worker group. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    hybridRunbookWorkerGroupUpdationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
    options?: HybridRunbookWorkerGroupUpdateOptionalParams,
  ) => Promise<HybridRunbookWorkerGroup>;
  /** Create a hybrid runbook worker group. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    hybridRunbookWorkerGroupCreationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
    options?: HybridRunbookWorkerGroupCreateOptionalParams,
  ) => Promise<HybridRunbookWorkerGroup>;
  /** Retrieve a hybrid runbook worker group. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    options?: HybridRunbookWorkerGroupGetOptionalParams,
  ) => Promise<HybridRunbookWorkerGroup>;
}

function _getHybridRunbookWorkerGroup(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: HybridRunbookWorkerGroupListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      options?: HybridRunbookWorkerGroupDeleteOptionalParams,
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
      options?: HybridRunbookWorkerGroupUpdateOptionalParams,
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
      options?: HybridRunbookWorkerGroupCreateOptionalParams,
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
      options?: HybridRunbookWorkerGroupGetOptionalParams,
    ) =>
      get(context, resourceGroupName, automationAccountName, hybridRunbookWorkerGroupName, options),
  };
}

export function _getHybridRunbookWorkerGroupOperations(
  context: AutomationContext,
): HybridRunbookWorkerGroupOperations {
  return {
    ..._getHybridRunbookWorkerGroup(context),
  };
}
