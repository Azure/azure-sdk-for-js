// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Initialize Peering Service for Connection Monitor functionality
 *
 * @summary Initialize Peering Service for Connection Monitor functionality
 * x-ms-original-file: specification/peering/resource-manager/Microsoft.Peering/stable/2021-06-01/examples/InitializeConnectionMonitor.json
 */

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

async function initializePeeringServiceForConnectionMonitorFunctionality(): Promise<void> {
  const subscriptionId = "subId";
  const credential = new DefaultAzureCredential();
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peeringServices.initializeConnectionMonitor();
  console.log(result);
}

initializePeeringServiceForConnectionMonitorFunctionality().catch(console.error);
