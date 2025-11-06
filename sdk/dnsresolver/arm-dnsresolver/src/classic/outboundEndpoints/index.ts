// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/outboundEndpoints/operations.js";
import type {
  OutboundEndpointsListOptionalParams,
  OutboundEndpointsDeleteOptionalParams,
  OutboundEndpointsUpdateOptionalParams,
  OutboundEndpointsCreateOrUpdateOptionalParams,
  OutboundEndpointsGetOptionalParams,
} from "../../api/outboundEndpoints/options.js";
import type { OutboundEndpoint, OutboundEndpointPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OutboundEndpoints operations. */
export interface OutboundEndpointsOperations {
  /** Lists outbound endpoints for a DNS resolver. */
  list: (
    resourceGroupName: string,
    dnsResolverName: string,
    options?: OutboundEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundEndpoint>;
  /** Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    options?: OutboundEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an outbound endpoint for a DNS resolver. */
  update: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpointPatch,
    options?: OutboundEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<OutboundEndpoint>, OutboundEndpoint>;
  /** Creates or updates an outbound endpoint for a DNS resolver. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpoint,
    options?: OutboundEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OutboundEndpoint>, OutboundEndpoint>;
  /** Gets properties of an outbound endpoint for a DNS resolver. */
  get: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    options?: OutboundEndpointsGetOptionalParams,
  ) => Promise<OutboundEndpoint>;
}

function _getOutboundEndpoints(context: DnsResolverManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      dnsResolverName: string,
      options?: OutboundEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, dnsResolverName, options),
    delete: (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      options?: OutboundEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dnsResolverName, outboundEndpointName, options),
    update: (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      parameters: OutboundEndpointPatch,
      options?: OutboundEndpointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      parameters: OutboundEndpoint,
      options?: OutboundEndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      options?: OutboundEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, dnsResolverName, outboundEndpointName, options),
  };
}

export function _getOutboundEndpointsOperations(
  context: DnsResolverManagementContext,
): OutboundEndpointsOperations {
  return {
    ..._getOutboundEndpoints(context),
  };
}
