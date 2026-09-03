// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext as Client } from "../index.js";
import type {
  SenderUsernameResource,
  _SenderUsernameResourceCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  senderUsernameResourceSerializer,
  senderUsernameResourceDeserializer,
  _senderUsernameResourceCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SenderUsernamesListByDomainsOptionalParams,
  SenderUsernamesDeleteOptionalParams,
  SenderUsernamesCreateOrUpdateOptionalParams,
  SenderUsernamesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDomainsSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  options: SenderUsernamesListByDomainsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/senderUsernames{?api%2Dversion}",
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

export async function _listByDomainsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SenderUsernameResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _senderUsernameResourceCollectionDeserializer(result.body);
}

/** List all valid sender usernames for a domains resource. */
export function listByDomains(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  options: SenderUsernamesListByDomainsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SenderUsernameResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDomainsSend(context, resourceGroupName, emailServiceName, domainName, options),
    _listByDomainsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-18" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  senderUsername: string,
  options: SenderUsernamesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/senderUsernames/{senderUsername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      senderUsername: senderUsername,
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

/** Operation to delete a SenderUsernames resource. */
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
  senderUsername: string,
  options: SenderUsernamesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    emailServiceName,
    domainName,
    senderUsername,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  senderUsername: string,
  parameters: SenderUsernameResource,
  options: SenderUsernamesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/senderUsernames/{senderUsername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      senderUsername: senderUsername,
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
    body: senderUsernameResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SenderUsernameResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return senderUsernameResourceDeserializer(result.body);
}

/** Add a new SenderUsername resource under the parent Domains resource or update an existing SenderUsername resource. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  senderUsername: string,
  parameters: SenderUsernameResource,
  options: SenderUsernamesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SenderUsernameResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    emailServiceName,
    domainName,
    senderUsername,
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
  senderUsername: string,
  options: SenderUsernamesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/senderUsernames/{senderUsername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      senderUsername: senderUsername,
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
): Promise<SenderUsernameResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return senderUsernameResourceDeserializer(result.body);
}

/** Get a valid sender username for a domains resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  senderUsername: string,
  options: SenderUsernamesGetOptionalParams = { requestOptions: {} },
): Promise<SenderUsernameResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    emailServiceName,
    domainName,
    senderUsername,
    options,
  );
  return _getDeserialize(result);
}
