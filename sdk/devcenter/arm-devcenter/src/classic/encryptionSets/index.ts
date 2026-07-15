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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    options?: EncryptionSetsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    options?: EncryptionSetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates a devcenter encryption set. */
  update: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    body: EncryptionSetUpdate,
    options?: EncryptionSetsUpdateOptionalParams,
  ) => PollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    body: EncryptionSetUpdate,
    options?: EncryptionSetsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    body: EncryptionSetUpdate,
    options?: EncryptionSetsUpdateOptionalParams,
  ) => Promise<DevCenterEncryptionSet>;
  /** Creates or updates a devcenter encryption set resource. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    body: DevCenterEncryptionSet,
    options?: EncryptionSetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    body: DevCenterEncryptionSet,
    options?: EncryptionSetsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    encryptionSetName: string,
    body: DevCenterEncryptionSet,
    options?: EncryptionSetsCreateOrUpdateOptionalParams,
  ) => Promise<DevCenterEncryptionSet>;
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
    beginDelete: async (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      options?: EncryptionSetsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, devCenterName, encryptionSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      options?: EncryptionSetsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, devCenterName, encryptionSetName, options);
    },
    update: (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      body: EncryptionSetUpdate,
      options?: EncryptionSetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, devCenterName, encryptionSetName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      body: EncryptionSetUpdate,
      options?: EncryptionSetsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        devCenterName,
        encryptionSetName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      body: EncryptionSetUpdate,
      options?: EncryptionSetsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        devCenterName,
        encryptionSetName,
        body,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      body: DevCenterEncryptionSet,
      options?: EncryptionSetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, devCenterName, encryptionSetName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      body: DevCenterEncryptionSet,
      options?: EncryptionSetsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        encryptionSetName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      encryptionSetName: string,
      body: DevCenterEncryptionSet,
      options?: EncryptionSetsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        encryptionSetName,
        body,
        options,
      );
    },
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
