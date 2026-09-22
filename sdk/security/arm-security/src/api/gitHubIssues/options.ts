// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IssueCreationRequest } from "../../models/securityConnectorsDevOpsAPI/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GitHubIssuesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request model containing details for creating the GitHub issue. */
  createIssueRequest?: IssueCreationRequest;
}
