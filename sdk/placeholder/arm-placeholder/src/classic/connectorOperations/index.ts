// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsContext } from "../../api/messagingConnectorsContext.js";
import {
  updateTags,
  listBySubscription,
  listByResourceGroup,
  resume,
  pause,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectorOperations/operations.js";
import {
  ConnectorOperationsUpdateTagsOptionalParams,
  ConnectorOperationsListBySubscriptionOptionalParams,
  ConnectorOperationsListByResourceGroupOptionalParams,
  ConnectorOperationsResumeOptionalParams,
  ConnectorOperationsPauseOptionalParams,
  ConnectorOperationsDeleteOptionalParams,
  ConnectorOperationsCreateOrUpdateOptionalParams,
  ConnectorOperationsGetOptionalParams,
} from "../../api/connectorOperations/options.js";
import {
  MessagingConnector,
  MessagingConnectorTagsUpdate,
} from "../../models/azure/mgmt/placeholder/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectorOperations operations. */
export interface ConnectorOperationsOperations {
  /** Update Tags of Connector */
  updateTags: (
    resourceGroupName: string,
    name: string,
    properties: MessagingConnectorTagsUpdate,
    options?: ConnectorOperationsUpdateTagsOptionalParams,
  ) => Promise<MessagingConnector>;
  /** List Connector By Subscription */
  listBySubscription: (
    options?: ConnectorOperationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MessagingConnector>;
  /** List Connector By ResourceGroup and Subscription */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ConnectorOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MessagingConnector>;
  /** Resume one Connector to running status */
  resume: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorOperationsResumeOptionalParams,
  ) => Promise<void>;
  /** Pause one Connector to paused status */
  pause: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorOperationsPauseOptionalParams,
  ) => Promise<void>;
  /** Delete an Connector instance for the specified subscription, resource group, and instance name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create an Connector instance for the specified subscription, resource group, and instance name. */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    resource: MessagingConnector,
    options?: ConnectorOperationsCreateOrUpdateOptionalParams,
  ) => Promise<MessagingConnector>;
  /** Gets an Connector instance for the specified subscription, resource group, and instance name. */
  get: (
    resourceGroupName: string,
    name: string,
    options?: ConnectorOperationsGetOptionalParams,
  ) => Promise<MessagingConnector>;
}

function _getConnectorOperations(context: MessagingConnectorsContext) {
  return {
    updateTags: (
      resourceGroupName: string,
      name: string,
      properties: MessagingConnectorTagsUpdate,
      options?: ConnectorOperationsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, name, properties, options),
    listBySubscription: (
      options?: ConnectorOperationsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ConnectorOperationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    resume: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorOperationsResumeOptionalParams,
    ) => resume(context, resourceGroupName, name, options),
    pause: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorOperationsPauseOptionalParams,
    ) => pause(context, resourceGroupName, name, options),
    delete: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      resource: MessagingConnector,
      options?: ConnectorOperationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, resource, options),
    get: (
      resourceGroupName: string,
      name: string,
      options?: ConnectorOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, name, options),
  };
}

export function _getConnectorOperationsOperations(
  context: MessagingConnectorsContext,
): ConnectorOperationsOperations {
  return {
    ..._getConnectorOperations(context),
  };
}
