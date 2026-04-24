// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IntegrationRuntimesCreateLinkedIntegrationRuntimeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesRemoveLinksOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesUpgradeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesGetMonitoringDataOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesSyncCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IntegrationRuntimesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IntegrationRuntimesListAuthKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesRegenerateAuthKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesGetConnectionInfoOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesGetStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesListByFactoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IntegrationRuntimesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the integration runtime entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface IntegrationRuntimesGetOptionalParams extends OperationOptions {
  /** ETag of the integration runtime entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned. */
  ifNoneMatch?: string;
}
