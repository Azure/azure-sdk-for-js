// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/encryptionSets/operations.js";
import type {
  EncryptionSetsListOptionalParams,
  EncryptionSetsDeleteOptionalParams,
  EncryptionSetsUpdateOptionalParams,
  EncryptionSetsCreateOrUpdateOptionalParams,
  EncryptionSetsGetOptionalParams,
} from "../../api/encryptionSets/options.js";
import type { DevCenterEncryptionSet, EncryptionSetUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EncryptionSets operations. */
export interface EncryptionSetsOperations {
  /** Lists all encryption sets in the devcenter. */
  list: (
    resourceGroupName: string,
    devCenterName: string,
    options?: EncryptionSetsListOptionalParams,
  ) => PagedAsyncIterableIterator<DevCenterEncryptionSet>;
  /** Deletes a devcenter encryption set. */
  delete: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    options?: EncryptionSetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Partially updates a devcenter encryption set. */
  update: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    body: EncryptionSetUpdate,
    options?: EncryptionSetsUpdateOptionalParams,
  ) => PollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet>;
  /** Creates or updates a devcenter encryption set resource. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    body: DevCenterEncryptionSet,
    options?: EncryptionSetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet>;
  /** Gets a devcenter encryption set. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    options?: EncryptionSetsGetOptionalParams,
  ) => Promise<DevCenterEncryptionSet>;
}

function _getEncryptionSets(context: DevCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      devCenterName: string,
      options?: EncryptionSetsListOptionalParams,
    ) => list(context, resourceGroupName, devCenterName, options),
    delete: (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      options?: EncryptionSetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, devCenterName, encryptionSetName, options),
    update: (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      body: EncryptionSetUpdate,
      options?: EncryptionSetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, devCenterName, encryptionSetName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      body: DevCenterEncryptionSet,
      options?: EncryptionSetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, devCenterName, encryptionSetName, body, options),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      options?: EncryptionSetsGetOptionalParams,
    ) => get(context, resourceGroupName, devCenterName, encryptionSetName, options),
  };
}

export function _getEncryptionSetsOperations(context: DevCenterContext): EncryptionSetsOperations {
  return {
    ..._getEncryptionSets(context),
  };
}
