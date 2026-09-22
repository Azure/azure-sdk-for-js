// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureMapsManagementClient } from "./azureMapsManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  MapsAccount,
  MapsAccountProperties,
  LinkedResource,
  CorsRules,
  CorsRule,
  Encryption,
  InfrastructureEncryption,
  CustomerManagedKeyEncryption,
  CustomerManagedKeyEncryptionKeyIdentity,
  IdentityType,
  LocationsItem,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  PublicNetworkAccess,
  Sku,
  Name,
  Kind,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  MapsAccountUpdateParameters,
  AccountSasParameters,
  SigningKey,
  MapsAccountSasToken,
  MapsAccountKeys,
  MapsKeySpecification,
  KeyType,
  Creator,
  CreatorProperties,
  CreatorUpdateParameters,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  ProxyResource,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  OperationStatusResult,
} from "./models/index.js";
export {
  KnownInfrastructureEncryption,
  KnownIdentityType,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownPublicNetworkAccess,
  KnownName,
  KnownKind,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownSigningKey,
  KnownKeyType,
  KnownOrigin,
  KnownActionType,
  KnownVersions,
} from "./models/index.js";
export type { AzureMapsManagementClientOptionalParams } from "./api/index.js";
export type {
  AccountsRegenerateKeysOptionalParams,
  AccountsListKeysOptionalParams,
  AccountsListSasOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsGetOptionalParams,
} from "./api/accounts/index.js";
export type {
  CreatorsListByAccountOptionalParams,
  CreatorsDeleteOptionalParams,
  CreatorsUpdateOptionalParams,
  CreatorsCreateOrUpdateOptionalParams,
  CreatorsGetOptionalParams,
} from "./api/creators/index.js";
export type { MapsListOperationsOptionalParams } from "./api/maps/index.js";
export type { OperationResultGetOptionalParams } from "./api/operationResult/index.js";
export type { OperationStatusGetOptionalParams } from "./api/operationStatus/index.js";
export type {
  PrivateEndpointConnectionsListByAccountOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListByAccountOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export type {
  AccountsOperations,
  CreatorsOperations,
  MapsOperations,
  OperationResultOperations,
  OperationStatusOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
