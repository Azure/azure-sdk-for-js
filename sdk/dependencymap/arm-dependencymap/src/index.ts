// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DependencyMapClient } from "./dependencyMapClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type MapsResource,
  type MapsResourceProperties,
  KnownProvisioningState,
  type ProvisioningState,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type MapsResourceTagsUpdate,
  type GetDependencyViewForFocusedMachineRequest,
  type DependencyMapVisualizationFilter,
  type DateTimeFilter,
  type ProcessNameFilter,
  KnownProcessNameFilterOperator,
  type ProcessNameFilterOperator,
  type GetConnectionsWithConnectedMachineForFocusedMachineRequest,
  type GetConnectionsForProcessOnFocusedMachineRequest,
  type ExportDependenciesRequest,
  type DiscoverySourceResource,
  type DiscoverySourceResourceProperties,
  type DiscoverySourceResourcePropertiesUnion,
  KnownSourceType,
  type SourceType,
  type OffAzureDiscoverySourceResourceProperties,
  type DiscoverySourceResourceTagsUpdate,
  KnownVersions,
} from "./models/index.js";
export { type DependencyMapClientOptionalParams } from "./api/index.js";
export {
  type DiscoverySourcesListByMapsResourceOptionalParams,
  type DiscoverySourcesDeleteOptionalParams,
  type DiscoverySourcesUpdateOptionalParams,
  type DiscoverySourcesCreateOrUpdateOptionalParams,
  type DiscoverySourcesGetOptionalParams,
} from "./api/discoverySources/index.js";
export {
  type MapsExportDependenciesOptionalParams,
  type MapsGetConnectionsForProcessOnFocusedMachineOptionalParams,
  type MapsGetConnectionsWithConnectedMachineForFocusedMachineOptionalParams,
  type MapsGetDependencyViewForFocusedMachineOptionalParams,
  type MapsListBySubscriptionOptionalParams,
  type MapsListByResourceGroupOptionalParams,
  type MapsDeleteOptionalParams,
  type MapsUpdateOptionalParams,
  type MapsCreateOrUpdateOptionalParams,
  type MapsGetOptionalParams,
} from "./api/maps/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export {
  type DiscoverySourcesOperations,
  type MapsOperations,
  type OperationsOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
