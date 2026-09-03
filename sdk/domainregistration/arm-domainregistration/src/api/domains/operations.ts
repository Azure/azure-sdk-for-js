// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainRegistrationManagementContext as Client } from "../index.js";
import type {
  Domain,
  DomainPatchResource,
  _DomainCollection,
  DomainOwnershipIdentifier,
  _DomainOwnershipIdentifierCollection,
  NameIdentifier,
  DomainAvailabilityCheckResult,
  DomainControlCenterSsoRequest,
  DomainRecommendationSearchParameters,
  _NameIdentifierCollection,
} from "../../models/models.js";
import {
  domainSerializer,
  domainDeserializer,
  defaultErrorResponseDeserializer,
  domainPatchResourceSerializer,
  _domainCollectionDeserializer,
  domainOwnershipIdentifierSerializer,
  domainOwnershipIdentifierDeserializer,
  _domainOwnershipIdentifierCollectionDeserializer,
  nameIdentifierSerializer,
  domainAvailabilityCheckResultDeserializer,
  domainControlCenterSsoRequestDeserializer,
  domainRecommendationSearchParametersSerializer,
  _nameIdentifierCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DomainsListRecommendationsOptionalParams,
  DomainsGetControlCenterSsoRequestOptionalParams,
  DomainsCheckAvailabilityOptionalParams,
  DomainsListOwnershipIdentifiersOptionalParams,
  DomainsDeleteOwnershipIdentifierOptionalParams,
  DomainsUpdateOwnershipIdentifierOptionalParams,
  DomainsCreateOrUpdateOwnershipIdentifierOptionalParams,
  DomainsGetOwnershipIdentifierOptionalParams,
  DomainsTransferOutOptionalParams,
  DomainsRenewOptionalParams,
  DomainsListOptionalParams,
  DomainsListByResourceGroupOptionalParams,
  DomainsDeleteOptionalParams,
  DomainsUpdateOptionalParams,
  DomainsCreateOrUpdateOptionalParams,
  DomainsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listRecommendationsSend(
  context: Client,
  parameters: DomainRecommendationSearchParameters,
  options: DomainsListRecommendationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/listDomainRecommendations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: domainRecommendationSearchParametersSerializer(parameters),
  });
}

export async function _listRecommendationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_NameIdentifierCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _nameIdentifierCollectionDeserializer(result.body);
}

/** Description for Get domain name recommendations based on keywords. */
export function listRecommendations(
  context: Client,
  parameters: DomainRecommendationSearchParameters,
  options: DomainsListRecommendationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NameIdentifier> {
  return buildPagedAsyncIterator(
    context,
    () => _listRecommendationsSend(context, parameters, options),
    _listRecommendationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _getControlCenterSsoRequestSend(
  context: Client,
  options: DomainsGetControlCenterSsoRequestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/generateSsoRequest{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getControlCenterSsoRequestDeserialize(
  result: PathUncheckedResponse,
): Promise<DomainControlCenterSsoRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return domainControlCenterSsoRequestDeserializer(result.body);
}

/** Description for Generate a single sign-on request for the domain management portal. */
export async function getControlCenterSsoRequest(
  context: Client,
  options: DomainsGetControlCenterSsoRequestOptionalParams = { requestOptions: {} },
): Promise<DomainControlCenterSsoRequest> {
  const result = await _getControlCenterSsoRequestSend(context, options);
  return _getControlCenterSsoRequestDeserialize(result);
}

export function _checkAvailabilitySend(
  context: Client,
  identifier: NameIdentifier,
  options: DomainsCheckAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/checkDomainAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: nameIdentifierSerializer(identifier),
  });
}

export async function _checkAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<DomainAvailabilityCheckResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return domainAvailabilityCheckResultDeserializer(result.body);
}

/** Description for Check if a domain is available for registration. */
export async function checkAvailability(
  context: Client,
  identifier: NameIdentifier,
  options: DomainsCheckAvailabilityOptionalParams = { requestOptions: {} },
): Promise<DomainAvailabilityCheckResult> {
  const result = await _checkAvailabilitySend(context, identifier, options);
  return _checkAvailabilityDeserialize(result);
}

export function _listOwnershipIdentifiersSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsListOwnershipIdentifiersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _listOwnershipIdentifiersDeserialize(
  result: PathUncheckedResponse,
): Promise<_DomainOwnershipIdentifierCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _domainOwnershipIdentifierCollectionDeserializer(result.body);
}

/** Description for Lists domain ownership identifiers. */
export function listOwnershipIdentifiers(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsListOwnershipIdentifiersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DomainOwnershipIdentifier> {
  return buildPagedAsyncIterator(
    context,
    () => _listOwnershipIdentifiersSend(context, resourceGroupName, domainName, options),
    _listOwnershipIdentifiersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _deleteOwnershipIdentifierSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  name: string,
  options: DomainsDeleteOwnershipIdentifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteOwnershipIdentifierDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Delete ownership identifier for domain */
export async function deleteOwnershipIdentifier(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  name: string,
  options: DomainsDeleteOwnershipIdentifierOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteOwnershipIdentifierSend(
    context,
    resourceGroupName,
    domainName,
    name,
    options,
  );
  return _deleteOwnershipIdentifierDeserialize(result);
}

export function _updateOwnershipIdentifierSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  name: string,
  domainOwnershipIdentifier: DomainOwnershipIdentifier,
  options: DomainsUpdateOwnershipIdentifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: domainOwnershipIdentifierSerializer(domainOwnershipIdentifier),
  });
}

