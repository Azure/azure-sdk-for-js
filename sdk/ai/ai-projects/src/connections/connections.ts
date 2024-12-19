// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { GetConnectionResponseOutput } from "./inputOutput.js";
import type {
  GetWorkspaceParameters,
  GetConnectionParameters,
  GetConnectionWithSecretsParameters,
  ListConnectionsParameters,
} from "../customization/parameters.js";
import type {
  GetConnectionOptionalParams,
  GetConnectionWithSecretsOptionalParams,
  GetWorkspaceOptionalParams,
  ListConnectionsOptionalParams,
} from "./customModels.js";
import type { GetWorkspaceResponseOutput } from "../customization/outputModels.js";

const expectedStatuses = ["200"];

/** Gets the properties of the specified machine learning workspace. */
export async function getWorkspace(
  context: Client,
  options: GetWorkspaceOptionalParams = {},
): Promise<GetWorkspaceResponseOutput> {
  const getOptions: GetWorkspaceParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  const result = await context.path("/").get(getOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}

/** List the details of all the connections (not including their credentials) */
export async function listConnections(
  context: Client,
  options: ListConnectionsOptionalParams = {},
): Promise<Array<GetConnectionResponseOutput>> {
  const listOptions: ListConnectionsParameters = {
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      ...(options.includeAll && { includeAll: options.includeAll }),
      ...(options.category && { category: options.category }),
      ...(options.target && { target: options.target }),
    },
  };
  const result = await context.path("/connections").get(listOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body.value;
}

/** Get the details of a single connection, without credentials. */
export async function getConnection(
  context: Client,
  connectionName: string,
  options: GetConnectionOptionalParams = {},
): Promise<GetConnectionResponseOutput> {
  const getOptions: GetConnectionParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  const result = await context
    .path("/connections/{connectionName}", connectionName)
    .get(getOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}

/** Get the details of a single connection, including credentials (if available). */
export async function getConnectionWithSecrets(
  context: Client,
  connectionName: string,
  options: GetConnectionWithSecretsOptionalParams = {},
): Promise<GetConnectionResponseOutput> {
  const getOptions: GetConnectionWithSecretsParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      ignored: "",
    },
  };
  const result = await context
    .path("/connections/{connectionName}/listsecrets", connectionName)
    .post(getOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}
