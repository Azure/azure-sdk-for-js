// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  unauthorizePartner,
  authorizePartner,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/partnerConfigurations/operations.js";
import type {
  PartnerConfigurationsUnauthorizePartnerOptionalParams,
  PartnerConfigurationsAuthorizePartnerOptionalParams,
  PartnerConfigurationsListBySubscriptionOptionalParams,
  PartnerConfigurationsListByResourceGroupOptionalParams,
  PartnerConfigurationsDeleteOptionalParams,
  PartnerConfigurationsUpdateOptionalParams,
  PartnerConfigurationsCreateOrUpdateOptionalParams,
  PartnerConfigurationsGetOptionalParams,
} from "../../api/partnerConfigurations/options.js";
import type {
  PartnerConfiguration,
  Partner,
  PartnerConfigurationUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PartnerConfigurations operations. */
export interface PartnerConfigurationsOperations {
  /** Unauthorize a single partner either by partner registration immutable Id or by partner name. */
  unauthorizePartner: (
    resourceGroupName: string,
    partnerInfo: Partner,
    options?: PartnerConfigurationsUnauthorizePartnerOptionalParams,
  ) => Promise<PartnerConfiguration>;
  /** Authorize a single partner either by partner registration immutable Id or by partner name. */
  authorizePartner: (
    resourceGroupName: string,
    partnerInfo: Partner,
    options?: PartnerConfigurationsAuthorizePartnerOptionalParams,
  ) => Promise<PartnerConfiguration>;
  /** List all the partner configurations under an Azure subscription. */
  listBySubscription: (
    options?: PartnerConfigurationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerConfiguration>;
  /** List all the partner configurations under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PartnerConfigurationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerConfiguration>;
  /** Delete existing partner configuration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    options?: PartnerConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    options?: PartnerConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    options?: PartnerConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Synchronously updates a partner configuration with the specified parameters. */
  update: (
    resourceGroupName: string,
    partnerConfigurationUpdateParameters: PartnerConfigurationUpdateParameters,
    options?: PartnerConfigurationsUpdateOptionalParams,
  ) => PollerLike<OperationState<PartnerConfiguration>, PartnerConfiguration>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    partnerConfigurationUpdateParameters: PartnerConfigurationUpdateParameters,
    options?: PartnerConfigurationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PartnerConfiguration>, PartnerConfiguration>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    partnerConfigurationUpdateParameters: PartnerConfigurationUpdateParameters,
    options?: PartnerConfigurationsUpdateOptionalParams,
  ) => Promise<PartnerConfiguration>;
  /** Synchronously creates or updates a partner configuration with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    partnerConfigurationInfo: PartnerConfiguration,
    options?: PartnerConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PartnerConfiguration>, PartnerConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    partnerConfigurationInfo: PartnerConfiguration,
    options?: PartnerConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PartnerConfiguration>, PartnerConfiguration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    partnerConfigurationInfo: PartnerConfiguration,
    options?: PartnerConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<PartnerConfiguration>;
  /** Get properties of a partner configuration. */
  get: (
    resourceGroupName: string,
    options?: PartnerConfigurationsGetOptionalParams,
  ) => Promise<PartnerConfiguration>;
}

function _getPartnerConfigurations(context: EventGridManagementContext) {
  return {
    unauthorizePartner: (
      resourceGroupName: string,
      partnerInfo: Partner,
      options?: PartnerConfigurationsUnauthorizePartnerOptionalParams,
    ) => unauthorizePartner(context, resourceGroupName, partnerInfo, options),
    authorizePartner: (
      resourceGroupName: string,
      partnerInfo: Partner,
      options?: PartnerConfigurationsAuthorizePartnerOptionalParams,
    ) => authorizePartner(context, resourceGroupName, partnerInfo, options),
    listBySubscription: (options?: PartnerConfigurationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PartnerConfigurationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, options?: PartnerConfigurationsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      options?: PartnerConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      options?: PartnerConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, options);
    },
    update: (
      resourceGroupName: string,
      partnerConfigurationUpdateParameters: PartnerConfigurationUpdateParameters,
      options?: PartnerConfigurationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, partnerConfigurationUpdateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      partnerConfigurationUpdateParameters: PartnerConfigurationUpdateParameters,
      options?: PartnerConfigurationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        partnerConfigurationUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      partnerConfigurationUpdateParameters: PartnerConfigurationUpdateParameters,
      options?: PartnerConfigurationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        partnerConfigurationUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      partnerConfigurationInfo: PartnerConfiguration,
      options?: PartnerConfigurationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, partnerConfigurationInfo, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      partnerConfigurationInfo: PartnerConfiguration,
      options?: PartnerConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, partnerConfigurationInfo, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      partnerConfigurationInfo: PartnerConfiguration,
      options?: PartnerConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, partnerConfigurationInfo, options);
    },
    get: (resourceGroupName: string, options?: PartnerConfigurationsGetOptionalParams) =>
      get(context, resourceGroupName, options),
  };
}

export function _getPartnerConfigurationsOperations(
  context: EventGridManagementContext,
): PartnerConfigurationsOperations {
  return {
    ..._getPartnerConfigurations(context),
  };
}
