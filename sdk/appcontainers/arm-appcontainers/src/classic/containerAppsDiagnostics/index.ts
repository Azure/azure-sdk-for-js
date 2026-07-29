// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  getDetector,
  listDetectors,
  getRoot,
  listRevisions,
  getRevision,
} from "../../api/containerAppsDiagnostics/operations.js";
import {
  ContainerAppsDiagnosticsGetDetectorOptionalParams,
  ContainerAppsDiagnosticsListDetectorsOptionalParams,
  ContainerAppsDiagnosticsGetRootOptionalParams,
  ContainerAppsDiagnosticsListRevisionsOptionalParams,
  ContainerAppsDiagnosticsGetRevisionOptionalParams,
} from "../../api/containerAppsDiagnostics/options.js";
import { ContainerApp, Revision, Diagnostics } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsDiagnostics operations. */
export interface ContainerAppsDiagnosticsOperations {
  /** Get a diagnostics result of a Container App. */
  getDetector: (
    resourceGroupName: string,
    containerAppName: string,
    detectorName: string,
    options?: ContainerAppsDiagnosticsGetDetectorOptionalParams,
  ) => Promise<Diagnostics>;
  /** Get the list of diagnostics for a given Container App. */
  listDetectors: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsDiagnosticsListDetectorsOptionalParams,
  ) => PagedAsyncIterableIterator<Diagnostics>;
  /** Get the properties of a Container App. */
  getRoot: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsDiagnosticsGetRootOptionalParams,
  ) => Promise<ContainerApp>;
  /** A synchronous resource action. */
  listRevisions: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsDiagnosticsListRevisionsOptionalParams,
  ) => PagedAsyncIterableIterator<Revision>;
  /** Get a revision of a Container App. */
  getRevision: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    options?: ContainerAppsDiagnosticsGetRevisionOptionalParams,
  ) => Promise<Revision>;
}

function _getContainerAppsDiagnostics(context: ContainerAppsAPIContext) {
  return {
    getDetector: (
      resourceGroupName: string,
      containerAppName: string,
      detectorName: string,
      options?: ContainerAppsDiagnosticsGetDetectorOptionalParams,
    ) => getDetector(context, resourceGroupName, containerAppName, detectorName, options),
    listDetectors: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsDiagnosticsListDetectorsOptionalParams,
    ) => listDetectors(context, resourceGroupName, containerAppName, options),
    getRoot: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsDiagnosticsGetRootOptionalParams,
    ) => getRoot(context, resourceGroupName, containerAppName, options),
    listRevisions: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsDiagnosticsListRevisionsOptionalParams,
    ) => listRevisions(context, resourceGroupName, containerAppName, options),
    getRevision: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      options?: ContainerAppsDiagnosticsGetRevisionOptionalParams,
    ) => getRevision(context, resourceGroupName, containerAppName, revisionName, options),
  };
}

export function _getContainerAppsDiagnosticsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsDiagnosticsOperations {
  return {
    ..._getContainerAppsDiagnostics(context),
  };
}
