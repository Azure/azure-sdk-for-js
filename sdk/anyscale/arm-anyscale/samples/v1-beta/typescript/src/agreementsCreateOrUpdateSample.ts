// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sign the agreement via PUT. The request body is intentionally empty -- send `{"properties": {}}`. Every agreement property is RP-managed and read-only, so any value supplied in the body is ignored; the accepting identity is taken from the ARM caller token, not the payload. Idempotent -- PUT-ting an already-Active agreement is a no-op.
 *
 * @summary sign the agreement via PUT. The request body is intentionally empty -- send `{"properties": {}}`. Every agreement property is RP-managed and read-only, so any value supplied in the body is ignored; the accepting identity is taken from the ARM caller token, not the payload. Idempotent -- PUT-ting an already-Active agreement is a no-op.
 * x-ms-original-file: 2026-09-01/Agreements_CreateOrUpdate.json
 */
async function signAnAgreementViaPUT(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.agreements.createOrUpdate("default", { properties: {} });
  console.log(result);
}

async function main(): Promise<void> {
  await signAnAgreementViaPUT();
}

main().catch(console.error);
