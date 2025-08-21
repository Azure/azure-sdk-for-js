// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update an Operator API Connection.
 *
 * @summary update an Operator API Connection.
 * x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Update_MaximumSet_Gen.json
 */

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

async function operatorApiConnectionsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.operatorApiConnections.update("rgopenapi", "syefewgf", {
    tags: { key3150: "sfcwbiogxulvyyvvqkumfxhussk" },
    properties: {
      operatorApiPlanId:
        "/subscriptions/00000000-0000-0000-0000-00000000000/providers/Microsoft.ProgrammableConnectivity/operatorApiPlans/yhlygxdwvrzgazbfzyz",
      saasProperties: {
        saasSubscriptionId: "mgyusmqt",
        saasResourceId: "pekejefyvfviabimdrmno",
      },
      configuredApplication: {
        name: "idzqqen",
        applicationDescription: "gjlwegnqvffvsc",
        applicationType: "f",
        legalName: "ar",
        organizationDescription: "fcueqzlxxr",
        taxNumber: "ngzv",
        privacyContactEmailAddress: "l",
      },
      appId: "mkfcrn",
      appSecret: "wtxnpes",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await operatorApiConnectionsUpdate();
}

main().catch(console.error);
