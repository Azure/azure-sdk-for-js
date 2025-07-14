// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ListCredentialsRequest,
  ListIngressGatewayCredentialsRequest,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

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
