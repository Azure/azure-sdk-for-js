// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import {
  TagsObject,
  tagsObjectSerializer,
  GatewayResiliencyInformation,
  gatewayResiliencyInformationDeserializer,
  GatewayRouteSetsInformation,
  gatewayRouteSetsInformationDeserializer,
  ExpressRouteFailoverTestDetails,
  ExpressRouteFailoverSingleTestDetails,
  ExpressRouteFailoverStopApiParameters,
  expressRouteFailoverStopApiParametersSerializer,
  ExpressRouteGateway,
  expressRouteGatewaySerializer,
  expressRouteGatewayDeserializer,
  ExpressRouteGatewayList,
  expressRouteGatewayListDeserializer,
  expressRouteFailoverTestDetailsArrayDeserializer,
  expressRouteFailoverSingleTestDetailsArrayDeserializer,
} from "../../models/microsoft/network/models.js";
import {
  ExpressRouteGatewaysStopSiteFailoverTestResponse,
  ExpressRouteGatewaysStartSiteFailoverTestResponse,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExpressRouteGatewaysGetResiliencyInformationOptionalParams,
  ExpressRouteGatewaysGetRoutesInformationOptionalParams,
  ExpressRouteGatewaysStopSiteFailoverTestOptionalParams,
  ExpressRouteGatewaysStartSiteFailoverTestOptionalParams,
  ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams,
  ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams,
  ExpressRouteGatewaysListBySubscriptionOptionalParams,
  ExpressRouteGatewaysListByResourceGroupOptionalParams,
  ExpressRouteGatewaysDeleteOptionalParams,
  ExpressRouteGatewaysUpdateTagsOptionalParams,
  ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ExpressRouteGatewaysGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getResiliencyInformationSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysGetResiliencyInformationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/getResiliencyInformation{?api%2Dversion,attemptRefresh}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
      attemptRefresh: options?.attemptRefresh,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getResiliencyInformationDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayResiliencyInformation> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return gatewayResiliencyInformationDeserializer(result.body);
}

/** Retrieves the resiliency information for the ExpressRoute gateway. */
export function getResiliencyInformation(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysGetResiliencyInformationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GatewayResiliencyInformation>, GatewayResiliencyInformation> {
  return getLongRunningPoller(
    context,
    _getResiliencyInformationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getResiliencyInformationSend(context, resourceGroupName, expressRouteGatewayName, options),
      resourceLocationConfig: "location",
      apiVersion: "2025-07-01",
    },
  ) as PollerLike<OperationState<GatewayResiliencyInformation>, GatewayResiliencyInformation>;
}

export function _getRoutesInformationSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysGetRoutesInformationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/getRoutesInformation{?api%2Dversion,attemptRefresh}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
      attemptRefresh: options?.attemptRefresh,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getRoutesInformationDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayRouteSetsInformation> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return gatewayRouteSetsInformationDeserializer(result.body);
}

