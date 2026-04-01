// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  validateConfiguration,
  resync,
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkTapRules/operations.js";
import type {
  NetworkTapRulesValidateConfigurationOptionalParams,
  NetworkTapRulesResyncOptionalParams,
  NetworkTapRulesUpdateAdministrativeStateOptionalParams,
  NetworkTapRulesListBySubscriptionOptionalParams,
  NetworkTapRulesListByResourceGroupOptionalParams,
  NetworkTapRulesDeleteOptionalParams,
  NetworkTapRulesUpdateOptionalParams,
  NetworkTapRulesCreateOptionalParams,
  NetworkTapRulesGetOptionalParams,
} from "../../api/networkTapRules/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  NetworkTapRule,
  NetworkTapRulePatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkTapRules operations. */
export interface NetworkTapRulesOperations {
  /** Implements the operation to the underlying resources. */
  validateConfiguration: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfiguration: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesValidateConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>
  >;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfigurationAndWait: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesValidateConfigurationOptionalParams,
  ) => Promise<ValidateConfigurationResponse>;
  /** Implements the operation to the underlying resources. */
  resync: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesResyncOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** @deprecated use resync instead */
  beginResync: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesResyncOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForStateUpdate>,
      CommonPostActionResponseForStateUpdate
    >
  >;
  /** @deprecated use resync instead */
  beginResyncAndWait: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesResyncOptionalParams,
  ) => Promise<CommonPostActionResponseForStateUpdate>;
  /** Implements the operation to the underlying resources. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: UpdateAdministrativeState,
    options?: NetworkTapRulesUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: UpdateAdministrativeState,
    options?: NetworkTapRulesUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForStateUpdate>,
      CommonPostActionResponseForStateUpdate
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: UpdateAdministrativeState,
    options?: NetworkTapRulesUpdateAdministrativeStateOptionalParams,
  ) => Promise<CommonPostActionResponseForStateUpdate>;
  /** List all the Network Tap Rule resources in the given subscription. */
  listBySubscription: (
    options?: NetworkTapRulesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkTapRule>;
  /** List all the Network Tap Rule resources in the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkTapRulesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkTapRule>;
  /** Delete Network Tap Rule resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update certain properties of the Network Tap Rule resource. */
  update: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: NetworkTapRulePatch,
    options?: NetworkTapRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkTapRule>, NetworkTapRule>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: NetworkTapRulePatch,
    options?: NetworkTapRulesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkTapRule>, NetworkTapRule>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: NetworkTapRulePatch,
    options?: NetworkTapRulesUpdateOptionalParams,
  ) => Promise<NetworkTapRule>;
  /** Create Network Tap Rule resource. */
  create: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: NetworkTapRule,
    options?: NetworkTapRulesCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkTapRule>, NetworkTapRule>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: NetworkTapRule,
    options?: NetworkTapRulesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkTapRule>, NetworkTapRule>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkTapRuleName: string,
    body: NetworkTapRule,
    options?: NetworkTapRulesCreateOptionalParams,
  ) => Promise<NetworkTapRule>;
  /** Get Network Tap Rule resource details. */
  get: (
    resourceGroupName: string,
    networkTapRuleName: string,
    options?: NetworkTapRulesGetOptionalParams,
  ) => Promise<NetworkTapRule>;
}

function _getNetworkTapRules(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    validateConfiguration: (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, networkTapRuleName, options),
    beginValidateConfiguration: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesValidateConfigurationOptionalParams,
    ) => {
      const poller = validateConfiguration(context, resourceGroupName, networkTapRuleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateConfigurationAndWait: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesValidateConfigurationOptionalParams,
    ) => {
      return await validateConfiguration(context, resourceGroupName, networkTapRuleName, options);
    },
    resync: (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesResyncOptionalParams,
    ) => resync(context, resourceGroupName, networkTapRuleName, options),
    beginResync: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesResyncOptionalParams,
    ) => {
      const poller = resync(context, resourceGroupName, networkTapRuleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncAndWait: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesResyncOptionalParams,
    ) => {
      return await resync(context, resourceGroupName, networkTapRuleName, options);
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: UpdateAdministrativeState,
      options?: NetworkTapRulesUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, networkTapRuleName, body, options),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: UpdateAdministrativeState,
      options?: NetworkTapRulesUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        networkTapRuleName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: UpdateAdministrativeState,
      options?: NetworkTapRulesUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        networkTapRuleName,
        body,
        options,
      );
    },
    listBySubscription: (options?: NetworkTapRulesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkTapRulesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkTapRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkTapRuleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkTapRuleName, options);
    },
    update: (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: NetworkTapRulePatch,
      options?: NetworkTapRulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkTapRuleName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: NetworkTapRulePatch,
      options?: NetworkTapRulesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkTapRuleName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: NetworkTapRulePatch,
      options?: NetworkTapRulesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkTapRuleName, body, options);
    },
    create: (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: NetworkTapRule,
      options?: NetworkTapRulesCreateOptionalParams,
    ) => create(context, resourceGroupName, networkTapRuleName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: NetworkTapRule,
      options?: NetworkTapRulesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, networkTapRuleName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkTapRuleName: string,
      body: NetworkTapRule,
      options?: NetworkTapRulesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkTapRuleName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkTapRuleName: string,
      options?: NetworkTapRulesGetOptionalParams,
    ) => get(context, resourceGroupName, networkTapRuleName, options),
  };
}

export function _getNetworkTapRulesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkTapRulesOperations {
  return {
    ..._getNetworkTapRules(context),
  };
}
