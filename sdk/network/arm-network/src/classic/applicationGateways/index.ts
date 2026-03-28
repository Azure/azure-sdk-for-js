// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAvailableWafRuleSets,
  listAvailableResponseHeaders,
  listAvailableRequestHeaders,
  listAvailableServerVariables,
  getSslPredefinedPolicy,
  listAvailableSslPredefinedPolicies,
  listAvailableSslOptions,
  backendHealthOnDemand,
  backendHealth,
  stop,
  start,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/applicationGateways/operations.js";
import type {
  ApplicationGatewaysListAvailableWafRuleSetsOptionalParams,
  ApplicationGatewaysListAvailableResponseHeadersOptionalParams,
  ApplicationGatewaysListAvailableRequestHeadersOptionalParams,
  ApplicationGatewaysListAvailableServerVariablesOptionalParams,
  ApplicationGatewaysGetSslPredefinedPolicyOptionalParams,
  ApplicationGatewaysListAvailableSslPredefinedPoliciesOptionalParams,
  ApplicationGatewaysListAvailableSslOptionsOptionalParams,
  ApplicationGatewaysBackendHealthOnDemandOptionalParams,
  ApplicationGatewaysBackendHealthOptionalParams,
  ApplicationGatewaysStopOptionalParams,
  ApplicationGatewaysStartOptionalParams,
  ApplicationGatewaysListAllOptionalParams,
  ApplicationGatewaysListOptionalParams,
  ApplicationGatewaysDeleteOptionalParams,
  ApplicationGatewaysUpdateTagsOptionalParams,
  ApplicationGatewaysCreateOrUpdateOptionalParams,
  ApplicationGatewaysGetOptionalParams,
} from "../../api/applicationGateways/options.js";
import type {
  ApplicationGateway,
  TagsObject,
  ApplicationGatewayBackendHealth,
  ApplicationGatewayOnDemandProbe,
  ApplicationGatewayBackendHealthOnDemand,
  ApplicationGatewayAvailableSslOptions,
  ApplicationGatewaySslPredefinedPolicy,
  ApplicationGatewayAvailableWafRuleSetsResult,
} from "../../models/microsoft/network/models.js";
import type {
  ApplicationGatewaysListAvailableResponseHeadersResponse,
  ApplicationGatewaysListAvailableRequestHeadersResponse,
  ApplicationGatewaysListAvailableServerVariablesResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApplicationGateways operations. */
export interface ApplicationGatewaysOperations {
  /** Lists all available web application firewall rule sets. */
  listAvailableWafRuleSets: (
    options?: ApplicationGatewaysListAvailableWafRuleSetsOptionalParams,
  ) => Promise<ApplicationGatewayAvailableWafRuleSetsResult>;
  /** Lists all available response headers. */
  listAvailableResponseHeaders: (
    options?: ApplicationGatewaysListAvailableResponseHeadersOptionalParams,
  ) => Promise<ApplicationGatewaysListAvailableResponseHeadersResponse>;
  /** Lists all available request headers. */
  listAvailableRequestHeaders: (
    options?: ApplicationGatewaysListAvailableRequestHeadersOptionalParams,
  ) => Promise<ApplicationGatewaysListAvailableRequestHeadersResponse>;
  /** Lists all available server variables. */
  listAvailableServerVariables: (
    options?: ApplicationGatewaysListAvailableServerVariablesOptionalParams,
  ) => Promise<ApplicationGatewaysListAvailableServerVariablesResponse>;
  /** Gets Ssl predefined policy with the specified policy name. */
  getSslPredefinedPolicy: (
    predefinedPolicyName: string,
    options?: ApplicationGatewaysGetSslPredefinedPolicyOptionalParams,
  ) => Promise<ApplicationGatewaySslPredefinedPolicy>;
  /** Lists all SSL predefined policies for configuring Ssl policy. */
  listAvailableSslPredefinedPolicies: (
    options?: ApplicationGatewaysListAvailableSslPredefinedPoliciesOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationGatewaySslPredefinedPolicy>;
  /** Lists available Ssl options for configuring Ssl policy. */
  listAvailableSslOptions: (
    options?: ApplicationGatewaysListAvailableSslOptionsOptionalParams,
  ) => Promise<ApplicationGatewayAvailableSslOptions>;
  /** Gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group. */
  backendHealthOnDemand: (
    resourceGroupName: string,
    applicationGatewayName: string,
    probeRequest: ApplicationGatewayOnDemandProbe,
    options?: ApplicationGatewaysBackendHealthOnDemandOptionalParams,
  ) => PollerLike<
    OperationState<ApplicationGatewayBackendHealthOnDemand>,
    ApplicationGatewayBackendHealthOnDemand
  >;
  /** @deprecated use backendHealthOnDemand instead */
  beginBackendHealthOnDemand: (
    resourceGroupName: string,
    applicationGatewayName: string,
    probeRequest: ApplicationGatewayOnDemandProbe,
    options?: ApplicationGatewaysBackendHealthOnDemandOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ApplicationGatewayBackendHealthOnDemand>,
      ApplicationGatewayBackendHealthOnDemand
    >
  >;
  /** @deprecated use backendHealthOnDemand instead */
  beginBackendHealthOnDemandAndWait: (
    resourceGroupName: string,
    applicationGatewayName: string,
    probeRequest: ApplicationGatewayOnDemandProbe,
    options?: ApplicationGatewaysBackendHealthOnDemandOptionalParams,
  ) => Promise<ApplicationGatewayBackendHealthOnDemand>;
  /** Gets the backend health of the specified application gateway in a resource group. */
  backendHealth: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysBackendHealthOptionalParams,
  ) => PollerLike<OperationState<ApplicationGatewayBackendHealth>, ApplicationGatewayBackendHealth>;
  /** @deprecated use backendHealth instead */
  beginBackendHealth: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysBackendHealthOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ApplicationGatewayBackendHealth>,
      ApplicationGatewayBackendHealth
    >
  >;
  /** @deprecated use backendHealth instead */
  beginBackendHealthAndWait: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysBackendHealthOptionalParams,
  ) => Promise<ApplicationGatewayBackendHealth>;
  /** Stops the specified application gateway in a resource group. */
  stop: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysStopOptionalParams,
  ) => Promise<void>;
  /** Starts the specified application gateway. */
  start: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysStartOptionalParams,
  ) => Promise<void>;
  /** Gets all the application gateways in a subscription. */
  listAll: (
    options?: ApplicationGatewaysListAllOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationGateway>;
  /** Lists all application gateways in a resource group. */
  list: (
    resourceGroupName: string,
    options?: ApplicationGatewaysListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationGateway>;
  /** Deletes the specified application gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specified application gateway tags. */
  updateTags: (
    resourceGroupName: string,
    applicationGatewayName: string,
    parameters: TagsObject,
    options?: ApplicationGatewaysUpdateTagsOptionalParams,
  ) => Promise<ApplicationGateway>;
  /** Creates or updates the specified application gateway. */
  createOrUpdate: (
    resourceGroupName: string,
    applicationGatewayName: string,
    parameters: ApplicationGateway,
    options?: ApplicationGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApplicationGateway>, ApplicationGateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    applicationGatewayName: string,
    parameters: ApplicationGateway,
    options?: ApplicationGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ApplicationGateway>, ApplicationGateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    applicationGatewayName: string,
    parameters: ApplicationGateway,
    options?: ApplicationGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<ApplicationGateway>;
  /** Gets the specified application gateway. */
  get: (
    resourceGroupName: string,
    applicationGatewayName: string,
    options?: ApplicationGatewaysGetOptionalParams,
  ) => Promise<ApplicationGateway>;
}

function _getApplicationGateways(context: NetworkManagementContext) {
  return {
    listAvailableWafRuleSets: (
      options?: ApplicationGatewaysListAvailableWafRuleSetsOptionalParams,
    ) => listAvailableWafRuleSets(context, options),
    listAvailableResponseHeaders: (
      options?: ApplicationGatewaysListAvailableResponseHeadersOptionalParams,
    ) => listAvailableResponseHeaders(context, options),
    listAvailableRequestHeaders: (
      options?: ApplicationGatewaysListAvailableRequestHeadersOptionalParams,
    ) => listAvailableRequestHeaders(context, options),
    listAvailableServerVariables: (
      options?: ApplicationGatewaysListAvailableServerVariablesOptionalParams,
    ) => listAvailableServerVariables(context, options),
    getSslPredefinedPolicy: (
      predefinedPolicyName: string,
      options?: ApplicationGatewaysGetSslPredefinedPolicyOptionalParams,
    ) => getSslPredefinedPolicy(context, predefinedPolicyName, options),
    listAvailableSslPredefinedPolicies: (
      options?: ApplicationGatewaysListAvailableSslPredefinedPoliciesOptionalParams,
    ) => listAvailableSslPredefinedPolicies(context, options),
    listAvailableSslOptions: (options?: ApplicationGatewaysListAvailableSslOptionsOptionalParams) =>
      listAvailableSslOptions(context, options),
    backendHealthOnDemand: (
      resourceGroupName: string,
      applicationGatewayName: string,
      probeRequest: ApplicationGatewayOnDemandProbe,
      options?: ApplicationGatewaysBackendHealthOnDemandOptionalParams,
    ) =>
      backendHealthOnDemand(
        context,
        resourceGroupName,
        applicationGatewayName,
        probeRequest,
        options,
      ),
    beginBackendHealthOnDemand: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      probeRequest: ApplicationGatewayOnDemandProbe,
      options?: ApplicationGatewaysBackendHealthOnDemandOptionalParams,
    ) => {
      const poller = backendHealthOnDemand(
        context,
        resourceGroupName,
        applicationGatewayName,
        probeRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginBackendHealthOnDemandAndWait: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      probeRequest: ApplicationGatewayOnDemandProbe,
      options?: ApplicationGatewaysBackendHealthOnDemandOptionalParams,
    ) => {
      return await backendHealthOnDemand(
        context,
        resourceGroupName,
        applicationGatewayName,
        probeRequest,
        options,
      );
    },
    backendHealth: (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysBackendHealthOptionalParams,
    ) => backendHealth(context, resourceGroupName, applicationGatewayName, options),
    beginBackendHealth: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysBackendHealthOptionalParams,
    ) => {
      const poller = backendHealth(context, resourceGroupName, applicationGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginBackendHealthAndWait: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysBackendHealthOptionalParams,
    ) => {
      return await backendHealth(context, resourceGroupName, applicationGatewayName, options);
    },
    stop: (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysStopOptionalParams,
    ) => stop(context, resourceGroupName, applicationGatewayName, options),
    beginStop: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, applicationGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, applicationGatewayName, options);
    },
    start: (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysStartOptionalParams,
    ) => start(context, resourceGroupName, applicationGatewayName, options),
    beginStart: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, applicationGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, applicationGatewayName, options);
    },
    listAll: (options?: ApplicationGatewaysListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: ApplicationGatewaysListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, applicationGatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, applicationGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, applicationGatewayName, options);
    },
    updateTags: (
      resourceGroupName: string,
      applicationGatewayName: string,
      parameters: TagsObject,
      options?: ApplicationGatewaysUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, applicationGatewayName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      applicationGatewayName: string,
      parameters: ApplicationGateway,
      options?: ApplicationGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, applicationGatewayName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      parameters: ApplicationGateway,
      options?: ApplicationGatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        applicationGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      applicationGatewayName: string,
      parameters: ApplicationGateway,
      options?: ApplicationGatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        applicationGatewayName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      applicationGatewayName: string,
      options?: ApplicationGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, applicationGatewayName, options),
  };
}

export function _getApplicationGatewaysOperations(
  context: NetworkManagementContext,
): ApplicationGatewaysOperations {
  return {
    ..._getApplicationGateways(context),
  };
}
