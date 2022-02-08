// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import PurviewCatalog, { PurviewCatalogRestClient } from "../../../src";
import { ClientSecretCredential } from "@azure/identity";
import { ClientOptions } from "@azure-rest/core-client";
import { env } from "@azure-tools/test-recorder";
import * as dotenv from "dotenv";

dotenv.config();

export function createClient(options?: ClientOptions): PurviewCatalogRestClient {
  const credential = new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );
  return PurviewCatalog(env.ENDPOINT, credential, options);
}
