// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/brokerAuthorization/operations.js";
import type {
  BrokerAuthorizationListByResourceGroupOptionalParams,
  BrokerAuthorizationDeleteOptionalParams,
  BrokerAuthorizationCreateOrUpdateOptionalParams,
  BrokerAuthorizationGetOptionalParams,
} from "../../api/brokerAuthorization/options.js";
import type { BrokerAuthorizationResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BrokerAuthorization operations. */
export interface BrokerAuthorizationOperations {
  /** List BrokerAuthorizationResource resources by BrokerResource */
  listByResourceGroup: (
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
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authorizationName: string,
    options?: BrokerAuthorizationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a BrokerAuthorizationResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authorizationName: string,
    resource: BrokerAuthorizationResource,
    options?: BrokerAuthorizationCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BrokerAuthorizationResource>, BrokerAuthorizationResource>;
  /** Get a BrokerAuthorizationResource */
  get: (
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
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerAuthorizationListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, instanceName, brokerName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authorizationName: string,
      options?: BrokerAuthorizationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, brokerName, authorizationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authorizationName: string,
      resource: BrokerAuthorizationResource,
      options?: BrokerAuthorizationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instanceName,
        brokerName,
        authorizationName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authorizationName: string,
      options?: BrokerAuthorizationGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, brokerName, authorizationName, options),
  };
}

export function _getBrokerAuthorizationOperations(
  context: IoTOperationsContext,
): BrokerAuthorizationOperations {
  return {
    ..._getBrokerAuthorization(context),
  };
}
