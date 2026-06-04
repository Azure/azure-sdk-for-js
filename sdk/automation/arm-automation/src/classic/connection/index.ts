// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/connection/operations.js";
import type {
  ConnectionListByAutomationAccountOptionalParams,
  ConnectionDeleteOptionalParams,
  ConnectionUpdateOptionalParams,
  ConnectionCreateOrUpdateOptionalParams,
  ConnectionGetOptionalParams,
} from "../../api/connection/options.js";
import type {
  Connection,
  ConnectionCreateOrUpdateParameters,
  ConnectionUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Connection operations. */
export interface ConnectionOperations {
  /** Retrieve a list of connections. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: ConnectionListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Connection>;
  /** Delete the connection. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionName: string,
    options?: ConnectionDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a connection. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionName: string,
    parameters: ConnectionUpdateParameters,
    options?: ConnectionUpdateOptionalParams,
  ) => Promise<Connection>;
  /** Create or update a connection. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionName: string,
    parameters: ConnectionCreateOrUpdateParameters,
    options?: ConnectionCreateOrUpdateOptionalParams,
  ) => Promise<Connection>;
  /** Retrieve the connection identified by connection name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    connectionName: string,
    options?: ConnectionGetOptionalParams,
  ) => Promise<Connection>;
}

function _getConnection(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: ConnectionListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionName: string,
      options?: ConnectionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, connectionName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      connectionName: string,
      parameters: ConnectionUpdateParameters,
      options?: ConnectionUpdateOptionalParams,
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
      options?: ConnectionCreateOrUpdateOptionalParams,
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
      options?: ConnectionGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, connectionName, options),
  };
}

export function _getConnectionOperations(context: AutomationContext): ConnectionOperations {
  return {
    ..._getConnection(context),
  };
}
