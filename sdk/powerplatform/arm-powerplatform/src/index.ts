// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PowerPlatformClient } from "./powerPlatformClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Account,
  AccountProperties,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  PatchAccount,
  PatchTrackedResource,
  EnterprisePolicy,
  Properties,
  PropertiesLockbox,
  State,
  PropertiesEncryption,
  KeyVaultProperties,
  KeyProperties,
  PropertiesNetworkInjection,
  VirtualNetworkProperties,
  SubnetProperties,
  HealthStatus,
  EnterprisePolicyIdentity,
  ResourceIdentityType,
  EnterprisePolicyKind,
  PatchEnterprisePolicy,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  ProxyResource,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCreatedByType,
  KnownState,
  KnownHealthStatus,
  KnownEnterprisePolicyKind,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownVersions,
} from "./models/index.js";
export type { PowerPlatformClientOptionalParams } from "./api/index.js";
export type {
  AccountsListBySubscriptionOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsGetOptionalParams,
} from "./api/accounts/index.js";
export type {
  EnterprisePoliciesListBySubscriptionOptionalParams,
  EnterprisePoliciesListByResourceGroupOptionalParams,
  EnterprisePoliciesDeleteOptionalParams,
  EnterprisePoliciesUpdateOptionalParams,
  EnterprisePoliciesCreateOrUpdateOptionalParams,
  EnterprisePoliciesGetOptionalParams,
} from "./api/enterprisePolicies/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListByEnterprisePolicyOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListByEnterprisePolicyOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export type {
  AccountsOperations,
  EnterprisePoliciesOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
