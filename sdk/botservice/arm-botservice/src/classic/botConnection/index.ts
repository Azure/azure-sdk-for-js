// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext } from "../../api/botServiceContext.js";
import { ConnectionSetting, ServiceProviderResponseList } from "../../models/models.js";
import {
  BotConnectionListServiceProvidersOptionalParams,
  BotConnectionListWithSecretsOptionalParams,
  BotConnectionListByBotServiceOptionalParams,
  BotConnectionDeleteOptionalParams,
  BotConnectionUpdateOptionalParams,
  BotConnectionCreateOptionalParams,
  BotConnectionGetOptionalParams,
} from "../../api/botConnection/options.js";
import {
  listServiceProviders,
  listWithSecrets,
  listByBotService,
  $delete,
  update,
  create,
  get,
} from "../../api/botConnection/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BotConnection operations. */
export interface BotConnectionOperations {
  /** Lists the available Service Providers for creating Connection Settings */
  listServiceProviders: (
    options?: BotConnectionListServiceProvidersOptionalParams,
  ) => Promise<ServiceProviderResponseList>;
  /** Get a Connection Setting registration for a Bot Service */
  listWithSecrets: (
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    options?: BotConnectionListWithSecretsOptionalParams,
  ) => Promise<ConnectionSetting>;
  /** Returns all the Connection Settings registered to a particular BotService resource */
  listByBotService: (
    resourceGroupName: string,
    resourceName: string,
    options?: BotConnectionListByBotServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectionSetting>;
  /** Deletes a Connection Setting registration for a Bot Service */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    options?: BotConnectionDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Connection Setting registration for a Bot Service */
  update: (
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    parameters: ConnectionSetting,
    options?: BotConnectionUpdateOptionalParams,
  ) => Promise<ConnectionSetting>;
  /** Register a new Auth Connection for a Bot Service */
  create: (
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    parameters: ConnectionSetting,
    options?: BotConnectionCreateOptionalParams,
  ) => Promise<ConnectionSetting>;
  /** Get a Connection Setting registration for a Bot Service */
  get: (
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    options?: BotConnectionGetOptionalParams,
  ) => Promise<ConnectionSetting>;
}

function _getBotConnection(context: BotServiceContext) {
  return {
    listServiceProviders: (options?: BotConnectionListServiceProvidersOptionalParams) =>
      listServiceProviders(context, options),
    listWithSecrets: (
      resourceGroupName: string,
      resourceName: string,
      connectionName: string,
      options?: BotConnectionListWithSecretsOptionalParams,
    ) => listWithSecrets(context, resourceGroupName, resourceName, connectionName, options),
    listByBotService: (
      resourceGroupName: string,
      resourceName: string,
      options?: BotConnectionListByBotServiceOptionalParams,
    ) => listByBotService(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      connectionName: string,
      options?: BotConnectionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, connectionName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      connectionName: string,
      parameters: ConnectionSetting,
      options?: BotConnectionUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, connectionName, parameters, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      connectionName: string,
      parameters: ConnectionSetting,
      options?: BotConnectionCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, connectionName, parameters, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      connectionName: string,
      options?: BotConnectionGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, connectionName, options),
  };
}

export function _getBotConnectionOperations(context: BotServiceContext): BotConnectionOperations {
  return {
    ..._getBotConnection(context),
  };
}
