// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type {
  SkuResource,
  _SkuResourceArrayResponseWithContinuation,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  skuResourceSerializer,
  skuResourceDeserializer,
  _skuResourceArrayResponseWithContinuationDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SkusListByResourceTypeRegistrationsNestedResourceTypeThirdOptionalParams,
  SkusDeleteNestedResourceTypeThirdOptionalParams,
  SkusCreateOrUpdateNestedResourceTypeThirdOptionalParams,
  SkusGetNestedResourceTypeThirdOptionalParams,
  SkusListByResourceTypeRegistrationsNestedResourceTypeSecondOptionalParams,
  SkusDeleteNestedResourceTypeSecondOptionalParams,
  SkusCreateOrUpdateNestedResourceTypeSecondOptionalParams,
  SkusGetNestedResourceTypeSecondOptionalParams,
  SkusListByResourceTypeRegistrationsOptionalParams,
  SkusDeleteOptionalParams,
  SkusCreateOrUpdateOptionalParams,
  SkusGetOptionalParams,
  SkusListByResourceTypeRegistrationsNestedResourceTypeFirstOptionalParams,
  SkusDeleteNestedResourceTypeFirstOptionalParams,
  SkusCreateOrUpdateNestedResourceTypeFirstOptionalParams,
  SkusGetNestedResourceTypeFirstOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByResourceTypeRegistrationsNestedResourceTypeThirdSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  options: SkusListByResourceTypeRegistrationsNestedResourceTypeThirdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/resourcetypeRegistrations/{nestedResourceTypeThird}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      nestedResourceTypeThird: nestedResourceTypeThird,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _listByResourceTypeRegistrationsNestedResourceTypeThirdDeserialize(
  result: PathUncheckedResponse,
): Promise<_SkuResourceArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _skuResourceArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of skus for the given resource type. */
export function listByResourceTypeRegistrationsNestedResourceTypeThird(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  options: SkusListByResourceTypeRegistrationsNestedResourceTypeThirdOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SkuResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceTypeRegistrationsNestedResourceTypeThirdSend(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        nestedResourceTypeThird,
        options,
      ),
    _listByResourceTypeRegistrationsNestedResourceTypeThirdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _deleteNestedResourceTypeThirdSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  sku: string,
  options: SkusDeleteNestedResourceTypeThirdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/resourcetypeRegistrations/{nestedResourceTypeThird}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      nestedResourceTypeThird: nestedResourceTypeThird,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteNestedResourceTypeThirdDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a resource type sku. */
export async function deleteNestedResourceTypeThird(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  sku: string,
  options: SkusDeleteNestedResourceTypeThirdOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteNestedResourceTypeThirdSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    nestedResourceTypeThird,
    sku,
    options,
  );
  return _deleteNestedResourceTypeThirdDeserialize(result);
}

export function _createOrUpdateNestedResourceTypeThirdSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  sku: string,
  properties: SkuResource,
  options: SkusCreateOrUpdateNestedResourceTypeThirdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/resourcetypeRegistrations/{nestedResourceTypeThird}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      nestedResourceTypeThird: nestedResourceTypeThird,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: skuResourceSerializer(properties),
  });
}

export async function _createOrUpdateNestedResourceTypeThirdDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return skuResourceDeserializer(result.body);
}

/** Creates or updates the resource type skus in the given resource type. */
export async function createOrUpdateNestedResourceTypeThird(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  sku: string,
  properties: SkuResource,
  options: SkusCreateOrUpdateNestedResourceTypeThirdOptionalParams = { requestOptions: {} },
): Promise<SkuResource> {
  const result = await _createOrUpdateNestedResourceTypeThirdSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    nestedResourceTypeThird,
    sku,
    properties,
    options,
  );
  return _createOrUpdateNestedResourceTypeThirdDeserialize(result);
}

export function _getNestedResourceTypeThirdSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  sku: string,
  options: SkusGetNestedResourceTypeThirdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/resourcetypeRegistrations/{nestedResourceTypeThird}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      nestedResourceTypeThird: nestedResourceTypeThird,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _getNestedResourceTypeThirdDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return skuResourceDeserializer(result.body);
}

/** Gets the sku details for the given resource type and sku name. */
export async function getNestedResourceTypeThird(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  sku: string,
  options: SkusGetNestedResourceTypeThirdOptionalParams = { requestOptions: {} },
): Promise<SkuResource> {
  const result = await _getNestedResourceTypeThirdSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    nestedResourceTypeThird,
    sku,
    options,
  );
  return _getNestedResourceTypeThirdDeserialize(result);
}

export function _listByResourceTypeRegistrationsNestedResourceTypeSecondSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  options: SkusListByResourceTypeRegistrationsNestedResourceTypeSecondOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _listByResourceTypeRegistrationsNestedResourceTypeSecondDeserialize(
  result: PathUncheckedResponse,
): Promise<_SkuResourceArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _skuResourceArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of skus for the given resource type. */
export function listByResourceTypeRegistrationsNestedResourceTypeSecond(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  options: SkusListByResourceTypeRegistrationsNestedResourceTypeSecondOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SkuResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceTypeRegistrationsNestedResourceTypeSecondSend(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        options,
      ),
    _listByResourceTypeRegistrationsNestedResourceTypeSecondDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _deleteNestedResourceTypeSecondSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  sku: string,
  options: SkusDeleteNestedResourceTypeSecondOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteNestedResourceTypeSecondDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a resource type sku. */
export async function deleteNestedResourceTypeSecond(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  sku: string,
  options: SkusDeleteNestedResourceTypeSecondOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteNestedResourceTypeSecondSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    sku,
    options,
  );
  return _deleteNestedResourceTypeSecondDeserialize(result);
}

