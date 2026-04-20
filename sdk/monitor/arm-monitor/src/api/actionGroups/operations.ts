// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MicrosoftActionGroupsActionGroupResource,
  MicrosoftActionGroupsActionGroupPatchBody,
  _MicrosoftActionGroupsActionGroupList,
  MicrosoftActionGroupsNotificationRequestBody,
  MicrosoftActionGroupsTestNotificationDetailsResponse,
  MicrosoftActionGroupsEnableRequest,
} from "../../models/microsoft/actionGroups/models.js";
import {
  microsoftActionGroupsActionGroupResourceSerializer,
  microsoftActionGroupsActionGroupResourceDeserializer,
  microsoftActionGroupsErrorResponseDeserializer,
  microsoftActionGroupsActionGroupPatchBodySerializer,
  _microsoftActionGroupsActionGroupListDeserializer,
  microsoftActionGroupsNotificationRequestBodySerializer,
  microsoftActionGroupsTestNotificationDetailsResponseDeserializer,
  microsoftActionGroupsEnableRequestSerializer,
} from "../../models/microsoft/actionGroups/models.js";
import type {
  NetworkSecurityPerimeterConfiguration,
  _NetworkSecurityPerimeterConfigurationListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  networkSecurityPerimeterConfigurationDeserializer,
  _networkSecurityPerimeterConfigurationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ActionGroupsReconcileNSPOptionalParams,
  ActionGroupsListNSPOptionalParams,
  ActionGroupsGetNSPOptionalParams,
  ActionGroupsEnableReceiverOptionalParams,
  ActionGroupsGetTestNotificationsAtActionGroupResourceLevelOptionalParams,
  ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams,
  ActionGroupsListBySubscriptionIdOptionalParams,
  ActionGroupsListByResourceGroupOptionalParams,
  ActionGroupsDeleteOptionalParams,
  ActionGroupsUpdateOptionalParams,
  ActionGroupsCreateOrUpdateOptionalParams,
  ActionGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _reconcileNSPSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: ActionGroupsReconcileNSPOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": "2021-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _reconcileNSPDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Reconciles a specified NSP configuration for specified action group. */
export function reconcileNSP(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: ActionGroupsReconcileNSPOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reconcileNSPDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reconcileNSPSend(
        context,
        resourceGroupName,
        actionGroupName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2021-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listNSPSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  options: ActionGroupsListNSPOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      "api%2Dversion": "2021-10-01",
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

export async function _listNSPDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkSecurityPerimeterConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkSecurityPerimeterConfigurationListResultDeserializer(result.body);
}

/** Gets a list of NSP configurations for specified action group. */
export function listNSP(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  options: ActionGroupsListNSPOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listNSPSend(context, resourceGroupName, actionGroupName, options),
    _listNSPDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-10-01" },
  );
}

export function _getNSPSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: ActionGroupsGetNSPOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": "2021-10-01",
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

export async function _getNSPDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Gets a specified NSP configuration for specified action group. */
export async function getNSP(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: ActionGroupsGetNSPOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getNSPSend(
    context,
    resourceGroupName,
    actionGroupName,
    networkSecurityPerimeterConfigurationName,
    options,
  );
  return _getNSPDeserialize(result);
}

export function _enableReceiverSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  enableRequest: MicrosoftActionGroupsEnableRequest,
  options: ActionGroupsEnableReceiverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}/subscribe{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      "api%2Dversion": "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: microsoftActionGroupsEnableRequestSerializer(enableRequest),
  });
}

export async function _enableReceiverDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActionGroupsErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Enable a receiver in an action group. This changes the receiver's status from Disabled to Enabled. This operation is only supported for Email or SMS receivers. */
export async function enableReceiver(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  enableRequest: MicrosoftActionGroupsEnableRequest,
  options: ActionGroupsEnableReceiverOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enableReceiverSend(
    context,
    resourceGroupName,
    actionGroupName,
    enableRequest,
    options,
  );
  return _enableReceiverDeserialize(result);
}

export function _getTestNotificationsAtActionGroupResourceLevelSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  notificationId: string,
  options: ActionGroupsGetTestNotificationsAtActionGroupResourceLevelOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}/notificationStatus/{notificationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      notificationId: notificationId,
      "api%2Dversion": "2024-10-01-preview",
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

export async function _getTestNotificationsAtActionGroupResourceLevelDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftActionGroupsTestNotificationDetailsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActionGroupsErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftActionGroupsTestNotificationDetailsResponseDeserializer(result.body);
}

