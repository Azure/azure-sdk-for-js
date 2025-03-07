// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignContext } from "../../api/sovereignContext.js";
import {
  landingZoneConfigurationOperationsCreateCopy,
  landingZoneConfigurationOperationsUpdateAuthoringStatus,
  landingZoneConfigurationOperationsGenerateLandingZone,
  landingZoneConfigurationOperationsListBySubscription,
  landingZoneConfigurationOperationsListByResourceGroup,
  landingZoneConfigurationOperationsDelete,
  landingZoneConfigurationOperationsUpdate,
  landingZoneConfigurationOperationsCreate,
  landingZoneConfigurationOperationsGet,
} from "../../api/landingZoneConfigurationOperations/index.js";
import {
  LandingZoneConfigurationResource,
  GenerateLandingZoneRequest,
  GenerateLandingZoneResponse,
  UpdateAuthoringStatusRequest,
  UpdateAuthoringStatusResponse,
  CreateLandingZoneConfigurationCopyRequest,
  CreateLandingZoneConfigurationCopyResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  LandingZoneConfigurationOperationsCreateCopyOptionalParams,
  LandingZoneConfigurationOperationsUpdateAuthoringStatusOptionalParams,
  LandingZoneConfigurationOperationsGenerateLandingZoneOptionalParams,
  LandingZoneConfigurationOperationsListBySubscriptionOptionalParams,
  LandingZoneConfigurationOperationsListByResourceGroupOptionalParams,
  LandingZoneConfigurationOperationsDeleteOptionalParams,
  LandingZoneConfigurationOperationsUpdateOptionalParams,
  LandingZoneConfigurationOperationsCreateOptionalParams,
  LandingZoneConfigurationOperationsGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a LandingZoneConfigurationOperations operations. */
export interface LandingZoneConfigurationOperationsOperations {
  /** Create a duplicate of the landing zone configuration. */
  createCopy: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneConfigurationName: string,
    body: CreateLandingZoneConfigurationCopyRequest,
    options?: LandingZoneConfigurationOperationsCreateCopyOptionalParams,
  ) => PollerLike<
    OperationState<CreateLandingZoneConfigurationCopyResponse>,
    CreateLandingZoneConfigurationCopyResponse
  >;
  /** Update the authoring status on a landing zone configuration. */
  updateAuthoringStatus: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneConfigurationName: string,
    body: UpdateAuthoringStatusRequest,
    options?: LandingZoneConfigurationOperationsUpdateAuthoringStatusOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAuthoringStatusResponse>,
    UpdateAuthoringStatusResponse
  >;
  /** Generate infrastructure as code (IaC) for a landing zone deployment. */
  generateLandingZone: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneConfigurationName: string,
    body: GenerateLandingZoneRequest,
    options?: LandingZoneConfigurationOperationsGenerateLandingZoneOptionalParams,
  ) => PollerLike<
    OperationState<GenerateLandingZoneResponse>,
    GenerateLandingZoneResponse
  >;
  /** List the landing zone configurations within a subscription. */
  listBySubscription: (
    landingZoneAccountName: string,
    options?: LandingZoneConfigurationOperationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<LandingZoneConfigurationResource>;
  /** List the landing zone configurations within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    options?: LandingZoneConfigurationOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LandingZoneConfigurationResource>;
  /** Delete a landing zone configuration. */
  delete: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneConfigurationName: string,
    options?: LandingZoneConfigurationOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a landing zone configuration. */
  update: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneConfigurationName: string,
    properties: LandingZoneConfigurationResource,
    options?: LandingZoneConfigurationOperationsUpdateOptionalParams,
  ) => PollerLike<
    OperationState<LandingZoneConfigurationResource>,
    LandingZoneConfigurationResource
  >;
  /** Create a landing zone configuration. */
  create: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneConfigurationName: string,
    resource: LandingZoneConfigurationResource,
    options?: LandingZoneConfigurationOperationsCreateOptionalParams,
  ) => PollerLike<
    OperationState<LandingZoneConfigurationResource>,
    LandingZoneConfigurationResource
  >;
  /** Get a landing zone configuration. */
  get: (
    resourceGroupName: string,
    landingZoneAccountName: string,
    landingZoneConfigurationName: string,
    options?: LandingZoneConfigurationOperationsGetOptionalParams,
  ) => Promise<LandingZoneConfigurationResource>;
}

function _getLandingZoneConfigurationOperations(context: SovereignContext) {
  return {
    createCopy: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneConfigurationName: string,
      body: CreateLandingZoneConfigurationCopyRequest,
      options?: LandingZoneConfigurationOperationsCreateCopyOptionalParams,
    ) =>
      landingZoneConfigurationOperationsCreateCopy(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneConfigurationName,
        body,
        options,
      ),
    updateAuthoringStatus: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneConfigurationName: string,
      body: UpdateAuthoringStatusRequest,
      options?: LandingZoneConfigurationOperationsUpdateAuthoringStatusOptionalParams,
    ) =>
      landingZoneConfigurationOperationsUpdateAuthoringStatus(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneConfigurationName,
        body,
        options,
      ),
    generateLandingZone: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneConfigurationName: string,
      body: GenerateLandingZoneRequest,
      options?: LandingZoneConfigurationOperationsGenerateLandingZoneOptionalParams,
    ) =>
      landingZoneConfigurationOperationsGenerateLandingZone(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneConfigurationName,
        body,
        options,
      ),
    listBySubscription: (
      landingZoneAccountName: string,
      options?: LandingZoneConfigurationOperationsListBySubscriptionOptionalParams,
    ) =>
      landingZoneConfigurationOperationsListBySubscription(
        context,
        landingZoneAccountName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      options?: LandingZoneConfigurationOperationsListByResourceGroupOptionalParams,
    ) =>
      landingZoneConfigurationOperationsListByResourceGroup(
        context,
        resourceGroupName,
        landingZoneAccountName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneConfigurationName: string,
      options?: LandingZoneConfigurationOperationsDeleteOptionalParams,
    ) =>
      landingZoneConfigurationOperationsDelete(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneConfigurationName,
        options,
      ),
    update: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneConfigurationName: string,
      properties: LandingZoneConfigurationResource,
      options?: LandingZoneConfigurationOperationsUpdateOptionalParams,
    ) =>
      landingZoneConfigurationOperationsUpdate(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneConfigurationName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneConfigurationName: string,
      resource: LandingZoneConfigurationResource,
      options?: LandingZoneConfigurationOperationsCreateOptionalParams,
    ) =>
      landingZoneConfigurationOperationsCreate(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneConfigurationName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      landingZoneAccountName: string,
      landingZoneConfigurationName: string,
      options?: LandingZoneConfigurationOperationsGetOptionalParams,
    ) =>
      landingZoneConfigurationOperationsGet(
        context,
        resourceGroupName,
        landingZoneAccountName,
        landingZoneConfigurationName,
        options,
      ),
  };
}

export function _getLandingZoneConfigurationOperationsOperations(
  context: SovereignContext,
): LandingZoneConfigurationOperationsOperations {
  return {
    ..._getLandingZoneConfigurationOperations(context),
  };
}
