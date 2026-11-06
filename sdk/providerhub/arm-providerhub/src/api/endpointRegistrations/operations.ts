// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type {
  EndpointRegistration,
  _EndpointRegistrationArrayResponseWithContinuation,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  endpointRegistrationSerializer,
  endpointRegistrationDeserializer,
  _endpointRegistrationArrayResponseWithContinuationDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeThirdOptionalParams,
  EndpointRegistrationsDeleteNestedResourceTypeThirdOptionalParams,
  EndpointRegistrationsCreateOrUpdateNestedResourceTypeThirdOptionalParams,
  EndpointRegistrationsGetNestedResourceTypeThirdOptionalParams,
  EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeSecondOptionalParams,
  EndpointRegistrationsDeleteNestedResourceTypeSecondOptionalParams,
  EndpointRegistrationsCreateOrUpdateNestedResourceTypeSecondOptionalParams,
  EndpointRegistrationsGetNestedResourceTypeSecondOptionalParams,
  EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeFirstOptionalParams,
  EndpointRegistrationsDeleteNestedResourceTypeFirstOptionalParams,
  EndpointRegistrationsCreateOrUpdateNestedResourceTypeFirstOptionalParams,
  EndpointRegistrationsGetNestedResourceTypeFirstOptionalParams,
  EndpointRegistrationsListByResourceTypeRegistrationOptionalParams,
  EndpointRegistrationsDeleteOptionalParams,
  EndpointRegistrationsCreateOrUpdateOptionalParams,
  EndpointRegistrationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByResourceTypeRegistrationNestedResourceTypeThirdSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  options: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeThirdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/resourcetypeRegistrations/{nestedResourceTypeThird}/endpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      nestedResourceTypeThird: nestedResourceTypeThird,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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

export async function _listByResourceTypeRegistrationNestedResourceTypeThirdDeserialize(
  result: PathUncheckedResponse,
): Promise<_EndpointRegistrationArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _endpointRegistrationArrayResponseWithContinuationDeserializer(result.body);
}

/** Lists endpoint registrations for a third-level nested resource type. */
export function listByResourceTypeRegistrationNestedResourceTypeThird(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  options: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeThirdOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EndpointRegistration> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceTypeRegistrationNestedResourceTypeThirdSend(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        nestedResourceTypeThird,
        options,
      ),
    _listByResourceTypeRegistrationNestedResourceTypeThirdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-10-01" },
  );
}

export function _deleteNestedResourceTypeThirdSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  endpointName: string,
  options: EndpointRegistrationsDeleteNestedResourceTypeThirdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/resourcetypeRegistrations/{nestedResourceTypeThird}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      nestedResourceTypeThird: nestedResourceTypeThird,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an endpoint registration for a third-level nested resource type. */
export async function deleteNestedResourceTypeThird(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  endpointName: string,
  options: EndpointRegistrationsDeleteNestedResourceTypeThirdOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteNestedResourceTypeThirdSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    nestedResourceTypeThird,
    endpointName,
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
  endpointName: string,
  properties: EndpointRegistration,
  options: EndpointRegistrationsCreateOrUpdateNestedResourceTypeThirdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/resourcetypeRegistrations/{nestedResourceTypeThird}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      nestedResourceTypeThird: nestedResourceTypeThird,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: endpointRegistrationSerializer(properties),
  });
}

export async function _createOrUpdateNestedResourceTypeThirdDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointRegistration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointRegistrationDeserializer(result.body);
}

/** Creates or replaces an endpoint registration for a third-level nested resource type. */
export async function createOrUpdateNestedResourceTypeThird(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  endpointName: string,
  properties: EndpointRegistration,
  options: EndpointRegistrationsCreateOrUpdateNestedResourceTypeThirdOptionalParams = {
    requestOptions: {},
  },
): Promise<EndpointRegistration> {
  const result = await _createOrUpdateNestedResourceTypeThirdSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    nestedResourceTypeThird,
    endpointName,
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
  endpointName: string,
  options: EndpointRegistrationsGetNestedResourceTypeThirdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/resourcetypeRegistrations/{nestedResourceTypeThird}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      nestedResourceTypeThird: nestedResourceTypeThird,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
): Promise<EndpointRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointRegistrationDeserializer(result.body);
}

