// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete Attestation Service.
 *
 * @summary Delete Attestation Service.
 * x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Delete_AttestationProvider.json
 */

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

async function attestationProvidersDelete(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "sample-resource-group";
  const providerName = "myattestationprovider";
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.delete(resourceGroupName, providerName);
  console.log(result);
}

attestationProvidersDelete().catch(console.error);
