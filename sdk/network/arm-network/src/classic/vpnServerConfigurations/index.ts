// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listRadiusSecrets,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/vpnServerConfigurations/operations.js";
import type {
  VpnServerConfigurationsListRadiusSecretsOptionalParams,
  VpnServerConfigurationsListOptionalParams,
  VpnServerConfigurationsListByResourceGroupOptionalParams,
  VpnServerConfigurationsDeleteOptionalParams,
  VpnServerConfigurationsUpdateTagsOptionalParams,
  VpnServerConfigurationsCreateOrUpdateOptionalParams,
  VpnServerConfigurationsGetOptionalParams,
} from "../../api/vpnServerConfigurations/options.js";
import type {
  TagsObject,
  RadiusAuthServerListResult,
  VpnServerConfiguration,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VpnServerConfigurations operations. */
export interface VpnServerConfigurationsOperations {
  /** List all Radius servers with respective radius secrets from VpnServerConfiguration. */
  listRadiusSecrets: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    options?: VpnServerConfigurationsListRadiusSecretsOptionalParams,
  ) => Promise<RadiusAuthServerListResult>;
  /** Lists all the VpnServerConfigurations in a subscription. */
  list: (
    options?: VpnServerConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<VpnServerConfiguration>;
  /** Lists all the vpnServerConfigurations in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VpnServerConfigurationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VpnServerConfiguration>;
  /** Deletes a VpnServerConfiguration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    options?: VpnServerConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    options?: VpnServerConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    options?: VpnServerConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates VpnServerConfiguration tags. */
  updateTags: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    vpnServerConfigurationParameters: TagsObject,
    options?: VpnServerConfigurationsUpdateTagsOptionalParams,
  ) => Promise<VpnServerConfiguration>;
  /** Creates a VpnServerConfiguration resource if it doesn't exist else updates the existing VpnServerConfiguration. */
  createOrUpdate: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    vpnServerConfigurationParameters: VpnServerConfiguration,
    options?: VpnServerConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VpnServerConfiguration>, VpnServerConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    vpnServerConfigurationParameters: VpnServerConfiguration,
    options?: VpnServerConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VpnServerConfiguration>, VpnServerConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    vpnServerConfigurationParameters: VpnServerConfiguration,
    options?: VpnServerConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<VpnServerConfiguration>;
  /** Retrieves the details of a VpnServerConfiguration. */
  get: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    options?: VpnServerConfigurationsGetOptionalParams,
  ) => Promise<VpnServerConfiguration>;
}

function _getVpnServerConfigurations(context: NetworkManagementContext) {
  return {
    listRadiusSecrets: (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      options?: VpnServerConfigurationsListRadiusSecretsOptionalParams,
    ) => listRadiusSecrets(context, resourceGroupName, vpnServerConfigurationName, options),
    list: (options?: VpnServerConfigurationsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VpnServerConfigurationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      options?: VpnServerConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vpnServerConfigurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      options?: VpnServerConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, vpnServerConfigurationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      options?: VpnServerConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, vpnServerConfigurationName, options);
    },
    updateTags: (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      vpnServerConfigurationParameters: TagsObject,
      options?: VpnServerConfigurationsUpdateTagsOptionalParams,
    ) =>
      updateTags(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        vpnServerConfigurationParameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      vpnServerConfigurationParameters: VpnServerConfiguration,
      options?: VpnServerConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        vpnServerConfigurationParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      vpnServerConfigurationParameters: VpnServerConfiguration,
      options?: VpnServerConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        vpnServerConfigurationParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      vpnServerConfigurationParameters: VpnServerConfiguration,
      options?: VpnServerConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        vpnServerConfigurationParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      options?: VpnServerConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, vpnServerConfigurationName, options),
  };
}

export function _getVpnServerConfigurationsOperations(
  context: NetworkManagementContext,
): VpnServerConfigurationsOperations {
  return {
    ..._getVpnServerConfigurations(context),
  };
}
