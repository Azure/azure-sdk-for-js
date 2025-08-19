// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the Template Specs within the specified subscriptions.
 *
 * @summary Lists all the Template Specs within the specified subscriptions.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecsListBySubscription.json
 */

import { TemplateSpecsClient } from "@azure/arm-templatespecs";
import { DefaultAzureCredential } from "@azure/identity";

async function templatesSpecsListBySubscription(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new TemplateSpecsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.templateSpecs.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

templatesSpecsListBySubscription().catch(console.error);
