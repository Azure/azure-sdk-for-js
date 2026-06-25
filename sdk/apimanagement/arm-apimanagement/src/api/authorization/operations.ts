// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AuthorizationContract,
  authorizationContractSerializer,
  authorizationContractDeserializer,
  _AuthorizationCollection,
  _authorizationCollectionDeserializer,
  AuthorizationConfirmConsentCodeRequestContract,
  authorizationConfirmConsentCodeRequestContractSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AuthorizationConfirmConsentCodeOptionalParams,
  AuthorizationListByAuthorizationProviderOptionalParams,
  AuthorizationDeleteOptionalParams,
  AuthorizationCreateOrUpdateOptionalParams,
  AuthorizationGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _confirmConsentCodeSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  parameters: AuthorizationConfirmConsentCodeRequestContract,
  options: AuthorizationConfirmConsentCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations/{authorizationId}/confirmConsentCode{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      authorizationId: authorizationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
      body: authorizationConfirmConsentCodeRequestContractSerializer(parameters),
    });
}

export async function _confirmConsentCodeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Confirm valid consent code to suppress Authorizations anti-phishing page. */
export async function confirmConsentCode(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  parameters: AuthorizationConfirmConsentCodeRequestContract,
  options: AuthorizationConfirmConsentCodeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _confirmConsentCodeSend(
    context,
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    parameters,
    options,
  );
  return _confirmConsentCodeDeserialize(result);
}

export function _listByAuthorizationProviderSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  options: AuthorizationListByAuthorizationProviderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByAuthorizationProviderDeserialize(
  result: PathUncheckedResponse,
): Promise<_AuthorizationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _authorizationCollectionDeserializer(result.body);
}

/** Lists a collection of authorization providers defined within a authorization provider. */
export function listByAuthorizationProvider(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  options: AuthorizationListByAuthorizationProviderOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AuthorizationContract> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByAuthorizationProviderSend(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        options,
      ),
    _listByAuthorizationProviderDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  ifMatch: string,
  options: AuthorizationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations/{authorizationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      authorizationId: authorizationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes specific Authorization from the Authorization provider. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  ifMatch: string,
  options: AuthorizationDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  parameters: AuthorizationContract,
  options: AuthorizationCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations/{authorizationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      authorizationId: authorizationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: authorizationContractSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthorizationContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return authorizationContractDeserializer(result.body);
}

/** Creates or updates authorization. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  parameters: AuthorizationContract,
  options: AuthorizationCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AuthorizationContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  options: AuthorizationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations/{authorizationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      authorizationId: authorizationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthorizationContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return authorizationContractDeserializer(result.body);
}

/** Gets the details of the authorization specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  options: AuthorizationGetOptionalParams = { requestOptions: {} },
): Promise<AuthorizationContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    options,
  );
  return _getDeserialize(result);
}
