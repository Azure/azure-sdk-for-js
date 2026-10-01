// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext as Client } from "../index.js";
import type { OfferingsResult } from "../../models/models.js";
import { cloudErrorDeserializer, offeringsResultDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OfferingsFetchOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _fetchSend(
  context: Client,
  options: OfferingsFetchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Search/fetchOfferings{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _fetchDeserialize(result: PathUncheckedResponse): Promise<OfferingsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return offeringsResultDeserializer(result.body);
}
/** Fetches the features and SKUs offered by the Azure AI Search service in each region, along with the recommended default region for creating new services. */
export async function fetch(
  context: Client,
  options: OfferingsFetchOptionalParams = { requestOptions: {} },
): Promise<OfferingsResult> {
  const result = await _fetchSend(context, options);
  return _fetchDeserialize(result);
}
