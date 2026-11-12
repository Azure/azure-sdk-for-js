// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { list, get } from "../../api/replicationEvents/operations.js";
import type {
  ReplicationEventsListOptionalParams,
  ReplicationEventsGetOptionalParams,
} from "../../api/replicationEvents/options.js";
import type { Event } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReplicationEvents operations. */
export interface ReplicationEventsOperations {
  /** Gets the list of Azure Site Recovery events for the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationEventsListOptionalParams,
  ) => PagedAsyncIterableIterator<Event>;
  /** The operation to get the details of an Azure Site recovery event. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    eventName: string,
    options?: ReplicationEventsGetOptionalParams,
  ) => Promise<Event>;
}

function _getReplicationEvents(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationEventsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      eventName: string,
      options?: ReplicationEventsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, eventName, options),
  };
}

export function _getReplicationEventsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationEventsOperations {
  return {
    ..._getReplicationEvents(context),
  };
}