/** Gets an endpoint registration for a third-level nested resource type. */
export async function getNestedResourceTypeThird(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  nestedResourceTypeThird: string,
  endpointName: string,
  options: EndpointRegistrationsGetNestedResourceTypeThirdOptionalParams = { requestOptions: {} },
): Promise<EndpointRegistration> {
  const result = await _getNestedResourceTypeThirdSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    nestedResourceTypeThird,
    endpointName,
    options,
  );
  return _getNestedResourceTypeThirdDeserialize(result);
}

export function _listByResourceTypeRegistrationNestedResourceTypeSecondSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  options: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeSecondOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/endpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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

export async function _listByResourceTypeRegistrationNestedResourceTypeSecondDeserialize(
  result: PathUncheckedResponse,
): Promise<_EndpointRegistrationArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _endpointRegistrationArrayResponseWithContinuationDeserializer(result.body);
}

/** Lists endpoint registrations for a second-level nested resource type. */
export function listByResourceTypeRegistrationNestedResourceTypeSecond(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  options: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeSecondOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EndpointRegistration> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceTypeRegistrationNestedResourceTypeSecondSend(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        options,
      ),
    _listByResourceTypeRegistrationNestedResourceTypeSecondDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-10-01" },
  );
}

export function _deleteNestedResourceTypeSecondSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  endpointName: string,
  options: EndpointRegistrationsDeleteNestedResourceTypeSecondOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an endpoint registration for a second-level nested resource type. */
export async function deleteNestedResourceTypeSecond(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  endpointName: string,
  options: EndpointRegistrationsDeleteNestedResourceTypeSecondOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteNestedResourceTypeSecondSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    endpointName,
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
  endpointName: string,
  properties: EndpointRegistration,
  options: EndpointRegistrationsCreateOrUpdateNestedResourceTypeSecondOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: endpointRegistrationSerializer(properties),
  });
}

export async function _createOrUpdateNestedResourceTypeSecondDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointRegistration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointRegistrationDeserializer(result.body);
}

/** Creates or replaces an endpoint registration for a second-level nested resource type. */
export async function createOrUpdateNestedResourceTypeSecond(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  endpointName: string,
  properties: EndpointRegistration,
  options: EndpointRegistrationsCreateOrUpdateNestedResourceTypeSecondOptionalParams = {
    requestOptions: {},
  },
): Promise<EndpointRegistration> {
  const result = await _createOrUpdateNestedResourceTypeSecondSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    endpointName,
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
  endpointName: string,
  options: EndpointRegistrationsGetNestedResourceTypeSecondOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/resourcetypeRegistrations/{nestedResourceTypeSecond}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      nestedResourceTypeSecond: nestedResourceTypeSecond,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
): Promise<EndpointRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointRegistrationDeserializer(result.body);
}

/** Gets an endpoint registration for a second-level nested resource type. */
export async function getNestedResourceTypeSecond(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  nestedResourceTypeSecond: string,
  endpointName: string,
  options: EndpointRegistrationsGetNestedResourceTypeSecondOptionalParams = { requestOptions: {} },
): Promise<EndpointRegistration> {
  const result = await _getNestedResourceTypeSecondSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    nestedResourceTypeSecond,
    endpointName,
    options,
  );
  return _getNestedResourceTypeSecondDeserialize(result);
}

export function _listByResourceTypeRegistrationNestedResourceTypeFirstSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  options: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeFirstOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/endpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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

export async function _listByResourceTypeRegistrationNestedResourceTypeFirstDeserialize(
  result: PathUncheckedResponse,
): Promise<_EndpointRegistrationArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _endpointRegistrationArrayResponseWithContinuationDeserializer(result.body);
}

/** Lists endpoint registrations for a first-level nested resource type. */
export function listByResourceTypeRegistrationNestedResourceTypeFirst(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  options: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeFirstOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EndpointRegistration> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByResourceTypeRegistrationNestedResourceTypeFirstSend(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        options,
      ),
    _listByResourceTypeRegistrationNestedResourceTypeFirstDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-10-01" },
  );
}

export function _deleteNestedResourceTypeFirstSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  endpointName: string,
  options: EndpointRegistrationsDeleteNestedResourceTypeFirstOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an endpoint registration for a first-level nested resource type. */
export async function deleteNestedResourceTypeFirst(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  endpointName: string,
  options: EndpointRegistrationsDeleteNestedResourceTypeFirstOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteNestedResourceTypeFirstSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    endpointName,
    options,
  );
  return _deleteNestedResourceTypeFirstDeserialize(result);
}

export function _createOrUpdateNestedResourceTypeFirstSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  endpointName: string,
  properties: EndpointRegistration,
  options: EndpointRegistrationsCreateOrUpdateNestedResourceTypeFirstOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: endpointRegistrationSerializer(properties),
  });
}

export async function _createOrUpdateNestedResourceTypeFirstDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointRegistration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointRegistrationDeserializer(result.body);
}

/** Creates or replaces an endpoint registration for a first-level nested resource type. */
export async function createOrUpdateNestedResourceTypeFirst(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  endpointName: string,
  properties: EndpointRegistration,
  options: EndpointRegistrationsCreateOrUpdateNestedResourceTypeFirstOptionalParams = {
    requestOptions: {},
  },
): Promise<EndpointRegistration> {
  const result = await _createOrUpdateNestedResourceTypeFirstSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    endpointName,
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
  endpointName: string,
  options: EndpointRegistrationsGetNestedResourceTypeFirstOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/resourcetypeRegistrations/{nestedResourceTypeFirst}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      nestedResourceTypeFirst: nestedResourceTypeFirst,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
): Promise<EndpointRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointRegistrationDeserializer(result.body);
}

/** Gets an endpoint registration for a first-level nested resource type. */
export async function getNestedResourceTypeFirst(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  nestedResourceTypeFirst: string,
  endpointName: string,
  options: EndpointRegistrationsGetNestedResourceTypeFirstOptionalParams = { requestOptions: {} },
): Promise<EndpointRegistration> {
  const result = await _getNestedResourceTypeFirstSend(
    context,
    providerNamespace,
    resourceType,
    nestedResourceTypeFirst,
    endpointName,
    options,
  );
  return _getNestedResourceTypeFirstDeserialize(result);
}

export function _listByResourceTypeRegistrationSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  options: EndpointRegistrationsListByResourceTypeRegistrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/endpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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

export async function _listByResourceTypeRegistrationDeserialize(
  result: PathUncheckedResponse,
): Promise<_EndpointRegistrationArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _endpointRegistrationArrayResponseWithContinuationDeserializer(result.body);
}

/** Lists endpoint registrations for a resource type registration. */
export function listByResourceTypeRegistration(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  options: EndpointRegistrationsListByResourceTypeRegistrationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EndpointRegistration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceTypeRegistrationSend(context, providerNamespace, resourceType, options),
    _listByResourceTypeRegistrationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-10-01" },
  );
}

export function _$deleteSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  endpointName: string,
  options: EndpointRegistrationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an endpoint registration. */
export async function $delete(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  endpointName: string,
  options: EndpointRegistrationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    providerNamespace,
    resourceType,
    endpointName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  endpointName: string,
  properties: EndpointRegistration,
  options: EndpointRegistrationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: endpointRegistrationSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointRegistration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointRegistrationDeserializer(result.body);
}

/** Creates or replaces an endpoint registration. */
export async function createOrUpdate(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  endpointName: string,
  properties: EndpointRegistration,
  options: EndpointRegistrationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<EndpointRegistration> {
  const result = await _createOrUpdateSend(
    context,
    providerNamespace,
    resourceType,
    endpointName,
    properties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  endpointName: string,
  options: EndpointRegistrationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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
): Promise<EndpointRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointRegistrationDeserializer(result.body);
}

/** Gets an endpoint registration. */
export async function get(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  endpointName: string,
  options: EndpointRegistrationsGetOptionalParams = { requestOptions: {} },
): Promise<EndpointRegistration> {
  const result = await _getSend(context, providerNamespace, resourceType, endpointName, options);
  return _getDeserialize(result);
}
