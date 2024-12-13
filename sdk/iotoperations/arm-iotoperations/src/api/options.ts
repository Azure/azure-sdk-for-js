// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InstanceGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InstanceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InstanceUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InstanceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InstanceListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface InstanceListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface BrokerGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BrokerCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BrokerDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BrokerListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface BrokerListenerGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BrokerListenerCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BrokerListenerDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BrokerListenerListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface BrokerAuthenticationGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface BrokerAuthenticationCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BrokerAuthenticationDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BrokerAuthenticationListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface BrokerAuthorizationGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface BrokerAuthorizationCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BrokerAuthorizationDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BrokerAuthorizationListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataflowProfileGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataflowProfileCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataflowProfileDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataflowProfileListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataflowGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataflowCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataflowDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataflowListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DataflowEndpointGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataflowEndpointCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataflowEndpointDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataflowEndpointListByResourceGroupOptionalParams
  extends OperationOptions {}
