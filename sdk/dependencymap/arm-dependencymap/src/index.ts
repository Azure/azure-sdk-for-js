// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DependencyMapClient } from "./dependencyMapClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  MapsResource,
  MapsResourceProperties,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  MapsResourceTagsUpdate,
  GetDependencyViewForFocusedMachineRequest,
  DependencyMapVisualizationFilter,
  DateTimeFilter,
  ProcessNameFilter,
  ProcessNameFilterOperator,
  GetConnectionsWithConnectedMachineForFocusedMachineRequest,
  GetConnectionsForProcessOnFocusedMachineRequest,
  ExportDependenciesRequest,
  ExportDependenciesOperationResult,
  ExportDependenciesResultProperties,
  ExportDependenciesStatusCode,
  ExportDependenciesAdditionalInfo,
  GetDependencyViewForAllMachinesRequest,
  DependencyProcessFilter,
  GetDependencyViewForAllMachinesOperationResult,
  GetDependencyViewForAllMachinesResultProperties,
  DiscoverySourceResource,
  DiscoverySourceResourceProperties,
  DiscoverySourceResourcePropertiesUnion,
  SourceType,
  OffAzureDiscoverySourceResourceProperties,
  DiscoverySourceResourceTagsUpdate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownProcessNameFilterOperator,
  KnownExportDependenciesStatusCode,
  KnownSourceType,
  KnownVersions,
} from "./models/index.js";
export type { DependencyMapClientOptionalParams } from "./api/index.js";
export type {
  DiscoverySourcesListByMapsResourceOptionalParams,
  DiscoverySourcesDeleteOptionalParams,
  DiscoverySourcesUpdateOptionalParams,
  DiscoverySourcesCreateOrUpdateOptionalParams,
  DiscoverySourcesGetOptionalParams,
} from "./api/discoverySources/index.js";
export type {
  MapsGetDependencyViewForAllMachinesOptionalParams,
  MapsExportDependenciesOptionalParams,
  MapsGetConnectionsForProcessOnFocusedMachineOptionalParams,
  MapsGetConnectionsWithConnectedMachineForFocusedMachineOptionalParams,
  MapsGetDependencyViewForFocusedMachineOptionalParams,
  MapsListBySubscriptionOptionalParams,
  MapsListByResourceGroupOptionalParams,
  MapsDeleteOptionalParams,
  MapsUpdateOptionalParams,
  MapsCreateOrUpdateOptionalParams,
  MapsGetOptionalParams,
} from "./api/maps/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  DiscoverySourcesOperations,
  MapsOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
