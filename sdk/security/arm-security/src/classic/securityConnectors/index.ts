// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/securityConnectors/operations.js";
import type {
  SecurityConnectorsListOptionalParams,
  SecurityConnectorsListByResourceGroupOptionalParams,
  SecurityConnectorsDeleteOptionalParams,
  SecurityConnectorsUpdateOptionalParams,
  SecurityConnectorsCreateOrUpdateOptionalParams,
  SecurityConnectorsGetOptionalParams,
} from "../../api/securityConnectors/options.js";
import type { SecurityConnectorsAPISecurityConnector } from "../../models/securityConnectorsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecurityConnectors operations. */
export interface SecurityConnectorsOperations {
  /** Lists all the security connectors in the specified subscription. Use the 'nextLink' property in the response to get the next page of security connectors for the specified subscription. */
  list: (
    options?: SecurityConnectorsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityConnectorsAPISecurityConnector>;
  /** Lists all the security connectors in the specified resource group. Use the 'nextLink' property in the response to get the next page of security connectors for the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SecurityConnectorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityConnectorsAPISecurityConnector>;
  /** Deletes a security connector. */
  delete: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: SecurityConnectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a security connector */
  update: (
    resourceGroupName: string,
    securityConnectorName: string,
    securityConnector: SecurityConnectorsAPISecurityConnector,
    options?: SecurityConnectorsUpdateOptionalParams,
  ) => Promise<SecurityConnectorsAPISecurityConnector>;
  /** Creates or updates a security connector. If a security connector is already created and a subsequent request is issued for the same security connector id, then it will be updated. */
  createOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    securityConnector: SecurityConnectorsAPISecurityConnector,
    options?: SecurityConnectorsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityConnectorsAPISecurityConnector>;
  /** Retrieves details of a specific security connector */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: SecurityConnectorsGetOptionalParams,
  ) => Promise<SecurityConnectorsAPISecurityConnector>;
}

function _getSecurityConnectors(context: SecurityCenterContext) {
  return {
    list: (options?: SecurityConnectorsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SecurityConnectorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: SecurityConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, securityConnectorName, options),
    update: (
      resourceGroupName: string,
      securityConnectorName: string,
      securityConnector: SecurityConnectorsAPISecurityConnector,
      options?: SecurityConnectorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, securityConnectorName, securityConnector, options),
    createOrUpdate: (
      resourceGroupName: string,
      securityConnectorName: string,
      securityConnector: SecurityConnectorsAPISecurityConnector,
      options?: SecurityConnectorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, securityConnectorName, securityConnector, options),
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: SecurityConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, options),
  };
}

export function _getSecurityConnectorsOperations(
  context: SecurityCenterContext,
): SecurityConnectorsOperations {
  return {
    ..._getSecurityConnectors(context),
  };
}
