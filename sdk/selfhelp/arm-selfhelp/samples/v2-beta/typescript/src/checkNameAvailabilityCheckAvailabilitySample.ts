// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions
 *
 * @summary this API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions
 * x-ms-original-file: 2024-03-01-preview/CheckNameAvailabilityForDiagnosticWhenNameIsAvailable.json
 */
async function exampleWhenNameIsAvailableForADiagnosticResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.checkNameAvailability.checkAvailability(
    "subscriptions/0d0fcd2e-c4fd-4349-8497-200edb3923c6",
    { checkNameAvailabilityRequest: { name: "sampleName", type: "Microsoft.Help/diagnostics" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions
 *
 * @summary this API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions
 * x-ms-original-file: 2024-03-01-preview/CheckNameAvailabilityForDiagnosticWhenNameIsNotAvailable.json
 */
async function exampleWhenNameIsNotAvailableForADiagnosticResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.checkNameAvailability.checkAvailability(
    "subscriptions/0d0fcd2e-c4fd-4349-8497-200edb3923c6",
    { checkNameAvailabilityRequest: { name: "sampleName", type: "Microsoft.Help/diagnostics" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exampleWhenNameIsAvailableForADiagnosticResource();
  await exampleWhenNameIsNotAvailableForADiagnosticResource();
}

main().catch(console.error);
