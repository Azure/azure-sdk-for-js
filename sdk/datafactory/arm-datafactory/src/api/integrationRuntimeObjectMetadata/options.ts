// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GetSsisObjectMetadataRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IntegrationRuntimeObjectMetadataGetOptionalParams extends OperationOptions {
  /** The parameters for getting a SSIS object metadata. */
  getMetadataRequest?: GetSsisObjectMetadataRequest;
}

/** Optional parameters. */
export interface IntegrationRuntimeObjectMetadataRefreshOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
