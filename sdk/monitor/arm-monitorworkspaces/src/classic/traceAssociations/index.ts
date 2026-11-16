// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/traceAssociations/operations.js";
import type {
  TraceAssociationsListOptionalParams,
  TraceAssociationsDeleteOptionalParams,
  TraceAssociationsCreateOrUpdateOptionalParams,
  TraceAssociationsGetOptionalParams,
} from "../../api/traceAssociations/options.js";
import type { TraceAssociationResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TraceAssociations operations. */
export interface TraceAssociationsOperations {
  /** Lists the trace associations that apply to the resource scope. */
  list: (
    resourceGroupName: string,
    providerName: string,
    providerType: string,
    resourceName: string,
    options?: TraceAssociationsListOptionalParams,
  ) => PagedAsyncIterableIterator<TraceAssociationResource>;
  /** Deletes the trace association at the resource scope. */
  delete: (
    resourceGroupName: string,
    providerName: string,
    providerType: string,
    resourceName: string,
    options?: TraceAssociationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces the trace association at the resource scope. */
  createOrUpdate: (
    resourceGroupName: string,
    providerName: string,
    providerType: string,
    resourceName: string,
    resource: TraceAssociationResource,
    options?: TraceAssociationsCreateOrUpdateOptionalParams,
  ) => Promise<TraceAssociationResource>;
  /** Gets the trace association at the resource scope. */
  get: (
    resourceGroupName: string,
    providerName: string,
    providerType: string,
    resourceName: string,
    options?: TraceAssociationsGetOptionalParams,
  ) => Promise<TraceAssociationResource>;
}

function _getTraceAssociations(context: MonitorContext) {
  return {
    list: (
      resourceGroupName: string,
      providerName: string,
      providerType: string,
      resourceName: string,
      options?: TraceAssociationsListOptionalParams,
    ) => list(context, resourceGroupName, providerName, providerType, resourceName, options),
    delete: (
      resourceGroupName: string,
      providerName: string,
      providerType: string,
      resourceName: string,
      options?: TraceAssociationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, providerName, providerType, resourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      providerName: string,
      providerType: string,
      resourceName: string,
      resource: TraceAssociationResource,
      options?: TraceAssociationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        providerName,
        providerType,
        resourceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      providerName: string,
      providerType: string,
      resourceName: string,
      options?: TraceAssociationsGetOptionalParams,
    ) => get(context, resourceGroupName, providerName, providerType, resourceName, options),
  };
}

export function _getTraceAssociationsOperations(
  context: MonitorContext,
): TraceAssociationsOperations {
  return {
    ..._getTraceAssociations(context),
  };
}
