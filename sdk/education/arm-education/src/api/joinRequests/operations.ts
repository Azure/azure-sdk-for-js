// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext as Client } from "../index.js";
import {
  errorResponseBodyDeserializer,
  JoinRequestDetails,
  joinRequestDetailsDeserializer,
  _JoinRequestList,
  _joinRequestListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  JoinRequestsDenyOptionalParams,
  JoinRequestsApproveOptionalParams,
  JoinRequestsListOptionalParams,
  JoinRequestsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _denySend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  joinRequestName: string,
  options: JoinRequestsDenyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default/joinRequests/{joinRequestName}/deny{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      joinRequestName: joinRequestName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _denyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deny student joining the redeemable lab */
export async function deny(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  joinRequestName: string,
  options: JoinRequestsDenyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _denySend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    joinRequestName,
    options,
  );
  return _denyDeserialize(result);
}

export function _approveSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  joinRequestName: string,
  options: JoinRequestsApproveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default/joinRequests/{joinRequestName}/approve{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      joinRequestName: joinRequestName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _approveDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return;
}

/** Approve student joining the redeemable lab */
export async function approve(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  joinRequestName: string,
  options: JoinRequestsApproveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _approveSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    joinRequestName,
    options,
  );
  return _approveDeserialize(result);
}

export function _listSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: JoinRequestsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default/joinRequests{?api%2Dversion,includeDenied}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
      includeDenied: options?.includeDenied,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_JoinRequestList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return _joinRequestListDeserializer(result.body);
}

/** get student join requests */
export function list(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: JoinRequestsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JoinRequestDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, billingAccountName, billingProfileName, invoiceSectionName, options),
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
  invoiceSectionName: string,
  joinRequestName: string,
  options: JoinRequestsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default/joinRequests/{joinRequestName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      joinRequestName: joinRequestName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JoinRequestDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return joinRequestDetailsDeserializer(result.body);
}

/** get student join requests */
export async function get(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  joinRequestName: string,
  options: JoinRequestsGetOptionalParams = { requestOptions: {} },
): Promise<JoinRequestDetails> {
  const result = await _getSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    joinRequestName,
    options,
  );
  return _getDeserialize(result);
}
