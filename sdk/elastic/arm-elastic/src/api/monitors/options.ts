// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ElasticMonitorResource,
  ElasticMonitorResourceUpdateParameters,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MonitorsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Indicates whether to perform a soft delete. When set to true, the Azure resource (Liftr integration) only is deleted and not the Partner Cloud resource. When set to false (default), the resource is permanently deleted from both Azure and the Partner Cloud. */
  softDelete?: boolean;
}

/** Optional parameters. */
export interface MonitorsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Elastic resource model update parameters. */
  body?: ElasticMonitorResourceUpdateParameters;
}

/** Optional parameters. */
export interface MonitorsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Elastic monitor resource model */
  body?: ElasticMonitorResource;
}

/** Optional parameters. */
export interface MonitorsGetOptionalParams extends OperationOptions {}
