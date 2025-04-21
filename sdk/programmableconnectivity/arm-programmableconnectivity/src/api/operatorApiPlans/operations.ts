// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperatorApiPlan,
  operatorApiPlanDeserializer,
  _OperatorApiPlanListResult,
  _operatorApiPlanListResultDeserializer,
} from "../../models/models.js";
import {
  OperatorApiPlansListBySubscriptionOptionalParams,
  OperatorApiPlansGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: OperatorApiPlansListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProgrammableConnectivity/operatorApiPlans{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_OperatorApiPlanListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _operatorApiPlanListResultDeserializer(result.body);
}

/** List OperatorApiPlan resources by subscription ID. */
export function listBySubscription(
  context: Client,
  options: OperatorApiPlansListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OperatorApiPlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  operatorApiPlanName: string,
  options: OperatorApiPlansGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProgrammableConnectivity/operatorApiPlans/{operatorApiPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      operatorApiPlanName: operatorApiPlanName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<OperatorApiPlan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operatorApiPlanDeserializer(result.body);
}

/** Get an OperatorApiPlan resource by name. */
export async function get(
  context: Client,
  operatorApiPlanName: string,
  options: OperatorApiPlansGetOptionalParams = { requestOptions: {} },
): Promise<OperatorApiPlan> {
  const result = await _getSend(context, operatorApiPlanName, options);
  return _getDeserialize(result);
}
