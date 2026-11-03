// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { $delete, put, get } from "../../api/privateEndpointConnectionOperations/operations.js";
import type {
  PrivateEndpointConnectionOperationsDeleteOptionalParams,
  PrivateEndpointConnectionOperationsPutOptionalParams,
  PrivateEndpointConnectionOperationsGetOptionalParams,
} from "../../api/privateEndpointConnectionOperations/options.js";
import type { PrivateEndpointConnectionResource } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnectionOperations operations. */
export interface PrivateEndpointConnectionOperationsOperations {
  /** Delete Private Endpoint requests. This call is made by Backup Admin. */
  delete: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Approve or Reject Private Endpoint requests. This call is made by Backup Admin. */
  put: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnectionResource,
    options?: PrivateEndpointConnectionOperationsPutOptionalParams,
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
    options?: PrivateEndpointConnectionOperationsPutOptionalParams,
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
    options?: PrivateEndpointConnectionOperationsPutOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
  /** Get Private Endpoint Connection. This call is made by Backup Admin. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionOperationsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
}

function _getPrivateEndpointConnectionOperations(context: RecoveryServicesBackupContext) {
  return {
    delete: (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
    ) => $delete(context, vaultName, resourceGroupName, privateEndpointConnectionName, options),
    beginDelete: async (
      vaultName: string,
      resourceGroupName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
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
      options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
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
      options?: PrivateEndpointConnectionOperationsPutOptionalParams,
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
      options?: PrivateEndpointConnectionOperationsPutOptionalParams,
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
      options?: PrivateEndpointConnectionOperationsPutOptionalParams,
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
      options?: PrivateEndpointConnectionOperationsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionOperationsOperations(
  context: RecoveryServicesBackupContext,
): PrivateEndpointConnectionOperationsOperations {
  return {
    ..._getPrivateEndpointConnectionOperations(context),
  };
}
