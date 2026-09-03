// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext } from "../../api/azureReservationAPIContext.js";
import {
  listAll,
  merge,
  split,
  listRevisions,
  unarchive,
  archive,
  availableScopes,
  list,
  update,
  get,
} from "../../api/reservation/operations.js";
import type {
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
} from "../../api/reservation/options.js";
import type {
  ReservationResponse,
  Patch,
  AvailableScopeRequest,
  AvailableScopeProperties,
  SplitRequest,
  MergeRequest,
} from "../../models/reservations/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Reservation operations. */
export interface ReservationOperations {
  /** List the reservations and the roll up counts of reservations group by provisioning states that the user has access to in the current tenant. */
  listAll: (
    options?: ReservationListAllOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationResponse>;
  /** Merge the specified `Reservation`s into a new `Reservation`. The two `Reservation`s being merged must have same properties. */
  merge: (
    reservationOrderId: string,
    body: MergeRequest,
    options?: ReservationMergeOptionalParams,
  ) => PollerLike<OperationState<ReservationResponse[]>, ReservationResponse[]>;
  /** @deprecated use merge instead */
  beginMerge: (
    reservationOrderId: string,
    body: MergeRequest,
    options?: ReservationMergeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ReservationResponse[]>, ReservationResponse[]>>;
  /** @deprecated use merge instead */
  beginMergeAndWait: (
    reservationOrderId: string,
    body: MergeRequest,
    options?: ReservationMergeOptionalParams,
  ) => Promise<ReservationResponse[]>;
  /** Split a `Reservation` into two `Reservation`s with specified quantity distribution. */
  split: (
    reservationOrderId: string,
    body: SplitRequest,
    options?: ReservationSplitOptionalParams,
  ) => PollerLike<OperationState<ReservationResponse[]>, ReservationResponse[]>;
  /** @deprecated use split instead */
  beginSplit: (
    reservationOrderId: string,
    body: SplitRequest,
    options?: ReservationSplitOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ReservationResponse[]>, ReservationResponse[]>>;
  /** @deprecated use split instead */
  beginSplitAndWait: (
    reservationOrderId: string,
    body: SplitRequest,
    options?: ReservationSplitOptionalParams,
  ) => Promise<ReservationResponse[]>;
  /** List of all the revisions for the `Reservation`. */
  listRevisions: (
    reservationOrderId: string,
    reservationId: string,
    options?: ReservationListRevisionsOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationResponse>;
  /** Restores a `Reservation` to the state it was before archiving. */
  unarchive: (
    reservationOrderId: string,
    reservationId: string,
    options?: ReservationUnarchiveOptionalParams,
  ) => Promise<void>;
  /** Archiving a `Reservation` moves it to `Archived` state. */
  archive: (
    reservationOrderId: string,
    reservationId: string,
    options?: ReservationArchiveOptionalParams,
  ) => Promise<void>;
  /** Check whether the scopes from request is valid for `Reservation`. */
  availableScopes: (
    reservationOrderId: string,
    reservationId: string,
    body: AvailableScopeRequest,
    options?: ReservationAvailableScopesOptionalParams,
  ) => PollerLike<OperationState<AvailableScopeProperties>, AvailableScopeProperties>;
  /** @deprecated use availableScopes instead */
  beginAvailableScopes: (
    reservationOrderId: string,
    reservationId: string,
    body: AvailableScopeRequest,
    options?: ReservationAvailableScopesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<AvailableScopeProperties>, AvailableScopeProperties>
  >;
  /** @deprecated use availableScopes instead */
  beginAvailableScopesAndWait: (
    reservationOrderId: string,
    reservationId: string,
    body: AvailableScopeRequest,
    options?: ReservationAvailableScopesOptionalParams,
  ) => Promise<AvailableScopeProperties>;
  /** List `Reservation`s within a single `ReservationOrder`. */
  list: (
    reservationOrderId: string,
    options?: ReservationListOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationResponse>;
  /** Updates the applied scopes of the `Reservation`. */
  update: (
    reservationOrderId: string,
    reservationId: string,
    parameters: Patch,
    options?: ReservationUpdateOptionalParams,
  ) => PollerLike<OperationState<ReservationResponse>, ReservationResponse>;
  /** @deprecated use update instead */
  beginUpdate: (
    reservationOrderId: string,
    reservationId: string,
    parameters: Patch,
    options?: ReservationUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ReservationResponse>, ReservationResponse>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    reservationOrderId: string,
    reservationId: string,
    parameters: Patch,
    options?: ReservationUpdateOptionalParams,
  ) => Promise<ReservationResponse>;
  /** Get specific `Reservation` details. */
  get: (
    reservationOrderId: string,
    reservationId: string,
    options?: ReservationGetOptionalParams,
  ) => Promise<ReservationResponse>;
}

function _getReservation(context: AzureReservationAPIContext) {
  return {
    listAll: (options?: ReservationListAllOptionalParams) => listAll(context, options),
    merge: (
      reservationOrderId: string,
      body: MergeRequest,
      options?: ReservationMergeOptionalParams,
    ) => merge(context, reservationOrderId, body, options),
    beginMerge: async (
      reservationOrderId: string,
      body: MergeRequest,
      options?: ReservationMergeOptionalParams,
    ) => {
      const poller = merge(context, reservationOrderId, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMergeAndWait: async (
      reservationOrderId: string,
      body: MergeRequest,
      options?: ReservationMergeOptionalParams,
    ) => {
      return await merge(context, reservationOrderId, body, options);
    },
    split: (
      reservationOrderId: string,
      body: SplitRequest,
      options?: ReservationSplitOptionalParams,
    ) => split(context, reservationOrderId, body, options),
    beginSplit: async (
      reservationOrderId: string,
      body: SplitRequest,
      options?: ReservationSplitOptionalParams,
    ) => {
      const poller = split(context, reservationOrderId, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSplitAndWait: async (
      reservationOrderId: string,
      body: SplitRequest,
      options?: ReservationSplitOptionalParams,
    ) => {
      return await split(context, reservationOrderId, body, options);
    },
    listRevisions: (
      reservationOrderId: string,
      reservationId: string,
      options?: ReservationListRevisionsOptionalParams,
    ) => listRevisions(context, reservationOrderId, reservationId, options),
    unarchive: (
      reservationOrderId: string,
      reservationId: string,
      options?: ReservationUnarchiveOptionalParams,
    ) => unarchive(context, reservationOrderId, reservationId, options),
    archive: (
      reservationOrderId: string,
      reservationId: string,
      options?: ReservationArchiveOptionalParams,
    ) => archive(context, reservationOrderId, reservationId, options),
    availableScopes: (
      reservationOrderId: string,
      reservationId: string,
      body: AvailableScopeRequest,
      options?: ReservationAvailableScopesOptionalParams,
    ) => availableScopes(context, reservationOrderId, reservationId, body, options),
    beginAvailableScopes: async (
      reservationOrderId: string,
      reservationId: string,
      body: AvailableScopeRequest,
      options?: ReservationAvailableScopesOptionalParams,
    ) => {
      const poller = availableScopes(context, reservationOrderId, reservationId, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAvailableScopesAndWait: async (
      reservationOrderId: string,
      reservationId: string,
      body: AvailableScopeRequest,
      options?: ReservationAvailableScopesOptionalParams,
    ) => {
      return await availableScopes(context, reservationOrderId, reservationId, body, options);
    },
    list: (reservationOrderId: string, options?: ReservationListOptionalParams) =>
      list(context, reservationOrderId, options),
    update: (
      reservationOrderId: string,
      reservationId: string,
      parameters: Patch,
      options?: ReservationUpdateOptionalParams,
    ) => update(context, reservationOrderId, reservationId, parameters, options),
    beginUpdate: async (
      reservationOrderId: string,
      reservationId: string,
      parameters: Patch,
      options?: ReservationUpdateOptionalParams,
    ) => {
      const poller = update(context, reservationOrderId, reservationId, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      reservationOrderId: string,
      reservationId: string,
      parameters: Patch,
      options?: ReservationUpdateOptionalParams,
    ) => {
      return await update(context, reservationOrderId, reservationId, parameters, options);
    },
    get: (
      reservationOrderId: string,
      reservationId: string,
      options?: ReservationGetOptionalParams,
    ) => get(context, reservationOrderId, reservationId, options),
  };
}

export function _getReservationOperations(
  context: AzureReservationAPIContext,
): ReservationOperations {
  return {
    ..._getReservation(context),
  };
}