export function _createOrUpdateNestedResourceTypeSecondSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  sku: string,
  properties: SkuResource,
  options: SkusCreateOrUpdateNestedResourceTypeSecondOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: skuResourceSerializer(properties),
  });
}

export async function _createOrUpdateNestedResourceTypeSecondDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return skuResourceDeserializer(result.body);
}

/** Creates or updates the resource type skus in the given resource type. */
export async function createOrUpdateNestedResourceTypeSecond(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  sku: string,
  properties: SkuResource,
  options: SkusCreateOrUpdateNestedResourceTypeSecondOptionalParams = { requestOptions: {} },
): Promise<SkuResource> {
  const result = await _createOrUpdateNestedResourceTypeSecondSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    sku,
    properties,
    options,
  );
  return _createOrUpdateNestedResourceTypeSecondDeserialize(result);
}

export function _getNestedResourceTypeSecondSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  sku: string,
  options: SkusGetNestedResourceTypeSecondOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _getNestedResourceTypeSecondDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return skuResourceDeserializer(result.body);
}

/** Gets the sku details for the given resource type and sku name. */
export async function getNestedResourceTypeSecond(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  sku: string,
  options: SkusGetNestedResourceTypeSecondOptionalParams = { requestOptions: {} },
): Promise<SkuResource> {
  const result = await _getNestedResourceTypeSecondSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    sku,
    options,
  );
  return _getNestedResourceTypeSecondDeserialize(result);
}

export function _listByResourceTypeRegistrationsSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  options: SkusListByResourceTypeRegistrationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _listByResourceTypeRegistrationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SkuResourceArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _skuResourceArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of skus for the given resource type. */
export function listByResourceTypeRegistrations(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  options: SkusListByResourceTypeRegistrationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SkuResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceTypeRegistrationsSend(context, providerNamespace, resourceType, options),
    _listByResourceTypeRegistrationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  sku: string,
  options: SkusDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

/** Deletes a resource type sku. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  sku: string,
  options: SkusDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, providerNamespace, resourceType, sku, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  sku: string,
  properties: SkuResource,
  options: SkusCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: skuResourceSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return skuResourceDeserializer(result.body);
}

/** Creates or updates the resource type skus in the given resource type. */
export async function createOrUpdate(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  sku: string,
  properties: SkuResource,
  options: SkusCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SkuResource> {
  const result = await _createOrUpdateSend(
    context,
    providerNamespace,
    resourceType,
    sku,
    properties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  sku: string,
  options: SkusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SkuResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return skuResourceDeserializer(result.body);
}

/** Gets the sku details for the given resource type and sku name. */
export async function get(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  sku: string,
  options: SkusGetOptionalParams = { requestOptions: {} },
): Promise<SkuResource> {
  const result = await _getSend(context, providerNamespace, resourceType, sku, options);
  return _getDeserialize(result);
}

export function _listByResourceTypeRegistrationsNestedResourceTypeFirstSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  options: SkusListByResourceTypeRegistrationsNestedResourceTypeFirstOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _listByResourceTypeRegistrationsNestedResourceTypeFirstDeserialize(
  result: PathUncheckedResponse,
): Promise<_SkuResourceArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _skuResourceArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of skus for the given resource type. */
export function listByResourceTypeRegistrationsNestedResourceTypeFirst(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  options: SkusListByResourceTypeRegistrationsNestedResourceTypeFirstOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SkuResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceTypeRegistrationsNestedResourceTypeFirstSend(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        options,
      ),
    _listByResourceTypeRegistrationsNestedResourceTypeFirstDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _deleteNestedResourceTypeFirstSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  sku: string,
  options: SkusDeleteNestedResourceTypeFirstOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteNestedResourceTypeFirstDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a resource type sku. */
export async function deleteNestedResourceTypeFirst(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  sku: string,
  options: SkusDeleteNestedResourceTypeFirstOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteNestedResourceTypeFirstSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    sku,
    options,
  );
  return _deleteNestedResourceTypeFirstDeserialize(result);
}

export function _createOrUpdateNestedResourceTypeFirstSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  sku: string,
  properties: SkuResource,
  options: SkusCreateOrUpdateNestedResourceTypeFirstOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: skuResourceSerializer(properties),
  });
}

export async function _createOrUpdateNestedResourceTypeFirstDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return skuResourceDeserializer(result.body);
}

/** Creates or updates the resource type skus in the given resource type. */
export async function createOrUpdateNestedResourceTypeFirst(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  sku: string,
  properties: SkuResource,
  options: SkusCreateOrUpdateNestedResourceTypeFirstOptionalParams = { requestOptions: {} },
): Promise<SkuResource> {
  const result = await _createOrUpdateNestedResourceTypeFirstSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    sku,
    properties,
    options,
  );
  return _createOrUpdateNestedResourceTypeFirstDeserialize(result);
}

export function _getNestedResourceTypeFirstSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  sku: string,
  options: SkusGetNestedResourceTypeFirstOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/skus/{sku}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      sku: sku,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _getNestedResourceTypeFirstDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return skuResourceDeserializer(result.body);
}

/** Gets the sku details for the given resource type and sku name. */
export async function getNestedResourceTypeFirst(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  sku: string,
  options: SkusGetNestedResourceTypeFirstOptionalParams = { requestOptions: {} },
): Promise<SkuResource> {
  const result = await _getNestedResourceTypeFirstSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    sku,
    options,
  );
  return _getNestedResourceTypeFirstDeserialize(result);
}
