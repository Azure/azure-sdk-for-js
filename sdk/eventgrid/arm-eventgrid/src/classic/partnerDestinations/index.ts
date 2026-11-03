// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  activate,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/partnerDestinations/operations.js";
import type {
  PartnerDestinationsActivateOptionalParams,
  PartnerDestinationsListBySubscriptionOptionalParams,
  PartnerDestinationsListByResourceGroupOptionalParams,
  PartnerDestinationsDeleteOptionalParams,
  PartnerDestinationsUpdateOptionalParams,
  PartnerDestinationsCreateOrUpdateOptionalParams,
  PartnerDestinationsGetOptionalParams,
} from "../../api/partnerDestinations/options.js";
import type {
  PartnerDestination,
  PartnerDestinationUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PartnerDestinations operations. */
export interface PartnerDestinationsOperations {
  /** Activate a newly created partner destination. */
  activate: (
    resourceGroupName: string,
    partnerDestinationName: string,
    options?: PartnerDestinationsActivateOptionalParams,
  ) => Promise<PartnerDestination>;
  /** List all the partner destinations under an Azure subscription. */
  listBySubscription: (
    options?: PartnerDestinationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerDestination>;
  /** List all the partner destinations under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PartnerDestinationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerDestination>;
  /** Delete existing partner destination. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    partnerDestinationName: string,
    options?: PartnerDestinationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    partnerDestinationName: string,
    options?: PartnerDestinationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    partnerDestinationName: string,
    options?: PartnerDestinationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Asynchronously updates a partner destination with the specified parameters. */
  update: (
    resourceGroupName: string,
    partnerDestinationName: string,
    partnerDestinationUpdateParameters: PartnerDestinationUpdateParameters,
    options?: PartnerDestinationsUpdateOptionalParams,
  ) => PollerLike<OperationState<PartnerDestination>, PartnerDestination>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    partnerDestinationName: string,
    partnerDestinationUpdateParameters: PartnerDestinationUpdateParameters,
    options?: PartnerDestinationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PartnerDestination>, PartnerDestination>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    partnerDestinationName: string,
    partnerDestinationUpdateParameters: PartnerDestinationUpdateParameters,
    options?: PartnerDestinationsUpdateOptionalParams,
  ) => Promise<PartnerDestination>;
  /** Asynchronously creates a new partner destination with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    partnerDestinationName: string,
    partnerDestination: PartnerDestination,
    options?: PartnerDestinationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PartnerDestination>, PartnerDestination>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    partnerDestinationName: string,
    partnerDestination: PartnerDestination,
    options?: PartnerDestinationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PartnerDestination>, PartnerDestination>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    partnerDestinationName: string,
    partnerDestination: PartnerDestination,
    options?: PartnerDestinationsCreateOrUpdateOptionalParams,
  ) => Promise<PartnerDestination>;
  /** Get properties of a partner destination. */
  get: (
    resourceGroupName: string,
    partnerDestinationName: string,
    options?: PartnerDestinationsGetOptionalParams,
  ) => Promise<PartnerDestination>;
}

function _getPartnerDestinations(context: EventGridManagementContext) {
  return {
    activate: (
      resourceGroupName: string,
      partnerDestinationName: string,
      options?: PartnerDestinationsActivateOptionalParams,
    ) => activate(context, resourceGroupName, partnerDestinationName, options),
    listBySubscription: (options?: PartnerDestinationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PartnerDestinationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      partnerDestinationName: string,
      options?: PartnerDestinationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, partnerDestinationName, options),
    beginDelete: async (
      resourceGroupName: string,
      partnerDestinationName: string,
      options?: PartnerDestinationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, partnerDestinationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      partnerDestinationName: string,
      options?: PartnerDestinationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, partnerDestinationName, options);
    },
    update: (
      resourceGroupName: string,
      partnerDestinationName: string,
      partnerDestinationUpdateParameters: PartnerDestinationUpdateParameters,
      options?: PartnerDestinationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        partnerDestinationName,
        partnerDestinationUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      partnerDestinationName: string,
      partnerDestinationUpdateParameters: PartnerDestinationUpdateParameters,
      options?: PartnerDestinationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        partnerDestinationName,
        partnerDestinationUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      partnerDestinationName: string,
      partnerDestinationUpdateParameters: PartnerDestinationUpdateParameters,
      options?: PartnerDestinationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        partnerDestinationName,
        partnerDestinationUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      partnerDestinationName: string,
      partnerDestination: PartnerDestination,
      options?: PartnerDestinationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        partnerDestinationName,
        partnerDestination,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      partnerDestinationName: string,
      partnerDestination: PartnerDestination,
      options?: PartnerDestinationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        partnerDestinationName,
        partnerDestination,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      partnerDestinationName: string,
      partnerDestination: PartnerDestination,
      options?: PartnerDestinationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        partnerDestinationName,
        partnerDestination,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      partnerDestinationName: string,
      options?: PartnerDestinationsGetOptionalParams,
    ) => get(context, resourceGroupName, partnerDestinationName, options),
  };
}

export function _getPartnerDestinationsOperations(
  context: EventGridManagementContext,
): PartnerDestinationsOperations {
  return {
    ..._getPartnerDestinations(context),
  };
}
