// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CommunicationDetails,
  communicationDetailsSerializer,
  communicationDetailsDeserializer,
  _CommunicationsListResult,
  _communicationsListResultDeserializer,
  CheckNameAvailabilityInput,
  checkNameAvailabilityInputSerializer,
  CheckNameAvailabilityOutput,
  checkNameAvailabilityOutputDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CommunicationsCheckNameAvailabilityOptionalParams,
  CommunicationsListOptionalParams,
  CommunicationsCreateOptionalParams,
  CommunicationsGetOptionalParams,
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
  supportTicketName: string,
  checkNameAvailabilityInput: CheckNameAvailabilityInput,
  options: CommunicationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/checkNameAvailability{?api%2Dversion}",
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

/** Check the availability of a resource name. This API should be used to check the uniqueness of the name for adding a new communication to the support ticket. */
export async function checkNameAvailability(
  context: Client,
  supportTicketName: string,
  checkNameAvailabilityInput: CheckNameAvailabilityInput,
  options: CommunicationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityOutput> {
  const result = await _checkNameAvailabilitySend(
    context,
    supportTicketName,
    checkNameAvailabilityInput,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listSend(
  context: Client,
  supportTicketName: string,
  options: CommunicationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/communications{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      supportTicketName: supportTicketName,
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
): Promise<_CommunicationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _communicationsListResultDeserializer(result.body);
}

/** Lists all communications (attachments not included) for a support ticket. <br/></br> You can also filter support ticket communications by _CreatedDate_ or _CommunicationType_ using the $filter parameter. The only type of communication supported today is _Web_. Output will be a paged result with _nextLink_, using which you can retrieve the next set of Communication results. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error. */
export function list(
  context: Client,
  supportTicketName: string,
  options: CommunicationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommunicationDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, supportTicketName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _createSend(
  context: Client,
  supportTicketName: string,
  communicationName: string,
  createCommunicationParameters: CommunicationDetails,
  options: CommunicationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/communications/{communicationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      supportTicketName: supportTicketName,
      communicationName: communicationName,
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
      body: communicationDetailsSerializer(createCommunicationParameters),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunicationDetails> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return communicationDetailsDeserializer(result.body);
}

/** Adds a new customer communication to an Azure support ticket. */
export function create(
  context: Client,
  supportTicketName: string,
  communicationName: string,
  createCommunicationParameters: CommunicationDetails,
  options: CommunicationsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommunicationDetails>, CommunicationDetails> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        supportTicketName,
        communicationName,
        createCommunicationParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<CommunicationDetails>, CommunicationDetails>;
}

export function _getSend(
  context: Client,
  supportTicketName: string,
  communicationName: string,
  options: CommunicationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/communications/{communicationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      supportTicketName: supportTicketName,
      communicationName: communicationName,
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
): Promise<CommunicationDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return communicationDetailsDeserializer(result.body);
}

/** Returns communication details for a support ticket. */
export async function get(
  context: Client,
  supportTicketName: string,
  communicationName: string,
  options: CommunicationsGetOptionalParams = { requestOptions: {} },
): Promise<CommunicationDetails> {
  const result = await _getSend(context, supportTicketName, communicationName, options);
  return _getDeserialize(result);
}
