// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/connector/operations.js";
import {
  ConnectorListOptionalParams,
  ConnectorDeleteOptionalParams,
  ConnectorCreateOrUpdateOptionalParams,
  ConnectorGetOptionalParams,
} from "../../api/connector/options.js";
import { ConnectorResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Connector operations. */
export interface ConnectorOperations {
  /** Lists all the connectors in a cluster */
  list: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    options?: ConnectorListOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectorResource>;
  /** Delete confluent connector by name */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    connectorName: string,
    options?: ConnectorDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    connectorName: string,
    options?: ConnectorDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    connectorName: string,
    options?: ConnectorDeleteOptionalParams,
  ) => Promise<void>;
  /** Create confluent connector by Name */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    connectorName: string,
    options?: ConnectorCreateOrUpdateOptionalParams,
  ) => Promise<ConnectorResource>;
  /** Get confluent connector by Name */
  get: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    clusterId: string,
    connectorName: string,
    options?: ConnectorGetOptionalParams,
  ) => Promise<ConnectorResource>;
}

function _getConnector(context: ConfluentManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      options?: ConnectorListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, environmentId, clusterId, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      connectorName: string,
      options?: ConnectorDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        connectorName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      connectorName: string,
      options?: ConnectorDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        connectorName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      connectorName: string,
      options?: ConnectorDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        connectorName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      connectorName: string,
      options?: ConnectorCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        connectorName,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      clusterId: string,
      connectorName: string,
      options?: ConnectorGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        connectorName,
        options,
      ),
  };
}

export function _getConnectorOperations(context: ConfluentManagementContext): ConnectorOperations {
  return {
    ..._getConnector(context),
  };
}
