// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  SelfHostedIntegrationRuntimeNode,
  UpdateIntegrationRuntimeNodeRequest,
  IntegrationRuntimeNodeIpAddress,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  selfHostedIntegrationRuntimeNodeDeserializer,
  updateIntegrationRuntimeNodeRequestSerializer,
  integrationRuntimeNodeIpAddressDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IntegrationRuntimeNodesGetIpAddressOptionalParams,
  IntegrationRuntimeNodesUpdateOptionalParams,
  IntegrationRuntimeNodesDeleteOptionalParams,
  IntegrationRuntimeNodesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getIpAddressSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  nodeName: string,
  options: IntegrationRuntimeNodesGetIpAddressOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}/ipAddress{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      nodeName: nodeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _getIpAddressDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeNodeIpAddress> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeNodeIpAddressDeserializer(result.body);
}

/** Get the IP address of self-hosted integration runtime node. */
export async function getIpAddress(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  nodeName: string,
  options: IntegrationRuntimeNodesGetIpAddressOptionalParams = { requestOptions: {} },
): Promise<IntegrationRuntimeNodeIpAddress> {
  const result = await _getIpAddressSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    nodeName,
    options,
  );
  return _getIpAddressDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  nodeName: string,
  updateIntegrationRuntimeNodeRequest: UpdateIntegrationRuntimeNodeRequest,
  options: IntegrationRuntimeNodesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      nodeName: nodeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateIntegrationRuntimeNodeRequestSerializer(updateIntegrationRuntimeNodeRequest),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SelfHostedIntegrationRuntimeNode> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return selfHostedIntegrationRuntimeNodeDeserializer(result.body);
}

/** Updates a self-hosted integration runtime node. */
export async function update(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  nodeName: string,
  updateIntegrationRuntimeNodeRequest: UpdateIntegrationRuntimeNodeRequest,
  options: IntegrationRuntimeNodesUpdateOptionalParams = { requestOptions: {} },
): Promise<SelfHostedIntegrationRuntimeNode> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    nodeName,
    updateIntegrationRuntimeNodeRequest,
    options,
  );
  return _updateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  nodeName: string,
  options: IntegrationRuntimeNodesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      nodeName: nodeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a self-hosted integration runtime node. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  nodeName: string,
  options: IntegrationRuntimeNodesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    nodeName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  nodeName: string,
  options: IntegrationRuntimeNodesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      nodeName: nodeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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
): Promise<SelfHostedIntegrationRuntimeNode> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return selfHostedIntegrationRuntimeNodeDeserializer(result.body);
}

/** Gets a self-hosted integration runtime node. */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  nodeName: string,
  options: IntegrationRuntimeNodesGetOptionalParams = { requestOptions: {} },
): Promise<SelfHostedIntegrationRuntimeNode> {
  const result = await _getSend(
    context,
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    nodeName,
    options,
  );
  return _getDeserialize(result);
}
