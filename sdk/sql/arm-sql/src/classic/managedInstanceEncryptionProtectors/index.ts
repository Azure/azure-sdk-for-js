// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  revalidate,
  listByInstance,
  createOrUpdate,
  get,
} from "../../api/managedInstanceEncryptionProtectors/operations.js";
import type {
  ManagedInstanceEncryptionProtectorsRevalidateOptionalParams,
  ManagedInstanceEncryptionProtectorsListByInstanceOptionalParams,
  ManagedInstanceEncryptionProtectorsCreateOrUpdateOptionalParams,
  ManagedInstanceEncryptionProtectorsGetOptionalParams,
} from "../../api/managedInstanceEncryptionProtectors/options.js";
import type {
  EncryptionProtectorName,
  ManagedInstanceEncryptionProtector,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstanceEncryptionProtectors operations. */
export interface ManagedInstanceEncryptionProtectorsOperations {
  /** Revalidates an existing encryption protector. */
  revalidate: (
    resourceGroupName: string,
    managedInstanceName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: ManagedInstanceEncryptionProtectorsRevalidateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use revalidate instead */
  beginRevalidate: (
    resourceGroupName: string,
    managedInstanceName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: ManagedInstanceEncryptionProtectorsRevalidateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use revalidate instead */
  beginRevalidateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: ManagedInstanceEncryptionProtectorsRevalidateOptionalParams,
  ) => Promise<void>;
  /** Gets a list of managed instance encryption protectors */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstanceEncryptionProtectorsListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceEncryptionProtector>;
  /** Updates an existing encryption protector. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    encryptionProtectorName: EncryptionProtectorName,
    parameters: ManagedInstanceEncryptionProtector,
    options?: ManagedInstanceEncryptionProtectorsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedInstanceEncryptionProtector>,
    ManagedInstanceEncryptionProtector
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    encryptionProtectorName: EncryptionProtectorName,
    parameters: ManagedInstanceEncryptionProtector,
    options?: ManagedInstanceEncryptionProtectorsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedInstanceEncryptionProtector>,
      ManagedInstanceEncryptionProtector
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    encryptionProtectorName: EncryptionProtectorName,
    parameters: ManagedInstanceEncryptionProtector,
    options?: ManagedInstanceEncryptionProtectorsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedInstanceEncryptionProtector>;
  /** Gets a managed instance encryption protector. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: ManagedInstanceEncryptionProtectorsGetOptionalParams,
  ) => Promise<ManagedInstanceEncryptionProtector>;
}

function _getManagedInstanceEncryptionProtectors(context: SqlContext) {
  return {
    revalidate: (
      resourceGroupName: string,
      managedInstanceName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: ManagedInstanceEncryptionProtectorsRevalidateOptionalParams,
    ) =>
      revalidate(context, resourceGroupName, managedInstanceName, encryptionProtectorName, options),
    beginRevalidate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: ManagedInstanceEncryptionProtectorsRevalidateOptionalParams,
    ) => {
      const poller = revalidate(
        context,
        resourceGroupName,
        managedInstanceName,
        encryptionProtectorName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRevalidateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: ManagedInstanceEncryptionProtectorsRevalidateOptionalParams,
    ) => {
      return await revalidate(
        context,
        resourceGroupName,
        managedInstanceName,
        encryptionProtectorName,
        options,
      );
    },
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstanceEncryptionProtectorsListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      encryptionProtectorName: EncryptionProtectorName,
      parameters: ManagedInstanceEncryptionProtector,
      options?: ManagedInstanceEncryptionProtectorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        encryptionProtectorName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      encryptionProtectorName: EncryptionProtectorName,
      parameters: ManagedInstanceEncryptionProtector,
      options?: ManagedInstanceEncryptionProtectorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        encryptionProtectorName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      encryptionProtectorName: EncryptionProtectorName,
      parameters: ManagedInstanceEncryptionProtector,
      options?: ManagedInstanceEncryptionProtectorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        encryptionProtectorName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: ManagedInstanceEncryptionProtectorsGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, encryptionProtectorName, options),
  };
}

export function _getManagedInstanceEncryptionProtectorsOperations(
  context: SqlContext,
): ManagedInstanceEncryptionProtectorsOperations {
  return {
    ..._getManagedInstanceEncryptionProtectors(context),
  };
}
