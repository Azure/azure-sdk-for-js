// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaAgentInvocationsCancelOptionalParams extends OperationOptions {
  /** Optional content type of the request body. */
  contentType?: string;
  /** Optional request body. */
  request?: any;
}

/** Optional parameters. */
export interface BetaAgentInvocationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentInvocationsCreateOptionalParams extends OperationOptions {
  /** Optional session ID returned by the session CRUD APIs to reuse an existing sandbox. If not provided, a new session ID will be auto-generated. */
  agentSessionId?: string;
}

/** Optional parameters. */
export interface GetOpenApiSpecOptionalParams extends OperationOptions {}
