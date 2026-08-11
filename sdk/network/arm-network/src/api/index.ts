// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  NetworkManagementContext,
  NetworkManagementClientOptionalParams,
} from "./networkManagementContext.js";
export { createNetworkManagement } from "./networkManagementContext.js";
export {
  checkDnsNameAvailability,
  generatevirtualwanvpnserverconfigurationvpnprofile,
  supportedSecurityProviders,
  listNetworkManagerEffectiveSecurityAdminRules,
  listNetworkManagerEffectiveConnectivityConfigurations,
  listActiveSecurityAdminRules,
  listActiveConnectivityConfigurations,
  expressRouteProviderPort,
  disconnectActiveSessions,
  getActiveSessions,
  getBastionShareableLink,
  deleteBastionShareableLinkByToken,
  deleteBastionShareableLink,
  putBastionShareableLink,
} from "./operations.js";
export type {
  CheckDnsNameAvailabilityOptionalParams,
  GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams,
  SupportedSecurityProvidersOptionalParams,
  ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams,
  ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams,
  ListActiveSecurityAdminRulesOptionalParams,
  ListActiveConnectivityConfigurationsOptionalParams,
  ExpressRouteProviderPortOptionalParams,
  DisconnectActiveSessionsOptionalParams,
  GetActiveSessionsOptionalParams,
  GetBastionShareableLinkOptionalParams,
  DeleteBastionShareableLinkByTokenOptionalParams,
  DeleteBastionShareableLinkOptionalParams,
  PutBastionShareableLinkOptionalParams,
} from "./options.js";
