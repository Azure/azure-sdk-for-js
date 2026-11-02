// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to send test notifications to a set of provided receivers
 *
 * @summary send test notifications to a set of provided receivers
 * x-ms-original-file: 2023-05-01-preview/postTestNotificationsAtTenantActionGroupResourceLevel.json
 */
async function createNotificationsAtTenantActionGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.createNotificationsAtTenantActionGroupResourceLevel(
    "11111111-1111-1111-1111-111111111111",
    "testTenantActionGroup",
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    {
      alertType: "servicehealth",
      azureAppPushReceivers: [{ name: "Sample azureAppPush", emailAddress: "johndoe@email.com" }],
      emailReceivers: [
        {
          name: "John Doe's email",
          emailAddress: "johndoe@email.com",
          useCommonAlertSchema: false,
        },
        {
          name: "Jane Smith's email",
          emailAddress: "janesmith@email.com",
          useCommonAlertSchema: true,
        },
      ],
      smsReceivers: [
        { name: "John Doe's mobile", countryCode: "1", phoneNumber: "1234567890" },
        { name: "Jane Smith's mobile", countryCode: "1", phoneNumber: "0987654321" },
      ],
      voiceReceivers: [{ name: "Sample voice", countryCode: "1", phoneNumber: "1234567890" }],
      webhookReceivers: [
        {
          name: "Sample webhook 1",
          serviceUri: "http://www.example.com/webhook1",
          useCommonAlertSchema: true,
        },
        {
          name: "Sample webhook 2",
          identifierUri: "http://someidentifier/d7811ba3-7996-4a93-99b6-6b2f3f355f8a",
          objectId: "d3bb868c-fe44-452c-aa26-769a6538c808",
          serviceUri: "http://www.example.com/webhook2",
          tenantId: "68a4459a-ccb8-493c-b9da-dd30457d1b84",
          useAadAuth: true,
          useCommonAlertSchema: true,
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createNotificationsAtTenantActionGroupLevel();
}

main().catch(console.error);
