// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { purgeLakeData, getPurgeStatus, purge } from "../../api/workspacePurge/operations.js";
import type {
  WorkspacePurgePurgeLakeDataOptionalParams,
  WorkspacePurgeGetPurgeStatusOptionalParams,
  WorkspacePurgePurgeOptionalParams,
} from "../../api/workspacePurge/options.js";
import type {
  WorkspacePurgeBody,
  WorkspacePurgeResponse,
  WorkspacePurgeStatusResponse,
  WorkspacePurgeLakeDataBody,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkspacePurge operations. */
export interface WorkspacePurgeOperations {
  /**
   * Purges data lake data in a Log Analytics workspace for a table over a specified time range.
   *
   * This operation deletes data lake data (Auxiliary tables, or Analytics tables mirrored to the data lake) for the specified table within the given time range. The operation is long-running; poll the URL returned in the Azure-AsyncOperation response header to track its status.
   */
  purgeLakeData: (
    resourceGroupName: string,
    workspaceName: string,
    body: WorkspacePurgeLakeDataBody,
    options?: WorkspacePurgePurgeLakeDataOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purgeLakeData instead */
  beginPurgeLakeData: (
    resourceGroupName: string,
    workspaceName: string,
    body: WorkspacePurgeLakeDataBody,
    options?: WorkspacePurgePurgeLakeDataOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purgeLakeData instead */
  beginPurgeLakeDataAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    body: WorkspacePurgeLakeDataBody,
    options?: WorkspacePurgePurgeLakeDataOptionalParams,
  ) => Promise<void>;
  /** Gets status of an ongoing purge operation. */
  getPurgeStatus: (
    resourceGroupName: string,
    workspaceName: string,
    purgeId: string,
    options?: WorkspacePurgeGetPurgeStatusOptionalParams,
  ) => Promise<WorkspacePurgeStatusResponse>;
  /**
   * Purges data in an Log Analytics workspace by a set of user-defined filters.
   *
   * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
   * Log Analytics only supports purge operations required for compliance with GDPR. The Log Analytics product team reserves the right to reject requests for purge operations that are not for the purpose of GDPR compliance. In the event of a dispute, please create a support ticket
   */
  purge: (
    resourceGroupName: string,
    workspaceName: string,
    body: WorkspacePurgeBody,
    options?: WorkspacePurgePurgeOptionalParams,
  ) => Promise<WorkspacePurgeResponse>;
}
function _getWorkspacePurge(context: OperationalInsightsManagementContext) {
  return {
    purgeLakeData: (
      resourceGroupName: string,
      workspaceName: string,
      body: WorkspacePurgeLakeDataBody,
      options?: WorkspacePurgePurgeLakeDataOptionalParams,
    ) => purgeLakeData(context, resourceGroupName, workspaceName, body, options),
    beginPurgeLakeData: async (
      resourceGroupName: string,
      workspaceName: string,
      body: WorkspacePurgeLakeDataBody,
      options?: WorkspacePurgePurgeLakeDataOptionalParams,
    ) => {
      const poller = purgeLakeData(context, resourceGroupName, workspaceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeLakeDataAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      body: WorkspacePurgeLakeDataBody,
      options?: WorkspacePurgePurgeLakeDataOptionalParams,
    ) => {
      return await purgeLakeData(context, resourceGroupName, workspaceName, body, options);
    },
    getPurgeStatus: (
      resourceGroupName: string,
      workspaceName: string,
      purgeId: string,
      options?: WorkspacePurgeGetPurgeStatusOptionalParams,
    ) => getPurgeStatus(context, resourceGroupName, workspaceName, purgeId, options),
    purge: (
      resourceGroupName: string,
      workspaceName: string,
      body: WorkspacePurgeBody,
      options?: WorkspacePurgePurgeOptionalParams,
    ) => purge(context, resourceGroupName, workspaceName, body, options),
  };
}
export function _getWorkspacePurgeOperations(
  context: OperationalInsightsManagementContext,
): WorkspacePurgeOperations {
  return {
    ..._getWorkspacePurge(context),
  };
}
