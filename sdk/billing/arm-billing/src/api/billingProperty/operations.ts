// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type { BillingProperty } from "../../models/models.js";
import {
  errorResponseDeserializer,
  billingPropertySerializer,
  billingPropertyDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BillingPropertyUpdateOptionalParams,
  BillingPropertyGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  parameters: BillingProperty,
  options: BillingPropertyUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Billing/billingProperty/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: billingPropertySerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<BillingProperty> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingPropertyDeserializer(result.body);
}

/** Updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program. */
export async function update(
  context: Client,
  parameters: BillingProperty,
  options: BillingPropertyUpdateOptionalParams = { requestOptions: {} },
): Promise<BillingProperty> {
  const result = await _updateSend(context, parameters, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  options: BillingPropertyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Billing/billingProperty/default{?api%2Dversion,includeBillingCountry,includeTransitionStatus}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      includeBillingCountry: options?.includeBillingCountry,
      includeTransitionStatus: options?.includeTransitionStatus,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BillingProperty> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingPropertyDeserializer(result.body);
}

/** Gets the billing properties for a subscription */
export async function get(
  context: Client,
  options: BillingPropertyGetOptionalParams = { requestOptions: {} },
): Promise<BillingProperty> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
