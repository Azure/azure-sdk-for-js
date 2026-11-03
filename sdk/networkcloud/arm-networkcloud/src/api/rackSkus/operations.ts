// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkCloudContext as Client } from "../index.js";
import type { RackSku, _RackSkuList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  rackSkuDeserializer,
  _rackSkuListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RackSkusListBySubscriptionOptionalParams,
  RackSkusGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: RackSkusListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/rackSkus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_RackSkuList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _rackSkuListDeserializer(result.body);
}

/** Get a list of rack SKUs in the provided subscription. */
export function listBySubscription(
  context: Client,
  options: RackSkusListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RackSku> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _getSend(
  context: Client,
  rackSkuName: string,
  options: RackSkusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/rackSkus/{rackSkuName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      rackSkuName: rackSkuName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RackSku> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return rackSkuDeserializer(result.body);
}

/** Get the properties of the provided rack SKU. */
export async function get(
  context: Client,
  rackSkuName: string,
  options: RackSkusGetOptionalParams = { requestOptions: {} },
): Promise<RackSku> {
  const result = await _getSend(context, rackSkuName, options);
  return _getDeserialize(result);
}
