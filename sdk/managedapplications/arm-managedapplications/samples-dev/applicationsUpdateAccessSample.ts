// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update access for application.
 *
 * @summary Update access for application.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/updateAccess.json
 */

import type { UpdateAccessDefinition } from "@azure/arm-managedapplications";
import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAccessForApplication(): Promise<void> {
  const subscriptionId = process.env["MANAGEDAPPLICATIONS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["MANAGEDAPPLICATIONS_RESOURCE_GROUP"] || "rg";
  const applicationName = "myManagedApplication";
  const parameters: UpdateAccessDefinition = {
    approver: "amauser",
    metadata: {
      originRequestId: "originRequestId",
      requestorId: "RequestorId",
      subjectDisplayName: "SubjectDisplayName",
      tenantDisplayName: "TenantDisplayName",
    },
    status: "Elevate",
    subStatus: "Approved",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential, subscriptionId);
  const result = await client.applications.beginUpdateAccessAndWait(
    resourceGroupName,
    applicationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAccessForApplication();
}

main().catch(console.error);
