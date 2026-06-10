// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  QueryTimeGrainType,
  ReplicaType,
  AggregationFunctionType,
  MetricType,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedInstancesListByInstancePoolOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}

/** Optional parameters. */
export interface ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstancesListByManagedInstanceOptionalParams extends OperationOptions {
  /** How many 'top queries' to return. Default is 5. */
  numberOfQueries?: number;
  /** Comma separated list of databases to be included into search. All DB's are included if this parameter is not specified. */
  databases?: string;
  /** Start time for observed period. */
  startTime?: string;
  /** End time for observed period. */
  endTime?: string;
  /** The time step to be used to summarize the metric values. Default value is PT1H */
  interval?: QueryTimeGrainType;
  /** Aggregation function to be used, default value is 'sum' */
  aggregationFunction?: AggregationFunctionType;
  /** Metric to be used for ranking top queries. Default is 'cpu' */
  observationMetric?: MetricType;
}

/** Optional parameters. */
export interface ManagedInstancesStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstancesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstancesRefreshStatusOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedInstancesFailoverOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The type of replica to be failed over. */
  replicaType?: ReplicaType;
}

/** Optional parameters. */
export interface ManagedInstancesListOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}

/** Optional parameters. */
export interface ManagedInstancesListByResourceGroupOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}

/** Optional parameters. */
export interface ManagedInstancesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstancesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstancesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstancesGetOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}
