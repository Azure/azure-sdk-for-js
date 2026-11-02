// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaAgentsCreateFromPromptOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "DraftAgents=V1Preview";
}
