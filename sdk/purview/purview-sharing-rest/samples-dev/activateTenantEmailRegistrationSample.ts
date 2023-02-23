// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient, {
  ReceivedSharesActivateTenantEmailRegistrationParameters,
} from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Activates the email registration for current tenant
 *
 * @summary Activates the email registration for current tenant
 */
async function activateTenantEmailRegistrationSample() {
  const endpoint = process.env["ENDPOINT"] || "";
  const activationCode = process.env["ACTIVATION_CODE"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const options: ReceivedSharesActivateTenantEmailRegistrationParameters = {
    body: { properties: { activationCode } },
  };
  const result = await client.path("/emails:activate").post(options);
  console.log(result);
}

async function main() {
  activateTenantEmailRegistrationSample();
}

main().catch(console.error);
