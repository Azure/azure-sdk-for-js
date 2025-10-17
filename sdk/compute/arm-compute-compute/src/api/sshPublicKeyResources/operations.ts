// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  SshPublicKeyResource,
  SshPublicKeyUpdateResource,
  _SshPublicKeysGroupListResult,
  SshPublicKeyGenerateKeyPairResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  sshPublicKeyResourceSerializer,
  sshPublicKeyResourceDeserializer,
  sshPublicKeyUpdateResourceSerializer,
  _sshPublicKeysGroupListResultDeserializer,
  sshGenerateKeyPairInputParametersSerializer,
  sshPublicKeyGenerateKeyPairResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SshPublicKeyResourcesGenerateKeyPairOptionalParams,
  SshPublicKeyResourcesListBySubscriptionOptionalParams,
  SshPublicKeyResourcesListByResourceGroupOptionalParams,
  SshPublicKeyResourcesDeleteOptionalParams,
  SshPublicKeyResourcesUpdateOptionalParams,
  SshPublicKeyResourcesCreateOptionalParams,
  SshPublicKeyResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _generateKeyPairSend(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  options: SshPublicKeyResourcesGenerateKeyPairOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}/generateKeyPair{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sshPublicKeyName: sshPublicKeyName,
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
    body: !options["parameters"]
      ? options["parameters"]
      : sshGenerateKeyPairInputParametersSerializer(options["parameters"]),
  });
}

export async function _generateKeyPairDeserialize(
  result: PathUncheckedResponse,
): Promise<SshPublicKeyGenerateKeyPairResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return sshPublicKeyGenerateKeyPairResultDeserializer(result.body);
}

/** Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource. */
export async function generateKeyPair(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  options: SshPublicKeyResourcesGenerateKeyPairOptionalParams = {
    requestOptions: {},
  },
): Promise<SshPublicKeyGenerateKeyPairResult> {
  const result = await _generateKeyPairSend(context, resourceGroupName, sshPublicKeyName, options);
  return _generateKeyPairDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: SshPublicKeyResourcesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/sshPublicKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SshPublicKeysGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _sshPublicKeysGroupListResultDeserializer(result.body);
}

/** Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys. */
export function listBySubscription(
  context: Client,
  options: SshPublicKeyResourcesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SshPublicKeyResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SshPublicKeyResourcesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SshPublicKeysGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _sshPublicKeysGroupListResultDeserializer(result.body);
}

/** Lists all of the SSH public keys in the specified resource group. Use the nextLink property in the response to get the next page of SSH public keys. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SshPublicKeyResourcesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SshPublicKeyResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  options: SshPublicKeyResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sshPublicKeyName: sshPublicKeyName,
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
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete an SSH public key. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  options: SshPublicKeyResourcesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, sshPublicKeyName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  parameters: SshPublicKeyUpdateResource,
  options: SshPublicKeyResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sshPublicKeyName: sshPublicKeyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sshPublicKeyUpdateResourceSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SshPublicKeyResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return sshPublicKeyResourceDeserializer(result.body);
}

/** Updates a new SSH public key resource. */
export async function update(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  parameters: SshPublicKeyUpdateResource,
  options: SshPublicKeyResourcesUpdateOptionalParams = { requestOptions: {} },
): Promise<SshPublicKeyResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    sshPublicKeyName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  parameters: SshPublicKeyResource,
  options: SshPublicKeyResourcesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sshPublicKeyName: sshPublicKeyName,
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
    body: sshPublicKeyResourceSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SshPublicKeyResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return sshPublicKeyResourceDeserializer(result.body);
}

/** Creates a new SSH public key resource. */
export async function create(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  parameters: SshPublicKeyResource,
  options: SshPublicKeyResourcesCreateOptionalParams = { requestOptions: {} },
): Promise<SshPublicKeyResource> {
  const result = await _createSend(
    context,
    resourceGroupName,
    sshPublicKeyName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  options: SshPublicKeyResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sshPublicKeyName: sshPublicKeyName,
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
): Promise<SshPublicKeyResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return sshPublicKeyResourceDeserializer(result.body);
}

/** Retrieves information about an SSH public key. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sshPublicKeyName: string,
  options: SshPublicKeyResourcesGetOptionalParams = { requestOptions: {} },
): Promise<SshPublicKeyResource> {
  const result = await _getSend(context, resourceGroupName, sshPublicKeyName, options);
  return _getDeserialize(result);
}
