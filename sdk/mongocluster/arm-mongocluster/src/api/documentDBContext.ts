// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { DocumentDBContext } from "../rest/index.js";
import getClient from "../rest/index.js";

/** Optional parameters for the client. */
export interface DocumentDBClientOptions extends ClientOptions {
  /** The API version to use for this operation. */
  apiVersion?: string;
}

export { DocumentDBContext } from "../rest/index.js";

/** The Microsoft Azure management API provides create, read, update, and delete functionality for Azure Cosmos DB for MongoDB vCore resources including clusters and firewall rules. */
export function createDocumentDB(
  credential: TokenCredential,
  options: DocumentDBClientOptions = {},
): DocumentDBContext {
  const clientContext = getClient(credential, options);
  return clientContext;
}
