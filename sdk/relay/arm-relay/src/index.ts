// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { RelayAPI } from "./relayAPI.js";
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
  AuthorizationRule,
  AuthorizationRuleProperties,
  KnownAccessRights,
  AccessRights,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  AccessKeys,
  RegenerateAccessKeyParameters,
  KnownKeyType,
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
  KnownPrivateLinkConnectionStatus,
  PrivateLinkConnectionStatus,
  KnownEndPointProvisioningState,
  EndPointProvisioningState,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  PrivateLinkResourcesListResult,
  RelayNamespace,
  RelayNamespaceProperties,
  KnownPublicNetworkAccess,
  PublicNetworkAccess,
  Sku,
  KnownSkuName,
  SkuName,
  KnownSkuTier,
  SkuTier,
  TrackedResource,
  RelayUpdateParameters,
  ResourceNamespacePatch,
  NetworkRuleSet,
  NetworkRuleSetProperties,
  KnownDefaultAction,
  DefaultAction,
  NWRuleSetIpRules,
  KnownNetworkRuleIPAction,
  NetworkRuleIPAction,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
  KnownUnavailableReason,
  UnavailableReason,
  KnownVersions,
} from "./models/index.js";
export { RelayAPIOptionalParams } from "./api/index.js";
export {
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
export {
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
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export {
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
export {
  HybridConnectionsOperations,
  NamespacesOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  WCFRelaysOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
