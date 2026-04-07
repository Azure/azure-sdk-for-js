// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { JobCredential, _JobCredentialListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  jobCredentialSerializer,
  jobCredentialDeserializer,
  _jobCredentialListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  JobCredentialsListByAgentOptionalParams,
  JobCredentialsDeleteOptionalParams,
  JobCredentialsCreateOrUpdateOptionalParams,
  JobCredentialsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAgentSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  options: JobCredentialsListByAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/credentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobCredentialListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _jobCredentialListResultDeserializer(result.body);
}

/** Gets a list of jobs credentials. */
export function listByAgent(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  options: JobCredentialsListByAgentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobCredential> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAgentSend(context, resourceGroupName, serverName, jobAgentName, options),
    _listByAgentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  credentialName: string,
  options: JobCredentialsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/credentials/{credentialName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      credentialName: credentialName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

/** Deletes a job credential. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  credentialName: string,
  options: JobCredentialsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    credentialName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  credentialName: string,
  parameters: JobCredential,
  options: JobCredentialsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/credentials/{credentialName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      credentialName: credentialName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: jobCredentialSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<JobCredential> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobCredentialDeserializer(result.body);
}

/** Creates or updates a job credential. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  credentialName: string,
  parameters: JobCredential,
  options: JobCredentialsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<JobCredential> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    credentialName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  credentialName: string,
  options: JobCredentialsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/credentials/{credentialName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      credentialName: credentialName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobCredential> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobCredentialDeserializer(result.body);
}

/** Gets a jobs credential. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  credentialName: string,
  options: JobCredentialsGetOptionalParams = { requestOptions: {} },
): Promise<JobCredential> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    credentialName,
    options,
  );
  return _getDeserialize(result);
}
