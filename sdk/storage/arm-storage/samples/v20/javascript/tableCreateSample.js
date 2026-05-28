// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new table with the specified table name, under the specified account.
 *
 * @summary creates a new table with the specified table name, under the specified account.
 * x-ms-original-file: 2025-08-01/TableOperationPut.json
 */
async function tableOperationPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.table.create("res3376", "sto328", "table6185");
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new table with the specified table name, under the specified account.
 *
 * @summary creates a new table with the specified table name, under the specified account.
 * x-ms-original-file: 2025-08-01/TableOperationPutOrPatchAclsTableCreate.json
 */
async function tableOperationPutOrPatchAcls() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.table.create("res3376", "sto328", "table6185", {
    parameters: {
      signedIdentifiers: [
        {
          accessPolicy: {
            expiryTime: new Date("2022-03-20T08:49:37.0000000Z"),
            permission: "raud",
            startTime: new Date("2022-03-17T08:49:37.0000000Z"),
          },
          id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI",
        },
        {
          accessPolicy: {
            expiryTime: new Date("2022-03-20T08:49:37.0000000Z"),
            permission: "rad",
            startTime: new Date("2022-03-17T08:49:37.0000000Z"),
          },
          id: "PTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODklMTI",
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await tableOperationPut();
  await tableOperationPutOrPatchAcls();
}

main().catch(console.error);
