// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext } from "../../api/serviceFabricContext.js";
import {
  ManagedClusterCodeVersionResult,
  ManagedClusterVersionEnvironment,
} from "../../models/models.js";
import {
  ManagedClusterVersionListByEnvironmentOptionalParams,
  ManagedClusterVersionGetByEnvironmentOptionalParams,
  ManagedClusterVersionListOptionalParams,
  ManagedClusterVersionGetOptionalParams,
} from "../../api/managedClusterVersion/options.js";
import {
  listByEnvironment,
  getByEnvironment,
  list,
  get,
} from "../../api/managedClusterVersion/operations.js";

/** Interface representing a ManagedClusterVersion operations. */
export interface ManagedClusterVersionOperations {
  /** Gets all available code versions for Service Fabric cluster resources by environment. */
  listByEnvironment: (
    location: string,
    environment: ManagedClusterVersionEnvironment,
    options?: ManagedClusterVersionListByEnvironmentOptionalParams,
  ) => Promise<ManagedClusterCodeVersionResult[]>;
  /** Gets information about an available Service Fabric cluster code version by environment. */
  getByEnvironment: (
    location: string,
    environment: ManagedClusterVersionEnvironment,
    clusterVersion: string,
    options?: ManagedClusterVersionGetByEnvironmentOptionalParams,
  ) => Promise<ManagedClusterCodeVersionResult>;
  /** Gets all available code versions for Service Fabric cluster resources by location. */
  list: (
    location: string,
    options?: ManagedClusterVersionListOptionalParams,
  ) => Promise<ManagedClusterCodeVersionResult[]>;
  /** Gets information about an available Service Fabric managed cluster code version. */
  get: (
    location: string,
    clusterVersion: string,
    options?: ManagedClusterVersionGetOptionalParams,
  ) => Promise<ManagedClusterCodeVersionResult>;
}

function _getManagedClusterVersion(context: ServiceFabricContext) {
  return {
    listByEnvironment: (
      location: string,
      environment: ManagedClusterVersionEnvironment,
      options?: ManagedClusterVersionListByEnvironmentOptionalParams,
    ) => listByEnvironment(context, location, environment, options),
    getByEnvironment: (
      location: string,
      environment: ManagedClusterVersionEnvironment,
      clusterVersion: string,
      options?: ManagedClusterVersionGetByEnvironmentOptionalParams,
    ) => getByEnvironment(context, location, environment, clusterVersion, options),
    list: (location: string, options?: ManagedClusterVersionListOptionalParams) =>
      list(context, location, options),
    get: (
      location: string,
      clusterVersion: string,
      options?: ManagedClusterVersionGetOptionalParams,
    ) => get(context, location, clusterVersion, options),
  };
}

export function _getManagedClusterVersionOperations(
  context: ServiceFabricContext,
): ManagedClusterVersionOperations {
  return {
    ..._getManagedClusterVersion(context),
  };
}
