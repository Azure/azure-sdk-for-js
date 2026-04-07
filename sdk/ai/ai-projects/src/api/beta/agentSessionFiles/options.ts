// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaAgentSessionFilesDeleteOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
  /** Whether to recursively delete directory contents. Defaults to false. */
  recursive?: boolean;
}

/** Optional parameters. */
export interface BetaAgentSessionFilesListOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentSessionFilesDownloadOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentSessionFilesUploadOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
}
