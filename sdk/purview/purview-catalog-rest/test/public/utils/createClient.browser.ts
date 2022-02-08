// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import PurviewCatalog, { PurviewCatalogRestClient } from "../../../src";
import { ClientSecretCredential } from "@azure/identity";
import { ClientOptions } from "@azure-rest/core-client";
import { env } from "@azure-tools/test-recorder";
import "./env";
import { createXhrHttpClient } from "@azure/test-utils";

export function createClient(options?: ClientOptions): PurviewCatalogRestClient {
  const xhrClient = createXhrHttpClient();
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET,
    { httpClient: xhrClient }
  );
  return PurviewCatalog(env.ENDPOINT, credential, {
    ...options,
    httpClient: xhrClient,
  });
}
