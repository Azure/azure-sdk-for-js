// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listByParent,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/externalSvms/operations.js";
import type {
  ExternalSvmsListByParentOptionalParams,
  ExternalSvmsDeleteOptionalParams,
  ExternalSvmsUpdateOptionalParams,
  ExternalSvmsCreateOrUpdateOptionalParams,
  ExternalSvmsGetOptionalParams,
} from "../../api/externalSvms/options.js";
import type { ExternalSvm, ExternalSvmTagsUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExternalSvms operations. */
export interface ExternalSvmsOperations {
  /** List all External SVMs under an External Cluster */
  listByParent: (
    resourceGroupName: string,
    externalClusterName: string,
    options?: ExternalSvmsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ExternalSvm>;
  /** Delete the specified External SVM */
  delete: (
    resourceGroupName: string,
    externalClusterName: string,
    externalSvmName: string,
    options?: ExternalSvmsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified External SVM */
  update: (
    resourceGroupName: string,
    externalClusterName: string,
    externalSvmName: string,
    properties: ExternalSvmTagsUpdate,
    options?: ExternalSvmsUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalSvm>, ExternalSvm>;
  /** Create or update the specified External SVM */
  createOrUpdate: (
    resourceGroupName: string,
    externalClusterName: string,
    externalSvmName: string,
    resource: ExternalSvm,
    options?: ExternalSvmsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalSvm>, ExternalSvm>;
  /** Get the External SVM resource */
  get: (
    resourceGroupName: string,
    externalClusterName: string,
    externalSvmName: string,
    options?: ExternalSvmsGetOptionalParams,
  ) => Promise<ExternalSvm>;
}

function _getExternalSvms(context: NetAppManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      externalClusterName: string,
      options?: ExternalSvmsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, externalClusterName, options),
    delete: (
      resourceGroupName: string,
      externalClusterName: string,
      externalSvmName: string,
      options?: ExternalSvmsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, externalClusterName, externalSvmName, options),
    update: (
      resourceGroupName: string,
      externalClusterName: string,
      externalSvmName: string,
      properties: ExternalSvmTagsUpdate,
      options?: ExternalSvmsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, externalClusterName, externalSvmName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      externalClusterName: string,
      externalSvmName: string,
      resource: ExternalSvm,
      options?: ExternalSvmsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        externalClusterName,
        externalSvmName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      externalClusterName: string,
      externalSvmName: string,
      options?: ExternalSvmsGetOptionalParams,
    ) => get(context, resourceGroupName, externalClusterName, externalSvmName, options),
  };
}

export function _getExternalSvmsOperations(
  context: NetAppManagementContext,
): ExternalSvmsOperations {
  return {
    ..._getExternalSvms(context),
  };
}
