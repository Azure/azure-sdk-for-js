// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClusterAssociationIfNoneMatch } from "../../models/microsoft/networkSecurity/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClusterAssociationsListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClusterAssociationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClusterAssociationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClusterAssociationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * Set to "*" when creating an association to require that the resource does
   * not already exist. The service returns 412 Precondition Failed when the
   * condition is not met.
   */
  ifNoneMatch?: ClusterAssociationIfNoneMatch;
}

/** Optional parameters. */
export interface ClusterAssociationsGetOptionalParams extends OperationOptions {}
