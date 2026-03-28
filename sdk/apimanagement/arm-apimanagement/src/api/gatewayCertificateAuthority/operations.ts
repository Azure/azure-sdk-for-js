// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  GatewayCertificateAuthorityContract,
  _GatewayCertificateAuthorityCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  gatewayCertificateAuthorityContractSerializer,
  gatewayCertificateAuthorityContractDeserializer,
  _gatewayCertificateAuthorityCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GatewayCertificateAuthorityListByServiceOptionalParams,
  GatewayCertificateAuthorityDeleteOptionalParams,
  GatewayCertificateAuthorityCreateOrUpdateOptionalParams,
  GatewayCertificateAuthorityGetEntityTagOptionalParams,
  GatewayCertificateAuthorityGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayCertificateAuthorityListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/certificateAuthorities{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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
): Promise<_GatewayCertificateAuthorityCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _gatewayCertificateAuthorityCollectionDeserializer(result.body);
}

/** Lists the collection of Certificate Authorities for the specified Gateway entity. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayCertificateAuthorityListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GatewayCertificateAuthorityContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, serviceName, gatewayId, options),
    _listByServiceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  certificateId: string,
  ifMatch: string,
  options: GatewayCertificateAuthorityDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/certificateAuthorities/{certificateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      certificateId: certificateId,
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

/** Remove relationship between Certificate Authority and Gateway entity. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  certificateId: string,
  ifMatch: string,
  options: GatewayCertificateAuthorityDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    certificateId,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  certificateId: string,
  parameters: GatewayCertificateAuthorityContract,
  options: GatewayCertificateAuthorityCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/certificateAuthorities/{certificateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      certificateId: certificateId,
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
    body: gatewayCertificateAuthorityContractSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayCertificateAuthorityContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayCertificateAuthorityContractDeserializer(result.body);
}

/** Assign Certificate entity to Gateway entity as Certificate Authority. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  certificateId: string,
  parameters: GatewayCertificateAuthorityContract,
  options: GatewayCertificateAuthorityCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GatewayCertificateAuthorityContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    certificateId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  certificateId: string,
  options: GatewayCertificateAuthorityGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/certificateAuthorities/{certificateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      certificateId: certificateId,
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

/** Checks if Certificate entity is assigned to Gateway entity as Certificate Authority. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  certificateId: string,
  options: GatewayCertificateAuthorityGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    certificateId,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  certificateId: string,
  options: GatewayCertificateAuthorityGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/certificateAuthorities/{certificateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      certificateId: certificateId,
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
): Promise<GatewayCertificateAuthorityContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gatewayCertificateAuthorityContractDeserializer(result.body);
}

/** Get assigned Gateway Certificate Authority details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  certificateId: string,
  options: GatewayCertificateAuthorityGetOptionalParams = { requestOptions: {} },
): Promise<GatewayCertificateAuthorityContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    certificateId,
    options,
  );
  return _getDeserialize(result);
}
