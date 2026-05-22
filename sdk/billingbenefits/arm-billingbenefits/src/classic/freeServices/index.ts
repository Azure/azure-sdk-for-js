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
  /** This operation updates free services in Azure. */
  update: (
    resourceGroupName: string,
    freeServiceName: string,
    body: FreeServicesPatchRequest,
    options?: FreeServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<FreeServices>, FreeServices>;
  /** This operation creates or updates free services in Azure */
  create: (
    resourceGroupName: string,
    freeServiceName: string,
    body: FreeServices,
    options?: FreeServicesCreateOptionalParams,
  ) => PollerLike<OperationState<FreeServices>, FreeServices>;
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
    update: (
      resourceGroupName: string,
      freeServiceName: string,
      body: FreeServicesPatchRequest,
      options?: FreeServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, freeServiceName, body, options),
    create: (
      resourceGroupName: string,
      freeServiceName: string,
      body: FreeServices,
      options?: FreeServicesCreateOptionalParams,
    ) => create(context, resourceGroupName, freeServiceName, body, options),
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
