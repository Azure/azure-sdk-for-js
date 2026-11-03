// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext as Client } from "../index.js";
import type {
  SuppressionListAddressResource,
  _SuppressionListAddressResourceCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  suppressionListAddressResourceSerializer,
  suppressionListAddressResourceDeserializer,
  _suppressionListAddressResourceCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SuppressionListAddressesListOptionalParams,
  SuppressionListAddressesDeleteOptionalParams,
  SuppressionListAddressesCreateOrUpdateOptionalParams,
  SuppressionListAddressesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  options: SuppressionListAddressesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}/suppressionListAddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      suppressionListName: suppressionListName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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
): Promise<_SuppressionListAddressResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _suppressionListAddressResourceCollectionDeserializer(result.body);
}

/** Get all the addresses in a suppression list. */
export function list(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  options: SuppressionListAddressesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SuppressionListAddressResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        suppressionListName,
        options,
      ),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-18" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  addressId: string,
  options: SuppressionListAddressesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}/suppressionListAddresses/{addressId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      suppressionListName: suppressionListName,
      addressId: addressId,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

/** Operation to delete a single address from a suppression list. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  addressId: string,
  options: SuppressionListAddressesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    emailServiceName,
    domainName,
    suppressionListName,
    addressId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  addressId: string,
  parameters: SuppressionListAddressResource,
  options: SuppressionListAddressesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}/suppressionListAddresses/{addressId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      suppressionListName: suppressionListName,
      addressId: addressId,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: suppressionListAddressResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SuppressionListAddressResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return suppressionListAddressResourceDeserializer(result.body);
}

/** Create or update a SuppressionListAddress. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  addressId: string,
  parameters: SuppressionListAddressResource,
  options: SuppressionListAddressesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SuppressionListAddressResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    emailServiceName,
    domainName,
    suppressionListName,
    addressId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  addressId: string,
  options: SuppressionListAddressesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}/suppressionListAddresses/{addressId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      suppressionListName: suppressionListName,
      addressId: addressId,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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
): Promise<SuppressionListAddressResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return suppressionListAddressResourceDeserializer(result.body);
}

/** Get a SuppressionListAddress. */
export async function get(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  suppressionListName: string,
  addressId: string,
  options: SuppressionListAddressesGetOptionalParams = { requestOptions: {} },
): Promise<SuppressionListAddressResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    emailServiceName,
    domainName,
    suppressionListName,
    addressId,
    options,
  );
  return _getDeserialize(result);
}
