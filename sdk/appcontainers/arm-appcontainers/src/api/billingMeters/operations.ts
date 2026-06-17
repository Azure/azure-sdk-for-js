// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  BillingMeterCollection,
  billingMeterCollectionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { BillingMetersGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  options: BillingMetersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.App/locations/{location}/billingMeters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingMeterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return billingMeterCollectionDeserializer(result.body);
}

/** Get all billingMeters for a location. */
export async function get(
  context: Client,
  location: string,
  options: BillingMetersGetOptionalParams = { requestOptions: {} },
): Promise<BillingMeterCollection> {
  const result = await _getSend(context, location, options);
  return _getDeserialize(result);
}
