// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedServiceIdentityClient } = require("@azure/arm-msi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a federated identity credential under the specified user assigned identity.
 *
 * @summary create or update a federated identity credential under the specified user assigned identity.
 * x-ms-original-file: 2025-05-31-preview/FederatedIdentityCredentialCreate.json
 */
async function federatedIdentityCredentialCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c267c0e7-0a73-4789-9e17-d26aeb0904e5";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const result = await client.federatedIdentityCredentials.createOrUpdate(
    "rgName",
    "resourceName",
    "ficResourceName",
    {
      issuer: "https://oidc.prod-aks.azure.com/TenantGUID/IssuerGUID",
      subject: "system:serviceaccount:ns:svcaccount",
      audiences: ["api://AzureADTokenExchange"],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a federated identity credential under the specified user assigned identity.
 *
 * @summary create or update a federated identity credential under the specified user assigned identity.
 * x-ms-original-file: 2025-05-31-preview/FlexibleFederatedIdentityCredentialCreate.json
 */
async function flexibleFederatedIdentityCredentialCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c267c0e7-0a73-4789-9e17-d26aeb0904e5";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const result = await client.federatedIdentityCredentials.createOrUpdate(
    "rgName",
    "resourceName",
    "ficResourceName",
    {
      issuer: "https://oidc.prod-aks.azure.com/TenantGUID/IssuerGUID",
      audiences: ["api://AzureADTokenExchange"],
      claimsMatchingExpression: {
        languageVersion: 1,
        value: "claims['sub'] matches system:serviceaccount:ns:*",
      },
    },
  );
  console.log(result);
}

async function main() {
  await federatedIdentityCredentialCreate();
  await flexibleFederatedIdentityCredentialCreate();
}

main().catch(console.error);
