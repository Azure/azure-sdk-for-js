// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxDeploymentWafPolicy } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WafPolicyDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WafPolicyCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resource create parameters. */
  body?: NginxDeploymentWafPolicy;
}

/** Optional parameters. */
export interface WafPolicyGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WafPolicyListOptionalParams extends OperationOptions {}
