// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext as Client } from "../index.js";
import type { SmtpUsernameResource, _SmtpUsernameResourceCollection } from "../../models/models.js";
import {
  errorResponseDeserializer,
  smtpUsernameResourceSerializer,
  smtpUsernameResourceDeserializer,
  _smtpUsernameResourceCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SmtpUsernamesListOptionalParams,
  SmtpUsernamesDeleteOptionalParams,
  SmtpUsernamesCreateOrUpdateOptionalParams,
  SmtpUsernamesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: SmtpUsernamesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/smtpUsernames{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SmtpUsernameResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _smtpUsernameResourceCollectionDeserializer(result.body);
}

/** Get all SmtpUsernameResources for a Communication resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  options: SmtpUsernamesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SmtpUsernameResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, communicationServiceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-18" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  smtpUsername: string,
  options: SmtpUsernamesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/smtpUsernames/{smtpUsername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      smtpUsername: smtpUsername,
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

/** Operation to delete a single SmtpUsername resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  smtpUsername: string,
  options: SmtpUsernamesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    communicationServiceName,
    smtpUsername,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  smtpUsername: string,
  parameters: SmtpUsernameResource,
  options: SmtpUsernamesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/smtpUsernames/{smtpUsername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      smtpUsername: smtpUsername,
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
    body: smtpUsernameResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SmtpUsernameResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return smtpUsernameResourceDeserializer(result.body);
}

/** Create or update an SmtpUsernameResource. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  smtpUsername: string,
  parameters: SmtpUsernameResource,
  options: SmtpUsernamesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SmtpUsernameResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    communicationServiceName,
    smtpUsername,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  smtpUsername: string,
  options: SmtpUsernamesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/smtpUsernames/{smtpUsername}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communicationServiceName: communicationServiceName,
      smtpUsername: smtpUsername,
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
): Promise<SmtpUsernameResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return smtpUsernameResourceDeserializer(result.body);
}

/** Get a SmtpUsernameResource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  communicationServiceName: string,
  smtpUsername: string,
  options: SmtpUsernamesGetOptionalParams = { requestOptions: {} },
): Promise<SmtpUsernameResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    communicationServiceName,
    smtpUsername,
    options,
  );
  return _getDeserialize(result);
}
