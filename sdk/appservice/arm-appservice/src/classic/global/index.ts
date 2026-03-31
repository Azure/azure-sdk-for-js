// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  getSubscriptionOperationWithAsyncResponse,
  getDeletedWebAppSnapshots,
  getDeletedWebApp,
} from "../../api/global/operations.js";
import type {
  GlobalGetSubscriptionOperationWithAsyncResponseOptionalParams,
  GlobalGetDeletedWebAppSnapshotsOptionalParams,
  GlobalGetDeletedWebAppOptionalParams,
} from "../../api/global/options.js";
import type { Snapshot, DeletedSite } from "../../models/models.js";

/** Interface representing a Global operations. */
export interface GlobalOperations {
  /** Description for Gets an operation in a subscription and given region */
  getSubscriptionOperationWithAsyncResponse: (
    location: string,
    operationId: string,
    options?: GlobalGetSubscriptionOperationWithAsyncResponseOptionalParams,
  ) => Promise<void>;
  /** Description for Get all deleted apps for a subscription. */
  getDeletedWebAppSnapshots: (
    deletedSiteId: string,
    options?: GlobalGetDeletedWebAppSnapshotsOptionalParams,
  ) => Promise<Snapshot[]>;
  /** Description for Get deleted app for a subscription. */
  getDeletedWebApp: (
    deletedSiteId: string,
    options?: GlobalGetDeletedWebAppOptionalParams,
  ) => Promise<DeletedSite>;
}

function _getGlobal(context: WebSiteManagementContext) {
  return {
    getSubscriptionOperationWithAsyncResponse: (
      location: string,
      operationId: string,
      options?: GlobalGetSubscriptionOperationWithAsyncResponseOptionalParams,
    ) => getSubscriptionOperationWithAsyncResponse(context, location, operationId, options),
    getDeletedWebAppSnapshots: (
      deletedSiteId: string,
      options?: GlobalGetDeletedWebAppSnapshotsOptionalParams,
    ) => getDeletedWebAppSnapshots(context, deletedSiteId, options),
    getDeletedWebApp: (deletedSiteId: string, options?: GlobalGetDeletedWebAppOptionalParams) =>
      getDeletedWebApp(context, deletedSiteId, options),
  };
}

export function _getGlobalOperations(context: WebSiteManagementContext): GlobalOperations {
  return {
    ..._getGlobal(context),
  };
}
