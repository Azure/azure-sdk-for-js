// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientSecretCredential } from "@azure/identity";
import { getEnvVar } from "@azure-tools/test-perf";
import "dotenv/config";

export const credential = new ClientSecretCredential(
  getEnvVar("AZURE_TENANT_ID"),
  getEnvVar("AZURE_CLIENT_ID"),
  getEnvVar("AZURE_CLIENT_SECRET"),
);

export const keyVaultUri = getEnvVar("KEYVAULT_URI");
