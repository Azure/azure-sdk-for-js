// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext } from "../../api/kubernetesRuntimeContext.js";
import {
  StorageClassGetOptionalParams,
  StorageClassCreateOrUpdateOptionalParams,
  StorageClassUpdateOptionalParams,
  StorageClassDeleteOptionalParams,
  StorageClassListOptionalParams,
} from "../../api/options.js";
import {
  storageClassGet,
  storageClassCreateOrUpdate,
  storageClassUpdate,
  storageClassDelete,
  storageClassList,
} from "../../api/storageClass/index.js";
import {
  StorageClassResource,
  StorageClassResourceUpdate,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageClass operations. */
export interface StorageClassOperations {
  /** Get a StorageClassResource */
  get: (
    resourceUri: string,
    storageClassName: string,
    options?: StorageClassGetOptionalParams,
  ) => Promise<StorageClassResource>;
  /** Create a StorageClassResource */
  createOrUpdate: (
    resourceUri: string,
    storageClassName: string,
    resource: StorageClassResource,
    options?: StorageClassCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
  /** Update a StorageClassResource */
  update: (
    resourceUri: string,
    storageClassName: string,
    properties: StorageClassResourceUpdate,
    options?: StorageClassUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
  /** Delete a StorageClassResource */
  delete: (
    resourceUri: string,
    storageClassName: string,
    options?: StorageClassDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List StorageClassResource resources by parent */
  list: (
    resourceUri: string,
    options?: StorageClassListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageClassResource>;
}

export function getStorageClass(context: KubernetesRuntimeContext) {
  return {
    get: (
      resourceUri: string,
      storageClassName: string,
      options?: StorageClassGetOptionalParams,
    ) => storageClassGet(context, resourceUri, storageClassName, options),
    createOrUpdate: (
      resourceUri: string,
      storageClassName: string,
      resource: StorageClassResource,
      options?: StorageClassCreateOrUpdateOptionalParams,
    ) =>
      storageClassCreateOrUpdate(
        context,
        resourceUri,
        storageClassName,
        resource,
        options,
      ),
    update: (
      resourceUri: string,
      storageClassName: string,
      properties: StorageClassResourceUpdate,
      options?: StorageClassUpdateOptionalParams,
    ) =>
      storageClassUpdate(
        context,
        resourceUri,
        storageClassName,
        properties,
        options,
      ),
    delete: (
      resourceUri: string,
      storageClassName: string,
      options?: StorageClassDeleteOptionalParams,
    ) => storageClassDelete(context, resourceUri, storageClassName, options),
    list: (resourceUri: string, options?: StorageClassListOptionalParams) =>
      storageClassList(context, resourceUri, options),
  };
}

export function getStorageClassOperations(
  context: KubernetesRuntimeContext,
): StorageClassOperations {
  return {
    ...getStorageClass(context),
  };
}
