// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an Operator API Connection.
 *
 * @summary create an Operator API Connection.
 * x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Create_MaximumSet_Gen.json
 */

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

async function operatorApiConnectionsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.operatorApiConnections.create("rgopenapi", "nzsdg", {
    properties: {
      operatorApiPlanId:
        "/subscriptions/00000000-0000-0000-0000-00000000000/providers/Microsoft.ProgrammableConnectivity/operatorApiPlans/livmzrh",
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
      appId: "czgrhbvgr",
      gatewayId:
        "/subscriptions/00000000-0000-0000-0000-00000000000/resourceGroups/example-rg/providers/Microsoft.ProgrammableConnectivity/gateways/cdvcixxcdhjqw",
      accountType: "AzureManaged",
      appSecret: "wtxnpes",
      status: { state: "rvez", reason: "fpteanxqzqixfmymib" },
    },
    tags: { key5536: "bjhvpzsmtalqxmjjbsfdizhg" },
    location: "dwvzfkjoepbmksygazllqryyinn",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await operatorApiConnectionsCreate();
}

main().catch(console.error);
