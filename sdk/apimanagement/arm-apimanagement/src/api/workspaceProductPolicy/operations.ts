// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { PolicyContract, PolicyIdName, _PolicyCollection } from "../../models/models.js";
import {
  errorResponseDeserializer,
  policyContractSerializer,
  policyContractDeserializer,
  _policyCollectionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceProductPolicyListByProductOptionalParams,
  WorkspaceProductPolicyDeleteOptionalParams,
  WorkspaceProductPolicyCreateOrUpdateOptionalParams,
  WorkspaceProductPolicyGetEntityTagOptionalParams,
  WorkspaceProductPolicyGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByProductSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  options: WorkspaceProductPolicyListByProductOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/products/{productId}/policies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      productId: productId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listByProductDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _policyCollectionDeserializer(result.body);
}

/** Get the policy configuration at the Product level. */
export async function listByProduct(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  options: WorkspaceProductPolicyListByProductOptionalParams = { requestOptions: {} },
): Promise<_PolicyCollection> {
  const result = await _listByProductSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    productId,
    options,
  );
  return _listByProductDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  policyId: PolicyIdName,
  ifMatch: string,
  options: WorkspaceProductPolicyDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/products/{productId}/policies/{policyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      productId: productId,
      policyId: policyId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
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

/** Deletes the policy configuration at the Product. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  policyId: PolicyIdName,
  ifMatch: string,
  options: WorkspaceProductPolicyDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    productId,
    policyId,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  policyId: PolicyIdName,
  parameters: PolicyContract,
  options: WorkspaceProductPolicyCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/products/{productId}/policies/{policyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      productId: productId,
      policyId: policyId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: policyContractSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return policyContractDeserializer(result.body);
}

/** Creates or updates policy configuration for the Product. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  policyId: PolicyIdName,
  parameters: PolicyContract,
  options: WorkspaceProductPolicyCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PolicyContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    productId,
    policyId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  policyId: PolicyIdName,
  options: WorkspaceProductPolicyGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/products/{productId}/policies/{policyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      productId: productId,
      policyId: policyId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityTagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Get the ETag of the policy configuration at the Product level. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  policyId: PolicyIdName,
  options: WorkspaceProductPolicyGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    productId,
    policyId,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  policyId: PolicyIdName,
  options: WorkspaceProductPolicyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/products/{productId}/policies/{policyId}{?api%2Dversion,format}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      productId: productId,
      policyId: policyId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      format: options?.format ?? "xml",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PolicyContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return policyContractDeserializer(result.body);
}

/** Get the policy configuration at the Product level. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  productId: string,
  policyId: PolicyIdName,
  options: WorkspaceProductPolicyGetOptionalParams = { requestOptions: {} },
): Promise<PolicyContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    productId,
    policyId,
    options,
  );
  return _getDeserialize(result);
}
