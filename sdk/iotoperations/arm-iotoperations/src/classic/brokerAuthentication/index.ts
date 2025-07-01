// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { BrokerAuthenticationResource } from "../../models/models.js";
import {
  BrokerAuthenticationListByResourceGroupOptionalParams,
  BrokerAuthenticationDeleteOptionalParams,
  BrokerAuthenticationCreateOrUpdateOptionalParams,
  BrokerAuthenticationGetOptionalParams,
} from "../../api/brokerAuthentication/options.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/brokerAuthentication/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BrokerAuthentication operations. */
export interface BrokerAuthenticationOperations {
  /** List BrokerAuthenticationResource resources by BrokerResource */
  listByResourceGroup: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerAuthenticationListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BrokerAuthenticationResource>;
  /** Delete a BrokerAuthenticationResource */
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
    authenticationName: string,
    options?: BrokerAuthenticationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a BrokerAuthenticationResource */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authenticationName: string,
    resource: BrokerAuthenticationResource,
    options?: BrokerAuthenticationCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BrokerAuthenticationResource>, BrokerAuthenticationResource>;
  /** Get a BrokerAuthenticationResource */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authenticationName: string,
    options?: BrokerAuthenticationGetOptionalParams,
  ) => Promise<BrokerAuthenticationResource>;
}

function _getBrokerAuthentication(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerAuthenticationListByResourceGroupOptionalParams,
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
      authenticationName: string,
      options?: BrokerAuthenticationDeleteOptionalParams,
    ) =>
      $delete(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        authenticationName,
        options,
      ),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authenticationName: string,
      resource: BrokerAuthenticationResource,
      options?: BrokerAuthenticationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        authenticationName,
        resource,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authenticationName: string,
      options?: BrokerAuthenticationGetOptionalParams,
    ) =>
      get(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        authenticationName,
        options,
      ),
  };
}

export function _getBrokerAuthenticationOperations(
  context: IoTOperationsContext,
): BrokerAuthenticationOperations {
  return {
    ..._getBrokerAuthentication(context),
  };
}
