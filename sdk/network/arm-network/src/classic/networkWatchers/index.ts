// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  getNetworkConfigurationDiagnostic,
  listAvailableProviders,
  getAzureReachabilityReport,
  checkConnectivity,
  getFlowLogStatus,
  setFlowLogConfiguration,
  getTroubleshootingResult,
  getTroubleshooting,
  getVMSecurityRules,
  getNextHop,
  verifyIPFlow,
  getTopology,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/networkWatchers/operations.js";
import type {
  NetworkWatchersGetNetworkConfigurationDiagnosticOptionalParams,
  NetworkWatchersListAvailableProvidersOptionalParams,
  NetworkWatchersGetAzureReachabilityReportOptionalParams,
  NetworkWatchersCheckConnectivityOptionalParams,
  NetworkWatchersGetFlowLogStatusOptionalParams,
  NetworkWatchersSetFlowLogConfigurationOptionalParams,
  NetworkWatchersGetTroubleshootingResultOptionalParams,
  NetworkWatchersGetTroubleshootingOptionalParams,
  NetworkWatchersGetVMSecurityRulesOptionalParams,
  NetworkWatchersGetNextHopOptionalParams,
  NetworkWatchersVerifyIPFlowOptionalParams,
  NetworkWatchersGetTopologyOptionalParams,
  NetworkWatchersListAllOptionalParams,
  NetworkWatchersListOptionalParams,
  NetworkWatchersDeleteOptionalParams,
  NetworkWatchersUpdateTagsOptionalParams,
  NetworkWatchersCreateOrUpdateOptionalParams,
  NetworkWatchersGetOptionalParams,
} from "../../api/networkWatchers/options.js";
import type {
  TagsObject,
  NetworkWatcher,
  TopologyParameters,
  Topology,
  VerificationIPFlowParameters,
  VerificationIPFlowResult,
  NextHopParameters,
  NextHopResult,
  SecurityGroupViewParameters,
  SecurityGroupViewResult,
  TroubleshootingParameters,
  TroubleshootingResult,
  QueryTroubleshootingParameters,
  FlowLogInformation,
  FlowLogStatusParameters,
  ConnectivityParameters,
  ConnectivityInformation,
  AzureReachabilityReportParameters,
  AzureReachabilityReport,
  AvailableProvidersListParameters,
  AvailableProvidersList,
  NetworkConfigurationDiagnosticParameters,
  NetworkConfigurationDiagnosticResponse,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkWatchers operations. */
export interface NetworkWatchersOperations {
  /** Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results. */
  getNetworkConfigurationDiagnostic: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NetworkConfigurationDiagnosticParameters,
    options?: NetworkWatchersGetNetworkConfigurationDiagnosticOptionalParams,
  ) => PollerLike<
    OperationState<NetworkConfigurationDiagnosticResponse>,
    NetworkConfigurationDiagnosticResponse
  >;
  /** @deprecated use getNetworkConfigurationDiagnostic instead */
  beginGetNetworkConfigurationDiagnostic: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NetworkConfigurationDiagnosticParameters,
    options?: NetworkWatchersGetNetworkConfigurationDiagnosticOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkConfigurationDiagnosticResponse>,
      NetworkConfigurationDiagnosticResponse
    >
  >;
  /** @deprecated use getNetworkConfigurationDiagnostic instead */
  beginGetNetworkConfigurationDiagnosticAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NetworkConfigurationDiagnosticParameters,
    options?: NetworkWatchersGetNetworkConfigurationDiagnosticOptionalParams,
  ) => Promise<NetworkConfigurationDiagnosticResponse>;
  /** NOTE: This feature is currently in preview and still being tested for stability. Lists all available internet service providers for a specified Azure region. */
  listAvailableProviders: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: AvailableProvidersListParameters,
    options?: NetworkWatchersListAvailableProvidersOptionalParams,
  ) => PollerLike<OperationState<AvailableProvidersList>, AvailableProvidersList>;
  /** @deprecated use listAvailableProviders instead */
  beginListAvailableProviders: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: AvailableProvidersListParameters,
    options?: NetworkWatchersListAvailableProvidersOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AvailableProvidersList>, AvailableProvidersList>>;
  /** @deprecated use listAvailableProviders instead */
  beginListAvailableProvidersAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: AvailableProvidersListParameters,
    options?: NetworkWatchersListAvailableProvidersOptionalParams,
  ) => Promise<AvailableProvidersList>;
  /** NOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions. */
  getAzureReachabilityReport: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: AzureReachabilityReportParameters,
    options?: NetworkWatchersGetAzureReachabilityReportOptionalParams,
  ) => PollerLike<OperationState<AzureReachabilityReport>, AzureReachabilityReport>;
  /** @deprecated use getAzureReachabilityReport instead */
  beginGetAzureReachabilityReport: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: AzureReachabilityReportParameters,
    options?: NetworkWatchersGetAzureReachabilityReportOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AzureReachabilityReport>, AzureReachabilityReport>>;
  /** @deprecated use getAzureReachabilityReport instead */
  beginGetAzureReachabilityReportAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: AzureReachabilityReportParameters,
    options?: NetworkWatchersGetAzureReachabilityReportOptionalParams,
  ) => Promise<AzureReachabilityReport>;
  /** Verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server. */
  checkConnectivity: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: ConnectivityParameters,
    options?: NetworkWatchersCheckConnectivityOptionalParams,
  ) => PollerLike<OperationState<ConnectivityInformation>, ConnectivityInformation>;
  /** @deprecated use checkConnectivity instead */
  beginCheckConnectivity: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: ConnectivityParameters,
    options?: NetworkWatchersCheckConnectivityOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectivityInformation>, ConnectivityInformation>>;
  /** @deprecated use checkConnectivity instead */
  beginCheckConnectivityAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: ConnectivityParameters,
    options?: NetworkWatchersCheckConnectivityOptionalParams,
  ) => Promise<ConnectivityInformation>;
  /** Queries status of flow log and traffic analytics (optional) on a specified resource. */
  getFlowLogStatus: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: FlowLogStatusParameters,
    options?: NetworkWatchersGetFlowLogStatusOptionalParams,
  ) => PollerLike<OperationState<FlowLogInformation>, FlowLogInformation>;
  /** @deprecated use getFlowLogStatus instead */
  beginGetFlowLogStatus: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: FlowLogStatusParameters,
    options?: NetworkWatchersGetFlowLogStatusOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FlowLogInformation>, FlowLogInformation>>;
  /** @deprecated use getFlowLogStatus instead */
  beginGetFlowLogStatusAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: FlowLogStatusParameters,
    options?: NetworkWatchersGetFlowLogStatusOptionalParams,
  ) => Promise<FlowLogInformation>;
  /** Configures flow log and traffic analytics (optional) on a specified resource. */
  setFlowLogConfiguration: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: FlowLogInformation,
    options?: NetworkWatchersSetFlowLogConfigurationOptionalParams,
  ) => PollerLike<OperationState<FlowLogInformation>, FlowLogInformation>;
  /** @deprecated use setFlowLogConfiguration instead */
  beginSetFlowLogConfiguration: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: FlowLogInformation,
    options?: NetworkWatchersSetFlowLogConfigurationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FlowLogInformation>, FlowLogInformation>>;
  /** @deprecated use setFlowLogConfiguration instead */
  beginSetFlowLogConfigurationAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: FlowLogInformation,
    options?: NetworkWatchersSetFlowLogConfigurationOptionalParams,
  ) => Promise<FlowLogInformation>;
  /** Get the last completed troubleshooting result on a specified resource. */
  getTroubleshootingResult: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: QueryTroubleshootingParameters,
    options?: NetworkWatchersGetTroubleshootingResultOptionalParams,
  ) => PollerLike<OperationState<TroubleshootingResult>, TroubleshootingResult>;
  /** @deprecated use getTroubleshootingResult instead */
  beginGetTroubleshootingResult: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: QueryTroubleshootingParameters,
    options?: NetworkWatchersGetTroubleshootingResultOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TroubleshootingResult>, TroubleshootingResult>>;
  /** @deprecated use getTroubleshootingResult instead */
  beginGetTroubleshootingResultAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: QueryTroubleshootingParameters,
    options?: NetworkWatchersGetTroubleshootingResultOptionalParams,
  ) => Promise<TroubleshootingResult>;
  /** Initiate troubleshooting on a specified resource. */
  getTroubleshooting: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: TroubleshootingParameters,
    options?: NetworkWatchersGetTroubleshootingOptionalParams,
  ) => PollerLike<OperationState<TroubleshootingResult>, TroubleshootingResult>;
  /** @deprecated use getTroubleshooting instead */
  beginGetTroubleshooting: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: TroubleshootingParameters,
    options?: NetworkWatchersGetTroubleshootingOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TroubleshootingResult>, TroubleshootingResult>>;
  /** @deprecated use getTroubleshooting instead */
  beginGetTroubleshootingAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: TroubleshootingParameters,
    options?: NetworkWatchersGetTroubleshootingOptionalParams,
  ) => Promise<TroubleshootingResult>;
  /** Gets the configured and effective security group rules on the specified VM. */
  getVMSecurityRules: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: SecurityGroupViewParameters,
    options?: NetworkWatchersGetVMSecurityRulesOptionalParams,
  ) => PollerLike<OperationState<SecurityGroupViewResult>, SecurityGroupViewResult>;
  /** @deprecated use getVMSecurityRules instead */
  beginGetVMSecurityRules: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: SecurityGroupViewParameters,
    options?: NetworkWatchersGetVMSecurityRulesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SecurityGroupViewResult>, SecurityGroupViewResult>>;
  /** @deprecated use getVMSecurityRules instead */
  beginGetVMSecurityRulesAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: SecurityGroupViewParameters,
    options?: NetworkWatchersGetVMSecurityRulesOptionalParams,
  ) => Promise<SecurityGroupViewResult>;
  /** Gets the next hop from the specified VM. */
  getNextHop: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NextHopParameters,
    options?: NetworkWatchersGetNextHopOptionalParams,
  ) => PollerLike<OperationState<NextHopResult>, NextHopResult>;
  /** @deprecated use getNextHop instead */
  beginGetNextHop: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NextHopParameters,
    options?: NetworkWatchersGetNextHopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NextHopResult>, NextHopResult>>;
  /** @deprecated use getNextHop instead */
  beginGetNextHopAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NextHopParameters,
    options?: NetworkWatchersGetNextHopOptionalParams,
  ) => Promise<NextHopResult>;
  /** Verify IP flow from the specified VM to a location given the currently configured NSG rules. */
  verifyIPFlow: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: VerificationIPFlowParameters,
    options?: NetworkWatchersVerifyIPFlowOptionalParams,
  ) => PollerLike<OperationState<VerificationIPFlowResult>, VerificationIPFlowResult>;
  /** @deprecated use verifyIPFlow instead */
  beginVerifyIPFlow: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: VerificationIPFlowParameters,
    options?: NetworkWatchersVerifyIPFlowOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VerificationIPFlowResult>, VerificationIPFlowResult>
  >;
  /** @deprecated use verifyIPFlow instead */
  beginVerifyIPFlowAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: VerificationIPFlowParameters,
    options?: NetworkWatchersVerifyIPFlowOptionalParams,
  ) => Promise<VerificationIPFlowResult>;
  /** Gets the current network topology by resource group. */
  getTopology: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: TopologyParameters,
    options?: NetworkWatchersGetTopologyOptionalParams,
  ) => Promise<Topology>;
  /** Gets all network watchers by subscription. */
  listAll: (
    options?: NetworkWatchersListAllOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkWatcher>;
  /** Gets all network watchers by resource group. */
  list: (
    resourceGroupName: string,
    options?: NetworkWatchersListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkWatcher>;
  /** Deletes the specified network watcher resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkWatcherName: string,
    options?: NetworkWatchersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkWatcherName: string,
    options?: NetworkWatchersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    options?: NetworkWatchersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a network watcher tags. */
  updateTags: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: TagsObject,
    options?: NetworkWatchersUpdateTagsOptionalParams,
  ) => Promise<NetworkWatcher>;
  /** Creates or updates a network watcher in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NetworkWatcher,
    options?: NetworkWatchersCreateOrUpdateOptionalParams,
  ) => Promise<NetworkWatcher>;
  /** Gets the specified network watcher by resource group. */
  get: (
    resourceGroupName: string,
    networkWatcherName: string,
    options?: NetworkWatchersGetOptionalParams,
  ) => Promise<NetworkWatcher>;
}

