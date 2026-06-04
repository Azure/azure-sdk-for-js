// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectionType/operations.js";
import type {
  ConnectionTypeListByAutomationAccountOptionalParams,
  ConnectionTypeDeleteOptionalParams,
  ConnectionTypeCreateOrUpdateOptionalParams,
  ConnectionTypeGetOptionalParams,
} from "../../api/connectionType/options.js";
import type {
  ConnectionType,
  ConnectionTypeCreateOrUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectionType operations. */
export interface ConnectionTypeOperations {
  /** Retrieve a list of connection types. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: ConnectionTypeListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectionType>;
  /** Delete the connection type. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionTypeName: string,
    options?: ConnectionTypeDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a connection type. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionTypeName: string,
    parameters: ConnectionTypeCreateOrUpdateParameters,
    options?: ConnectionTypeCreateOrUpdateOptionalParams,
  ) => Promise<ConnectionType>;
  /** Retrieve the connection type identified by connection type name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionTypeName: string,
    options?: ConnectionTypeGetOptionalParams,
  ) => Promise<ConnectionType>;
}

function _getConnectionType(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: ConnectionTypeListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionTypeName: string,
      options?: ConnectionTypeDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, connectionTypeName, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionTypeName: string,
      parameters: ConnectionTypeCreateOrUpdateParameters,
      options?: ConnectionTypeCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        connectionTypeName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionTypeName: string,
      options?: ConnectionTypeGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, connectionTypeName, options),
  };
}

export function _getConnectionTypeOperations(context: AutomationContext): ConnectionTypeOperations {
  return {
    ..._getConnectionType(context),
  };
}
