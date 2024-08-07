// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/identity";
import { TableClient, TableServiceClient } from "@azure/data-tables";
import { createTestCredential } from "@azure-tools/test-credential";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { EnvVarKeys } from "./constants.js";

function getStorageAccountName(): string {
  return assertEnvironmentVariable(EnvVarKeys.STORAGE_ACCOUNT_NAME);
}

export function createClients(
  inputOptions: {
    credential?: TokenCredential;
    storageAccountName?: string;
    tableName?: string;
  } = {},
): { serviceClient: TableServiceClient; tableClient: TableClient; tableName: string } {
  const {
    credential = createTestCredential(),
    storageAccountName = getStorageAccountName(),
    tableName = `table${new Date().getTime()}${Math.floor(Math.random() * 10) + 1}`,
  } = inputOptions;
  const endpoint = `https://${storageAccountName}.table.core.windows.net`;
  const serviceClient = new TableServiceClient(endpoint, credential);
  const tableClient = new TableClient(endpoint, tableName, credential);
  return {
    serviceClient,
    tableClient,
    tableName,
  };
}
