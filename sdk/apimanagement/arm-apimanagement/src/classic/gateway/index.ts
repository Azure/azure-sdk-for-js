// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listTrace,
  listDebugCredentials,
  invalidateDebugCredentials,
  generateToken,
  regenerateKey,
  listKeys,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/gateway/operations.js";
import type {
  GatewayListTraceOptionalParams,
  GatewayListDebugCredentialsOptionalParams,
  GatewayInvalidateDebugCredentialsOptionalParams,
  GatewayGenerateTokenOptionalParams,
  GatewayRegenerateKeyOptionalParams,
  GatewayListKeysOptionalParams,
  GatewayListByServiceOptionalParams,
  GatewayDeleteOptionalParams,
  GatewayUpdateOptionalParams,
  GatewayCreateOrUpdateOptionalParams,
  GatewayGetEntityTagOptionalParams,
  GatewayGetOptionalParams,
} from "../../api/gateway/options.js";
import type {
  GatewayContract,
  GatewayKeysContract,
  GatewayKeyRegenerationRequestContract,
  GatewayTokenRequestContract,
  GatewayTokenContract,
  GatewayListDebugCredentialsContract,
  GatewayDebugCredentialsContract,
  GatewayListTraceContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Gateway operations. */
export interface GatewayOperations {
  /** Fetches trace collected by gateway. */
  listTrace: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    parameters: GatewayListTraceContract,
    options?: GatewayListTraceOptionalParams,
  ) => Promise<Record<string, any>>;
  /** Create new debug credentials for gateway. */
  listDebugCredentials: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    parameters: GatewayListDebugCredentialsContract,
    options?: GatewayListDebugCredentialsOptionalParams,
  ) => Promise<GatewayDebugCredentialsContract>;
  /** Action is invalidating all debug credentials issued for gateway. */
  invalidateDebugCredentials: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    options?: GatewayInvalidateDebugCredentialsOptionalParams,
  ) => Promise<void>;
  /** Gets the Shared Access Authorization Token for the gateway. */
  generateToken: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    parameters: GatewayTokenRequestContract,
    options?: GatewayGenerateTokenOptionalParams,
  ) => Promise<GatewayTokenContract>;
  /** Regenerates specified gateway key invalidating any tokens created with it. */
  regenerateKey: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    parameters: GatewayKeyRegenerationRequestContract,
    options?: GatewayRegenerateKeyOptionalParams,
  ) => Promise<void>;
  /** Retrieves gateway keys. */
  listKeys: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    options?: GatewayListKeysOptionalParams,
  ) => Promise<GatewayKeysContract>;
  /** Lists a collection of gateways registered with service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: GatewayListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<GatewayContract>;
  /** Deletes specific Gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    ifMatch: string,
    options?: GatewayDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the gateway specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    ifMatch: string,
    parameters: GatewayContract,
    options?: GatewayUpdateOptionalParams,
  ) => Promise<GatewayContract>;
  /** Creates or updates a Gateway to be used in Api Management instance. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    parameters: GatewayContract,
    options?: GatewayCreateOrUpdateOptionalParams,
  ) => Promise<GatewayContract>;
  /** Gets the entity state (Etag) version of the Gateway specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    options?: GatewayGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Gateway specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    gatewayId: string,
    options?: GatewayGetOptionalParams,
  ) => Promise<GatewayContract>;
}

function _getGateway(context: ApiManagementContext) {
  return {
    listTrace: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      parameters: GatewayListTraceContract,
      options?: GatewayListTraceOptionalParams,
    ) => listTrace(context, resourceGroupName, serviceName, gatewayId, parameters, options),
    listDebugCredentials: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      parameters: GatewayListDebugCredentialsContract,
      options?: GatewayListDebugCredentialsOptionalParams,
    ) =>
      listDebugCredentials(context, resourceGroupName, serviceName, gatewayId, parameters, options),
    invalidateDebugCredentials: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      options?: GatewayInvalidateDebugCredentialsOptionalParams,
    ) => invalidateDebugCredentials(context, resourceGroupName, serviceName, gatewayId, options),
    generateToken: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      parameters: GatewayTokenRequestContract,
      options?: GatewayGenerateTokenOptionalParams,
    ) => generateToken(context, resourceGroupName, serviceName, gatewayId, parameters, options),
    regenerateKey: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      parameters: GatewayKeyRegenerationRequestContract,
      options?: GatewayRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, serviceName, gatewayId, parameters, options),
    listKeys: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      options?: GatewayListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, serviceName, gatewayId, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: GatewayListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      ifMatch: string,
      options?: GatewayDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, gatewayId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      ifMatch: string,
      parameters: GatewayContract,
      options?: GatewayUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, gatewayId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      parameters: GatewayContract,
      options?: GatewayCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, gatewayId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      options?: GatewayGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, gatewayId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      gatewayId: string,
      options?: GatewayGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, gatewayId, options),
  };
}

export function _getGatewayOperations(context: ApiManagementContext): GatewayOperations {
  return {
    ..._getGateway(context),
  };
}
