// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  packetCaptureOperation,
  packetCapture,
  listLearnedPrefixes,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/azureFirewalls/operations.js";
import type {
  AzureFirewallsPacketCaptureOperationOptionalParams,
  AzureFirewallsPacketCaptureOptionalParams,
  AzureFirewallsListLearnedPrefixesOptionalParams,
  AzureFirewallsListAllOptionalParams,
  AzureFirewallsListOptionalParams,
  AzureFirewallsDeleteOptionalParams,
  AzureFirewallsUpdateTagsOptionalParams,
  AzureFirewallsCreateOrUpdateOptionalParams,
  AzureFirewallsGetOptionalParams,
} from "../../api/azureFirewalls/options.js";
import type {
  TagsObject,
  AzureFirewall,
  IPPrefixesList,
  FirewallPacketCaptureParameters,
  AzureFirewallPacketCaptureResponse,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureFirewalls operations. */
export interface AzureFirewallsOperations {
  /** Runs a packet capture operation on AzureFirewall. */
  packetCaptureOperation: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: FirewallPacketCaptureParameters,
    options?: AzureFirewallsPacketCaptureOperationOptionalParams,
  ) => PollerLike<
    OperationState<AzureFirewallPacketCaptureResponse>,
    AzureFirewallPacketCaptureResponse
  >;
  /** @deprecated use packetCaptureOperation instead */
  beginPacketCaptureOperation: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: FirewallPacketCaptureParameters,
    options?: AzureFirewallsPacketCaptureOperationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<AzureFirewallPacketCaptureResponse>,
      AzureFirewallPacketCaptureResponse
    >
  >;
  /** @deprecated use packetCaptureOperation instead */
  beginPacketCaptureOperationAndWait: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: FirewallPacketCaptureParameters,
    options?: AzureFirewallsPacketCaptureOperationOptionalParams,
  ) => Promise<AzureFirewallPacketCaptureResponse>;
  /** Runs a packet capture on AzureFirewall. */
  packetCapture: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: FirewallPacketCaptureParameters,
    options?: AzureFirewallsPacketCaptureOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use packetCapture instead */
  beginPacketCapture: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: FirewallPacketCaptureParameters,
    options?: AzureFirewallsPacketCaptureOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use packetCapture instead */
  beginPacketCaptureAndWait: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: FirewallPacketCaptureParameters,
    options?: AzureFirewallsPacketCaptureOptionalParams,
  ) => Promise<void>;
  /** Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT. */
  listLearnedPrefixes: (
    resourceGroupName: string,
    azureFirewallName: string,
    options?: AzureFirewallsListLearnedPrefixesOptionalParams,
  ) => PollerLike<OperationState<IPPrefixesList>, IPPrefixesList>;
  /** @deprecated use listLearnedPrefixes instead */
  beginListLearnedPrefixes: (
    resourceGroupName: string,
    azureFirewallName: string,
    options?: AzureFirewallsListLearnedPrefixesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IPPrefixesList>, IPPrefixesList>>;
  /** @deprecated use listLearnedPrefixes instead */
  beginListLearnedPrefixesAndWait: (
    resourceGroupName: string,
    azureFirewallName: string,
    options?: AzureFirewallsListLearnedPrefixesOptionalParams,
  ) => Promise<IPPrefixesList>;
  /** Gets all the Azure Firewalls in a subscription. */
  listAll: (
    options?: AzureFirewallsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<AzureFirewall>;
  /** Lists all Azure Firewalls in a resource group. */
  list: (
    resourceGroupName: string,
    options?: AzureFirewallsListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureFirewall>;
  /** Deletes the specified Azure Firewall. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    azureFirewallName: string,
    options?: AzureFirewallsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    azureFirewallName: string,
    options?: AzureFirewallsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    azureFirewallName: string,
    options?: AzureFirewallsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags of an Azure Firewall resource. */
  updateTags: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: TagsObject,
    options?: AzureFirewallsUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<AzureFirewall>, AzureFirewall>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: TagsObject,
    options?: AzureFirewallsUpdateTagsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AzureFirewall>, AzureFirewall>>;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: TagsObject,
    options?: AzureFirewallsUpdateTagsOptionalParams,
  ) => Promise<AzureFirewall>;
  /** Creates or updates the specified Azure Firewall. */
  createOrUpdate: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: AzureFirewall,
    options?: AzureFirewallsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AzureFirewall>, AzureFirewall>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: AzureFirewall,
    options?: AzureFirewallsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AzureFirewall>, AzureFirewall>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: AzureFirewall,
    options?: AzureFirewallsCreateOrUpdateOptionalParams,
  ) => Promise<AzureFirewall>;
  /** Gets the specified Azure Firewall. */
  get: (
    resourceGroupName: string,
    azureFirewallName: string,
    options?: AzureFirewallsGetOptionalParams,
  ) => Promise<AzureFirewall>;
}

