// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NotificationHubsManagementContext as Client } from "../index.js";
import type {
  SharedAccessAuthorizationRuleResource,
  _SharedAccessAuthorizationRuleListResult,
  ResourceListKeys,
  PolicyKeyResource,
  PnsCredentialsResource,
  CheckAvailabilityParameters,
  CheckAvailabilityResult,
  NotificationHubResource,
  NotificationHubPatchParameters,
  _NotificationHubListResult,
  DebugSendResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sharedAccessAuthorizationRuleResourceSerializer,
  sharedAccessAuthorizationRuleResourceDeserializer,
  _sharedAccessAuthorizationRuleListResultDeserializer,
  resourceListKeysDeserializer,
  policyKeyResourceSerializer,
  pnsCredentialsResourceDeserializer,
  checkAvailabilityParametersSerializer,
  checkAvailabilityResultDeserializer,
  notificationHubResourceSerializer,
  notificationHubResourceDeserializer,
  notificationHubPatchParametersSerializer,
  _notificationHubListResultDeserializer,
  debugSendResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NotificationHubsRegenerateKeysOptionalParams,
  NotificationHubsListKeysOptionalParams,
  NotificationHubsListAuthorizationRulesOptionalParams,
  NotificationHubsDeleteAuthorizationRuleOptionalParams,
  NotificationHubsCreateOrUpdateAuthorizationRuleOptionalParams,
  NotificationHubsGetAuthorizationRuleOptionalParams,
  NotificationHubsCheckNotificationHubAvailabilityOptionalParams,
  NotificationHubsGetPnsCredentialsOptionalParams,
  NotificationHubsDebugSendOptionalParams,
  NotificationHubsListOptionalParams,
  NotificationHubsDeleteOptionalParams,
  NotificationHubsUpdateOptionalParams,
  NotificationHubsCreateOrUpdateOptionalParams,
  NotificationHubsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _regenerateKeysSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  parameters: PolicyKeyResource,
  options: NotificationHubsRegenerateKeysOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}/regenerateKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      authorizationRuleName: authorizationRuleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: policyKeyResourceSerializer(parameters),
  });
}

export async function _regenerateKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceListKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return resourceListKeysDeserializer(result.body);
}

/** Regenerates the Primary/Secondary Keys to the NotificationHub Authorization Rule */
export async function regenerateKeys(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  parameters: PolicyKeyResource,
  options: NotificationHubsRegenerateKeysOptionalParams = {
    requestOptions: {},
  },
): Promise<ResourceListKeys> {
  const result = await _regenerateKeysSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    authorizationRuleName,
    parameters,
    options,
  );
  return _regenerateKeysDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  options: NotificationHubsListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      authorizationRuleName: authorizationRuleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceListKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return resourceListKeysDeserializer(result.body);
}

/** Gets the Primary and Secondary ConnectionStrings to the NotificationHub */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  options: NotificationHubsListKeysOptionalParams = { requestOptions: {} },
): Promise<ResourceListKeys> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    authorizationRuleName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listAuthorizationRulesSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsListAuthorizationRulesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAuthorizationRulesDeserialize(
  result: PathUncheckedResponse,
): Promise<_SharedAccessAuthorizationRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sharedAccessAuthorizationRuleListResultDeserializer(result.body);
}

/** Gets the authorization rules for a NotificationHub. */
export function listAuthorizationRules(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsListAuthorizationRulesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SharedAccessAuthorizationRuleResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAuthorizationRulesSend(
        context,
        resourceGroupName,
        namespaceName,
        notificationHubName,
        options,
      ),
    _listAuthorizationRulesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  options: NotificationHubsDeleteAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      authorizationRuleName: authorizationRuleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAuthorizationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a notificationHub authorization rule */
export async function deleteAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  options: NotificationHubsDeleteAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    authorizationRuleName,
    options,
  );
  return _deleteAuthorizationRuleDeserialize(result);
}

export function _createOrUpdateAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  parameters: SharedAccessAuthorizationRuleResource,
  options: NotificationHubsCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      authorizationRuleName: authorizationRuleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sharedAccessAuthorizationRuleResourceSerializer(parameters),
  });
}

export async function _createOrUpdateAuthorizationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedAccessAuthorizationRuleResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sharedAccessAuthorizationRuleResourceDeserializer(result.body);
}

