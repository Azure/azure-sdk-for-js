// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CheckNameAvailabilityRequest,
  SqlManagementClient,
} from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Determines whether a resource can be created with the specified name.
 *
 * @summary Determines whether a resource can be created with the specified name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/CheckNameAvailabilityServerAlreadyExists.json
 */
async function checkForAServerNameThatAlreadyExists(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const parameters: CheckNameAvailabilityRequest = {
    name: "server1",
    type: "Microsoft.Sql/servers",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.checkNameAvailability(parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Determines whether a resource can be created with the specified name.
 *
 * @summary Determines whether a resource can be created with the specified name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/CheckNameAvailabilityServerAvailable.json
 */
async function checkForAServerNameThatIsAvailable(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const parameters: CheckNameAvailabilityRequest = {
    name: "server1",
    type: "Microsoft.Sql/servers",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.checkNameAvailability(parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Determines whether a resource can be created with the specified name.
 *
 * @summary Determines whether a resource can be created with the specified name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/CheckNameAvailabilityServerInvalid.json
 */
async function checkForAServerNameThatIsInvalid(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const parameters: CheckNameAvailabilityRequest = {
    name: "SERVER1",
    type: "Microsoft.Sql/servers",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.checkNameAvailability(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await checkForAServerNameThatAlreadyExists();
  await checkForAServerNameThatIsAvailable();
  await checkForAServerNameThatIsInvalid();
}

main().catch(console.error);
