// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectionTypeOperations/operations.js";
import type {
  ConnectionTypeOperationsListByAutomationAccountOptionalParams,
  ConnectionTypeOperationsDeleteOptionalParams,
  ConnectionTypeOperationsCreateOrUpdateOptionalParams,
  ConnectionTypeOperationsGetOptionalParams,
} from "../../api/connectionTypeOperations/options.js";
import type {
  ConnectionType,
  ConnectionTypeCreateOrUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectionTypeOperations operations. */
export interface ConnectionTypeOperationsOperations {
  /** Retrieve a list of connection types. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: ConnectionTypeOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectionType>;
  /** Delete the connection type. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionTypeName: string,
    options?: ConnectionTypeOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a connection type. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionTypeName: string,
    parameters: ConnectionTypeCreateOrUpdateParameters,
    options?: ConnectionTypeOperationsCreateOrUpdateOptionalParams,
  ) => Promise<ConnectionType>;
  /** Retrieve the connection type identified by connection type name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionTypeName: string,
    options?: ConnectionTypeOperationsGetOptionalParams,
  ) => Promise<ConnectionType>;
}

function _getConnectionTypeOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: ConnectionTypeOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionTypeName: string,
      options?: ConnectionTypeOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, connectionTypeName, options),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionTypeName: string,
      parameters: ConnectionTypeCreateOrUpdateParameters,
      options?: ConnectionTypeOperationsCreateOrUpdateOptionalParams,
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
      options?: ConnectionTypeOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, connectionTypeName, options),
  };
}

export function _getConnectionTypeOperationsOperations(
  context: AutomationContext,
): ConnectionTypeOperationsOperations {
  return {
    ..._getConnectionTypeOperations(context),
  };
}
