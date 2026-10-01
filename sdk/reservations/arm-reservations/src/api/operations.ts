// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext as Client } from "./index.js";
import type {
  _CatalogsResult,
  Catalog,
  AppliedReservations,
} from "../models/reservations/models.js";
import {
  _catalogsResultDeserializer,
  errorDeserializer,
  appliedReservationsDeserializer,
} from "../models/reservations/models.js";
import type { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  GetAppliedReservationListOptionalParams,
  GetCatalogOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getAppliedReservationListSend(
  context: Client,
  subscriptionId: string,
  options: GetAppliedReservationListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/appliedReservations{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": "2022-11-01",
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

export async function _getAppliedReservationListDeserialize(
  result: PathUncheckedResponse,
): Promise<AppliedReservations> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return appliedReservationsDeserializer(result.body);
}

/** Get applicable `Reservation`s that are applied to this subscription or a resource group under this subscription. */
export async function getAppliedReservationList(
  context: Client,
  subscriptionId: string,
  options: GetAppliedReservationListOptionalParams = { requestOptions: {} },
): Promise<AppliedReservations> {
  const result = await _getAppliedReservationListSend(context, subscriptionId, options);
  return _getAppliedReservationListDeserialize(result);
}

export function _getCatalogSend(
  context: Client,
  subscriptionId: string,
  options: GetCatalogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/catalogs{?api%2Dversion,reservedResourceType,location,publisherId,offerId,planId,%24filter,%24skip,%24take}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": "2022-11-01",
      reservedResourceType: options?.reservedResourceType,
      location: options?.location,
      publisherId: options?.publisherId,
      offerId: options?.offerId,
      planId: options?.planId,
      "%24filter": options?.filter,
      "%24skip": options?.skip,
      "%24take": options?.take,
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

export async function _getCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<_CatalogsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return _catalogsResultDeserializer(result.body);
}

/** Get the regions and skus that are available for RI purchase for the specified Azure subscription. */
export function getCatalog(
  context: Client,
  subscriptionId: string,
  options: GetCatalogOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Catalog> {
  return buildPagedAsyncIterator(
    context,
    () => _getCatalogSend(context, subscriptionId, options),
    _getCatalogDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-11-01" },
  );
}
