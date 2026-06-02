// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { RelayAPI } from "./relayAPI.js";
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
  AuthorizationRule,
  AuthorizationRuleProperties,
  AccessRights,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  AccessKeys,
  RegenerateAccessKeyParameters,
  KeyType,
  HybridConnection,
  HybridConnectionProperties,
  WcfRelay,
  WcfRelayProperties,
  Relaytype,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  ConnectionState,
  PrivateLinkConnectionStatus,
  EndPointProvisioningState,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  PrivateLinkResourcesListResult,
  RelayNamespace,
  RelayNamespaceProperties,
  PublicNetworkAccess,
  Sku,
  SkuName,
  SkuTier,
  TrackedResource,
  RelayUpdateParameters,
  ResourceNamespacePatch,
  NetworkRuleSet,
  NetworkRuleSetProperties,
  DefaultAction,
  NWRuleSetIpRules,
  NetworkRuleIPAction,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
  UnavailableReason,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownAccessRights,
  KnownCreatedByType,
  KnownKeyType,
  KnownPrivateLinkConnectionStatus,
  KnownEndPointProvisioningState,
  KnownPublicNetworkAccess,
  KnownSkuName,
  KnownSkuTier,
  KnownDefaultAction,
  KnownNetworkRuleIPAction,
  KnownUnavailableReason,
  KnownVersions,
} from "./models/index.js";
export type { RelayAPIOptionalParams } from "./api/index.js";
export type {
  HybridConnectionsListByNamespaceOptionalParams,
  HybridConnectionsDeleteOptionalParams,
  HybridConnectionsCreateOrUpdateOptionalParams,
  HybridConnectionsGetOptionalParams,
  HybridConnectionsRegenerateKeysOptionalParams,
  HybridConnectionsListKeysOptionalParams,
  HybridConnectionsListAuthorizationRulesOptionalParams,
  HybridConnectionsDeleteAuthorizationRuleOptionalParams,
  HybridConnectionsCreateOrUpdateAuthorizationRuleOptionalParams,
  HybridConnectionsGetAuthorizationRuleOptionalParams,
} from "./api/hybridConnections/index.js";
export type {
  NamespacesCheckNameAvailabilityOptionalParams,
  NamespacesCreateOrUpdateNetworkRuleSetOptionalParams,
  NamespacesGetNetworkRuleSetOptionalParams,
  NamespacesListOptionalParams,
  NamespacesListByResourceGroupOptionalParams,
  NamespacesDeleteOptionalParams,
  NamespacesUpdateOptionalParams,
  NamespacesCreateOrUpdateOptionalParams,
  NamespacesGetOptionalParams,
  NamespacesRegenerateKeysOptionalParams,
  NamespacesListKeysOptionalParams,
  NamespacesListAuthorizationRulesOptionalParams,
  NamespacesDeleteAuthorizationRuleOptionalParams,
  NamespacesCreateOrUpdateAuthorizationRuleOptionalParams,
  NamespacesGetAuthorizationRuleOptionalParams,
} from "./api/namespaces/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export type {
  WCFRelaysListByNamespaceOptionalParams,
  WCFRelaysDeleteOptionalParams,
  WCFRelaysCreateOrUpdateOptionalParams,
  WCFRelaysGetOptionalParams,
  WCFRelaysRegenerateKeysOptionalParams,
  WCFRelaysListKeysOptionalParams,
  WCFRelaysListAuthorizationRulesOptionalParams,
  WCFRelaysDeleteAuthorizationRuleOptionalParams,
  WCFRelaysCreateOrUpdateAuthorizationRuleOptionalParams,
  WCFRelaysGetAuthorizationRuleOptionalParams,
} from "./api/wcfRelays/index.js";
export type {
  HybridConnectionsOperations,
  NamespacesOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  WCFRelaysOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
