// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext } from "../../api/impactContext.js";
import {
  listBySubscription,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/connectors/operations.js";
import {
  ConnectorsListBySubscriptionOptionalParams,
  ConnectorsDeleteOptionalParams,
  ConnectorsUpdateOptionalParams,
  ConnectorsCreateOrUpdateOptionalParams,
  ConnectorsGetOptionalParams,
} from "../../api/connectors/options.js";
import { Connector } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
    properties: Connector,
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
      listBySubscription(context, options),
    delete: (connectorName: string, options?: ConnectorsDeleteOptionalParams) =>
      $delete(context, connectorName, options),
    update: (
      connectorName: string,
      properties: Connector,
      options?: ConnectorsUpdateOptionalParams,
    ) => update(context, connectorName, properties, options),
    createOrUpdate: (
      connectorName: string,
      resource: Connector,
      options?: ConnectorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, connectorName, resource, options),
    get: (connectorName: string, options?: ConnectorsGetOptionalParams) =>
      get(context, connectorName, options),
  };
}

export function _getConnectorsOperations(context: ImpactContext): ConnectorsOperations {
  return {
    ..._getConnectors(context),
  };
}
