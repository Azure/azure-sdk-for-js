// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext } from "../../api/kubernetesRuntimeContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/storageClass/operations.js";
import {
  StorageClassListOptionalParams,
  StorageClassDeleteOptionalParams,
  StorageClassUpdateOptionalParams,
  StorageClassCreateOrUpdateOptionalParams,
  StorageClassGetOptionalParams,
} from "../../api/storageClass/options.js";
import { StorageClassResource, StorageClassResourceUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageClass operations. */
export interface StorageClassOperations {
  /** List StorageClassResource resources by parent */
  list: (
    resourceUri: string,
    options?: StorageClassListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageClassResource>;
  /** Delete a StorageClassResource */
  delete: (
    resourceUri: string,
    storageClassName: string,
    options?: StorageClassDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a StorageClassResource */
  update: (
    resourceUri: string,
    storageClassName: string,
    properties: StorageClassResourceUpdate,
    options?: StorageClassUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
  /** Create a StorageClassResource */
  createOrUpdate: (
    resourceUri: string,
    storageClassName: string,
    resource: StorageClassResource,
    options?: StorageClassCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
  /** Get a StorageClassResource */
  get: (
    resourceUri: string,
    storageClassName: string,
    options?: StorageClassGetOptionalParams,
  ) => Promise<StorageClassResource>;
}

function _getStorageClass(context: KubernetesRuntimeContext) {
  return {
    list: (resourceUri: string, options?: StorageClassListOptionalParams) =>
      list(context, resourceUri, options),
    delete: (
      resourceUri: string,
      storageClassName: string,
      options?: StorageClassDeleteOptionalParams,
    ) => $delete(context, resourceUri, storageClassName, options),
    update: (
      resourceUri: string,
      storageClassName: string,
      properties: StorageClassResourceUpdate,
      options?: StorageClassUpdateOptionalParams,
    ) => update(context, resourceUri, storageClassName, properties, options),
    createOrUpdate: (
      resourceUri: string,
      storageClassName: string,
      resource: StorageClassResource,
      options?: StorageClassCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceUri, storageClassName, resource, options),
    get: (resourceUri: string, storageClassName: string, options?: StorageClassGetOptionalParams) =>
      get(context, resourceUri, storageClassName, options),
  };
}

export function _getStorageClassOperations(
  context: KubernetesRuntimeContext,
): StorageClassOperations {
  return {
    ..._getStorageClass(context),
  };
}