/** Retrieves the route sets information for the ExpressRoute gateway. */
export function getRoutesInformation(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysGetRoutesInformationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GatewayRouteSetsInformation>, GatewayRouteSetsInformation> {
  return getLongRunningPoller(context, _getRoutesInformationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getRoutesInformationSend(context, resourceGroupName, expressRouteGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<GatewayRouteSetsInformation>, GatewayRouteSetsInformation>;
}

export function _stopSiteFailoverTestSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  body: {
    stopParameters: ExpressRouteFailoverStopApiParameters;
  },
  options: ExpressRouteGatewaysStopSiteFailoverTestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/stopSiteFailoverTest{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: expressRouteFailoverStopApiParametersSerializer(body.stopParameters),
    });
}

export async function _stopSiteFailoverTestDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteGatewaysStopSiteFailoverTestResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** Stops failover simulation on the ExpressRoute gateway for the specified peering location. */
export function stopSiteFailoverTest(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  body: {
    stopParameters: ExpressRouteFailoverStopApiParameters;
  },
  options: ExpressRouteGatewaysStopSiteFailoverTestOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteGatewaysStopSiteFailoverTestResponse>,
  ExpressRouteGatewaysStopSiteFailoverTestResponse
> {
  return getLongRunningPoller(context, _stopSiteFailoverTestDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSiteFailoverTestSend(context, resourceGroupName, expressRouteGatewayName, body, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-07-01",
  }) as PollerLike<
    OperationState<ExpressRouteGatewaysStopSiteFailoverTestResponse>,
    ExpressRouteGatewaysStopSiteFailoverTestResponse
  >;
}

export function _startSiteFailoverTestSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  peeringLocation: string,
  options: ExpressRouteGatewaysStartSiteFailoverTestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/startSiteFailoverTest{?api%2Dversion,peeringLocation}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
      peeringLocation: peeringLocation,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _startSiteFailoverTestDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteGatewaysStartSiteFailoverTestResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** Starts failover simulation on the ExpressRoute gateway for the specified peering location. */
export function startSiteFailoverTest(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  peeringLocation: string,
  options: ExpressRouteGatewaysStartSiteFailoverTestOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteGatewaysStartSiteFailoverTestResponse>,
  ExpressRouteGatewaysStartSiteFailoverTestResponse
> {
  return getLongRunningPoller(context, _startSiteFailoverTestDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSiteFailoverTestSend(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        peeringLocation,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-07-01",
  }) as PollerLike<
    OperationState<ExpressRouteGatewaysStartSiteFailoverTestResponse>,
    ExpressRouteGatewaysStartSiteFailoverTestResponse
  >;
}

export function _getFailoverSingleTestDetailsSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  peeringLocation: string,
  failoverTestId: string,
  options: ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/getFailoverSingleTestDetails{?api%2Dversion,peeringLocation,failoverTestId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
      peeringLocation: peeringLocation,
      failoverTestId: failoverTestId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getFailoverSingleTestDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteFailoverSingleTestDetails[]> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteFailoverSingleTestDetailsArrayDeserializer(result.body);
}

/** Retrieves the details of a particular failover test performed on the ExpressRoute gateway based on the test Guid. */
export function getFailoverSingleTestDetails(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  peeringLocation: string,
  failoverTestId: string,
  options: ExpressRouteGatewaysGetFailoverSingleTestDetailsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteFailoverSingleTestDetails[]>,
  ExpressRouteFailoverSingleTestDetails[]
> {
  return getLongRunningPoller(
    context,
    _getFailoverSingleTestDetailsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getFailoverSingleTestDetailsSend(
          context,
          resourceGroupName,
          expressRouteGatewayName,
          peeringLocation,
          failoverTestId,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-07-01",
    },
  ) as PollerLike<
    OperationState<ExpressRouteFailoverSingleTestDetails[]>,
    ExpressRouteFailoverSingleTestDetails[]
  >;
}

export function _getFailoverAllTestsDetailsSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/getFailoverAllTestsDetails{?api%2Dversion,type,fetchLatest}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
      type: options?.typeParam,
      fetchLatest: options?.fetchLatest,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getFailoverAllTestsDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteFailoverTestDetails[]> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteFailoverTestDetailsArrayDeserializer(result.body);
}

/** Retrieves the details of all the failover tests performed on the ExpressRoute gateway for different peering locations. */
export function getFailoverAllTestsDetails(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysGetFailoverAllTestsDetailsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteFailoverTestDetails[]>,
  ExpressRouteFailoverTestDetails[]
> {
  return getLongRunningPoller(
    context,
    _getFailoverAllTestsDetailsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getFailoverAllTestsDetailsSend(
          context,
          resourceGroupName,
          expressRouteGatewayName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-07-01",
    },
  ) as PollerLike<
    OperationState<ExpressRouteFailoverTestDetails[]>,
    ExpressRouteFailoverTestDetails[]
  >;
}

export function _listBySubscriptionSend(
  context: Client,
  options: ExpressRouteGatewaysListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/expressRouteGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteGatewayList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteGatewayListDeserializer(result.body);
}

/** Lists ExpressRoute gateways under a given subscription. */
export async function listBySubscription(
  context: Client,
  options: ExpressRouteGatewaysListBySubscriptionOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteGatewayList> {
  const result = await _listBySubscriptionSend(context, options);
  return _listBySubscriptionDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ExpressRouteGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteGatewayList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteGatewayListDeserializer(result.body);
}

/** Lists ExpressRoute gateways in a given resource group. */
export async function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ExpressRouteGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteGatewayList> {
  const result = await _listByResourceGroupSend(context, resourceGroupName, options);
  return _listByResourceGroupDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified ExpressRoute gateway in a resource group. An ExpressRoute gateway resource can only be deleted when there are no connection subresources. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, expressRouteGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  expressRouteGatewayParameters: TagsObject,
  options: ExpressRouteGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: tagsObjectSerializer(expressRouteGatewayParameters),
    });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteGateway> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteGatewayDeserializer(result.body);
}

/** Updates express route gateway tags. */
export function updateTags(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  expressRouteGatewayParameters: TagsObject,
  options: ExpressRouteGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway> {
  return getLongRunningPoller(context, _updateTagsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTagsSend(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        expressRouteGatewayParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  putExpressRouteGatewayParameters: ExpressRouteGateway,
  options: ExpressRouteGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: expressRouteGatewaySerializer(putExpressRouteGatewayParameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteGateway> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteGatewayDeserializer(result.body);
}

/** Creates or updates a ExpressRoute gateway in a specified resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  putExpressRouteGatewayParameters: ExpressRouteGateway,
  options: ExpressRouteGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        putExpressRouteGatewayParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteGatewayName: expressRouteGatewayName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExpressRouteGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteGatewayDeserializer(result.body);
}

/** Fetches the details of a ExpressRoute gateway in a resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  expressRouteGatewayName: string,
  options: ExpressRouteGatewaysGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteGateway> {
  const result = await _getSend(context, resourceGroupName, expressRouteGatewayName, options);
  return _getDeserialize(result);
}