function _getNetworkWatchers(context: NetworkManagementContext) {
  return {
    getNetworkConfigurationDiagnostic: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: NetworkConfigurationDiagnosticParameters,
      options?: NetworkWatchersGetNetworkConfigurationDiagnosticOptionalParams,
    ) =>
      getNetworkConfigurationDiagnostic(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      ),
    beginGetNetworkConfigurationDiagnostic: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: NetworkConfigurationDiagnosticParameters,
      options?: NetworkWatchersGetNetworkConfigurationDiagnosticOptionalParams,
    ) => {
      const poller = getNetworkConfigurationDiagnostic(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetNetworkConfigurationDiagnosticAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: NetworkConfigurationDiagnosticParameters,
      options?: NetworkWatchersGetNetworkConfigurationDiagnosticOptionalParams,
    ) => {
      return await getNetworkConfigurationDiagnostic(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    listAvailableProviders: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: AvailableProvidersListParameters,
      options?: NetworkWatchersListAvailableProvidersOptionalParams,
    ) =>
      listAvailableProviders(context, resourceGroupName, networkWatcherName, parameters, options),
    beginListAvailableProviders: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: AvailableProvidersListParameters,
      options?: NetworkWatchersListAvailableProvidersOptionalParams,
    ) => {
      const poller = listAvailableProviders(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListAvailableProvidersAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: AvailableProvidersListParameters,
      options?: NetworkWatchersListAvailableProvidersOptionalParams,
    ) => {
      return await listAvailableProviders(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    getAzureReachabilityReport: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: AzureReachabilityReportParameters,
      options?: NetworkWatchersGetAzureReachabilityReportOptionalParams,
    ) =>
      getAzureReachabilityReport(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      ),
    beginGetAzureReachabilityReport: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: AzureReachabilityReportParameters,
      options?: NetworkWatchersGetAzureReachabilityReportOptionalParams,
    ) => {
      const poller = getAzureReachabilityReport(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetAzureReachabilityReportAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: AzureReachabilityReportParameters,
      options?: NetworkWatchersGetAzureReachabilityReportOptionalParams,
    ) => {
      return await getAzureReachabilityReport(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    checkConnectivity: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: ConnectivityParameters,
      options?: NetworkWatchersCheckConnectivityOptionalParams,
    ) => checkConnectivity(context, resourceGroupName, networkWatcherName, parameters, options),
    beginCheckConnectivity: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: ConnectivityParameters,
      options?: NetworkWatchersCheckConnectivityOptionalParams,
    ) => {
      const poller = checkConnectivity(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCheckConnectivityAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: ConnectivityParameters,
      options?: NetworkWatchersCheckConnectivityOptionalParams,
    ) => {
      return await checkConnectivity(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    getFlowLogStatus: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: FlowLogStatusParameters,
      options?: NetworkWatchersGetFlowLogStatusOptionalParams,
    ) => getFlowLogStatus(context, resourceGroupName, networkWatcherName, parameters, options),
    beginGetFlowLogStatus: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: FlowLogStatusParameters,
      options?: NetworkWatchersGetFlowLogStatusOptionalParams,
    ) => {
      const poller = getFlowLogStatus(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetFlowLogStatusAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: FlowLogStatusParameters,
      options?: NetworkWatchersGetFlowLogStatusOptionalParams,
    ) => {
      return await getFlowLogStatus(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    setFlowLogConfiguration: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: FlowLogInformation,
      options?: NetworkWatchersSetFlowLogConfigurationOptionalParams,
    ) =>
      setFlowLogConfiguration(context, resourceGroupName, networkWatcherName, parameters, options),
    beginSetFlowLogConfiguration: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: FlowLogInformation,
      options?: NetworkWatchersSetFlowLogConfigurationOptionalParams,
    ) => {
      const poller = setFlowLogConfiguration(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSetFlowLogConfigurationAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: FlowLogInformation,
      options?: NetworkWatchersSetFlowLogConfigurationOptionalParams,
    ) => {
      return await setFlowLogConfiguration(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    getTroubleshootingResult: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: QueryTroubleshootingParameters,
      options?: NetworkWatchersGetTroubleshootingResultOptionalParams,
    ) =>
      getTroubleshootingResult(context, resourceGroupName, networkWatcherName, parameters, options),
    beginGetTroubleshootingResult: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: QueryTroubleshootingParameters,
      options?: NetworkWatchersGetTroubleshootingResultOptionalParams,
    ) => {
      const poller = getTroubleshootingResult(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetTroubleshootingResultAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: QueryTroubleshootingParameters,
      options?: NetworkWatchersGetTroubleshootingResultOptionalParams,
    ) => {
      return await getTroubleshootingResult(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    getTroubleshooting: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: TroubleshootingParameters,
      options?: NetworkWatchersGetTroubleshootingOptionalParams,
    ) => getTroubleshooting(context, resourceGroupName, networkWatcherName, parameters, options),
    beginGetTroubleshooting: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: TroubleshootingParameters,
      options?: NetworkWatchersGetTroubleshootingOptionalParams,
    ) => {
      const poller = getTroubleshooting(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetTroubleshootingAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: TroubleshootingParameters,
      options?: NetworkWatchersGetTroubleshootingOptionalParams,
    ) => {
      return await getTroubleshooting(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    getVMSecurityRules: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: SecurityGroupViewParameters,
      options?: NetworkWatchersGetVMSecurityRulesOptionalParams,
    ) => getVMSecurityRules(context, resourceGroupName, networkWatcherName, parameters, options),
    beginGetVMSecurityRules: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: SecurityGroupViewParameters,
      options?: NetworkWatchersGetVMSecurityRulesOptionalParams,
    ) => {
      const poller = getVMSecurityRules(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetVMSecurityRulesAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: SecurityGroupViewParameters,
      options?: NetworkWatchersGetVMSecurityRulesOptionalParams,
    ) => {
      return await getVMSecurityRules(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    getNextHop: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: NextHopParameters,
      options?: NetworkWatchersGetNextHopOptionalParams,
    ) => getNextHop(context, resourceGroupName, networkWatcherName, parameters, options),
    beginGetNextHop: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: NextHopParameters,
      options?: NetworkWatchersGetNextHopOptionalParams,
    ) => {
      const poller = getNextHop(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetNextHopAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: NextHopParameters,
      options?: NetworkWatchersGetNextHopOptionalParams,
    ) => {
      return await getNextHop(context, resourceGroupName, networkWatcherName, parameters, options);
    },
    verifyIPFlow: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: VerificationIPFlowParameters,
      options?: NetworkWatchersVerifyIPFlowOptionalParams,
    ) => verifyIPFlow(context, resourceGroupName, networkWatcherName, parameters, options),
    beginVerifyIPFlow: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: VerificationIPFlowParameters,
      options?: NetworkWatchersVerifyIPFlowOptionalParams,
    ) => {
      const poller = verifyIPFlow(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginVerifyIPFlowAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: VerificationIPFlowParameters,
      options?: NetworkWatchersVerifyIPFlowOptionalParams,
    ) => {
      return await verifyIPFlow(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      );
    },
    getTopology: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: TopologyParameters,
      options?: NetworkWatchersGetTopologyOptionalParams,
    ) => getTopology(context, resourceGroupName, networkWatcherName, parameters, options),
    listAll: (options?: NetworkWatchersListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: NetworkWatchersListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkWatcherName: string,
      options?: NetworkWatchersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkWatcherName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkWatcherName: string,
      options?: NetworkWatchersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkWatcherName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      options?: NetworkWatchersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkWatcherName, options);
    },
    updateTags: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: TagsObject,
      options?: NetworkWatchersUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, networkWatcherName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkWatcherName: string,
      parameters: NetworkWatcher,
      options?: NetworkWatchersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, networkWatcherName, parameters, options),
    get: (
      resourceGroupName: string,
      networkWatcherName: string,
      options?: NetworkWatchersGetOptionalParams,
    ) => get(context, resourceGroupName, networkWatcherName, options),
  };
}

export function _getNetworkWatchersOperations(
  context: NetworkManagementContext,
): NetworkWatchersOperations {
  return {
    ..._getNetworkWatchers(context),
  };
}
