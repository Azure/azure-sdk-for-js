// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listLabelHistory,
  deleteLabelHistory,
  getLabelHistory,
} from "../../api/containerAppsLabelHistory/operations.js";
import type {
  ContainerAppsLabelHistoryListLabelHistoryOptionalParams,
  ContainerAppsLabelHistoryDeleteLabelHistoryOptionalParams,
  ContainerAppsLabelHistoryGetLabelHistoryOptionalParams,
} from "../../api/containerAppsLabelHistory/options.js";
import type { LabelHistory } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsLabelHistory operations. */
export interface ContainerAppsLabelHistoryOperations {
  /** Lists the label revision histories for a Container App. */
  listLabelHistory: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsLabelHistoryListLabelHistoryOptionalParams,
  ) => PagedAsyncIterableIterator<LabelHistory>;
  /** Deletes the revision history associated with a Container App label. */
  deleteLabelHistory: (
    resourceGroupName: string,
    containerAppName: string,
    labelName: string,
    options?: ContainerAppsLabelHistoryDeleteLabelHistoryOptionalParams,
  ) => Promise<void>;
  /** Gets the revision history associated with a Container App label. */
  getLabelHistory: (
    resourceGroupName: string,
    containerAppName: string,
    labelName: string,
    options?: ContainerAppsLabelHistoryGetLabelHistoryOptionalParams,
  ) => Promise<LabelHistory>;
}

function _getContainerAppsLabelHistory(context: ContainerAppsAPIContext) {
  return {
    listLabelHistory: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsLabelHistoryListLabelHistoryOptionalParams,
    ) => listLabelHistory(context, resourceGroupName, containerAppName, options),
    deleteLabelHistory: (
      resourceGroupName: string,
      containerAppName: string,
      labelName: string,
      options?: ContainerAppsLabelHistoryDeleteLabelHistoryOptionalParams,
    ) => deleteLabelHistory(context, resourceGroupName, containerAppName, labelName, options),
    getLabelHistory: (
      resourceGroupName: string,
      containerAppName: string,
      labelName: string,
      options?: ContainerAppsLabelHistoryGetLabelHistoryOptionalParams,
    ) => getLabelHistory(context, resourceGroupName, containerAppName, labelName, options),
  };
}

export function _getContainerAppsLabelHistoryOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsLabelHistoryOperations {
  return {
    ..._getContainerAppsLabelHistory(context),
  };
}
