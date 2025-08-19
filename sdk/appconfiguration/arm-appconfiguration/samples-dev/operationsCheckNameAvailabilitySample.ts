// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks whether the configuration store name is available for use.
 *
 * @summary Checks whether the configuration store name is available for use.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/CheckNameAvailable.json
 */

import {
  CheckNameAvailabilityParameters,
  AppConfigurationManagementClient,
} from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configurationStoresCheckNameAvailable(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const checkNameAvailabilityParameters: CheckNameAvailabilityParameters = {
    name: "contoso",
    type: "Microsoft.AppConfiguration/configurationStores",
  };
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.operations.checkNameAvailability(
    checkNameAvailabilityParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Checks whether the configuration store name is available for use.
 *
 * @summary Checks whether the configuration store name is available for use.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/CheckNameNotAvailable.json
 */
async function configurationStoresCheckNameNotAvailable(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const checkNameAvailabilityParameters: CheckNameAvailabilityParameters = {
    name: "contoso",
    type: "Microsoft.AppConfiguration/configurationStores",
  };
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.operations.checkNameAvailability(
    checkNameAvailabilityParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationStoresCheckNameAvailable();
  await configurationStoresCheckNameNotAvailable();
}

main().catch(console.error);
