// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves the ManagementAssociations list.
 *
 * @summary Retrieves the ManagementAssociations list.
 * x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationListForSubscription.json
 */

import { OperationsManagementClient } from "@azure/arm-operations";
import { DefaultAzureCredential } from "@azure/identity";

async function solutionList(): Promise<void> {
  const subscriptionId = "subid";
  const credential = new DefaultAzureCredential();
  const client = new OperationsManagementClient(credential, subscriptionId);
  const result = await client.managementAssociations.listBySubscription();
  console.log(result);
}

solutionList().catch(console.error);
