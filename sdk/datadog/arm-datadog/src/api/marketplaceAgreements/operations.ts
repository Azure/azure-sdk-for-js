// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDatadogContext as Client } from "../index.js";
import type {
  _DatadogAgreementResourceListResponse,
  DatadogAgreementResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _datadogAgreementResourceListResponseDeserializer,
  datadogAgreementResourceSerializer,
  datadogAgreementResourceDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MarketplaceAgreementsCreateOrUpdateOptionalParams,
  MarketplaceAgreementsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createOrUpdateSend(
  context: Client,
  options: MarketplaceAgreementsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/agreements/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.body ? options?.body : datadogAgreementResourceSerializer(options?.body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatadogAgreementResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return datadogAgreementResourceDeserializer(result.body);
}

/** Create Datadog marketplace agreement in the subscription. */
export async function createOrUpdate(
  context: Client,
  options: MarketplaceAgreementsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DatadogAgreementResource> {
  const result = await _createOrUpdateSend(context, options);
  return _createOrUpdateDeserialize(result);
}

export function _listSend(
  context: Client,
  options: MarketplaceAgreementsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/agreements{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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
): Promise<_DatadogAgreementResourceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _datadogAgreementResourceListResponseDeserializer(result.body);
}

/** List Datadog marketplace agreements in the subscription. */
export function list(
  context: Client,
  options: MarketplaceAgreementsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatadogAgreementResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-26-preview",
    },
  );
}
