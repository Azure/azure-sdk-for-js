// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SecurityOperator,
  _SecurityOperatorList,
} from "../../models/securityOperatorsAPI/models.js";
import {
  securityOperatorDeserializer,
  _securityOperatorListDeserializer,
} from "../../models/securityOperatorsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecurityOperatorsListOptionalParams,
  SecurityOperatorsDeleteOptionalParams,
  SecurityOperatorsCreateOrUpdateOptionalParams,
  SecurityOperatorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  pricingName: string,
  options: SecurityOperatorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/pricings/{pricingName}/securityOperators{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      pricingName: pricingName,
      "api%2Dversion": "2023-01-01-preview",
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
): Promise<_SecurityOperatorList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _securityOperatorListDeserializer(result.body);
}

/** Lists Microsoft Defender for Cloud securityOperators in the subscription. */
export function list(
  context: Client,
  pricingName: string,
  options: SecurityOperatorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityOperator> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, pricingName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", apiVersion: "2023-01-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  pricingName: string,
  securityOperatorName: string,
  options: SecurityOperatorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/pricings/{pricingName}/securityOperators/{securityOperatorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      pricingName: pricingName,
      securityOperatorName: securityOperatorName,
      "api%2Dversion": "2023-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete Microsoft Defender for Cloud securityOperator in the subscription. */
export async function $delete(
  context: Client,
  pricingName: string,
  securityOperatorName: string,
  options: SecurityOperatorsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, pricingName, securityOperatorName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  pricingName: string,
  securityOperatorName: string,
  options: SecurityOperatorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/pricings/{pricingName}/securityOperators/{securityOperatorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      pricingName: pricingName,
      securityOperatorName: securityOperatorName,
      "api%2Dversion": "2023-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityOperator> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityOperatorDeserializer(result.body);
}

/** Creates Microsoft Defender for Cloud security operator on the given scope. */
export async function createOrUpdate(
  context: Client,
  pricingName: string,
  securityOperatorName: string,
  options: SecurityOperatorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SecurityOperator> {
  const result = await _createOrUpdateSend(context, pricingName, securityOperatorName, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  pricingName: string,
  securityOperatorName: string,
  options: SecurityOperatorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/pricings/{pricingName}/securityOperators/{securityOperatorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      pricingName: pricingName,
      securityOperatorName: securityOperatorName,
      "api%2Dversion": "2023-01-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SecurityOperator> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityOperatorDeserializer(result.body);
}

/** Get a specific security operator for the requested scope. */
export async function get(
  context: Client,
  pricingName: string,
  securityOperatorName: string,
  options: SecurityOperatorsGetOptionalParams = { requestOptions: {} },
): Promise<SecurityOperator> {
  const result = await _getSend(context, pricingName, securityOperatorName, options);
  return _getDeserialize(result);
}