function _getAzureFirewalls(context: NetworkManagementContext) {
  return {
    packetCaptureOperation: (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: FirewallPacketCaptureParameters,
      options?: AzureFirewallsPacketCaptureOperationOptionalParams,
    ) => packetCaptureOperation(context, resourceGroupName, azureFirewallName, parameters, options),
    beginPacketCaptureOperation: async (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: FirewallPacketCaptureParameters,
      options?: AzureFirewallsPacketCaptureOperationOptionalParams,
    ) => {
      const poller = packetCaptureOperation(
        context,
        resourceGroupName,
        azureFirewallName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPacketCaptureOperationAndWait: async (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: FirewallPacketCaptureParameters,
      options?: AzureFirewallsPacketCaptureOperationOptionalParams,
    ) => {
      return await packetCaptureOperation(
        context,
        resourceGroupName,
        azureFirewallName,
        parameters,
        options,
      );
    },
    packetCapture: (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: FirewallPacketCaptureParameters,
      options?: AzureFirewallsPacketCaptureOptionalParams,
    ) => packetCapture(context, resourceGroupName, azureFirewallName, parameters, options),
    beginPacketCapture: async (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: FirewallPacketCaptureParameters,
      options?: AzureFirewallsPacketCaptureOptionalParams,
    ) => {
      const poller = packetCapture(
        context,
        resourceGroupName,
        azureFirewallName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPacketCaptureAndWait: async (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: FirewallPacketCaptureParameters,
      options?: AzureFirewallsPacketCaptureOptionalParams,
    ) => {
      return await packetCapture(
        context,
        resourceGroupName,
        azureFirewallName,
        parameters,
        options,
      );
    },
    listLearnedPrefixes: (
      resourceGroupName: string,
      azureFirewallName: string,
      options?: AzureFirewallsListLearnedPrefixesOptionalParams,
    ) => listLearnedPrefixes(context, resourceGroupName, azureFirewallName, options),
    beginListLearnedPrefixes: async (
      resourceGroupName: string,
      azureFirewallName: string,
      options?: AzureFirewallsListLearnedPrefixesOptionalParams,
    ) => {
      const poller = listLearnedPrefixes(context, resourceGroupName, azureFirewallName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListLearnedPrefixesAndWait: async (
      resourceGroupName: string,
      azureFirewallName: string,
      options?: AzureFirewallsListLearnedPrefixesOptionalParams,
    ) => {
      return await listLearnedPrefixes(context, resourceGroupName, azureFirewallName, options);
    },
    listAll: (options?: AzureFirewallsListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: AzureFirewallsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      azureFirewallName: string,
      options?: AzureFirewallsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, azureFirewallName, options),
    beginDelete: async (
      resourceGroupName: string,
      azureFirewallName: string,
      options?: AzureFirewallsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, azureFirewallName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      azureFirewallName: string,
      options?: AzureFirewallsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, azureFirewallName, options);
    },
    updateTags: (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: TagsObject,
      options?: AzureFirewallsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, azureFirewallName, parameters, options),
    beginUpdateTags: async (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: TagsObject,
      options?: AzureFirewallsUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(context, resourceGroupName, azureFirewallName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: TagsObject,
      options?: AzureFirewallsUpdateTagsOptionalParams,
    ) => {
      return await updateTags(context, resourceGroupName, azureFirewallName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: AzureFirewall,
      options?: AzureFirewallsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, azureFirewallName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: AzureFirewall,
      options?: AzureFirewallsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        azureFirewallName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      azureFirewallName: string,
      parameters: AzureFirewall,
      options?: AzureFirewallsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        azureFirewallName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      azureFirewallName: string,
      options?: AzureFirewallsGetOptionalParams,
    ) => get(context, resourceGroupName, azureFirewallName, options),
  };
}

export function _getAzureFirewallsOperations(
  context: NetworkManagementContext,
): AzureFirewallsOperations {
  return {
    ..._getAzureFirewalls(context),
  };
}
