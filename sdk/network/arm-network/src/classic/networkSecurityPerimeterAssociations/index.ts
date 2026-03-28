// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  reconcile,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/networkSecurityPerimeterAssociations/operations.js";
import type {
  NetworkSecurityPerimeterAssociationsReconcileOptionalParams,
  NetworkSecurityPerimeterAssociationsListOptionalParams,
  NetworkSecurityPerimeterAssociationsDeleteOptionalParams,
  NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterAssociationsGetOptionalParams,
} from "../../api/networkSecurityPerimeterAssociations/options.js";
import type { NspAssociation } from "../../models/microsoft/network/models.js";
import type { NetworkSecurityPerimeterAssociationsReconcileResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkSecurityPerimeterAssociations operations. */
export interface NetworkSecurityPerimeterAssociationsOperations {
  /** Reconcile NSP association */
  reconcile: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    associationName: string,
    parameters: any,
    options?: NetworkSecurityPerimeterAssociationsReconcileOptionalParams,
  ) => Promise<NetworkSecurityPerimeterAssociationsReconcileResponse>;
  /** Lists the NSP resource associations. */
  list: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    options?: NetworkSecurityPerimeterAssociationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NspAssociation>;
  /** Deletes an NSP association resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    associationName: string,
    options?: NetworkSecurityPerimeterAssociationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    associationName: string,
    options?: NetworkSecurityPerimeterAssociationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    associationName: string,
    options?: NetworkSecurityPerimeterAssociationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a NSP resource association. */
  createOrUpdate: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    associationName: string,
    parameters: NspAssociation,
    options?: NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NspAssociation>, NspAssociation>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    associationName: string,
    parameters: NspAssociation,
    options?: NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NspAssociation>, NspAssociation>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    associationName: string,
    parameters: NspAssociation,
    options?: NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams,
  ) => Promise<NspAssociation>;
  /** Gets the specified NSP association by name. */
  get: (
    resourceGroupName: string,
    networkSecurityPerimeterName: string,
    associationName: string,
    options?: NetworkSecurityPerimeterAssociationsGetOptionalParams,
  ) => Promise<NspAssociation>;
}

function _getNetworkSecurityPerimeterAssociations(context: NetworkManagementContext) {
  return {
    reconcile: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      associationName: string,
      parameters: any,
      options?: NetworkSecurityPerimeterAssociationsReconcileOptionalParams,
    ) =>
      reconcile(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        associationName,
        parameters,
        options,
      ),
    list: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      options?: NetworkSecurityPerimeterAssociationsListOptionalParams,
    ) => list(context, resourceGroupName, networkSecurityPerimeterName, options),
    delete: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      associationName: string,
      options?: NetworkSecurityPerimeterAssociationsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, networkSecurityPerimeterName, associationName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      associationName: string,
      options?: NetworkSecurityPerimeterAssociationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        associationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      associationName: string,
      options?: NetworkSecurityPerimeterAssociationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        associationName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      associationName: string,
      parameters: NspAssociation,
      options?: NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        associationName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      associationName: string,
      parameters: NspAssociation,
      options?: NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        associationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      associationName: string,
      parameters: NspAssociation,
      options?: NetworkSecurityPerimeterAssociationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkSecurityPerimeterName,
        associationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkSecurityPerimeterName: string,
      associationName: string,
      options?: NetworkSecurityPerimeterAssociationsGetOptionalParams,
    ) => get(context, resourceGroupName, networkSecurityPerimeterName, associationName, options),
  };
}

export function _getNetworkSecurityPerimeterAssociationsOperations(
  context: NetworkManagementContext,
): NetworkSecurityPerimeterAssociationsOperations {
  return {
    ..._getNetworkSecurityPerimeterAssociations(context),
  };
}
