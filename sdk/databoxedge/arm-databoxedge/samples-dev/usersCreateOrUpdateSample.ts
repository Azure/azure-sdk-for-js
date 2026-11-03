// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new user or updates an existing user's information on a Data Box Edge/Data Box Gateway device.
 *
 * @summary creates a new user or updates an existing user's information on a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/UserPut.json
 */
async function userPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.users.createOrUpdate(
    "testedgedevice",
    "user1",
    "GroupForEdgeAutomation",
    {
      encryptedPassword: {
        encryptionAlgorithm: "None",
        encryptionCertThumbprint: "blah",
        value: "<value>",
      },
      userType: "Share",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await userPut();
}

main().catch(console.error);
