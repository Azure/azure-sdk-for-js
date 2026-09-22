// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { getPurgeStatus, purge } from "../../api/workspacePurge/operations.js";
import {
  WorkspacePurgeGetPurgeStatusOptionalParams,
  WorkspacePurgePurgeOptionalParams,
} from "../../api/workspacePurge/options.js";
import {
  WorkspacePurgeBody,
  WorkspacePurgeResponse,
  WorkspacePurgeStatusResponse,
} from "../../models/models.js";

/** Interface representing a WorkspacePurge operations. */
export interface WorkspacePurgeOperations {
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
