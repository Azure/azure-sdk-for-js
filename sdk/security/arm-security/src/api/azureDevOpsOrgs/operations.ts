// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
  SecurityConnectorsDevOpsAPIAzureDevOpsOrgListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import {
  securityConnectorsDevOpsAPIAzureDevOpsOrgSerializer,
  securityConnectorsDevOpsAPIAzureDevOpsOrgDeserializer,
  securityConnectorsDevOpsAPIAzureDevOpsOrgListResponseDeserializer,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AzureDevOpsOrgsListAvailableOptionalParams,
  AzureDevOpsOrgsListOptionalParams,
  AzureDevOpsOrgsUpdateOptionalParams,
  AzureDevOpsOrgsCreateOrUpdateOptionalParams,
  AzureDevOpsOrgsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAvailableSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: AzureDevOpsOrgsListAvailableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/listAvailableAzureDevOpsOrgs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      "api%2Dversion": "2025-11-01-preview",
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

export async function _listAvailableDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrgListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIAzureDevOpsOrgListResponseDeserializer(result.body);
}

/** Returns a list of all Azure DevOps organizations accessible by the user token consumed by the connector. */
export async function listAvailable(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: AzureDevOpsOrgsListAvailableOptionalParams = { requestOptions: {} },
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrgListResponse> {
  const result = await _listAvailableSend(
    context,
    resourceGroupName,
    securityConnectorName,
    options,
  );
  return _listAvailableDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: AzureDevOpsOrgsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/azureDevOpsOrgs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
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
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrgListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIAzureDevOpsOrgListResponseDeserializer(result.body);
}

/** Returns a list of Azure DevOps organizations onboarded to the connector. */
export function list(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: AzureDevOpsOrgsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIAzureDevOpsOrg> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, securityConnectorName, options),
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
  azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
  options: AzureDevOpsOrgsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/azureDevOpsOrgs/{orgName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityConnectorsDevOpsAPIAzureDevOpsOrgSerializer(azureDevOpsOrg),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrg> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIAzureDevOpsOrgDeserializer(result.body);
}

/** Updates monitored Azure DevOps organization details. */
export function update(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
  options: AzureDevOpsOrgsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
  SecurityConnectorsDevOpsAPIAzureDevOpsOrg
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
        azureDevOpsOrg,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-11-01-preview",
  }) as PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
    SecurityConnectorsDevOpsAPIAzureDevOpsOrg
  >;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
  options: AzureDevOpsOrgsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/azureDevOpsOrgs/{orgName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityConnectorsDevOpsAPIAzureDevOpsOrgSerializer(azureDevOpsOrg),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrg> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIAzureDevOpsOrgDeserializer(result.body);
}

/** Creates or updates monitored Azure DevOps organization details. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
  options: AzureDevOpsOrgsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
  SecurityConnectorsDevOpsAPIAzureDevOpsOrg
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
        azureDevOpsOrg,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-11-01-preview",
  }) as PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
    SecurityConnectorsDevOpsAPIAzureDevOpsOrg
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  options: AzureDevOpsOrgsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/azureDevOpsOrgs/{orgName}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrg> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIAzureDevOpsOrgDeserializer(result.body);
}

/** Returns a monitored Azure DevOps organization resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  orgName: string,
  options: AzureDevOpsOrgsGetOptionalParams = { requestOptions: {} },
): Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrg> {
  const result = await _getSend(
    context,
    resourceGroupName,
    securityConnectorName,
    orgName,
    options,
  );
  return _getDeserialize(result);
}
