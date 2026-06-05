// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _BenefitRecommendationsListResult,
  _benefitRecommendationsListResultDeserializer,
  BenefitRecommendationModel,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { BenefitRecommendationsListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  billingScope: string,
  options: BenefitRecommendationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+billingScope}/providers/Microsoft.CostManagement/benefitRecommendations{?api%2Dversion,%24filter,%24orderby,%24expand}",
    {
      billingScope: billingScope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      "%24orderby": options?.orderby,
      "%24expand": options?.expand,
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
): Promise<_BenefitRecommendationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _benefitRecommendationsListResultDeserializer(result.body);
}

/** List of recommendations for purchasing savings plan. */
export function list(
  context: Client,
  billingScope: string,
  options: BenefitRecommendationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BenefitRecommendationModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, billingScope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}
