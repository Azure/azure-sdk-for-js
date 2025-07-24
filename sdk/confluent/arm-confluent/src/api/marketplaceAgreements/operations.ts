// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext as Client } from "../index.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  _ConfluentAgreementResourceListResponse,
  _confluentAgreementResourceListResponseDeserializer,
  ConfluentAgreementResource,
  confluentAgreementResourceSerializer,
  confluentAgreementResourceDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MarketplaceAgreementsCreateOptionalParams,
  MarketplaceAgreementsListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createSend(
  context: Client,
  options: MarketplaceAgreementsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Confluent/agreements/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: !options["body"]
      ? options["body"]
      : confluentAgreementResourceSerializer(options["body"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfluentAgreementResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return confluentAgreementResourceDeserializer(result.body);
}

/** Create Confluent Marketplace agreement in the subscription. */
export async function create(
  context: Client,
  options: MarketplaceAgreementsCreateOptionalParams = { requestOptions: {} },
): Promise<ConfluentAgreementResource> {
  const result = await _createSend(context, options);
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  options: MarketplaceAgreementsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Confluent/agreements{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConfluentAgreementResourceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _confluentAgreementResourceListResponseDeserializer(result.body);
}

/** List Confluent marketplace agreements in the subscription. */
export function list(
  context: Client,
  options: MarketplaceAgreementsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfluentAgreementResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
