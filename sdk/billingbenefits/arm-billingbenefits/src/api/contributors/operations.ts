// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Contributor,
  contributorDeserializer,
  _ContributorList,
  _contributorListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContributorsListFromApplicableMaccOptionalParams,
  ContributorsListFromPrimaryOptionalParams,
  ContributorsGetFromPrimaryOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listFromApplicableMaccSend(
  context: Client,
  billingAccountId: string,
  systemId: string,
  options: ContributorsListFromApplicableMaccOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.BillingBenefits/applicableMaccs/{systemId}/providers/microsoft.BillingBenefits/applicableContributors{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      systemId: systemId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listFromApplicableMaccDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContributorList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _contributorListDeserializer(result.body);
}

/** List contributors under applicable MACCs for a given billing account. */
export function listFromApplicableMacc(
  context: Client,
  billingAccountId: string,
  systemId: string,
  options: ContributorsListFromApplicableMaccOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Contributor> {
  return buildPagedAsyncIterator(
    context,
    () => _listFromApplicableMaccSend(context, billingAccountId, systemId, options),
    _listFromApplicableMaccDeserialize,
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
  maccName: string,
  options: ContributorsListFromPrimaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}/contributors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maccName: maccName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listFromPrimaryDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContributorList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _contributorListDeserializer(result.body);
}

/** List contributors under a MACC for primary service admin */
export function listFromPrimary(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  options: ContributorsListFromPrimaryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Contributor> {
  return buildPagedAsyncIterator(
    context,
    () => _listFromPrimarySend(context, resourceGroupName, maccName, options),
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
  maccName: string,
  contributorName: string,
  options: ContributorsGetFromPrimaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}/contributors/{contributorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maccName: maccName,
      contributorName: contributorName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _getFromPrimaryDeserialize(
  result: PathUncheckedResponse,
): Promise<Contributor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return contributorDeserializer(result.body);
}

/** Get a contributor for primary service admin */
export async function getFromPrimary(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  contributorName: string,
  options: ContributorsGetFromPrimaryOptionalParams = { requestOptions: {} },
): Promise<Contributor> {
  const result = await _getFromPrimarySend(
    context,
    resourceGroupName,
    maccName,
    contributorName,
    options,
  );
  return _getFromPrimaryDeserialize(result);
}
