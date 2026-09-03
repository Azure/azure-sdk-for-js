// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  move,
  listByHybridRunbookWorkerGroup,
  $delete,
  patch,
  create,
  get,
} from "../../api/hybridRunbookWorkers/operations.js";
import type {
  HybridRunbookWorkersMoveOptionalParams,
  HybridRunbookWorkersListByHybridRunbookWorkerGroupOptionalParams,
  HybridRunbookWorkersDeleteOptionalParams,
  HybridRunbookWorkersPatchOptionalParams,
  HybridRunbookWorkersCreateOptionalParams,
  HybridRunbookWorkersGetOptionalParams,
} from "../../api/hybridRunbookWorkers/options.js";
import type {
  HybridRunbookWorker,
  HybridRunbookWorkerCreateParameters,
  HybridRunbookWorkerMoveParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HybridRunbookWorkers operations. */
export interface HybridRunbookWorkersOperations {
  /** Move a hybrid worker to a different group. */
  move: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    hybridRunbookWorkerId: string,
    hybridRunbookWorkerMoveParameters: HybridRunbookWorkerMoveParameters,
    options?: HybridRunbookWorkersMoveOptionalParams,
  ) => Promise<void>;
  /** Retrieve a list of hybrid runbook workers. */
  listByHybridRunbookWorkerGroup: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    options?: HybridRunbookWorkersListByHybridRunbookWorkerGroupOptionalParams,
  ) => PagedAsyncIterableIterator<HybridRunbookWorker>;
  /** Delete a hybrid runbook worker. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    hybridRunbookWorkerId: string,
    options?: HybridRunbookWorkersDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a hybrid runbook worker. */
  patch: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    hybridRunbookWorkerId: string,
    options?: HybridRunbookWorkersPatchOptionalParams,
  ) => Promise<HybridRunbookWorker>;
  /** Create a hybrid runbook worker. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    hybridRunbookWorkerId: string,
    hybridRunbookWorkerCreationParameters: HybridRunbookWorkerCreateParameters,
    options?: HybridRunbookWorkersCreateOptionalParams,
  ) => Promise<HybridRunbookWorker>;
  /** Retrieve a hybrid runbook worker. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    hybridRunbookWorkerGroupName: string,
    hybridRunbookWorkerId: string,
    options?: HybridRunbookWorkersGetOptionalParams,
  ) => Promise<HybridRunbookWorker>;
}

function _getHybridRunbookWorkers(context: AutomationContext) {
  return {
    move: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      hybridRunbookWorkerId: string,
      hybridRunbookWorkerMoveParameters: HybridRunbookWorkerMoveParameters,
      options?: HybridRunbookWorkersMoveOptionalParams,
    ) =>
      move(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        hybridRunbookWorkerId,
        hybridRunbookWorkerMoveParameters,
        options,
      ),
    listByHybridRunbookWorkerGroup: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      options?: HybridRunbookWorkersListByHybridRunbookWorkerGroupOptionalParams,
    ) =>
      listByHybridRunbookWorkerGroup(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      hybridRunbookWorkerId: string,
      options?: HybridRunbookWorkersDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        hybridRunbookWorkerId,
        options,
      ),
    patch: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      hybridRunbookWorkerId: string,
      options?: HybridRunbookWorkersPatchOptionalParams,
    ) =>
      patch(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        hybridRunbookWorkerId,
        options,
      ),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      hybridRunbookWorkerId: string,
      hybridRunbookWorkerCreationParameters: HybridRunbookWorkerCreateParameters,
      options?: HybridRunbookWorkersCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        hybridRunbookWorkerId,
        hybridRunbookWorkerCreationParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      hybridRunbookWorkerGroupName: string,
      hybridRunbookWorkerId: string,
      options?: HybridRunbookWorkersGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        automationAccountName,
        hybridRunbookWorkerGroupName,
        hybridRunbookWorkerId,
        options,
      ),
  };
}

export function _getHybridRunbookWorkersOperations(
  context: AutomationContext,
): HybridRunbookWorkersOperations {
  return {
    ..._getHybridRunbookWorkers(context),
  };
}
