// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { getRoot } from "../../api/managedEnvironmentsDiagnostics/operations.js";
import { ManagedEnvironmentsDiagnosticsGetRootOptionalParams } from "../../api/managedEnvironmentsDiagnostics/options.js";
import { ManagedEnvironment } from "../../models/models.js";

/** Interface representing a ManagedEnvironmentsDiagnostics operations. */
export interface ManagedEnvironmentsDiagnosticsOperations {
  /** Get the properties of a Managed Environment used to host container apps. */
  getRoot: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentsDiagnosticsGetRootOptionalParams,
  ) => Promise<ManagedEnvironment>;
}

function _getManagedEnvironmentsDiagnostics(context: ContainerAppsAPIContext) {
  return {
    getRoot: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentsDiagnosticsGetRootOptionalParams,
    ) => getRoot(context, resourceGroupName, environmentName, options),
  };
}

export function _getManagedEnvironmentsDiagnosticsOperations(
  context: ContainerAppsAPIContext,
): ManagedEnvironmentsDiagnosticsOperations {
  return {
    ..._getManagedEnvironmentsDiagnostics(context),
  };
}
