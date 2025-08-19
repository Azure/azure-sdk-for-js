// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the default provider
 *
 * @summary Get the default provider
 * x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Get_DefaultProviders.json
 */

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

async function attestationProvidersGetDefault(): Promise<void> {
  const subscriptionId = "6c96b33e-f5b8-40a6-9011-5cb1c58b0915";
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.listDefault();
  console.log(result);
}

attestationProvidersGetDefault().catch(console.error);
