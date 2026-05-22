// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listLabelHistory,
  deleteLabelHistory,
  getLabelHistory,
} from "../../api/containerAppsLabelHistory/operations.js";
import {
  ContainerAppsLabelHistoryListLabelHistoryOptionalParams,
  ContainerAppsLabelHistoryDeleteLabelHistoryOptionalParams,
  ContainerAppsLabelHistoryGetLabelHistoryOptionalParams,
} from "../../api/containerAppsLabelHistory/options.js";
import { LabelHistory } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsLabelHistory operations. */
export interface ContainerAppsLabelHistoryOperations {
  /** Get the Label History for a given Container App. */
  listLabelHistory: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsLabelHistoryListLabelHistoryOptionalParams,
  ) => PagedAsyncIterableIterator<LabelHistory>;
  /** Delete the history of a label. */
  deleteLabelHistory: (
    resourceGroupName: string,
    containerAppName: string,
    labelName: string,
    options?: ContainerAppsLabelHistoryDeleteLabelHistoryOptionalParams,
  ) => Promise<void>;
  /** Get the history of a label. */
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
