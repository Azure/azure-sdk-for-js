// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  commitConfiguration,
  validateConfiguration,
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/routePolicies/operations.js";
import type {
  RoutePoliciesCommitConfigurationOptionalParams,
  RoutePoliciesValidateConfigurationOptionalParams,
  RoutePoliciesUpdateAdministrativeStateOptionalParams,
  RoutePoliciesListBySubscriptionOptionalParams,
  RoutePoliciesListByResourceGroupOptionalParams,
  RoutePoliciesDeleteOptionalParams,
  RoutePoliciesUpdateOptionalParams,
  RoutePoliciesCreateOptionalParams,
  RoutePoliciesGetOptionalParams,
} from "../../api/routePolicies/options.js";
import type {
  UpdateAdministrativeState,
  UpdateAdministrativeStateResponse,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  RoutePolicy,
  RoutePolicyPatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RoutePolicies operations. */
export interface RoutePoliciesOperations {
  /** Commits the configuration of the given resources. */
  commitConfiguration: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesCommitConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** @deprecated use commitConfiguration instead */
  beginCommitConfiguration: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesCommitConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForStateUpdate>,
      CommonPostActionResponseForStateUpdate
    >
  >;
  /** @deprecated use commitConfiguration instead */
  beginCommitConfigurationAndWait: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesCommitConfigurationOptionalParams,
  ) => Promise<CommonPostActionResponseForStateUpdate>;
  /** Validates the configuration of the resources. */
  validateConfiguration: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfiguration: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesValidateConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>
  >;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfigurationAndWait: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesValidateConfigurationOptionalParams,
  ) => Promise<ValidateConfigurationResponse>;
  /** Updated the admin state for this Route Policy. */
  updateAdministrativeState: (
    resourceGroupName: string,
    routePolicyName: string,
    body: UpdateAdministrativeState,
    options?: RoutePoliciesUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    routePolicyName: string,
    body: UpdateAdministrativeState,
    options?: RoutePoliciesUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    routePolicyName: string,
    body: UpdateAdministrativeState,
    options?: RoutePoliciesUpdateAdministrativeStateOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
  /** Implements RoutePolicies list by subscription GET method. */
  listBySubscription: (
    options?: RoutePoliciesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<RoutePolicy>;
  /** Implements RoutePolicies list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: RoutePoliciesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<RoutePolicy>;
  /** Implements Route Policy DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the Route Policy resource. */
  update: (
    resourceGroupName: string,
    routePolicyName: string,
    body: RoutePolicyPatch,
    options?: RoutePoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<RoutePolicy>, RoutePolicy>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    routePolicyName: string,
    body: RoutePolicyPatch,
    options?: RoutePoliciesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RoutePolicy>, RoutePolicy>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    routePolicyName: string,
    body: RoutePolicyPatch,
    options?: RoutePoliciesUpdateOptionalParams,
  ) => Promise<RoutePolicy>;
  /** Implements Route Policy PUT method. */
  create: (
    resourceGroupName: string,
    routePolicyName: string,
    body: RoutePolicy,
    options?: RoutePoliciesCreateOptionalParams,
  ) => PollerLike<OperationState<RoutePolicy>, RoutePolicy>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    routePolicyName: string,
    body: RoutePolicy,
    options?: RoutePoliciesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RoutePolicy>, RoutePolicy>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    routePolicyName: string,
    body: RoutePolicy,
    options?: RoutePoliciesCreateOptionalParams,
  ) => Promise<RoutePolicy>;
  /** Implements Route Policy GET method. */
  get: (
    resourceGroupName: string,
    routePolicyName: string,
    options?: RoutePoliciesGetOptionalParams,
  ) => Promise<RoutePolicy>;
}

function _getRoutePolicies(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    commitConfiguration: (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesCommitConfigurationOptionalParams,
    ) => commitConfiguration(context, resourceGroupName, routePolicyName, options),
    beginCommitConfiguration: async (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesCommitConfigurationOptionalParams,
    ) => {
      const poller = commitConfiguration(context, resourceGroupName, routePolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCommitConfigurationAndWait: async (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesCommitConfigurationOptionalParams,
    ) => {
      return await commitConfiguration(context, resourceGroupName, routePolicyName, options);
    },
    validateConfiguration: (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, routePolicyName, options),
    beginValidateConfiguration: async (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesValidateConfigurationOptionalParams,
    ) => {
      const poller = validateConfiguration(context, resourceGroupName, routePolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateConfigurationAndWait: async (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesValidateConfigurationOptionalParams,
    ) => {
      return await validateConfiguration(context, resourceGroupName, routePolicyName, options);
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      routePolicyName: string,
      body: UpdateAdministrativeState,
      options?: RoutePoliciesUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, routePolicyName, body, options),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      routePolicyName: string,
      body: UpdateAdministrativeState,
      options?: RoutePoliciesUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        routePolicyName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      routePolicyName: string,
      body: UpdateAdministrativeState,
      options?: RoutePoliciesUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        routePolicyName,
        body,
        options,
      );
    },
    listBySubscription: (options?: RoutePoliciesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: RoutePoliciesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, routePolicyName, options),
    beginDelete: async (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, routePolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, routePolicyName, options);
    },
    update: (
      resourceGroupName: string,
      routePolicyName: string,
      body: RoutePolicyPatch,
      options?: RoutePoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, routePolicyName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      routePolicyName: string,
      body: RoutePolicyPatch,
      options?: RoutePoliciesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, routePolicyName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      routePolicyName: string,
      body: RoutePolicyPatch,
      options?: RoutePoliciesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, routePolicyName, body, options);
    },
    create: (
      resourceGroupName: string,
      routePolicyName: string,
      body: RoutePolicy,
      options?: RoutePoliciesCreateOptionalParams,
    ) => create(context, resourceGroupName, routePolicyName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      routePolicyName: string,
      body: RoutePolicy,
      options?: RoutePoliciesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, routePolicyName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      routePolicyName: string,
      body: RoutePolicy,
      options?: RoutePoliciesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, routePolicyName, body, options);
    },
    get: (
      resourceGroupName: string,
      routePolicyName: string,
      options?: RoutePoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, routePolicyName, options),
  };
}

export function _getRoutePoliciesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): RoutePoliciesOperations {
  return {
    ..._getRoutePolicies(context),
  };
}
