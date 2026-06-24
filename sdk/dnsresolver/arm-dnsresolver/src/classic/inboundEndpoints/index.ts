// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/inboundEndpoints/operations.js";
import {
  InboundEndpointsListOptionalParams,
  InboundEndpointsDeleteOptionalParams,
  InboundEndpointsUpdateOptionalParams,
  InboundEndpointsCreateOrUpdateOptionalParams,
  InboundEndpointsGetOptionalParams,
} from "../../api/inboundEndpoints/options.js";
import { InboundEndpoint, InboundEndpointPatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InboundEndpoints operations. */
export interface InboundEndpointsOperations {
  /** Lists inbound endpoints for a DNS resolver. */
  list: (
    resourceGroupName: string,
    dnsResolverName: string,
    options?: InboundEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<InboundEndpoint>;
  /** Deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. */
  delete: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    options?: InboundEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    options?: InboundEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    options?: InboundEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an inbound endpoint for a DNS resolver. */
  update: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    parameters: InboundEndpointPatch,
    options?: InboundEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<InboundEndpoint>, InboundEndpoint>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    parameters: InboundEndpointPatch,
    options?: InboundEndpointsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InboundEndpoint>, InboundEndpoint>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    parameters: InboundEndpointPatch,
    options?: InboundEndpointsUpdateOptionalParams,
  ) => Promise<InboundEndpoint>;
  /** Creates or updates an inbound endpoint for a DNS resolver. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    parameters: InboundEndpoint,
    options?: InboundEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InboundEndpoint>, InboundEndpoint>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    parameters: InboundEndpoint,
    options?: InboundEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InboundEndpoint>, InboundEndpoint>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverName: string,
    inboundEndpointName: string,
    parameters: InboundEndpoint,
    options?: InboundEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<InboundEndpoint>;
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
    beginDelete: async (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      options?: InboundEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        dnsResolverName,
        inboundEndpointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      options?: InboundEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        dnsResolverName,
        inboundEndpointName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      parameters: InboundEndpointPatch,
      options?: InboundEndpointsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, dnsResolverName, inboundEndpointName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      parameters: InboundEndpointPatch,
      options?: InboundEndpointsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        dnsResolverName,
        inboundEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      parameters: InboundEndpointPatch,
      options?: InboundEndpointsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        dnsResolverName,
        inboundEndpointName,
        parameters,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      parameters: InboundEndpoint,
      options?: InboundEndpointsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverName,
        inboundEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverName: string,
      inboundEndpointName: string,
      parameters: InboundEndpoint,
      options?: InboundEndpointsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverName,
        inboundEndpointName,
        parameters,
        options,
      );
    },
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
