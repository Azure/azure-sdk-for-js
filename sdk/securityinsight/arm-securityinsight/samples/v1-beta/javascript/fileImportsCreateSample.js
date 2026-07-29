// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the file import.
 *
 * @summary creates the file import.
 * x-ms-original-file: 2025-07-01-preview/fileImports/CreateFileImport.json
 */
async function createAFileImport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.fileImports.create(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
    {
      contentType: "StixIndicator",
      importFile: { fileFormat: "JSON", fileName: "myFile.json", fileSize: 4653 },
      ingestionMode: "IngestAnyValidRecords",
      source: "mySource",
    },
  );
  console.log(result);
}

async function main() {
  await createAFileImport();
}

main().catch(console.error);
