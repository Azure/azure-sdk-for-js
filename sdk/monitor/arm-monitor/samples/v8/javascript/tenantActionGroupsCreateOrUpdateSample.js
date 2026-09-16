// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new tenant action group or update an existing one.
 *
 * @summary create a new tenant action group or update an existing one.
 * x-ms-original-file: 2023-05-01-preview/createOrUpdateTenantActionGroup.json
 */
async function createOrUpdateATenantActionGroup() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.tenantActionGroups.createOrUpdate(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "testTenantActionGroup",
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    {
      location: "Global",
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
      enabled: true,
      groupShortName: "sample",
      smsReceivers: [
        { name: "John Doe's mobile", countryCode: "1", phoneNumber: "2062022299" },
        { name: "Jane Smith's mobile", countryCode: "1", phoneNumber: "0987654321" },
      ],
      voiceReceivers: [{ name: "Sample voice", countryCode: "1", phoneNumber: "2062022299" }],
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
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateATenantActionGroup();
}

main().catch(console.error);
