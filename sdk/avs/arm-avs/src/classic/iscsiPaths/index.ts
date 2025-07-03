// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { IscsiPath } from "../../models/models.js";
import {
  IscsiPathsDeleteOptionalParams,
  IscsiPathsCreateOrUpdateOptionalParams,
  IscsiPathsGetOptionalParams,
  IscsiPathsListByPrivateCloudOptionalParams,
} from "../../api/iscsiPaths/options.js";
import {
  $delete,
  createOrUpdate,
  get,
  listByPrivateCloud,
} from "../../api/iscsiPaths/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IscsiPaths operations. */
export interface IscsiPathsOperations {
  /** Delete a IscsiPath */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: IscsiPathsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a IscsiPath */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    resource: IscsiPath,
    options?: IscsiPathsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IscsiPath>, IscsiPath>;
  /** Get a IscsiPath */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: IscsiPathsGetOptionalParams,
  ) => Promise<IscsiPath>;
  /** List IscsiPath resources by PrivateCloud */
  listByPrivateCloud: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: IscsiPathsListByPrivateCloudOptionalParams,
  ) => PagedAsyncIterableIterator<IscsiPath>;
}

function _getIscsiPaths(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: IscsiPathsDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, privateCloudName, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      resource: IscsiPath,
      options?: IscsiPathsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, apiVersion, resourceGroupName, privateCloudName, resource, options),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: IscsiPathsGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, privateCloudName, options),
    listByPrivateCloud: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: IscsiPathsListByPrivateCloudOptionalParams,
    ) => listByPrivateCloud(context, apiVersion, resourceGroupName, privateCloudName, options),
  };
}

export function _getIscsiPathsOperations(
  context: AzureVMwareSolutionAPIContext,
): IscsiPathsOperations {
  return {
    ..._getIscsiPaths(context),
  };
}
