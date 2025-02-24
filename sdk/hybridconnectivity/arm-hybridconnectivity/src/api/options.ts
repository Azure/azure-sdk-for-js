// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ListCredentialsRequest, ListIngressGatewayCredentialsRequest } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SolutionTypesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionTypesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionTypesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InventoryListBySolutionConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InventoryGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionConfigurationsSyncNowOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionConfigurationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionConfigurationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionConfigurationsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionConfigurationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicCloudConnectorsTestPermissionsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicCloudConnectorsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicCloudConnectorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicCloudConnectorsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicCloudConnectorsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicCloudConnectorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicCloudConnectorsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GenerateAwsTemplatePostOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceConfigurationsListByEndpointResourceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ServiceConfigurationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceConfigurationsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceConfigurationsCreateOrupdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceConfigurationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointsListManagedProxyDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointsListIngressGatewayCredentialsOptionalParams extends OperationOptions {
  /** The is how long the endpoint access token is valid (in seconds). */
  expiresin?: number;
  /** Object of type ListIngressGatewayCredentialsRequest */
  listIngressGatewayCredentialsRequest?: ListIngressGatewayCredentialsRequest;
}

/** Optional parameters. */
export interface EndpointsListCredentialsOptionalParams extends OperationOptions {
  /** The is how long the endpoint access token is valid (in seconds). */
  expiresin?: number;
  /** Object of type ListCredentialsRequest */
  listCredentialsRequest?: ListCredentialsRequest;
}

/** Optional parameters. */
export interface EndpointsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}