/** Creates/Updates an authorization rule for a NotificationHub */
export async function createOrUpdateAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  parameters: SharedAccessAuthorizationRuleResource,
  options: NotificationHubsCreateOrUpdateAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<SharedAccessAuthorizationRuleResource> {
  const result = await _createOrUpdateAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    authorizationRuleName,
    parameters,
    options,
  );
  return _createOrUpdateAuthorizationRuleDeserialize(result);
}

export function _getAuthorizationRuleSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  options: NotificationHubsGetAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      authorizationRuleName: authorizationRuleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAuthorizationRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedAccessAuthorizationRuleResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sharedAccessAuthorizationRuleResourceDeserializer(result.body);
}

/** Gets an authorization rule for a NotificationHub by name. */
export async function getAuthorizationRule(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  authorizationRuleName: string,
  options: NotificationHubsGetAuthorizationRuleOptionalParams = {
    requestOptions: {},
  },
): Promise<SharedAccessAuthorizationRuleResource> {
  const result = await _getAuthorizationRuleSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    authorizationRuleName,
    options,
  );
  return _getAuthorizationRuleDeserialize(result);
}

export function _checkNotificationHubAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: CheckAvailabilityParameters,
  options: NotificationHubsCheckNotificationHubAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/checkNotificationHubAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: checkAvailabilityParametersSerializer(parameters),
  });
}

export async function _checkNotificationHubAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkAvailabilityResultDeserializer(result.body);
}

/** Checks the availability of the given notificationHub in a namespace. */
export async function checkNotificationHubAvailability(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  parameters: CheckAvailabilityParameters,
  options: NotificationHubsCheckNotificationHubAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckAvailabilityResult> {
  const result = await _checkNotificationHubAvailabilitySend(
    context,
    resourceGroupName,
    namespaceName,
    parameters,
    options,
  );
  return _checkNotificationHubAvailabilityDeserialize(result);
}

export function _getPnsCredentialsSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsGetPnsCredentialsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/pnsCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getPnsCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<PnsCredentialsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return pnsCredentialsResourceDeserializer(result.body);
}

/** Lists the PNS Credentials associated with a notification hub. */
export async function getPnsCredentials(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsGetPnsCredentialsOptionalParams = {
    requestOptions: {},
  },
): Promise<PnsCredentialsResource> {
  const result = await _getPnsCredentialsSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    options,
  );
  return _getPnsCredentialsDeserialize(result);
}

export function _debugSendSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsDebugSendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/debugsend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _debugSendDeserialize(
  result: PathUncheckedResponse,
): Promise<DebugSendResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return debugSendResponseDeserializer(result.body);
}

/** Test send a push notification. */
export async function debugSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsDebugSendOptionalParams = { requestOptions: {} },
): Promise<DebugSendResponse> {
  const result = await _debugSendSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    options,
  );
  return _debugSendDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NotificationHubsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs{?api%2Dversion,%24skipToken,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion,
      "%24skipToken": options?.skipToken,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NotificationHubListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _notificationHubListResultDeserializer(result.body);
}

/** Lists the notification hubs associated with a namespace. */
export function list(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NotificationHubsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NotificationHubResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, namespaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a notification hub associated with a namespace. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  parameters: NotificationHubPatchParameters,
  options: NotificationHubsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: notificationHubPatchParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NotificationHubResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return notificationHubResourceDeserializer(result.body);
}

/** Patch a NotificationHub in a namespace. */
export async function update(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  parameters: NotificationHubPatchParameters,
  options: NotificationHubsUpdateOptionalParams = { requestOptions: {} },
): Promise<NotificationHubResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  parameters: NotificationHubResource,
  options: NotificationHubsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: notificationHubResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NotificationHubResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return notificationHubResourceDeserializer(result.body);
}

/** Creates/Update a NotificationHub in a namespace. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  parameters: NotificationHubResource,
  options: NotificationHubsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<NotificationHubResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      notificationHubName: notificationHubName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<NotificationHubResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return notificationHubResourceDeserializer(result.body);
}

/** Gets the notification hub. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  notificationHubName: string,
  options: NotificationHubsGetOptionalParams = { requestOptions: {} },
): Promise<NotificationHubResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    notificationHubName,
    options,
  );
  return _getDeserialize(result);
}
