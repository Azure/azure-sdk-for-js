// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext } from "../../api/azureArcDataContext.js";
import { list, $delete, create, get } from "../../api/activeDirectoryConnectors/operations.js";
import type {
  ActiveDirectoryConnectorsListOptionalParams,
  ActiveDirectoryConnectorsDeleteOptionalParams,
  ActiveDirectoryConnectorsCreateOptionalParams,
  ActiveDirectoryConnectorsGetOptionalParams,
} from "../../api/activeDirectoryConnectors/options.js";
import type { ActiveDirectoryConnectorResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ActiveDirectoryConnectors operations. */
export interface ActiveDirectoryConnectorsOperations {
  /** List the active directory connectors associated with the given data controller. */
  list: (
    resourceGroupName: string,
    dataControllerName: string,
    options?: ActiveDirectoryConnectorsListOptionalParams,
  ) => PagedAsyncIterableIterator<ActiveDirectoryConnectorResource>;
  /** Deletes an Active Directory connector resource */
  delete: (
    resourceGroupName: string,
    dataControllerName: string,
    activeDirectoryConnectorName: string,
    options?: ActiveDirectoryConnectorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or replaces an Active Directory connector resource. */
  create: (
    resourceGroupName: string,
    dataControllerName: string,
    activeDirectoryConnectorName: string,
    activeDirectoryConnectorResource: ActiveDirectoryConnectorResource,
    options?: ActiveDirectoryConnectorsCreateOptionalParams,
  ) => PollerLike<
    OperationState<ActiveDirectoryConnectorResource>,
    ActiveDirectoryConnectorResource
  >;
  /** Retrieves an Active Directory connector resource */
  get: (
    resourceGroupName: string,
    dataControllerName: string,
    activeDirectoryConnectorName: string,
    options?: ActiveDirectoryConnectorsGetOptionalParams,
  ) => Promise<ActiveDirectoryConnectorResource>;
}

function _getActiveDirectoryConnectors(context: AzureArcDataContext) {
  return {
    list: (
      resourceGroupName: string,
      dataControllerName: string,
      options?: ActiveDirectoryConnectorsListOptionalParams,
    ) => list(context, resourceGroupName, dataControllerName, options),
    delete: (
      resourceGroupName: string,
      dataControllerName: string,
      activeDirectoryConnectorName: string,
      options?: ActiveDirectoryConnectorsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        dataControllerName,
        activeDirectoryConnectorName,
        options,
      ),
    create: (
      resourceGroupName: string,
      dataControllerName: string,
      activeDirectoryConnectorName: string,
      activeDirectoryConnectorResource: ActiveDirectoryConnectorResource,
      options?: ActiveDirectoryConnectorsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        dataControllerName,
        activeDirectoryConnectorName,
        activeDirectoryConnectorResource,
        options,
      ),
    get: (
      resourceGroupName: string,
      dataControllerName: string,
      activeDirectoryConnectorName: string,
      options?: ActiveDirectoryConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, dataControllerName, activeDirectoryConnectorName, options),
  };
}

export function _getActiveDirectoryConnectorsOperations(
  context: AzureArcDataContext,
): ActiveDirectoryConnectorsOperations {
  return {
    ..._getActiveDirectoryConnectors(context),
  };
}
