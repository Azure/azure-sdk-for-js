// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectionsListResponse,
  ConnectionsListSecretsResponse,
} from "../../models/models.js";
import { deserializeConnectionPropertiesUnion } from "../../utils/deserializeUtil.js";
import { ClientContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  ConnectionsListOptionalParams,
  ConnectionsListSecretsOptionalParams,
} from "../../models/options.js";

export function _listSend(
  context: Client,
  options: ConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/connections")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionsListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        name: p["name"],
        properties: deserializeConnectionPropertiesUnion(p.properties),
      };
    }),
  };
}

/** List the details of all the connections (not including their credentials) */
export async function list(
  context: Client,
  options: ConnectionsListOptionalParams = { requestOptions: {} },
): Promise<ConnectionsListResponse> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}

export function _listSecretsSend(
  context: Client,
  connectionNameInUrl: string,
  connectionName: string,
  subscriptionId: string,
  resourceGroupName: string,
  workspaceName: string,
  apiVersionInBody: string,
  options: ConnectionsListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/connections/{connectionNameInUrl}/listsecrets", connectionNameInUrl)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        connectionName: connectionName,
        subscriptionId: subscriptionId,
        resourceGroupName: resourceGroupName,
        workspaceName: workspaceName,
        apiVersionInBody: apiVersionInBody,
      },
    });
}

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionsListSecretsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    name: result.body["name"],
    properties: deserializeConnectionPropertiesUnion(result.body.properties),
  };
}

/** Get the details of a single connection, including credential (if available). */
export async function listSecrets(
  context: Client,
  connectionNameInUrl: string,
  connectionName: string,
  subscriptionId: string,
  resourceGroupName: string,
  workspaceName: string,
  apiVersionInBody: string,
  options: ConnectionsListSecretsOptionalParams = { requestOptions: {} },
): Promise<ConnectionsListSecretsResponse> {
  const result = await _listSecretsSend(
    context,
    connectionNameInUrl,
    connectionName,
    subscriptionId,
    resourceGroupName,
    workspaceName,
    apiVersionInBody,
    options,
  );
  return _listSecretsDeserialize(result);
}
