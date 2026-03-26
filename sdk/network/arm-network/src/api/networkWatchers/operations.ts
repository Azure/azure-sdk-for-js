// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  NetworkWatcher,
  _NetworkWatcherListResult,
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
import {
  tagsObjectSerializer,
  networkWatcherSerializer,
  networkWatcherDeserializer,
  errorResponseDeserializer,
  _networkWatcherListResultDeserializer,
  topologyParametersSerializer,
  topologyDeserializer,
  verificationIPFlowParametersSerializer,
  verificationIPFlowResultDeserializer,
  nextHopParametersSerializer,
  nextHopResultDeserializer,
  securityGroupViewParametersSerializer,
  securityGroupViewResultDeserializer,
  troubleshootingParametersSerializer,
  troubleshootingResultDeserializer,
  queryTroubleshootingParametersSerializer,
  flowLogInformationSerializer,
  flowLogInformationDeserializer,
  flowLogStatusParametersSerializer,
  connectivityParametersSerializer,
  connectivityInformationDeserializer,
  azureReachabilityReportParametersSerializer,
  azureReachabilityReportDeserializer,
  availableProvidersListParametersSerializer,
  availableProvidersListDeserializer,
  networkConfigurationDiagnosticParametersSerializer,
  networkConfigurationDiagnosticResponseDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getNetworkConfigurationDiagnosticSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: NetworkConfigurationDiagnosticParameters,
  options: NetworkWatchersGetNetworkConfigurationDiagnosticOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/networkConfigurationDiagnostic{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkConfigurationDiagnosticParametersSerializer(parameters),
  });
}

export async function _getNetworkConfigurationDiagnosticDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkConfigurationDiagnosticResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkConfigurationDiagnosticResponseDeserializer(result.body);
}

/** Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results. */
export function getNetworkConfigurationDiagnostic(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: NetworkConfigurationDiagnosticParameters,
  options: NetworkWatchersGetNetworkConfigurationDiagnosticOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkConfigurationDiagnosticResponse>,
  NetworkConfigurationDiagnosticResponse
> {
  return getLongRunningPoller(
    context,
    _getNetworkConfigurationDiagnosticDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getNetworkConfigurationDiagnosticSend(
          context,
          resourceGroupName,
          networkWatcherName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<
    OperationState<NetworkConfigurationDiagnosticResponse>,
    NetworkConfigurationDiagnosticResponse
  >;
}

export function _listAvailableProvidersSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: AvailableProvidersListParameters,
  options: NetworkWatchersListAvailableProvidersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/availableProvidersList{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: availableProvidersListParametersSerializer(parameters),
  });
}

export async function _listAvailableProvidersDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailableProvidersList> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return availableProvidersListDeserializer(result.body);
}

/** NOTE: This feature is currently in preview and still being tested for stability. Lists all available internet service providers for a specified Azure region. */
export function listAvailableProviders(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: AvailableProvidersListParameters,
  options: NetworkWatchersListAvailableProvidersOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AvailableProvidersList>, AvailableProvidersList> {
  return getLongRunningPoller(context, _listAvailableProvidersDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listAvailableProvidersSend(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<AvailableProvidersList>, AvailableProvidersList>;
}

export function _getAzureReachabilityReportSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: AzureReachabilityReportParameters,
  options: NetworkWatchersGetAzureReachabilityReportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/azureReachabilityReport{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: azureReachabilityReportParametersSerializer(parameters),
  });
}

export async function _getAzureReachabilityReportDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureReachabilityReport> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return azureReachabilityReportDeserializer(result.body);
}

/** NOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions. */
export function getAzureReachabilityReport(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: AzureReachabilityReportParameters,
  options: NetworkWatchersGetAzureReachabilityReportOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AzureReachabilityReport>, AzureReachabilityReport> {
  return getLongRunningPoller(
    context,
    _getAzureReachabilityReportDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getAzureReachabilityReportSend(
          context,
          resourceGroupName,
          networkWatcherName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<AzureReachabilityReport>, AzureReachabilityReport>;
}

export function _checkConnectivitySend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: ConnectivityParameters,
  options: NetworkWatchersCheckConnectivityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/connectivityCheck{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectivityParametersSerializer(parameters),
  });
}

export async function _checkConnectivityDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectivityInformation> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectivityInformationDeserializer(result.body);
}

/** Verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server. */
export function checkConnectivity(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: ConnectivityParameters,
  options: NetworkWatchersCheckConnectivityOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectivityInformation>, ConnectivityInformation> {
  return getLongRunningPoller(context, _checkConnectivityDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _checkConnectivitySend(context, resourceGroupName, networkWatcherName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ConnectivityInformation>, ConnectivityInformation>;
}

export function _getFlowLogStatusSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: FlowLogStatusParameters,
  options: NetworkWatchersGetFlowLogStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/queryFlowLogStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: flowLogStatusParametersSerializer(parameters),
  });
}

export async function _getFlowLogStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<FlowLogInformation> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return flowLogInformationDeserializer(result.body);
}

/** Queries status of flow log and traffic analytics (optional) on a specified resource. */
export function getFlowLogStatus(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: FlowLogStatusParameters,
  options: NetworkWatchersGetFlowLogStatusOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FlowLogInformation>, FlowLogInformation> {
  return getLongRunningPoller(context, _getFlowLogStatusDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getFlowLogStatusSend(context, resourceGroupName, networkWatcherName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<FlowLogInformation>, FlowLogInformation>;
}

export function _setFlowLogConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: FlowLogInformation,
  options: NetworkWatchersSetFlowLogConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/configureFlowLog{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: flowLogInformationSerializer(parameters),
  });
}

export async function _setFlowLogConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<FlowLogInformation> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return flowLogInformationDeserializer(result.body);
}

/** Configures flow log and traffic analytics (optional) on a specified resource. */
export function setFlowLogConfiguration(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: FlowLogInformation,
  options: NetworkWatchersSetFlowLogConfigurationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FlowLogInformation>, FlowLogInformation> {
  return getLongRunningPoller(context, _setFlowLogConfigurationDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _setFlowLogConfigurationSend(
        context,
        resourceGroupName,
        networkWatcherName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<FlowLogInformation>, FlowLogInformation>;
}

export function _getTroubleshootingResultSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: QueryTroubleshootingParameters,
  options: NetworkWatchersGetTroubleshootingResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/queryTroubleshootResult{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: queryTroubleshootingParametersSerializer(parameters),
  });
}

export async function _getTroubleshootingResultDeserialize(
  result: PathUncheckedResponse,
): Promise<TroubleshootingResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return troubleshootingResultDeserializer(result.body);
}

/** Get the last completed troubleshooting result on a specified resource. */
export function getTroubleshootingResult(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: QueryTroubleshootingParameters,
  options: NetworkWatchersGetTroubleshootingResultOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TroubleshootingResult>, TroubleshootingResult> {
  return getLongRunningPoller(
    context,
    _getTroubleshootingResultDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getTroubleshootingResultSend(
          context,
          resourceGroupName,
          networkWatcherName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<TroubleshootingResult>, TroubleshootingResult>;
}

export function _getTroubleshootingSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: TroubleshootingParameters,
  options: NetworkWatchersGetTroubleshootingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/troubleshoot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: troubleshootingParametersSerializer(parameters),
  });
}

export async function _getTroubleshootingDeserialize(
  result: PathUncheckedResponse,
): Promise<TroubleshootingResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return troubleshootingResultDeserializer(result.body);
}

/** Initiate troubleshooting on a specified resource. */
export function getTroubleshooting(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: TroubleshootingParameters,
  options: NetworkWatchersGetTroubleshootingOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TroubleshootingResult>, TroubleshootingResult> {
  return getLongRunningPoller(context, _getTroubleshootingDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getTroubleshootingSend(context, resourceGroupName, networkWatcherName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<TroubleshootingResult>, TroubleshootingResult>;
}

export function _getVMSecurityRulesSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: SecurityGroupViewParameters,
  options: NetworkWatchersGetVMSecurityRulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/securityGroupView{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityGroupViewParametersSerializer(parameters),
  });
}

export async function _getVMSecurityRulesDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityGroupViewResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityGroupViewResultDeserializer(result.body);
}

