// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgresContext as Client } from "../index.js";
import type {
  Branch,
  _BranchListResult,
  PreflightCheckParameters,
  PreflightCheckResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  branchSerializer,
  branchDeserializer,
  _branchListResultDeserializer,
  preflightCheckParametersSerializer,
  preflightCheckResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BranchesPreflightOptionalParams,
  BranchesListOptionalParams,
  BranchesDeleteOptionalParams,
  BranchesCreateOrUpdateOptionalParams,
  BranchesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _preflightSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  parameters: PreflightCheckParameters,
  options: BranchesPreflightOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}/preflight{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: preflightCheckParametersSerializer(parameters),
  });
}

export async function _preflightDeserialize(
  result: PathUncheckedResponse,
): Promise<PreflightCheckResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return preflightCheckResultDeserializer(result.body);
}

/** Action to validate preflight checks. */
export async function preflight(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  parameters: PreflightCheckParameters,
  options: BranchesPreflightOptionalParams = { requestOptions: {} },
): Promise<PreflightCheckResult> {
  const result = await _preflightSend(
    context,
    resourceGroupName,
    organizationName,
    projectName,
    branchName,
    parameters,
    options,
  );
  return _preflightDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  options: BranchesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      projectName: projectName,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_BranchListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _branchListResultDeserializer(result.body);
}

/** List Branch resources by Project */
export function list(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  options: BranchesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Branch> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, organizationName, projectName, options),
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
  options: BranchesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}{?api%2Dversion}",
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

/** Delete a Branch */
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
  options: BranchesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    organizationName,
    projectName,
    branchName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  resource: Branch,
  options: BranchesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: branchSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Branch> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return branchDeserializer(result.body);
}

/** Create a Branch */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  resource: Branch,
  options: BranchesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Branch>, Branch> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Branch>, Branch>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  options: BranchesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Neon.Postgres/organizations/{organizationName}/projects/{projectName}/branches/{branchName}{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Branch> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return branchDeserializer(result.body);
}

/** Get a Branch */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  projectName: string,
  branchName: string,
  options: BranchesGetOptionalParams = { requestOptions: {} },
): Promise<Branch> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    projectName,
    branchName,
    options,
  );
  return _getDeserialize(result);
}
