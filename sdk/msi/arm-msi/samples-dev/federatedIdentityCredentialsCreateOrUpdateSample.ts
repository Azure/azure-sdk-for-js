// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a federated identity credential under the specified user assigned identity.
 *
 * @summary Create or update a federated identity credential under the specified user assigned identity.
 * x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/FederatedIdentityCredentialCreate.json
 */

import {
  FederatedIdentityCredential,
  ManagedServiceIdentityClient,
} from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function federatedIdentityCredentialCreate(): Promise<void> {
  const subscriptionId =
    process.env["MSI_SUBSCRIPTION_ID"] ||
    "c267c0e7-0a73-4789-9e17-d26aeb0904e5";
  const resourceGroupName = process.env["MSI_RESOURCE_GROUP"] || "rgName";
  const resourceName = "resourceName";
  const federatedIdentityCredentialResourceName = "ficResourceName";
  const parameters: FederatedIdentityCredential = {
    audiences: ["api://AzureADTokenExchange"],
    issuer: "https://oidc.prod-aks.azure.com/TenantGUID/IssuerGUID",
    subject: "system:serviceaccount:ns:svcaccount",
  };
  const credential = new DefaultAzureCredential();
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const result = await client.federatedIdentityCredentials.createOrUpdate(
    resourceGroupName,
    resourceName,
    federatedIdentityCredentialResourceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await federatedIdentityCredentialCreate();
}

main().catch(console.error);