/** Gets the configured and effective security group rules on the specified VM. */
export function getVMSecurityRules(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: SecurityGroupViewParameters,
  options: NetworkWatchersGetVMSecurityRulesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SecurityGroupViewResult>, SecurityGroupViewResult> {
  return getLongRunningPoller(context, _getVMSecurityRulesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getVMSecurityRulesSend(context, resourceGroupName, networkWatcherName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<SecurityGroupViewResult>, SecurityGroupViewResult>;
}

export function _getNextHopSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: NextHopParameters,
  options: NetworkWatchersGetNextHopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/nextHop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: nextHopParametersSerializer(parameters),
  });
}

export async function _getNextHopDeserialize(
  result: PathUncheckedResponse,
): Promise<NextHopResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return nextHopResultDeserializer(result.body);
}

/** Gets the next hop from the specified VM. */
export function getNextHop(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: NextHopParameters,
  options: NetworkWatchersGetNextHopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NextHopResult>, NextHopResult> {
  return getLongRunningPoller(context, _getNextHopDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getNextHopSend(context, resourceGroupName, networkWatcherName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<NextHopResult>, NextHopResult>;
}

export function _verifyIPFlowSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: VerificationIPFlowParameters,
  options: NetworkWatchersVerifyIPFlowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/ipFlowVerify{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: verificationIPFlowParametersSerializer(parameters),
  });
}

export async function _verifyIPFlowDeserialize(
  result: PathUncheckedResponse,
): Promise<VerificationIPFlowResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return verificationIPFlowResultDeserializer(result.body);
}

/** Verify IP flow from the specified VM to a location given the currently configured NSG rules. */
export function verifyIPFlow(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: VerificationIPFlowParameters,
  options: NetworkWatchersVerifyIPFlowOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VerificationIPFlowResult>, VerificationIPFlowResult> {
  return getLongRunningPoller(context, _verifyIPFlowDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _verifyIPFlowSend(context, resourceGroupName, networkWatcherName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VerificationIPFlowResult>, VerificationIPFlowResult>;
}

export function _getTopologySend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: TopologyParameters,
  options: NetworkWatchersGetTopologyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/topology{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: topologyParametersSerializer(parameters),
  });
}

export async function _getTopologyDeserialize(result: PathUncheckedResponse): Promise<Topology> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return topologyDeserializer(result.body);
}

/** Gets the current network topology by resource group. */
export async function getTopology(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: TopologyParameters,
  options: NetworkWatchersGetTopologyOptionalParams = { requestOptions: {} },
): Promise<Topology> {
  const result = await _getTopologySend(
    context,
    resourceGroupName,
    networkWatcherName,
    parameters,
    options,
  );
  return _getTopologyDeserialize(result);
}

export function _listAllSend(
  context: Client,
  options: NetworkWatchersListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkWatchers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkWatcherListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkWatcherListResultDeserializer(result.body);
}

/** Gets all network watchers by subscription. */
export function listAll(
  context: Client,
  options: NetworkWatchersListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkWatcher> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: NetworkWatchersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkWatcherListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkWatcherListResultDeserializer(result.body);
}

/** Gets all network watchers by resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: NetworkWatchersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkWatcher> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  options: NetworkWatchersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified network watcher resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  options: NetworkWatchersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, networkWatcherName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: TagsObject,
  options: NetworkWatchersUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkWatcher> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkWatcherDeserializer(result.body);
}

/** Updates a network watcher tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: TagsObject,
  options: NetworkWatchersUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<NetworkWatcher> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    networkWatcherName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: NetworkWatcher,
  options: NetworkWatchersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkWatcherSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkWatcher> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkWatcherDeserializer(result.body);
}

/** Creates or updates a network watcher in the specified resource group. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  parameters: NetworkWatcher,
  options: NetworkWatchersCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<NetworkWatcher> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    networkWatcherName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  options: NetworkWatchersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkWatcherName: networkWatcherName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NetworkWatcher> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkWatcherDeserializer(result.body);
}

/** Gets the specified network watcher by resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkWatcherName: string,
  options: NetworkWatchersGetOptionalParams = { requestOptions: {} },
): Promise<NetworkWatcher> {
  const result = await _getSend(context, resourceGroupName, networkWatcherName, options);
  return _getDeserialize(result);
}
