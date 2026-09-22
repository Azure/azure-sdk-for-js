// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext as Client } from "../index.js";
import {
  errorResponseBodyDeserializer,
  GrantDetails,
  grantDetailsDeserializer,
  _GrantListResponse,
  _grantListResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GrantsListAllOptionalParams,
  GrantsListOptionalParams,
  GrantsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listAllSend(
  context: Client,
  options: GrantsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Education/grants{?api%2Dversion,includeAllocatedBudget}",
    {
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
      includeAllocatedBudget: options?.includeAllocatedBudget,
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_GrantListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return _grantListResponseDeserializer(result.body);
}

/** Get a list of grants that Microsoft has provided. */
export function listAll(
  context: Client,
  options: GrantsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GrantDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-12-01-preview",
    },
  );
}

export function _listSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: GrantsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/providers/Microsoft.Education/grants{?api%2Dversion,includeAllocatedBudget}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
      includeAllocatedBudget: options?.includeAllocatedBudget,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_GrantListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return _grantListResponseDeserializer(result.body);
}

/** Get details for a specific grant linked to the provided billing account and billing profile. */
export function list(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: GrantsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GrantDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, billingAccountName, billingProfileName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-12-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: GrantsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/providers/Microsoft.Education/grants/default{?api%2Dversion,includeAllocatedBudget}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
      includeAllocatedBudget: options?.includeAllocatedBudget,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GrantDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return grantDetailsDeserializer(result.body);
}

/** Get details for a specific grant linked to the provided billing account and billing profile. */
export async function get(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: GrantsGetOptionalParams = { requestOptions: {} },
): Promise<GrantDetails> {
  const result = await _getSend(context, billingAccountName, billingProfileName, options);
  return _getDeserialize(result);
}