export async function _updateOwnershipIdentifierDeserialize(
  result: PathUncheckedResponse,
): Promise<DomainOwnershipIdentifier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return domainOwnershipIdentifierDeserializer(result.body);
}

/** Description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export async function updateOwnershipIdentifier(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  name: string,
  domainOwnershipIdentifier: DomainOwnershipIdentifier,
  options: DomainsUpdateOwnershipIdentifierOptionalParams = { requestOptions: {} },
): Promise<DomainOwnershipIdentifier> {
  const result = await _updateOwnershipIdentifierSend(
    context,
    resourceGroupName,
    domainName,
    name,
    domainOwnershipIdentifier,
    options,
  );
  return _updateOwnershipIdentifierDeserialize(result);
}

export function _createOrUpdateOwnershipIdentifierSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  name: string,
  domainOwnershipIdentifier: DomainOwnershipIdentifier,
  options: DomainsCreateOrUpdateOwnershipIdentifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: domainOwnershipIdentifierSerializer(domainOwnershipIdentifier),
  });
}

export async function _createOrUpdateOwnershipIdentifierDeserialize(
  result: PathUncheckedResponse,
): Promise<DomainOwnershipIdentifier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return domainOwnershipIdentifierDeserializer(result.body);
}

/** Description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
export async function createOrUpdateOwnershipIdentifier(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  name: string,
  domainOwnershipIdentifier: DomainOwnershipIdentifier,
  options: DomainsCreateOrUpdateOwnershipIdentifierOptionalParams = { requestOptions: {} },
): Promise<DomainOwnershipIdentifier> {
  const result = await _createOrUpdateOwnershipIdentifierSend(
    context,
    resourceGroupName,
    domainName,
    name,
    domainOwnershipIdentifier,
    options,
  );
  return _createOrUpdateOwnershipIdentifierDeserialize(result);
}

export function _getOwnershipIdentifierSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  name: string,
  options: DomainsGetOwnershipIdentifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _getOwnershipIdentifierDeserialize(
  result: PathUncheckedResponse,
): Promise<DomainOwnershipIdentifier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return domainOwnershipIdentifierDeserializer(result.body);
}

/** Description for Get ownership identifier for domain */
export async function getOwnershipIdentifier(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  name: string,
  options: DomainsGetOwnershipIdentifierOptionalParams = { requestOptions: {} },
): Promise<DomainOwnershipIdentifier> {
  const result = await _getOwnershipIdentifierSend(
    context,
    resourceGroupName,
    domainName,
    name,
    options,
  );
  return _getOwnershipIdentifierDeserialize(result);
}

export function _transferOutSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsTransferOutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/transferOut{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _transferOutDeserialize(result: PathUncheckedResponse): Promise<Domain> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return domainDeserializer(result.body);
}

/** Transfer out domain to another registrar */
export async function transferOut(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsTransferOutOptionalParams = { requestOptions: {} },
): Promise<Domain> {
  const result = await _transferOutSend(context, resourceGroupName, domainName, options);
  return _transferOutDeserialize(result);
}

export function _renewSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsRenewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/renew{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _renewDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Renew a domain. */
export async function renew(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsRenewOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _renewSend(context, resourceGroupName, domainName, options);
  return _renewDeserialize(result);
}

export function _listSend(
  context: Client,
  options: DomainsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/domains{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_DomainCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _domainCollectionDeserializer(result.body);
}

/** Description for Get all domains in a subscription. */
export function list(
  context: Client,
  options: DomainsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Domain> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DomainsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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
): Promise<_DomainCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _domainCollectionDeserializer(result.body);
}

/** Description for Get all domains in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DomainsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Domain> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}{?api%2Dversion,forceHardDeleteDomain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
      forceHardDeleteDomain: options?.forceHardDeleteDomain,
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
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Delete a domain. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, domainName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  domain: DomainPatchResource,
  options: DomainsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: domainPatchResourceSerializer(domain),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Domain> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return domainDeserializer(result.body);
}

/** Description for Creates or updates a domain. */
export async function update(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  domain: DomainPatchResource,
  options: DomainsUpdateOptionalParams = { requestOptions: {} },
): Promise<Domain> {
  const result = await _updateSend(context, resourceGroupName, domainName, domain, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  domain: Domain,
  options: DomainsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: domainSerializer(domain),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Domain> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return domainDeserializer(result.body);
}

/** Description for Creates or updates a domain. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  domain: Domain,
  options: DomainsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Domain>, Domain> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, domainName, domain, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-11-01",
  }) as PollerLike<OperationState<Domain>, Domain>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Domain> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return domainDeserializer(result.body);
}

/** Description for Get a domain. */
export async function get(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsGetOptionalParams = { requestOptions: {} },
): Promise<Domain> {
  const result = await _getSend(context, resourceGroupName, domainName, options);
  return _getDeserialize(result);
}
