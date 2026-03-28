// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listByVpnServerConfiguration,
  $delete,
  createOrUpdate,
  get,
} from "../../api/configurationPolicyGroups/operations.js";
import type {
  ConfigurationPolicyGroupsListByVpnServerConfigurationOptionalParams,
  ConfigurationPolicyGroupsDeleteOptionalParams,
  ConfigurationPolicyGroupsCreateOrUpdateOptionalParams,
  ConfigurationPolicyGroupsGetOptionalParams,
} from "../../api/configurationPolicyGroups/options.js";
import type { VpnServerConfigurationPolicyGroup } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConfigurationPolicyGroups operations. */
export interface ConfigurationPolicyGroupsOperations {
  /** Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration. */
  listByVpnServerConfiguration: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    options?: ConfigurationPolicyGroupsListByVpnServerConfigurationOptionalParams,
  ) => PagedAsyncIterableIterator<VpnServerConfigurationPolicyGroup>;
  /** Deletes a ConfigurationPolicyGroup. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    configurationPolicyGroupName: string,
    options?: ConfigurationPolicyGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    configurationPolicyGroupName: string,
    options?: ConfigurationPolicyGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    configurationPolicyGroupName: string,
    options?: ConfigurationPolicyGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    configurationPolicyGroupName: string,
    vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup,
    options?: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<VpnServerConfigurationPolicyGroup>,
    VpnServerConfigurationPolicyGroup
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    configurationPolicyGroupName: string,
    vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup,
    options?: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VpnServerConfigurationPolicyGroup>,
      VpnServerConfigurationPolicyGroup
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    configurationPolicyGroupName: string,
    vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup,
    options?: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams,
  ) => Promise<VpnServerConfigurationPolicyGroup>;
  /** Retrieves the details of a ConfigurationPolicyGroup. */
  get: (
    resourceGroupName: string,
    vpnServerConfigurationName: string,
    configurationPolicyGroupName: string,
    options?: ConfigurationPolicyGroupsGetOptionalParams,
  ) => Promise<VpnServerConfigurationPolicyGroup>;
}

function _getConfigurationPolicyGroups(context: NetworkManagementContext) {
  return {
    listByVpnServerConfiguration: (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      options?: ConfigurationPolicyGroupsListByVpnServerConfigurationOptionalParams,
    ) =>
      listByVpnServerConfiguration(context, resourceGroupName, vpnServerConfigurationName, options),
    delete: (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      configurationPolicyGroupName: string,
      options?: ConfigurationPolicyGroupsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        configurationPolicyGroupName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      configurationPolicyGroupName: string,
      options?: ConfigurationPolicyGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        configurationPolicyGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      configurationPolicyGroupName: string,
      options?: ConfigurationPolicyGroupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        configurationPolicyGroupName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      configurationPolicyGroupName: string,
      vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup,
      options?: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        configurationPolicyGroupName,
        vpnServerConfigurationPolicyGroupParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      configurationPolicyGroupName: string,
      vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup,
      options?: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        configurationPolicyGroupName,
        vpnServerConfigurationPolicyGroupParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      configurationPolicyGroupName: string,
      vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup,
      options?: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        configurationPolicyGroupName,
        vpnServerConfigurationPolicyGroupParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      vpnServerConfigurationName: string,
      configurationPolicyGroupName: string,
      options?: ConfigurationPolicyGroupsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        configurationPolicyGroupName,
        options,
      ),
  };
}

export function _getConfigurationPolicyGroupsOperations(
  context: NetworkManagementContext,
): ConfigurationPolicyGroupsOperations {
  return {
    ..._getConfigurationPolicyGroups(context),
  };
}
