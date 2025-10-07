// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/inboundEndpoints/operations.js";
import type {
  InboundEndpointsListOptionalParams,
  InboundEndpointsDeleteOptionalParams,
  InboundEndpointsUpdateOptionalParams,
  InboundEndpointsCreateOrUpdateOptionalParams,
  InboundEndpointsGetOptionalParams,
} from "../../api/inboundEndpoints/options.js";
import type { InboundEndpoint, InboundEndpointPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InboundEndpoints operations. */
export interface InboundEndpointsOperations {
  /** Lists inbound endpoints for a DNS resolver. */
  list: (
    resourceGroupName: string,
    dnsResolverName: string,
    options?: InboundEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<InboundEndpoint>;
  /** Deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    options?: InboundEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an inbound endpoint for a DNS resolver. */
  update: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    parameters: InboundEndpointPatch,
    options?: InboundEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<InboundEndpoint>, InboundEndpoint>;
  /** Creates or updates an inbound endpoint for a DNS resolver. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    parameters: InboundEndpoint,
    options?: InboundEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InboundEndpoint>, InboundEndpoint>;
  /** Gets properties of an inbound endpoint for a DNS resolver. */
  get: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    options?: InboundEndpointsGetOptionalParams,
  ) => Promise<InboundEndpoint>;
}

function _getInboundEndpoints(context: DnsResolverManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      dnsResolverName: string,
      options?: InboundEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, dnsResolverName, options),
    delete: (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      options?: InboundEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dnsResolverName, inboundEndpointName, options),
    update: (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      parameters: InboundEndpointPatch,
      options?: InboundEndpointsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, dnsResolverName, inboundEndpointName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      parameters: InboundEndpoint,
      options?: InboundEndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverName,
        inboundEndpointName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      options?: InboundEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, dnsResolverName, inboundEndpointName, options),
  };
}

export function _getInboundEndpointsOperations(
  context: DnsResolverManagementContext,
): InboundEndpointsOperations {
  return {
    ..._getInboundEndpoints(context),
  };
}
