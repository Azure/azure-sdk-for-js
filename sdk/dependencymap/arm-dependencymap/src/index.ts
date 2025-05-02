// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DependencyMapClient } from "./dependencyMapClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  MapsResource,
  MapsResourceProperties,
  KnownProvisioningState,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  MapsResourceTagsUpdate,
  GetDependencyViewForFocusedMachineRequest,
  DependencyMapVisualizationFilter,
  DateTimeFilter,
  ProcessNameFilter,
  KnownProcessNameFilterOperator,
  ProcessNameFilterOperator,
  GetConnectionsWithConnectedMachineForFocusedMachineRequest,
  GetConnectionsForProcessOnFocusedMachineRequest,
  ExportDependenciesRequest,
  DiscoverySourceResource,
  DiscoverySourceResourceProperties,
  DiscoverySourceResourcePropertiesUnion,
  KnownSourceType,
  SourceType,
  OffAzureDiscoverySourceResourceProperties,
  DiscoverySourceResourceTagsUpdate,
  KnownVersions,
} from "./models/index.js";
export { DependencyMapClientOptionalParams } from "./api/index.js";
export {
  DiscoverySourcesListByMapsResourceOptionalParams,
  DiscoverySourcesDeleteOptionalParams,
  DiscoverySourcesUpdateOptionalParams,
  DiscoverySourcesCreateOrUpdateOptionalParams,
  DiscoverySourcesGetOptionalParams,
} from "./api/discoverySources/index.js";
export {
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
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  DiscoverySourcesOperations,
  MapsOperations,
  OperationsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
