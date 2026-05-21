// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CountQuery, Query } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ThreatIntelligenceQueryOptionalParams extends OperationOptions {
  /** The query to run on the TI objects in the workspace. */
  queryParameter?: Query;
}

/** Optional parameters. */
export interface ThreatIntelligenceCountOptionalParams extends OperationOptions {
  /** The query to run on the TI objects in the workspace. */
  query?: CountQuery;
}
