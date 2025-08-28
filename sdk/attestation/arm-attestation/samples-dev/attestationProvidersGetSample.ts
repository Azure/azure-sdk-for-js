// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the status of Attestation Provider.
 *
 * @summary Get the status of Attestation Provider.
 * x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Get_AttestationProvider.json
 */

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

async function attestationProvidersGet(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "MyResourceGroup";
  const providerName = "myattestationprovider";
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.get(resourceGroupName, providerName);
  console.log(result);
}

attestationProvidersGet().catch(console.error);
