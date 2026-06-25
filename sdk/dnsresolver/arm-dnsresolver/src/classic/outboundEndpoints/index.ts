// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/outboundEndpoints/operations.js";
import {
  OutboundEndpointsListOptionalParams,
  OutboundEndpointsDeleteOptionalParams,
  OutboundEndpointsUpdateOptionalParams,
  OutboundEndpointsCreateOrUpdateOptionalParams,
  OutboundEndpointsGetOptionalParams,
} from "../../api/outboundEndpoints/options.js";
import { OutboundEndpoint, OutboundEndpointPatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OutboundEndpoints operations. */
export interface OutboundEndpointsOperations {
  /** Lists outbound endpoints for a DNS resolver. */
  list: (
    resourceGroupName: string,
    dnsResolverName: string,
    options?: OutboundEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundEndpoint>;
  /** Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. */
  delete: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    options?: OutboundEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    options?: OutboundEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    options?: OutboundEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an outbound endpoint for a DNS resolver. */
  update: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpointPatch,
    options?: OutboundEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<OutboundEndpoint>, OutboundEndpoint>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpointPatch,
    options?: OutboundEndpointsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OutboundEndpoint>, OutboundEndpoint>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpointPatch,
    options?: OutboundEndpointsUpdateOptionalParams,
  ) => Promise<OutboundEndpoint>;
  /** Creates or updates an outbound endpoint for a DNS resolver. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpoint,
    options?: OutboundEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OutboundEndpoint>, OutboundEndpoint>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpoint,
    options?: OutboundEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OutboundEndpoint>, OutboundEndpoint>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpoint,
    options?: OutboundEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<OutboundEndpoint>;
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
    beginDelete: async (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      options?: OutboundEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      options?: OutboundEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        options,
      );
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      parameters: OutboundEndpointPatch,
      options?: OutboundEndpointsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      parameters: OutboundEndpointPatch,
      options?: OutboundEndpointsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        parameters,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      parameters: OutboundEndpoint,
      options?: OutboundEndpointsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverName: string,
      outboundEndpointName: string,
      parameters: OutboundEndpoint,
      options?: OutboundEndpointsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        parameters,
        options,
      );
    },
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