/** Get the test notifications by the notification id */
export async function getTestNotificationsAtActionGroupResourceLevel(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  notificationId: string,
  options: ActionGroupsGetTestNotificationsAtActionGroupResourceLevelOptionalParams = {
    requestOptions: {},
  },
): Promise<MicrosoftActionGroupsTestNotificationDetailsResponse> {
  const result = await _getTestNotificationsAtActionGroupResourceLevelSend(
    context,
    resourceGroupName,
    actionGroupName,
    notificationId,
    options,
  );
  return _getTestNotificationsAtActionGroupResourceLevelDeserialize(result);
}

export function _createNotificationsAtActionGroupResourceLevelSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  notificationRequest: MicrosoftActionGroupsNotificationRequestBody,
  options: ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}/createNotifications{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      "api%2Dversion": "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftActionGroupsNotificationRequestBodySerializer(notificationRequest),
  });
}

export async function _createNotificationsAtActionGroupResourceLevelDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftActionGroupsTestNotificationDetailsResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActionGroupsErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftActionGroupsTestNotificationDetailsResponseDeserializer(result.body);
}

/** Send test notifications to a set of provided receivers */
export function createNotificationsAtActionGroupResourceLevel(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  notificationRequest: MicrosoftActionGroupsNotificationRequestBody,
  options: ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<MicrosoftActionGroupsTestNotificationDetailsResponse>,
  MicrosoftActionGroupsTestNotificationDetailsResponse
> {
  return getLongRunningPoller(
    context,
    _createNotificationsAtActionGroupResourceLevelDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createNotificationsAtActionGroupResourceLevelSend(
          context,
          resourceGroupName,
          actionGroupName,
          notificationRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2024-10-01-preview",
    },
  ) as PollerLike<
    OperationState<MicrosoftActionGroupsTestNotificationDetailsResponse>,
    MicrosoftActionGroupsTestNotificationDetailsResponse
  >;
}

export function _listBySubscriptionIdSend(
  context: Client,
  options: ActionGroupsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/actionGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-10-01-preview",
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

export async function _listBySubscriptionIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_MicrosoftActionGroupsActionGroupList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActionGroupsErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftActionGroupsActionGroupListDeserializer(result.body);
}

/** Get a list of all action groups in a subscription. */
export function listBySubscriptionId(
  context: Client,
  options: ActionGroupsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftActionGroupsActionGroupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionIdSend(context, options),
    _listBySubscriptionIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01-preview" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ActionGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-10-01-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_MicrosoftActionGroupsActionGroupList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActionGroupsErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftActionGroupsActionGroupListDeserializer(result.body);
}

/** Get a list of all action groups in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ActionGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftActionGroupsActionGroupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  options: ActionGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      "api%2Dversion": "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActionGroupsErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete an action group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  options: ActionGroupsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, actionGroupName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  actionGroupPatch: MicrosoftActionGroupsActionGroupPatchBody,
  options: ActionGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      "api%2Dversion": "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftActionGroupsActionGroupPatchBodySerializer(actionGroupPatch),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftActionGroupsActionGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActionGroupsErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftActionGroupsActionGroupResourceDeserializer(result.body);
}

/** Updates an existing action group's tags. To update other fields use the CreateOrUpdate method. */
export async function update(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  actionGroupPatch: MicrosoftActionGroupsActionGroupPatchBody,
  options: ActionGroupsUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftActionGroupsActionGroupResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    actionGroupName,
    actionGroupPatch,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  actionGroup: MicrosoftActionGroupsActionGroupResource,
  options: ActionGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      "api%2Dversion": "2024-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftActionGroupsActionGroupResourceSerializer(actionGroup),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftActionGroupsActionGroupResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActionGroupsErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftActionGroupsActionGroupResourceDeserializer(result.body);
}

/** Create a new action group or update an existing one. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  actionGroup: MicrosoftActionGroupsActionGroupResource,
  options: ActionGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftActionGroupsActionGroupResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    actionGroupName,
    actionGroup,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  options: ActionGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/actionGroups/{actionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      actionGroupName: actionGroupName,
      "api%2Dversion": "2024-10-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftActionGroupsActionGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActionGroupsErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftActionGroupsActionGroupResourceDeserializer(result.body);
}

/** Get an action group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  actionGroupName: string,
  options: ActionGroupsGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftActionGroupsActionGroupResource> {
  const result = await _getSend(context, resourceGroupName, actionGroupName, options);
  return _getDeserialize(result);
}
