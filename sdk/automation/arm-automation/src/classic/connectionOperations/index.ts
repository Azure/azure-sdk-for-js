// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/connectionOperations/operations.js";
import type {
  ConnectionOperationsListByAutomationAccountOptionalParams,
  ConnectionOperationsDeleteOptionalParams,
  ConnectionOperationsUpdateOptionalParams,
  ConnectionOperationsCreateOrUpdateOptionalParams,
  ConnectionOperationsGetOptionalParams,
} from "../../api/connectionOperations/options.js";
import type {
  Connection,
  ConnectionCreateOrUpdateParameters,
  ConnectionUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectionOperations operations. */
export interface ConnectionOperationsOperations {
  /** Retrieve a list of connections. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: ConnectionOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Connection>;
  /** Delete the connection. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionName: string,
    options?: ConnectionOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a connection. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionName: string,
    parameters: ConnectionUpdateParameters,
    options?: ConnectionOperationsUpdateOptionalParams,
  ) => Promise<Connection>;
  /** Create or update a connection. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionName: string,
    parameters: ConnectionCreateOrUpdateParameters,
    options?: ConnectionOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Connection>;
  /** Retrieve the connection identified by connection name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionName: string,
    options?: ConnectionOperationsGetOptionalParams,
  ) => Promise<Connection>;
}

function _getConnectionOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: ConnectionOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionName: string,
      options?: ConnectionOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, connectionName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionName: string,
      parameters: ConnectionUpdateParameters,
      options?: ConnectionOperationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        automationAccountName,
        connectionName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionName: string,
      parameters: ConnectionCreateOrUpdateParameters,
      options?: ConnectionOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        connectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionName: string,
      options?: ConnectionOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, connectionName, options),
  };
}

export function _getConnectionOperationsOperations(
  context: AutomationContext,
): ConnectionOperationsOperations {
  return {
    ..._getConnectionOperations(context),
  };
}
