// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new user or updates an existing user's information on a Data Box Edge/Data Box Gateway device.
 *
 * @summary Creates a new user or updates an existing user's information on a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/UserPut.json
 */

import type { User } from "@azure/arm-databoxedge";
import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

async function userPut(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const name = "user1";
  const resourceGroupName = "GroupForEdgeAutomation";
  const user: User = {
    encryptedPassword: {
      encryptionAlgorithm: "None",
      encryptionCertThumbprint: "blah",
      value: "<value>",
    },
    userType: "Share",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.users.beginCreateOrUpdateAndWait(
    deviceName,
    name,
    resourceGroupName,
    user,
  );
  console.log(result);
}

userPut().catch(console.error);
