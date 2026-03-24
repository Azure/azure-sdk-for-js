// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/featurestoreEntityVersions/operations.js";
import type {
  FeaturestoreEntityVersionsListOptionalParams,
  FeaturestoreEntityVersionsDeleteOptionalParams,
  FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
  FeaturestoreEntityVersionsGetOptionalParams,
} from "../../api/featurestoreEntityVersions/options.js";
import type { FeaturestoreEntityVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FeaturestoreEntityVersions operations. */
export interface FeaturestoreEntityVersionsOperations {
  /** List versions. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturestoreEntityVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<FeaturestoreEntityVersion>;
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
    options?: FeaturestoreEntityVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturestoreEntityVersion,
    options?: FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FeaturestoreEntityVersion>, FeaturestoreEntityVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturestoreEntityVersionsGetOptionalParams,
  ) => Promise<FeaturestoreEntityVersion>;
}

function _getFeaturestoreEntityVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturestoreEntityVersionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, name, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturestoreEntityVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, version, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturestoreEntityVersion,
      options?: FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, version, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturestoreEntityVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, version, options),
  };
}

export function _getFeaturestoreEntityVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): FeaturestoreEntityVersionsOperations {
  return {
    ..._getFeaturestoreEntityVersions(context),
  };
}
