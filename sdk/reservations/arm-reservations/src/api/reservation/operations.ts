// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPIContext as Client } from "../index.js";
import {
  errorDeserializer,
  ReservationResponse,
  reservationResponseDeserializer,
  Patch,
  patchSerializer,
  _ReservationList,
  _reservationListDeserializer,
  reservationResponseArrayDeserializer,
  AvailableScopeRequest,
  availableScopeRequestSerializer,
  AvailableScopeProperties,
  availableScopePropertiesDeserializer,
  SplitRequest,
  splitRequestSerializer,
  MergeRequest,
  mergeRequestSerializer,
  _ReservationsListResult,
  _reservationsListResultDeserializer,
  errorResponseDeserializer,
} from "../../models/reservations/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ReservationListAllOptionalParams,
  ReservationMergeOptionalParams,
  ReservationSplitOptionalParams,
  ReservationListRevisionsOptionalParams,
  ReservationUnarchiveOptionalParams,
  ReservationArchiveOptionalParams,
  ReservationAvailableScopesOptionalParams,
  ReservationListOptionalParams,
  ReservationUpdateOptionalParams,
  ReservationGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: ReservationListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservations{?api%2Dversion,%24filter,%24orderby,refreshSummary,%24skiptoken,selectedState,take}",
    {
      "api%2Dversion": "2022-11-01",
      "%24filter": options?.filter,
      "%24orderby": options?.orderby,
      refreshSummary: options?.refreshSummary,
      "%24skiptoken": options?.skiptoken,
      selectedState: options?.selectedState,
      take: options?.take,
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _reservationsListResultDeserializer(result.body);
}

/** List the reservations and the roll up counts of reservations group by provisioning states that the user has access to in the current tenant. */
export function listAll(
  context: Client,
  options: ReservationListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-11-01" },
  );
}

export function _mergeSend(
  context: Client,
  reservationOrderId: string,
  body: MergeRequest,
  options: ReservationMergeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/merge{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": "2022-11-01",
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
      body: mergeRequestSerializer(body),
    });
}

export async function _mergeDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationResponse[]> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return reservationResponseArrayDeserializer(result.body);
}

/** Merge the specified `Reservation`s into a new `Reservation`. The two `Reservation`s being merged must have same properties. */
export function merge(
  context: Client,
  reservationOrderId: string,
  body: MergeRequest,
  options: ReservationMergeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReservationResponse[]>, ReservationResponse[]> {
  return getLongRunningPoller(context, _mergeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _mergeSend(context, reservationOrderId, body, options),
    resourceLocationConfig: "location",
    apiVersion: "2022-11-01",
  }) as PollerLike<OperationState<ReservationResponse[]>, ReservationResponse[]>;
}

export function _splitSend(
  context: Client,
  reservationOrderId: string,
  body: SplitRequest,
  options: ReservationSplitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/split{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": "2022-11-01",
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
      body: splitRequestSerializer(body),
    });
}

export async function _splitDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationResponse[]> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return reservationResponseArrayDeserializer(result.body);
}

/** Split a `Reservation` into two `Reservation`s with specified quantity distribution. */
export function split(
  context: Client,
  reservationOrderId: string,
  body: SplitRequest,
  options: ReservationSplitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReservationResponse[]>, ReservationResponse[]> {
  return getLongRunningPoller(context, _splitDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _splitSend(context, reservationOrderId, body, options),
    resourceLocationConfig: "location",
    apiVersion: "2022-11-01",
  }) as PollerLike<OperationState<ReservationResponse[]>, ReservationResponse[]>;
}

export function _listRevisionsSend(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationListRevisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}/revisions{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": "2022-11-01",
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

export async function _listRevisionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return _reservationListDeserializer(result.body);
}

/** List of all the revisions for the `Reservation`. */
export function listRevisions(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationListRevisionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listRevisionsSend(context, reservationOrderId, reservationId, options),
    _listRevisionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-11-01" },
  );
}

export function _unarchiveSend(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationUnarchiveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}/unarchive{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _unarchiveDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Restores a `Reservation` to the state it was before archiving. */
export async function unarchive(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationUnarchiveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _unarchiveSend(context, reservationOrderId, reservationId, options);
  return _unarchiveDeserialize(result);
}

export function _archiveSend(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationArchiveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}/archive{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _archiveDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Archiving a `Reservation` moves it to `Archived` state. */
export async function archive(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationArchiveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _archiveSend(context, reservationOrderId, reservationId, options);
  return _archiveDeserialize(result);
}

export function _availableScopesSend(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  body: AvailableScopeRequest,
  options: ReservationAvailableScopesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}/availableScopes{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": "2022-11-01",
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
      body: availableScopeRequestSerializer(body),
    });
}

export async function _availableScopesDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailableScopeProperties> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return availableScopePropertiesDeserializer(result.body);
}

/** Check whether the scopes from request is valid for `Reservation`. */
export function availableScopes(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  body: AvailableScopeRequest,
  options: ReservationAvailableScopesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AvailableScopeProperties>, AvailableScopeProperties> {
  return getLongRunningPoller(context, _availableScopesDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _availableScopesSend(context, reservationOrderId, reservationId, body, options),
    resourceLocationConfig: "location",
    apiVersion: "2022-11-01",
  }) as PollerLike<OperationState<AvailableScopeProperties>, AvailableScopeProperties>;
}

export function _listSend(
  context: Client,
  reservationOrderId: string,
  options: ReservationListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": "2022-11-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ReservationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return _reservationListDeserializer(result.body);
}

/** List `Reservation`s within a single `ReservationOrder`. */
export function list(
  context: Client,
  reservationOrderId: string,
  options: ReservationListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, reservationOrderId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-11-01" },
  );
}

export function _updateSend(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  parameters: Patch,
  options: ReservationUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": "2022-11-01",
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
      body: patchSerializer(parameters),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return reservationResponseDeserializer(result.body);
}

/** Updates the applied scopes of the `Reservation`. */
export function update(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  parameters: Patch,
  options: ReservationUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReservationResponse>, ReservationResponse> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, reservationOrderId, reservationId, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2022-11-01",
  }) as PollerLike<OperationState<ReservationResponse>, ReservationResponse>;
}

export function _getSend(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}{?api%2Dversion,%24expand}",
    {
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": "2022-11-01",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ReservationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return reservationResponseDeserializer(result.body);
}

/** Get specific `Reservation` details. */
export async function get(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationGetOptionalParams = { requestOptions: {} },
): Promise<ReservationResponse> {
  const result = await _getSend(context, reservationOrderId, reservationId, options);
  return _getDeserialize(result);
}
