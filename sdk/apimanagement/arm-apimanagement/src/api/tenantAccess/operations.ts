// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AccessInformationContract,
  AccessIdName,
  AccessInformationCreateParameters,
  AccessInformationUpdateParameters,
  _AccessInformationCollection,
  AccessInformationSecretsContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  accessInformationContractDeserializer,
  accessInformationCreateParametersSerializer,
  accessInformationUpdateParametersSerializer,
  _accessInformationCollectionDeserializer,
  accessInformationSecretsContractDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TenantAccessListSecretsOptionalParams,
  TenantAccessRegenerateSecondaryKeyOptionalParams,
  TenantAccessRegeneratePrimaryKeyOptionalParams,
  TenantAccessListByServiceOptionalParams,
  TenantAccessUpdateOptionalParams,
  TenantAccessCreateOptionalParams,
  TenantAccessGetEntityTagOptionalParams,
  TenantAccessGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      accessName: accessName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessInformationSecretsContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return accessInformationSecretsContractDeserializer(result.body);
}

/** Get tenant access information details. */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessListSecretsOptionalParams = { requestOptions: {} },
): Promise<AccessInformationSecretsContract> {
  const result = await _listSecretsSend(
    context,
    resourceGroupName,
    serviceName,
    accessName,
    options,
  );
  return _listSecretsDeserialize(result);
}

export function _regenerateSecondaryKeySend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessRegenerateSecondaryKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}/regenerateSecondaryKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      accessName: accessName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _regenerateSecondaryKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Regenerate secondary access key */
export async function regenerateSecondaryKey(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessRegenerateSecondaryKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regenerateSecondaryKeySend(
    context,
    resourceGroupName,
    serviceName,
    accessName,
    options,
  );
  return _regenerateSecondaryKeyDeserialize(result);
}

export function _regeneratePrimaryKeySend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessRegeneratePrimaryKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}/regeneratePrimaryKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      accessName: accessName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _regeneratePrimaryKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Regenerate primary access key */
export async function regeneratePrimaryKey(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessRegeneratePrimaryKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regeneratePrimaryKeySend(
    context,
    resourceGroupName,
    serviceName,
    accessName,
    options,
  );
  return _regeneratePrimaryKeyDeserialize(result);
}

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: TenantAccessListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccessInformationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _accessInformationCollectionDeserializer(result.body);
}

/** Returns list of access infos - for Git and Management endpoints. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: TenantAccessListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessInformationContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, serviceName, options),
    _listByServiceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  ifMatch: string,
  parameters: AccessInformationUpdateParameters,
  options: TenantAccessUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      accessName: accessName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: accessInformationUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessInformationContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return accessInformationContractDeserializer(result.body);
}

/** Update tenant access information details. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  ifMatch: string,
  parameters: AccessInformationUpdateParameters,
  options: TenantAccessUpdateOptionalParams = { requestOptions: {} },
): Promise<AccessInformationContract> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serviceName,
    accessName,
    ifMatch,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  ifMatch: string,
  parameters: AccessInformationCreateParameters,
  options: TenantAccessCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      accessName: accessName,
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
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: accessInformationCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessInformationContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return accessInformationContractDeserializer(result.body);
}

/** Update tenant access information details. */
export async function create(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  ifMatch: string,
  parameters: AccessInformationCreateParameters,
  options: TenantAccessCreateOptionalParams = { requestOptions: {} },
): Promise<AccessInformationContract> {
  const result = await _createSend(
    context,
    resourceGroupName,
    serviceName,
    accessName,
    ifMatch,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      accessName: accessName,
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

/** Tenant access metadata */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    accessName,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      accessName: accessName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessInformationContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return accessInformationContractDeserializer(result.body);
}

/** Get tenant access information details without secrets. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessGetOptionalParams = { requestOptions: {} },
): Promise<AccessInformationContract> {
  const result = await _getSend(context, resourceGroupName, serviceName, accessName, options);
  return _getDeserialize(result);
}
