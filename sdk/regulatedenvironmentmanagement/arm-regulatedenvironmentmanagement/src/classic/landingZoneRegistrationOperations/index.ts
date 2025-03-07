// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignContext } from "../../api/sovereignContext.js";
import {
  landingZoneRegistrationOperationsListBySubscription,
  landingZoneRegistrationOperationsListByResourceGroup,
  landingZoneRegistrationOperationsDelete,
  landingZoneRegistrationOperationsUpdate,
  landingZoneRegistrationOperationsCreate,
  landingZoneRegistrationOperationsGet,
} from "../../api/landingZoneRegistrationOperations/index.js";
import { LandingZoneRegistrationResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  LandingZoneRegistrationOperationsListBySubscriptionOptionalParams,
  LandingZoneRegistrationOperationsListByResourceGroupOptionalParams,
  LandingZoneRegistrationOperationsDeleteOptionalParams,
  LandingZoneRegistrationOperationsUpdateOptionalParams,
  LandingZoneRegistrationOperationsCreateOptionalParams,
  LandingZoneRegistrationOperationsGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a LandingZoneRegistrationOperations operations. */
export interface LandingZoneRegistrationOperationsOperations {
  /** List the landing zone registrations within a subscription. */
  listBySubscription: (
    landingZoneAccountName: string,
    options?: LandingZoneRegistrationOperationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<LandingZoneRegistrationResource>;
  /** List the landing zone registrations within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    options?: LandingZoneRegistrationOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LandingZoneRegistrationResource>;
  /** Delete a landing zone registration. */
  delete: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneRegistrationName: string,
    options?: LandingZoneRegistrationOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a landing zone registration. */
  update: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneRegistrationName: string,
    properties: LandingZoneRegistrationResource,
    options?: LandingZoneRegistrationOperationsUpdateOptionalParams,
  ) => PollerLike<OperationState<LandingZoneRegistrationResource>, LandingZoneRegistrationResource>;
  /** Create a landing zone registration. */
  create: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneRegistrationName: string,
    resource: LandingZoneRegistrationResource,
    options?: LandingZoneRegistrationOperationsCreateOptionalParams,
  ) => PollerLike<OperationState<LandingZoneRegistrationResource>, LandingZoneRegistrationResource>;
  /** Get a landing zone registration. */
  get: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneRegistrationName: string,
    options?: LandingZoneRegistrationOperationsGetOptionalParams,
  ) => Promise<LandingZoneRegistrationResource>;
}

function _getLandingZoneRegistrationOperations(context: SovereignContext) {
  return {
    listBySubscription: (
      landingZoneAccountName: string,
      options?: LandingZoneRegistrationOperationsListBySubscriptionOptionalParams,
    ) =>
      landingZoneRegistrationOperationsListBySubscription(context, landingZoneAccountName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      options?: LandingZoneRegistrationOperationsListByResourceGroupOptionalParams,
    ) =>
      landingZoneRegistrationOperationsListByResourceGroup(
        context,
        resourceGroupName,
        landingZoneAccountName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneRegistrationName: string,
      options?: LandingZoneRegistrationOperationsDeleteOptionalParams,
    ) =>
      landingZoneRegistrationOperationsDelete(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneRegistrationName,
        options,
      ),
    update: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneRegistrationName: string,
      properties: LandingZoneRegistrationResource,
      options?: LandingZoneRegistrationOperationsUpdateOptionalParams,
    ) =>
      landingZoneRegistrationOperationsUpdate(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneRegistrationName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneRegistrationName: string,
      resource: LandingZoneRegistrationResource,
      options?: LandingZoneRegistrationOperationsCreateOptionalParams,
    ) =>
      landingZoneRegistrationOperationsCreate(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneRegistrationName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneRegistrationName: string,
      options?: LandingZoneRegistrationOperationsGetOptionalParams,
    ) =>
      landingZoneRegistrationOperationsGet(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneRegistrationName,
        options,
      ),
  };
}

export function _getLandingZoneRegistrationOperationsOperations(
  context: SovereignContext,
): LandingZoneRegistrationOperationsOperations {
  return {
    ..._getLandingZoneRegistrationOperations(context),
  };
}
