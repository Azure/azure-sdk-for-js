// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext } from "../../api/eventHubManagementContext.js";
import {
  createOrUpdate,
  getResourceAssociationName,
} from "../../api/networkSecurityPerimeterConfigurations/operations.js";
import type {
  NetworkSecurityPerimeterConfigurationsCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams,
} from "../../api/networkSecurityPerimeterConfigurations/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterConfigurations operations. */
export interface NetworkSecurityPerimeterConfigurationsOperations {
  /** Refreshes any information about the association. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    resourceAssociationName: string,
    options?: NetworkSecurityPerimeterConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<NetworkSecurityPerimeterConfiguration>,
    NetworkSecurityPerimeterConfiguration
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    resourceAssociationName: string,
    options?: NetworkSecurityPerimeterConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkSecurityPerimeterConfiguration>,
      NetworkSecurityPerimeterConfiguration
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    resourceAssociationName: string,
    options?: NetworkSecurityPerimeterConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
  /** Return a NetworkSecurityPerimeterConfigurations resourceAssociationName */
  getResourceAssociationName: (
    resourceGroupName: string,
    namespaceName: string,
    resourceAssociationName: string,
    options?: NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getNetworkSecurityPerimeterConfigurations(context: EventHubManagementContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      resourceAssociationName: string,
      options?: NetworkSecurityPerimeterConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, namespaceName, resourceAssociationName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      resourceAssociationName: string,
      options?: NetworkSecurityPerimeterConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        resourceAssociationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      resourceAssociationName: string,
      options?: NetworkSecurityPerimeterConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        resourceAssociationName,
        options,
      );
    },
    getResourceAssociationName: (
      resourceGroupName: string,
      namespaceName: string,
      resourceAssociationName: string,
      options?: NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams,
    ) =>
      getResourceAssociationName(
        context,
        resourceGroupName,
        namespaceName,
        resourceAssociationName,
        options,
      ),
  };
}

export function _getNetworkSecurityPerimeterConfigurationsOperations(
  context: EventHubManagementContext,
): NetworkSecurityPerimeterConfigurationsOperations {
  return {
    ..._getNetworkSecurityPerimeterConfigurations(context),
  };
}
