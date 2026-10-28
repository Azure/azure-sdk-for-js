// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext } from "../../api/durableTaskContext.js";
import {
  listByScheduler,
  $delete,
  createOrReplace,
  get,
} from "../../api/transparentDataEncryptions/operations.js";
import type {
  TransparentDataEncryptionsListBySchedulerOptionalParams,
  TransparentDataEncryptionsDeleteOptionalParams,
  TransparentDataEncryptionsCreateOrReplaceOptionalParams,
  TransparentDataEncryptionsGetOptionalParams,
} from "../../api/transparentDataEncryptions/options.js";
import type { TransparentDataEncryption } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TransparentDataEncryptions operations. */
export interface TransparentDataEncryptionsOperations {
  /** List Transparent Data Encryptions */
  listByScheduler: (
    resourceGroupName: string,
    schedulerName: string,
    options?: TransparentDataEncryptionsListBySchedulerOptionalParams,
  ) => PagedAsyncIterableIterator<TransparentDataEncryption>;
  /** Delete a Transparent Data Encryption */
  delete: (
    resourceGroupName: string,
    schedulerName: string,
    options?: TransparentDataEncryptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or Update a Transparent Data Encryption */
  createOrReplace: (
    resourceGroupName: string,
    schedulerName: string,
    resource: TransparentDataEncryption,
    options?: TransparentDataEncryptionsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<TransparentDataEncryption>, TransparentDataEncryption>;
  /** Get a Transparent Data Encryption */
  get: (
    resourceGroupName: string,
    schedulerName: string,
    options?: TransparentDataEncryptionsGetOptionalParams,
  ) => Promise<TransparentDataEncryption>;
}

function _getTransparentDataEncryptions(context: DurableTaskContext) {
  return {
    listByScheduler: (
      resourceGroupName: string,
      schedulerName: string,
      options?: TransparentDataEncryptionsListBySchedulerOptionalParams,
    ) => listByScheduler(context, resourceGroupName, schedulerName, options),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      options?: TransparentDataEncryptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schedulerName, options),
    createOrReplace: (
      resourceGroupName: string,
      schedulerName: string,
      resource: TransparentDataEncryption,
      options?: TransparentDataEncryptionsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, schedulerName, resource, options),
    get: (
      resourceGroupName: string,
      schedulerName: string,
      options?: TransparentDataEncryptionsGetOptionalParams,
    ) => get(context, resourceGroupName, schedulerName, options),
  };
}

export function _getTransparentDataEncryptionsOperations(
  context: DurableTaskContext,
): TransparentDataEncryptionsOperations {
  return {
    ..._getTransparentDataEncryptions(context),
  };
}
