// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AuthorizationAccessPolicyContract,
  _AuthorizationAccessPolicyCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  authorizationAccessPolicyContractSerializer,
  authorizationAccessPolicyContractDeserializer,
  _authorizationAccessPolicyCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AuthorizationAccessPolicyListByAuthorizationOptionalParams,
  AuthorizationAccessPolicyDeleteOptionalParams,
  AuthorizationAccessPolicyCreateOrUpdateOptionalParams,
  AuthorizationAccessPolicyGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAuthorizationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  options: AuthorizationAccessPolicyListByAuthorizationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations/{authorizationId}/accessPolicies{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      authorizationId: authorizationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByAuthorizationDeserialize(
  result: PathUncheckedResponse,
): Promise<_AuthorizationAccessPolicyCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _authorizationAccessPolicyCollectionDeserializer(result.body);
}

/** Lists a collection of authorization access policy defined within a authorization. */
export function listByAuthorization(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  options: AuthorizationAccessPolicyListByAuthorizationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AuthorizationAccessPolicyContract> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByAuthorizationSend(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        options,
      ),
    _listByAuthorizationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  authorizationAccessPolicyId: string,
  ifMatch: string,
  options: AuthorizationAccessPolicyDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations/{authorizationId}/accessPolicies/{authorizationAccessPolicyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      authorizationId: authorizationId,
      authorizationAccessPolicyId: authorizationAccessPolicyId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
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

/** Deletes specific access policy from the Authorization. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  authorizationAccessPolicyId: string,
  ifMatch: string,
  options: AuthorizationAccessPolicyDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    authorizationAccessPolicyId,
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
  authorizationAccessPolicyId: string,
  parameters: AuthorizationAccessPolicyContract,
  options: AuthorizationAccessPolicyCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations/{authorizationId}/accessPolicies/{authorizationAccessPolicyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      authorizationId: authorizationId,
      authorizationAccessPolicyId: authorizationAccessPolicyId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: authorizationAccessPolicyContractSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthorizationAccessPolicyContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return authorizationAccessPolicyContractDeserializer(result.body);
}

/** Creates or updates Authorization Access Policy. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  authorizationAccessPolicyId: string,
  parameters: AuthorizationAccessPolicyContract,
  options: AuthorizationAccessPolicyCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AuthorizationAccessPolicyContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    authorizationAccessPolicyId,
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
  authorizationAccessPolicyId: string,
  options: AuthorizationAccessPolicyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations/{authorizationId}/accessPolicies/{authorizationAccessPolicyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      authorizationId: authorizationId,
      authorizationAccessPolicyId: authorizationAccessPolicyId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<AuthorizationAccessPolicyContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return authorizationAccessPolicyContractDeserializer(result.body);
}

/** Gets the details of the authorization access policy specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  authorizationAccessPolicyId: string,
  options: AuthorizationAccessPolicyGetOptionalParams = { requestOptions: {} },
): Promise<AuthorizationAccessPolicyContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    authorizationAccessPolicyId,
    options,
  );
  return _getDeserialize(result);
}
