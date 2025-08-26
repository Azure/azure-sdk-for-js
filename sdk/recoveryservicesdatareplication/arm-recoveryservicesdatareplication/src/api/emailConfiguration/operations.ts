// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  EmailConfigurationModel,
  emailConfigurationModelSerializer,
  emailConfigurationModelDeserializer,
  _EmailConfigurationModelListResult,
  _emailConfigurationModelListResultDeserializer,
} from "../../models/models.js";
import {
  EmailConfigurationListOptionalParams,
  EmailConfigurationCreateOptionalParams,
  EmailConfigurationGetOptionalParams,
} from "./options.js";
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

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: EmailConfigurationListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/alertSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_EmailConfigurationModelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _emailConfigurationModelListResultDeserializer(result.body);
}

/** Gets the list of alert configuration settings for the given vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: EmailConfigurationListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EmailConfigurationModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  emailConfigurationName: string,
  resource: EmailConfigurationModel,
  options: EmailConfigurationCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/alertSettings/{emailConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      emailConfigurationName: emailConfigurationName,
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
    body: emailConfigurationModelSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<EmailConfigurationModel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return emailConfigurationModelDeserializer(result.body);
}

/** Creates an alert configuration setting for the given vault. */
export async function create(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  emailConfigurationName: string,
  resource: EmailConfigurationModel,
  options: EmailConfigurationCreateOptionalParams = { requestOptions: {} },
): Promise<EmailConfigurationModel> {
  const result = await _createSend(
    context,
    resourceGroupName,
    vaultName,
    emailConfigurationName,
    resource,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  emailConfigurationName: string,
  options: EmailConfigurationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/alertSettings/{emailConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      emailConfigurationName: emailConfigurationName,
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
): Promise<EmailConfigurationModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return emailConfigurationModelDeserializer(result.body);
}

/** Gets the details of the alert configuration setting. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  emailConfigurationName: string,
  options: EmailConfigurationGetOptionalParams = { requestOptions: {} },
): Promise<EmailConfigurationModel> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    emailConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
