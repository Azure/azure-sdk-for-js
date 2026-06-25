// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HealthcareApisManagementClient } from "./healthcareApisManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  OperationDetail,
  OperationDisplay,
  ActionType,
  OperationProperties,
  ServiceSpecification,
  LogSpecification,
  MetricSpecification,
  MetricDimension,
  ErrorDetails,
  ErrorDetailsInternal,
  PrivateEndpointConnectionDescription,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  PrivateLinkResourceDescription,
  PrivateLinkResourceProperties,
  PrivateLinkResourceListResultDescription,
  Workspace,
  WorkspaceProperties,
  ProvisioningState,
  PrivateEndpointConnection,
  PublicNetworkAccess,
  WorkspacePatchResource,
  ResourceTags,
  ErrorModel,
  DicomService,
  DicomServiceProperties,
  DicomServiceAuthenticationConfiguration,
  CorsConfiguration,
  ServiceEventState,
  Encryption,
  EncryptionCustomerManagedKeyEncryption,
  StorageConfiguration,
  StorageIndexingConfiguration,
  ServiceManagedIdentityIdentity,
  ServiceManagedIdentityType,
  UserAssignedIdentity,
  DicomServicePatchResource,
  IotConnector,
  IotConnectorProperties,
  IotEventHubIngestionEndpointConfiguration,
  IotMappingProperties,
  IotConnectorPatchResource,
  FhirService,
  FhirServiceProperties,
  FhirServiceAcrConfiguration,
  ServiceOciArtifactEntry,
  FhirServiceAuthenticationConfiguration,
  SmartIdentityProviderConfiguration,
  SmartIdentityProviderApplication,
  SmartDataActions,
  FhirServiceCorsConfiguration,
  FhirServiceExportConfiguration,
  ResourceVersionPolicyConfiguration,
  FhirResourceVersionPolicy,
  FhirServiceImportConfiguration,
  ImplementationGuidesConfiguration,
  FhirServiceKind,
  FhirServicePatchResource,
  ServicesDescription,
  ServicesProperties,
  ServiceAccessPolicyEntry,
  ServiceCosmosDbConfigurationInfo,
  ServiceAuthenticationConfigurationInfo,
  ServiceCorsConfigurationInfo,
  ServiceExportConfigurationInfo,
  ServiceAcrConfigurationInfo,
  ServiceImportConfigurationInfo,
  Kind,
  ServicesResourceIdentity,
  ManagedServiceIdentityType,
  TrackedResource,
  ServicesPatchDescription,
  ServicesPropertiesUpdateParameters,
  CheckNameAvailabilityParameters,
  ServicesNameAvailabilityInfo,
  ServiceNameUnavailabilityReason,
  IotFhirDestination,
  IotFhirDestinationProperties,
  IotIdentityResolutionType,
  IotDestinationProperties,
  OperationResultsDescription,
  OperationResultStatus,
} from "./models/index.js";
export {
  KnownActionType,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownCreatedByType,
  KnownProvisioningState,
  KnownPublicNetworkAccess,
  KnownServiceEventState,
  KnownServiceManagedIdentityType,
  KnownSmartDataActions,
  KnownFhirResourceVersionPolicy,
  KnownFhirServiceKind,
  KnownManagedServiceIdentityType,
  KnownIotIdentityResolutionType,
  KnownOperationResultStatus,
  KnownVersions,
} from "./models/index.js";
export type { HealthcareApisManagementClientOptionalParams } from "./api/index.js";
export type {
  DicomServicesDeleteOptionalParams,
  DicomServicesUpdateOptionalParams,
  DicomServicesListByWorkspaceOptionalParams,
  DicomServicesCreateOrUpdateOptionalParams,
  DicomServicesGetOptionalParams,
} from "./api/dicomServices/index.js";
export type { FhirDestinationsListByIotConnectorOptionalParams } from "./api/fhirDestinations/index.js";
export type {
  FhirServicesDeleteOptionalParams,
  FhirServicesUpdateOptionalParams,
  FhirServicesListByWorkspaceOptionalParams,
  FhirServicesCreateOrUpdateOptionalParams,
  FhirServicesGetOptionalParams,
} from "./api/fhirServices/index.js";
export type {
  IotConnectorFhirDestinationDeleteOptionalParams,
  IotConnectorFhirDestinationCreateOrUpdateOptionalParams,
  IotConnectorFhirDestinationGetOptionalParams,
} from "./api/iotConnectorFhirDestination/index.js";
export type {
  IotConnectorsDeleteOptionalParams,
  IotConnectorsUpdateOptionalParams,
  IotConnectorsListByWorkspaceOptionalParams,
  IotConnectorsCreateOrUpdateOptionalParams,
  IotConnectorsGetOptionalParams,
} from "./api/iotConnectors/index.js";
export type { OperationResultsGetOptionalParams } from "./api/operationResults/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListByServiceOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListByServiceOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export type {
  ServicesCheckNameAvailabilityOptionalParams,
  ServicesListOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "./api/services/index.js";
export type {
  WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams,
  WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  WorkspacePrivateEndpointConnectionsGetOptionalParams,
} from "./api/workspacePrivateEndpointConnections/index.js";
export type {
  WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  WorkspacePrivateLinkResourcesGetOptionalParams,
} from "./api/workspacePrivateLinkResources/index.js";
export type {
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./api/workspaces/index.js";
export type {
  DicomServicesOperations,
  FhirDestinationsOperations,
  FhirServicesOperations,
  IotConnectorFhirDestinationOperations,
  IotConnectorsOperations,
  OperationResultsOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  ServicesOperations,
  WorkspacePrivateEndpointConnectionsOperations,
  WorkspacePrivateLinkResourcesOperations,
  WorkspacesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
