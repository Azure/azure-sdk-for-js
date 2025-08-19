// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Sends a test alert email.
 *
 * @summary Sends a test alert email.
 * x-ms-original-file: specification/storsimple1200series/resource-manager/Microsoft.StorSimple/stable/2016-10-01/examples/AlertsSendTestEmail.json
 */

import type { SendTestAlertEmailRequest } from "@azure/arm-storsimple1200series";
import { StorSimpleManagementClient } from "@azure/arm-storsimple1200series";
import { DefaultAzureCredential } from "@azure/identity";

async function alertsSendTestEmail(): Promise<void> {
  const subscriptionId = "9eb689cd-7243-43b4-b6f6-5c65cb296641";
  const deviceName = "is2-hlmdhdgu1et";
  const resourceGroupName = "ResourceGroupForSDKTest";
  const managerName = "hManagerForSDKTest4";
  const request: SendTestAlertEmailRequest = {
    emailList: ["testemailid@contoso.com"],
  };
  const credential = new DefaultAzureCredential();
  const client = new StorSimpleManagementClient(credential, subscriptionId);
  const result = await client.alerts.sendTestEmail(
    deviceName,
    resourceGroupName,
    managerName,
    request,
  );
  console.log(result);
}

alertsSendTestEmail().catch(console.error);
