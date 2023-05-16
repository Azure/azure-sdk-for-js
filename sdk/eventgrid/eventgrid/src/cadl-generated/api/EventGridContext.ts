// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventGridContext } from "../rest/index";
import { AzureKeyCredential } from "@azure/core-auth";
import getClient from "../rest/index";
import { ClientOptions } from "../common/interfaces";

export { EventGridContext } from "../rest/index";

/** Azure Messaging EventGrid Client */
export function createEventGrid(
  endpoint: string,
  credential: AzureKeyCredential,
  options: ClientOptions = {}
): EventGridContext {
  const baseUrl = endpoint;
  options.credentials = {
    ...options.credentials,
    apiKeyHeaderName: "Authorization",
  };
  const clientContext = getClient(baseUrl, credential, options);
  return clientContext;
}
