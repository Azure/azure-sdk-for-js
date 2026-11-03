// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagementContext } from "../../api/serviceFabricManagementContext.js";
import {
  listByEnvironment,
  list,
  getByEnvironment,
  get,
} from "../../api/clusterVersions/operations.js";
import type {
  ClusterVersionsListByEnvironmentOptionalParams,
  ClusterVersionsListOptionalParams,
  ClusterVersionsGetByEnvironmentOptionalParams,
  ClusterVersionsGetOptionalParams,
} from "../../api/clusterVersions/options.js";
import type {
  ClusterCodeVersionsListResult,
  ClusterVersionsEnvironment,
} from "../../models/models.js";

/** Interface representing a ClusterVersions operations. */
export interface ClusterVersionsOperations {
  /** Gets all available code versions for Service Fabric cluster resources by environment. */
  listByEnvironment: (
    location: string,
    environment: ClusterVersionsEnvironment,
    options?: ClusterVersionsListByEnvironmentOptionalParams,
  ) => Promise<ClusterCodeVersionsListResult>;
  /** Gets all available code versions for Service Fabric cluster resources by location. */
  list: (
    location: string,
    options?: ClusterVersionsListOptionalParams,
  ) => Promise<ClusterCodeVersionsListResult>;
  /** Gets information about an available Service Fabric cluster code version by environment. */
  getByEnvironment: (
    location: string,
    environment: ClusterVersionsEnvironment,
    clusterVersion: string,
    options?: ClusterVersionsGetByEnvironmentOptionalParams,
  ) => Promise<ClusterCodeVersionsListResult>;
  /** Gets information about an available Service Fabric cluster code version. */
  get: (
    location: string,
    clusterVersion: string,
    options?: ClusterVersionsGetOptionalParams,
  ) => Promise<ClusterCodeVersionsListResult>;
}

function _getClusterVersions(context: ServiceFabricManagementContext) {
  return {
    listByEnvironment: (
      location: string,
      environment: ClusterVersionsEnvironment,
      options?: ClusterVersionsListByEnvironmentOptionalParams,
    ) => listByEnvironment(context, location, environment, options),
    list: (location: string, options?: ClusterVersionsListOptionalParams) =>
      list(context, location, options),
    getByEnvironment: (
      location: string,
      environment: ClusterVersionsEnvironment,
      clusterVersion: string,
      options?: ClusterVersionsGetByEnvironmentOptionalParams,
    ) => getByEnvironment(context, location, environment, clusterVersion, options),
    get: (location: string, clusterVersion: string, options?: ClusterVersionsGetOptionalParams) =>
      get(context, location, clusterVersion, options),
  };
}

export function _getClusterVersionsOperations(
  context: ServiceFabricManagementContext,
): ClusterVersionsOperations {
  return {
    ..._getClusterVersions(context),
  };
}
