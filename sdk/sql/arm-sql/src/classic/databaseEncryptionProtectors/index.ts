// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { revert, revalidate } from "../../api/databaseEncryptionProtectors/operations.js";
import type {
  DatabaseEncryptionProtectorsRevertOptionalParams,
  DatabaseEncryptionProtectorsRevalidateOptionalParams,
} from "../../api/databaseEncryptionProtectors/options.js";
import type { EncryptionProtectorName } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabaseEncryptionProtectors operations. */
export interface DatabaseEncryptionProtectorsOperations {
  /** Reverts an existing encryption protector for a particular database. */
  revert: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: DatabaseEncryptionProtectorsRevertOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use revert instead */
  beginRevert: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: DatabaseEncryptionProtectorsRevertOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use revert instead */
  beginRevertAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: DatabaseEncryptionProtectorsRevertOptionalParams,
  ) => Promise<void>;
  /** Revalidates an existing encryption protector for a particular database. */
  revalidate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: DatabaseEncryptionProtectorsRevalidateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use revalidate instead */
  beginRevalidate: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: DatabaseEncryptionProtectorsRevalidateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use revalidate instead */
  beginRevalidateAndWait: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: DatabaseEncryptionProtectorsRevalidateOptionalParams,
  ) => Promise<void>;
}

function _getDatabaseEncryptionProtectors(context: SqlManagementContext) {
  return {
    revert: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: DatabaseEncryptionProtectorsRevertOptionalParams,
    ) =>
      revert(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        encryptionProtectorName,
        options,
      ),
    beginRevert: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: DatabaseEncryptionProtectorsRevertOptionalParams,
    ) => {
      const poller = revert(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        encryptionProtectorName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRevertAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: DatabaseEncryptionProtectorsRevertOptionalParams,
    ) => {
      return await revert(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        encryptionProtectorName,
        options,
      );
    },
    revalidate: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: DatabaseEncryptionProtectorsRevalidateOptionalParams,
    ) =>
      revalidate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        encryptionProtectorName,
        options,
      ),
    beginRevalidate: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: DatabaseEncryptionProtectorsRevalidateOptionalParams,
    ) => {
      const poller = revalidate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        encryptionProtectorName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRevalidateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: DatabaseEncryptionProtectorsRevalidateOptionalParams,
    ) => {
      return await revalidate(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        encryptionProtectorName,
        options,
      );
    },
  };
}

export function _getDatabaseEncryptionProtectorsOperations(
  context: SqlManagementContext,
): DatabaseEncryptionProtectorsOperations {
  return {
    ..._getDatabaseEncryptionProtectors(context),
  };
}
