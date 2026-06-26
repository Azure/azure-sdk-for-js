// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an APC Gateway.
 *
 * @summary create or update an APC Gateway.
 * x-ms-original-file: 2025-03-30-preview/Gateways_CreateOrUpdate_MaximumSet_Gen.json
 */
async function gatewaysCreateOrUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "93519EA0-206F-42A3-8126-A234F19328E0";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.gateways.createOrUpdate("rgopenapi", "GatewayName", {
    properties: {
      configuredApplication: {
        name: "Application Name",
        applicationDescription: "Application description",
        category: "Art and design",
        privacyRightsRequestEmailAddress: "contact@contoso.com",
        commercialName: "Contoso",
        privacyPolicyUrl: "http://contoso.com/privacy",
      },
      configuredApplicationOwner: {
        name: "Contoso",
        legalName: "Contoso",
        tradingName: "Contoso",
        organizationDescription: "Description of Organisation",
        taxNumber: "12345",
        organizationIdentificationId: "12345",
        organizationIdentificationIssuer: "ID issuer",
        contactEmailAddress: "contact@contoso.com",
        legalRepresentative: {
          familyName: "Name",
          givenName: "Name",
          emailAddress: "contact@contoso.com",
        },
        privacyManager: {
          familyName: "Name",
          givenName: "Name",
          emailAddress: "contact@contoso.com",
        },
        dataProtectionOfficer: {
          familyName: "Name",
          givenName: "Name",
          emailAddress: "contact@contoso.com",
        },
        registeredGeographicAddress: {
          streetNumber: "1234",
          streetName: "Street",
          locality: "Locality",
          city: "City",
          stateOrProvince: "State",
          postalCode: "12345",
          countryCode: "US",
        },
        privacyPolicyUrl: "http://contoso.com/privacy",
        localRepresentatives: [
          {
            countryCode: "AA",
            representative: {
              familyName: "Name",
              givenName: "Name",
              emailAddress: "contact@contoso.com",
            },
          },
        ],
        organizationType: "Academic scientific organization",
        organizationIdentificationType: "Tax number",
      },
    },
    tags: {},
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await gatewaysCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
