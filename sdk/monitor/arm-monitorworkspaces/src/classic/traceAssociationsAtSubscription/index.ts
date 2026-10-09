// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/traceAssociationsAtSubscription/operations.js";
import type {
  TraceAssociationsAtSubscriptionListOptionalParams,
  TraceAssociationsAtSubscriptionDeleteOptionalParams,
  TraceAssociationsAtSubscriptionCreateOrUpdateOptionalParams,
  TraceAssociationsAtSubscriptionGetOptionalParams,
} from "../../api/traceAssociationsAtSubscription/options.js";
import type { TraceAssociationResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TraceAssociationsAtSubscription operations. */
export interface TraceAssociationsAtSubscriptionOperations {
  /** Lists the trace associations that apply to the scope. */
  list: (
    options?: TraceAssociationsAtSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<TraceAssociationResource>;
  /** Deletes the trace association at the scope. */
  delete: (options?: TraceAssociationsAtSubscriptionDeleteOptionalParams) => Promise<void>;
  /** Creates or replaces the trace association at the scope. */
  createOrUpdate: (
    resource: TraceAssociationResource,
    options?: TraceAssociationsAtSubscriptionCreateOrUpdateOptionalParams,
  ) => Promise<TraceAssociationResource>;
  /** Gets the trace association at the scope. */
  get: (
    options?: TraceAssociationsAtSubscriptionGetOptionalParams,
  ) => Promise<TraceAssociationResource>;
}

function _getTraceAssociationsAtSubscription(context: MonitorContext) {
  return {
    list: (options?: TraceAssociationsAtSubscriptionListOptionalParams) => list(context, options),
    delete: (options?: TraceAssociationsAtSubscriptionDeleteOptionalParams) =>
      $delete(context, options),
    createOrUpdate: (
      resource: TraceAssociationResource,
      options?: TraceAssociationsAtSubscriptionCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resource, options),
    get: (options?: TraceAssociationsAtSubscriptionGetOptionalParams) => get(context, options),
  };
}

export function _getTraceAssociationsAtSubscriptionOperations(
  context: MonitorContext,
): TraceAssociationsAtSubscriptionOperations {
  return {
    ..._getTraceAssociationsAtSubscription(context),
  };
}
