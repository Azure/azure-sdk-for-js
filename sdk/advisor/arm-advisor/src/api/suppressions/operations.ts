// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementContext as Client } from "../index.js";
import {
  armErrorResponseDeserializer,
  SuppressionContract,
  suppressionContractSerializer,
  suppressionContractDeserializer,
  _SuppressionContractListResult,
  _suppressionContractListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SuppressionsListOptionalParams,
  SuppressionsDeleteOptionalParams,
  SuppressionsCreateOptionalParams,
  SuppressionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SuppressionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/suppressions{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SuppressionContractListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _suppressionContractListResultDeserializer(result.body);
}

/** Retrieves the list of snoozed or dismissed suppressions for a subscription. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. */
export function list(
  context: Client,
  options: SuppressionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SuppressionContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  recommendationId: string,
  name: string,
  options: SuppressionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Advisor/recommendations/{recommendationId}/suppressions/{name}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      recommendationId: recommendationId,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. */
export async function $delete(
  context: Client,
  resourceUri: string,
  recommendationId: string,
  name: string,
  options: SuppressionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceUri, recommendationId, name, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceUri: string,
  recommendationId: string,
  name: string,
  suppressionContract: SuppressionContract,
  options: SuppressionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Advisor/recommendations/{recommendationId}/suppressions/{name}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      recommendationId: recommendationId,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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
      body: suppressionContractSerializer(suppressionContract),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SuppressionContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 404) {
      if (result.body) {
        error.details = armErrorResponseDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = armErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return suppressionContractDeserializer(result.body);
}

/** Enables the snoozed or dismissed attribute of a recommendation. The snoozed or dismissed attribute is referred to as a suppression. Use this API to create or update the snoozed or dismissed status of a recommendation. */
export async function create(
  context: Client,
  resourceUri: string,
  recommendationId: string,
  name: string,
  suppressionContract: SuppressionContract,
  options: SuppressionsCreateOptionalParams = { requestOptions: {} },
): Promise<SuppressionContract> {
  const result = await _createSend(
    context,
    resourceUri,
    recommendationId,
    name,
    suppressionContract,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceUri: string,
  recommendationId: string,
  name: string,
  options: SuppressionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Advisor/recommendations/{recommendationId}/suppressions/{name}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      recommendationId: recommendationId,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SuppressionContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 404) {
      if (result.body) {
        error.details = armErrorResponseDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = armErrorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return suppressionContractDeserializer(result.body);
}

/** Obtains the details of a suppression. */
export async function get(
  context: Client,
  resourceUri: string,
  recommendationId: string,
  name: string,
  options: SuppressionsGetOptionalParams = { requestOptions: {} },
): Promise<SuppressionContract> {
  const result = await _getSend(context, resourceUri, recommendationId, name, options);
  return _getDeserialize(result);
}
