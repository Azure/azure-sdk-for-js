// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignContext } from "../../api/sovereignContext.js";
import {
  landingZoneAccountOperationsListBySubscription,
  landingZoneAccountOperationsListByResourceGroup,
  landingZoneAccountOperationsDelete,
  landingZoneAccountOperationsUpdate,
  landingZoneAccountOperationsCreate,
  landingZoneAccountOperationsGet,
} from "../../api/landingZoneAccountOperations/index.js";
import { LandingZoneAccountResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  LandingZoneAccountOperationsListBySubscriptionOptionalParams,
  LandingZoneAccountOperationsListByResourceGroupOptionalParams,
  LandingZoneAccountOperationsDeleteOptionalParams,
  LandingZoneAccountOperationsUpdateOptionalParams,
  LandingZoneAccountOperationsCreateOptionalParams,
  LandingZoneAccountOperationsGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a LandingZoneAccountOperations operations. */
export interface LandingZoneAccountOperationsOperations {
  /** List the landing zone accounts within a subscription. */
  listBySubscription: (
    options?: LandingZoneAccountOperationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<LandingZoneAccountResource>;
  /** List the landing zone accounts within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: LandingZoneAccountOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LandingZoneAccountResource>;
  /** Deletes a landing zone account. */
  delete: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    options?: LandingZoneAccountOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a landing zone account. */
  update: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    properties: LandingZoneAccountResource,
    options?: LandingZoneAccountOperationsUpdateOptionalParams,
  ) => PollerLike<OperationState<LandingZoneAccountResource>, LandingZoneAccountResource>;
  /** Create a landing zone account. */
  create: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    resource: LandingZoneAccountResource,
    options?: LandingZoneAccountOperationsCreateOptionalParams,
  ) => PollerLike<OperationState<LandingZoneAccountResource>, LandingZoneAccountResource>;
  /** Get a landing zone account. */
  get: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    options?: LandingZoneAccountOperationsGetOptionalParams,
  ) => Promise<LandingZoneAccountResource>;
}

function _getLandingZoneAccountOperations(context: SovereignContext) {
  return {
    listBySubscription: (options?: LandingZoneAccountOperationsListBySubscriptionOptionalParams) =>
      landingZoneAccountOperationsListBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: LandingZoneAccountOperationsListByResourceGroupOptionalParams,
    ) => landingZoneAccountOperationsListByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      options?: LandingZoneAccountOperationsDeleteOptionalParams,
    ) =>
      landingZoneAccountOperationsDelete(
        context,
        resourceGroupName,
        landingZoneAccountName,
        options,
      ),
    update: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      properties: LandingZoneAccountResource,
      options?: LandingZoneAccountOperationsUpdateOptionalParams,
    ) =>
      landingZoneAccountOperationsUpdate(
        context,
        resourceGroupName,
        landingZoneAccountName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      resource: LandingZoneAccountResource,
      options?: LandingZoneAccountOperationsCreateOptionalParams,
    ) =>
      landingZoneAccountOperationsCreate(
        context,
        resourceGroupName,
        landingZoneAccountName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      options?: LandingZoneAccountOperationsGetOptionalParams,
    ) =>
      landingZoneAccountOperationsGet(context, resourceGroupName, landingZoneAccountName, options),
  };
}

export function _getLandingZoneAccountOperationsOperations(
  context: SovereignContext,
): LandingZoneAccountOperationsOperations {
  return {
    ..._getLandingZoneAccountOperations(context),
  };
}
