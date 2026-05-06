// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, update, create, get } from "../../api/accountConnections/operations.js";
import {
  AccountConnectionsListOptionalParams,
  AccountConnectionsDeleteOptionalParams,
  AccountConnectionsUpdateOptionalParams,
  AccountConnectionsCreateOptionalParams,
  AccountConnectionsGetOptionalParams,
} from "../../api/accountConnections/options.js";
import { ConnectionPropertiesV2BasicResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccountConnections operations. */
export interface AccountConnectionsOperations {
  /** Lists all the available  Cognitive Services account connections under the specified account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectionPropertiesV2BasicResource>;
  /** Delete Cognitive Services account connection by name. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    connectionName: string,
    options?: AccountConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update Cognitive Services account connection under the specified account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    connectionName: string,
    options?: AccountConnectionsUpdateOptionalParams,
  ) => Promise<ConnectionPropertiesV2BasicResource>;
  /** Create or update Cognitive Services account connection under the specified account. */
  create: (
    resourceGroupName: string,
    accountName: string,
    connectionName: string,
    options?: AccountConnectionsCreateOptionalParams,
  ) => Promise<ConnectionPropertiesV2BasicResource>;
  /** Lists Cognitive Services account connection by name. */
  get: (
    resourceGroupName: string,
    accountName: string,
    connectionName: string,
    options?: AccountConnectionsGetOptionalParams,
  ) => Promise<ConnectionPropertiesV2BasicResource>;
}

function _getAccountConnections(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      connectionName: string,
      options?: AccountConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, connectionName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      connectionName: string,
      options?: AccountConnectionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, connectionName, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      connectionName: string,
      options?: AccountConnectionsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, connectionName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      connectionName: string,
      options?: AccountConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, connectionName, options),
  };
}

export function _getAccountConnectionsOperations(
  context: CognitiveServicesManagementContext,
): AccountConnectionsOperations {
  return {
    ..._getAccountConnections(context),
  };
}
