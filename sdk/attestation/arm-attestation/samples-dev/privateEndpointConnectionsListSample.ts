// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all the private endpoint connections associated with the attestation provider.
 *
 * @summary List all the private endpoint connections associated with the attestation provider.
 * x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/AttestationProviderListPrivateEndpointConnections.json
 */

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

async function attestationProviderListPrivateEndpointConnections(): Promise<void> {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "res6977";
  const providerName = "sto2527";
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    resourceGroupName,
    providerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

attestationProviderListPrivateEndpointConnections().catch(console.error);
