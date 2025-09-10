// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks if resource name is available.
 *
 * @summary Checks if resource name is available.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/Certificates_CheckNameAvailability.json
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
  const environmentName = "testcontainerenv";
  const checkNameAvailabilityRequest: CheckNameAvailabilityRequest = {
    name: "testcertificatename",
    type: "Microsoft.App/managedEnvironments/certificates",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability(
    resourceGroupName,
    environmentName,
    checkNameAvailabilityRequest,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Checks if resource name is available.
 *
 * @summary Checks if resource name is available.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/ContainerApps_CheckNameAvailability.json
 */
async function containerAppsCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "testcontainerenv";
  const checkNameAvailabilityRequest: CheckNameAvailabilityRequest = {
    name: "testcappname",
    type: "Microsoft.App/containerApps",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability(
    resourceGroupName,
    environmentName,
    checkNameAvailabilityRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesCheckNameAvailability();
  await containerAppsCheckNameAvailability();
}

main().catch(console.error);
