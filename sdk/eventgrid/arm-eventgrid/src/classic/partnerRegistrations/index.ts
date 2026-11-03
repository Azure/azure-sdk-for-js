// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/partnerRegistrations/operations.js";
import type {
  PartnerRegistrationsListBySubscriptionOptionalParams,
  PartnerRegistrationsListByResourceGroupOptionalParams,
  PartnerRegistrationsDeleteOptionalParams,
  PartnerRegistrationsUpdateOptionalParams,
  PartnerRegistrationsCreateOrUpdateOptionalParams,
  PartnerRegistrationsGetOptionalParams,
} from "../../api/partnerRegistrations/options.js";
import type {
  PartnerRegistration,
  PartnerRegistrationUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PartnerRegistrations operations. */
export interface PartnerRegistrationsOperations {
  /** List all the partner registrations under an Azure subscription. */
  listBySubscription: (
    options?: PartnerRegistrationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerRegistration>;
  /** List all the partner registrations under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PartnerRegistrationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerRegistration>;
  /** Deletes a partner registration with the specified parameters. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    options?: PartnerRegistrationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    options?: PartnerRegistrationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    options?: PartnerRegistrationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a partner registration with the specified parameters. */
  update: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    partnerRegistrationUpdateParameters: PartnerRegistrationUpdateParameters,
    options?: PartnerRegistrationsUpdateOptionalParams,
  ) => PollerLike<OperationState<PartnerRegistration>, PartnerRegistration>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    partnerRegistrationUpdateParameters: PartnerRegistrationUpdateParameters,
    options?: PartnerRegistrationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PartnerRegistration>, PartnerRegistration>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    partnerRegistrationUpdateParameters: PartnerRegistrationUpdateParameters,
    options?: PartnerRegistrationsUpdateOptionalParams,
  ) => Promise<PartnerRegistration>;
  /** Creates a new partner registration with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    partnerRegistrationInfo: PartnerRegistration,
    options?: PartnerRegistrationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PartnerRegistration>, PartnerRegistration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    partnerRegistrationInfo: PartnerRegistration,
    options?: PartnerRegistrationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PartnerRegistration>, PartnerRegistration>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    partnerRegistrationInfo: PartnerRegistration,
    options?: PartnerRegistrationsCreateOrUpdateOptionalParams,
  ) => Promise<PartnerRegistration>;
  /** Gets a partner registration with the specified parameters. */
  get: (
    resourceGroupName: string,
    partnerRegistrationName: string,
    options?: PartnerRegistrationsGetOptionalParams,
  ) => Promise<PartnerRegistration>;
}

function _getPartnerRegistrations(context: EventGridManagementContext) {
  return {
    listBySubscription: (options?: PartnerRegistrationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PartnerRegistrationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      partnerRegistrationName: string,
      options?: PartnerRegistrationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, partnerRegistrationName, options),
    beginDelete: async (
      resourceGroupName: string,
      partnerRegistrationName: string,
      options?: PartnerRegistrationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, partnerRegistrationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      partnerRegistrationName: string,
      options?: PartnerRegistrationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, partnerRegistrationName, options);
    },
    update: (
      resourceGroupName: string,
      partnerRegistrationName: string,
      partnerRegistrationUpdateParameters: PartnerRegistrationUpdateParameters,
      options?: PartnerRegistrationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        partnerRegistrationName,
        partnerRegistrationUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      partnerRegistrationName: string,
      partnerRegistrationUpdateParameters: PartnerRegistrationUpdateParameters,
      options?: PartnerRegistrationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        partnerRegistrationName,
        partnerRegistrationUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      partnerRegistrationName: string,
      partnerRegistrationUpdateParameters: PartnerRegistrationUpdateParameters,
      options?: PartnerRegistrationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        partnerRegistrationName,
        partnerRegistrationUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      partnerRegistrationName: string,
      partnerRegistrationInfo: PartnerRegistration,
      options?: PartnerRegistrationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        partnerRegistrationName,
        partnerRegistrationInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      partnerRegistrationName: string,
      partnerRegistrationInfo: PartnerRegistration,
      options?: PartnerRegistrationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        partnerRegistrationName,
        partnerRegistrationInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      partnerRegistrationName: string,
      partnerRegistrationInfo: PartnerRegistration,
      options?: PartnerRegistrationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        partnerRegistrationName,
        partnerRegistrationInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      partnerRegistrationName: string,
      options?: PartnerRegistrationsGetOptionalParams,
    ) => get(context, resourceGroupName, partnerRegistrationName, options),
  };
}

export function _getPartnerRegistrationsOperations(
  context: EventGridManagementContext,
): PartnerRegistrationsOperations {
  return {
    ..._getPartnerRegistrations(context),
  };
}
