// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  updateBfdAdministrativeState,
  updateStaticRouteBfdAdministrativeState,
  updateBgpAdministrativeState,
  updateAdministrativeState,
  listByL3IsolationDomain,
  $delete,
  update,
  create,
  get,
} from "../../api/internalNetworks/operations.js";
import type {
  InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
  InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
  InternalNetworksUpdateAdministrativeStateOptionalParams,
  InternalNetworksListByL3IsolationDomainOptionalParams,
  InternalNetworksDeleteOptionalParams,
  InternalNetworksUpdateOptionalParams,
  InternalNetworksCreateOptionalParams,
  InternalNetworksGetOptionalParams,
} from "../../api/internalNetworks/options.js";
import type {
  UpdateAdministrativeState,
  UpdateAdministrativeStateResponse,
  InternalNetwork,
  InternalNetworkPatch,
  InternalNetworkUpdateBgpAdministrativeStateRequest,
  InternalNetworkUpdateBgpAdministrativeStateResponse,
  InternalNetworkUpdateBfdAdministrativeStateRequest,
  InternalNetworkUpdateBfdAdministrativeStateResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InternalNetworks operations. */
export interface InternalNetworksOperations {
  /** BFD administrative state for either static or bgp for internalNetwork. */
  updateBfdAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkUpdateBfdAdministrativeStateRequest,
    options?: InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<InternalNetworkUpdateBfdAdministrativeStateResponse>,
    InternalNetworkUpdateBfdAdministrativeStateResponse
  >;
  /** @deprecated use updateBfdAdministrativeState instead */
  beginUpdateBfdAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkUpdateBfdAdministrativeStateRequest,
    options?: InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<InternalNetworkUpdateBfdAdministrativeStateResponse>,
      InternalNetworkUpdateBfdAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateBfdAdministrativeState instead */
  beginUpdateBfdAdministrativeStateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkUpdateBfdAdministrativeStateRequest,
    options?: InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ) => Promise<InternalNetworkUpdateBfdAdministrativeStateResponse>;
  /** Update Static Route BFD administrative state for internalNetwork. */
  updateStaticRouteBfdAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateStaticRouteBfdAdministrativeState instead */
  beginUpdateStaticRouteBfdAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateStaticRouteBfdAdministrativeState instead */
  beginUpdateStaticRouteBfdAdministrativeStateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
  /** Update BGP state for internalNetwork. Allowed only on edge devices. */
  updateBgpAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkUpdateBgpAdministrativeStateRequest,
    options?: InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<InternalNetworkUpdateBgpAdministrativeStateResponse>,
    InternalNetworkUpdateBgpAdministrativeStateResponse
  >;
  /** @deprecated use updateBgpAdministrativeState instead */
  beginUpdateBgpAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkUpdateBgpAdministrativeStateRequest,
    options?: InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<InternalNetworkUpdateBgpAdministrativeStateResponse>,
      InternalNetworkUpdateBgpAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateBgpAdministrativeState instead */
  beginUpdateBgpAdministrativeStateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkUpdateBgpAdministrativeStateRequest,
    options?: InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
  ) => Promise<InternalNetworkUpdateBgpAdministrativeStateResponse>;
  /** Executes update operation to enable or disable administrative State for InternalNetwork. */
  updateAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: InternalNetworksUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: InternalNetworksUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: InternalNetworksUpdateAdministrativeStateOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
  /** Displays InternalNetworks list by resource group GET method. */
  listByL3IsolationDomain: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: InternalNetworksListByL3IsolationDomainOptionalParams,
  ) => PagedAsyncIterableIterator<InternalNetwork>;
  /** Implements InternalNetworks DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    options?: InternalNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    options?: InternalNetworksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    options?: InternalNetworksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a InternalNetworks. */
  update: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkPatch,
    options?: InternalNetworksUpdateOptionalParams,
  ) => PollerLike<OperationState<InternalNetwork>, InternalNetwork>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkPatch,
    options?: InternalNetworksUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InternalNetwork>, InternalNetwork>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetworkPatch,
    options?: InternalNetworksUpdateOptionalParams,
  ) => Promise<InternalNetwork>;
  /** Creates InternalNetwork PUT method. */
  create: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetwork,
    options?: InternalNetworksCreateOptionalParams,
  ) => PollerLike<OperationState<InternalNetwork>, InternalNetwork>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetwork,
    options?: InternalNetworksCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InternalNetwork>, InternalNetwork>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    body: InternalNetwork,
    options?: InternalNetworksCreateOptionalParams,
  ) => Promise<InternalNetwork>;
  /** Gets a InternalNetworks. */
  get: (
    resourceGroupName: string,
    l3IsolationDomainName: string,
    internalNetworkName: string,
    options?: InternalNetworksGetOptionalParams,
  ) => Promise<InternalNetwork>;
}

function _getInternalNetworks(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    updateBfdAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkUpdateBfdAdministrativeStateRequest,
      options?: InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
    ) =>
      updateBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      ),
    beginUpdateBfdAdministrativeState: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkUpdateBfdAdministrativeStateRequest,
      options?: InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
    ) => {
      const poller = updateBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateBfdAdministrativeStateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkUpdateBfdAdministrativeStateRequest,
      options?: InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
    ) => {
      return await updateBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
    },
    updateStaticRouteBfdAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
    ) =>
      updateStaticRouteBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      ),
    beginUpdateStaticRouteBfdAdministrativeState: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
    ) => {
      const poller = updateStaticRouteBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateStaticRouteBfdAdministrativeStateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
    ) => {
      return await updateStaticRouteBfdAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
    },
    updateBgpAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkUpdateBgpAdministrativeStateRequest,
      options?: InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
    ) =>
      updateBgpAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      ),
    beginUpdateBgpAdministrativeState: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkUpdateBgpAdministrativeStateRequest,
      options?: InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
    ) => {
      const poller = updateBgpAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateBgpAdministrativeStateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkUpdateBgpAdministrativeStateRequest,
      options?: InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
    ) => {
      return await updateBgpAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: InternalNetworksUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      ),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: InternalNetworksUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: UpdateAdministrativeState,
      options?: InternalNetworksUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
    },
    listByL3IsolationDomain: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      options?: InternalNetworksListByL3IsolationDomainOptionalParams,
    ) => listByL3IsolationDomain(context, resourceGroupName, l3IsolationDomainName, options),
    delete: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      options?: InternalNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, l3IsolationDomainName, internalNetworkName, options),
    beginDelete: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      options?: InternalNetworksDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      options?: InternalNetworksDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkPatch,
      options?: InternalNetworksUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, l3IsolationDomainName, internalNetworkName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkPatch,
      options?: InternalNetworksUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetworkPatch,
      options?: InternalNetworksUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetwork,
      options?: InternalNetworksCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, l3IsolationDomainName, internalNetworkName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetwork,
      options?: InternalNetworksCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      body: InternalNetwork,
      options?: InternalNetworksCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      l3IsolationDomainName: string,
      internalNetworkName: string,
      options?: InternalNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, l3IsolationDomainName, internalNetworkName, options),
  };
}

export function _getInternalNetworksOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): InternalNetworksOperations {
  return {
    ..._getInternalNetworks(context),
  };
}
