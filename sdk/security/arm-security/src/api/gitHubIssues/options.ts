// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityConnectorsDevOpsAPIIssueCreationRequest } from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GitHubIssuesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request model containing details for creating the GitHub issue. */
  createIssueRequest?: SecurityConnectorsDevOpsAPIIssueCreationRequest;
}
