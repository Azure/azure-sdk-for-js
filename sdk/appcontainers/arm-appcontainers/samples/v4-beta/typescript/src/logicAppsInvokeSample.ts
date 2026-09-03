// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to proxies a the API call to the logic app backed by the container app.
 *
 * @summary proxies a the API call to the logic app backed by the container app.
 * x-ms-original-file: 2025-10-02-preview/LogicApps_ListCallbackURL.json
 */
async function getWorkflowListCallBackURL(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.logicApps.invoke(
    "testrg123",
    "testapp2",
    "testapp2",
    "/runtime/webhooks/workflow/api/management/workflows/Stateful1/triggers/When_a_HTTP_request_is_received/listCallbackUrl",
    "POST",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkflowListCallBackURL();
}

main().catch(console.error);
