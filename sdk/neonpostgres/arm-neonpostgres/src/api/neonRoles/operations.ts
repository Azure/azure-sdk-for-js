// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  NeonRole,
  neonRoleSerializer,
  neonRoleDeserializer,
  _NeonRoleListResult,
  _neonRoleListResultDeserializer,
} from "../../models/models.js";
import {
  NeonRolesListOptionalParams,
  NeonRolesDeleteOptionalParams,
  NeonRolesUpdateOptionalParams,
  NeonRolesCreateOrUpdateOptionalParams,
  NeonRolesGetOptionalParams,
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
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  options: NeonRolesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonRoles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NeonRoleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _neonRoleListResultDeserializer(result.body);
}

/** List NeonRole resources by Branch */
export function list(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  options: NeonRolesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NeonRole> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        options,
      ),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonRoleName: string,
  options: NeonRolesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonRoles/{neonRoleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
      neonRoleName: neonRoleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a NeonRole */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonRoleName: string,
  options: NeonRolesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    organizationName,
    projectName,
    branchName,
    neonRoleName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonRoleName: string,
  properties: NeonRole,
  options: NeonRolesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonRoles/{neonRoleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
      neonRoleName: neonRoleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: neonRoleSerializer(properties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NeonRole> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return neonRoleDeserializer(result.body);
}

/** Update a NeonRole */
export function update(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonRoleName: string,
  properties: NeonRole,
  options: NeonRolesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NeonRole>, NeonRole> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        neonRoleName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NeonRole>, NeonRole>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonRoleName: string,
  resource: NeonRole,
  options: NeonRolesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonRoles/{neonRoleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
      neonRoleName: neonRoleName,
      "api%2Dversion": context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: neonRoleSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NeonRole> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return neonRoleDeserializer(result.body);
}

/** Create a NeonRole */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonRoleName: string,
  resource: NeonRole,
  options: NeonRolesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NeonRole>, NeonRole> {
  return getLongRunningPoller(
    context,
    _createOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateSend(
          context,
          resourceGroupName,
          organizationName,
          projectName,
          branchName,
          neonRoleName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<NeonRole>, NeonRole>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonRoleName: string,
  options: NeonRolesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/neonRoles/{neonRoleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
      branchName: branchName,
      neonRoleName: neonRoleName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<NeonRole> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return neonRoleDeserializer(result.body);
}

/** Get a NeonRole */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  neonRoleName: string,
  options: NeonRolesGetOptionalParams = { requestOptions: {} },
): Promise<NeonRole> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    projectName,
    branchName,
    neonRoleName,
    options,
  );
  return _getDeserialize(result);
}
