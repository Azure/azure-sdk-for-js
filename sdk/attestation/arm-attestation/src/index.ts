// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AttestationManagementClient } from "./attestationManagementClient.js";
export type {
  SystemData,
  CreatedByType,
  OperationsDefinition,
  OperationsDisplayDefinition,
  OperationProperties,
  ServiceSpecification,
  LogSpecification,
  CloudError,
  CloudErrorBody,
  AttestationProvider,
  StatusResult,
  AttestationServiceStatus,
  PublicNetworkAccessType,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  TpmAttestationAuthenticationType,
  Resource,
  TrackedResource,
  AttestationServiceCreationParams,
  AttestationServiceCreationSpecificParams,
  JsonWebKeySet,
  JsonWebKey,
  AttestationServicePatchParams,
  AttestationServicePatchSpecificParams,
  AttestationProviderListResult,
  PrivateLinkResourceListResult,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
} from "./models/index.js";
export {
  KnownCreatedByType,
  KnownAttestationServiceStatus,
  KnownPublicNetworkAccessType,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownTpmAttestationAuthenticationType,
  KnownVersions,
} from "./models/index.js";
export type { AttestationManagementClientOptionalParams } from "./api/index.js";
export type {
  AttestationProvidersGetDefaultByLocationOptionalParams,
  AttestationProvidersListDefaultOptionalParams,
  AttestationProvidersListOptionalParams,
  AttestationProvidersListByResourceGroupOptionalParams,
  AttestationProvidersDeleteOptionalParams,
  AttestationProvidersUpdateOptionalParams,
  AttestationProvidersCreateOptionalParams,
  AttestationProvidersGetOptionalParams,
} from "./api/attestationProviders/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type { PrivateLinkResourcesListByProviderOptionalParams } from "./api/privateLinkResources/index.js";
export type {
  AttestationProvidersOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
