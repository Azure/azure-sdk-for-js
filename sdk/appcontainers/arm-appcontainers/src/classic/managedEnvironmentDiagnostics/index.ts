// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { getDetector, listDetectors } from "../../api/managedEnvironmentDiagnostics/operations.js";
import {
  ManagedEnvironmentDiagnosticsGetDetectorOptionalParams,
  ManagedEnvironmentDiagnosticsListDetectorsOptionalParams,
} from "../../api/managedEnvironmentDiagnostics/options.js";
import { DiagnosticsCollection, Diagnostics } from "../../models/models.js";

/** Interface representing a ManagedEnvironmentDiagnostics operations. */
export interface ManagedEnvironmentDiagnosticsOperations {
  /** Get the diagnostics data for a Managed Environment used to host container apps. */
  getDetector: (
    resourceGroupName: string,
    environmentName: string,
    detectorName: string,
    options?: ManagedEnvironmentDiagnosticsGetDetectorOptionalParams,
  ) => Promise<Diagnostics>;
  /** Get the list of diagnostics for a Managed Environment used to host container apps. */
  listDetectors: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentDiagnosticsListDetectorsOptionalParams,
  ) => Promise<DiagnosticsCollection>;
}

function _getManagedEnvironmentDiagnostics(context: ContainerAppsAPIContext) {
  return {
    getDetector: (
      resourceGroupName: string,
      environmentName: string,
      detectorName: string,
      options?: ManagedEnvironmentDiagnosticsGetDetectorOptionalParams,
    ) => getDetector(context, resourceGroupName, environmentName, detectorName, options),
    listDetectors: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentDiagnosticsListDetectorsOptionalParams,
    ) => listDetectors(context, resourceGroupName, environmentName, options),
  };
}

export function _getManagedEnvironmentDiagnosticsOperations(
  context: ContainerAppsAPIContext,
): ManagedEnvironmentDiagnosticsOperations {
  return {
    ..._getManagedEnvironmentDiagnostics(context),
  };
}
