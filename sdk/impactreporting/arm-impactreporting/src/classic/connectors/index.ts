// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext } from "../../api/impactContext.js";
import {
  connectorsListBySubscription,
  connectorsDelete,
  connectorsUpdate,
  connectorsCreateOrUpdate,
  connectorsGet,
} from "../../api/connectors/index.js";
import { Connector, ConnectorUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  ConnectorsListBySubscriptionOptionalParams,
  ConnectorsDeleteOptionalParams,
  ConnectorsUpdateOptionalParams,
  ConnectorsCreateOrUpdateOptionalParams,
  ConnectorsGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a Connectors operations. */
export interface ConnectorsOperations {
  /** List Connector resources by subscription ID */
  listBySubscription: (
    options?: ConnectorsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Connector>;
  /** Delete a Connector */
  delete: (connectorName: string, options?: ConnectorsDeleteOptionalParams) => Promise<void>;
  /** Update a Connector */
  update: (
    connectorName: string,
    properties: ConnectorUpdate,
    options?: ConnectorsUpdateOptionalParams,
  ) => Promise<Connector>;
  /** Create a Connector */
  createOrUpdate: (
    connectorName: string,
    resource: Connector,
    options?: ConnectorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Connector>, Connector>;
  /** Get a Connector */
  get: (connectorName: string, options?: ConnectorsGetOptionalParams) => Promise<Connector>;
}

function _getConnectors(context: ImpactContext) {
  return {
    listBySubscription: (options?: ConnectorsListBySubscriptionOptionalParams) =>
      connectorsListBySubscription(context, options),
    delete: (connectorName: string, options?: ConnectorsDeleteOptionalParams) =>
      connectorsDelete(context, connectorName, options),
    update: (
      connectorName: string,
      properties: ConnectorUpdate,
      options?: ConnectorsUpdateOptionalParams,
    ) => connectorsUpdate(context, connectorName, properties, options),
    createOrUpdate: (
      connectorName: string,
      resource: Connector,
      options?: ConnectorsCreateOrUpdateOptionalParams,
    ) => connectorsCreateOrUpdate(context, connectorName, resource, options),
    get: (connectorName: string, options?: ConnectorsGetOptionalParams) =>
      connectorsGet(context, connectorName, options),
  };
}

export function _getConnectorsOperations(context: ImpactContext): ConnectorsOperations {
  return {
    ..._getConnectors(context),
  };
}
