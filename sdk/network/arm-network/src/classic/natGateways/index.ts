// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/natGateways/operations.js";
import type {
  NatGatewaysListAllOptionalParams,
  NatGatewaysListOptionalParams,
  NatGatewaysDeleteOptionalParams,
  NatGatewaysUpdateTagsOptionalParams,
  NatGatewaysCreateOrUpdateOptionalParams,
  NatGatewaysGetOptionalParams,
} from "../../api/natGateways/options.js";
import type { NatGateway, TagsObject } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NatGateways operations. */
export interface NatGatewaysOperations {
  /** Gets all the Nat Gateways in a subscription. */
  listAll: (options?: NatGatewaysListAllOptionalParams) => PagedAsyncIterableIterator<NatGateway>;
  /** Gets all nat gateways in a resource group. */
  list: (
    resourceGroupName: string,
    options?: NatGatewaysListOptionalParams,
  ) => PagedAsyncIterableIterator<NatGateway>;
  /** Deletes the specified nat gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    natGatewayName: string,
    options?: NatGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    natGatewayName: string,
    options?: NatGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    natGatewayName: string,
    options?: NatGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates nat gateway tags. */
  updateTags: (
    resourceGroupName: string,
    natGatewayName: string,
    parameters: TagsObject,
    options?: NatGatewaysUpdateTagsOptionalParams,
  ) => Promise<NatGateway>;
  /** Creates or updates a nat gateway. */
  createOrUpdate: (
    resourceGroupName: string,
    natGatewayName: string,
    parameters: NatGateway,
    options?: NatGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NatGateway>, NatGateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    natGatewayName: string,
    parameters: NatGateway,
    options?: NatGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NatGateway>, NatGateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    natGatewayName: string,
    parameters: NatGateway,
    options?: NatGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<NatGateway>;
  /** Gets the specified nat gateway in a specified resource group. */
  get: (
    resourceGroupName: string,
    natGatewayName: string,
    options?: NatGatewaysGetOptionalParams,
  ) => Promise<NatGateway>;
}

function _getNatGateways(context: NetworkManagementContext) {
  return {
    listAll: (options?: NatGatewaysListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: NatGatewaysListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      natGatewayName: string,
      options?: NatGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, natGatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      natGatewayName: string,
      options?: NatGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, natGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      natGatewayName: string,
      options?: NatGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, natGatewayName, options);
    },
    updateTags: (
      resourceGroupName: string,
      natGatewayName: string,
      parameters: TagsObject,
      options?: NatGatewaysUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, natGatewayName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      natGatewayName: string,
      parameters: NatGateway,
      options?: NatGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, natGatewayName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      natGatewayName: string,
      parameters: NatGateway,
      options?: NatGatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        natGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      natGatewayName: string,
      parameters: NatGateway,
      options?: NatGatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, natGatewayName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      natGatewayName: string,
      options?: NatGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, natGatewayName, options),
  };
}

export function _getNatGatewaysOperations(
  context: NetworkManagementContext,
): NatGatewaysOperations {
  return {
    ..._getNatGateways(context),
  };
}
