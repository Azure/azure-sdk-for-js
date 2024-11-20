// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { GetConnectionResponseOutput, GetWorkspaceResponseOutput, ListConnectionsResponseOutput } from "./inputOutput.js";
import { GetWorkspaceParameters, GetConnectionParameters, GetConnectionWithSecretsParameters, ListConnectionsParameters } from "../generated/src/parameters.js";

const expectedStatuses = ["200"];

/** Gets the properties of the specified machine learning workspace. */
export async function getWorkspace(
  context: Client,
  options?: GetWorkspaceParameters
): Promise<GetWorkspaceResponseOutput> {
  const result = await context.path("/").get(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}

/** List the details of all the connections (not including their credentials) */
export async function listConnections(
  context: Client,
  options?: ListConnectionsParameters
): Promise<ListConnectionsResponseOutput> {
  const result = await context.path("/connections").get(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}

/** Get the details of a single connection, without credentials. */
export async function getConnection(
  context: Client,
  connectionName: string,
  options?: GetConnectionParameters
): Promise<GetConnectionResponseOutput> {
  const result = await context.path("/connections/{connectionName}", connectionName).get(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}

/** Get the details of a single connection, including credentials (if available). */
export async function getConnectionWithSecrets(
  context: Client,
  connectionName: string,
  options?: GetConnectionWithSecretsParameters
): Promise<GetConnectionResponseOutput> {
  const result = await context.path("/connections/{connectionName}/listsecrets", connectionName).post(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}
