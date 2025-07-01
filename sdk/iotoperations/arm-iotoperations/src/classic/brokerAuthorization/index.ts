// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { BrokerAuthorizationResource } from "../../models/models.js";
import {
  BrokerAuthorizationListByResourceGroupOptionalParams,
  BrokerAuthorizationDeleteOptionalParams,
  BrokerAuthorizationCreateOrUpdateOptionalParams,
  BrokerAuthorizationGetOptionalParams,
} from "../../api/brokerAuthorization/options.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/brokerAuthorization/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BrokerAuthorization operations. */
export interface BrokerAuthorizationOperations {
  /** List BrokerAuthorizationResource resources by BrokerResource */
  listByResourceGroup: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerAuthorizationListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BrokerAuthorizationResource>;
  /** Delete a BrokerAuthorizationResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authorizationName: string,
    options?: BrokerAuthorizationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a BrokerAuthorizationResource */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authorizationName: string,
    resource: BrokerAuthorizationResource,
    options?: BrokerAuthorizationCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BrokerAuthorizationResource>, BrokerAuthorizationResource>;
  /** Get a BrokerAuthorizationResource */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authorizationName: string,
    options?: BrokerAuthorizationGetOptionalParams,
  ) => Promise<BrokerAuthorizationResource>;
}

function _getBrokerAuthorization(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerAuthorizationListByResourceGroupOptionalParams,
    ) =>
      listByResourceGroup(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        options,
      ),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authorizationName: string,
      options?: BrokerAuthorizationDeleteOptionalParams,
    ) =>
      $delete(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        authorizationName,
        options,
      ),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authorizationName: string,
      resource: BrokerAuthorizationResource,
      options?: BrokerAuthorizationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        authorizationName,
        resource,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authorizationName: string,
      options?: BrokerAuthorizationGetOptionalParams,
    ) =>
      get(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        authorizationName,
        options,
      ),
  };
}

export function _getBrokerAuthorizationOperations(
  context: IoTOperationsContext,
): BrokerAuthorizationOperations {
  return {
    ..._getBrokerAuthorization(context),
  };
}
