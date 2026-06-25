// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { IotDpsClient } from "./iotDpsClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  ErrorDetails,
  CertificateResponse,
  CertificateProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  CertificateListDescription,
  VerificationCodeResponse,
  VerificationCodeResponseProperties,
  VerificationCodeRequest,
  AsyncOperationResult,
  ErrorMessage,
  ProvisioningServiceDescription,
  IotDpsPropertiesDescription,
  State,
  PublicNetworkAccess,
  IpFilterRule,
  IpFilterActionType,
  IpFilterTargetType,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateLinkServiceConnectionStatus,
  IotHubDefinitionDescription,
  DeviceRegistryNamespaceDescription,
  DeviceRegistryNamespaceAuthenticationType,
  AllocationPolicy,
  SharedAccessSignatureAuthorizationRuleAccessRightsDescription,
  AccessRightsDescription,
  IotDpsSkuInfo,
  IotDpsSku,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  ErrorDetail,
  ErrorAdditionalInfo,
  TagsResource,
  ErrorResponse,
  IotDpsSkuDefinition,
  GroupIdInformation,
  GroupIdInformationProperties,
  PrivateLinkResources,
  OperationInputs,
  NameAvailabilityInfo,
  NameUnavailabilityReason,
  CertificatePurpose,
} from "./models/index.js";
export {
  KnownCreatedByType,
  KnownState,
  KnownPublicNetworkAccess,
  KnownPrivateLinkServiceConnectionStatus,
  KnownDeviceRegistryNamespaceAuthenticationType,
  KnownAllocationPolicy,
  KnownAccessRightsDescription,
  KnownIotDpsSku,
  KnownManagedServiceIdentityType,
  KnownNameUnavailabilityReason,
  KnownCertificatePurpose,
  KnownVersions,
} from "./models/index.js";
export type { IotDpsClientOptionalParams } from "./api/index.js";
export type {
  DpsCertificateVerifyCertificateOptionalParams,
  DpsCertificateGenerateVerificationCodeOptionalParams,
  DpsCertificateListOptionalParams,
  DpsCertificateDeleteOptionalParams,
  DpsCertificateCreateOrUpdateOptionalParams,
  DpsCertificateGetOptionalParams,
} from "./api/dpsCertificate/index.js";
export type {
  IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams,
  IotDpsResourceListPrivateEndpointConnectionsOptionalParams,
  IotDpsResourceDeletePrivateEndpointConnectionOptionalParams,
  IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOptionalParams,
  IotDpsResourceGetPrivateEndpointConnectionOptionalParams,
  IotDpsResourceListPrivateLinkResourcesOptionalParams,
  IotDpsResourceGetPrivateLinkResourcesOptionalParams,
  IotDpsResourceListKeysForKeyNameOptionalParams,
  IotDpsResourceListKeysOptionalParams,
  IotDpsResourceListValidSkusOptionalParams,
  IotDpsResourceListBySubscriptionOptionalParams,
  IotDpsResourceListByResourceGroupOptionalParams,
  IotDpsResourceDeleteOptionalParams,
  IotDpsResourceUpdateOptionalParams,
  IotDpsResourceCreateOrUpdateOptionalParams,
  IotDpsResourceGetOptionalParams,
  IotDpsResourceGetOperationResultOptionalParams,
} from "./api/iotDpsResource/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  DpsCertificateOperations,
  IotDpsResourceOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
