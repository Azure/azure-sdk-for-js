// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  backfill,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/featuresetVersions/operations.js";
import type {
  FeaturesetVersionsBackfillOptionalParams,
  FeaturesetVersionsListOptionalParams,
  FeaturesetVersionsDeleteOptionalParams,
  FeaturesetVersionsCreateOrUpdateOptionalParams,
  FeaturesetVersionsGetOptionalParams,
} from "../../api/featuresetVersions/options.js";
import type {
  FeaturesetVersion,
  FeaturesetVersionBackfillRequest,
  FeaturesetVersionBackfillResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FeaturesetVersions operations. */
export interface FeaturesetVersionsOperations {
  /** Backfill. */
  backfill: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturesetVersionBackfillRequest,
    options?: FeaturesetVersionsBackfillOptionalParams,
  ) => PollerLike<
    OperationState<FeaturesetVersionBackfillResponse>,
    FeaturesetVersionBackfillResponse
  >;
  /** List versions. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturesetVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<FeaturesetVersion>;
  /** Delete version. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturesetVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturesetVersion,
    options?: FeaturesetVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FeaturesetVersion>, FeaturesetVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturesetVersionsGetOptionalParams,
  ) => Promise<FeaturesetVersion>;
}

function _getFeaturesetVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    backfill: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturesetVersionBackfillRequest,
      options?: FeaturesetVersionsBackfillOptionalParams,
    ) => backfill(context, resourceGroupName, workspaceName, name, version, body, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturesetVersionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, name, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturesetVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, version, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturesetVersion,
      options?: FeaturesetVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, version, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturesetVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, version, options),
  };
}

export function _getFeaturesetVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): FeaturesetVersionsOperations {
  return {
    ..._getFeaturesetVersions(context),
  };
}
