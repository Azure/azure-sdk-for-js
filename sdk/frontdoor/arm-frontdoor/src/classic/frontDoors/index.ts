// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import {
  validateCustomDomain,
  list,
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/frontDoors/operations.js";
import type {
  FrontDoorsValidateCustomDomainOptionalParams,
  FrontDoorsListOptionalParams,
  FrontDoorsListByResourceGroupOptionalParams,
  FrontDoorsDeleteOptionalParams,
  FrontDoorsCreateOrUpdateOptionalParams,
  FrontDoorsGetOptionalParams,
} from "../../api/frontDoors/options.js";
import type {
  FrontDoor,
  ValidateCustomDomainInput,
  ValidateCustomDomainOutput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FrontDoors operations. */
export interface FrontDoorsOperations {
  /** Validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS. */
  validateCustomDomain: (
    resourceGroupName: string,
    frontDoorName: string,
    customDomainProperties: ValidateCustomDomainInput,
    options?: FrontDoorsValidateCustomDomainOptionalParams,
  ) => Promise<ValidateCustomDomainOutput>;
  /** Lists all of the Front Doors within an Azure subscription. */
  list: (options?: FrontDoorsListOptionalParams) => PagedAsyncIterableIterator<FrontDoor>;
  /** Lists all of the Front Doors within a resource group under a subscription. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FrontDoorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<FrontDoor>;
  /** Deletes an existing Front Door with the specified parameters. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    frontDoorName: string,
    options?: FrontDoorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    frontDoorName: string,
    options?: FrontDoorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    frontDoorName: string,
    options?: FrontDoorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new Front Door with a Front Door name under the specified subscription and resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    frontDoorName: string,
    frontDoorParameters: FrontDoor,
    options?: FrontDoorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FrontDoor>, FrontDoor>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    frontDoorName: string,
    frontDoorParameters: FrontDoor,
    options?: FrontDoorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FrontDoor>, FrontDoor>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    frontDoorName: string,
    frontDoorParameters: FrontDoor,
    options?: FrontDoorsCreateOrUpdateOptionalParams,
  ) => Promise<FrontDoor>;
  /** Gets a Front Door with the specified Front Door name under the specified subscription and resource group. */
  get: (
    resourceGroupName: string,
    frontDoorName: string,
    options?: FrontDoorsGetOptionalParams,
  ) => Promise<FrontDoor>;
}

function _getFrontDoors(context: FrontDoorManagementContext) {
  return {
    validateCustomDomain: (
      resourceGroupName: string,
      frontDoorName: string,
      customDomainProperties: ValidateCustomDomainInput,
      options?: FrontDoorsValidateCustomDomainOptionalParams,
    ) =>
      validateCustomDomain(
        context,
        resourceGroupName,
        frontDoorName,
        customDomainProperties,
        options,
      ),
    list: (options?: FrontDoorsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FrontDoorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      frontDoorName: string,
      options?: FrontDoorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, frontDoorName, options),
    beginDelete: async (
      resourceGroupName: string,
      frontDoorName: string,
      options?: FrontDoorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, frontDoorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      frontDoorName: string,
      options?: FrontDoorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, frontDoorName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      frontDoorName: string,
      frontDoorParameters: FrontDoor,
      options?: FrontDoorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, frontDoorName, frontDoorParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      frontDoorName: string,
      frontDoorParameters: FrontDoor,
      options?: FrontDoorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        frontDoorName,
        frontDoorParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      frontDoorName: string,
      frontDoorParameters: FrontDoor,
      options?: FrontDoorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        frontDoorName,
        frontDoorParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      frontDoorName: string,
      options?: FrontDoorsGetOptionalParams,
    ) => get(context, resourceGroupName, frontDoorName, options),
  };
}

export function _getFrontDoorsOperations(
  context: FrontDoorManagementContext,
): FrontDoorsOperations {
  return {
    ..._getFrontDoors(context),
  };
}
