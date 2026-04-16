// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthbotContext } from "../../api/healthbotContext.js";
import {
  regenerateApiJwtSecret,
  listSecrets,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/bots/operations.js";
import type {
  BotsRegenerateApiJwtSecretOptionalParams,
  BotsListSecretsOptionalParams,
  BotsListOptionalParams,
  BotsListByResourceGroupOptionalParams,
  BotsDeleteOptionalParams,
  BotsUpdateOptionalParams,
  BotsCreateOptionalParams,
  BotsGetOptionalParams,
} from "../../api/bots/options.js";
import type {
  HealthBot,
  HealthBotUpdateParameters,
  HealthBotKeysResponse,
  HealthBotKey,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Bots operations. */
export interface BotsOperations {
  /** Regenerate the API JWT Secret of a HealthBot. */
  regenerateApiJwtSecret: (
    resourceGroupName: string,
    botName: string,
    options?: BotsRegenerateApiJwtSecretOptionalParams,
  ) => Promise<HealthBotKey>;
  /** List all secrets of a HealthBot. */
  listSecrets: (
    resourceGroupName: string,
    botName: string,
    options?: BotsListSecretsOptionalParams,
  ) => Promise<HealthBotKeysResponse>;
  /** Returns all the resources of a particular type belonging to a subscription. */
  list: (options?: BotsListOptionalParams) => PagedAsyncIterableIterator<HealthBot>;
  /** Returns all the resources of a particular type belonging to a resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: BotsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<HealthBot>;
  /** Delete a HealthBot. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    botName: string,
    options?: BotsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    botName: string,
    options?: BotsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    botName: string,
    options?: BotsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch a HealthBot. */
  update: (
    resourceGroupName: string,
    botName: string,
    parameters: HealthBotUpdateParameters,
    options?: BotsUpdateOptionalParams,
  ) => PollerLike<OperationState<HealthBot>, HealthBot>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    botName: string,
    parameters: HealthBotUpdateParameters,
    options?: BotsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HealthBot>, HealthBot>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    botName: string,
    parameters: HealthBotUpdateParameters,
    options?: BotsUpdateOptionalParams,
  ) => Promise<HealthBot>;
  /** Create a new Azure Health Bot. */
  create: (
    resourceGroupName: string,
    botName: string,
    parameters: HealthBot,
    options?: BotsCreateOptionalParams,
  ) => PollerLike<OperationState<HealthBot>, HealthBot>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    botName: string,
    parameters: HealthBot,
    options?: BotsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HealthBot>, HealthBot>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    botName: string,
    parameters: HealthBot,
    options?: BotsCreateOptionalParams,
  ) => Promise<HealthBot>;
  /** Get a HealthBot. */
  get: (
    resourceGroupName: string,
    botName: string,
    options?: BotsGetOptionalParams,
  ) => Promise<HealthBot>;
}

function _getBots(context: HealthbotContext) {
  return {
    regenerateApiJwtSecret: (
      resourceGroupName: string,
      botName: string,
      options?: BotsRegenerateApiJwtSecretOptionalParams,
    ) => regenerateApiJwtSecret(context, resourceGroupName, botName, options),
    listSecrets: (
      resourceGroupName: string,
      botName: string,
      options?: BotsListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, botName, options),
    list: (options?: BotsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: BotsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, botName: string, options?: BotsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, botName, options),
    beginDelete: async (
      resourceGroupName: string,
      botName: string,
      options?: BotsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, botName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      botName: string,
      options?: BotsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, botName, options);
    },
    update: (
      resourceGroupName: string,
      botName: string,
      parameters: HealthBotUpdateParameters,
      options?: BotsUpdateOptionalParams,
    ) => update(context, resourceGroupName, botName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      botName: string,
      parameters: HealthBotUpdateParameters,
      options?: BotsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, botName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      botName: string,
      parameters: HealthBotUpdateParameters,
      options?: BotsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, botName, parameters, options);
    },
    create: (
      resourceGroupName: string,
      botName: string,
      parameters: HealthBot,
      options?: BotsCreateOptionalParams,
    ) => create(context, resourceGroupName, botName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      botName: string,
      parameters: HealthBot,
      options?: BotsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, botName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      botName: string,
      parameters: HealthBot,
      options?: BotsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, botName, parameters, options);
    },
    get: (resourceGroupName: string, botName: string, options?: BotsGetOptionalParams) =>
      get(context, resourceGroupName, botName, options),
  };
}

export function _getBotsOperations(context: HealthbotContext): BotsOperations {
  return {
    ..._getBots(context),
  };
}
