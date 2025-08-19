// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the default provider by location.
 *
 * @summary Get the default provider by location.
 * x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Get_DefaultProviderByLocation.json
 */

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

async function attestationProvidersGetDefaultWithLocation(): Promise<void> {
  const subscriptionId = "6c96b33e-f5b8-40a6-9011-5cb1c58b0915";
  const location = "Central US";
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.getDefaultByLocation(location);
  console.log(result);
}

attestationProvidersGetDefaultWithLocation().catch(console.error);
