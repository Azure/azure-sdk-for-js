// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByInstance,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedInstanceKeys/operations.js";
import type {
  ManagedInstanceKeysListByInstanceOptionalParams,
  ManagedInstanceKeysDeleteOptionalParams,
  ManagedInstanceKeysCreateOrUpdateOptionalParams,
  ManagedInstanceKeysGetOptionalParams,
} from "../../api/managedInstanceKeys/options.js";
import type { ManagedInstanceKey } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstanceKeys operations. */
export interface ManagedInstanceKeysOperations {
  /** Gets a list of managed instance keys. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstanceKeysListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceKey>;
  /** Deletes the managed instance key with the given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    keyName: string,
    options?: ManagedInstanceKeysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    keyName: string,
    options?: ManagedInstanceKeysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    keyName: string,
    options?: ManagedInstanceKeysDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a managed instance key. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    keyName: string,
    parameters: ManagedInstanceKey,
    options?: ManagedInstanceKeysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedInstanceKey>, ManagedInstanceKey>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    keyName: string,
    parameters: ManagedInstanceKey,
    options?: ManagedInstanceKeysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedInstanceKey>, ManagedInstanceKey>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    keyName: string,
    parameters: ManagedInstanceKey,
    options?: ManagedInstanceKeysCreateOrUpdateOptionalParams,
  ) => Promise<ManagedInstanceKey>;
  /** Gets a managed instance key. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    keyName: string,
    options?: ManagedInstanceKeysGetOptionalParams,
  ) => Promise<ManagedInstanceKey>;
}

function _getManagedInstanceKeys(context: SqlContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstanceKeysListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      keyName: string,
      options?: ManagedInstanceKeysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, managedInstanceName, keyName, options),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      keyName: string,
      options?: ManagedInstanceKeysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, managedInstanceName, keyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      keyName: string,
      options?: ManagedInstanceKeysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, managedInstanceName, keyName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      keyName: string,
      parameters: ManagedInstanceKey,
      options?: ManagedInstanceKeysCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, managedInstanceName, keyName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      keyName: string,
      parameters: ManagedInstanceKey,
      options?: ManagedInstanceKeysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        keyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      keyName: string,
      parameters: ManagedInstanceKey,
      options?: ManagedInstanceKeysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        keyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      keyName: string,
      options?: ManagedInstanceKeysGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, keyName, options),
  };
}

export function _getManagedInstanceKeysOperations(
  context: SqlContext,
): ManagedInstanceKeysOperations {
  return {
    ..._getManagedInstanceKeys(context),
  };
}
