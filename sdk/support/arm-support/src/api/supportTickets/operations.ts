// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CheckNameAvailabilityInput,
  checkNameAvailabilityInputSerializer,
  CheckNameAvailabilityOutput,
  checkNameAvailabilityOutputDeserializer,
  SupportTicketDetails,
  supportTicketDetailsSerializer,
  supportTicketDetailsDeserializer,
  UpdateSupportTicket,
  updateSupportTicketSerializer,
  _SupportTicketsListResult,
  _supportTicketsListResultDeserializer,
  LookUpResourceIdRequest,
  lookUpResourceIdRequestSerializer,
  LookUpResourceIdResponse,
  lookUpResourceIdResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SupportTicketsCheckNameAvailabilityOptionalParams,
  SupportTicketsLookUpResourceIdOptionalParams,
  SupportTicketsListOptionalParams,
  SupportTicketsUpdateOptionalParams,
  SupportTicketsCreateOptionalParams,
  SupportTicketsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  checkNameAvailabilityInput: CheckNameAvailabilityInput,
  options: SupportTicketsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: checkNameAvailabilityInputSerializer(checkNameAvailabilityInput),
    });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityOutputDeserializer(result.body);
}

/** Check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription. */
export async function checkNameAvailability(
  context: Client,
  checkNameAvailabilityInput: CheckNameAvailabilityInput,
  options: SupportTicketsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityOutput> {
  const result = await _checkNameAvailabilitySend(context, checkNameAvailabilityInput, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _lookUpResourceIdSend(
  context: Client,
  lookUpResourceIdRequest: LookUpResourceIdRequest,
  options: SupportTicketsLookUpResourceIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/lookUpResourceId{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: lookUpResourceIdRequestSerializer(lookUpResourceIdRequest),
    });
}

export async function _lookUpResourceIdDeserialize(
  result: PathUncheckedResponse,
): Promise<LookUpResourceIdResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return lookUpResourceIdResponseDeserializer(result.body);
}

/** This operation fetches ARM resource id of support resource type. */
export async function lookUpResourceId(
  context: Client,
  lookUpResourceIdRequest: LookUpResourceIdRequest,
  options: SupportTicketsLookUpResourceIdOptionalParams = { requestOptions: {} },
): Promise<LookUpResourceIdResponse> {
  const result = await _lookUpResourceIdSend(context, lookUpResourceIdRequest, options);
  return _lookUpResourceIdDeserialize(result);
}

export function _listSend(
  context: Client,
  options: SupportTicketsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      "%24top": options?.top,
      "%24filter": options?.filter,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SupportTicketsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _supportTicketsListResultDeserializer(result.body);
}

/** Lists all the support tickets for an Azure subscription. You can also filter the support tickets by _Status_, _CreatedDate_, _ServiceId_, and _ProblemClassificationId_ using the $filter parameter. Output will be a paged result with _nextLink_, using which you can retrieve the next set of support tickets. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error. */
export function list(
  context: Client,
  options: SupportTicketsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SupportTicketDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _updateSend(
  context: Client,
  supportTicketName: string,
  updateSupportTicket: UpdateSupportTicket,
  options: SupportTicketsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      supportTicketName: supportTicketName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: updateSupportTicketSerializer(updateSupportTicket),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SupportTicketDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return supportTicketDetailsDeserializer(result.body);
}

/** This API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API. */
export async function update(
  context: Client,
  supportTicketName: string,
  updateSupportTicket: UpdateSupportTicket,
  options: SupportTicketsUpdateOptionalParams = { requestOptions: {} },
): Promise<SupportTicketDetails> {
  const result = await _updateSend(context, supportTicketName, updateSupportTicket, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  supportTicketName: string,
  createSupportTicketParameters: SupportTicketDetails,
  options: SupportTicketsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      supportTicketName: supportTicketName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: supportTicketDetailsSerializer(createSupportTicketParameters),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SupportTicketDetails> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return supportTicketDetailsDeserializer(result.body);
}

/** Creates a new support ticket for Subscription and Service limits (Quota), Technical, Billing, and Subscription Management issues for the specified subscription. Learn the [prerequisites](https://aka.ms/supportAPI) required to create a support ticket.<br/><br/>Always call the Services and ProblemClassifications API to get the most recent set of services and problem categories required for support ticket creation.<br/><br/>Adding attachments is not currently supported via the API. To add a file to an existing support ticket, visit the [Manage support ticket](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/managesupportrequest) page in the Azure portal, select the support ticket, and use the file upload control to add a new file.<br/><br/>Providing consent to share diagnostic information with Azure support is currently not supported via the API. The Azure support engineer working on your ticket will reach out to you for consent if your issue requires gathering diagnostic information from your Azure resources.<br/><br/>**Creating a support ticket for on-behalf-of**: Include _x-ms-authorization-auxiliary_ header to provide an auxiliary token as per [documentation](https://docs.microsoft.com/azure/azure-resource-manager/management/authenticate-multi-tenant). The primary token will be from the tenant for whom a support ticket is being raised against the subscription, i.e. Cloud solution provider (CSP) customer tenant. The auxiliary token will be from the Cloud solution provider (CSP) partner tenant. */
export function create(
  context: Client,
  supportTicketName: string,
  createSupportTicketParameters: SupportTicketDetails,
  options: SupportTicketsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SupportTicketDetails>, SupportTicketDetails> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, supportTicketName, createSupportTicketParameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<SupportTicketDetails>, SupportTicketDetails>;
}

export function _getSend(
  context: Client,
  supportTicketName: string,
  options: SupportTicketsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      supportTicketName: supportTicketName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SupportTicketDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return supportTicketDetailsDeserializer(result.body);
}

/** Get ticket details for an Azure subscription. Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error. */
export async function get(
  context: Client,
  supportTicketName: string,
  options: SupportTicketsGetOptionalParams = { requestOptions: {} },
): Promise<SupportTicketDetails> {
  const result = await _getSend(context, supportTicketName, options);
  return _getDeserialize(result);
}
