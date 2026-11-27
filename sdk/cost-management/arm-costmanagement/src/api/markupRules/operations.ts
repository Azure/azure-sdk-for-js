// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext as Client } from "../index.js";
import type { MarkupRule, _MarkupRulePagedResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  markupRuleSerializer,
  markupRuleDeserializer,
  _markupRulePagedResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MarkupRulesListOptionalParams,
  MarkupRulesDeleteOptionalParams,
  MarkupRulesCreateOrUpdateOptionalParams,
  MarkupRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  options: MarkupRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.CostManagement/markupRules{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
): Promise<_MarkupRulePagedResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _markupRulePagedResponseDeserializer(result.body);
}
/** List all markup rules for a billing account and billing profile. */
export function list(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  options: MarkupRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MarkupRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, billingAccountId, billingProfileId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  ruleName: string,
  options: MarkupRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.CostManagement/markupRules/{ruleName}{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Delete a markup rule for a billing account and billing profile. */
export async function $delete(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  ruleName: string,
  options: MarkupRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, billingAccountId, billingProfileId, ruleName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  ruleName: string,
  resource: MarkupRule,
  options: MarkupRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.CostManagement/markupRules/{ruleName}{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: markupRuleSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MarkupRule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return markupRuleDeserializer(result.body);
}
/** Create or update a markup rule for a billing account and billing profile. */
export async function createOrUpdate(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  ruleName: string,
  resource: MarkupRule,
  options: MarkupRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MarkupRule> {
  const result = await _createOrUpdateSend(
    context,
    billingAccountId,
    billingProfileId,
    ruleName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  ruleName: string,
  options: MarkupRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.CostManagement/markupRules/{ruleName}{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MarkupRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return markupRuleDeserializer(result.body);
}
/** Get a markup rule by name for a billing account and billing profile. */
export async function get(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  ruleName: string,
  options: MarkupRulesGetOptionalParams = { requestOptions: {} },
): Promise<MarkupRule> {
  const result = await _getSend(context, billingAccountId, billingProfileId, ruleName, options);
  return _getDeserialize(result);
}
