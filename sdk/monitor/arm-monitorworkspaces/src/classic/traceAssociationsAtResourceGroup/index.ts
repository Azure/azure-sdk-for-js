// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/traceAssociationsAtResourceGroup/operations.js";
import type {
  TraceAssociationsAtResourceGroupListOptionalParams,
  TraceAssociationsAtResourceGroupDeleteOptionalParams,
  TraceAssociationsAtResourceGroupCreateOrUpdateOptionalParams,
  TraceAssociationsAtResourceGroupGetOptionalParams,
} from "../../api/traceAssociationsAtResourceGroup/options.js";
import type { TraceAssociationResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TraceAssociationsAtResourceGroup operations. */
export interface TraceAssociationsAtResourceGroupOperations {
  /** Lists the trace associations that apply to the scope. */
  list: (
    resourceGroupName: string,
    options?: TraceAssociationsAtResourceGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<TraceAssociationResource>;
  /** Deletes the trace association at the scope. */
  delete: (
    resourceGroupName: string,
    options?: TraceAssociationsAtResourceGroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces the trace association at the scope. */
  createOrUpdate: (
    resourceGroupName: string,
    resource: TraceAssociationResource,
    options?: TraceAssociationsAtResourceGroupCreateOrUpdateOptionalParams,
  ) => Promise<TraceAssociationResource>;
  /** Gets the trace association at the scope. */
  get: (
    resourceGroupName: string,
    options?: TraceAssociationsAtResourceGroupGetOptionalParams,
  ) => Promise<TraceAssociationResource>;
}

function _getTraceAssociationsAtResourceGroup(context: MonitorContext) {
  return {
    list: (
      resourceGroupName: string,
      options?: TraceAssociationsAtResourceGroupListOptionalParams,
    ) => list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      options?: TraceAssociationsAtResourceGroupDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resource: TraceAssociationResource,
      options?: TraceAssociationsAtResourceGroupCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resource, options),
    get: (resourceGroupName: string, options?: TraceAssociationsAtResourceGroupGetOptionalParams) =>
      get(context, resourceGroupName, options),
  };
}

export function _getTraceAssociationsAtResourceGroupOperations(
  context: MonitorContext,
): TraceAssociationsAtResourceGroupOperations {
  return {
    ..._getTraceAssociationsAtResourceGroup(context),
  };
}
