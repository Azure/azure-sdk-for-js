// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { publish, list, $delete, createOrUpdate, get } from "../../api/dataVersions/operations.js";
import type {
  DataVersionsPublishOptionalParams,
  DataVersionsListOptionalParams,
  DataVersionsDeleteOptionalParams,
  DataVersionsCreateOrUpdateOptionalParams,
  DataVersionsGetOptionalParams,
} from "../../api/dataVersions/options.js";
import type { DestinationAsset, DataVersionBase } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataVersions operations. */
export interface DataVersionsOperations {
  /** Publish version asset into registry. */
  publish: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DestinationAsset,
    options?: DataVersionsPublishOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List data versions in the data container */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: DataVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<DataVersionBase>;
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
    options?: DataVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DataVersionBase,
    options?: DataVersionsCreateOrUpdateOptionalParams,
  ) => Promise<DataVersionBase>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: DataVersionsGetOptionalParams,
  ) => Promise<DataVersionBase>;
}

function _getDataVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    publish: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: DestinationAsset,
      options?: DataVersionsPublishOptionalParams,
    ) => publish(context, resourceGroupName, workspaceName, name, version, body, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: DataVersionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, name, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: DataVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, version, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: DataVersionBase,
      options?: DataVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, version, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: DataVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, version, options),
  };
}

export function _getDataVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): DataVersionsOperations {
  return {
    ..._getDataVersions(context),
  };
}
