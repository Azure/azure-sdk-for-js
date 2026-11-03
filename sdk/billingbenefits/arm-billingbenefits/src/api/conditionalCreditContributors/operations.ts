// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConditionalCreditContributor,
  conditionalCreditContributorDeserializer,
  _ConditionalCreditContributorList,
  _conditionalCreditContributorListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConditionalCreditContributorsListFromApplicableConditionalCreditOptionalParams,
  ConditionalCreditContributorsListFromPrimaryOptionalParams,
  ConditionalCreditContributorsGetFromPrimaryOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listFromApplicableConditionalCreditSend(
  context: Client,
  billingAccountId: string,
  systemId: string,
  options: ConditionalCreditContributorsListFromApplicableConditionalCreditOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.BillingBenefits/applicableConditionalCredits/{systemId}/providers/microsoft.BillingBenefits/applicableContributors{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      systemId: systemId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listFromApplicableConditionalCreditDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConditionalCreditContributorList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _conditionalCreditContributorListDeserializer(result.body);
}

/** List contributors under applicable conditional credits for a given billing account. */
export function listFromApplicableConditionalCredit(
  context: Client,
  billingAccountId: string,
  systemId: string,
  options: ConditionalCreditContributorsListFromApplicableConditionalCreditOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ConditionalCreditContributor> {
  return buildPagedAsyncIterator(
    context,
    () => _listFromApplicableConditionalCreditSend(context, billingAccountId, systemId, options),
    _listFromApplicableConditionalCreditDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _listFromPrimarySend(
  context: Client,
  resourceGroupName: string,
  conditionalCreditName: string,
  options: ConditionalCreditContributorsListFromPrimaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/conditionalCredits/{conditionalCreditName}/contributors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      conditionalCreditName: conditionalCreditName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listFromPrimaryDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConditionalCreditContributorList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _conditionalCreditContributorListDeserializer(result.body);
}

/** List contributors under a primary conditional credit for primary service admin */
export function listFromPrimary(
  context: Client,
  resourceGroupName: string,
  conditionalCreditName: string,
  options: ConditionalCreditContributorsListFromPrimaryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConditionalCreditContributor> {
  return buildPagedAsyncIterator(
    context,
    () => _listFromPrimarySend(context, resourceGroupName, conditionalCreditName, options),
    _listFromPrimaryDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _getFromPrimarySend(
  context: Client,
  resourceGroupName: string,
  conditionalCreditName: string,
  contributorName: string,
  options: ConditionalCreditContributorsGetFromPrimaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/conditionalCredits/{conditionalCreditName}/contributors/{contributorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      conditionalCreditName: conditionalCreditName,
      contributorName: contributorName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _getFromPrimaryDeserialize(
  result: PathUncheckedResponse,
): Promise<ConditionalCreditContributor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return conditionalCreditContributorDeserializer(result.body);
}

/** Get a conditional credit contributor for primary service admin */
export async function getFromPrimary(
  context: Client,
  resourceGroupName: string,
  conditionalCreditName: string,
  contributorName: string,
  options: ConditionalCreditContributorsGetFromPrimaryOptionalParams = { requestOptions: {} },
): Promise<ConditionalCreditContributor> {
  const result = await _getFromPrimarySend(
    context,
    resourceGroupName,
    conditionalCreditName,
    contributorName,
    options,
  );
  return _getFromPrimaryDeserialize(result);
}
