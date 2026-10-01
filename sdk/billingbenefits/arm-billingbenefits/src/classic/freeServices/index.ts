// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/freeServices/operations.js";
import {
  FreeServicesListBySubscriptionOptionalParams,
  FreeServicesListByResourceGroupOptionalParams,
  FreeServicesDeleteOptionalParams,
  FreeServicesUpdateOptionalParams,
  FreeServicesCreateOptionalParams,
  FreeServicesGetOptionalParams,
} from "../../api/freeServices/options.js";
import { FreeServices, FreeServicesPatchRequest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FreeServices operations. */
export interface FreeServicesOperations {
  /** This operation lists free services that are available under the specified subscription. */
  listBySubscription: (
    options?: FreeServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<FreeServices>;
  /** This operation lists the free services that are available under the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FreeServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<FreeServices>;
  /** This operation deletes free services from the subscription. Only free services that are in an expired or cancelled states can be deleted. */
  delete: (
    resourceGroupName: string,
    freeServiceName: string,
    options?: FreeServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    freeServiceName: string,
    options?: FreeServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    freeServiceName: string,
    options?: FreeServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** This operation updates free services in Azure. */
  update: (
    resourceGroupName: string,
    freeServiceName: string,
    body: FreeServicesPatchRequest,
    options?: FreeServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<FreeServices>, FreeServices>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    freeServiceName: string,
    body: FreeServicesPatchRequest,
    options?: FreeServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FreeServices>, FreeServices>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    freeServiceName: string,
    body: FreeServicesPatchRequest,
    options?: FreeServicesUpdateOptionalParams,
  ) => Promise<FreeServices>;
  /** This operation creates or updates free services in Azure */
  create: (
    resourceGroupName: string,
    freeServiceName: string,
    body: FreeServices,
    options?: FreeServicesCreateOptionalParams,
  ) => PollerLike<OperationState<FreeServices>, FreeServices>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    freeServiceName: string,
    body: FreeServices,
    options?: FreeServicesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FreeServices>, FreeServices>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    freeServiceName: string,
    body: FreeServices,
    options?: FreeServicesCreateOptionalParams,
  ) => Promise<FreeServices>;
  /** This operation retrieves properties for free services. */
  get: (
    resourceGroupName: string,
    freeServiceName: string,
    options?: FreeServicesGetOptionalParams,
  ) => Promise<FreeServices>;
}

function _getFreeServices(context: BillingBenefitsRPContext) {
  return {
    listBySubscription: (options?: FreeServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FreeServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      freeServiceName: string,
      options?: FreeServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, freeServiceName, options),
    beginDelete: async (
      resourceGroupName: string,
      freeServiceName: string,
      options?: FreeServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, freeServiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      freeServiceName: string,
      options?: FreeServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, freeServiceName, options);
    },
    update: (
      resourceGroupName: string,
      freeServiceName: string,
      body: FreeServicesPatchRequest,
      options?: FreeServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, freeServiceName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      freeServiceName: string,
      body: FreeServicesPatchRequest,
      options?: FreeServicesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, freeServiceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      freeServiceName: string,
      body: FreeServicesPatchRequest,
      options?: FreeServicesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, freeServiceName, body, options);
    },
    create: (
      resourceGroupName: string,
      freeServiceName: string,
      body: FreeServices,
      options?: FreeServicesCreateOptionalParams,
    ) => create(context, resourceGroupName, freeServiceName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      freeServiceName: string,
      body: FreeServices,
      options?: FreeServicesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, freeServiceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      freeServiceName: string,
      body: FreeServices,
      options?: FreeServicesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, freeServiceName, body, options);
    },
    get: (
      resourceGroupName: string,
      freeServiceName: string,
      options?: FreeServicesGetOptionalParams,
    ) => get(context, resourceGroupName, freeServiceName, options),
  };
}

export function _getFreeServicesOperations(
  context: BillingBenefitsRPContext,
): FreeServicesOperations {
  return {
    ..._getFreeServices(context),
  };
}
