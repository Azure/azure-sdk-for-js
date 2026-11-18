// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext as Client } from "../index.js";
import type { EstimateContent, EstimateResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  estimateContentSerializer,
  estimateResultDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PriceEstimationGetEstimatePricesOperationResultOptionalParams,
  PriceEstimationEstimatePricesOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getEstimatePricesOperationResultSend(
  context: Client,
  operationId: string,
  options: PriceEstimationGetEstimatePricesOperationResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CostManagement/estimatePricesOperationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getEstimatePricesOperationResultDeserialize(
  result: PathUncheckedResponse,
): Promise<EstimateResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return estimateResultDeserializer(result.body);
}

/**
 * Gets the status or result of an estimatePrices operation. This URL is returned
 * in the Location header of the estimatePrices response. Returns HTTP 202 with
 * Location and Retry-After headers while pricing runs, then the estimate (HTTP
 * 200) or the operation's ARM error. Unknown or expired operations, and
 * operations started by another caller or subscription, return HTTP 404
 * OperationNotFound.
 */
export function getEstimatePricesOperationResult(
  context: Client,
  operationId: string,
  options: PriceEstimationGetEstimatePricesOperationResultOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EstimateResult>, EstimateResult> {
  return getLongRunningPoller(
    context,
    _getEstimatePricesOperationResultDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getEstimatePricesOperationResultSend(context, operationId, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  ) as PollerLike<OperationState<EstimateResult>, EstimateResult>;
}

export function _estimatePricesSend(
  context: Client,
  body: EstimateContent,
  options: PriceEstimationEstimatePricesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CostManagement/estimatePrices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: estimateContentSerializer(body),
  });
}

export async function _estimatePricesDeserialize(
  result: PathUncheckedResponse,
): Promise<EstimateResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return estimateResultDeserializer(result.body);
}

/**
 * Estimates recurring monthly prices and separate upfront charges using prices
 * applicable to the authorized subscription and its billing currency. Nothing
 * is deployed or purchased. Upfront amounts are never amortized into monthly
 * amounts. Commitment periods and payment options are validated against the
 * selected profile, independently of supplied running hours.
 *
 * This is a long-running operation. The request is validated synchronously:
 * invalid input fails the POST itself with HTTP 400 and is never priced. A valid
 * request returns HTTP 202 with Location and Retry-After headers; polling the
 * Location returns 202 while pricing runs, then the estimate (HTTP 200) or an
 * ARM error. Only the caller that started the operation can read its result,
 * which is retained for 30 minutes.
 * An accepted request can still fail during pricing if a calculated amount or
 * aggregate exceeds the supported range. This fails the entire estimate;
 * polling returns HTTP 400 with error code EstimateAmountOutOfRange, not a
 * clamped or incomplete success result.
 *
 * Supported resource types and typed input metadata are discovered separately
 * through anonymous pricing-metadata GETs outside ARM. Discovery metadata is
 * subscription-independent and contains no customer prices or entitlements.
 * It must correspond to this estimation API version. Cached metadata is
 * guidance, never authorization or a substitute for server validation.
 * Resource types are matched case-insensitively; resource API versions and
 * input names must match supported values.
 *
 * Each entry supplies two named object inputs: resource, an allowlisted subset of
 * the native ARM resource with exact ARM property names, and usage, consumption
 * and purchase assumptions such as hours, GB, operations and purchaseOption.
 * Templates, expressions, references, scripts, customer resource names, deployed
 * resource IDs, tags, credentials and secrets are prohibited. Omitted inputs with
 * an applicable advertised default are completed by the server; explicit values,
 * including zero and false, always win.
 *
 * Each billable configuration must be represented once. Identical entries are
 * independently charged, not deduplicated.
 *
 * Every invalid entry is reported in one error response (MultipleInputErrors
 * with details when there is more than one). Error targets identify a request
 * position without echoing its value; an additionalInfo entry of type InputField
 * names the affected input and, where applicable, its allowed values or a choice
 * lookup path. Each request is limited to 512 KiB, 100 resource entries, 10000
 * typed values and eight nested object/array levels.
 * After defaults and canonicalization, completed inputs are limited to 20000
 * typed values across all entries, eight object/array levels and 10000 planned
 * billing charges. Fractional inputs have magnitude at most 1000000000 and at
 * most six decimal places; integer inputs use the exact safe-integer range.
 *
 * The final HTTP 200 response body is limited to 4194304 serialized UTF-8 bytes
 * (4 MiB), 20000 applied typed values, eight object/array levels, 10000
 * components, 1000 diagnostics and 20000 combined defaulted/assumed field
 * pointers. Counts include server-added defaults and assumptions and span the
 * whole estimate. Limits known during preparation fail before acceptance;
 * limits discovered during pricing or final serialization fail polling with
 * HTTP 400 EstimateResultTooLarge. No results or pricing issues are truncated.
 *
 * Component amounts and entry/request totals are each limited to 1000000000
 * in the billing currency. Checked decimal arithmetic overflow or exceeding
 * the amount ceiling fails the entire estimate with HTTP 400
 * EstimateAmountOutOfRange; pricing-time failures are terminal polling errors,
 * not successful Partial/Unavailable estimates. Monthly and upfront amounts
 * and known subtotals are checked independently.
 *
 * A completed estimate can contain incomplete prices when individual components
 * cannot be priced; every missing or ambiguous price is reported as an issue,
 * not a zero. Result order matches input order. Each result reports the effective
 * configuration, the configuration defaults applied and any usage quantities the
 * server assumed because they were omitted.
 */
export function estimatePrices(
  context: Client,
  body: EstimateContent,
  options: PriceEstimationEstimatePricesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EstimateResult>, EstimateResult> {
  return getLongRunningPoller(context, _estimatePricesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _estimatePricesSend(context, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<EstimateResult>, EstimateResult>;
}
