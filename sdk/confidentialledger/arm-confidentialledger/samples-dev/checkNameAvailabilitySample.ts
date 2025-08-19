// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to To check whether a resource name is available.
 *
 * @summary To check whether a resource name is available.
 * x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/CheckNameAvailability.json
 */

import type {
  CheckNameAvailabilityRequest} from "@azure/arm-confidentialledger";
import {
  ConfidentialLedgerClient,
} from "@azure/arm-confidentialledger";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["CONFIDENTIALLEDGER_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const nameAvailabilityRequest: CheckNameAvailabilityRequest = {
    name: "sample-name",
    type: "Microsoft.ConfidentialLedger/ledgers",
  };
  const credential = new DefaultAzureCredential();
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const result = await client.checkNameAvailability(nameAvailabilityRequest);
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
