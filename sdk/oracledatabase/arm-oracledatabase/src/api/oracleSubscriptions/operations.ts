// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _OracleSubscriptionListResult,
  _oracleSubscriptionListResultDeserializer,
  OracleSubscription,
  oracleSubscriptionSerializer,
  oracleSubscriptionDeserializer,
  OracleSubscriptionUpdate,
  oracleSubscriptionUpdateSerializer,
  CloudAccountDetails,
  cloudAccountDetailsDeserializer,
  SaasSubscriptionDetails,
  saasSubscriptionDetailsDeserializer,
  ActivationLinks,
  activationLinksDeserializer,
  AzureSubscriptions,
  azureSubscriptionsSerializer,
} from "../../models/models.js";
import {
  OracleSubscriptionsAddAzureSubscriptionsOptionalParams,
  OracleSubscriptionsListActivationLinksOptionalParams,
  OracleSubscriptionsListSaasSubscriptionDetailsOptionalParams,
  OracleSubscriptionsListCloudAccountDetailsOptionalParams,
  OracleSubscriptionsDeleteOptionalParams,
  OracleSubscriptionsUpdateOptionalParams,
  OracleSubscriptionsGetOptionalParams,
  OracleSubscriptionsCreateOrUpdateOptionalParams,
  OracleSubscriptionsListBySubscriptionOptionalParams,
} from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _addAzureSubscriptionsSend(
  context: Client,
  body: AzureSubscriptions,
  options: OracleSubscriptionsAddAzureSubscriptionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default/addAzureSubscriptions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: azureSubscriptionsSerializer(body),
  });
}

export async function _addAzureSubscriptionsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Add Azure Subscriptions */
export function addAzureSubscriptions(
  context: Client,
  body: AzureSubscriptions,
  options: OracleSubscriptionsAddAzureSubscriptionsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _addAzureSubscriptionsDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _addAzureSubscriptionsSend(context, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listActivationLinksSend(
  context: Client,
  options: OracleSubscriptionsListActivationLinksOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default/listActivationLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listActivationLinksDeserialize(
  result: PathUncheckedResponse,
): Promise<ActivationLinks> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return activationLinksDeserializer(result.body);
}

/** List Activation Links */
export function listActivationLinks(
  context: Client,
  options: OracleSubscriptionsListActivationLinksOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ActivationLinks>, ActivationLinks> {
  return getLongRunningPoller(context, _listActivationLinksDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _listActivationLinksSend(context, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ActivationLinks>, ActivationLinks>;
}

export function _listSaasSubscriptionDetailsSend(
  context: Client,
  options: OracleSubscriptionsListSaasSubscriptionDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default/listSaasSubscriptionDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listSaasSubscriptionDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<SaasSubscriptionDetails> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return saasSubscriptionDetailsDeserializer(result.body);
}

/** List Saas Subscription Details */
export function listSaasSubscriptionDetails(
  context: Client,
  options: OracleSubscriptionsListSaasSubscriptionDetailsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SaasSubscriptionDetails>, SaasSubscriptionDetails> {
  return getLongRunningPoller(context, _listSaasSubscriptionDetailsDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _listSaasSubscriptionDetailsSend(context, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SaasSubscriptionDetails>, SaasSubscriptionDetails>;
}

export function _listCloudAccountDetailsSend(
  context: Client,
  options: OracleSubscriptionsListCloudAccountDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default/listCloudAccountDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listCloudAccountDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudAccountDetails> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cloudAccountDetailsDeserializer(result.body);
}

/** List Cloud Account Details */
export function listCloudAccountDetails(
  context: Client,
  options: OracleSubscriptionsListCloudAccountDetailsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CloudAccountDetails>, CloudAccountDetails> {
  return getLongRunningPoller(context, _listCloudAccountDetailsDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _listCloudAccountDetailsSend(context, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CloudAccountDetails>, CloudAccountDetails>;
}

export function _$deleteSend(
  context: Client,
  options: OracleSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
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

/** Delete a OracleSubscription */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  options: OracleSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  properties: OracleSubscriptionUpdate,
  options: OracleSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: oracleSubscriptionUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<OracleSubscription> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return oracleSubscriptionDeserializer(result.body);
}

/** Update a OracleSubscription */
export function update(
  context: Client,
  properties: OracleSubscriptionUpdate,
  options: OracleSubscriptionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OracleSubscription>, OracleSubscription> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OracleSubscription>, OracleSubscription>;
}

export function _getSend(
  context: Client,
  options: OracleSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OracleSubscription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return oracleSubscriptionDeserializer(result.body);
}

/** Get a OracleSubscription */
export async function get(
  context: Client,
  options: OracleSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<OracleSubscription> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resource: OracleSubscription,
  options: OracleSubscriptionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: oracleSubscriptionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<OracleSubscription> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return oracleSubscriptionDeserializer(result.body);
}

/** Create a OracleSubscription */
export function createOrUpdate(
  context: Client,
  resource: OracleSubscription,
  options: OracleSubscriptionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OracleSubscription>, OracleSubscription> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateSend(context, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<OracleSubscription>, OracleSubscription>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: OracleSubscriptionsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_OracleSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _oracleSubscriptionListResultDeserializer(result.body);
}

/** List OracleSubscription resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: OracleSubscriptionsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OracleSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
