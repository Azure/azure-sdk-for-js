// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  SecurityConnectorsDevOpsAPIAzureDevOpsProject,
  _SecurityConnectorsDevOpsAPIAzureDevOpsProjectListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import {
  securityConnectorsDevOpsAPIAzureDevOpsProjectSerializer,
  securityConnectorsDevOpsAPIAzureDevOpsProjectDeserializer,
  _securityConnectorsDevOpsAPIAzureDevOpsProjectListResponseDeserializer,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AzureDevOpsProjectsListOptionalParams,
  AzureDevOpsProjectsUpdateOptionalParams,
  AzureDevOpsProjectsCreateOrUpdateOptionalParams,
  AzureDevOpsProjectsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  options: AzureDevOpsProjectsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/azureDevOpsOrgs/{orgName}/projects{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      orgName: orgName,
      "api%2Dversion": "2025-11-01-preview",
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
): Promise<_SecurityConnectorsDevOpsAPIAzureDevOpsProjectListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _securityConnectorsDevOpsAPIAzureDevOpsProjectListResponseDeserializer(result.body);
}

/** Returns a list of Azure DevOps projects onboarded to the connector. */
export function list(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  options: AzureDevOpsProjectsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIAzureDevOpsProject> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, securityConnectorName, orgName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-11-01-preview" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  projectName: string,
  azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
  options: AzureDevOpsProjectsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/azureDevOpsOrgs/{orgName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      orgName: orgName,
      projectName: projectName,
      "api%2Dversion": "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityConnectorsDevOpsAPIAzureDevOpsProjectSerializer(azureDevOpsProject),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsProject> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIAzureDevOpsProjectDeserializer(result.body);
}

/** Updates a monitored Azure DevOps project resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  projectName: string,
  azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
  options: AzureDevOpsProjectsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
  SecurityConnectorsDevOpsAPIAzureDevOpsProject
> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        azureDevOpsProject,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-11-01-preview",
  }) as PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
    SecurityConnectorsDevOpsAPIAzureDevOpsProject
  >;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  projectName: string,
  azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
  options: AzureDevOpsProjectsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/azureDevOpsOrgs/{orgName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      orgName: orgName,
      projectName: projectName,
      "api%2Dversion": "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityConnectorsDevOpsAPIAzureDevOpsProjectSerializer(azureDevOpsProject),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsProject> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIAzureDevOpsProjectDeserializer(result.body);
}

/** Creates or updates a monitored Azure DevOps project resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  projectName: string,
  azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
  options: AzureDevOpsProjectsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
  SecurityConnectorsDevOpsAPIAzureDevOpsProject
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        azureDevOpsProject,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-11-01-preview",
  }) as PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
    SecurityConnectorsDevOpsAPIAzureDevOpsProject
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  projectName: string,
  options: AzureDevOpsProjectsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/azureDevOpsOrgs/{orgName}/projects/{projectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      orgName: orgName,
      projectName: projectName,
      "api%2Dversion": "2025-11-01-preview",
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
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsProject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIAzureDevOpsProjectDeserializer(result.body);
}

/** Returns a monitored Azure DevOps project resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  projectName: string,
  options: AzureDevOpsProjectsGetOptionalParams = { requestOptions: {} },
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsProject> {
  const result = await _getSend(
    context,
    resourceGroupName,
    securityConnectorName,
    orgName,
    projectName,
    options,
  );
  return _getDeserialize(result);
}
