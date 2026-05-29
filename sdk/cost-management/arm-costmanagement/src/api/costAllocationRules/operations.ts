// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CostAllocationRuleDefinition,
  costAllocationRuleDefinitionSerializer,
  costAllocationRuleDefinitionDeserializer,
  _CostAllocationRuleList,
  _costAllocationRuleListDeserializer,
  CostAllocationRuleCheckNameAvailabilityRequest,
  costAllocationRuleCheckNameAvailabilityRequestSerializer,
  CostAllocationRuleCheckNameAvailabilityResponse,
  costAllocationRuleCheckNameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CostAllocationRulesCheckNameAvailabilityOptionalParams,
  CostAllocationRulesListOptionalParams,
  CostAllocationRulesDeleteOptionalParams,
  CostAllocationRulesCreateOrUpdateOptionalParams,
  CostAllocationRulesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _checkNameAvailabilitySend(
  context: Client,
  billingAccountId: string,
  costAllocationRuleCheckNameAvailabilityRequest: CostAllocationRuleCheckNameAvailabilityRequest,
  options: CostAllocationRulesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules/checkNameAvailability{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: costAllocationRuleCheckNameAvailabilityRequestSerializer(
      costAllocationRuleCheckNameAvailabilityRequest,
    ),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CostAllocationRuleCheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return costAllocationRuleCheckNameAvailabilityResponseDeserializer(result.body);
}

/** Checks availability and correctness of a name for a cost allocation rule */
export async function checkNameAvailability(
  context: Client,
  billingAccountId: string,
  costAllocationRuleCheckNameAvailabilityRequest: CostAllocationRuleCheckNameAvailabilityRequest,
  options: CostAllocationRulesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CostAllocationRuleCheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(
    context,
    billingAccountId,
    costAllocationRuleCheckNameAvailabilityRequest,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listSend(
  context: Client,
  billingAccountId: string,
  options: CostAllocationRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
): Promise<_CostAllocationRuleList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _costAllocationRuleListDeserializer(result.body);
}

/** Get the list of all cost allocation rules for a billing account or enterprise enrollment. */
export function list(
  context: Client,
  billingAccountId: string,
  options: CostAllocationRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CostAllocationRuleDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, billingAccountId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  billingAccountId: string,
  ruleName: string,
  options: CostAllocationRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules/{ruleName}{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete cost allocation rule for billing account or enterprise enrollment. */
export async function $delete(
  context: Client,
  billingAccountId: string,
  ruleName: string,
  options: CostAllocationRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, billingAccountId, ruleName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  billingAccountId: string,
  ruleName: string,
  costAllocationRule: CostAllocationRuleDefinition,
  options: CostAllocationRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules/{ruleName}{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: costAllocationRuleDefinitionSerializer(costAllocationRule),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CostAllocationRuleDefinition> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return costAllocationRuleDefinitionDeserializer(result.body);
}

/** Create/Update a rule to allocate cost between different resources within a billing account or enterprise enrollment. */
export async function createOrUpdate(
  context: Client,
  billingAccountId: string,
  ruleName: string,
  costAllocationRule: CostAllocationRuleDefinition,
  options: CostAllocationRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<CostAllocationRuleDefinition> {
  const result = await _createOrUpdateSend(
    context,
    billingAccountId,
    ruleName,
    costAllocationRule,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  billingAccountId: string,
  ruleName: string,
  options: CostAllocationRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules/{ruleName}{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<CostAllocationRuleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return costAllocationRuleDefinitionDeserializer(result.body);
}

/** Get a cost allocation rule by rule name and billing account or enterprise enrollment. */
export async function get(
  context: Client,
  billingAccountId: string,
  ruleName: string,
  options: CostAllocationRulesGetOptionalParams = { requestOptions: {} },
): Promise<CostAllocationRuleDefinition> {
  const result = await _getSend(context, billingAccountId, ruleName, options);
  return _getDeserialize(result);
}
