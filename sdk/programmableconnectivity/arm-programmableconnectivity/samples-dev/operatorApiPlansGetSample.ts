// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get an OperatorApiPlan resource by name.
 *
 * @summary get an OperatorApiPlan resource by name.
 * x-ms-original-file: 2024-01-15-preview/OperatorApiPlans_Get_MaximumSet_Gen.json
 */

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

async function operatorApiPlansGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.operatorApiPlans.get("etzfxkqegslnxdhdmzvbtzxahnyq");
  console.log(result);
}

async function main(): Promise<void> {
  await operatorApiPlansGet();
}

main().catch(console.error);
