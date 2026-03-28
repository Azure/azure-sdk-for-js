// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PeeringManagementClient } from "./peeringManagementClient.js";
export type {
  CheckServiceProviderAvailabilityInput,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  PeerAsn,
  PeerAsnProperties,
  ContactDetail,
  Role,
  ValidationState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  Peering,
  PeeringProperties,
  PeeringPropertiesDirect,
  DirectConnection,
  SessionAddressProvider,
  ConnectionState,
  BgpSession,
  SessionStateV4,
  SessionStateV6,
  SubResource,
  DirectPeeringType,
  PeeringPropertiesExchange,
  ExchangeConnection,
  ConnectivityProbe,
  Protocol,
  ProvisioningState,
  PeeringSku,
  Tier,
  Family,
  Size,
  Kind,
  TrackedResource,
  ResourceTags,
  ConnectionMonitorTest,
  ConnectionMonitorTestProperties,
  PeeringService,
  PeeringServiceProperties,
  LogAnalyticsWorkspaceProperties,
  PeeringServiceSku,
  Operation,
  OperationDisplayInfo,
  OperationProperties,
  ServiceSpecification,
  MetricSpecification,
  MetricDimension,
  PeeringRegisteredAsn,
  PeeringRegisteredAsnProperties,
  PeeringReceivedRoute,
  RpUnbilledPrefix,
  PeeringRegisteredPrefix,
  PeeringRegisteredPrefixProperties,
  PrefixValidationState,
  PeeringServicePrefix,
  PeeringServicePrefixProperties,
  LearnedType,
  PeeringServicePrefixEvent,
  CdnPeeringPrefix,
  CdnPeeringPrefixProperties,
  LookingGlassOutput,
  Command,
  PeeringLocation,
  PeeringLocationProperties,
  PeeringLocationPropertiesDirect,
  DirectPeeringFacility,
  PeeringBandwidthOffer,
  PeeringLocationPropertiesExchange,
  ExchangePeeringFacility,
  PeeringServiceCountry,
  PeeringServiceLocation,
  PeeringServiceLocationProperties,
  PeeringServiceProvider,
  PeeringServiceProviderProperties,
  Enum0,
  LegacyPeeringsKind,
  LookingGlassCommand,
  LookingGlassSourceType,
  PeeringLocationsKind,
  PeeringLocationsDirectPeeringType,
  CheckServiceProviderAvailabilityResponse,
} from "./models/index.js";
export {
  KnownRole,
  KnownValidationState,
  KnownCreatedByType,
  KnownSessionAddressProvider,
  KnownConnectionState,
  KnownSessionStateV4,
  KnownSessionStateV6,
  KnownDirectPeeringType,
  KnownProtocol,
  KnownProvisioningState,
  KnownTier,
  KnownFamily,
  KnownSize,
  KnownKind,
  KnownPrefixValidationState,
  KnownLearnedType,
  KnownCommand,
  KnownEnum0,
  KnownLegacyPeeringsKind,
  KnownLookingGlassCommand,
  KnownLookingGlassSourceType,
  KnownPeeringLocationsKind,
  KnownPeeringLocationsDirectPeeringType,
  KnownVersions,
} from "./models/index.js";
export type {
  CheckServiceProviderAvailabilityOptionalParams,
  PeeringManagementClientOptionalParams,
} from "./api/index.js";
export type { CdnPeeringPrefixesListOptionalParams } from "./api/cdnPeeringPrefixes/index.js";
export type {
  ConnectionMonitorTestsListByPeeringServiceOptionalParams,
  ConnectionMonitorTestsDeleteOptionalParams,
  ConnectionMonitorTestsCreateOrUpdateOptionalParams,
  ConnectionMonitorTestsGetOptionalParams,
} from "./api/connectionMonitorTests/index.js";
export type { LegacyPeeringsListOptionalParams } from "./api/legacyPeerings/index.js";
export type { LookingGlassInvokeOptionalParams } from "./api/lookingGlass/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PeerAsnsListBySubscriptionOptionalParams,
  PeerAsnsDeleteOptionalParams,
  PeerAsnsCreateOrUpdateOptionalParams,
  PeerAsnsGetOptionalParams,
} from "./api/peerAsns/index.js";
export type { PeeringLocationsListOptionalParams } from "./api/peeringLocations/index.js";
export type {
  PeeringsListBySubscriptionOptionalParams,
  PeeringsListByResourceGroupOptionalParams,
  PeeringsDeleteOptionalParams,
  PeeringsUpdateOptionalParams,
  PeeringsCreateOrUpdateOptionalParams,
  PeeringsGetOptionalParams,
} from "./api/peerings/index.js";
export type { PeeringServiceCountriesListOptionalParams } from "./api/peeringServiceCountries/index.js";
export type { PeeringServiceLocationsListOptionalParams } from "./api/peeringServiceLocations/index.js";
export type { PeeringServiceProvidersListOptionalParams } from "./api/peeringServiceProviders/index.js";
export type {
  PeeringServicesInitializeConnectionMonitorOptionalParams,
  PeeringServicesListBySubscriptionOptionalParams,
  PeeringServicesListByResourceGroupOptionalParams,
  PeeringServicesDeleteOptionalParams,
  PeeringServicesUpdateOptionalParams,
  PeeringServicesCreateOrUpdateOptionalParams,
  PeeringServicesGetOptionalParams,
} from "./api/peeringServices/index.js";
export type {
  PrefixesListByPeeringServiceOptionalParams,
  PrefixesDeleteOptionalParams,
  PrefixesCreateOrUpdateOptionalParams,
  PrefixesGetOptionalParams,
} from "./api/prefixes/index.js";
export type { ReceivedRoutesListByPeeringOptionalParams } from "./api/receivedRoutes/index.js";
export type {
  RegisteredAsnsListByPeeringOptionalParams,
  RegisteredAsnsDeleteOptionalParams,
  RegisteredAsnsCreateOrUpdateOptionalParams,
  RegisteredAsnsGetOptionalParams,
} from "./api/registeredAsns/index.js";
export type {
  RegisteredPrefixesValidateOptionalParams,
  RegisteredPrefixesListByPeeringOptionalParams,
  RegisteredPrefixesDeleteOptionalParams,
  RegisteredPrefixesCreateOrUpdateOptionalParams,
  RegisteredPrefixesGetOptionalParams,
} from "./api/registeredPrefixes/index.js";
export type { RpUnbilledPrefixesListOptionalParams } from "./api/rpUnbilledPrefixes/index.js";
export type {
  CdnPeeringPrefixesOperations,
  ConnectionMonitorTestsOperations,
  LegacyPeeringsOperations,
  LookingGlassOperations,
  OperationsOperations,
  PeerAsnsOperations,
  PeeringLocationsOperations,
  PeeringsOperations,
  PeeringServiceCountriesOperations,
  PeeringServiceLocationsOperations,
  PeeringServiceProvidersOperations,
  PeeringServicesOperations,
  PrefixesOperations,
  ReceivedRoutesOperations,
  RegisteredAsnsOperations,
  RegisteredPrefixesOperations,
  RpUnbilledPrefixesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
