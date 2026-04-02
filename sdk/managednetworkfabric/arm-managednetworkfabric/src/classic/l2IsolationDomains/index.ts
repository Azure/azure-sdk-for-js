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
} from "../../api/l2IsolationDomains/operations.js";
import type {
  L2IsolationDomainsCommitConfigurationOptionalParams,
  L2IsolationDomainsValidateConfigurationOptionalParams,
  L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
  L2IsolationDomainsListBySubscriptionOptionalParams,
  L2IsolationDomainsListByResourceGroupOptionalParams,
  L2IsolationDomainsDeleteOptionalParams,
  L2IsolationDomainsUpdateOptionalParams,
  L2IsolationDomainsCreateOptionalParams,
  L2IsolationDomainsGetOptionalParams,
} from "../../api/l2IsolationDomains/options.js";
import type {
  UpdateAdministrativeState,
  UpdateAdministrativeStateResponse,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  L2IsolationDomain,
  L2IsolationDomainPatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a L2IsolationDomains operations. */
export interface L2IsolationDomainsOperations {
  /** Commits the configuration of the given resources. */
  commitConfiguration: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsCommitConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** @deprecated use commitConfiguration instead */
  beginCommitConfiguration: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsCommitConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForStateUpdate>,
      CommonPostActionResponseForStateUpdate
    >
  >;
  /** @deprecated use commitConfiguration instead */
  beginCommitConfigurationAndWait: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsCommitConfigurationOptionalParams,
  ) => Promise<CommonPostActionResponseForStateUpdate>;
  /** Validates the configuration of the resources. */
  validateConfiguration: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfiguration: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsValidateConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>
  >;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfigurationAndWait: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsValidateConfigurationOptionalParams,
  ) => Promise<ValidateConfigurationResponse>;
  /** Enables isolation domain across the fabric or on specified racks. */
  updateAdministrativeState: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: UpdateAdministrativeState,
    options?: L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: UpdateAdministrativeState,
    options?: L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: UpdateAdministrativeState,
    options?: L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
  /** Displays L2IsolationDomains list by subscription GET method. */
  listBySubscription: (
    options?: L2IsolationDomainsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<L2IsolationDomain>;
  /** Displays L2IsolationDomains list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: L2IsolationDomainsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<L2IsolationDomain>;
  /** Deletes layer 2 connectivity between compute nodes by managed by named L2 Isolation name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the L2 Isolation Domain resource. */
  update: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: L2IsolationDomainPatch,
    options?: L2IsolationDomainsUpdateOptionalParams,
  ) => PollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: L2IsolationDomainPatch,
    options?: L2IsolationDomainsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: L2IsolationDomainPatch,
    options?: L2IsolationDomainsUpdateOptionalParams,
  ) => Promise<L2IsolationDomain>;
  /** Creates layer 2 network connectivity between compute nodes within a rack and across racks.The configuration is applied on the devices only after the isolation domain is enabled. */
  create: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: L2IsolationDomain,
    options?: L2IsolationDomainsCreateOptionalParams,
  ) => PollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: L2IsolationDomain,
    options?: L2IsolationDomainsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<L2IsolationDomain>, L2IsolationDomain>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    body: L2IsolationDomain,
    options?: L2IsolationDomainsCreateOptionalParams,
  ) => Promise<L2IsolationDomain>;
  /** Implements L2 Isolation Domain GET method. */
  get: (
    resourceGroupName: string,
    l2IsolationDomainName: string,
    options?: L2IsolationDomainsGetOptionalParams,
  ) => Promise<L2IsolationDomain>;
}

function _getL2IsolationDomains(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    commitConfiguration: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsCommitConfigurationOptionalParams,
    ) => commitConfiguration(context, resourceGroupName, l2IsolationDomainName, options),
    beginCommitConfiguration: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsCommitConfigurationOptionalParams,
    ) => {
      const poller = commitConfiguration(
        context,
        resourceGroupName,
        l2IsolationDomainName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCommitConfigurationAndWait: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsCommitConfigurationOptionalParams,
    ) => {
      return await commitConfiguration(context, resourceGroupName, l2IsolationDomainName, options);
    },
    validateConfiguration: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, l2IsolationDomainName, options),
    beginValidateConfiguration: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsValidateConfigurationOptionalParams,
    ) => {
      const poller = validateConfiguration(
        context,
        resourceGroupName,
        l2IsolationDomainName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateConfigurationAndWait: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsValidateConfigurationOptionalParams,
    ) => {
      return await validateConfiguration(
        context,
        resourceGroupName,
        l2IsolationDomainName,
        options,
      );
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: UpdateAdministrativeState,
      options?: L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(context, resourceGroupName, l2IsolationDomainName, body, options),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: UpdateAdministrativeState,
      options?: L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        l2IsolationDomainName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: UpdateAdministrativeState,
      options?: L2IsolationDomainsUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        l2IsolationDomainName,
        body,
        options,
      );
    },
    listBySubscription: (options?: L2IsolationDomainsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: L2IsolationDomainsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, l2IsolationDomainName, options),
    beginDelete: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, l2IsolationDomainName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, l2IsolationDomainName, options);
    },
    update: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: L2IsolationDomainPatch,
      options?: L2IsolationDomainsUpdateOptionalParams,
    ) => update(context, resourceGroupName, l2IsolationDomainName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: L2IsolationDomainPatch,
      options?: L2IsolationDomainsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, l2IsolationDomainName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: L2IsolationDomainPatch,
      options?: L2IsolationDomainsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, l2IsolationDomainName, body, options);
    },
    create: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: L2IsolationDomain,
      options?: L2IsolationDomainsCreateOptionalParams,
    ) => create(context, resourceGroupName, l2IsolationDomainName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: L2IsolationDomain,
      options?: L2IsolationDomainsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, l2IsolationDomainName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      body: L2IsolationDomain,
      options?: L2IsolationDomainsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, l2IsolationDomainName, body, options);
    },
    get: (
      resourceGroupName: string,
      l2IsolationDomainName: string,
      options?: L2IsolationDomainsGetOptionalParams,
    ) => get(context, resourceGroupName, l2IsolationDomainName, options),
  };
}

export function _getL2IsolationDomainsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): L2IsolationDomainsOperations {
  return {
    ..._getL2IsolationDomains(context),
  };
}
