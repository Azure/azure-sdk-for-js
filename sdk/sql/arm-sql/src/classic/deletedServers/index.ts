// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { list, recover, listByLocation, get } from "../../api/deletedServers/operations.js";
import type {
  DeletedServersListOptionalParams,
  DeletedServersRecoverOptionalParams,
  DeletedServersListByLocationOptionalParams,
  DeletedServersGetOptionalParams,
} from "../../api/deletedServers/options.js";
import type { DeletedServer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeletedServers operations. */
export interface DeletedServersOperations {
  /** Gets a list of all deleted servers in a subscription. */
  list: (options?: DeletedServersListOptionalParams) => PagedAsyncIterableIterator<DeletedServer>;
  /** Recovers a deleted server. */
  recover: (
    locationName: string,
    deletedServerName: string,
    options?: DeletedServersRecoverOptionalParams,
  ) => PollerLike<OperationState<DeletedServer>, DeletedServer>;
  /** @deprecated use recover instead */
  beginRecover: (
    locationName: string,
    deletedServerName: string,
    options?: DeletedServersRecoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeletedServer>, DeletedServer>>;
  /** @deprecated use recover instead */
  beginRecoverAndWait: (
    locationName: string,
    deletedServerName: string,
    options?: DeletedServersRecoverOptionalParams,
  ) => Promise<DeletedServer>;
  /** Gets a list of deleted servers for a location. */
  listByLocation: (
    locationName: string,
    options?: DeletedServersListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedServer>;
  /** Gets a deleted server. */
  get: (
    locationName: string,
    deletedServerName: string,
    options?: DeletedServersGetOptionalParams,
  ) => Promise<DeletedServer>;
}

function _getDeletedServers(context: SqlManagementContext) {
  return {
    list: (options?: DeletedServersListOptionalParams) => list(context, options),
    recover: (
      locationName: string,
      deletedServerName: string,
      options?: DeletedServersRecoverOptionalParams,
    ) => recover(context, locationName, deletedServerName, options),
    beginRecover: async (
      locationName: string,
      deletedServerName: string,
      options?: DeletedServersRecoverOptionalParams,
    ) => {
      const poller = recover(context, locationName, deletedServerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRecoverAndWait: async (
      locationName: string,
      deletedServerName: string,
      options?: DeletedServersRecoverOptionalParams,
    ) => {
      return await recover(context, locationName, deletedServerName, options);
    },
    listByLocation: (locationName: string, options?: DeletedServersListByLocationOptionalParams) =>
      listByLocation(context, locationName, options),
    get: (
      locationName: string,
      deletedServerName: string,
      options?: DeletedServersGetOptionalParams,
    ) => get(context, locationName, deletedServerName, options),
  };
}

export function _getDeletedServersOperations(
  context: SqlManagementContext,
): DeletedServersOperations {
  return {
    ..._getDeletedServers(context),
  };
}
