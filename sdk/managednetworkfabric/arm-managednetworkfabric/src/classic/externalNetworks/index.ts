// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  updateBfdAdministrativeState,
  updateAdministrativeState,
  listByL3IsolationDomain,
  $delete,
  update,
  create,
  get,
} from "../../api/externalNetworks/operations.js";
import type {
  ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ExternalNetworksUpdateAdministrativeStateOptionalParams,
  ExternalNetworksListByL3IsolationDomainOptionalParams,
  ExternalNetworksDeleteOptionalParams,
  ExternalNetworksUpdateOptionalParams,
  ExternalNetworksCreateOptionalParams,
  ExternalNetworksGetOptionalParams,
} from "../../api/externalNetworks/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ExternalNetwork,
  ExternalNetworkPatch,
  ExternalNetworkBfdAdministrativeStateRequest,
  ExternalNetworkBfdAdministrativeStateResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExternalNetworks operations. */
export interface ExternalNetworksOperations {
  /** BFD administrative state for either static or bgp for internalNetwork. */
  updateBfdAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetworkBfdAdministrativeStateRequest,
    options?: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<ExternalNetworkBfdAdministrativeStateResponse>,
    ExternalNetworkBfdAdministrativeStateResponse
  >;
  /** @deprecated use updateBfdAdministrativeState instead */
  beginUpdateBfdAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetworkBfdAdministrativeStateRequest,
    options?: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExternalNetworkBfdAdministrativeStateResponse>,
      ExternalNetworkBfdAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateBfdAdministrativeState instead */
  beginUpdateBfdAdministrativeStateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetworkBfdAdministrativeStateRequest,
    options?: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ) => Promise<ExternalNetworkBfdAdministrativeStateResponse>;
  /** Executes update operation to enable or disable administrative State for externalNetwork. */
  updateAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForStateUpdate>,
      CommonPostActionResponseForStateUpdate
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateAdministrativeStateOptionalParams,
  ) => Promise<CommonPostActionResponseForStateUpdate>;
  /** Implements External Networks list by resource group GET method. */
  listByL3IsolationDomain: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: ExternalNetworksListByL3IsolationDomainOptionalParams,
  ) => PagedAsyncIterableIterator<ExternalNetwork>;
  /** Implements ExternalNetworks DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    options?: ExternalNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    options?: ExternalNetworksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    options?: ExternalNetworksDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the ExternalNetworks resource. */
  update: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetworkPatch,
    options?: ExternalNetworksUpdateOptionalParams,
  ) => PollerLike<OperationState<ExternalNetwork>, ExternalNetwork>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetworkPatch,
    options?: ExternalNetworksUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExternalNetwork>, ExternalNetwork>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetworkPatch,
    options?: ExternalNetworksUpdateOptionalParams,
  ) => Promise<ExternalNetwork>;
  /** Creates ExternalNetwork PUT method. */
  create: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetwork,
    options?: ExternalNetworksCreateOptionalParams,
  ) => PollerLike<OperationState<ExternalNetwork>, ExternalNetwork>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetwork,
    options?: ExternalNetworksCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExternalNetwork>, ExternalNetwork>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetwork,
    options?: ExternalNetworksCreateOptionalParams,
  ) => Promise<ExternalNetwork>;
  /** Implements ExternalNetworks GET method. */
  get: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    options?: ExternalNetworksGetOptionalParams,
  ) => Promise<ExternalNetwork>;
}

function _getExternalNetworks(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    updateBfdAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetworkBfdAdministrativeStateRequest,
      options?: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
    ) =>
      updateBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      ),
    beginUpdateBfdAdministrativeState: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetworkBfdAdministrativeStateRequest,
      options?: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
    ) => {
      const poller = updateBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateBfdAdministrativeStateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetworkBfdAdministrativeStateRequest,
      options?: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
    ) => {
      return await updateBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      );
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: ExternalNetworksUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      ),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: ExternalNetworksUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: ExternalNetworksUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      );
    },
    listByL3IsolationDomain: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: ExternalNetworksListByL3IsolationDomainOptionalParams,
    ) => listByL3IsolationDomain(context, resourceGroupName, l3IsolationDomainName, options),
    delete: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      options?: ExternalNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, l3IsolationDomainName, externalNetworkName, options),
    beginDelete: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      options?: ExternalNetworksDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      options?: ExternalNetworksDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetworkPatch,
      options?: ExternalNetworksUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, l3IsolationDomainName, externalNetworkName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetworkPatch,
      options?: ExternalNetworksUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetworkPatch,
      options?: ExternalNetworksUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetwork,
      options?: ExternalNetworksCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, l3IsolationDomainName, externalNetworkName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetwork,
      options?: ExternalNetworksCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      body: ExternalNetwork,
      options?: ExternalNetworksCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      externalNetworkName: string,
      options?: ExternalNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, l3IsolationDomainName, externalNetworkName, options),
  };
}

export function _getExternalNetworksOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): ExternalNetworksOperations {
  return {
    ..._getExternalNetworks(context),
  };
}
