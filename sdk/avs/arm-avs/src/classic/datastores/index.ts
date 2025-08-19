// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { Datastore } from "../../models/models.js";
import {
  DatastoresDeleteOptionalParams,
  DatastoresCreateOrUpdateOptionalParams,
  DatastoresGetOptionalParams,
  DatastoresListOptionalParams,
} from "../../api/datastores/options.js";
import { $delete, createOrUpdate, get, list } from "../../api/datastores/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Datastores operations. */
export interface DatastoresOperations {
  /** Delete a Datastore */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    datastoreName: string,
    options?: DatastoresDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Datastore */
  createOrUpdate: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    datastoreName: string,
    datastore: Datastore,
    options?: DatastoresCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Datastore>, Datastore>;
  /** Get a Datastore */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    datastoreName: string,
    options?: DatastoresGetOptionalParams,
  ) => Promise<Datastore>;
  /** List Datastore resources by Cluster */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    options?: DatastoresListOptionalParams,
  ) => PagedAsyncIterableIterator<Datastore>;
}

function _getDatastores(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      datastoreName: string,
      options?: DatastoresDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateCloudName, clusterName, datastoreName, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      datastoreName: string,
      datastore: Datastore,
      options?: DatastoresCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateCloudName,
        clusterName,
        datastoreName,
        datastore,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      datastoreName: string,
      options?: DatastoresGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, clusterName, datastoreName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      options?: DatastoresListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, clusterName, options),
  };
}

export function _getDatastoresOperations(
  context: AzureVMwareSolutionAPIContext,
): DatastoresOperations {
  return {
    ..._getDatastores(context),
  };
}
