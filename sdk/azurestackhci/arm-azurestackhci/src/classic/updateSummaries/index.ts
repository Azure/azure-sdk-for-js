// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { list, $delete, put, get } from "../../api/updateSummaries/operations.js";
import type {
  UpdateSummariesListOptionalParams,
  UpdateSummariesDeleteOptionalParams,
  UpdateSummariesPutOptionalParams,
  UpdateSummariesGetOptionalParams,
} from "../../api/updateSummaries/options.js";
import type { UpdateSummaries } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a UpdateSummaries operations. */
export interface UpdateSummariesOperations {
  /** List all Update summaries under the HCI cluster */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: UpdateSummariesListOptionalParams,
  ) => PagedAsyncIterableIterator<UpdateSummaries>;
  /** Delete Update Summaries */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: UpdateSummariesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Put Update summaries under the HCI cluster */
  put: (
    resourceGroupName: string,
    clusterName: string,
    updateLocationProperties: UpdateSummaries,
    options?: UpdateSummariesPutOptionalParams,
  ) => Promise<UpdateSummaries>;
  /** Get all Update summaries under the HCI cluster */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: UpdateSummariesGetOptionalParams,
  ) => Promise<UpdateSummaries>;
}

function _getUpdateSummaries(context: AzureStackHCIContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: UpdateSummariesListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: UpdateSummariesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    put: (
      resourceGroupName: string,
      clusterName: string,
      updateLocationProperties: UpdateSummaries,
      options?: UpdateSummariesPutOptionalParams,
    ) => put(context, resourceGroupName, clusterName, updateLocationProperties, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: UpdateSummariesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getUpdateSummariesOperations(
  context: AzureStackHCIContext,
): UpdateSummariesOperations {
  return {
    ..._getUpdateSummaries(context),
  };
}
