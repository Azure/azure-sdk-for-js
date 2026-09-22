// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext } from "../../api/containerInstanceManagementContext.js";
import { $delete } from "../../api/subnetServiceAssociationLink/operations.js";
import type { SubnetServiceAssociationLinkDeleteOptionalParams } from "../../api/subnetServiceAssociationLink/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SubnetServiceAssociationLink operations. */
export interface SubnetServiceAssociationLinkOperations {
  /** Delete container group virtual network association links. The operation does not delete other resources provided by the user. */
  delete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: SubnetServiceAssociationLinkDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: SubnetServiceAssociationLinkDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: SubnetServiceAssociationLinkDeleteOptionalParams,
  ) => Promise<void>;
}

function _getSubnetServiceAssociationLink(context: ContainerInstanceManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: SubnetServiceAssociationLinkDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkName, subnetName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: SubnetServiceAssociationLinkDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualNetworkName, subnetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualNetworkName: string,
      subnetName: string,
      options?: SubnetServiceAssociationLinkDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualNetworkName, subnetName, options);
    },
  };
}

export function _getSubnetServiceAssociationLinkOperations(
  context: ContainerInstanceManagementContext,
): SubnetServiceAssociationLinkOperations {
  return {
    ..._getSubnetServiceAssociationLink(context),
  };
}
