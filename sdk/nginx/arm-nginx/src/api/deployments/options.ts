// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxDeployment, NginxDeploymentUpdateParameters } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeploymentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeploymentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeploymentsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The Nginx deployment update parameters */
  body?: NginxDeploymentUpdateParameters;
}

/** Optional parameters. */
export interface DeploymentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The Nginx deployment */
  body?: NginxDeployment;
}

/** Optional parameters. */
export interface DeploymentsGetOptionalParams extends OperationOptions {}
