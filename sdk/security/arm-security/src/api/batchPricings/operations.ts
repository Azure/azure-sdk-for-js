// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type { _PricingBatchList, PricingBatch } from "../../models/batchPricingsAPI/models.js";
import {
  _pricingBatchListDeserializer,
  pricingBatchSerializer,
  pricingBatchDeserializer,
} from "../../models/batchPricingsAPI/models.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BatchPricingsCreateOrUpdateOptionalParams,
  BatchPricingsGetOptionalParams,
  BatchPricingsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createOrUpdateSend(
  context: Client,
  scopeId: string,
  pricingBatchName: string,
  pricingBatch: PricingBatch,
  options: BatchPricingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scopeId}/providers/Microsoft.Security/batchPricings/{pricingBatchName}{?api%2Dversion}",
    {
      scopeId: scopeId,
      pricingBatchName: pricingBatchName,
      "api%2Dversion": "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: pricingBatchSerializer(pricingBatch),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PricingBatch> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return pricingBatchDeserializer(result.body);
}

/** Updates multiple pricing plan configurations in a single operation. */
export async function createOrUpdate(
  context: Client,
  scopeId: string,
  pricingBatchName: string,
  pricingBatch: PricingBatch,
  options: BatchPricingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PricingBatch> {
  const result = await _createOrUpdateSend(
    context,
    scopeId,
    pricingBatchName,
    pricingBatch,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scopeId: string,
  pricingBatchName: string,
  options: BatchPricingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scopeId}/providers/Microsoft.Security/batchPricings/{pricingBatchName}{?api%2Dversion}",
    {
      scopeId: scopeId,
      pricingBatchName: pricingBatchName,
      "api%2Dversion": "2026-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PricingBatch> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return pricingBatchDeserializer(result.body);
}

/** Gets the current pricing batch configuration for the specified scope. */
export async function get(
  context: Client,
  scopeId: string,
  pricingBatchName: string,
  options: BatchPricingsGetOptionalParams = { requestOptions: {} },
): Promise<PricingBatch> {
  const result = await _getSend(context, scopeId, pricingBatchName, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  scopeId: string,
  options: BatchPricingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scopeId}/providers/Microsoft.Security/batchPricings{?api%2Dversion}",
    {
      scopeId: scopeId,
      "api%2Dversion": "2026-07-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PricingBatchList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _pricingBatchListDeserializer(result.body);
}

/** Lists the pricing batch resources for the specified scope. */
export function list(
  context: Client,
  scopeId: string,
  options: BatchPricingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PricingBatch> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scopeId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-07-01" },
  );
}
