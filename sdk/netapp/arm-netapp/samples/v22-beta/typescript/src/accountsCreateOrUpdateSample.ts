// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the specified NetApp account within the resource group
 *
 * @summary create or update the specified NetApp account within the resource group
 * x-ms-original-file: 2025-07-01-preview/Accounts_CreateOrUpdate.json
 */
async function accountsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.accounts.createOrUpdate("myRG", "account1", {
    location: "eastus",
    properties: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the specified NetApp account within the resource group
 *
 * @summary create or update the specified NetApp account within the resource group
 * x-ms-original-file: 2025-07-01-preview/Accounts_CreateOrUpdateAD.json
 */
async function accountsCreateOrUpdateWithActiveDirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.accounts.createOrUpdate("myRG", "account1", {
    location: "eastus",
    properties: {
      activeDirectories: [
        {
          aesEncryption: true,
          dns: "10.10.10.3",
          domain: "10.10.10.3",
          ldapOverTLS: false,
          ldapSigning: false,
          organizationalUnit: "OU=Engineering",
          password: "<REDACTED>",
          site: "SiteName",
          smbServerName: "SMBServer",
          username: "ad_user_name",
        },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await accountsCreateOrUpdate();
  await accountsCreateOrUpdateWithActiveDirectory();
}

main().catch(console.error);
