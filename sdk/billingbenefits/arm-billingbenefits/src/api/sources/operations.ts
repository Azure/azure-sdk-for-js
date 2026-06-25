// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CreditSource,
  creditSourceSerializer,
  creditSourceDeserializer,
  CreditSourcePatchRequest,
  creditSourcePatchRequestSerializer,
  _CreditSourcesList,
  _creditSourcesListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SourcesListByCreditOptionalParams,
  SourcesDeleteOptionalParams,
  SourcesUpdateOptionalParams,
  SourcesCreateOptionalParams,
  SourcesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByCreditSend(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  options: SourcesListByCreditOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/credits/{creditName}/sources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      creditName: creditName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByCreditDeserialize(
  result: PathUncheckedResponse,
): Promise<_CreditSourcesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _creditSourcesListDeserializer(result.body);
}

/** List credit sources for a credit under a resource group from primary service admin. */
export function listByCredit(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  options: SourcesListByCreditOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CreditSource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCreditSend(context, resourceGroupName, creditName, options),
    _listByCreditDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  sourceName: string,
  options: SourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/credits/{creditName}/sources/{sourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      creditName: creditName,
      sourceName: sourceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

/** Delete a credit source. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  sourceName: string,
  options: SourcesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, creditName, sourceName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  sourceName: string,
  body: CreditSourcePatchRequest,
  options: SourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/credits/{creditName}/sources/{sourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      creditName: creditName,
      sourceName: sourceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: creditSourcePatchRequestSerializer(body),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<CreditSource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return creditSourceDeserializer(result.body);
}

/** Update a credit source. */
export async function update(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  sourceName: string,
  body: CreditSourcePatchRequest,
  options: SourcesUpdateOptionalParams = { requestOptions: {} },
): Promise<CreditSource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    creditName,
    sourceName,
    body,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  sourceName: string,
  body: CreditSource,
  options: SourcesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/credits/{creditName}/sources/{sourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      creditName: creditName,
      sourceName: sourceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: creditSourceSerializer(body),
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<CreditSource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return creditSourceDeserializer(result.body);
}

/** Create a credit source. */
export async function create(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  sourceName: string,
  body: CreditSource,
  options: SourcesCreateOptionalParams = { requestOptions: {} },
): Promise<CreditSource> {
  const result = await _createSend(
    context,
    resourceGroupName,
    creditName,
    sourceName,
    body,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  sourceName: string,
  options: SourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/credits/{creditName}/sources/{sourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      creditName: creditName,
      sourceName: sourceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CreditSource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return creditSourceDeserializer(result.body);
}

/** Get a credit source. */
export async function get(
  context: Client,
  resourceGroupName: string,
  creditName: string,
  sourceName: string,
  options: SourcesGetOptionalParams = { requestOptions: {} },
): Promise<CreditSource> {
  const result = await _getSend(context, resourceGroupName, creditName, sourceName, options);
  return _getDeserialize(result);
}
