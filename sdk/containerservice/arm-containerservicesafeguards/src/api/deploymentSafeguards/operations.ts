// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DeploymentSafeguard,
  deploymentSafeguardDeserializer,
  DeploymentSafeguardCreateOrUpdate,
  deploymentSafeguardCreateOrUpdateSerializer,
  deploymentSafeguardCreateOrUpdateDeserializer,
  _DeploymentSafeguardListResult,
  _deploymentSafeguardListResultDeserializer,
} from "../../models/models.js";
import {
  DeploymentSafeguardsListOptionalParams,
  DeploymentSafeguardsDeleteOptionalParams,
  DeploymentSafeguardsCreateOptionalParams,
  DeploymentSafeguardsGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: DeploymentSafeguardsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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
): Promise<_DeploymentSafeguardListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _deploymentSafeguardListResultDeserializer(result.body);
}

/** List DeploymentSafeguards by parent resource */
export function list(
  context: Client,
  resourceUri: string,
  options: DeploymentSafeguardsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentSafeguard> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  options: DeploymentSafeguardsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

/** Delete DeploymentSafeguards */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceUri: string,
  options: DeploymentSafeguardsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceUri: string,
  resource: DeploymentSafeguardCreateOrUpdate,
  options: DeploymentSafeguardsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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
    body: deploymentSafeguardCreateOrUpdateSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentSafeguardCreateOrUpdate> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentSafeguardCreateOrUpdateDeserializer(result.body);
}

/** Creates or updates a deploymentSafeguard */
export function create(
  context: Client,
  resourceUri: string,
  resource: DeploymentSafeguardCreateOrUpdate,
  options: DeploymentSafeguardsCreateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<DeploymentSafeguardCreateOrUpdate>,
  DeploymentSafeguardCreateOrUpdate
> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, resourceUri, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<
    OperationState<DeploymentSafeguardCreateOrUpdate>,
    DeploymentSafeguardCreateOrUpdate
  >;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  options: DeploymentSafeguardsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DeploymentSafeguard> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentSafeguardDeserializer(result.body);
}

/** Fetch a deployment safeguard by name */
export async function get(
  context: Client,
  resourceUri: string,
  options: DeploymentSafeguardsGetOptionalParams = { requestOptions: {} },
): Promise<DeploymentSafeguard> {
  const result = await _getSend(context, resourceUri, options);
  return _getDeserialize(result);
}
