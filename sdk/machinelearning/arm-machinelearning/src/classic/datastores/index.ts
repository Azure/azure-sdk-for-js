// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  listSecrets,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/datastores/operations.js";
import type {
  DatastoresListSecretsOptionalParams,
  DatastoresListOptionalParams,
  DatastoresDeleteOptionalParams,
  DatastoresCreateOrUpdateOptionalParams,
  DatastoresGetOptionalParams,
} from "../../api/datastores/options.js";
import type { Datastore, DatastoreSecretsUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Datastores operations. */
export interface DatastoresOperations {
  /** Get datastore secrets. */
  listSecrets: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: DatastoresListSecretsOptionalParams,
  ) => Promise<DatastoreSecretsUnion>;
  /** List datastores. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: DatastoresListOptionalParams,
  ) => PagedAsyncIterableIterator<Datastore>;
  /** Delete datastore. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: DatastoresDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update datastore. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: Datastore,
    options?: DatastoresCreateOrUpdateOptionalParams,
  ) => Promise<Datastore>;
  /** Get datastore. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: DatastoresGetOptionalParams,
  ) => Promise<Datastore>;
}

function _getDatastores(context: AzureMachineLearningServicesManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: DatastoresListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, workspaceName, name, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: DatastoresListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: DatastoresDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: Datastore,
      options?: DatastoresCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: DatastoresGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getDatastoresOperations(
  context: AzureMachineLearningServicesManagementContext,
): DatastoresOperations {
  return {
    ..._getDatastores(context),
  };
}
