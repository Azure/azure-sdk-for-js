// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a monitor resource.
 *
 * @summary create a monitor resource.
 * x-ms-original-file: 2025-12-26-preview/Monitors_Create.json
 */
async function monitorsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitors.create("myResourceGroup", "myMonitor", {
    body: {
      location: "West US",
      properties: {
        datadogOrganizationProperties: {
          name: "myOrg",
          cspm: false,
          enterpriseAppId: "00000000-0000-0000-0000-000000000000",
          id: "myOrg123",
          linkingAuthCode: "someAuthCode",
          linkingClientId: "00000000-0000-0000-0000-000000000000",
          resourceCollection: false,
        },
        marketplaceOfferDetails: {
          publisherId: "datadog1591740804488",
          offerId: "dd_liftr_v3_decoupled",
        },
        monitoringStatus: "Enabled",
        userInfo: {
          name: "Alice",
          emailAddress: "alice@microsoft.com",
          phoneNumber: "123-456-7890",
        },
      },
      sku: { name: "free_Monthly" },
      tags: { Environment: "Dev" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsCreate();
}

main().catch(console.error);
