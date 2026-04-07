// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  revalidate,
  listByServer,
  createOrUpdate,
  get,
} from "../../api/encryptionProtectors/operations.js";
import type {
  EncryptionProtectorsRevalidateOptionalParams,
  EncryptionProtectorsListByServerOptionalParams,
  EncryptionProtectorsCreateOrUpdateOptionalParams,
  EncryptionProtectorsGetOptionalParams,
} from "../../api/encryptionProtectors/options.js";
import type { EncryptionProtector, EncryptionProtectorName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EncryptionProtectors operations. */
export interface EncryptionProtectorsOperations {
  /** Revalidates an existing encryption protector. */
  revalidate: (
    resourceGroupName: string,
    serverName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: EncryptionProtectorsRevalidateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use revalidate instead */
  beginRevalidate: (
    resourceGroupName: string,
    serverName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: EncryptionProtectorsRevalidateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use revalidate instead */
  beginRevalidateAndWait: (
    resourceGroupName: string,
    serverName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: EncryptionProtectorsRevalidateOptionalParams,
  ) => Promise<void>;
  /** Gets a list of server encryption protectors */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: EncryptionProtectorsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<EncryptionProtector>;
  /** Updates an existing encryption protector. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    encryptionProtectorName: EncryptionProtectorName,
    parameters: EncryptionProtector,
    options?: EncryptionProtectorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EncryptionProtector>, EncryptionProtector>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    encryptionProtectorName: EncryptionProtectorName,
    parameters: EncryptionProtector,
    options?: EncryptionProtectorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EncryptionProtector>, EncryptionProtector>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    encryptionProtectorName: EncryptionProtectorName,
    parameters: EncryptionProtector,
    options?: EncryptionProtectorsCreateOrUpdateOptionalParams,
  ) => Promise<EncryptionProtector>;
  /** Gets a server encryption protector. */
  get: (
    resourceGroupName: string,
    serverName: string,
    encryptionProtectorName: EncryptionProtectorName,
    options?: EncryptionProtectorsGetOptionalParams,
  ) => Promise<EncryptionProtector>;
}

function _getEncryptionProtectors(context: SqlContext) {
  return {
    revalidate: (
      resourceGroupName: string,
      serverName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: EncryptionProtectorsRevalidateOptionalParams,
    ) => revalidate(context, resourceGroupName, serverName, encryptionProtectorName, options),
    beginRevalidate: async (
      resourceGroupName: string,
      serverName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: EncryptionProtectorsRevalidateOptionalParams,
    ) => {
      const poller = revalidate(
        context,
        resourceGroupName,
        serverName,
        encryptionProtectorName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRevalidateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: EncryptionProtectorsRevalidateOptionalParams,
    ) => {
      return await revalidate(
        context,
        resourceGroupName,
        serverName,
        encryptionProtectorName,
        options,
      );
    },
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: EncryptionProtectorsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      encryptionProtectorName: EncryptionProtectorName,
      parameters: EncryptionProtector,
      options?: EncryptionProtectorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        encryptionProtectorName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      encryptionProtectorName: EncryptionProtectorName,
      parameters: EncryptionProtector,
      options?: EncryptionProtectorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        encryptionProtectorName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      encryptionProtectorName: EncryptionProtectorName,
      parameters: EncryptionProtector,
      options?: EncryptionProtectorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        encryptionProtectorName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      encryptionProtectorName: EncryptionProtectorName,
      options?: EncryptionProtectorsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, encryptionProtectorName, options),
  };
}

export function _getEncryptionProtectorsOperations(
  context: SqlContext,
): EncryptionProtectorsOperations {
  return {
    ..._getEncryptionProtectors(context),
  };
}
