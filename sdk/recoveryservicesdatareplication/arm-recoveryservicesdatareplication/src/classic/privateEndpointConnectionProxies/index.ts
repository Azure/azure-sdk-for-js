// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { PrivateEndpointConnectionProxy } from "../../models/models.js";
import {
  PrivateEndpointConnectionProxiesValidateOptionalParams,
  PrivateEndpointConnectionProxiesListOptionalParams,
  PrivateEndpointConnectionProxiesDeleteOptionalParams,
  PrivateEndpointConnectionProxiesCreateOptionalParams,
  PrivateEndpointConnectionProxiesGetOptionalParams,
} from "../../api/privateEndpointConnectionProxies/options.js";
import {
  validate,
  list,
  $delete,
  create,
  get,
} from "../../api/privateEndpointConnectionProxies/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnectionProxies operations. */
export interface PrivateEndpointConnectionProxiesOperations {
  /** Returns remote private endpoint connection information after validation. */
  validate: (
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionProxyName: string,
    body: PrivateEndpointConnectionProxy,
    options?: PrivateEndpointConnectionProxiesValidateOptionalParams,
  ) => Promise<PrivateEndpointConnectionProxy>;
  /** Gets the all private endpoint connections proxies. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: PrivateEndpointConnectionProxiesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionProxy>;
  /** Returns the operation to track the deletion of private endpoint connection proxy. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionProxyName: string,
    options?: PrivateEndpointConnectionProxiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a new private endpoint connection proxy which includes both auto and manual approval types. Creating the proxy resource will also create a private endpoint connection resource. */
  create: (
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionProxyName: string,
    resource: PrivateEndpointConnectionProxy,
    options?: PrivateEndpointConnectionProxiesCreateOptionalParams,
  ) => Promise<PrivateEndpointConnectionProxy>;
  /** Gets the private endpoint connection proxy details. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionProxyName: string,
    options?: PrivateEndpointConnectionProxiesGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionProxy>;
}

function _getPrivateEndpointConnectionProxies(
  context: AzureSiteRecoveryManagementServiceAPIContext,
) {
  return {
    validate: (
      resourceGroupName: string,
      vaultName: string,
      privateEndpointConnectionProxyName: string,
      body: PrivateEndpointConnectionProxy,
      options?: PrivateEndpointConnectionProxiesValidateOptionalParams,
    ) =>
      validate(
        context,
        resourceGroupName,
        vaultName,
        privateEndpointConnectionProxyName,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: PrivateEndpointConnectionProxiesListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    delete: (
      resourceGroupName: string,
      vaultName: string,
      privateEndpointConnectionProxyName: string,
      options?: PrivateEndpointConnectionProxiesDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, vaultName, privateEndpointConnectionProxyName, options),
    create: (
      resourceGroupName: string,
      vaultName: string,
      privateEndpointConnectionProxyName: string,
      resource: PrivateEndpointConnectionProxy,
      options?: PrivateEndpointConnectionProxiesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        vaultName,
        privateEndpointConnectionProxyName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      vaultName: string,
      privateEndpointConnectionProxyName: string,
      options?: PrivateEndpointConnectionProxiesGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, privateEndpointConnectionProxyName, options),
  };
}

export function _getPrivateEndpointConnectionProxiesOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): PrivateEndpointConnectionProxiesOperations {
  return {
    ..._getPrivateEndpointConnectionProxies(context),
  };
}
