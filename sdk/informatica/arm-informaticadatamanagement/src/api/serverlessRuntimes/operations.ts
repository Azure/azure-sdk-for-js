// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InformaticaDataManagementContext as Client } from "../index.js";
import type {
  InformaticaServerlessRuntimeResource,
  _InformaticaServerlessRuntimeResourceListResult,
  InformaticaServerlessRuntimeResourceUpdate,
  CheckDependenciesResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  informaticaServerlessRuntimeResourceSerializer,
  informaticaServerlessRuntimeResourceDeserializer,
  _informaticaServerlessRuntimeResourceListResultDeserializer,
  informaticaServerlessRuntimeResourceUpdateSerializer,
  checkDependenciesResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerlessRuntimesServerlessResourceByIdOptionalParams,
  ServerlessRuntimesStartFailedServerlessRuntimeOptionalParams,
  ServerlessRuntimesCheckDependenciesOptionalParams,
  ServerlessRuntimesUpdateOptionalParams,
  ServerlessRuntimesListByInformaticaOrganizationResourceOptionalParams,
  ServerlessRuntimesDeleteOptionalParams,
  ServerlessRuntimesCreateOrUpdateOptionalParams,
  ServerlessRuntimesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _serverlessResourceByIdSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesServerlessResourceByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/serverlessRuntimes/{serverlessRuntimeName}/serverlessResourceById{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      serverlessRuntimeName: serverlessRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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

export async function _serverlessResourceByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<InformaticaServerlessRuntimeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return informaticaServerlessRuntimeResourceDeserializer(result.body);
}

/** Returns a serverless runtime resource by ID */
export async function serverlessResourceById(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesServerlessResourceByIdOptionalParams = { requestOptions: {} },
): Promise<InformaticaServerlessRuntimeResource> {
  const result = await _serverlessResourceByIdSend(
    context,
    resourceGroupName,
    organizationName,
    serverlessRuntimeName,
    options,
  );
  return _serverlessResourceByIdDeserialize(result);
}

export function _startFailedServerlessRuntimeSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesStartFailedServerlessRuntimeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/serverlessRuntimes/{serverlessRuntimeName}/startFailedServerlessRuntime{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      serverlessRuntimeName: serverlessRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startFailedServerlessRuntimeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Starts a failed runtime resource */
export async function startFailedServerlessRuntime(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesStartFailedServerlessRuntimeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _startFailedServerlessRuntimeSend(
    context,
    resourceGroupName,
    organizationName,
    serverlessRuntimeName,
    options,
  );
  return _startFailedServerlessRuntimeDeserialize(result);
}

export function _checkDependenciesSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesCheckDependenciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/serverlessRuntimes/{serverlessRuntimeName}/checkDependencies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      serverlessRuntimeName: serverlessRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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

export async function _checkDependenciesDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckDependenciesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkDependenciesResponseDeserializer(result.body);
}

/** Checks all dependencies for a serverless runtime resource */
export async function checkDependencies(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesCheckDependenciesOptionalParams = { requestOptions: {} },
): Promise<CheckDependenciesResponse> {
  const result = await _checkDependenciesSend(
    context,
    resourceGroupName,
    organizationName,
    serverlessRuntimeName,
    options,
  );
  return _checkDependenciesDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  properties: InformaticaServerlessRuntimeResourceUpdate,
  options: ServerlessRuntimesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/serverlessRuntimes/{serverlessRuntimeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      serverlessRuntimeName: serverlessRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: informaticaServerlessRuntimeResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<InformaticaServerlessRuntimeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return informaticaServerlessRuntimeResourceDeserializer(result.body);
}

/** Update a InformaticaServerlessRuntimeResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  properties: InformaticaServerlessRuntimeResourceUpdate,
  options: ServerlessRuntimesUpdateOptionalParams = { requestOptions: {} },
): Promise<InformaticaServerlessRuntimeResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    organizationName,
    serverlessRuntimeName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _listByInformaticaOrganizationResourceSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: ServerlessRuntimesListByInformaticaOrganizationResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/serverlessRuntimes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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

export async function _listByInformaticaOrganizationResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_InformaticaServerlessRuntimeResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _informaticaServerlessRuntimeResourceListResultDeserializer(result.body);
}

/** List InformaticaServerlessRuntimeResource resources by InformaticaOrganizationResource */
export function listByInformaticaOrganizationResource(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: ServerlessRuntimesListByInformaticaOrganizationResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<InformaticaServerlessRuntimeResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByInformaticaOrganizationResourceSend(
        context,
        resourceGroupName,
        organizationName,
        options,
      ),
    _listByInformaticaOrganizationResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-11-27" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/serverlessRuntimes/{serverlessRuntimeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      serverlessRuntimeName: serverlessRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a InformaticaServerlessRuntimeResource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, organizationName, serverlessRuntimeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-27",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  resource: InformaticaServerlessRuntimeResource,
  options: ServerlessRuntimesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/serverlessRuntimes/{serverlessRuntimeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      serverlessRuntimeName: serverlessRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: informaticaServerlessRuntimeResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InformaticaServerlessRuntimeResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return informaticaServerlessRuntimeResourceDeserializer(result.body);
}

/** Create a InformaticaServerlessRuntimeResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  resource: InformaticaServerlessRuntimeResource,
  options: ServerlessRuntimesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<InformaticaServerlessRuntimeResource>,
  InformaticaServerlessRuntimeResource
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        organizationName,
        serverlessRuntimeName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-27",
  }) as PollerLike<
    OperationState<InformaticaServerlessRuntimeResource>,
    InformaticaServerlessRuntimeResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/serverlessRuntimes/{serverlessRuntimeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      serverlessRuntimeName: serverlessRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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
): Promise<InformaticaServerlessRuntimeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return informaticaServerlessRuntimeResourceDeserializer(result.body);
}

/** Get a InformaticaServerlessRuntimeResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  serverlessRuntimeName: string,
  options: ServerlessRuntimesGetOptionalParams = { requestOptions: {} },
): Promise<InformaticaServerlessRuntimeResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    serverlessRuntimeName,
    options,
  );
  return _getDeserialize(result);
}
