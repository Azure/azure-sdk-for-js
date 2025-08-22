// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks if resource connectedEnvironmentName is available.
 *
 * @summary Checks if resource connectedEnvironmentName is available.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ConnectedEnvironmentsCertificates_CheckNameAvailability.json
 */

import {
  CheckNameAvailabilityRequest,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function certificatesCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const connectedEnvironmentName = "testcontainerenv";
  const checkNameAvailabilityRequest: CheckNameAvailabilityRequest = {
    name: "testcertificatename",
    type: "Microsoft.App/connectedEnvironments/certificates",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironments.checkNameAvailability(
    resourceGroupName,
    connectedEnvironmentName,
    checkNameAvailabilityRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesCheckNameAvailability();
}

main().catch(console.error);
