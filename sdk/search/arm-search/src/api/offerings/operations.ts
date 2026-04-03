// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext as Client } from "../index.js";
import type { OfferingsListResult } from "../../models/models.js";
import { cloudErrorDeserializer, offeringsListResultDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OfferingsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: OfferingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Search/offerings{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<OfferingsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return offeringsListResultDeserializer(result.body);
}

/** Lists all of the features and SKUs offered by the Azure AI Search service in each region. Note: This API returns a non-ARM resource collection and is not RPC-compliant. It will be replaced with an action-style API in the next preview as a breaking change. Customers should avoid taking new dependencies on the current shape. */
export async function list(
  context: Client,
  options: OfferingsListOptionalParams = { requestOptions: {} },
): Promise<OfferingsListResult> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}
