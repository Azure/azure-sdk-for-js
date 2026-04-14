// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { TrafficManagerManagementClient } from "./trafficManagerManagementClient.js";
export type {
  Endpoint,
  EndpointProperties,
  EndpointStatus,
  EndpointMonitorStatus,
  EndpointPropertiesSubnetsItem,
  EndpointPropertiesCustomHeadersItem,
  AlwaysServe,
  ProxyResource,
  Resource,
  CloudError,
  CloudErrorBody,
  EndpointUpdate,
  DeleteOperationResult,
  Profile,
  ProfileProperties,
  ProfileStatus,
  TrafficRoutingMethod,
  DnsConfig,
  MonitorConfig,
  ProfileMonitorStatus,
  MonitorProtocol,
  MonitorConfigCustomHeadersItem,
  MonitorConfigExpectedStatusCodeRangesItem,
  TrafficViewEnrollmentStatus,
  AllowedEndpointRecordType,
  RecordType,
  TrackedResource,
  ProfileUpdate,
  ProfilePropertiesUpdate,
  CheckTrafficManagerRelativeDnsNameAvailabilityParameters,
  TrafficManagerNameAvailability,
  TrafficManagerGeographicHierarchy,
  GeographicHierarchyProperties,
  Region,
  HeatMapModel,
  HeatMapProperties,
  HeatMapEndpoint,
  TrafficFlow,
  QueryExperience,
  UserMetricsModel,
  UserMetricsProperties,
  EndpointType,
  HeatMapType,
} from "./models/index.js";
export {
  KnownEndpointStatus,
  KnownEndpointMonitorStatus,
  KnownAlwaysServe,
  KnownProfileStatus,
  KnownTrafficRoutingMethod,
  KnownProfileMonitorStatus,
  KnownMonitorProtocol,
  KnownTrafficViewEnrollmentStatus,
  KnownAllowedEndpointRecordType,
  KnownRecordType,
  KnownVersions,
} from "./models/index.js";
export type { TrafficManagerManagementClientOptionalParams } from "./api/index.js";
export type {
  EndpointsDeleteOptionalParams,
  EndpointsUpdateV2OptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "./api/endpoints/index.js";
export type { GeographicHierarchiesGetDefaultOptionalParams } from "./api/geographicHierarchies/index.js";
export type { HeatMapGetOptionalParams } from "./api/heatMap/index.js";
export type {
  ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams,
  ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesListBySubscriptionOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesUpdateV2OptionalParams,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesGetOptionalParams,
} from "./api/profiles/index.js";
export type {
  TrafficManagerUserMetricsKeysDeleteOptionalParams,
  TrafficManagerUserMetricsKeysCreateOrUpdateOptionalParams,
  TrafficManagerUserMetricsKeysGetOptionalParams,
} from "./api/trafficManagerUserMetricsKeys/index.js";
export type {
  EndpointsOperations,
  GeographicHierarchiesOperations,
  HeatMapOperations,
  ProfilesOperations,
  TrafficManagerUserMetricsKeysOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
