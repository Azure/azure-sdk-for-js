// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates managed instance DTC settings.
 *
 * @summary updates managed instance DTC settings.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceDtcUpdateEnableDtc.json
 */
async function updatesManagedInstanceDTCSettingsByEnablingDTC(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceDtcs.createOrUpdate(
    "testrg",
    "testinstance",
    "current",
    { dtcEnabled: true },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates managed instance DTC settings.
 *
 * @summary updates managed instance DTC settings.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceDtcUpdateMax.json
 */
async function updatesManagedInstanceDTCSettingsWithAllOptionalParametersSpecified(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstanceDtcs.createOrUpdate(
    "testrg",
    "testinstance",
    "current",
    {
      dtcEnabled: true,
      externalDnsSuffixSearchList: ["dns.example1.com", "dns.example2.com"],
      securitySettings: {
        snaLu6Point2TransactionsEnabled: false,
        transactionManagerCommunicationSettings: {
          allowInboundEnabled: false,
          allowOutboundEnabled: true,
          authentication: "NoAuth",
        },
        xaTransactionsDefaultTimeout: 1000,
        xaTransactionsEnabled: false,
        xaTransactionsMaximumTimeout: 3000,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesManagedInstanceDTCSettingsByEnablingDTC();
  await updatesManagedInstanceDTCSettingsWithAllOptionalParametersSpecified();
}

main().catch(console.error);
