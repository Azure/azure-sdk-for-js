// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext as Client } from "../index.js";
import type {
  SuppressionListResource,
  _SuppressionListResourceCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  suppressionListResourceSerializer,
  suppressionListResourceDeserializer,
  _suppressionListResourceCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SuppressionListsListByDomainOptionalParams,
  SuppressionListsDeleteOptionalParams,
  SuppressionListsCreateOrUpdateOptionalParams,
  SuppressionListsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDomainSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  options: SuppressionListsListByDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

export async function _listByDomainDeserialize(
  result: PathUncheckedResponse,
): Promise<_SuppressionListResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _suppressionListResourceCollectionDeserializer(result.body);
}

/** List all suppression lists for a domains resource. */
export function listByDomain(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  options: SuppressionListsListByDomainOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SuppressionListResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDomainSend(context, resourceGroupName, emailServiceName, domainName, options),
    _listByDomainDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-18" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  options: SuppressionListsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      suppressionListName: suppressionListName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

/** Delete a SuppressionList. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  options: SuppressionListsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    emailServiceName,
    domainName,
    suppressionListName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  parameters: SuppressionListResource,
  options: SuppressionListsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      suppressionListName: suppressionListName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: suppressionListResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SuppressionListResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return suppressionListResourceDeserializer(result.body);
}

/** Add a new SuppressionList resource under the parent Domains resource or update an existing SuppressionList resource. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  parameters: SuppressionListResource,
  options: SuppressionListsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SuppressionListResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    emailServiceName,
    domainName,
    suppressionListName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  options: SuppressionListsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      suppressionListName: suppressionListName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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
): Promise<SuppressionListResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return suppressionListResourceDeserializer(result.body);
}

/** Get a SuppressionList resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  options: SuppressionListsGetOptionalParams = { requestOptions: {} },
): Promise<SuppressionListResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    emailServiceName,
    domainName,
    suppressionListName,
    options,
  );
  return _getDeserialize(result);
}
