// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import {
  getCheckNameAvailability,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/bots/operations.js";
import type {
  BotsGetCheckNameAvailabilityOptionalParams,
  BotsListOptionalParams,
  BotsListByResourceGroupOptionalParams,
  BotsDeleteOptionalParams,
  BotsUpdateOptionalParams,
  BotsCreateOptionalParams,
  BotsGetOptionalParams,
} from "../../api/bots/options.js";
import type {
  Bot,
  CheckNameAvailabilityRequestBody,
  CheckNameAvailabilityResponseBody,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Bots operations. */
export interface BotsOperations {
  /** Check whether a bot name is available. */
  getCheckNameAvailability: (
    parameters: CheckNameAvailabilityRequestBody,
    options?: BotsGetCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponseBody>;
  /** Returns all the resources of a particular type belonging to a subscription. */
  list: (options?: BotsListOptionalParams) => PagedAsyncIterableIterator<Bot>;
  /** Returns all the resources of a particular type belonging to a resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: BotsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Bot>;
  /** Deletes a Bot Service from the resource group. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: BotsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Bot Service */
  update: (
    resourceGroupName: string,
    resourceName: string,
    parameters: Bot,
    options?: BotsUpdateOptionalParams,
  ) => Promise<Bot>;
  /** Creates a Bot Service. Bot Service is a resource group wide resource type. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    parameters: Bot,
    options?: BotsCreateOptionalParams,
  ) => Promise<Bot>;
  /** Returns a BotService specified by the parameters. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: BotsGetOptionalParams,
  ) => Promise<Bot>;
}

function _getBots(context: AzureBotServiceContext) {
  return {
    getCheckNameAvailability: (
      parameters: CheckNameAvailabilityRequestBody,
      options?: BotsGetCheckNameAvailabilityOptionalParams,
    ) => getCheckNameAvailability(context, parameters, options),
    list: (options?: BotsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: BotsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, resourceName: string, options?: BotsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      parameters: Bot,
      options?: BotsUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, parameters, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      parameters: Bot,
      options?: BotsCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, parameters, options),
    get: (resourceGroupName: string, resourceName: string, options?: BotsGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getBotsOperations(context: AzureBotServiceContext): BotsOperations {
  return {
    ..._getBots(context),
  };
}
