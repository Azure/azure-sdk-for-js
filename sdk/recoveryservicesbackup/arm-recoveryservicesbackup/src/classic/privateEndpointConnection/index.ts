// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { $delete, put, get } from "../../api/privateEndpointConnection/operations.js";
import type {
  PrivateEndpointConnectionDeleteOptionalParams,
  PrivateEndpointConnectionPutOptionalParams,
  PrivateEndpointConnectionGetOptionalParams,
} from "../../api/privateEndpointConnection/options.js";
import type { PrivateEndpointConnectionResource } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnection operations. */
export interface PrivateEndpointConnectionOperations {
  /** Delete Private Endpoint requests. This call is made by Backup Admin. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionDeleteOptionalParams,
  ) => Promise<void>;
  /** Approve or Reject Private Endpoint requests. This call is made by Backup Admin. */
  put: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnectionResource,
    options?: PrivateEndpointConnectionPutOptionalParams,
  ) => PollerLike<
    OperationState<PrivateEndpointConnectionResource>,
    PrivateEndpointConnectionResource
  >;
  /** @deprecated use put instead */
  beginPut: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnectionResource,
    options?: PrivateEndpointConnectionPutOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PrivateEndpointConnectionResource>,
      PrivateEndpointConnectionResource
    >
  >;
  /** @deprecated use put instead */
  beginPutAndWait: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnectionResource,
    options?: PrivateEndpointConnectionPutOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
  /** Get Private Endpoint Connection. This call is made by Backup Admin. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
}

function _getPrivateEndpointConnection(context: RecoveryServicesBackupContext) {
  return {
    delete: (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionDeleteOptionalParams,
    ) => $delete(context, vaultName, resourceGroupName, privateEndpointConnectionName, options),
    beginDelete: async (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        vaultName,
        resourceGroupName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        vaultName,
        resourceGroupName,
        privateEndpointConnectionName,
        options,
      );
    },
    put: (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnectionResource,
      options?: PrivateEndpointConnectionPutOptionalParams,
    ) =>
      put(
        context,
        vaultName,
        resourceGroupName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    beginPut: async (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnectionResource,
      options?: PrivateEndpointConnectionPutOptionalParams,
    ) => {
      const poller = put(
        context,
        vaultName,
        resourceGroupName,
        privateEndpointConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPutAndWait: async (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnectionResource,
      options?: PrivateEndpointConnectionPutOptionalParams,
    ) => {
      return await put(
        context,
        vaultName,
        resourceGroupName,
        privateEndpointConnectionName,
        parameters,
        options,
      );
    },
    get: (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionOperations(
  context: RecoveryServicesBackupContext,
): PrivateEndpointConnectionOperations {
  return {
    ..._getPrivateEndpointConnection(context),
  };
}
