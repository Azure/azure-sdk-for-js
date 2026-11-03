// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a database script.
 *
 * @summary updates a database script.
 * x-ms-original-file: 2025-02-14/KustoScriptsUpdate.json
 */
async function kustoScriptsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.scripts.update(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "kustoScript",
    {
      continueOnErrors: true,
      forceUpdateTag: "2bcf3c21-ffd1-4444-b9dd-e52e00ee53fe",
      principalPermissionsAction: "RemovePermissionOnScriptCompletion",
      scriptLevel: "Database",
      scriptUrl: "https://mysa.blob.core.windows.net/container/script.txt",
      scriptUrlSasToken:
        "?sv=2019-02-02&st=2019-04-29T22%3A18%3A26Z&se=2019-04-30T02%3A23%3A26Z&sr=b&sp=rw&sip=168.1.5.60-168.1.5.70&spr=https&sig=********************************",
    },
  );
  console.log(result);
}

async function main() {
  await kustoScriptsUpdate();
}

main().catch(console.error);
