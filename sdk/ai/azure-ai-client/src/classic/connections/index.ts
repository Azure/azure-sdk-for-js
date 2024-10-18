// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientContext } from "../../api/azureAIContext.js";
import {
  ConnectionsListResponse,
  ConnectionsListSecretsResponse,
} from "../../models/models.js";
import { list, listSecrets } from "../../api/connections/index.js";
import {
  ConnectionsListOptionalParams,
  ConnectionsListSecretsOptionalParams,
} from "../../models/options.js";

/** Interface representing a Connections operations. */
export interface ConnectionsOperations {
  /** List the details of all the connections (not including their credentials) */
  list: (
    options?: ConnectionsListOptionalParams,
  ) => Promise<ConnectionsListResponse>;
  /** Get the details of a single connection, including credential (if available). */
  listSecrets: (
    connectionNameInUrl: string,
    connectionName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    apiVersionInBody: string,
    options?: ConnectionsListSecretsOptionalParams,
  ) => Promise<ConnectionsListSecretsResponse>;
}

export function getConnections(context: ClientContext) {
  return {
    list: (options?: ConnectionsListOptionalParams) => list(context, options),
    listSecrets: (
      connectionNameInUrl: string,
      connectionName: string,
      subscriptionId: string,
      resourceGroupName: string,
      workspaceName: string,
      apiVersionInBody: string,
      options?: ConnectionsListSecretsOptionalParams,
    ) =>
      listSecrets(
        context,
        connectionNameInUrl,
        connectionName,
        subscriptionId,
        resourceGroupName,
        workspaceName,
        apiVersionInBody,
        options,
      ),
  };
}

export function getConnectionsOperations(
  context: ClientContext,
): ConnectionsOperations {
  return {
    ...getConnections(context),
  };
}
