// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type { VerifiedPartner, _VerifiedPartnersListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  verifiedPartnerDeserializer,
  _verifiedPartnersListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VerifiedPartnersListOptionalParams,
  VerifiedPartnersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: VerifiedPartnersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.EventGrid/verifiedPartners{?api%2Dversion,%24filter,%24top}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
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
): Promise<_VerifiedPartnersListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _verifiedPartnersListResultDeserializer(result.body);
}

/** Get a list of all verified partners. */
export function list(
  context: Client,
  options: VerifiedPartnersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VerifiedPartner> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _getSend(
  context: Client,
  verifiedPartnerName: string,
  options: VerifiedPartnersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.EventGrid/verifiedPartners/{verifiedPartnerName}{?api%2Dversion}",
    {
      verifiedPartnerName: verifiedPartnerName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VerifiedPartner> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return verifiedPartnerDeserializer(result.body);
}

/** Get properties of a verified partner. */
export async function get(
  context: Client,
  verifiedPartnerName: string,
  options: VerifiedPartnersGetOptionalParams = { requestOptions: {} },
): Promise<VerifiedPartner> {
  const result = await _getSend(context, verifiedPartnerName, options);
  return _getDeserialize(result);
}
