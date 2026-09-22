// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a billing profile. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. If you are a MCA Individual (Pay-as-you-go) customer, then please use the Azure portal experience to create the billing profile.
 *
 * @summary creates or updates a billing profile. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. If you are a MCA Individual (Pay-as-you-go) customer, then please use the Azure portal experience to create the billing profile.
 * x-ms-original-file: 2024-04-01/billingProfilesCreateOrUpdate.json
 */
async function billingProfilesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingProfiles.createOrUpdate(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    {
      properties: {
        billTo: {
          addressLine1: "Test Address1",
          addressLine2: "Test Address2",
          addressLine3: "Test Address3",
          city: "City",
          companyName: "Contoso",
          country: "US",
          email: "abc@contoso.com",
          firstName: "Test",
          isValidAddress: true,
          lastName: "User",
          phoneNumber: "000-000-0000",
          postalCode: "00000",
          region: "WA",
        },
        displayName: "Billing Profile 1",
        enabledAzurePlans: [{ skuId: "0001" }, { skuId: "0002" }],
        invoiceEmailOptIn: true,
        poNumber: "ABC12345",
        shipTo: {
          addressLine1: "Test Address1",
          addressLine2: "Test Address2",
          addressLine3: "Test Address3",
          city: "City",
          companyName: "Contoso",
          country: "US",
          email: "abc@contoso.com",
          firstName: "Test",
          isValidAddress: true,
          lastName: "User",
          phoneNumber: "000-000-0000",
          postalCode: "00000",
          region: "WA",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingProfilesCreateOrUpdate();
}

main().catch(console.error);
